import type { FC } from 'hono/jsx'
import { PlayIcon } from './icons'

/* ------------------------------------------------------------------ */
/*  پخش‌کنندهٔ ویدیو با پوستر و دکمهٔ پخش                              */
/* ------------------------------------------------------------------ */

export const VideoPlayer: FC<{
  src: string
  poster?: string | null
  label?: string
  class?: string
  aspect?: string
  /** نمایش نشان پخش با تاخیر (برای ویدیوی اصلی) */
  big?: boolean
}> = ({ src, poster, label, class: cls = '', aspect = 'aspect-video', big }) => (
  <figure class={`group/video relative overflow-hidden rounded-2xl ${aspect} ${cls}`}>
    {/* لایهٔ پوستر + دکمه */}
    <div
      class="video-poster absolute inset-0 z-10 cursor-pointer"
      data-video-src={src}
      role="button"
      tabindex={0}
      aria-label={label ? `پخش: ${label}` : 'پخش ویدیو'}
    >
      {poster ? (
        <img src={poster} alt="" loading="lazy" class="h-full w-full object-cover" />
      ) : (
        <div class="h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950"></div>
      )}
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/25"></div>

      {/* دکمهٔ پخش */}
      <span
        class={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-slate-900 shadow-2xl ring-1 ring-black/5 transition duration-300 group-hover/video:scale-110 ${
          big ? 'h-20 w-20' : 'h-14 w-14'
        }`}
      >
        <PlayIcon class={big ? 'h-8 w-8 translate-x-[2px]' : 'h-5 w-5 translate-x-[2px]'} />
        {big && (
          <span class="absolute inset-0 animate-ping rounded-full bg-white/40" aria-hidden="true"></span>
        )}
      </span>

      {/* متن پایین */}
      {(label || big) && (
        <figcaption class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5">
          <span class="flex items-center gap-2 text-xs font-bold text-white sm:text-sm">
            <span class="grid h-7 w-7 place-items-center rounded-lg bg-white/15 backdrop-blur-md ring-1 ring-white/25">
              <PlayIcon class="h-3 w-3" />
            </span>
            {label ?? 'تماشای ویدیو'}
          </span>
          {big && (
            <span class="hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold text-white backdrop-blur-md sm:inline-block">
              ویدیوی معرفی
            </span>
          )}
        </figcaption>
      )}
    </div>

    {/* ویدیو (پنهان تا زمان پخش) */}
    <video
      class="video-el absolute inset-0 hidden h-full w-full object-cover"
      controls
      playsinline
      preload="none"
      poster={poster ?? undefined}
    ></video>
  </figure>
)

/* ------------------------------------------------------------------ */
/*  کارت ویدیوی جلسه (پیش‌نمایش)                                       */
/* ------------------------------------------------------------------ */

export const LessonVideoCard: FC<{
  video: string
  poster?: string | null
  lessonNo: number
  title: string
  minutes: number
  faNum: (n: number | string) => string
}> = ({ video, poster, lessonNo, title, minutes, faNum }) => (
  <article class="reveal group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/50">
    <VideoPlayer
      src={video}
      poster={poster}
      aspect="aspect-video"
      label={`جلسه ${faNum(lessonNo)}`}
      class="rounded-none"
    />
    <div class="p-4">
      <div class="flex items-center gap-2">
        <span class="rounded-lg bg-indigo-50 px-2 py-0.5 text-[0.68rem] font-black text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          جلسه {faNum(lessonNo)}
        </span>
        <span class="text-[0.68rem] text-slate-400">{faNum(minutes)} دقیقه</span>
      </div>
      <h3 class="mt-2.5 text-sm font-bold leading-6 tracking-tight">{title}</h3>
    </div>
  </article>
)
