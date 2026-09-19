-- =====================================================================
-- دِوکَست — مهاجرت ۰۰۰۳: مدرسان + ویدیوهای دوره
-- =====================================================================

-- مدرسان --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS instructors (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  slug           TEXT    NOT NULL UNIQUE,
  name           TEXT    NOT NULL,
  title          TEXT,
  company        TEXT,
  bio            TEXT,
  avatar         TEXT,
  video          TEXT,
  years          INTEGER NOT NULL DEFAULT 0,
  students_count INTEGER NOT NULL DEFAULT 0,
  rating         REAL    NOT NULL DEFAULT 0,
  courses_count  INTEGER NOT NULL DEFAULT 0,
  linkedin       TEXT,
  github         TEXT,
  accent         TEXT    DEFAULT 'from-indigo-500 to-violet-600',
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- اتصال دوره‌ها به مدرس ----------------------------------------------
ALTER TABLE courses ADD COLUMN instructor_slug TEXT;
ALTER TABLE courses ADD COLUMN intro_video   TEXT;
ALTER TABLE courses ADD COLUMN preview_note  TEXT;
ALTER TABLE courses ADD COLUMN languages     INTEGER NOT NULL DEFAULT 1;
ALTER TABLE courses ADD COLUMN projects      INTEGER NOT NULL DEFAULT 0;

-- ویدیوهای جلسات ------------------------------------------------------
ALTER TABLE course_lessons ADD COLUMN video      TEXT;
ALTER TABLE course_lessons ADD COLUMN is_preview INTEGER NOT NULL DEFAULT 0;

-- ایندکس‌ها ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_instructors_slug ON instructors(slug);
CREATE INDEX IF NOT EXISTS idx_courses_instr    ON courses(instructor_slug);
