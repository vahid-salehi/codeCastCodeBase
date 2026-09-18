-- =====================================================================
-- دِوکَست — داده‌های نمونه
-- =====================================================================

-- مسیرهای یادگیری -----------------------------------------------------
INSERT OR IGNORE INTO paths (slug, title, tag, summary, description, icon, months, level, featured, sort_order) VALUES
('frontend', 'توسعه وب فرانت‌اند', 'پرطرفدارترین',
 'از HTML و CSS تا React و معماری کامپوننتی — ساخت رابط‌های مدرن و سریع.',
 'در این مسیر ابتدا پایه‌های وب را می‌سازی، سپس با JavaScript منطق برنامه را می‌نویسی و در ادامه با React و TypeScript رابط‌های حرفه‌ای و مقیاس‌پذیر می‌سازی. در پایان روی یک محصول واقعی کار می‌کنی و برای مصاحبه آماده می‌شوی.',
 'code', '۶ ماه', 'مقدماتی تا پیشرفته', 1, 1),
('backend', 'مهندسی بک‌اند', 'بک‌اند',
 'طراحی API، پایگاه‌داده و سیستم‌های مقیاس‌پذیر روی سرورهای ابری.',
 'با Node.js شروع می‌کنی، طراحی REST API را یاد می‌گیری، با PostgreSQL داده را مدل‌سازی می‌کنی و در نهایت اپلیکیشن را با Docker روی ابر مستقر می‌سازی. تمرکز مسیر روی امنیت، تست و مقیاس‌پذیری است.',
 'terminal', '۷ ماه', 'مقدماتی تا پیشرفته', 0, 2),
('ai-data', 'هوش مصنوعی و داده', 'جدید',
 'مبانی یادگیری ماشین، کار با داده و ساخت اپلیکیشن‌های هوشمند.',
 'این مسیر با پایتون و تحلیل داده آغاز می‌شود، با مبانی آماری و یادگیری ماشین ادامه پیدا می‌کند و تا ساخت سرویس‌های مبتنی بر مدل‌های زبانی پیش می‌رود. برای علاقه‌مندان به داده و هوش مصنوعی طراحی شده است.',
 'spark', '۸ ماه', 'مقدماتی تا پیشرفته', 0, 3),
('mobile', 'اپلیکیشن موبایل', 'موبایل',
 'ساخت اپ‌های چندسکویی با تجربه‌ی کاربری بومی و انتشار در استورها.',
 'با React Native و Expo اپلیکیشن‌های چندسکویی می‌سازی، به APIها وصل می‌شوی، تجربه‌ی کاربری موبایل را یاد می‌گیری و در نهایت اپ را در استورها منتشر می‌کنی.',
 'route', '۵ ماه', 'مقدماتی تا متوسط', 0, 4);

-- مهارت‌ها -------------------------------------------------------------
INSERT INTO path_skills (path_id, name)
SELECT id, 'HTML/CSS'      FROM paths WHERE slug = 'frontend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'JavaScript'    FROM paths WHERE slug = 'frontend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'React'         FROM paths WHERE slug = 'frontend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'TypeScript'    FROM paths WHERE slug = 'frontend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'Node.js'       FROM paths WHERE slug = 'backend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'PostgreSQL'    FROM paths WHERE slug = 'backend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'REST API'      FROM paths WHERE slug = 'backend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'Docker'        FROM paths WHERE slug = 'backend';
INSERT INTO path_skills (path_id, name)
SELECT id, 'Python'        FROM paths WHERE slug = 'ai-data';
INSERT INTO path_skills (path_id, name)
SELECT id, 'Pandas'        FROM paths WHERE slug = 'ai-data';
INSERT INTO path_skills (path_id, name)
SELECT id, 'Machine Learning' FROM paths WHERE slug = 'ai-data';
INSERT INTO path_skills (path_id, name)
SELECT id, 'LLM'           FROM paths WHERE slug = 'ai-data';
INSERT INTO path_skills (path_id, name)
SELECT id, 'React Native'  FROM paths WHERE slug = 'mobile';
INSERT INTO path_skills (path_id, name)
SELECT id, 'Expo'          FROM paths WHERE slug = 'mobile';
INSERT INTO path_skills (path_id, name)
SELECT id, 'API'           FROM paths WHERE slug = 'mobile';
INSERT INTO path_skills (path_id, name)
SELECT id, 'UI/UX'         FROM paths WHERE slug = 'mobile';

