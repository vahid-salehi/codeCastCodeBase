-- =====================================================================
-- دِوکَست — اسکیمای اولیه
-- =====================================================================

-- مسیرهای یادگیری -----------------------------------------------------
CREATE TABLE IF NOT EXISTS paths (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  title       TEXT    NOT NULL,
  tag         TEXT,
  summary     TEXT    NOT NULL,
  description TEXT,
  icon        TEXT    DEFAULT 'code',
  months      TEXT,
  level       TEXT,
  featured    INTEGER NOT NULL DEFAULT 0,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- مهارت‌های هر مسیر ---------------------------------------------------
CREATE TABLE IF NOT EXISTS path_skills (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  path_id INTEGER NOT NULL,
  name    TEXT    NOT NULL,
  FOREIGN KEY (path_id) REFERENCES paths(id) ON DELETE CASCADE
);

-- سرفصل‌های (نقشه راه) هر مسیر ---------------------------------------
CREATE TABLE IF NOT EXISTS path_steps (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  path_id     INTEGER NOT NULL,
  step_no     INTEGER NOT NULL,
  title       TEXT    NOT NULL,
  detail      TEXT,
  duration    TEXT,
  FOREIGN KEY (path_id) REFERENCES paths(id) ON DELETE CASCADE
);

-- دوره‌ها --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  path_id     INTEGER,
  title       TEXT    NOT NULL,
  subtitle    TEXT,
  description TEXT,
  level       TEXT,
  hours       REAL    NOT NULL DEFAULT 0,
  lessons     INTEGER NOT NULL DEFAULT 0,
  rating      REAL    NOT NULL DEFAULT 0,
  students    INTEGER NOT NULL DEFAULT 0,
  price       INTEGER NOT NULL DEFAULT 0,      -- 0 = رایگان (تومان)
  instructor  TEXT,
  accent      TEXT    DEFAULT 'from-indigo-400 to-violet-600',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (path_id) REFERENCES paths(id) ON DELETE SET NULL
);

-- سرفصل‌های دوره ------------------------------------------------------
CREATE TABLE IF NOT EXISTS course_lessons (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  lesson_no INTEGER NOT NULL,
  title     TEXT    NOT NULL,
  minutes   INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ثبت‌نام‌ها -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS signups (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT    NOT NULL UNIQUE,
  source     TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ایندکس‌ها ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_paths_slug        ON paths(slug);
CREATE INDEX IF NOT EXISTS idx_courses_slug      ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_path      ON courses(path_id);
CREATE INDEX IF NOT EXISTS idx_path_skills_path  ON path_skills(path_id);
CREATE INDEX IF NOT EXISTS idx_path_steps_path   ON path_steps(path_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course    ON course_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_signups_email     ON signups(email);
