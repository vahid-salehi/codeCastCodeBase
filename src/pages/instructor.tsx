import type { FC } from 'hono/jsx'
import type { Instructor, Course } from '../data'
import { faNum, toman } from '../data'
import { PageShell, Badge, Breadcrumbs, BackLink } from '../components/layout'
import { CourseCard } from './paths'
import { VideoPlayer } from '../components/video'
import { WaveDivider, Blob, DotGrid, Sparkle } from '../components/art'
import { StarIcon, UsersIcon, ClockIcon, ShieldIcon, SparkIcon, ArrowLeftIcon, BriefcaseIcon } from '../components/icons'

/* ------------------------------------------------------------------ */
/*  /instructors/:slug — صفحهٔ مدرس                                   */
/* ------------------------------------------------------------------ */

export const InstructorPage: FC<{
  path: string
  instructor: Instructor
  courses: Course[]
}> = ({ path, instructor: i, courses }) => {
  const accent = i.accent ?? 'from-indigo-500 to-violet-600'
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)

  return (
    <PageShell path={path}>
      {/* ---- هیرو مدرس ---- */}
      <section class="relative overflow-hidden pt-28 pb-20 sm:pt-36">
        <div class={`absolute inset-0 bg-gradient-to-bl ${accent} opacity-[0.08] dark:opacity-[0.14]`} aria-hidden="true"></div>
        <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
        <Blob class="absolute -top-28 right-[-8rem] h-[26rem] w-[26rem] opacity-15 blur-3xl" from="#8b5cf6" to="#6366f1" />
        <DotGrid class="absolute left-8 bottom-16 hidden text-slate-400 lg:block dark:text-slate-600" />
        <Sparkle class="absolute right-24 top-40 h-7 w-7 text-indigo-300/70" />

        <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs
            items={[{ href: '/', label: 'خانه' }, { href: '/courses', label: 'دوره‌ها' }, { label: i.name }]}
          />

          <div class="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
            <div class="reveal mx-auto lg:mx-0">
              <div class="relative">
                <span class={`absolute -inset-3 rounded-full bg-gradient-to-br ${accent} opacity-25 blur-2xl`} aria-hidden="true"></span>
                {i.avatar ? (
                  <img
                    src={i.avatar}
                    alt={i.name}
                    class="relative h-44 w-44 rounded-full object-cover ring-4 ring-white shadow-2xl dark:ring-slate-900 sm:h-52 sm:w-52"
                  />
                ) : (
                  <span class="relative grid h-44 w-44 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-5xl font-black text-white sm:h-52 sm:w-52">
                    {i.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            <div class="reveal text-center lg:text-right">
              <span class="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/60 bg-white/70 px-3 py-1 text-[0.7rem] font-bold text-indigo-700 backdrop-blur dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300">
                <ShieldIcon class="h-3.5 w-3.5" />
                مدرس تأییدشده
              </span>

              <h1 class="mt-5 text-3xl font-black tracking-tight sm:text-4xl">{i.name}</h1>
              <p class="mt-2.5 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {i.title}
                {i.company ? <span class="text-slate-500 dark:text-slate-400"> · {i.company}</span> : ''}
              </p>

              <dl class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard icon={StarIcon} tone="amber" value={faNum(i.rating)} label="امتیاز" />
                <StatCard icon={UsersIcon} tone="indigo" value={faNum(i.students_count)} label="دانشجو" />
                <StatCard icon={ClockIcon} tone="violet" value={faNum(i.years)} label="سال تجربه" />
                <StatCard icon={BriefcaseIcon} tone="emerald" value={faNum(i.courses_count)} label="دوره" />
              </dl>

              <div class="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                {i.linkedin && (
                  <a
                    href={i.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-bold backdrop-blur transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300"
                  >
                    <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                    لینکدین
                  </a>
                )}
                {i.github && (
                  <a
                    href={i.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-bold backdrop-blur transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300"
                  >
                    <i class="fab fa-github" aria-hidden="true"></i>
                    گیت‌هاب
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <WaveDivider class="absolute inset-x-0 bottom-0 text-indigo-400" />
      </section>

      {/* ---- دربارهٔ مدرس + ویدیو ---- */}
      <section class="relative overflow-hidden py-16 sm:py-20">
        <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div class="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
            {i.video ? (
              <div class="reveal">
                <VideoPlayer
                  src={i.video}
                  poster={i.avatar}
                  big
                  label={`ویدیوی معرفی ${i.name}`}
                  class="shadow-2xl shadow-slate-900/15"
                />
              </div>
            ) : null}

            <div class="reveal">
              <span class="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
                <SparkIcon class="h-3.5 w-3.5" />
                دربارهٔ مدرس
              </span>
              <h2 class="mt-3 text-2xl font-black tracking-tight sm:text-3xl">داستان حرفه‌ای {i.name}</h2>
              <p class="mt-5 leading-9 text-slate-700 dark:text-slate-300">{i.bio}</p>

              <div class="mt-7 grid gap-3 sm:grid-cols-2">
                <div class="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
                  <p class="text-2xl font-black text-slate-900 dark:text-white">{faNum(totalStudents)}</p>
                  <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    دانشجو در دوره‌های این مدرس
                  </p>
                </div>
                <div class="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
                  <p class="text-2xl font-black text-slate-900 dark:text-white">{faNum(courses.length)}</p>
                  <p class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">دورهٔ فعال روی دِوکَست</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- دوره‌های مدرس ---- */}
      <section class="relative overflow-hidden py-20 sm:py-24">
        <div class="absolute inset-0 bg-gradient-to-bl from-indigo-50 via-white to-violet-50 dark:from-indigo-950/25 dark:via-slate-950 dark:to-violet-950/25" aria-hidden="true"></div>
        <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div class="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">دوره‌های مدرس</span>
              <h2 class="mt-3 text-2xl font-black tracking-tight sm:text-3xl">دوره‌های {i.name}</h2>
            </div>
            <a
              href="/courses"
              class="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:gap-2.5 dark:text-indigo-400"
            >
              همهٔ دوره‌ها
              <ArrowLeftIcon class="h-4 w-4" />
            </a>
          </div>

          {courses.length === 0 ? (
            <div class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
              دوره‌ای برای این مدرس ثبت نشده است.
            </div>
          ) : (
            <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <CourseCard course={c} />
              ))}
            </div>
          )}

          <div class="mt-10">
            <BackLink href="/courses" label="بازگشت به همهٔ دوره‌ها" />
          </div>
        </div>
      </section>
    </PageShell>
  )
}

/* ------------------------------------------------------------------ */
/*  کارت آمار کوچک                                                    */
/* ------------------------------------------------------------------ */

const toneMap: Record<string, string> = {
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
}

const StatCard: FC<{
  icon: FC<{ class?: string }>
  tone: string
  value: string
  label: string
}> = ({ icon: Icon, tone, value, label }) => (
  <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
    <span class={`mx-auto grid h-9 w-9 place-items-center rounded-xl ${toneMap[tone]}`}>
      <Icon class="h-4 w-4" />
    </span>
    <dd class="mt-2.5 text-lg font-black text-slate-900 dark:text-white">{value}</dd>
    <dt class="mt-0.5 text-[0.68rem] font-medium text-slate-500 dark:text-slate-400">{label}</dt>
  </div>
)