-- سرفصل‌های مسیر (نقشه راه) ------------------------------------------
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 1, 'مبانی وب', 'HTML معنایی، CSS مدرن، Flexbox و Grid و طراحی واکنش‌گرا.', '۴ هفته' FROM paths WHERE slug = 'frontend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 2, 'JavaScript مدرن', 'متغیرها، تابع‌ها، async/await، کار با API و ماژول‌ها.', '۶ هفته' FROM paths WHERE slug = 'frontend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 3, 'React و مدیریت حالت', 'کامپوننت‌ها، هوک‌ها، مسیریابی و مدیریت وضعیت.', '۶ هفته' FROM paths WHERE slug = 'frontend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 4, 'TypeScript حرفه‌ای', 'تایپ‌های پیشرفته، جنریک‌ها و ساختاردهی پروژه.', '۴ هفته' FROM paths WHERE slug = 'frontend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 5, 'پروژه نهایی و مصاحبه', 'ساخت یک اپ کامل و تمرین مصاحبه‌های فرانت‌اند.', '۴ هفته' FROM paths WHERE slug = 'frontend';

INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 1, 'پایه‌های Node.js', 'ماژول‌ها، فایل‌سیستم، پکیج‌منیجر و ابزارها.', '۴ هفته' FROM paths WHERE slug = 'backend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 2, 'طراحی REST API', 'مسیرها، اعتبارسنجی، مدیریت خطا و مستندسازی.', '۵ هفته' FROM paths WHERE slug = 'backend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 3, 'پایگاه‌داده', 'طراحی اسکیما، کوئری‌های SQL و مهاجرت‌ها.', '۵ هفته' FROM paths WHERE slug = 'backend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 4, 'احراز هویت و امنیت', 'JWT، هش رمز و محافظت از APIها.', '۴ هفته' FROM paths WHERE slug = 'backend';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 5, 'استقرار و مقیاس', 'Docker، متغیرهای محرمانه و استقرار روی ابر.', '۴ هفته' FROM paths WHERE slug = 'backend';

INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 1, 'پایتون و داده', 'سینتکس، ساختار داده و کار با فایل‌ها.', '۴ هفته' FROM paths WHERE slug = 'ai-data';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 2, 'تحلیل داده با Pandas', 'پاک‌سازی، تجمیع و مصورسازی داده.', '۵ هفته' FROM paths WHERE slug = 'ai-data';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 3, 'مبانی یادگیری ماشین', 'رگرسیون، دسته‌بندی و ارزیابی مدل.', '۶ هفته' FROM paths WHERE slug = 'ai-data';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 4, 'مدل‌های زبانی', 'کار با LLMها، امبدینگ و ساخت سرویس هوشمند.', '۵ هفته' FROM paths WHERE slug = 'ai-data';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 5, 'پروژه نهایی', 'ساخت یک اپلیکیشن هوش مصنوعی کامل.', '۴ هفته' FROM paths WHERE slug = 'ai-data';

INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 1, 'مبانی موبایل', 'کامپوننت‌ها، استایل و چیدمان در React Native.', '۴ هفته' FROM paths WHERE slug = 'mobile';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 2, 'ناوبری و حالت', 'مسیریابی بین صفحات و مدیریت وضعیت.', '۳ هفته' FROM paths WHERE slug = 'mobile';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 3, 'اتصال به API', 'دریافت داده، مدیریت بارگذاری و کش.', '۳ هفته' FROM paths WHERE slug = 'mobile';
INSERT INTO path_steps (path_id, step_no, title, detail, duration)
SELECT id, 4, 'انتشار در استور', 'ساخت نسخه نهایی و انتشار در استورها.', '۳ هفته' FROM paths WHERE slug = 'mobile';

-- دوره‌ها --------------------------------------------------------------
INSERT OR IGNORE INTO courses (slug, path_id, title, subtitle, description, level, hours, lessons, rating, students, price, instructor, accent)
SELECT 'js-modern', id, 'مبانی JavaScript مدرن', 'شروع برنامه‌نویسی از صفر',
 'در این دوره از صفر با JavaScript آشنا می‌شوی و مفاهیم پایه تا async را با تمرین عملی یاد می‌گیری.',
 'مقدماتی', 18, 42, 4.9, 3240, 0, 'امیر رضایی', 'from-amber-400 to-orange-500'
