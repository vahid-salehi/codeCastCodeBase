import type { FC } from 'hono/jsx'

/* ------------------------------------------------------------------ */
/*  المان‌های گرافیکی تزئینی (SVG)                                     */
/* ------------------------------------------------------------------ */

/** موج منحنی نرم — جداکنندهٔ بخش‌ها */
export const WaveDivider: FC<{ class?: string; flip?: boolean }> = ({ class: cls = '', flip }) => (
  <div class={`pointer-events-none w-full overflow-hidden leading-[0] ${cls}`} aria-hidden="true">
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      class={`h-[60px] w-full sm:h-[90px] ${flip ? 'rotate-180' : ''}`}
    >
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="currentColor" stop-opacity="0.14" />
          <stop offset="50%" stop-color="currentColor" stop-opacity="0.04" />
          <stop offset="100%" stop-color="currentColor" stop-opacity="0.14" />
        </linearGradient>
      </defs>
      <path
        fill="url(#waveGrad)"
        d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,64 L1440,120 L0,120 Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-opacity="0.18"
        stroke-width="1.5"
        d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,64"
      />
    </svg>
  </div>
)

/** خط منحنی تزئینی (blob خط‌دار) */
export const CurveLine: FC<{ class?: string }> = ({ class: cls = '' }) => (
  <svg class={`pointer-events-none ${cls}`} viewBox="0 0 600 600" fill="none" aria-hidden="true">
    <path
      d="M120 480C120 300 260 120 480 120"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-dasharray="2 8"
      opacity="0.5"
    />
    <path
      d="M60 520C60 260 260 60 520 60"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      opacity="0.22"
    />
    <path
      d="M180 440C180 340 300 220 400 220"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-dasharray="2 8"
      opacity="0.35"
    />
  </svg>
)

/** شبکهٔ نقطه‌چین (dot grid) */
export const DotGrid: FC<{ class?: string }> = ({ class: cls = '' }) => (
  <svg class={`pointer-events-none ${cls}`} width="140" height="140" aria-hidden="true">
    <defs>
      <pattern id="dotPattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" opacity="0.35" />
      </pattern>
    </defs>
    <rect width="140" height="140" fill="url(#dotPattern)" />
  </svg>
)

/** بلاب گرادیانی نرم */
export const Blob: FC<{ class?: string; from?: string; to?: string }> = ({
  class: cls = '',
  from = '#6366f1',
  to = '#8b5cf6',
}) => {
  const id = 'blob' + from.replace('#', '') + to.replace('#', '')
  return (
    <svg class={`pointer-events-none ${cls}`} viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color={from} />
          <stop offset="100%" stop-color={to} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        opacity="0.9"
        d="M320 190c22 52-10 118-58 145-48 27-118 22-158-20C64 273 52 204 80 155c28-49 92-71 145-57 53 14 73 40 95 92Z"
      />
    </svg>
  )
}

/** پنجرهٔ کد با نوار رنگی (برای هیرو) */
export const AnimatedCodeWindow: FC<{ class?: string }> = ({ class: cls = '' }) => (
  <div class={`overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl ${cls}`} dir="ltr">
    <div class="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
      <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
      <span class="ml-3 font-mono text-[0.7rem] text-slate-500">course.ts</span>
      <span class="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.6rem] text-emerald-400">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
        live
      </span>
    </div>
    <pre class="overflow-x-auto p-5 font-mono text-[0.72rem] leading-6 text-slate-300 sm:text-[0.8rem]"><code>{`type دوره = {
  عنوان: string
  ساعت: number
  پروژه: true
}

const مسیر: دوره[] = [
  { عنوان: "JavaScript",  ساعت: 18, پروژه: true },
  { عنوان: "React",       ساعت: 26, پروژه: true },
  { عنوان: "TypeScript",  ساعت: 14, پروژه: true },
]

export const یادگیری = مسیر
  .filter(د => د.پروژه)
  .map(د => منتور.شروع(د))   // 🚀`}</code></pre>
  </div>
)

/** نشان کوچک «قطره‌ای» برای کارت‌ها */
export const Sparkle: FC<{ class?: string }> = ({ class: cls = '' }) => (
  <svg class={`pointer-events-none ${cls}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
  </svg>
)

/** حلقهٔ گرادیانی تزئینی */
export const GradientRing: FC<{ class?: string }> = ({ class: cls = '' }) => (
  <svg class={`pointer-events-none ${cls}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.1" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="86" stroke="url(#ringGrad)" stroke-width="1.5" stroke-dasharray="6 10" />
    <circle cx="100" cy="100" r="62" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />
  </svg>
)
