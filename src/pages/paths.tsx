import type { FC } from 'hono/jsx'
import type { Path, PathStep, Course } from '../data'
import { faNum, toman } from '../data'
import { PageShell, SectionHeading, Badge, Breadcrumbs, BackLink, Logo, Footer } from '../components/layout'
import {
  CodeIcon,
  TerminalIcon,
  SparkIcon,
  RouteIcon,
  UsersIcon,
  BriefcaseIcon,
  ShieldIcon,
  ClockIcon,
  ArrowLeftIcon,
  StarIcon,
  CheckIcon,
  PlayIcon,
} from '../components/icons'

const iconMap: Record<string, FC<{ class?: string }>> = {
  code: CodeIcon,
  terminal: TerminalIcon,
  spark: SparkIcon,
  route: RouteIcon,
  users: UsersIcon,
  briefcase: BriefcaseIcon,
  shield: ShieldIcon,
  clock: ClockIcon,
}

export const PathIcon: FC<{ name: string; class?: string }> = ({ name, class: cls }) => {
  const Icon = iconMap[name] ?? CodeIcon
  return <Icon class={cls ?? 'h-5 w-5'} />
}

/* ------------------------------------------------------------------ */
/*  کارت مسیر (قابل استفاده در چند صفحه)                               */
/* ------------------------------------------------------------------ */

export const PathCard: FC<{ path: Path; index?: number }> = ({ path: p }) => (
  <article
    class={`reveal card-gradient-border group relative flex flex-col overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 ${
      p.featured
        ? 'border-indigo-200 bg-white shadow-lg shadow-indigo-500/5 dark:border-indigo-500/30 dark:bg-slate-900/50'
        : 'border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/40'
    }`}
  >
    {/* تصویر جلد */}
    <div class="relative h-40 overflow-hidden bg-slate-100 sm:h-44 dark:bg-slate-800">
      {p.image ? (
        <img
          src={p.image}
          alt=""
          loading="lazy"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div class="grid h-full place-items-center bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
          <PathIcon name={p.icon} class="h-10 w-10 text-indigo-400" />
        </div>
      )}
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" aria-hidden="true"></div>
      <div class="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-md ring-1 ring-white/25">
          <PathIcon name={p.icon} class="h-5 w-5" />
        </span>
        {p.tag && (
          <span class="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur-md">
            {p.tag}
          </span>
        )}
      </div>
    </div>

    <div class="flex flex-1 flex-col p-6 sm:p-7">
      <h3 class="text-xl font-extrabold tracking-tight">{p.title}</h3>
      <p class="mt-2.5 text-sm leading-7 text-slate-600 dark:text-slate-400">{p.summary}</p>

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
          href={`/paths/${p.slug}`}
          class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition group-hover:gap-2.5 dark:text-indigo-400"
        >
          مشاهده مسیر
          <ArrowLeftIcon class="h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
)

/* ------------------------------------------------------------------ */
/*  کارت دوره (قابل استفاده در چند صفحه)                               */
/* ------------------------------------------------------------------ */

