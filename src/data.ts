import type { D1Database } from './types'

/* ------------------------------------------------------------------ */
/*  تایپ‌ها                                                            */
/* ------------------------------------------------------------------ */

export type PathRow = {
  id: number
  slug: string
  title: string
  tag: string | null
  summary: string
  description: string | null
  icon: string
  months: string | null
  level: string | null
  featured: number
  sort_order: number
  image: string | null
}

export type Path = PathRow & { skills: string[] }

export type PathStep = {
  step_no: number
  title: string
  detail: string | null
  duration: string | null
}

export type CourseRow = {
  id: number
  slug: string
  path_id: number | null
  title: string
  subtitle: string | null
  description: string | null
  level: string | null
  hours: number
  lessons: number
  rating: number
  students: number
  price: number
  instructor: string | null
  accent: string | null
  cover: string | null
  instructor_slug: string | null
  intro_video: string | null
  preview_note: string | null
  languages: number
  projects: number
}

export type Course = CourseRow & { path_slug?: string | null; path_title?: string | null }

export type Lesson = {
  lesson_no: number
  title: string
  minutes: number
  video: string | null
  is_preview: number
}

export type Instructor = {
  id: number
  slug: string
  name: string
  title: string | null
  company: string | null
  bio: string | null
  avatar: string | null
  video: string | null
  years: number
  students_count: number
  rating: number
  courses_count: number
  linkedin: string | null
  github: string | null
  accent: string | null
}

export type Stats = {
  paths: number
  courses: number
  students: number
  signups: number
}

/* ------------------------------------------------------------------ */
/*  هوک انتخاب آیکون                                                  */
/* ------------------------------------------------------------------ */

export const iconKey = (key: string): string =>
  ['code', 'terminal', 'spark', 'route', 'users', 'briefcase', 'shield', 'clock'].includes(key)
    ? key
    : 'code'

/* ------------------------------------------------------------------ */
/*  خواندن داده‌ها                                                     */
/* ------------------------------------------------------------------ */

export async function getPaths(db: D1Database): Promise<Path[]> {
  const { results: rows } = await db
    .prepare('SELECT * FROM paths ORDER BY sort_order ASC, id ASC')
    .all<PathRow>()

  const { results: skills } = await db
    .prepare('SELECT path_id, name FROM path_skills ORDER BY id ASC')
    .all<{ path_id: number; name: string }>()

  return (rows ?? []).map((row) => ({
    ...row,
    icon: iconKey(row.icon),
    skills: (skills ?? []).filter((s) => s.path_id === row.id).map((s) => s.name),
  }))
}

export async function getPathBySlug(db: D1Database, slug: string): Promise<Path | null> {
  const row = await db.prepare('SELECT * FROM paths WHERE slug = ?').bind(slug).first<PathRow>()
  if (!row) return null

  const { results: skills } = await db
    .prepare('SELECT name FROM path_skills WHERE path_id = ? ORDER BY id ASC')
    .bind(row.id)
    .all<{ name: string }>()

  return { ...row, icon: iconKey(row.icon), skills: (skills ?? []).map((s) => s.name) }
}

export async function getPathSteps(db: D1Database, pathId: number): Promise<PathStep[]> {
  const { results } = await db
    .prepare('SELECT step_no, title, detail, duration FROM path_steps WHERE path_id = ? ORDER BY step_no ASC')
    .bind(pathId)
    .all<PathStep>()
  return results ?? []
}

export async function getCourses(db: D1Database, pathSlug?: string): Promise<Course[]> {
  const base = `
    SELECT c.*, p.slug AS path_slug, p.title AS path_title
    FROM courses c
    LEFT JOIN paths p ON p.id = c.path_id`

  if (pathSlug) {
    const { results } = await db
      .prepare(`${base} WHERE p.slug = ? ORDER BY c.students DESC, c.id ASC`)
      .bind(pathSlug)
      .all<Course>()
    return results ?? []
  }

  const { results } = await db.prepare(`${base} ORDER BY c.students DESC, c.id ASC`).all<Course>()
  return results ?? []
}

export async function getCourseBySlug(db: D1Database, slug: string): Promise<Course | null> {
  return await db
    .prepare(
      `SELECT c.*, p.slug AS path_slug, p.title AS path_title
       FROM courses c
       LEFT JOIN paths p ON p.id = c.path_id
       WHERE c.slug = ?`
    )
    .bind(slug)
    .first<Course>()
}

