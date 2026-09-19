import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import type { Bindings } from './types'
import {
  getPaths,
  getPathBySlug,
  getPathSteps,
  getCourses,
  getCourseBySlug,
  getCourseLessons,
  getRelatedCourses,
  getInstructorBySlug,
  getCoursesByInstructor,
  getStats,
  createSignup,
  type Path,
  type Course,
  type PathStep,
  type Lesson,
  type Instructor,
  type Stats,
} from './data'
import { HomePage } from './pages/home'
import { PathsPage, PathDetailPage, NotFoundPage } from './pages/paths'
import { CoursesPage, CourseDetailPage } from './pages/courses'
import { LoginPage, RegisterPage, AccountPage } from './pages/auth'
import { InstructorPage } from './pages/instructor'
import { sendOtpSms, normalizePhone, maskPhone } from './sms'
import {
  issueOtp,
  verifyOtp,
  createSession,
  getUserBySession,
  destroySession,
  sessionCookie,
  clearSessionCookie,
  readSessionCookie,
  constants as authConstants,
} from './auth'
import { getUserCourses, countUserSessions } from './data'

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)
app.use('/api/*', cors())

/* ------------------------------------------------------------------ */
/*  کمک‌کننده‌های امن (در صورت خطای پایگاه‌داده)                        */
/* ------------------------------------------------------------------ */

const safe = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn()
  } catch (err) {
    console.error('[db]', err)
    return fallback
  }
}

const FALLBACK_PATHS: Path[] = [
  { id: 1, slug: 'frontend', title: 'توسعه وب فرانت‌اند', tag: 'پرطرفدارترین', summary: 'از HTML و CSS تا React و معماری کامپوننتی — ساخت رابط‌های مدرن و سریع.', description: null, icon: 'code', months: '۶ ماه', level: 'مقدماتی تا پیشرفته', featured: 1, sort_order: 1, skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'] },
  { id: 2, slug: 'backend', title: 'مهندسی بک‌اند', tag: 'بک‌اند', summary: 'طراحی API، پایگاه‌داده و سیستم‌های مقیاس‌پذیر روی سرورهای ابری.', description: null, icon: 'terminal', months: '۷ ماه', level: 'مقدماتی تا پیشرفته', featured: 0, sort_order: 2, skills: ['Node.js', 'PostgreSQL', 'REST API', 'Docker'] },
  { id: 3, slug: 'ai-data', title: 'هوش مصنوعی و داده', tag: 'جدید', summary: 'مبانی یادگیری ماشین، کار با داده و ساخت اپلیکیشن‌های هوشمند.', description: null, icon: 'spark', months: '۸ ماه', level: 'مقدماتی تا پیشرفته', featured: 0, sort_order: 3, skills: ['Python', 'Pandas', 'Machine Learning', 'LLM'] },
  { id: 4, slug: 'mobile', title: 'اپلیکیشن موبایل', tag: 'موبایل', summary: 'ساخت اپ‌های چندسکویی با تجربه‌ی کاربری بومی و انتشار در استورها.', description: null, icon: 'route', months: '۵ ماه', level: 'مقدماتی تا متوسط', featured: 0, sort_order: 4, skills: ['React Native', 'Expo', 'API', 'UI/UX'] },
]

const FALLBACK_STATS: Stats = { paths: 4, courses: 6, students: 12095, signups: 0 }

/* ------------------------------------------------------------------ */
/*  API                                                               */
/* ------------------------------------------------------------------ */

app.get('/api/health', (c) => c.json({ ok: true, service: 'devcast', ts: Date.now() }))

app.get('/api/stats', async (c) => {
  const stats = await safe(() => getStats(c.env.DB), FALLBACK_STATS)
  return c.json({ ok: true, stats })
})

app.get('/api/paths', async (c) => {
  const paths = await safe(() => getPaths(c.env.DB), FALLBACK_PATHS)
  return c.json({ ok: true, count: paths.length, paths })
})

app.get('/api/paths/:slug', async (c) => {
  const slug = c.req.param('slug')
  const learningPath = await safe(() => getPathBySlug(c.env.DB, slug), null)
  if (!learningPath) return c.json({ ok: false, error: 'not_found' }, 404)

  const [steps, courses] = await Promise.all([
    safe(() => getPathSteps(c.env.DB, learningPath.id), [] as PathStep[]),
    safe(() => getCourses(c.env.DB, slug), [] as Course[]),
  ])
  return c.json({ ok: true, path: learningPath, steps, courses })
})

app.get('/api/courses', async (c) => {
  const pathSlug = c.req.query('path') || undefined
  const courses = await safe(() => getCourses(c.env.DB, pathSlug), [] as Course[])
  return c.json({ ok: true, count: courses.length, courses })
})

app.get('/api/courses/:slug', async (c) => {
  const slug = c.req.param('slug')
  const course = await safe(() => getCourseBySlug(c.env.DB, slug), null)
  if (!course) return c.json({ ok: false, error: 'not_found' }, 404)

  const [lessons, related] = await Promise.all([
    safe(() => getCourseLessons(c.env.DB, course.id), [] as Lesson[]),
    safe(() => getRelatedCourses(c.env.DB, course.path_id, course.id), [] as Course[]),
  ])
  return c.json({ ok: true, course, lessons, related })
})

app.post('/api/signup', async (c) => {
  let body: { email?: string; source?: string }
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_json' }, 400)
  }

  const email = (body.email ?? '').trim()
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!valid) return c.json({ ok: false, error: 'invalid_email' }, 400)

  try {
    const result = await createSignup(c.env.DB, email, body.source ?? 'landing')
    return c.json({ ok: true, duplicate: result.duplicate, total: result.total })
  } catch (err) {
    console.error('[signup]', err)
    return c.json({ ok: false, error: 'storage_unavailable' }, 503)
  }
})

