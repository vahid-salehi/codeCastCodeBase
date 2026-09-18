import type { FC } from 'hono/jsx'
import type { Path, Course, Stats } from '../data'
import { faNum } from '../data'
import { PageShell, SectionHeading } from '../components/layout'
import { PathCard, CourseCard } from './paths'
import {
  SparkIcon,
  CheckIcon,
  PlayIcon,
  StarIcon,
  TerminalIcon,
  RouteIcon,
  UsersIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
} from '../components/icons'

/* ------------------------------------------------------------------ */
/*  داده‌های استاتیک صفحه                                             */
/* ------------------------------------------------------------------ */

const features = [
  { icon: TerminalIcon, title: 'یادگیری پروژه‌محور', desc: 'هر مفهوم را روی یک پروژه‌ی واقعی پیاده می‌کنی، نه فقط تئوری.' },
  { icon: UsersIcon, title: 'منتورینگ فارسی', desc: 'جلسات هفتگی با منتورهای شاغل در شرکت‌های بزرگ ایران.' },
  { icon: BriefcaseIcon, title: 'مسیر استخدام', desc: 'بازبینی رزومه، تمرین مصاحبه و معرفی به شرکت‌های همکار.' },
  { icon: SparkIcon, title: 'بازخورد کد', desc: 'کدت توسط مهندسان باتجربه بررسی و بهینه می‌شود.' },
  { icon: RouteIcon, title: 'مسیر سفارشی', desc: 'برنامه‌ی یادگیری بر اساس سطح و هدف شغلی تو تنظیم می‌شود.' },
  { icon: CheckIcon, title: 'گواهی معتبر', desc: 'در پایان هر مسیر، گواهی قابل‌اشتراک در لینکدین دریافت می‌کنی.' },
]

const testimonials = [
  {
    name: 'سارا محمدی',
    role: 'فرانت‌اند در دیجی‌کالا',
    quote: 'ساختار پروژه‌محور باعث شد بعد از ۷ ماه اولین پیشنهاد کاری‌ام را بگیرم. بازخورد کد واقعاً سطحم را بالا برد.',
    initial: 'س',
  },
  {
    name: 'امیر رضایی',
    role: 'بک‌اند در اسنپ',
    quote: 'منتورینگ هفتگی نقطه‌ی قوت اینجاست. وقتی روی معماری گیر می‌کردم، سریع راه درست را نشانم می‌دادند.',
    initial: 'ا',
  },
  {
    name: 'نگار کریمی',
    role: 'دیتا در کافه‌بازار',
    quote: 'از صفر شروع کردم و الان روی مدل‌های توصیه‌گر کار می‌کنم. مسیر یادگیری کاملاً شفاف و بدون سردرگمی بود.',
    initial: 'ن',
  },
]

const faqs = [
  { q: 'برای شروع به دانش قبلی نیاز دارم؟', a: 'نه. مسیرهای مقدماتی از پایه شروع می‌شوند و تنها به یک لپ‌تاپ و چند ساعت در هفته نیاز داری.' },
  { q: 'دوره‌ها آفلاین هستند یا زنده؟', a: 'درس‌ها آفلاین و همیشه در دسترس‌اند، اما جلسات منتورینگ و رفع اشکال به‌صورت زنده و هفتگی برگزار می‌شود.' },
  { q: 'بعد از هر مسیر گواهی می‌دهم؟', a: 'بله. با تکمیل پروژه‌های مسیر، گواهی اختصاصی با لینک قابل‌اشتراک برایت صادر می‌شود.' },
  { q: 'امکان پرداخت قسطی وجود دارد؟', a: 'بله، برای مسیرهای حرفه‌ای امکان پرداخت در سه قسط بدون بهره فراهم است.' },
  { q: 'اگر راضی نبودم چه می‌شود؟', a: 'تا ۱۴ روز پس از ثبت‌نام، بدون هیچ سؤالی تمام مبلغ به تو بازگردانده می‌شود.' },
]

const techs = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Next.js', 'Git']

/* ------------------------------------------------------------------ */
/*  بخش‌ها                                                            */
/* ------------------------------------------------------------------ */

