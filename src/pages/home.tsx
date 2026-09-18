import type { FC } from 'hono/jsx'
import {
  CodeIcon,
  ArrowLeftIcon,
  SunIcon,
  MoonIcon,
  SparkIcon,
  CheckIcon,
  PlayIcon,
  StarIcon,
  TerminalIcon,
  RouteIcon,
  UsersIcon,
  BriefcaseIcon,
} from '../components/icons'

/* ------------------------------------------------------------------ */
/*  داده‌های صفحه                                                      */
/* ------------------------------------------------------------------ */

const paths = [
  {
    icon: CodeIcon,
    tag: 'پرطرفدارترین',
    title: 'توسعه وب فرانت‌اند',
    desc: 'از HTML و CSS تا React و معماری کامپوننتی — ساخت رابط‌های مدرن و سریع.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'],
    months: '۶ ماه',
    featured: true,
  },
  {
    icon: TerminalIcon,
    tag: 'بک‌اند',
    title: 'مهندسی بک‌اند',
    desc: 'طراحی API، پایگاه‌داده و سیستم‌های مقیاس‌پذیر روی سرورهای ابری.',
    skills: ['Node.js', 'PostgreSQL', 'REST', 'Docker'],
    months: '۷ ماه',
  },
  {
    icon: SparkIcon,
    tag: 'جدید',
    title: 'هوش مصنوعی و داده',
    desc: 'مبانی یادگیری ماشین، کار با داده و ساخت اپلیکیشن‌های هوشمند.',
    skills: ['Python', 'Pandas', 'ML', 'LLM'],
    months: '۸ ماه',
  },
  {
    icon: RouteIcon,
    tag: 'موبایل',
    title: 'اپلیکیشن موبایل',
    desc: 'ساخت اپ‌های چندسکویی با تجربه‌ی کاربری بومی و انتشار در استورها.',
    skills: ['React Native', 'Expo', 'API', 'UI'],
    months: '۵ ماه',
  },
]

const features = [
  {
    icon: TerminalIcon,
    title: 'یادگیری پروژه‌محور',
    desc: 'هر مفهوم را روی یک پروژه‌ی واقعی پیاده می‌کنی، نه فقط تئوری.',
  },
  {
    icon: UsersIcon,
    title: 'منتورینگ فارسی',
    desc: 'جلسات هفتگی با منتورهای شاغل در شرکت‌های بزرگ ایران.',
  },
  {
    icon: BriefcaseIcon,
    title: 'مسیر استخدام',
    desc: 'بازبینی رزومه، تمرین مصاحبه و معرفی به شرکت‌های همکار.',
  },
  {
    icon: SparkIcon,
    title: 'بازخورد کد',
    desc: 'کدت توسط مهندسان باتجربه بررسی و بهینه می‌شود.',
  },
  {
    icon: RouteIcon,
    title: 'مسیر سفارشی',
    desc: 'برنامه‌ی یادگیری بر اساس سطح و هدف شغلی تو تنظیم می‌شود.',
  },
  {
    icon: CheckIcon,
    title: 'گواهی معتبر',
    desc: 'در پایان هر مسیر، گواهی قابل‌اشتراک در لینکدین دریافت می‌کنی.',
  },
]

const courses = [
  {
    title: 'مبانی JavaScript مدرن',
    level: 'مقدماتی',
    hours: 18,
    rating: 4.9,
    students: 3240,
    price: 'رایگان',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    title: 'React از صفر تا پروژه',
    level: 'متوسط',
    hours: 26,
    rating: 4.8,
    students: 2115,
    price: '۹۸۰٫۰۰۰',
    accent: 'from-sky-400 to-blue-600',
  },
  {
    title: 'طراحی API با Node.js',
    level: 'متوسط',
    hours: 22,
    rating: 4.9,
    students: 1780,
    price: '۱٫۲۴۰٫۰۰۰',
    accent: 'from-emerald-400 to-teal-600',
  },
  {
    title: 'پایتون برای داده',
    level: 'مقدماتی',
    hours: 20,
    rating: 4.7,
    students: 2560,
    price: 'رایگان',
    accent: 'from-violet-400 to-purple-600',
  },
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
  {
    q: 'برای شروع به دانش قبلی نیاز دارم؟',
    a: ' نه. مسیرهای مقدماتی از پایه شروع می‌شوند و تنها به یک لپ‌تاپ و چند ساعت در هفته نیاز داری.',
  },
  {
    q: 'دوره‌ها آفلاین هستند یا زنده؟',
    a: 'درس‌ها آفلاین و همیشه در دسترس‌اند، اما جلسات منتورینگ و رفع اشکال به‌صورت زنده و هفتگی برگزار می‌شود.',
  },
  {
    q: 'بعد از هر مسیر گواهی می‌دهم؟',
    a: 'بله. با تکمیل پروژه‌های مسیر، گواهی اختصاصی با لینک قابل‌اشتراک برایت صادر می‌شود.',
  },
  {
    q: 'امکان پرداخت قسطی وجود دارد؟',
    a: 'بله، برای مسیرهای حرفه‌ای امکان پرداخت در سه قسط بدون بهره فراهم است.',
  },
  {
    q: 'اگر راضی نبودم چه می‌شود؟',
    a: 'تا ۱۴ روز پس از ثبت‌نام، بدون هیچ سؤالی تمام مبلغ به تو بازگردانده می‌شود.',
  },
]