/* ------------------------------------------------------------------ */
/*  API احراز هویت (OTP)                                             */
/* ------------------------------------------------------------------ */

/** آیا سرویس پیامک واقعی پیکربندی شده است؟ */
const smsConfigured = (env: Bindings): boolean =>
  env.SMS_PROVIDER === 'kavenegar'
    ? !!env.KAVENEGAR_API_KEY
    : env.SMS_PROVIDER === 'twilio'
      ? !!env.TWILIO_ACCOUNT_SID && !!env.TWILIO_AUTH_TOKEN
      : false

app.post('/api/auth/otp/request', async (c) => {
  let body: { phone?: string; purpose?: string; name?: string }
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_json' }, 400)
  }

  const phone = normalizePhone(body.phone ?? '')
  if (!phone) return c.json({ ok: false, error: 'invalid_phone' }, 400)

  const purpose = body.purpose === 'register' ? 'register' : 'login'

  try {
    const issued = await issueOtp(c.env.DB, phone, purpose)
    if (!issued.ok) {
      return c.json(
        { ok: false, error: issued.error, retryAfterSec: issued.retryAfterSec },
        429
      )
    }

    const sms = await sendOtpSms(c.env, phone, issued.code!)

    return c.json({
      ok: true,
      devMode: sms.provider === 'dev',
      devCode: sms.provider === 'dev' ? sms.devCode : undefined,
      provider: sms.provider,
      expiresInSec: issued.expiresInSec,
      retryAfterSec: issued.retryAfterSec,
      maskedPhone: maskPhone(phone),
    })
  } catch (err) {
    console.error('[otp:request]', err)
    return c.json({ ok: false, error: 'storage_unavailable' }, 503)
  }
})