export async function getCourseLessons(db: D1Database, courseId: number): Promise<Lesson[]> {
  const { results } = await db
    .prepare(
      'SELECT lesson_no, title, minutes, video, is_preview FROM course_lessons WHERE course_id = ? ORDER BY lesson_no ASC'
    )
    .bind(courseId)
    .all<Lesson>()
  return results ?? []
}

export async function getInstructorBySlug(db: D1Database, slug: string): Promise<Instructor | null> {
  return await db.prepare('SELECT * FROM instructors WHERE slug = ?').bind(slug).first<Instructor>()
}

export async function getCoursesByInstructor(db: D1Database, slug: string, excludeId?: number): Promise<Course[]> {
  const { results } = await db
    .prepare('SELECT * FROM courses WHERE instructor_slug = ? AND id != ? ORDER BY students DESC LIMIT 3')
    .bind(slug, excludeId ?? 0)
    .all<Course>()
  return results ?? []
}

export async function getRelatedCourses(db: D1Database, pathId: number | null, excludeId: number): Promise<Course[]> {
  if (!pathId) return []
  const { results } = await db
    .prepare('SELECT * FROM courses WHERE path_id = ? AND id != ? ORDER BY students DESC LIMIT 3')
    .bind(pathId, excludeId)
    .all<Course>()
  return results ?? []
}

export async function getStats(db: D1Database): Promise<Stats> {
  const row = await db
    .prepare(
      `SELECT
         (SELECT COUNT(*) FROM paths)   AS paths,
         (SELECT COUNT(*) FROM courses) AS courses,
         (SELECT COUNT(*) FROM signups) AS signups`
    )
    .first<{ paths: number; courses: number; signups: number }>()

  const enrolled = await db
    .prepare('SELECT COALESCE(SUM(students), 0) AS total FROM courses')
    .first<{ total: number }>()

  return {
    paths: row?.paths ?? 0,
    courses: row?.courses ?? 0,
    signups: row?.signups ?? 0,
    students: enrolled?.total ?? 0,
  }
}

/* ------------------------------------------------------------------ */
/*  نوشتن داده‌ها                                                      */
/* ------------------------------------------------------------------ */

export async function createSignup(
  db: D1Database,
  email: string,
  source = 'landing'
): Promise<{ ok: boolean; duplicate: boolean; total: number }> {
  const normalized = email.trim().toLowerCase()

  const existing = await db
    .prepare('SELECT id FROM signups WHERE email = ?')
    .bind(normalized)
    .first<{ id: number }>()

  if (existing) {
    const total = await db.prepare('SELECT COUNT(*) AS c FROM signups').first<{ c: number }>()
    return { ok: true, duplicate: true, total: total?.c ?? 0 }
  }

  await db
    .prepare('INSERT INTO signups (email, source) VALUES (?, ?)')
    .bind(normalized, source)
    .run()

  const total = await db.prepare('SELECT COUNT(*) AS c FROM signups').first<{ c: number }>()
  return { ok: true, duplicate: false, total: total?.c ?? 0 }
}

/* ------------------------------------------------------------------ */
/*  حساب کاربری                                                       */
/* ------------------------------------------------------------------ */

export type UserCourse = {
  title: string
  slug: string
  cover: string | null
  hours: number
}

/** دوره‌های در دسترس کاربر (در این نسخه: همهٔ دوره‌ها) */
export async function getUserCourses(db: D1Database, limit = 6): Promise<UserCourse[]> {
  const { results } = await db
    .prepare('SELECT title, slug, cover, hours FROM courses ORDER BY id ASC LIMIT ?')
    .bind(limit)
    .all<UserCourse>()
  return results ?? []
}

export async function countUserSessions(db: D1Database, userId: number): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) AS c FROM sessions WHERE user_id = ?')
    .bind(userId)
    .first<{ c: number }>()
  return row?.c ?? 0
}

/* ------------------------------------------------------------------ */
/*  کمک‌کننده‌های نمایش                                                */
/* ------------------------------------------------------------------ */

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export const faNum = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => FA_DIGITS[Number(d)])

export const toman = (price: number): string =>
  price === 0 ? 'رایگان' : `${faNum(price.toLocaleString('en-US'))}`
