import type { FC } from 'hono/jsx'
import type { Course, Lesson, Path, Instructor } from '../data'
import { faNum, toman } from '../data'
import { PageShell, SectionHeading, Badge, Breadcrumbs, BackLink } from '../components/layout'
import { CourseCard } from './paths'
import { VideoPlayer, LessonVideoCard } from '../components/video'
import { InstructorMini, InstructorSection } from '../components/instructor'
import { WaveDivider, DotGrid, Blob, Sparkle, GradientRing } from '../components/art'
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
  SparkIcon,
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

/** خط جداکنندهٔ گرادیانی نازک */
const GradientRule: FC<{ class?: string }> = ({ class: cls = '' }) => (
  <span class={`block h-px w-full bg-gradient-to-l from-transparent via-slate-300 to-transparent dark:via-slate-700 ${cls}`} aria-hidden="true"></span>
)

export const CourseDetailPage: FC<{
  path: string
  course: Course
  lessons: Lesson[]
  related: Course[]
  instructor: Instructor | null
  instructorCourses: Course[]
  found: boolean
}> = ({ path, course: c, lessons, related, instructor, instructorCourses, found }) => {
  const previews = lessons.filter((l) => l.is_preview === 1 && l.video)
  const accent = c.accent ?? 'from-indigo-400 to-violet-600'

  return (
    <PageShell path={path}>
      {/* ============ HERO گرادیانی با جلد دوره ============ */}
      <section class="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
        {/* لایهٔ تصویر جلد */}
        {c.cover && (
          <div class="absolute inset-0" aria-hidden="true">
            <img src={c.cover} alt="" class="h-full w-full object-cover opacity-[0.13] dark:opacity-[0.18]" />
            <div class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white dark:from-slate-950/70 dark:via-slate-950/90 dark:to-slate-950"></div>
          </div>
        )}
        {/* گرادیان رنگی اختصاصی دوره */}
        <div class={`absolute inset-0 bg-gradient-to-bl ${accent} opacity-[0.07] dark:opacity-[0.12]`} aria-hidden="true"></div>
        <div class="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true"></div>
        <Blob class="absolute -top-32 left-[-10rem] h-[28rem] w-[28rem] opacity-15 blur-3xl" from="#6366f1" to="#8b5cf6" />
        <CurveDecor accent={accent} />
        <DotGrid class="absolute right-6 top-32 hidden text-slate-400 lg:block dark:text-slate-600" />

        <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs
            items={[{ href: '/', label: 'خانه' }, { href: '/courses', label: 'دوره‌ها' }, { label: c.title }]}
          />

          {!found && (
            <div class="mb-6 rounded-xl border border-amber-300/60 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              این دوره یافت نشد؛ داده‌های ذخیره‌شدهٔ نمونه نمایش داده می‌شود.
            </div>
          )}

          <div class="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
            {/* ---- متن هیرو ---- */}
            <div class="reveal">
              {c.path_title && c.path_slug && (
                <a
                  href={`/paths/${c.path_slug}`}
                  class="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1.5 text-[0.72rem] font-bold text-indigo-700 backdrop-blur transition hover:gap-2.5 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300"
                >
                  <span class={`h-1.5 w-1.5 rounded-full bg-gradient-to-l ${accent}`}></span>
                  بخشی از مسیر {c.path_title}
                  <ArrowLeftIcon class="h-3.5 w-3.5" />
                </a>
              )}

              <h1 class="mt-5 text-3xl font-black leading-[1.35] tracking-tight sm:text-[2.6rem]">{c.title}</h1>
              {c.subtitle && <p class="mt-3.5 text-lg leading-8 text-slate-600 dark:text-slate-400">{c.subtitle}</p>}

              <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                <span class="inline-flex items-center gap-1.5">
                  <StarIcon class="h-4 w-4 text-amber-400" />
                  <strong class="font-black text-slate-900 dark:text-white">{faNum(c.rating)}</strong>
                  <span class="text-slate-500 dark:text-slate-400">امتیاز</span>
                </span>
                <span class="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <UsersIcon class="h-4 w-4" />
                  <strong class="font-bold text-slate-900 dark:text-white">{faNum(c.students)}</strong>
                  دانشجو
                </span>
                <span class="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <ClockIcon class="h-4 w-4" />
                  {faNum(c.hours)} ساعت
                </span>
                {c.level && <Badge tone="indigo">{c.level}</Badge>}
              </div>

              {/* چیپ‌های اطلاعات */}
              <dl class="mt-7 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
                <MetaChip label="درس" value={faNum(c.lessons)} />
                <MetaChip label="پروژه" value={faNum(c.projects)} />
                <MetaChip label="سطح" value={c.level ?? '—'} />
                <MetaChip label="زبان" value={faNum(c.languages)} />
              </dl>

              {c.instructor && (
                <p class="mt-6 inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <i class="fas fa-chalkboard-teacher text-indigo-500" aria-hidden="true"></i>
                  مدرس:
                  <span class="font-bold text-slate-900 dark:text-white">{c.instructor}</span>
                </p>
              )}
            </div>

            {/* ---- کارت ثبت‌نام (شیشه‌ای، چسبان) ---- */}
            <aside class="reveal lg:sticky lg:top-28">
              <div class="glass overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10">
                <div class={`h-1.5 w-full bg-gradient-to-l ${accent}`}></div>

                {c.cover && (
                  <div class="relative h-40 overflow-hidden">
                    <img src={c.cover} alt="" class="h-full w-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                  </div>
                )}

                <div class="p-6">
                  <div class="flex items-end justify-between">
                    <div>
                      <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">قیمت دوره</p>
                      <p class="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                        {toman(c.price)}
                        {c.price !== 0 && <span class="mr-1.5 text-sm font-medium text-slate-400">تومان</span>}
                      </p>
                    </div>
                    {c.price === 0 ? (
                      <Badge tone="emerald">رایگان</Badge>
                    ) : (
                      <span class="rounded-full bg-rose-50 px-3 py-1 text-[0.7rem] font-black text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
                        ۳۰٪ تخفیف
                      </span>
                    )}
                  </div>

                  <a
                    href="/register"
                    class={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l ${accent} px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-xl`}
                  >
                    ثبت‌نام در دوره
                    <ArrowLeftIcon class="h-4 w-4" />
                  </a>
                  <a
                    href="/login"
                    class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <PlayIcon class="h-3.5 w-3.5" />
                    پیش‌نمایش رایگان
                  </a>
                  <p class="mt-3 text-center text-[0.68rem] text-slate-400">۱۴ روز ضمانت بازگشت وجه</p>

                  <GradientRule class="my-6" />

                  <h2 class="text-sm font-bold">این دوره شامل:</h2>
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

                  {instructor && <InstructorMini instructor={instructor} />}
                </div>
              </div>
            </aside>
          </div>
        </div>
        <WaveDivider class="absolute inset-x-0 bottom-0 text-indigo-400" />
      </section>

      {/* ============ ویدیوی معرفی دوره ============ */}
      {c.intro_video && (
        <section id="intro-video" class="relative overflow-hidden py-16 sm:py-20">
          <div class="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950/60 dark:to-slate-950" aria-hidden="true"></div>
          <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div class="reveal mx-auto max-w-3xl text-center">
              <span class="inline-flex items-center gap-1.5 rounded-full border border-rose-200/60 bg-rose-50/70 px-3 py-1 text-[0.7rem] font-bold text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-300">
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500"></span>
                ویدیوی معرفی دوره
              </span>
              <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">قبل از ثبت‌نام ببین</h2>
              {c.preview_note && (
                <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">{c.preview_note}</p>
              )}
            </div>

            <div class="reveal relative mx-auto mt-10 max-w-4xl">
              <GradientRing class="absolute -right-10 -top-10 hidden h-40 w-40 text-indigo-400/40 lg:block" />
              <VideoPlayer
                src={c.intro_video}
                poster={c.cover}
                big
                label="تماشای ویدیوی معرفی"
                class="shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/5 dark:ring-white/10"
              />
            </div>
          </div>
        </section>
      )}

      {/* ============ دربارهٔ دوره ============ */}
      <section class="relative overflow-hidden py-16 sm:py-20">
        <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div class="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div class="reveal">
              <h2 class="text-2xl font-black tracking-tight">دربارهٔ این دوره</h2>
              <p class="mt-5 leading-9 text-slate-700 dark:text-slate-300">{c.description}</p>
            </div>

            <div class="reveal space-y-3">
              <h3 class="text-sm font-bold">در پایان این دوره می‌توانی:</h3>
              {[
                'یک پروژهٔ کامل و قابل ارائه بسازی',
                'کد خود را تمیز و قابل نگهداری بنویسی',
                'با ابزارهای حرفه‌ای تیم‌ها کار کنی',
                'برای مصاحبهٔ شغلی آماده شوی',
              ].map((t) => (
                <div class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <CheckIcon class="h-3 w-3" />
                  </span>
                  <span class="text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ پیش‌نمایش جلسات (ویدیوها) ============ */}
      {previews.length > 0 && (
        <section id="lessons-preview" class="relative overflow-hidden py-20 sm:py-24">
          {/* بک‌گراند گرادیانی متفاوت */}
          <div class="absolute inset-0 bg-gradient-to-bl from-indigo-50 via-slate-50 to-violet-50 dark:from-indigo-950/30 dark:via-slate-950 dark:to-violet-950/30" aria-hidden="true"></div>
          <div class="bg-grid absolute inset-0 opacity-50" aria-hidden="true"></div>
          <Sparkle class="absolute left-12 top-16 h-8 w-8 text-indigo-300/70" />
          <Sparkle class="absolute right-20 bottom-20 h-6 w-6 text-violet-300/70" />

          <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div class="reveal flex flex-wrap items-end justify-between gap-5">
              <div class="max-w-2xl">
                <span class="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/60 bg-white/70 px-3 py-1 text-[0.7rem] font-bold text-indigo-700 backdrop-blur dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <PlayIcon class="h-3 w-3" />
                  پیش‌نمایش رایگان
                </span>
                <h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">چند جلسه را ببین و با شیوهٔ تدریس آشنا شو</h2>
                <p class="mt-4 leading-8 text-slate-600 dark:text-slate-400">
                  این جلسات را کامل و رایگان تماشا کن تا با کیفیت تدریس و فضای دوره آشنا شوی.
                </p>
              </div>
              <span class="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
                <span class="block text-2xl font-black text-slate-900 dark:text-white">{faNum(previews.length)}</span>
                <span class="mt-0.5 block text-[0.68rem] font-medium text-slate-500 dark:text-slate-400">جلسهٔ رایگان</span>
              </span>
            </div>

            <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {previews.slice(0, 6).map((l) => (
                <LessonVideoCard
                  video={l.video!}
                  poster={c.cover}
                  lessonNo={l.lesson_no}
                  title={l.title}
                  minutes={l.minutes}
                  faNum={faNum}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ سرفصل‌های کامل دوره ============ */}
      <section id="curriculum" class="py-20 sm:py-24">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <div class="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <span class="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">سرفصل‌ها</span>
              <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">محتوای کامل دوره</h2>
            </div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
              {faNum(lessons.length)} جلسه · {faNum(c.hours)} ساعت
            </p>
          </div>

          {lessons.length === 0 ? (
            <div class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
              سرفصلی برای این دوره ثبت نشده است.
            </div>
          ) : (
            <ol class="mt-10 space-y-3">
              {lessons.map((l) => {
                const isPreview = l.is_preview === 1 && l.video
                return (
                  <li
                    class={`reveal group flex items-center gap-4 rounded-2xl border p-4 transition sm:p-5 ${
                      isPreview
                        ? 'border-indigo-200 bg-gradient-to-l from-indigo-50/70 to-white hover:shadow-lg dark:border-indigo-500/30 dark:from-indigo-500/10 dark:to-slate-900/40'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40'
                    }`}
                  >
                    <span
                      class={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xs font-black ${
                        isPreview
                          ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {isPreview ? <PlayIcon class="h-4 w-4" /> : faNum(l.lesson_no)}
                    </span>

                    <div class="min-w-0 flex-1">
                      <div class="flex flex-wrap items-center gap-2">
                        <h3 class="font-bold leading-6 tracking-tight">{l.title}</h3>
                        {isPreview && (
                          <span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-black text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                            رایگان
                          </span>
                        )}
                      </div>
                      <p class="mt-1 flex items-center gap-2 text-[0.72rem] text-slate-500 dark:text-slate-400">
                        <ClockIcon class="h-3 w-3" />
                        {faNum(l.minutes)} دقیقه
                        <span aria-hidden="true">•</span>
                        جلسه {faNum(l.lesson_no)}
                      </p>
                    </div>

                    {isPreview ? (
                      <button
                        type="button"
                        class="video-inline-btn shrink-0 rounded-xl border border-indigo-200 bg-white/80 px-4 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-500/30 dark:bg-transparent dark:text-indigo-300"
                        data-video-src={l.video!}
                        data-video-poster={c.cover ?? ''}
                        data-lesson-title={l.title}
                      >
                        پخش
                      </button>
                    ) : (
                      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-400 dark:border-slate-700">
                        <i class="fas fa-lock text-xs" aria-hidden="true"></i>
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </section>

      {/* ============ دربارهٔ مدرس ============ */}
      {instructor && <InstructorSection instructor={instructor} courses={instructorCourses} />}

      {/* ============ دوره‌های مرتبط ============ */}
      {related.length > 0 && (
        <section class="relative overflow-hidden py-20 sm:py-24">
          <div class="absolute inset-0 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-950/60" aria-hidden="true"></div>
          <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
            <h2 class="reveal text-2xl font-black tracking-tight sm:text-3xl">دوره‌های مرتبط</h2>
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

      {/* ============ CTA پایانی ============ */}
      <section class="px-4 pb-20 sm:px-6">
        <div class="reveal relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center sm:px-16 dark:bg-slate-900/80">
          <div class="glow glow-indigo top-[-4rem] right-[-2rem] h-72 w-72 opacity-50" aria-hidden="true"></div>
          <div class="glow glow-violet bottom-[-4rem] left-[-2rem] h-72 w-72 opacity-50" aria-hidden="true"></div>
          <div class="relative">
            <h2 class="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              همین امروز شروع کن
            </h2>
            <p class="mx-auto mt-5 max-w-xl leading-8 text-slate-300">
              به {faNum(c.students)} دانشجوی این دوره بپیوند و مسیر یادگیری‌ات را شروع کن.
            </p>
            <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/register"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-slate-200 sm:w-auto"
              >
                ثبت‌نام در دوره
                <ArrowLeftIcon class="h-4 w-4" />
              </a>
              <a
                href="#intro-video"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
              >
                <PlayIcon class="h-3.5 w-3.5" />
                تماشای معرفی دوره
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

/* ------------------------------------------------------------------ */
/*  المان‌های کوچک                                                     */
/* ------------------------------------------------------------------ */

const MetaChip: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div class="rounded-2xl border border-slate-200 bg-white/70 px-3 py-2.5 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
    <dt class="sr-only">{label}</dt>
    <dd class="text-sm font-black text-slate-900 dark:text-white">{value}</dd>
    <p class="mt-0.5 text-[0.65rem] font-medium text-slate-500 dark:text-slate-400">{label}</p>
  </div>
)

/** منحنی‌های تزئینی هیرو */
const CurveDecor: FC<{ accent: string }> = () => (
  <svg class="pointer-events-none absolute left-[-6rem] top-1/4 h-[24rem] w-[24rem] text-indigo-400/30" viewBox="0 0 600 600" fill="none" aria-hidden="true">
    <path d="M120 480C120 300 260 120 480 120" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 8" />
    <path d="M60 520C60 260 260 60 520 60" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
  </svg>
)
