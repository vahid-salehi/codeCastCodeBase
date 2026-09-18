# دِوکَست — آکادمی برنامه‌نویسی

وب‌سایت آموزش برنامه‌نویسی با لندینگ حرفه‌ای، **صفحات داخلی مسیرها و دوره‌ها** و **ثبت‌نام متصل به پایگاه‌داده D1**.
ساخته‌شده با **Hono + Cloudflare Pages + Cloudflare D1 + Tailwind CSS**.

## نمای کلی پروژه
- **نام پروژه**: webapp (دِوکَست)
- **هدف**: یک وب‌اپلیکیشن کامل آموزش برنامه‌نویسی با داده‌های پویا از D1.
- **ویژگی‌ها**:
  - طراحی مینیمال، RTL و فارسی با فونت Vazirmatn
  - حالت روشن/تاریک (Dark Mode) با ذخیره در localStorage
  - انیمیشن ظاهرشدن هنگام اسکرول، شمارنده‌های آماری، نوار تکنولوژی متحرک
  - صفحات فهرست و جزئیات مسیرهای یادگیری (نقشه‌ی راه مرحله‌به‌مرحله)
  - صفحات فهرست و جزئیات دوره‌ها (سرفصل‌ها، فیلتر بر اساس مسیر)
  - فرم ثبت‌نام متصل به API و ذخیره‌سازی در D1 (با تشخیص ایمیل تکراری)
  - API عمومی JSON برای مسیرها، دوره‌ها، آمار و ثبت‌نام

## URLs
- **پیش‌نمایش زنده (demo)**: https://3000-i6w0yyeexwx6uzs3s8y4w-8f57ffe2.sandbox.novita.ai
- **محلی**: http://localhost:3000

## صفحه‌ها و مسیرهای عملکردی (Routes)

| متد | مسیر | توضیح | پارامترها |
|---|---|---|---|
| GET | `/` | لندینگ‌پیج اصلی | — |
| GET | `/paths` | فهرست همهٔ مسیرهای یادگیری | — |
| GET | `/paths/:slug` | جزئیات مسیر + نقشه‌ی راه + دوره‌های مرتبط | `slug` مثل `frontend` |
| GET | `/courses` | فهرست دوره‌ها | `?path=<slug>` برای فیلتر |
| GET | `/courses/:slug` | جزئیات دوره + سرفصل‌ها + دوره‌های مرتبط | `slug` مثل `js-modern` |
| GET | `/api/health` | بررسی سلامت سرویس | — |
| GET | `/api/stats` | آمار مسیرها/دوره‌ها/دانشجوها/ثبت‌نام‌ها | — |
| GET | `/api/paths` | JSON همهٔ مسیرها | — |
| GET | `/api/paths/:slug` | JSON یک مسیر + مراحل + دوره‌ها | `slug` |
| GET | `/api/courses` | JSON همهٔ دوره‌ها | `?path=<slug>` |
| GET | `/api/courses/:slug` | JSON یک دوره + سرفصل‌ها + مرتبط‌ها | `slug` |
| POST | `/api/signup` | ثبت ایمیل | body: `{ "email": "...", "source": "landing" }` |

### نمونهٔ فراخوانی API
```bash
curl -s http://localhost:3000/api/stats
curl -s "http://localhost:3000/api/courses?path=backend"
curl -s -X POST http://localhost:3000/api/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com"}'
```

## معماری داده
- **سرویس ذخیره‌سازی**: Cloudflare **D1** (SQLite توزیع‌شده).
- **مدل داده** (جدول‌های D1):
  - `paths` — مسیرهای یادگیری (slug، عنوان، خلاصه، توضیح، آیکون، مدت، سطح)
  - `path_skills` — مهارت‌های هر مسیر
  - `path_steps` — مراحل نقشه‌ی راه هر مسیر
  - `courses` — دوره‌ها (مرتبط با مسیر، قیمت، امتیاز، دانشجو، مدرس)
  - `course_lessons` — سرفصل‌های هر دوره
  - `signups` — ایمیل‌های ثبت‌نام‌شده (با UNIQUE روی ایمیل)
- **جریان داده**: درخواست → Hono → `src/data.ts` → D1 → رندر JSX. در صورت خطای D1، داده‌ی جایگزین (fallback) نمایش داده می‌شود تا صفحه هرگز خراب نشود.

## راهنمای کاربر
1. در صفحهٔ اصلی بین مسیرهای یادگیری یک گزینه را انتخاب کنید.
2. وارد صفحهٔ مسیر شوید و نقشه‌ی راه و دوره‌های آن را ببینید.
3. از بخش «دوره‌ها» می‌توانید با فیلتر مسیر، دورهٔ مناسب را پیدا کنید.
4. در پایین صفحهٔ اصلی، ایمیل خود را وارد کرده و ثبت‌نام رایگان کنید (در D1 ذخیره می‌شود).

## ساختار پروژه
```
src/
├── index.tsx              # روت‌ها (صفحات + API) و مدیریت خطا
├── renderer.tsx           # قالب HTML (فونت، Tailwind، آیکون، favicon)
├── data.ts                # لایهٔ دسترسی به D1 + توابع کمکی
├── types.ts               # تایپ‌های D1Database / Bindings
├── components/
│   ├── icons.tsx          # آیکون‌های SVG
│   └── layout.tsx         # Nav، Footer، Breadcrumbs، PageShell، Badge
└── pages/
    ├── home.tsx           # لندینگ اصلی
    ├── paths.tsx          # /paths و /paths/:slug (+ PathCard، CourseCard، 404)
    └── courses.tsx        # /courses و /courses/:slug
migrations/
└── 0001_initial_schema.sql   # اسکیمای D1
seed.sql                      # داده‌های نمونه
public/static/
├── app.js                 # دارک‌مود، reveal، شمارنده، منو، فرم→API
├── style.css              # استایل‌های سفارشی
└── tailwind.config.js     # تنظیمات Tailwind CDN
```

## توسعهٔ محلی
```bash
npm run build                       # ساخت پروژه
npm run db:migrate:local            # اجرای مهاجرت‌های D1 (محلی)
npm run db:seed                     # درج داده‌های نمونه
pm2 start ecosystem.config.cjs      # اجرای سرویس روی پورت 3000
npm run db:reset                    # بازنشانی کامل پایگاه‌داده محلی
pm2 logs webapp --nostream          # مشاهدهٔ لاگ
```

## استقرار
- **پلتفرم**: Cloudflare Pages + D1
- **وضعیت**: ✅ فعال (پیش‌نمایش sandbox با D1 محلی)
- **پشتهٔ فناوری**: Hono + TypeScript + Cloudflare D1 + Tailwind CSS (CDN)
- **نکتهٔ استقرار تولید**: قبل از `deploy`، شناسهٔ واقعی D1 را جایگزین `database_id` در `wrangler.jsonc` کنید و مهاجرت را روی محیط تولید اجرا کنید:
  ```bash
  npx wrangler d1 create webapp-production
  npx wrangler d1 migrations apply webapp-production
  npx wrangler d1 execute webapp-production --file=./seed.sql
  npm run deploy
  ```
- **آخرین به‌روزرسانی**: ۱۴۰۴

## مراحل بعدی پیشنهادی
- افزودن احراز هویت کاربران و داشبورد پیشرفت
- جست‌وجو و مرتب‌سازی پیشرفته در دوره‌ها
- صفحهٔ پروفایل مدرس و نظرات دوره‌ها
- اتصال ثبت‌نام به سرویس ایمیل (Resend/SendGrid) برای ارسال لینک شروع
