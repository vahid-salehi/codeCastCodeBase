-- =====================================================================
-- دِوکَست — مهاجرت ۰۰۰۲: تصاویر + احراز هویت (OTP)
-- =====================================================================

-- تصاویر مسیرها و دوره‌ها -------------------------------------------
ALTER TABLE paths   ADD COLUMN image TEXT;
ALTER TABLE courses ADD COLUMN cover TEXT;

-- کاربران --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  phone      TEXT    NOT NULL UNIQUE,
  name       TEXT,
  email      TEXT,
  role       TEXT    NOT NULL DEFAULT 'student',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- کدهای یک‌بارمصرف (OTP) ----------------------------------------------
CREATE TABLE IF NOT EXISTS otp_codes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  phone       TEXT    NOT NULL,
  code_hash   TEXT    NOT NULL,
  purpose     TEXT    NOT NULL DEFAULT 'login',   -- login | register
  attempts    INTEGER NOT NULL DEFAULT 0,
  consumed    INTEGER NOT NULL DEFAULT 0,
  expires_at  DATETIME NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- نشست‌ها (Session) ---------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT    PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ایندکس‌ها ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_otp_phone       ON otp_codes(phone, created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_user   ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_exp    ON sessions(expires_at);