const techs = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'PostgreSQL', 'Docker', 'Tailwind CSS', 'Next.js', 'Git',
]

/* ------------------------------------------------------------------ */
/*  بخش‌ها                                                            */
/* ------------------------------------------------------------------ */

const Nav: FC = () => (
  <header class="fixed inset-x-0 top-0 z-50">
    <nav class="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
      <a href="#top" class="flex items-center gap-2.5" aria-label="دِوکَست">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
          <CodeIcon class="h-5 w-5" />
        </span>
        <span class="text-lg font-extrabold tracking-tight">دِوکَست</span>
      </a>

      <ul class="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
        <li><a href="#paths" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">مسیرها</a></li>
        <li><a href="#courses" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">دوره‌ها</a></li>
        <li><a href="#features" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">چرا ما</a></li>
        <li><a href="#faq" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">سؤالات</a></li>
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
        <a
          href="#cta"
          class="hidden rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 sm:inline-block dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          شروع رایگان
        </a>
        <button
          id="menu-toggle"
          type="button"
          aria-label="منو"
          aria-expanded="false"
          class="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </nav>

    <div
      id="mobile-menu"
      class="glass mx-3 mt-2 hidden flex-col gap-1 rounded-2xl p-3 text-sm font-medium md:hidden"
    >
      <a href="#paths" class="rounded-lg px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">مسیرها</a>
      <a href="#courses" class="rounded-lg px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">دوره‌ها</a>
      <a href="#features" class="rounded-lg px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">چرا ما</a>
      <a href="#faq" class="rounded-lg px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">سؤالات</a>
      <a href="#cta" class="mt-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-white dark:bg-white dark:text-slate-900">شروع رایگان</a>
    </div>
  </header>
)

const Hero: FC = () => (
  <section id="top" class="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
    <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
    <div class="glow glow-indigo -top-20 right-[-6rem] h-80 w-80" aria-hidden="true"></div>
    <div class="glow glow-violet top-40 left-[-8rem] h-96 w-96" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
      <span class="reveal inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300">
        <SparkIcon class="h-3.5 w-3.5" />
        بیش از ۱۲٬۰۰۰ دانشجو در حال یادگیری
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
          href="#courses"
          class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <PlayIcon class="h-3.5 w-3.5" />
          تماشای دوره‌ها
        </a>
      </div>

      {/* کارت کد */}
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

      {/* آمار */}
      <dl class="reveal mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
        <div>
          <dt class="sr-only">دانشجو</dt>
          <dd class="text-3xl font-black text-slate-900 dark:text-white" data-count="12000">۰</dd>
          <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">دانشجوی فعال</p>
        </div>
        <div>
          <dt class="sr-only">دوره</dt>
          <dd class="text-3xl font-black text-slate-900 dark:text-white" data-count="85">۰</dd>
          <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">دوره‌ی تخصصی</p>
        </div>
        <div>
          <dt class="sr-only">منتور</dt>
          <dd class="text-3xl font-black text-slate-900 dark:text-white" data-count="40">۰</dd>
          <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">منتور حرفه‌ای</p>
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
  <section class="border-y border-slate-200/70 bg-slate-50/60 py-7 dark:border-slate-800 dark:bg-slate-950/40">
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

const Paths: FC = () => (
  <section id="paths" class="relative py-20 sm:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="reveal max-w-2xl">
        <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">مسیرهای یادگیری</span>
        <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">مسیر مناسب خودت را انتخاب کن</h2>
        <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">
          هر مسیر یک نقشه‌ی راه کامل است؛ از مبانی تا پروژه‌های حرفه‌ای و آماده‌سازی برای بازار کار.
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2">
        {paths.map((p) => (
          <article
            class={`reveal card-gradient-border group relative overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 ${
              p.featured
                ? 'border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white shadow-lg shadow-indigo-500/5 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:to-slate-900/40'
                : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/40'
            }`}
          >
            <div class="flex items-start justify-between gap-4">
              <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                <p.icon class="h-6 w-6" />
              </span>
              <span class="rounded-full bg-slate-100 px-3 py-1 text-[0.7rem] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {p.tag}
              </span>
            </div>

            <h3 class="mt-5 text-xl font-extrabold tracking-tight">{p.title}</h3>
            <p class="mt-2.5 text-sm leading-7 text-slate-600 dark:text-slate-400">{p.desc}</p>

            <ul class="mt-5 flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <li class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                  {s}
                </li>
              ))}
            </ul>

            <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">مدت: {p.months}</span>
              <a
                href="#cta"
                class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition group-hover:gap-2.5 dark:text-indigo-400"
              >
                مشاهده مسیر
                <ArrowLeftIcon class="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const Features: FC = () => (
  <section id="features" class="relative overflow-hidden py-20 sm:py-28">
    <div class="glow glow-cyan top-20 left-[-10rem] h-80 w-80 opacity-25" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
      <div class="reveal mx-auto max-w-2xl text-center">
        <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">تفاوت دِوکَست</span>
        <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">چرا اینجا یاد گرفتن جواب می‌دهد؟</h2>
        <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">
          تمرکز ما روی مهارت عملی است، نه تماشای صرف ویدیو.
        </p>
      </div>

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

const Courses: FC = () => (
  <section id="courses" class="bg-slate-50/70 py-20 sm:py-28 dark:bg-slate-950/40">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">دوره‌های منتخب</span>
          <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">محبوب‌ترین دوره‌های این ماه</h2>
        </div>
        <a href="#cta" class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400">
          همه‌ی دوره‌ها
          <ArrowLeftIcon class="h-4 w-4" />
        </a>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
          <article class="reveal group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60">
            <div class={`h-1.5 bg-gradient-to-l ${c.accent}`}></div>
            <div class="flex flex-1 flex-col p-5">
              <span class="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[0.7rem] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {c.level}
              </span>
              <h3 class="mt-4 font-extrabold leading-7 tracking-tight">{c.title}</h3>

              <div class="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span class="inline-flex items-center gap-1">
                  <StarIcon class="h-3.5 w-3.5 text-amber-400" />
                  {c.rating.toLocaleString('fa-IR')}
                </span>
                <span>•</span>
                <span>{c.hours.toLocaleString('fa-IR')} ساعت</span>
              </div>

              <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span class="text-sm font-extrabold text-slate-900 dark:text-white">
                  {c.price}
                  {c.price !== 'رایگان' && <span class="mr-1 text-[0.7rem] font-medium text-slate-400">تومان</span>}
                </span>
                <span class="text-[0.7rem] text-slate-400">{c.students.toLocaleString('fa-IR')} دانشجو</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials: FC = () => (
  <section class="py-20 sm:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="reveal mx-auto max-w-2xl text-center">
        <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">داستان دانشجوها</span>
        <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">مسیری که واقعاً به شغل رسید</h2>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure class="reveal flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            <div class="flex gap-0.5 text-amber-400" aria-label="امتیاز ۵ از ۵">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} class="h-4 w-4" />
              ))}
            </div>
            <blockquote class="mt-5 flex-1 text-sm leading-8 text-slate-700 dark:text-slate-300">
              «{t.quote}»
            </blockquote>
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
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
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