const Hero: FC<{ stats: Stats }> = ({ stats }) => (
  <section id="top" class="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
    <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
    <div class="glow glow-indigo -top-20 right-[-6rem] h-80 w-80" aria-hidden="true"></div>
    <div class="glow glow-violet top-40 left-[-8rem] h-96 w-96" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
      <span class="reveal inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300">
        <SparkIcon class="h-3.5 w-3.5" />
        بیش از {faNum(stats.students)} دانشجو در حال یادگیری
      </span>

      <h1 class="reveal mt-6 text-4xl font-black leading-[1.25] tracking-tight sm:text-6xl sm:leading-[1.2]">
        برنامه‌نویسی را
        <span class="bg-gradient-to-l from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent"> پروژه‌محور </span>
        یاد بگیر
      </h1>

      <p class="reveal mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
        مسیرهای یادگیری ساختاریافته، منتورینگ فارسی و بازخورد کد واقعی — از اولین خط کد تا اولین پیشنهاد شغلی، همراهت هستیم.
      </p>

      <div class="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#cta"
          class="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-xl hover:shadow-indigo-500/40 sm:w-auto"
        >
          شروع رایگان
          <ArrowLeftIcon class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </a>
        <a
          href="/courses"
          class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <PlayIcon class="h-3.5 w-3.5" />
          تماشای دوره‌ها
        </a>
      </div>

      <div class="reveal card-gradient-border mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200/80 bg-white/80 p-1.5 shadow-2xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <div class="rounded-xl bg-slate-950 p-5 text-left" dir="ltr">
          <div class="mb-4 flex items-center gap-2">
            <span class="h-3 w-3 rounded-full bg-red-400"></span>
            <span class="h-3 w-3 rounded-full bg-amber-400"></span>
            <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
            <span class="ml-2 font-mono text-xs text-slate-500">learning-path.ts</span>
          </div>
          <pre class="overflow-x-auto font-mono text-[0.78rem] leading-6 text-slate-300 sm:text-sm"><code>{`const مسیر = [
  "HTML & CSS",
  "JavaScript",
  "React + TypeScript",
  "پروژه واقعی",
]

export async function شروع(کاربر) {
  const منتور = await مسیر.منتورینگ(کاربر)
  return منتور.رفتن_به_استخدام(کاربر) // 🚀
}`}</code></pre>
        </div>
      </div>

      <dl class="reveal mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
        <div>
          <dt class="sr-only">دانشجو</dt>
          <dd class="text-3xl font-black text-slate-900 dark:text-white" data-count={String(stats.students)}>۰</dd>
          <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">دانشجوی فعال</p>
        </div>
        <div>
          <dt class="sr-only">دوره</dt>
          <dd class="text-3xl font-black text-slate-900 dark:text-white" data-count={String(stats.courses)}>۰</dd>
          <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">دوره‌ی تخصصی</p>
        </div>
        <div>
          <dt class="sr-only">مسیر</dt>
          <dd class="text-3xl font-black text-slate-900 dark:text-white" data-count={String(stats.paths)}>۰</dd>
          <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">مسیر یادگیری</p>
        </div>
        <div>
          <dt class="sr-only">رضایت</dt>
          <dd class="text-3xl font-black text-slate-900 dark:text-white">
            <span data-count="98">۰</span>
            <span class="text-xl">٪</span>
          </dd>
          <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">رضایت دانشجویان</p>
        </div>
      </dl>
    </div>
  </section>
)

const TechMarquee: FC = () => (
  <section class="border-y border-slate-200/70 bg-slate-50/60 py-7 dark:border-slate-800 dark:bg-slate-950/40" aria-label="تکنولوژی‌های آموزشی">
    <div class="marquee-mask mx-auto max-w-6xl overflow-hidden px-4">
      <div class="animate-marquee flex w-max items-center gap-10">
        {[...techs, ...techs].map((t, i) => (
          <span key={i} class="whitespace-nowrap font-mono text-sm font-semibold text-slate-400 dark:text-slate-500">
            {t}
          </span>
        ))}
      </div>
    </div>
  </section>
)

const PathsSection: FC<{ paths: Path[] }> = ({ paths }) => (
  <section id="paths" class="relative py-20 sm:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading
        eyebrow="مسیرهای یادگیری"
        title="مسیر مناسب خودت را انتخاب کن"
        desc="هر مسیر یک نقشه‌ی راه کامل است؛ از مبانی تا پروژه‌های حرفه‌ای و آماده‌سازی برای بازار کار."
      />
      <div class="mt-12 grid gap-6 md:grid-cols-2">
        {paths.map((p) => (
          <PathCard path={p} />
        ))}
      </div>
      <div class="reveal mt-10 text-center">
        <a href="/paths" class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400">
          مشاهدهٔ همهٔ مسیرها
          <ArrowLeftIcon class="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
)