export const CourseCard: FC<{ course: Course }> = ({ course: c }) => (
  <article class="reveal group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60">
    {/* جلد دوره */}
    <div class="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
      {c.cover ? (
        <img
          src={c.cover}
          alt=""
          loading="lazy"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div class={`h-full w-full bg-gradient-to-br ${c.accent ?? 'from-indigo-400 to-violet-600'} opacity-70`}></div>
      )}
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" aria-hidden="true"></div>
      <div class="absolute inset-x-4 bottom-3 flex items-end justify-between gap-2">
        {c.level && (
          <span class="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold text-white backdrop-blur-md">
            {c.level}
          </span>
        )}
        <span class="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold text-white backdrop-blur-md">
          {c.price === 0 ? 'رایگان' : 'پرمخاطب'}
        </span>
      </div>
      <span class={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${c.accent ?? 'from-indigo-400 to-violet-600'}`} aria-hidden="true"></span>
    </div>

    <div class="flex flex-1 flex-col p-5">
      {c.path_title && (
        <span class="truncate text-[0.7rem] font-bold text-indigo-600 dark:text-indigo-400">{c.path_title}</span>
      )}

      <h3 class="mt-2 font-extrabold leading-7 tracking-tight">
        <a href={`/courses/${c.slug}`} class="transition hover:text-indigo-600 dark:hover:text-indigo-400">
          {c.title}
        </a>
      </h3>
      {c.subtitle && <p class="mt-1.5 text-xs leading-6 text-slate-500 dark:text-slate-400">{c.subtitle}</p>}

      <div class="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span class="inline-flex items-center gap-1">
          <StarIcon class="h-3.5 w-3.5 text-amber-400" />
          {faNum(c.rating)}
        </span>
        <span aria-hidden="true">•</span>
        <span>{faNum(c.hours)} ساعت</span>
        <span aria-hidden="true">•</span>
        <span>{faNum(c.lessons)} درس</span>
      </div>

      <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span class="text-sm font-extrabold text-slate-900 dark:text-white">
          {toman(c.price)}
          {c.price !== 0 && <span class="mr-1 text-[0.7rem] font-medium text-slate-400">تومان</span>}
        </span>
        <span class="text-[0.7rem] text-slate-400">{faNum(c.students)} دانشجو</span>
      </div>
    </div>
  </article>
)

/* ------------------------------------------------------------------ */
/*  /paths — فهرست مسیرها                                             */
/* ------------------------------------------------------------------ */

export const PathsPage: FC<{ path: string; paths: Path[] }> = ({ path, paths }) => (
  <PageShell path={path}>
    <section class="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
      <div class="glow glow-indigo -top-20 right-[-6rem] h-72 w-72" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumbs items={[{ href: '/', label: 'خانه' }, { label: 'مسیرهای یادگیری' }]} />
        <SectionHeading
          eyebrow="مسیرهای یادگیری"
          title="مسیر مناسب خودت را انتخاب کن"
          desc="هر مسیر یک نقشه‌ی راه کامل است؛ از مبانی تا پروژه‌های حرفه‌ای و آماده‌سازی برای بازار کار."
        />
      </div>
    </section>

    <section class="pb-24">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        {paths.length === 0 ? (
          <EmptyState message="هنوز مسیری ثبت نشده است." />
        ) : (
          <div class="grid gap-6 md:grid-cols-2">
            {paths.map((p) => (
              <PathCard path={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  </PageShell>
)

/* ------------------------------------------------------------------ */
/*  /paths/:slug — جزئیات مسیر                                        */
/* ------------------------------------------------------------------ */

export const PathDetailPage: FC<{
  path: string
  learningPath: Path
  steps: PathStep[]
  courses: Course[]
  found: boolean
}> = ({ path, learningPath: p, steps, courses, found }) => (
  <PageShell path={path}>
    <section class="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
      <div class="glow glow-violet top-10 left-[-8rem] h-80 w-80" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumbs
          items={[{ href: '/', label: 'خانه' }, { href: '/paths', label: 'مسیرها' }, { label: p.title }]}
        />

        {!found && (
          <div class="mb-6 rounded-xl border border-amber-300/60 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            این مسیر یافت نشد؛ داده‌های ذخیره‌شدهٔ نمونه نمایش داده می‌شود.
          </div>
        )}

        <div class="flex flex-wrap items-start justify-between gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-3">
              <span class="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                <PathIcon name={p.icon} class="h-6 w-6" />
              </span>
              {p.tag && <Badge tone="indigo">{p.tag}</Badge>}
            </div>
            <h1 class="mt-5 text-3xl font-black tracking-tight sm:text-4xl">{p.title}</h1>
            <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">{p.description ?? p.summary}</p>

            <ul class="mt-6 flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <li class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <aside class="glass w-full rounded-2xl p-6 sm:w-72">
            <h2 class="text-sm font-bold">مشخصات مسیر</h2>
            <dl class="mt-4 space-y-3 text-sm">
              <div class="flex items-center justify-between">
                <dt class="text-slate-500 dark:text-slate-400">مدت</dt>
                <dd class="font-bold">{p.months ?? '—'}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-slate-500 dark:text-slate-400">سطح</dt>
                <dd class="font-bold">{p.level ?? '—'}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-slate-500 dark:text-slate-400">مراحل</dt>
                <dd class="font-bold">{faNum(steps.length)} مرحله</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-slate-500 dark:text-slate-400">دوره‌ها</dt>
                <dd class="font-bold">{faNum(courses.length)} دوره</dd>
              </div>
            </dl>
            <a
              href="/#cta"
              class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl"
            >
              شروع این مسیر
              <ArrowLeftIcon class="h-4 w-4" />
            </a>
          </aside>
        </div>
      </div>
    </section>

    <section class="pb-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 class="reveal text-2xl font-black tracking-tight">نقشه‌ی راه</h2>
        {steps.length === 0 ? (
          <EmptyState message="مرحله‌ای برای این مسیر ثبت نشده است." />
        ) : (
          <ol class="mt-8 space-y-4">
            {steps.map((s, i) => (
              <li class="reveal relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40">
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-50 text-sm font-black text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {faNum(s.step_no)}
                </span>
                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-extrabold tracking-tight">{s.title}</h3>
                    {s.duration && (
                      <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.7rem] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <ClockIcon class="h-3 w-3" />
                        {s.duration}
                      </span>
                    )}
                  </div>
                  {s.detail && <p class="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{s.detail}</p>}
                </div>
                {i < steps.length - 1 && (
                  <span class="absolute -bottom-4 right-[2.4rem] h-4 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true"></span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>

    <section class="bg-slate-50/70 py-20 dark:bg-slate-950/40">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="reveal flex flex-wrap items-end justify-between gap-4">
          <h2 class="text-2xl font-black tracking-tight">دوره‌های این مسیر</h2>
          <a href="/courses" class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400">
            همه‌ی دوره‌ها
            <ArrowLeftIcon class="h-4 w-4" />
          </a>
        </div>
        {courses.length === 0 ? (
          <EmptyState message="دوره‌ای برای این مسیر ثبت نشده است." />
        ) : (
          <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard course={c} />
            ))}
          </div>
        )}
        <div class="mt-10">
          <BackLink href="/paths" label="بازگشت به همهٔ مسیرها" />
        </div>
      </div>
    </section>
  </PageShell>
)

/* ------------------------------------------------------------------ */
/*  وضعیت خالی                                                        */
/* ------------------------------------------------------------------ */

export const EmptyState: FC<{ message: string }> = ({ message }) => (
  <div class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
    {message}
  </div>
)

export const NotFoundPage: FC<{ path: string; message?: string }> = ({ path, message }) => (
  <PageShell path={path}>
    <section class="relative overflow-hidden pt-40 pb-28 text-center">
      <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-xl px-4">
        <span class="text-7xl font-black text-indigo-500/80">۴۰۴</span>
        <h1 class="mt-6 text-2xl font-black tracking-tight">صفحه پیدا نشد</h1>
        <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">
          {message ?? 'آدرسی که دنبالش هستی وجود ندارد یا جابه‌جا شده است.'}
        </p>
        <a
          href="/"
          class="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl"
        >
          بازگشت به خانه
          <ArrowLeftIcon class="h-4 w-4" />
        </a>
      </div>
    </section>
  </PageShell>
)
