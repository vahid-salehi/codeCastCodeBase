/**
 * تایپ‌های حداقلی محیط Cloudflare Workers
 * (به‌جای وابستگی به @cloudflare/workers-types)
 */

export interface D1Result<T = unknown> {
  results?: T[]
  success: boolean
  meta: Record<string, unknown>
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(colName?: string): Promise<T | null>
  run<T = unknown>(): Promise<D1Result<T>>
  all<T = unknown>(): Promise<D1Result<T>>
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>
  exec(query: string): Promise<{ count: number; duration: number }>
}

export type Bindings = {
  DB: D1Database
  /** متغیرهای محیطی سرویس پیامک */
  SMS_PROVIDER?: string
  KAVENEGAR_API_KEY?: string
  KAVENEGAR_SENDER?: string
  KAVENEGAR_TEMPLATE?: string
  TWILIO_ACCOUNT_SID?: string
  TWILIO_AUTH_TOKEN?: string
  TWILIO_FROM?: string
}