FROM paths WHERE slug = 'frontend';

INSERT OR IGNORE INTO courses (slug, path_id, title, subtitle, description, level, hours, lessons, rating, students, price, instructor, accent)
SELECT 'react-pro', id, 'React از صفر تا پروژه', 'ساخت رابط‌های مدرن',
 'کامپوننت‌ها، هوک‌ها، مسیریابی و مدیریت حالت را با ساخت یک پروژه واقعی یاد می‌گیری.',
 'متوسط', 26, 58, 4.8, 2115, 980000, 'سارا محمدی', 'from-sky-400 to-blue-600'
FROM paths WHERE slug = 'frontend';

INSERT OR IGNORE INTO courses (slug, path_id, title, subtitle, description, level, hours, lessons, rating, students, price, instructor, accent)
SELECT 'node-api', id, 'طراحی API با Node.js', 'بک‌اند حرفه‌ای',
 'طراحی REST API امن با Node.js، اعتبارسنجی، احراز هویت و اتصال به پایگاه‌داده.',
 'متوسط', 22, 49, 4.9, 1780, 1240000, 'امیر رضایی', 'from-emerald-400 to-teal-600'
FROM paths WHERE slug = 'backend';

INSERT OR IGNORE INTO courses (slug, path_id, title, subtitle, description, level, hours, lessons, rating, students, price, instructor, accent)
SELECT 'python-data', id, 'پایتون برای داده', 'ورود به دنیای داده',
 'با پایتون شروع می‌کنی و با Pandas داده را تحلیل و مصورسازی می‌کنی.',
 'مقدماتی', 20, 46, 4.7, 2560, 0, 'نگار کریمی', 'from-violet-400 to-purple-600'
FROM paths WHERE slug = 'ai-data';

INSERT OR IGNORE INTO courses (slug, path_id, title, subtitle, description, level, hours, lessons, rating, students, price, instructor, accent)
SELECT 'ml-basics', id, 'مبانی یادگیری ماشین', 'از داده تا مدل',
 'مفاهیم رگرسیون، دسته‌بندی و ارزیابی مدل را با پروژه‌های عملی یاد می‌گیری.',
 'متوسط', 24, 52, 4.8, 1420, 1180000, 'نگار کریمی', 'from-rose-400 to-pink-600'
FROM paths WHERE slug = 'ai-data';

INSERT OR IGNORE INTO courses (slug, path_id, title, subtitle, description, level, hours, lessons, rating, students, price, instructor, accent)
SELECT 'react-native-app', id, 'اپ موبایل با React Native', 'ساخت اپ چندسکویی',
 'با React Native و Expo یک اپلیکیشن موبایل کامل بساز و در استور منتشر کن.',
 'متوسط', 21, 44, 4.6, 980, 1090000, 'سارا محمدی', 'from-cyan-400 to-sky-600'
FROM paths WHERE slug = 'mobile';

-- سرفصل‌های دوره نمونه (js-modern) -----------------------------------
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 1, 'معرفی و راه‌اندازی محیط', 18 FROM courses WHERE slug = 'js-modern';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 2, 'متغیرها و انواع داده', 32 FROM courses WHERE slug = 'js-modern';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 3, 'توابع و اسکوپ', 41 FROM courses WHERE slug = 'js-modern';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 4, 'آرایه‌ها و متدهای آن‌ها', 38 FROM courses WHERE slug = 'js-modern';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 5, 'کار با DOM', 45 FROM courses WHERE slug = 'js-modern';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 6, 'async/await و Fetch', 52 FROM courses WHERE slug = 'js-modern';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 7, 'پروژه پایانی: اپ هواشناسی', 60 FROM courses WHERE slug = 'js-modern';

-- سرفصل‌های نمونه برای سایر دوره‌ها (نمایشی) -------------------------
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 1, 'معرفی React و JSX', 24 FROM courses WHERE slug = 'react-pro';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 2, 'کامپوننت‌ها و پروپ‌ها', 36 FROM courses WHERE slug = 'react-pro';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 3, 'مدیریت حالت با هوک‌ها', 44 FROM courses WHERE slug = 'react-pro';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 4, 'مسیریابی و درخواست داده', 40 FROM courses WHERE slug = 'react-pro';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 5, 'پروژه پایانی: فروشگاه', 75 FROM courses WHERE slug = 'react-pro';