app.post('/api/auth/otp/verify', async (c) => {
  let body: { phone?: string; code?: string; name?: string; next?: string }
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'invalid_json' }, 400)
  }

  const phone = normalizePhone(body.phone ?? '')
  const code = (body.code ?? '').replace(/\D/g, '')
  if (!phone) return c.json({ ok: false, error: 'invalid_phone' }, 400)
  if (code.length !== 6) return c.json({ ok: false, error: 'invalid_code_format' }, 400)

  try {
    const result = await verifyOtp(c.env.DB, phone, code, body.name)
    if (!result.ok || !result.user) {
      return c.json({ ok: false, error: result.error ?? 'invalid' }, 400)
    }

    const token = await createSession(c.env.DB, result.user.id)
    c.header('Set-Cookie', sessionCookie(token))

    return c.json({
      ok: true,
      redirectTo: body.next && body.next.startsWith('/') ? body.next : '/account',
      user: { id: result.user.id, name: result.user.name, phone: result.user.phone },
    })
  } catch (err) {
    console.error('[otp:verify]', err)
    return c.json({ ok: false, error: 'storage_unavailable' }, 503)
  }
})

app.post('/api/auth/logout', async (c) => {
  const token = readSessionCookie(c.req.header('cookie'))
  await safe(() => destroySession(c.env.DB, token), undefined)
  c.header('Set-Cookie', clearSessionCookie())

  const accept = c.req.header('accept') ?? ''
  if (accept.includes('application/json')) return c.json({ ok: true })
  return c.redirect('/')
})

app.get('/api/auth/me', async (c) => {
  const token = readSessionCookie(c.req.header('cookie'))
  const user = await safe(() => getUserBySession(c.env.DB, token), null)
  if (!user) return c.json({ ok: false, error: 'unauthenticated' }, 401)
  return c.json({ ok: true, user })
})

/** آمار عمومی برای نمایش حالت دمو */
app.get('/api/auth/config', (c) =>
  c.json({
    ok: true,
    smsConfigured: smsConfigured(c.env),
    provider: (c.env.SMS_PROVIDER || 'dev').toLowerCase(),
    otpTtlSec: authConstants.OTP_TTL_SEC,
  })
)

/* ------------------------------------------------------------------ */
/*  صفحات احراز هویت                                                  */
/* ------------------------------------------------------------------ */

const nextParam = (raw: string | undefined): string =>
  raw && raw.startsWith('/') ? raw : '/account'

app.get('/login', async (c) => {
  const token = readSessionCookie(c.req.header('cookie'))
  const user = await safe(() => getUserBySession(c.env.DB, token), null)
  if (user) return c.redirect('/account')

  return c.render(
    <LoginPage path="/login" next={nextParam(c.req.query('next'))} devMode={!smsConfigured(c.env)} />,
    { title: 'ورود | دِوکَست' }
  )
})

app.get('/register', async (c) => {
  const token = readSessionCookie(c.req.header('cookie'))
  const user = await safe(() => getUserBySession(c.env.DB, token), null)
  if (user) return c.redirect('/account')

  return c.render(
    <RegisterPage path="/register" next={nextParam(c.req.query('next'))} devMode={!smsConfigured(c.env)} />,
    { title: 'ثبت‌نام | دِوکَست' }
  )
})

app.get('/account', async (c) => {
  const token = readSessionCookie(c.req.header('cookie'))
  const user = await safe(() => getUserBySession(c.env.DB, token), null)

  if (!user) return c.redirect('/login?next=/account')

  const [courses, sessionsCount] = await Promise.all([
    safe(() => getUserCourses(c.env.DB), []),
    safe(() => countUserSessions(c.env.DB, user.id), 1),
  ])

  return c.render(<AccountPage path="/account" user={user} courses={courses} sessionsCount={sessionsCount} />, {
    title: `${user.name ?? 'حساب من'} | دِوکَست`,
  })
})

/* ------------------------------------------------------------------ */
/*  صفحات عمومی                                                       */
/* ------------------------------------------------------------------ */

app.get('/', async (c) => {
  const [paths, courses, stats] = await Promise.all([
    safe(() => getPaths(c.env.DB), FALLBACK_PATHS),
    safe(() => getCourses(c.env.DB), [] as Course[]),
    safe(() => getStats(c.env.DB), FALLBACK_STATS),
  ])
  return c.render(<HomePage paths={paths} courses={courses} stats={stats} />, {
    title: 'دِوکَست | آکادمی برنامه‌نویسی پروژه‌محور',
  })
})

