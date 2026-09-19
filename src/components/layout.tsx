import type { FC, Child } from 'hono/jsx'
import { CodeIcon, SunIcon, MoonIcon, ArrowLeftIcon, SparkIcon } from './icons'

type NavItem = { href: string; label: string }

const navItems: NavItem[] = [
  { href: '/paths', label: 'مسیرها' },
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/#features', label: 'چرا ما' },
  { href: '/#faq', label: 'سؤالات' },
]

const isActive = (href: string, path: string) =>
  href !== '/' && !href.startsWith('/#') && path.startsWith(href)

export const Logo: FC<{ class?: string }> = ({ class: cls = '' }) => (
  <a href="/" class={`flex items-center gap-2.5 ${cls}`} aria-label="دِوکَست — صفحه اصلی">
    <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
      <CodeIcon class="h-5 w-5" />
    </span>
    <span class="text-lg font-extrabold tracking-tight">دِوکَست</span>
  </a>
)

export const Nav: FC<{ path: string; user?: { name: string | null; phone: string } | null }> = ({ path, user }) => (
  <header class="fixed inset-x-0 top-0 z-50">
    <nav class="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6" aria-label="ناوبری اصلی">
      <Logo />

      <ul class="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
        {navItems.map((item) => (
          <li>
            <a
              href={item.href}
              aria-current={isActive(item.href, path) ? 'page' : undefined}
              class={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                isActive(item.href, path) ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div class="flex items-center gap-2">
        <button
          id="theme-toggle"
          type="button"
          aria-label="تغییر حالت روشن و تاریک"
          class="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <SunIcon class="h-5 w-5 hidden dark:block" />
          <MoonIcon class="h-5 w-5 block dark:hidden" />
        </button>
        {user ? (
          <a
            href="/account"
            class="hidden items-center gap-2 rounded-xl bg-slate-900 py-1.5 pl-3 pr-1.5 text-sm font-semibold text-white transition hover:bg-slate-700 sm:inline-flex dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <span class="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-[0.7rem] font-black text-white">
              {(user.name ?? '؟').charAt(0)}
            </span>
            <span class="max-w-[7rem] truncate">{user.name ?? 'حساب من'}</span>
          </a>
        ) : (
          <>
            <a
              href="/login"
              class="hidden rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:inline-block dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              ورود
            </a>
            <a
              href="/register"
              class="hidden rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 sm:inline-block dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              شروع رایگان
            </a>
          </>
        )}
        <button
          id="menu-toggle"
          type="button"
          aria-label="منو"
          aria-expanded="false"
          aria-controls="mobile-menu"
          class="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </nav>

    <div id="mobile-menu" class="glass mx-3 mt-2 hidden flex-col gap-1 rounded-2xl p-3 text-sm font-medium md:hidden">
      {navItems.map((item) => (
        <a href={item.href} class="rounded-lg px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
          {item.label}
        </a>
      ))}
      {user ? (
        <a href="/account" class="mt-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-white dark:bg-white dark:text-slate-900">
          حساب من
        </a>
      ) : (
        <>
          <a href="/login" class="rounded-lg border border-slate-200 px-3 py-2 text-center dark:border-slate-700">ورود</a>
          <a href="/register" class="mt-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-white dark:bg-white dark:text-slate-900">
            شروع رایگان
          </a>
        </>
      )}
    </div>
  </header>
)

export const Footer: FC = () => (
  <footer class="border-t border-slate-200 py-14 dark:border-slate-800">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            آکادمی برنامه‌نویسی پروژه‌محور، برای ساختن نسل بعدی مهندسان نرم‌افزار ایران.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-bold">یادگیری</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="/paths" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">مسیرهای یادگیری</a></li>
            <li><a href="/courses" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">همهٔ دوره‌ها</a></li>
            <li><a href="/#features" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">منتورینگ</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold">شرکت</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="/#faq" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">سؤالات متداول</a></li>
            <li><a href="/#features" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">درباره ما</a></li>
            <li><a href="/#cta" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">تماس با ما</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold">ما را دنبال کن</h3>
          <div class="mt-4 flex gap-2">
            {['github', 'linkedin', 'twitter', 'youtube'].map((s) => (
              <a
                href="#"
                aria-label={s}
                class="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:text-indigo-400"
              >
                <i class={`fab fa-${s} text-sm`} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-500">
        <p>© ۱۴۰۴ دِوکَست — تمامی حقوق محفوظ است.</p>
        <p class="flex items-center gap-4">
          <a href="#" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">قوانین</a>
          <a href="#" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">حریم خصوصی</a>
        </p>
      </div>
    </div>
  </footer>
)

export const Breadcrumbs: FC<{ items: { href?: string; label: string }[] }> = ({ items }) => (
  <nav aria-label="مسیر راهنما" class="mb-6">
    <ol class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
      {items.map((item, i) => (
        <li class="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" class="text-slate-300 dark:text-slate-600">/</span>}
          {item.href ? (
            <a href={item.href} class="transition hover:text-indigo-600 dark:hover:text-indigo-400">{item.label}</a>
          ) : (
            <span class="text-slate-700 dark:text-slate-200" aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
)

export const PageShell: FC<{ path: string; user?: { name: string | null; phone: string } | null; children: Child }> = ({
  path,
  user,
  children,
}) => (
  <>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:m-3 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      رفتن به محتوای اصلی
    </a>
    <Nav path={path} user={user} />
    <main id="main">{children}</main>
    <Footer />

    {/* مودال پخش ویدیوی جلسات */}
    <div
      id="lesson-modal"
      class="fixed inset-0 z-[70] hidden items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="پخش پیش‌نمایش جلسه"
    >
      <div class="relative w-full max-w-4xl">
        <div class="mb-3 flex items-center justify-between gap-4">
          <h3 data-modal-title class="truncate text-sm font-bold text-white">پیش‌نمایش جلسه</h3>
          <button
            type="button"
            data-modal-close
            aria-label="بستن"
            class="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/20 text-white transition hover:bg-white/10"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <video class="aspect-video w-full rounded-2xl bg-black ring-1 ring-white/10" controls playsinline preload="none"></video>
      </div>
    </div>

    <script src="/static/app.js" defer></script>
  </>
)

export const Badge: FC<{ children: Child; tone?: 'indigo' | 'slate' | 'emerald' | 'amber' }> = ({
  children,
  tone = 'slate',
}) => {
  const tones: Record<string, string> = {
    indigo: 'border-indigo-200/60 bg-indigo-50/70 text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300',
    slate: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300',
    emerald: 'border-emerald-200/60 bg-emerald-50/70 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300',
    amber: 'border-amber-200/60 bg-amber-50/70 text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300',
  }
  return (
    <span class={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-bold ${tones[tone]}`}>
      {children}
    </span>
  )
}

export const SectionHeading: FC<{ eyebrow?: string; title: string; desc?: string; center?: boolean }> = ({
  eyebrow,
  title,
  desc,
  center,
}) => (
  <div class={`reveal ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
    {eyebrow && (
      <span class="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
        <SparkIcon class="h-3.5 w-3.5" />
        {eyebrow}
      </span>
    )}
    <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
    {desc && <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">{desc}</p>}
  </div>
)

export const BackLink: FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    class="group inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
  >
    <span class="rotate-180 transition-transform group-hover:-translate-x-1">
      <ArrowLeftIcon class="h-4 w-4" />
    </span>
    {label}
  </a>
)
