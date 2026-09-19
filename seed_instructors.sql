-- =====================================================================
-- دِوکَست — مدرسان و ویدیوهای دوره‌ها
-- =====================================================================

-- مدرسان --------------------------------------------------------------
INSERT OR IGNORE INTO instructors
  (slug, name, title, company, bio, avatar, video, years, students_count, rating, courses_count, linkedin, github, accent)
VALUES
('sara-mohammadi', 'سارا محمدی', 'مهندس ارشد فرانت‌اند', 'دیجی‌کالا',
 'سارا بیش از ۸ سال است که روی رابط‌های کاربری محصولات بزرگ کار می‌کند. او معماری فرانت‌اند فروشگاه دیجی‌کالا را از صفر بازنویسی کرده و به‌عنوان منتور، بیش از ۳۰۰ برنامه‌نویس را به بازار کار رسانده است. سبک تدریسش پروژه‌محور و مبتنی بر کد واقعی است.',
 'https://sspark.genspark.ai/i/w6Edj1d156S6EnIN?width=800',
 'https://media.w3.org/2010/05/sintel/trailer.mp4',
 8, 12480, 4.9, 12, 'https://linkedin.com', 'https://github.com', 'from-indigo-500 to-violet-600'),

('amir-rezaei', 'امیر رضایی', 'مهندس ارشد بک‌اند', 'اسنپ',
 'امیر روی سیستم‌های توزیع‌شده و معماری سرویس‌های پرترافیک کار می‌کند. تجربه‌ی طراحی APIهایی با میلیون‌ها درخواست روزانه را دارد و در دوره‌هایش روی امنیت، تست و مقیاس‌پذیری تمرکز می‌کند.',
 'https://sspark.genspark.ai/i/QrQQ7HZ4QLIeEdjC?width=800',
 'https://media.w3.org/2010/05/sintel/trailer.mp4',
 9, 9860, 4.8, 9, 'https://linkedin.com', 'https://github.com', 'from-emerald-500 to-teal-600'),

('negar-karimi', 'نگار کریمی', 'دانشمند داده', 'کافه‌بازار',
 'نگار روی مدل‌های توصیه‌گر و سامانه‌های یادگیری ماشین در مقیاس تولید کار می‌کند. او مسیر یادگیری داده را طوری طراحی کرده که از ریاضیات پایه تا استقرار مدل در تولید را پوشش دهد.',
 'https://sspark.genspark.ai/i/fywV9PSiKXRhS9z8?width=800',
 'https://media.w3.org/2010/05/sintel/trailer.mp4',
 6, 7420, 4.9, 7, 'https://linkedin.com', 'https://github.com', 'from-violet-500 to-fuchsia-600'),

('hossein-tabrizi', 'حسین تبریزی', 'مهندس موبایل', 'علی‌بابا',
 'حسین بیش از ده اپلیکیشن موبایل در مقیاس میلیونی منتشر کرده است. تمرکز او روی تجربه‌ی کاربری بومی، عملکرد و انتشار حرفه‌ای در استورهاست.',
 'https://sspark.genspark.ai/i/oIst5TrJHNok25Dd?width=800',
 'https://media.w3.org/2010/05/sintel/trailer.mp4',
 7, 5140, 4.7, 5, 'https://linkedin.com', 'https://github.com', 'from-cyan-500 to-sky-600');

-- اتصال دوره‌ها به مدرسان + ویدیوی معرفی ------------------------------
UPDATE courses SET
  instructor_slug = 'sara-mohammadi',
  intro_video = 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  preview_note = 'در این ویدیو سارا توضیح می‌دهد این دوره برای چه کسی مناسب است و چه چیزی یاد می‌گیری.',
  projects = 4, languages = 1
WHERE slug = 'js-modern';

UPDATE courses SET
  instructor_slug = 'sara-mohammadi',
  intro_video = 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  preview_note = 'معرفی کامل دوره React و نگاهی به پروژه‌ی پایانی فروشگاه.',
  projects = 6, languages = 2
WHERE slug = 'react-pro';

UPDATE courses SET
  instructor_slug = 'amir-rezaei',
  intro_video = 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  preview_note = 'امیر درباره‌ی معماری API و اینکه چرا امنیت را از روز اول یاد می‌گیریم صحبت می‌کند.',
  projects = 5, languages = 1
WHERE slug = 'node-api';

UPDATE courses SET
  instructor_slug = 'negar-karimi',
  intro_video = 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  preview_note = 'نگار مسیر یادگیری داده و پیش‌نیازهای ریاضی این دوره را توضیح می‌دهد.',
  projects = 3, languages = 1
WHERE slug = 'python-data';

UPDATE courses SET
  instructor_slug = 'negar-karimi',
  intro_video = 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  preview_note = 'نگاهی به پروژه‌های واقعی یادگیری ماشین که در این دوره می‌سازی.',
  projects = 4, languages = 2
WHERE slug = 'ml-basics';

UPDATE courses SET
  instructor_slug = 'hossein-tabrizi',
  intro_video = 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  preview_note = 'حسین روند ساخت یک اپ کامل و انتشار آن در استورها را معرفی می‌کند.',
  projects = 3, languages = 1
WHERE slug = 'react-native-app';

-- ویدیوهای جلسات (نمونه‌های قابل پخش) --------------------------------
UPDATE course_lessons SET
  video = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  is_preview = 1
WHERE lesson_no = 1 AND course_id = (SELECT id FROM courses WHERE slug = 'js-modern');

UPDATE course_lessons SET
  video = 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  is_preview = 1
WHERE lesson_no = 2 AND course_id = (SELECT id FROM courses WHERE slug = 'js-modern');

UPDATE course_lessons SET
  video = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  is_preview = 1
WHERE lesson_no = 3 AND course_id = (SELECT id FROM courses WHERE slug = 'js-modern');

UPDATE course_lessons SET
  video = 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'
WHERE lesson_no > 3 AND course_id = (SELECT id FROM courses WHERE slug = 'js-modern');

-- دوره‌های دیگر: ویدیو برای جلسه‌های اول -----------------------------
UPDATE course_lessons SET
  video = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  is_preview = 1
WHERE course_id = (SELECT id FROM courses WHERE slug = 'react-pro') AND lesson_no <= 2;

UPDATE course_lessons SET
  video = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  is_preview = 1
WHERE course_id = (SELECT id FROM courses WHERE slug = 'react-pro') AND lesson_no > 2;