app.get('/paths', async (c) => {
  const paths = await safe(() => getPaths(c.env.DB), FALLBACK_PATHS)
  return c.render(<PathsPage path="/paths" paths={paths} />, {
    title: 'مسیرهای یادگیری | دِوکَست',
  })
})

app.get('/paths/:slug', async (c) => {
  const slug = c.req.param('slug')
  const found = await safe(() => getPathBySlug(c.env.DB, slug), null)
  const learningPath = found ?? FALLBACK_PATHS.find((p) => p.slug === slug) ?? null

  if (!learningPath) {
    c.status(404)
    return c.render(<NotFoundPage path="/paths" message="مسیری با این آدرس پیدا نشد." />, { title: 'پیدا نشد | دِوکَست' })
  }

  const [steps, courses] = await Promise.all([
    safe(() => getPathSteps(c.env.DB, learningPath.id), [] as PathStep[]),
    safe(() => getCourses(c.env.DB, slug), [] as Course[]),
  ])

  return c.render(
    <PathDetailPage path="/paths" learningPath={learningPath} steps={steps} courses={courses} found={!!found} />,
    { title: `${learningPath.title} | دِوکَست` }
  )
})

app.get('/courses', async (c) => {
  const pathFilter = c.req.query('path')
  const [courses, paths] = await Promise.all([
    safe(() => getCourses(c.env.DB, pathFilter || undefined), [] as Course[]),
    safe(() => getPaths(c.env.DB), FALLBACK_PATHS),
  ])

  return c.render(<CoursesPage path="/courses" courses={courses} paths={paths} activePath={pathFilter} />, {
    title: 'دوره‌ها | دِوکَست',
  })
})

app.get('/courses/:slug', async (c) => {
  const slug = c.req.param('slug')
  const found = await safe(() => getCourseBySlug(c.env.DB, slug), null)

  if (!found) {
    c.status(404)
    return c.render(<NotFoundPage path="/courses" message="دوره‌ای با این آدرس پیدا نشد." />, { title: 'پیدا نشد | دِوکَست' })
  }

  const [lessons, related, instructor] = await Promise.all([
    safe(() => getCourseLessons(c.env.DB, found.id), [] as Lesson[]),
    safe(() => getRelatedCourses(c.env.DB, found.path_id, found.id), [] as Course[]),
    found.instructor_slug
      ? safe(() => getInstructorBySlug(c.env.DB, found.instructor_slug!), null)
      : Promise.resolve(null),
  ])

  const instructorCourses = instructor
    ? await safe(() => getCoursesByInstructor(c.env.DB, instructor.slug, found.id), [] as Course[])
    : []

  return c.render(
    <CourseDetailPage
      path="/courses"
      course={found}
      lessons={lessons}
      related={related}
      instructor={instructor}
      instructorCourses={instructorCourses}
      found
    />,
    {
      title: `${found.title} | دِوکَست`,
    }
  )
})

app.get('/instructors/:slug', async (c) => {
  const slug = c.req.param('slug')
  const instructor = await safe(() => getInstructorBySlug(c.env.DB, slug), null)

  if (!instructor) {
    c.status(404)
    return c.render(<NotFoundPage path="/courses" message="مدرسی با این آدرس پیدا نشد." />, {
      title: 'پیدا نشد | دِوکَست',
    })
  }

  const courses = await safe(() => getCoursesByInstructor(c.env.DB, slug), [] as Course[])

  return c.render(<InstructorPage path="/courses" instructor={instructor} courses={courses} />, {
    title: `${instructor.name} | مدرس دِوکَست`,
  })
})

app.notFound((c) => {
  c.status(404)
  return c.render(<NotFoundPage path="/" />, { title: 'پیدا نشد | دِوکَست' })
})

export default app