const Cta: FC = () => (
  <section id="cta" class="px-4 py-20 sm:px-6 sm:py-28">
    <div class="reveal relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center sm:px-16 dark:bg-slate-900/80">
      <div class="glow glow-indigo top-[-4rem] right-[-2rem] h-72 w-72 opacity-50" aria-hidden="true"></div>
      <div class="glow glow-violet bottom-[-4rem] left-[-2rem] h-72 w-72 opacity-50" aria-hidden="true"></div>

      <div class="relative">
        <h2 class="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
          امروز اولین خط کدت را بنویس
        </h2>
        <p class="mx-auto mt-5 max-w-xl leading-8 text-slate-300">
          ثبت‌نام رایگان است و تا ۱۴ روز بدون هیچ سؤالی قابل بازگشت. فقط ایمیلت را وارد کن.
        </p>

        <form id="signup-form" class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" novalidate>
          <label class="sr-only" for="email">ایمیل</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            placeholder="you@example.com"
            class="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-center text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none sm:text-left"
          />
          <button
            type="submit"
            class="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-200"
          >
            ثبت‌نام رایگان
          </button>
        </form>
        <p id="form-msg" class="mt-3 min-h-[1.25rem] text-xs font-medium text-emerald-400" aria-live="polite"></p>
      </div>
    </div>
  </section>
)

const Footer: FC = () => (
  <footer class="border-t border-slate-200 py-14 dark:border-slate-800">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-1">
          <a href="#top" class="flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              <CodeIcon class="h-5 w-5" />
            </span>
            <span class="text-lg font-extrabold tracking-tight">دِوکَست</span>
          </a>
          <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            آکادمی برنامه‌نویسی پروژه‌محور، برای ساختن نسل بعدی مهندسان نرم‌افزار ایران.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-bold">یادگیری</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="#paths" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">مسیرهای یادگیری</a></li>
            <li><a href="#courses" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">دوره‌ها</a></li>
            <li><a href="#features" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">منتورینگ</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold">شرکت</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="#" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">درباره ما</a></li>
            <li><a href="#" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">وبلاگ</a></li>
            <li><a href="#" class="transition hover:text-indigo-600 dark:hover:text-indigo-400">تماس با ما</a></li>
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

/* ------------------------------------------------------------------ */
/*  صفحه                                                              */
/* ------------------------------------------------------------------ */

export const HomePage: FC = () => (
  <>
    <a
      href="#top"
      class="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:m-3 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      رفتن به محتوای اصلی
    </a>
    <Nav />
    <main>
      <Hero />
      <TechMarquee />
      <Paths />
      <Features />
      <Courses />
      <Testimonials />
      <Faq />
      <Cta />
    </main>
    <Footer />
    <script src="/static/app.js" defer></script>
  </>
)
