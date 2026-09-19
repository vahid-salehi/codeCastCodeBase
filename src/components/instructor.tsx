import type { FC } from 'hono/jsx'
import type { Instructor, Course } from '../data'
import { faNum } from '../data'
import { VideoPlayer } from './video'
import { StarIcon, UsersIcon, ClockIcon, ShieldIcon, ArrowLeftIcon, SparkIcon } from './icons'

/* ------------------------------------------------------------------ */
/*  معرفی کوتاه مدرس (ستون کناری)                                      */
/* ------------------------------------------------------------------ */

export const InstructorMini: FC<{ instructor: Instructor }> = ({ instructor: i }) => (
  <div class="flex items-center gap-3.5 border-t border-slate-100 pt-6 dark:border-slate-800">
    {i.avatar ? (
      <img src={i.avatar} alt={i.name} loading="lazy" class="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
    ) : (
      <span class="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
        {i.name.charAt(0)}
      </span>
    )}
    <div class="min-w-0">
      <a href={`/instructors/${i.slug}`} class="block truncate text-sm font-bold hover:text-indigo-600 dark:hover:text-indigo-400">
        {i.name}
      </a>
      <span class="block truncate text-xs text-slate-500 dark:text-slate-400">
        {i.title}
        {i.company ? ` · ${i.company}` : ''}
      </span>
    </div>
    <div class="mr-auto flex items-center gap-1 text-xs font-bold text-amber-500">
      <StarIcon class="h-3.5 w-3.5" />
      {faNum(i.rating)}
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
/*  بخش «دربارهٔ مدرس» (کامل، با ویدیو)                                */
/* ------------------------------------------------------------------ */

export const InstructorSection: FC<{ instructor: Instructor; courses: Course[] }> = ({ instructor: i, courses }) => (
  <section id="instructor" class="relative overflow-hidden py-20 sm:py-28">
    {/* بک‌گراند گرادیانی متفاوت */}
    <div class="absolute inset-0 bg-gradient-to-bl from-violet-50 via-white to-indigo-50 dark:from-violet-950/25 dark:via-slate-950 dark:to-indigo-950/25" aria-hidden="true"></div>
    <div class="bg-grid absolute inset-0 opacity-40" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* ویدیو صحبت مدرس */}
        <div class="reveal">
          <VideoPlayer
            src={i.video ?? ''}
            poster={i.avatar}
            big
            label={`دربارهٔ ${i.name}`}
            class="shadow-2xl shadow-slate-900/10"
          />
          <div class="mt-5 grid grid-cols-3 gap-3">
            <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
              <p class="text-xl font-black text-slate-900 dark:text-white">{faNum(i.years)}</p>
              <p class="mt-1 text-[0.68rem] font-medium text-slate-500 dark:text-slate-400">سال تجربه</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
              <p class="text-xl font-black text-slate-900 dark:text-white">{faNum(i.students_count)}</p>
              <p class="mt-1 text-[0.68rem] font-medium text-slate-500 dark:text-slate-400">دانشجو</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
              <p class="text-xl font-black text-slate-900 dark:text-white">{faNum(i.courses_count)}</p>
              <p class="mt-1 text-[0.68rem] font-medium text-slate-500 dark:text-slate-400">دوره</p>
            </div>
          </div>
        </div>

        {/* متن معرفی */}
        <div class="reveal">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-violet-200/60 bg-violet-50/70 px-3 py-1 text-[0.7rem] font-bold text-violet-700 dark:border-violet-500/25 dark:bg-violet-500/10 dark:text-violet-300">
            <SparkIcon class="h-3.5 w-3.5" />
            مدرس دوره
          </span>

          <h2 class="mt-5 text-3xl font-black tracking-tight sm:text-4xl">{i.name}</h2>
          <p class="mt-2 font-bold text-indigo-600 dark:text-indigo-400">
            {i.title}
            {i.company ? <span class="text-slate-500 dark:text-slate-400"> · {i.company}</span> : ''}
          </p>

          <p class="mt-6 leading-8 text-slate-700 dark:text-slate-300">{i.bio}</p>

          <div class="mt-7 flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-bold backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
              <StarIcon class="h-4 w-4 text-amber-400" />
              {faNum(i.rating)} امتیاز
            </div>
            <div class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-bold backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
              <UsersIcon class="h-4 w-4 text-indigo-500" />
              {faNum(i.students_count)} دانشجو
            </div>
            <div class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-bold backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
              <ShieldIcon class="h-4 w-4 text-emerald-500" />
              مدرس تأییدشده
            </div>
          </div>

          <div class="mt-6 flex gap-2">
            {i.linkedin && (
              <a
                href={i.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400"
                aria-label="لینکدین"
              >
                <i class="fab fa-linkedin-in text-sm" aria-hidden="true"></i>
              </a>
            )}
            {i.github && (
              <a
                href={i.github}
                target="_blank"
                rel="noopener noreferrer"
                class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400"
                aria-label="گیت‌هاب"
              >
                <i class="fab fa-github text-sm" aria-hidden="true"></i>
              </a>
            )}
          </div>

          {courses.length > 0 && (
            <div class="mt-9">
              <h3 class="text-sm font-bold">سایر دوره‌های {i.name}</h3>
              <ul class="mt-4 space-y-3">
                {courses.map((c) => (
                  <li>
                    <a
                      href={`/courses/${c.slug}`}
                      class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-3 transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
                    >
                      <span class="h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                        {c.cover ? (
                          <img src={c.cover} alt="" loading="lazy" class="h-full w-full object-cover" />
                        ) : (
                          <span class={`block h-full w-full bg-gradient-to-br ${c.accent ?? 'from-indigo-400 to-violet-600'}`}></span>
                        )}
                      </span>
                      <span class="min-w-0 flex-1">
                        <span class="block truncate text-sm font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {c.title}
                        </span>
                        <span class="mt-0.5 flex items-center gap-2 text-[0.7rem] text-slate-500 dark:text-slate-400">
                          <ClockIcon class="h-3 w-3" />
                          {faNum(c.hours)} ساعت
                          <span aria-hidden="true">•</span>
                          {faNum(c.students)} دانشجو
                        </span>
                      </span>
                      <ArrowLeftIcon class="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-x-1 group-hover:text-indigo-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
)
