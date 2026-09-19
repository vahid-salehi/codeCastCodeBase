-- =====================================================================
-- دِوکَست — سرفصل و ویدیوی جلسات برای دوره‌هایی که خالی بودند
-- (node-api, python-data, ml-basics, react-native-app)
-- =====================================================================

DELETE FROM course_lessons WHERE course_id = (SELECT id FROM courses WHERE slug = 'node-api');

-- ---------------------------------------------------------------------
-- node-api — طراحی API با Node.js
-- ---------------------------------------------------------------------
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 1, 'معرفی Express و ساختار پروژه', 22,
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', 1 FROM courses WHERE slug = 'node-api';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 2, 'مسیرها و میدل‌ورها', 35,
  'https://media.w3.org/2010/05/sintel/trailer.mp4', 1 FROM courses WHERE slug = 'node-api';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 3, 'اعتبارسنجی ورودی کاربر', 28,
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', 1 FROM courses WHERE slug = 'node-api';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 4, 'اتصال به پایگاه‌داده', 46 FROM courses WHERE slug = 'node-api';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 5, 'احراز هویت با JWT', 52 FROM courses WHERE slug = 'node-api';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 6, 'مدیریت خطا و لاگ', 30 FROM courses WHERE slug = 'node-api';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 7, 'پروژه پایانی: API فروشگاه', 68 FROM courses WHERE slug = 'node-api';

DELETE FROM course_lessons WHERE course_id = (SELECT id FROM courses WHERE slug = 'python-data');

-- ---------------------------------------------------------------------
-- python-data — پایتون برای داده
-- ---------------------------------------------------------------------
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 1, 'نصب پایتون و اولین اسکریپت', 19,
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', 1 FROM courses WHERE slug = 'python-data';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 2, 'لیست‌ها، دیکشنری‌ها و حلقه‌ها', 34,
  'https://media.w3.org/2010/05/sintel/trailer.mp4', 1 FROM courses WHERE slug = 'python-data';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 3, 'آشنایی با Pandas', 41,
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', 1 FROM courses WHERE slug = 'python-data';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 4, 'پاک‌سازی و آماده‌سازی داده', 44 FROM courses WHERE slug = 'python-data';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 5, 'تجمیع و گروه‌بندی داده', 38 FROM courses WHERE slug = 'python-data';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 6, 'مصورسازی با Matplotlib', 42 FROM courses WHERE slug = 'python-data';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 7, 'پروژه پایانی: تحلیل یک دیتاست واقعی', 64 FROM courses WHERE slug = 'python-data';

DELETE FROM course_lessons WHERE course_id = (SELECT id FROM courses WHERE slug = 'ml-basics');

-- ---------------------------------------------------------------------
-- ml-basics — مبانی یادگیری ماشین
-- ---------------------------------------------------------------------
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 1, 'یادگیری ماشین چیست؟', 21,
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', 1 FROM courses WHERE slug = 'ml-basics';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 2, 'آماده‌سازی داده با NumPy', 36,
  'https://media.w3.org/2010/05/sintel/trailer.mp4', 1 FROM courses WHERE slug = 'ml-basics';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 3, 'رگرسیون خطی گام‌به‌گام', 48,
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', 1 FROM courses WHERE slug = 'ml-basics';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 4, 'دسته‌بندی و مرز تصمیم', 45 FROM courses WHERE slug = 'ml-basics';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 5, 'ارزیابی مدل و اعتبارسنجی متقابل', 40 FROM courses WHERE slug = 'ml-basics';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 6, 'بیش‌برازش و تنظیم مدل', 37 FROM courses WHERE slug = 'ml-basics';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 7, 'پروژه پایانی: پیش‌بینی قیمت', 70 FROM courses WHERE slug = 'ml-basics';

DELETE FROM course_lessons WHERE course_id = (SELECT id FROM courses WHERE slug = 'react-native-app');

-- ---------------------------------------------------------------------
-- react-native-app — اپ موبایل با React Native
-- ---------------------------------------------------------------------
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 1, 'راه‌اندازی Expo و اولین اپ', 20,
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', 1 FROM courses WHERE slug = 'react-native-app';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 2, 'کامپوننت‌ها و استایل‌دهی', 33,
  'https://media.w3.org/2010/05/sintel/trailer.mp4', 1 FROM courses WHERE slug = 'react-native-app';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes, video, is_preview)
SELECT id, 3, 'چیدمان با Flexbox در موبایل', 39,
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', 1 FROM courses WHERE slug = 'react-native-app';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 4, 'ناوبری بین صفحات', 41 FROM courses WHERE slug = 'react-native-app';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 5, 'دریافت داده از API', 43 FROM courses WHERE slug = 'react-native-app';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 6, 'مدیریت حالت و ذخیره‌سازی محلی', 38 FROM courses WHERE slug = 'react-native-app';
INSERT INTO course_lessons (course_id, lesson_no, title, minutes)
SELECT id, 7, 'پروژه پایانی: انتشار اپ در استور', 72 FROM courses WHERE slug = 'react-native-app';
