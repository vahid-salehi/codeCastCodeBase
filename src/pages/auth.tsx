import type { FC } from 'hono/jsx'
import type { User } from '../auth'
import { PageShell, Badge, Logo } from '../components/layout'
import { WaveDivider, CurveLine, DotGrid, Blob, GradientRing, Sparkle } from '../components/art'
import { CodeIcon, SparkIcon, ShieldIcon, UsersIcon, CheckIcon, ArrowLeftIcon, ClockIcon, StarIcon } from '../components/icons'

/* ------------------------------------------------------------------ */
/*  پوستهٔ مشترک صفحات احراز هویت (دو ستونه)                            */
/* ------------------------------------------------------------------ */

const AuthShell: FC<{
  path: string
  asideTitle: string
  asideDesc: string
  asidePoints: string[]
  children: any
}> = ({ path, asideTitle, asideDesc, asidePoints, children }) => (
  <PageShell path={path}>
    <section class="relative min-h-screen overflow-hidden pt-28 pb-16 sm:pt-32">
      <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
      <Blob class="absolute -top-24 right-[-8rem] h-[26rem] w-[26rem] opacity-20 blur-2xl" from="#6366f1" to="#8b5cf6" />
      <Blob class="absolute bottom-[-10rem] left-[-10rem] h-[24rem] w-[24rem] opacity-15 blur-2xl" from="#06b6d4" to="#6366f1" />
      <CurveLine class="absolute left-[-4rem] top-1/3 h-[30rem] w-[30rem] text-indigo-400/40" />
      <DotGrid class="absolute right-8 top-24 hidden text-slate-400 lg:block dark:text-slate-600" />

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr]">
          {/* ستون تبلیغاتی */}
          <aside class="relative hidden overflow-hidden rounded-3xl bg-slate-900 p-10 lg:flex lg:flex-col dark:bg-slate-900/80">
            <div class="glow glow-indigo top-[-3rem] right-[-2rem] h-64 w-64 opacity-50" aria-hidden="true"></div>
            <div class="glow glow-violet bottom-[-4rem] left-[-3rem] h-64 w-64 opacity-40" aria-hidden="true"></div>
            <GradientRing class="absolute -bottom-16 -left-16 h-72 w-72 text-white/30" />

            <div class="relative flex items-center gap-2.5">
              <Logo />
            </div>

            <div class="relative mt-auto pt-12">
              <span class="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] font-bold text-indigo-300">
                <SparkIcon class="h-3.5 w-3.5" />
                {asidePoints.length} مزیت کلیدی
              </span>
              <h2 class="mt-5 text-3xl font-black leading-tight tracking-tight text-white">{asideTitle}</h2>
              <p class="mt-4 text-sm leading-8 text-slate-300">{asideDesc}</p>

              <ul class="mt-8 space-y-3.5">
                {asidePoints.map((pt) => (
                  <li class="flex items-start gap-3 text-sm text-slate-200">
                    <span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-500/20 text-indigo-300">
                      <CheckIcon class="h-3 w-3" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div class="mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span class="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                  س
                </span>
                <p class="text-xs leading-6 text-slate-300">
                  «بعد از ۷ ماه اولین پیشنهاد کاری‌ام را گرفتم.»
                  <span class="mt-0.5 block text-slate-500">سارا محمدی — فرانت‌اند دیجی‌کالا</span>
                </p>
              </div>
            </div>
          </aside>

          {/* ستون فرم */}
          <div class="relative">{children}</div>
        </div>
      </div>
    </section>
    <WaveDivider class="text-indigo-400" />
  </PageShell>
)

/* ------------------------------------------------------------------ */
/*  فرم ورود با OTP                                                   */
/* ------------------------------------------------------------------ */

export const LoginPage: FC<{ path: string; next?: string; devMode: boolean }> = ({ path, next, devMode }) => (
  <AuthShell
    path={path}
    asideTitle="خوش برگشتی 👋"
    asideDesc="با شمارهٔ موبایلت وارد شو و مسیر یادگیری‌ات را از همان‌جایی که رها کردی ادامه بده."
    asidePoints={[
      'ورود سریع با کد یک‌بارمصرف پیامکی',
      'دسترسی به همهٔ دوره‌های ثبت‌نام‌شده',
      'پیگیری پیشرفت و تمرین‌های کدنویسی',
      'پشتیبانی و منتورینگ فارسی',
    ]}
  >
    <div class="glass h-full rounded-3xl p-7 sm:p-9">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-black tracking-tight">ورود به حساب</h1>
        <Badge tone="indigo">
          <ShieldIcon class="h-3.5 w-3.5" />
          ورود امن
        </Badge>
      </div>
      <p class="mt-2.5 text-sm leading-7 text-slate-600 dark:text-slate-400">
        شمارهٔ موبایلت را وارد کن؛ یک کد ۶ رقمی برایت پیامک می‌شود.
      </p>

      {/* مرحله ۱ */}
      <form id="otp-request-form" class="mt-7 space-y-4" novalidate data-purpose="login">
        <input type="hidden" name="next" value={next ?? '/'} />
        <div>
          <label for="phone" class="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
            شمارهٔ موبایل
          </label>
          <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-slate-400">
              <i class="fas fa-mobile-alt" aria-hidden="true"></i>
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputmode="numeric"
              autocomplete="tel"
              required
              dir="ltr"
              placeholder="0912 345 6789"
              class="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 pr-11 text-center font-mono text-sm tracking-widest text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            />
          </div>
          <p class="mt-1.5 text-[0.7rem] text-slate-400">نمونه: ۰۹۱۲۳۴۵۶۷۸۹</p>
        </div>

        <button
          type="submit"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl disabled:opacity-60"
        >
          <i class="fas fa-paper-plane text-xs" aria-hidden="true"></i>
          ارسال کد ورود
        </button>
        <p id="otp-request-msg" class="min-h-[1.25rem] text-xs font-medium" role="status" aria-live="polite"></p>
      </form>

      {/* مرحله ۲ — تأیید کد */}
      <form id="otp-verify-form" class="mt-7 hidden space-y-4" novalidate data-purpose="login">
        <div class="flex items-center justify-between rounded-xl border border-indigo-200/70 bg-indigo-50/60 px-4 py-3 text-xs dark:border-indigo-500/25 dark:bg-indigo-500/10">
          <span class="font-semibold text-indigo-700 dark:text-indigo-300">
            کد به شمارهٔ <span id="otp-phone-display" dir="ltr" class="font-mono"></span> ارسال شد
          </span>
          <button type="button" id="otp-edit-phone" class="font-bold text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400">
            تغییر
          </button>
        </div>

        <div>
          <label for="otp-code" class="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
            کد ۶ رقمی
          </label>
          <input
            id="otp-code"
            name="code"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            required
            dir="ltr"
            placeholder="— — — — — —"
            class="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-center font-mono text-xl tracking-[0.5em] text-slate-800 placeholder:tracking-normal placeholder:text-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
          />
        </div>

        <div class="flex items-center justify-between text-xs">
          <span class="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <ClockIcon class="h-3.5 w-3.5" />
            اعتبار کد: <span id="otp-countdown" class="font-mono font-bold">۰۲:۰۰</span>
          </span>
          <button type="button" id="otp-resend" disabled class="font-bold text-slate-400 disabled:cursor-not-allowed">
            ارسال مجدد (<span id="otp-resend-seconds">۶۰</span>)
          </button>
        </div>

        <button
          type="submit"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl disabled:opacity-60"
        >
          <CheckIcon class="h-4 w-4" />
          تأیید و ورود
        </button>
        <button
          type="button"
          id="otp-back"
          class="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          بازگشت
        </button>
        <p id="otp-verify-msg" class="min-h-[1.25rem] text-xs font-medium" role="status" aria-live="polite"></p>
      </form>

      {devMode && (
        <div id="dev-otp-box" class="mt-5 hidden rounded-xl border border-dashed border-amber-400/70 bg-amber-50/80 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
          <p class="text-[0.7rem] font-bold text-amber-800 dark:text-amber-300">
            <i class="fas fa-flask mr-1" aria-hidden="true"></i>
            حالت دمو — پیامک واقعی ارسال نمی‌شود
          </p>
          <p class="mt-2 text-xs text-amber-800 dark:text-amber-300">
            کد آزمایشی: <span id="dev-otp-code" dir="ltr" class="font-mono text-base font-black tracking-widest"></span>
          </p>
        </div>
      )}

      <p class="mt-7 border-t border-slate-100 pt-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        حساب نداری؟
        <a href="/register" class="font-bold text-indigo-600 hover:underline dark:text-indigo-400">ثبت‌نام کن</a>
      </p>
    </div>
  </AuthShell>
)

/* ------------------------------------------------------------------ */
/*  صفحهٔ ثبت‌نام                                                      */
/* ------------------------------------------------------------------ */

export const RegisterPage: FC<{ path: string; next?: string; devMode: boolean }> = ({ path, next, devMode }) => (
  <AuthShell
    path={path}
    asideTitle="شروع مسیر برنامه‌نویسیت"
    asideDesc="ثبت‌نام رایگان است و تا ۱۴ روز قابل بازگشت. همین حالا اولین قدم را بردار."
    asidePoints={[
      'دسترسی به دوره‌های رایگان بدون کارت بانکی',
      'مسیر یادگیری شخصی‌سازی‌شده بر اساس سطح تو',
      'منتورینگ فارسی و بازخورد کد',
      'گواهی پایان دوره برای رزومه',
    ]}
  >
    <div class="glass h-full rounded-3xl p-7 sm:p-9">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-black tracking-tight">ساخت حساب جدید</h1>
        <Badge tone="emerald">
          <SparkIcon class="h-3.5 w-3.5" />
          رایگان
        </Badge>
      </div>
      <p class="mt-2.5 text-sm leading-7 text-slate-600 dark:text-slate-400">
        برای ثبت‌نام فقط به شمارهٔ موبایل و نامت نیاز داریم.
      </p>

      {/* مرحله ۱ */}
      <form id="otp-request-form" class="mt-7 space-y-4" novalidate data-purpose="register">
        <input type="hidden" name="next" value={next ?? '/'} />
        <div>
          <label for="name" class="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
            نام و نام خانوادگی
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autocomplete="name"
            required
            placeholder="مثلاً سارا محمدی"
            class="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
          />
        </div>
        <div>
          <label for="phone" class="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
            شمارهٔ موبایل
          </label>
          <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-400">
              <i class="fas fa-mobile-alt" aria-hidden="true"></i>
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputmode="numeric"
              autocomplete="tel"
              required
              dir="ltr"
              placeholder="0912 345 6789"
              class="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 pr-11 text-center font-mono text-sm tracking-widest text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            />
          </div>
        </div>

        <button
          type="submit"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl disabled:opacity-60"
        >
          دریافت کد تأیید
          <ArrowLeftIcon class="h-4 w-4" />
        </button>
        <p id="otp-request-msg" class="min-h-[1.25rem] text-xs font-medium" role="status" aria-live="polite"></p>

        <p class="text-[0.7rem] leading-6 text-slate-400">
          با ثبت‌نام، <a href="#" class="underline">قوانین</a> و <a href="#" class="underline">حریم خصوصی</a> دِوکَست را می‌پذیری.
        </p>
      </form>

      {/* مرحله ۲ */}
      <form id="otp-verify-form" class="mt-7 hidden space-y-4" novalidate data-purpose="register">
        <div class="flex items-center justify-between rounded-xl border border-indigo-200/70 bg-indigo-50/60 px-4 py-3 text-xs dark:border-indigo-500/25 dark:bg-indigo-500/10">
          <span class="font-semibold text-indigo-700 dark:text-indigo-300">
            کد به <span id="otp-phone-display" dir="ltr" class="font-mono"></span> ارسال شد
          </span>
          <button type="button" id="otp-edit-phone" class="font-bold text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400">
            تغییر
          </button>
        </div>

        <div>
          <label for="otp-code" class="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
            کد ۶ رقمی
          </label>
          <input
            id="otp-code"
            name="code"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            required
            dir="ltr"
            placeholder="— — — — — —"
            class="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-center font-mono text-xl tracking-[0.5em] text-slate-800 placeholder:tracking-normal placeholder:text-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
          />
        </div>

        <div class="flex items-center justify-between text-xs">
          <span class="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <ClockIcon class="h-3.5 w-3.5" />
            اعتبار کد: <span id="otp-countdown" class="font-mono font-bold">۰۲:۰۰</span>
          </span>
          <button type="button" id="otp-resend" disabled class="font-bold text-slate-400 disabled:cursor-not-allowed">
            ارسال مجدد (<span id="otp-resend-seconds">۶۰</span>)
          </button>
        </div>

        <button
          type="submit"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl disabled:opacity-60"
        >
          <CheckIcon class="h-4 w-4" />
          تأیید و ساخت حساب
        </button>
        <button
          type="button"
          id="otp-back"
          class="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          بازگشت
        </button>
        <p id="otp-verify-msg" class="min-h-[1.25rem] text-xs font-medium" role="status" aria-live="polite"></p>
      </form>

      {devMode && (
        <div id="dev-otp-box" class="mt-5 hidden rounded-xl border border-dashed border-amber-400/70 bg-amber-50/80 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
          <p class="text-[0.7rem] font-bold text-amber-800 dark:text-amber-300">
            <i class="fas fa-flask mr-1" aria-hidden="true"></i>
            حالت دمو — پیامک واقعی ارسال نمی‌شود
          </p>
          <p class="mt-2 text-xs text-amber-800 dark:text-amber-300">
            کد آزمایشی: <span id="dev-otp-code" dir="ltr" class="font-mono text-base font-black tracking-widest"></span>
          </p>
        </div>
      )}

      <p class="mt-7 border-t border-slate-100 pt-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        قبلاً ثبت‌نام کرده‌ای؟
        <a href="/login" class="font-bold text-indigo-600 hover:underline dark:text-indigo-400">وارد شو</a>
      </p>
    </div>
  </AuthShell>
)

/* ------------------------------------------------------------------ */
/*  صفحهٔ حساب کاربری                                                  */
/* ------------------------------------------------------------------ */

export const AccountPage: FC<{ path: string; user: User; courses: { title: string; slug: string; cover: string | null; hours: number }[]; sessionsCount: number }> = ({
  path,
  user,
  courses,
  sessionsCount,
}) => (
  <PageShell path={path}>
    <section class="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
      <Blob class="absolute -top-20 left-[-6rem] h-72 w-72 opacity-15 blur-2xl" from="#6366f1" to="#06b6d4" />
      <Sparkle class="absolute right-16 top-28 h-8 w-8 text-indigo-300/60" />

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-wrap items-center justify-between gap-5">
          <div class="flex items-center gap-4">
            <span class="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-black text-white shadow-lg shadow-indigo-500/25">
              {(user.name ?? '؟').charAt(0)}
            </span>
            <div>
              <h1 class="text-2xl font-black tracking-tight">{user.name ?? 'کاربر دِوکَست'}</h1>
              <p dir="ltr" class="mt-1 font-mono text-sm text-slate-500 dark:text-slate-400">{user.phone}</p>
            </div>
          </div>
          <form method="post" action="/api/auth/logout">
            <button
              type="submit"
              class="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <i class="fas fa-sign-out-alt mr-1.5 text-xs" aria-hidden="true"></i>
              خروج
            </button>
          </form>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <div class="reveal rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              <StarIcon class="h-5 w-5" />
            </span>
            <p class="mt-4 text-2xl font-black">{courses.length.toLocaleString('fa-IR')}</p>
            <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">دورهٔ در دسترس</p>
          </div>
          <div class="reveal rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <ShieldIcon class="h-5 w-5" />
            </span>
            <p class="mt-4 text-2xl font-black">{sessionsCount.toLocaleString('fa-IR')}</p>
            <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">نشست فعال</p>
          </div>
          <div class="reveal rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <ClockIcon class="h-5 w-5" />
            </span>
            <p class="mt-4 text-2xl font-black">
              {(user.created_at ?? '').slice(0, 10).replace(/-/g, '/')}
            </p>
            <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">تاریخ عضویت</p>
          </div>
        </div>

        <div class="mt-12">
          <h2 class="reveal text-xl font-black tracking-tight">دوره‌های من</h2>
          {courses.length === 0 ? (
            <div class="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
              هنوز دوره‌ای ثبت‌نام نکرده‌ای.
              <a href="/courses" class="mr-1 font-bold text-indigo-600 hover:underline dark:text-indigo-400">مرور دوره‌ها</a>
            </div>
          ) : (
            <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <a
                  href={`/courses/${c.slug}`}
                  class="reveal group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <div class="relative h-32 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {c.cover ? (
                      <img src={c.cover} alt="" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div class="grid h-full place-items-center bg-gradient-to-br from-indigo-500/15 to-violet-500/15">
                        <CodeIcon class="h-8 w-8 text-indigo-400" />
                      </div>
                    )}
                  </div>
                  <div class="p-5">
                    <h3 class="font-extrabold leading-6 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {c.title}
                    </h3>
                    <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">{c.hours.toLocaleString('fa-IR')} ساعت</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div class="mt-12 flex flex-wrap gap-3">
          <a href="/courses" class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
            مرور همهٔ دوره‌ها
            <ArrowLeftIcon class="h-4 w-4" />
          </a>
          <a href="/paths" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">
            <UsersIcon class="h-4 w-4" />
            مسیرهای یادگیری
          </a>
        </div>
      </div>
    </section>
    <WaveDivider class="text-indigo-400" />
  </PageShell>
)
