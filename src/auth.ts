import type { D1Database } from './types'

/* ------------------------------------------------------------------ */
/*  تایپ‌ها                                                            */
/* ------------------------------------------------------------------ */

export type User = {
  id: number
  phone: string
  name: string | null
  email: string | null
  role: string
  created_at: string
  last_login: string | null
}

export type OtpIssue = {
  ok: boolean
  code?: string
  expiresInSec: number
  retryAfterSec: number
  error?: 'rate_limited' | 'storage'
}

export type OtpVerify = {
  ok: boolean
  user?: User
  error?: 'invalid' | 'expired' | 'too_many_attempts' | 'not_found' | 'storage'
}

/* ------------------------------------------------------------------ */
/*  ثابت‌ها                                                            */
/* ------------------------------------------------------------------ */

const OTP_TTL_SEC = 120 // اعتبار کد: ۲ دقیقه
const RESEND_COOLDOWN_SEC = 60 // فاصلهٔ ارسال مجدد
const MAX_ATTEMPTS = 5 // حداکثر تلاش برای هر کد
const SESSION_TTL_SEC = 60 * 60 * 24 * 7 // نشست: ۷ روز

/* ------------------------------------------------------------------ */
/*  کمک‌کننده‌های رمزنگاری (Web Crypto)                                */
/* ------------------------------------------------------------------ */

const enc = new TextEncoder()

export function generateOtp(digits = 6): string {
  const arr = new Uint32Array(digits)
  crypto.getRandomValues(arr)
  return Array.from(arr, (n) => (n % 10).toString()).join('')
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(input))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

/** هش کد OTP به‌همراه شماره (تا کدهای یکسان هش یکسان نداشته باشند) */
export const hashOtp = (phone: string, code: string): Promise<string> => sha256(`${phone}:${code}:devcast`)

export function generateToken(): string {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
}

/* ------------------------------------------------------------------ */
/*  OTP                                                                */
/* ------------------------------------------------------------------ */

export async function issueOtp(
  db: D1Database,
  phone: string,
  purpose = 'login'
): Promise<OtpIssue> {
  // محدودیت نرخ: اگر کد فعالی اخیراً ارسال شده، اجازه نده
  const recent = await db
    .prepare(
      `SELECT created_at FROM otp_codes
       WHERE phone = ? AND consumed = 0
       ORDER BY id DESC LIMIT 1`
    )
    .bind(phone)
    .first<{ created_at: string }>()

  if (recent) {
    const ageSec = (Date.now() - new Date(recent.created_at.replace(' ', 'T') + 'Z').getTime()) / 1000
    if (ageSec < RESEND_COOLDOWN_SEC) {
      return {
        ok: false,
        expiresInSec: OTP_TTL_SEC,
        retryAfterSec: Math.ceil(RESEND_COOLDOWN_SEC - ageSec),
        error: 'rate_limited',
      }
    }
  }

  // کدهای قبلی را مصرف‌شده کن
  await db
    .prepare('UPDATE otp_codes SET consumed = 1 WHERE phone = ? AND consumed = 0')
    .bind(phone)
    .run()

  const code = generateOtp()
  const codeHash = await hashOtp(phone, code)
  const expiresAt = new Date(Date.now() + OTP_TTL_SEC * 1000)
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19)

  await db
    .prepare(
      `INSERT INTO otp_codes (phone, code_hash, purpose, expires_at)
       VALUES (?, ?, ?, ?)`
    )
    .bind(phone, codeHash, purpose, expiresAt)
    .run()

  return { ok: true, code, expiresInSec: OTP_TTL_SEC, retryAfterSec: RESEND_COOLDOWN_SEC }
}

export async function verifyOtp(
  db: D1Database,
  phone: string,
  code: string,
  name?: string
): Promise<OtpVerify> {
  const row = await db
    .prepare(
      `SELECT id, code_hash, attempts, expires_at FROM otp_codes
       WHERE phone = ? AND consumed = 0
       ORDER BY id DESC LIMIT 1`
    )
    .bind(phone)
    .first<{ id: number; code_hash: string; attempts: number; expires_at: string }>()

  if (!row) return { ok: false, error: 'not_found' }

  if (row.attempts >= MAX_ATTEMPTS) {
    await db.prepare('UPDATE otp_codes SET consumed = 1 WHERE id = ?').bind(row.id).run()
    return { ok: false, error: 'too_many_attempts' }
  }

  const expiresMs = new Date(row.expires_at.replace(' ', 'T') + 'Z').getTime()
  if (Date.now() > expiresMs) {
    await db.prepare('UPDATE otp_codes SET consumed = 1 WHERE id = ?').bind(row.id).run()
    return { ok: false, error: 'expired' }
  }

  const expected = await hashOtp(phone, code)
  if (expected !== row.code_hash) {
    await db.prepare('UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ?').bind(row.id).run()
    return { ok: false, error: 'invalid' }
  }

  await db.prepare('UPDATE otp_codes SET consumed = 1 WHERE id = ?').bind(row.id).run()

  // ساخت یا به‌روزرسانی کاربر
  let user = await db.prepare('SELECT * FROM users WHERE phone = ?').bind(phone).first<User>()

  if (!user) {
    const res = await db
      .prepare('INSERT INTO users (phone, name, role, last_login) VALUES (?, ?, ?, CURRENT_TIMESTAMP)')
      .bind(phone, name ?? null, 'student')
      .run()
    const id = Number(res.meta?.last_row_id ?? 0)
    user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<User>()
  } else {
    await db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run()
    if (name && !user.name) {
      await db.prepare('UPDATE users SET name = ? WHERE id = ?').bind(name, user.id).run()
      user.name = name
    }
  }

  return { ok: true, user: user ?? undefined }
}

/* ------------------------------------------------------------------ */
/*  نشست‌ها                                                            */
/* ------------------------------------------------------------------ */

const SESSION_COOKIE = 'devcast_session'

export async function createSession(db: D1Database, userId: number): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + SESSION_TTL_SEC * 1000)
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19)

  await db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').bind(token, userId, expiresAt).run()
  return token
}

export async function getUserBySession(db: D1Database, token: string | undefined): Promise<User | null> {
  if (!token) return null

  const row = await db
    .prepare(
      `SELECT u.*, s.expires_at FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ?`
    )
    .bind(token)
    .first<User & { expires_at: string }>()

  if (!row) return null

  const expiresMs = new Date(row.expires_at.replace(' ', 'T') + 'Z').getTime()
  if (Date.now() > expiresMs) {
    await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
    return null
  }

  const { expires_at, ...user } = row
  return user as User
}

export async function destroySession(db: D1Database, token: string | undefined): Promise<void> {
  if (!token) return
  await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
}

/* ------------------------------------------------------------------ */
/*  کوکی                                                              */
/* ------------------------------------------------------------------ */

export function sessionCookie(token: string, maxAge = SESSION_TTL_SEC): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

export function readSessionCookie(cookieHeader: string | undefined): string | undefined {
  if (!cookieHeader) return undefined
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

export const constants = { OTP_TTL_SEC, RESEND_COOLDOWN_SEC, MAX_ATTEMPTS }
