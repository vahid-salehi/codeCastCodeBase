import type { FC } from 'hono/jsx'
import type { Course, Lesson, Path } from '../data'
import { faNum, toman } from '../data'
import { PageShell, SectionHeading, Badge, Breadcrumbs, BackLink } from '../components/layout'
import { CourseCard } from './paths'
import {
  StarIcon,
  ClockIcon,
  UsersIcon,
  PlayIcon,
  CheckIcon,
  ArrowLeftIcon,
  ShieldIcon,
  BriefcaseIcon,
  TerminalIcon,
} from '../components/icons'

/* ------------------------------------------------------------------ */
/*  /courses — فهرست دوره‌ها                                           */
/* ------------------------------------------------------------------ */

export const CoursesPage: FC<{
  path: string
  courses: Course[]
  paths: Path[]
  activePath?: string
}> = ({ path, courses, paths, activePath }) => (
  <PageShell path={path}>
    <section class="relative overflow-hidden pt-32 pb-12 sm:pt-40">
      <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
      <div class="glow glow-indigo -top-20 left-[-6rem] h-72 w-72" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumbs items={[{ href: '/', label: 'خانه' }, { label: 'دوره‌ها' }]} />
        <SectionHeading
          eyebrow="کتابخانه دوره‌ها"
          title="همهٔ دوره‌های دِوکَست"
          desc="دوره‌های پروژه‌محور با تمرین عملی، بازخورد کد و پشتیبانی فارسی."
        />

        <div class="reveal mt-8 flex flex-wrap gap-2">
          <a
            href="/courses"
            aria-current={!activePath ? 'page' : undefined}
            class={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
              !activePath
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300'
            }`}
          >
            همه
          </a>
          {paths.map((p) => (
            <a
              href={`/courses?path=${p.slug}`}
              aria-current={activePath === p.slug ? 'page' : undefined}
              class={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                activePath === p.slug
                  ? 'border-indigo-500 bg-indigo-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300'
              }`}
            >
              {p.title}
            </a>
          ))}
        </div>
      </div>
    </section>

    <section class="pb-24">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <p class="reveal mb-6 text-sm font-medium text-slate-500 dark:text-slate-400" aria-live="polite">
          {faNum(courses.length)} دوره یافت شد
        </p>
        {courses.length === 0 ? (
          <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
            دوره‌ای با این فیلتر پیدا نشد.
          </div>
        ) : (
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard course={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  </PageShell>
)

/* ------------------------------------------------------------------ */
/*  /courses/:slug — جزئیات دوره                                      */
/* ------------------------------------------------------------------ */

const includes = [
  { icon: PlayIcon, text: 'دسترسی همیشگی به ویدیوها و منابع' },
  { icon: TerminalIcon, text: 'پروژه‌ی عملی و تمرین کدنویسی' },
  { icon: UsersIcon, text: 'پشتیبانی و پرسش‌وپاسخ فارسی' },
  { icon: ShieldIcon, text: '۱۴ روز ضمانت بازگشت وجه' },
  { icon: BriefcaseIcon, text: 'مدرک پایان دوره برای رزومه' },
]

export const CourseDetailPage: FC<{
  path: string
  course: Course
  lessons: Lesson[]
  related: Course[]
  found: boolean
}> = ({ path, course: c, lessons, related, found }) => (
  <PageShell path={path}>
    <section class="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
      <div class="glow glow-cyan top-20 right-[-6rem] h-72 w-72 opacity-30" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { href: '/', label: 'خانه' },
            { href: '/courses', label: 'دوره‌ها' },
            { label: c.title },
          ]}
        />

        {!found && (
          <div class="mb-6 rounded-xl border border-amber-300/60 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            این دوره یافت نشد؛ داده‌های ذخیره‌شدهٔ نمونه نمایش داده می‌شود.
          </div>
        )}

        <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {c.path_title && c.path_slug && (
              <a
                href={`/paths/${c.path_slug}`}
                class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                بخشی از مسیر {c.path_title}
              </a>
            )}

            <h1 class="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">{c.title}</h1>
            {c.subtitle && <p class="mt-3 text-lg text-slate-600 dark:text-slate-400">{c.subtitle}</p>}

            <div class="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span class="inline-flex items-center gap-1.5">
                <StarIcon class="h-4 w-4 text-amber-400" />
                <strong class="font-bold text-slate-900 dark:text-white">{faNum(c.rating)}</strong>
                امتیاز
              </span>
              <span class="inline-flex items-center gap-1.5">
                <UsersIcon class="h-4 w-4" />
                {faNum(c.students)} دانشجو
              </span>
              <span class="inline-flex items-center gap-1.5">
                <ClockIcon class="h-4 w-4" />
                {faNum(c.hours)} ساعت
              </span>
              {c.level && <Badge>{c.level}</Badge>}
            </div>

            <p class="mt-8 leading-8 text-slate-700 dark:text-slate-300">{c.description}</p>

            <div class="mt-10">
              <h2 class="text-xl font-black tracking-tight">سرفصل‌های دوره</h2>
              {lessons.length === 0 ? (
                <div class="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
                  سرفصلی برای این دوره ثبت نشده است.
                </div>
              ) : (
                <ol class="mt-5 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                  {lessons.map((l) => (
                    <li class="flex items-center gap-4 bg-white px-5 py-4 dark:bg-slate-900/40">
                      <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {faNum(l.lesson_no)}
                      </span>
                      <span class="flex-1 font-semibold">{l.title}</span>
                      <span class="shrink-0 text-xs text-slate-400">{faNum(l.minutes)} دقیقه</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          <aside class="lg:sticky lg:top-28 lg:h-fit">
            <div class="glass overflow-hidden rounded-2xl p-6">
              <div class={`-m-6 mb-6 h-1.5 bg-gradient-to-l ${c.accent ?? 'from-indigo-400 to-violet-600'}`}></div>

              <div class="flex items-end justify-between">
                <div>
                  <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">قیمت دوره</p>
                  <p class="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                    {toman(c.price)}
                    {c.price !== 0 && <span class="mr-1.5 text-sm font-medium text-slate-400">تومان</span>}
                  </p>
                </div>
                {c.price === 0 && <Badge tone="emerald">رایگان</Badge>}
              </div>

              <a
                href="/#cta"
                class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl"
              >
                ثبت‌نام در دوره
                <ArrowLeftIcon class="h-4 w-4" />
              </a>
              <a
                href="/#cta"
                class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <PlayIcon class="h-3.5 w-3.5" />
                پیش‌نمایش رایگان
              </a>

              <h2 class="mt-7 text-sm font-bold">این دوره شامل:</h2>
              <ul class="mt-4 space-y-3">
                {includes.map((item) => (
                  <li class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <CheckIcon class="h-3 w-3" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              {c.instructor && (
                <div class="mt-7 flex items-center gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                  <span class="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                    {c.instructor.charAt(0)}
                  </span>
                  <span>
                    <span class="block text-sm font-bold">{c.instructor}</span>
                    <span class="block text-xs text-slate-500 dark:text-slate-400">مدرس دوره</span>
                  </span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>

    {related.length > 0 && (
      <section class="bg-slate-50/70 py-20 dark:bg-slate-950/40">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 class="reveal text-2xl font-black tracking-tight">دوره‌های مرتبط</h2>
          <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <CourseCard course={r} />
            ))}
          </div>
          <div class="mt-10">
            <BackLink href="/courses" label="بازگشت به همهٔ دوره‌ها" />
          </div>
        </div>
      </section>
    )}
  </PageShell>
)
