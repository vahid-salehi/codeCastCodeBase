-- =====================================================================
-- دِوکَست — اتصال تصاویر به فایل‌های محلی
-- CDN قبلی هدر «content-security-policy: img-src data:» می‌فرستاد و
-- مرورگر تصاویر را بلاک می‌کرد (ERR_BLOCKED_BY_ORB)؛ پس تصاویر داخل
-- public/static/img ذخیره و از مسیر محلی سرو می‌شوند.
-- =====================================================================

-- مسیرها
UPDATE paths SET image = '/static/img/path-frontend.jpg' WHERE slug = 'frontend';
UPDATE paths SET image = '/static/img/path-backend.jpg'  WHERE slug = 'backend';
UPDATE paths SET image = '/static/img/path-ai-data.jpg'  WHERE slug = 'ai-data';
UPDATE paths SET image = '/static/img/path-mobile.jpg'   WHERE slug = 'mobile';

-- دوره‌ها
UPDATE courses SET cover = '/static/img/course-js-modern.jpg'        WHERE slug = 'js-modern';
UPDATE courses SET cover = '/static/img/course-react-pro.jpg'        WHERE slug = 'react-pro';
UPDATE courses SET cover = '/static/img/course-node-api.jpg'         WHERE slug = 'node-api';
UPDATE courses SET cover = '/static/img/course-python-data.jpg'      WHERE slug = 'python-data';
UPDATE courses SET cover = '/static/img/course-ml-basics.jpg'        WHERE slug = 'ml-basics';
UPDATE courses SET cover = '/static/img/course-react-native-app.jpg' WHERE slug = 'react-native-app';

-- مدرسان
UPDATE instructors SET avatar = '/static/img/instructor-sara-mohammadi.jpg'  WHERE slug = 'sara-mohammadi';
UPDATE instructors SET avatar = '/static/img/instructor-amir-rezaei.jpg'     WHERE slug = 'amir-rezaei';
UPDATE instructors SET avatar = '/static/img/instructor-negar-karimi.jpg'    WHERE slug = 'negar-karimi';
UPDATE instructors SET avatar = '/static/img/instructor-hossein-tabrizi.jpg' WHERE slug = 'hossein-tabrizi';