const Features: FC = () => (
  <section id="features" class="relative overflow-hidden py-20 sm:py-28">
    <div class="glow glow-cyan top-20 left-[-10rem] h-80 w-80 opacity-25" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading center eyebrow="تفاوت دِوکَست" title="چرا اینجا یاد گرفتن جواب می‌دهد؟" desc="تمرکز ما روی مهارت عملی است، نه تماشای صرف ویدیو." />
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article class="reveal group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-500/30">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-200">
              <f.icon class="h-5 w-5" />
            </span>
            <h3 class="mt-5 font-extrabold tracking-tight">{f.title}</h3>
            <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{f.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const CoursesSection: FC<{ courses: Course[] }> = ({ courses }) => (
  <section id="courses" class="bg-slate-50/70 py-20 sm:py-28 dark:bg-slate-950/40">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">دوره‌های منتخب</span>
          <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">محبوب‌ترین دوره‌های این ماه</h2>
        </div>
        <a href="/courses" class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400">
          همه‌ی دوره‌ها
          <ArrowLeftIcon class="h-4 w-4" />
        </a>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
          <CourseCard course={c} />
        ))}
      </div>
    </div>
  </section>
)

const Testimonials: FC = () => (
  <section class="py-20 sm:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading center eyebrow="داستان دانشجوها" title="مسیری که واقعاً به شغل رسید" />
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure class="reveal flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            <div class="flex gap-0.5 text-amber-400" aria-label="امتیاز ۵ از ۵">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} class="h-4 w-4" />
              ))}
            </div>
            <blockquote class="mt-5 flex-1 text-sm leading-8 text-slate-700 dark:text-slate-300">«{t.quote}»</blockquote>
            <figcaption class="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
              <span class="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                {t.initial}
              </span>
              <span>
                <span class="block text-sm font-bold">{t.name}</span>
                <span class="block text-xs text-slate-500 dark:text-slate-400">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
)

const Faq: FC = () => (
  <section id="faq" class="bg-slate-50/70 py-20 sm:py-28 dark:bg-slate-950/40">
    <div class="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div class="reveal">
        <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">سؤالات متداول</span>
        <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">هر سؤالی داری، اینجا جواب بگیر</h2>
        <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">
          اگر پاسخ سوالت را پیدا نکردی، تیم پشتیبانی ما هر روز هفته در دسترس است.
        </p>
      </div>
      <div class="reveal divide-y divide-slate-200 dark:divide-slate-800">
        {faqs.map((f, i) => (
          <details class="group py-5" open={i === 0}>
            <summary class="flex items-center justify-between gap-4">
              <span class="font-bold leading-7">{f.q}</span>
              <span class="faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-400">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)

const Cta: FC<{ signupCount: number }> = ({ signupCount }) => (
  <section id="cta" class="px-4 py-20 sm:px-6 sm:py-28">
    <div class="reveal relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center sm:px-16 dark:bg-slate-900/80">
      <div class="glow glow-indigo top-[-4rem] right-[-2rem] h-72 w-72 opacity-50" aria-hidden="true"></div>
      <div class="glow glow-violet bottom-[-4rem] left-[-2rem] h-72 w-72 opacity-50" aria-hidden="true"></div>

      <div class="relative">
        <h2 class="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">امروز اولین خط کدت را بنویس</h2>
        <p class="mx-auto mt-5 max-w-xl leading-8 text-slate-300">
          ثبت‌نام رایگان است و تا ۱۴ روز بدون هیچ سؤالی قابل بازگشت. فقط ایمیلت را وارد کن.
        </p>
        <p class="mt-3 text-xs font-semibold text-indigo-300">
          تاکنون <span data-signup-count>{faNum(signupCount)}</span> نفر ثبت‌نام کرده‌اند
        </p>

        <form id="signup-form" class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" novalidate>
          <label class="sr-only" for="email">ایمیل</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            autocomplete="email"
            placeholder="you@example.com"
            class="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-center text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none sm:text-left"
          />
          <button
            type="submit"
            class="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-200 disabled:opacity-60"
          >
            ثبت‌نام رایگان
          </button>
        </form>
        <p id="form-msg" class="mt-3 min-h-[1.25rem] text-xs font-medium text-emerald-400" role="status" aria-live="polite"></p>
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------ */
/*  صفحه                                                              */
/* ------------------------------------------------------------------ */

export const HomePage: FC<{ paths: Path[]; courses: Course[]; stats: Stats }> = ({ paths, courses, stats }) => (
  <PageShell path="/">
    <Hero stats={stats} />
    <TechMarquee />
    <PathsSection paths={paths} />
    <Features />
    <CoursesSection courses={courses.slice(0, 4)} />
    <Testimonials />
    <Faq />
    <Cta signupCount={stats.signups + 12480} />
  </PageShell>
)
