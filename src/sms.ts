/**
 * لایهٔ ارسال پیامک
 * ---------------------------------------------------------------------
 * پشتیبانی از چند سرویس‌دهنده:
 *   - dev       : حالت توسعه (کد در پاسخ API برگردانده می‌شود، پیامکی ارسال نمی‌شود)
 *   - kavenegar : سرویس ایرانی کاوه‌نگار
 *   - twilio    : سرویس بین‌المللی Twilio
 *
 * انتخاب سرویس‌دهنده از طریق متغیر محیطی SMS_PROVIDER انجام می‌شود.
 */

export type SmsProvider = 'dev' | 'kavenegar' | 'twilio'

export type SmsEnv = {
  SMS_PROVIDER?: string
  KAVENEGAR_API_KEY?: string
  KAVENEGAR_SENDER?: string
  KAVENEGAR_TEMPLATE?: string
  TWILIO_ACCOUNT_SID?: string
  TWILIO_AUTH_TOKEN?: string
  TWILIO_FROM?: string
}

export type SmsResult = {
  ok: boolean
  provider: SmsProvider
  /** فقط در حالت dev پر می‌شود تا کد OTP قابل نمایش باشد */
  devCode?: string
  error?: string
}

/* ------------------------------------------------------------------ */
/*  نرمال‌سازی شماره موبایل ایران                                      */
/* ------------------------------------------------------------------ */

export function normalizePhone(input: string): string | null {
  if (!input) return null
  // تبدیل ارقام فارسی/عربی به لاتین
  const fa = '۰۱۲۳۴۵۶۷۸۹'
  const ar = '٠١٢٣٤٥٦٧٨٩'
  let s = String(input).replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)))
  s = s.replace(/[٠-٩]/g, (d) => String(ar.indexOf(d)))
  s = s.replace(/[\s\-()]/g, '')

  // 09xxxxxxxxx
  if (/^09\d{9}$/.test(s)) return s
  // +989xxxxxxxxx
  if (/^\+989\d{9}$/.test(s)) return '0' + s.slice(3)
  // 00989xxxxxxxxx
  if (/^00989\d{9}$/.test(s)) return '0' + s.slice(4)
  // 989xxxxxxxxx
  if (/^989\d{9}$/.test(s)) return '0' + s.slice(2)

  return null
}

export const maskPhone = (phone: string): string =>
  phone.length === 11 ? `${phone.slice(0, 4)}***${phone.slice(-4)}` : phone

/* ------------------------------------------------------------------ */
/*  ساخت پیام                                                          */
/* ------------------------------------------------------------------ */

const buildMessage = (code: string): string =>
  `کد ورود شما به دِوکَست: ${code}\nاین کد تا ۲ دقیقه اعتبار دارد. آن را در اختیار دیگران قرار ندهید.`

/* ------------------------------------------------------------------ */
/*  آداپترها                                                           */
/* ------------------------------------------------------------------ */

async function sendKavenegar(env: SmsEnv, phone: string, code: string): Promise<SmsResult> {
  const provider: SmsProvider = 'kavenegar'
  if (!env.KAVENEGAR_API_KEY) {
    return { ok: false, provider, error: 'KAVENEGAR_API_KEY پیکربندی نشده است' }
  }

  try {
    // اگر قالب (template) تعریف شده باشد از سرویس verify استفاده می‌کنیم
    if (env.KAVENEGAR_TEMPLATE) {
      const url = `https://api.kavenegar.com/v1/${env.KAVENEGAR_API_KEY}/verify/lookup.json?receptor=${encodeURIComponent(
        phone
      )}&token=${encodeURIComponent(code)}&template=${encodeURIComponent(env.KAVENEGAR_TEMPLATE)}`
      const res = await fetch(url, { method: 'GET' })
      return { ok: res.ok, provider, error: res.ok ? undefined : `kavenegar ${res.status}` }
    }

    const sender = env.KAVENEGAR_SENDER || ''
    const message = encodeURIComponent(buildMessage(code))
    const url = `https://api.kavenegar.com/v1/${env.KAVENEGAR_API_KEY}/sms/send.json?receptor=${encodeURIComponent(
      phone
    )}&sender=${encodeURIComponent(sender)}&message=${message}`
    const res = await fetch(url, { method: 'GET' })
    return { ok: res.ok, provider, error: res.ok ? undefined : `kavenegar ${res.status}` }
  } catch (err) {
    return { ok: false, provider, error: String(err) }
  }
}

async function sendTwilio(env: SmsEnv, phone: string, code: string): Promise<SmsResult> {
  const provider: SmsProvider = 'twilio'
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM } = env
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM) {
    return { ok: false, provider, error: 'تنظیمات Twilio کامل نیست' }
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`
    const body = new URLSearchParams({
      To: `+98${phone.slice(1)}`, // 09xx → +989xx
      From: TWILIO_FROM,
      Body: buildMessage(code),
    })
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })
    return { ok: res.ok, provider, error: res.ok ? undefined : `twilio ${res.status}` }
  } catch (err) {
    return { ok: false, provider, error: String(err) }
  }
}

/* ------------------------------------------------------------------ */
/*  نقطهٔ ورود اصلی                                                    */
/* ------------------------------------------------------------------ */

export function resolveProvider(env: SmsEnv): SmsProvider {
  const p = (env.SMS_PROVIDER || '').toLowerCase()
  if (p === 'kavenegar' && env.KAVENEGAR_API_KEY) return 'kavenegar'
  if (p === 'twilio' && env.TWILIO_ACCOUNT_SID) return 'twilio'
  return 'dev'
}

export async function sendOtpSms(env: SmsEnv, phone: string, code: string): Promise<SmsResult> {
  const provider = resolveProvider(env)

  if (provider === 'kavenegar') return sendKavenegar(env, phone, code)
  if (provider === 'twilio') return sendTwilio(env, phone, code)

  // حالت توسعه: پیامک واقعی ارسال نمی‌شود، کد برای تست برمی‌گردد
  console.log(`[sms:dev] OTP for ${maskPhone(phone)} => ${code}`)
  return { ok: true, provider: 'dev', devCode: code }
}
