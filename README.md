# دِوکَست — آکادمی برنامه‌نویسی

وب‌سایت آموزش برنامه‌نویسی با لندینگ حرفه‌ای، **صفحات داخلی مسیرها و دوره‌ها**، **احراز هویت با OTP پیامکی** و **ذخیره‌سازی روی Cloudflare D1**.
ساخته‌شده با **Hono + Cloudflare Pages + Cloudflare D1 + Tailwind CSS**.

## نمای کلی پروژه
- **نام پروژه**: webapp (دِوکَست)
- **هدف**: یک وب‌اپلیکیشن کامل آموزش برنامه‌نویسی با داده‌های پویا از D1 و ورود با پیامک.
- **ویژگی‌ها**:
  - طراحی مینیمال، RTL و فارسی با فونت Vazirmatn + حالت روشن/تاریک
  - **المان‌های گرافیکی مدرن**: موج‌های منحنی SVG، بلاب‌های گرادیانی، شبکهٔ نقطه‌چین، حلقه‌های تزئینی، پنجرهٔ کد متحرک
  - **تصاویر جلد** برای همهٔ مسیرها و دوره‌ها (با فیلتر گرادیانی و افکت زوم)
  - صفحات فهرست و جزئیات مسیرهای یادگیری (نقشه‌ی راه مرحله‌به‌مرحله)
  - صفحات فهرست و جزئیات دوره‌ها (سرفصل‌ها، فیلتر بر اساس مسیر)
  - **ورود و ثبت‌نام با OTP پیامکی** (کد ۶ رقمی، شمارش معکوس، ارسال مجدد، محدودیت نرخ)
  - **صفحهٔ حساب کاربری** با نمایش دوره‌ها و آمار
  - فرم ثبت‌نام ایمیلی در لندینگ (متصل به D1)
  - API عمومی JSON برای مسیرها، دوره‌ها، آمار، ثبت‌نام و احراز هویت

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
| GET | `/login` | ورود با OTP پیامکی | `?next=/path` |
| GET | `/register` | ثبت‌نام با OTP پیامکی | `?next=/path` |
| GET | `/account` | حساب کاربری (نیازمند ورود) | — |
| GET | `/api/health` | بررسی سلامت سرویس | — |
| GET | `/api/stats` | آمار مسیرها/دوره‌ها/دانشجوها/ثبت‌نام‌ها | — |
| GET | `/api/paths` | JSON همهٔ مسیرها | — |
| GET | `/api/paths/:slug` | JSON یک مسیر + مراحل + دوره‌ها | `slug` |
| GET | `/api/courses` | JSON همهٔ دوره‌ها | `?path=<slug>` |
| GET | `/api/courses/:slug` | JSON یک دوره + سرفصل‌ها + مرتبط‌ها | `slug` |
| POST | `/api/signup` | ثبت ایمیل در لندینگ | `{ "email": "...", "source": "landing" }` |
| POST | `/api/auth/otp/request` | درخواست کد OTP | `{ "phone": "09...", "purpose": "login\|register", "name": "..." }` |
| POST | `/api/auth/otp/verify` | تأیید کد و ایجاد نشست | `{ "phone": "09...", "code": "123456" }` |
| POST | `/api/auth/logout` | خروج و پاک‌کردن نشست | — |
| GET | `/api/auth/me` | اطلاعات کاربر جاری از کوکی | — |
| GET | `/api/auth/config` | وضعیت پیکربندی پیامک | — |

### نمونهٔ فراخوانی API
```bash
# آمار
curl -s http://localhost:3000/api/stats

# درخواست کد ورود (در حالت دمو، کد در پاسخ برمی‌گردد)
curl -s -X POST http://localhost:3000/api/auth/otp/request \
  -H 'Content-Type: application/json' \
  -d '{"phone":"09123456789","purpose":"login"}'

# تأیید کد و دریافت کوکی نشست
curl -s -c cookies.txt -X POST http://localhost:3000/api/auth/otp/verify \
  -H 'Content-Type: application/json' \
  -d '{"phone":"09123456789","code":"123456"}'
```

## احراز هویت با OTP پیامکی

### جریان کار
1. کاربر شمارهٔ موبایل را وارد می‌کند → `POST /api/auth/otp/request`
2. سرور کد ۶ رقمی می‌سازد، **هش SHA-256** آن را در جدول `otp_codes` ذخیره می‌کند و پیامک می‌فرستد
3. کاربر کد را وارد می‌کند → `POST /api/auth/otp/verify`
4. در صورت صحت، کاربر در `users` ساخته/به‌روزرسانی و یک نشست در `sessions` ثبت می‌شود
5. کوکی `devcast_session` (HttpOnly، SameSite=Lax) ست می‌شود و کاربر به `/account` می‌رود

### قواعد امنیتی پیاده‌شده
- **هش کد OTP** (هیچ‌گاه متن ساده ذخیره نمی‌شود) با ترکیب شماره+کد
- **اعتبار ۲ دقیقه‌ای** کد و **حداکثر ۵ تلاش** برای هر کد
- **محدودیت نرخ**: فاصلهٔ ۶۰ ثانیه برای ارسال مجدد
- **مصرف یک‌بارهٔ کد** (پس از تأیید یا انقضا باطل می‌شود)
- **نشست ۷ روزه** قابل ابطال از جدول `sessions`
- نرمال‌سازی شماره در سمت سرور و سمت کلاینت (پشتیبانی از ارقام فارسی/عربی و +۹۸)

### فعال‌سازی پیامک واقعی
به‌صورت پیش‌فرض روی **حالت دمو (`dev`)** تنظیم است: پیامکی ارسال نمی‌شود و کد در پاسخ API برگردانده می‌شود تا قابل تست باشد.
برای ارسال واقعی، متغیرهای محیطی زیر را تنظیم کنید و سرویس را ری‌استارت کنید:

**کاوه‌نگار (ایران):**
```
SMS_PROVIDER=kavenegar
KAVENEGAR_API_KEY=<کلید API>
KAVENEGAR_SENDER=<شماره فرستنده>          # اختیاری اگر از template استفاده می‌کنید
KAVENEGAR_TEMPLATE=<نام قالب verify>       # اختیاری (پیشنهادی برای سرعت بالاتر)
```

**Twilio (بین‌المللی):**
```
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=<SID>
TWILIO_AUTH_TOKEN=<TOKEN>
TWILIO_FROM=<شماره فرستنده>
```

> برای محیط محلی این متغیرها را در فایل `.dev.vars` بگذارید؛ برای تولید از `wrangler secret put` استفاده کنید:
> `npx wrangler secret put KAVENEGAR_API_KEY`

## معماری داده
- **سرویس ذخیره‌سازی**: Cloudflare **D1** (SQLite توزیع‌شده).
- **مدل داده** (جدول‌های D1):
  - `paths` — مسیرهای یادگیری (+ `image` جلد)
  - `path_skills` — مهارت‌های هر مسیر
  - `path_steps` — مراحل نقشه‌ی راه هر مسیر
  - `courses` — دوره‌ها (+ `cover` جلد، مرتبط با مسیر)
  - `course_lessons` — سرفصل‌های هر دوره
  - `signups` — ایمیل‌های ثبت‌نام‌شده در لندینگ
  - `users` — کاربران (phone یکتا، نام، نقش، تاریخ عضویت)
  - `otp_codes` — کدهای یک‌بارمصرف (هش، تلاش‌ها، انقضا)
  - `sessions` — نشست‌های فعال (توکن، کاربر، انقضا)
- **جریان داده**: درخواست → Hono → `src/data.ts` / `src/auth.ts` → D1 → رندر JSX. در صورت خطای D1، داده‌ی جایگزین (fallback) نمایش داده می‌شود تا صفحه هرگز خراب نشود.

## راهنمای کاربر
1. در صفحهٔ اصلی یکی از مسیرهای یادگیری را انتخاب کنید و نقشهٔ راه را ببینید.
2. از بخش «دوره‌ها» با فیلتر مسیر، دورهٔ مناسب را پیدا کنید و صفحهٔ جزئیات آن را باز کنید.
3. برای ساخت حساب، «ثبت‌نام» را بزنید، نام و شمارهٔ موبایل را وارد کنید و کد ۶ رقمی پیامک‌شده را تأیید کنید.
   - در حالت دمو، کد آزمایشی داخل کادر زردرنگ روی صفحه نمایش داده می‌شود.
4. پس از ورود، در صفحهٔ «حساب من» دوره‌ها و اطلاعات حساب را ببینید.

## ساختار پروژه
```
src/
├── index.tsx              # روت‌ها (صفحات + API) و مدیریت خطا
├── renderer.tsx           # قالب HTML (فونت، Tailwind، آیکون، favicon)
├── data.ts                # لایهٔ دسترسی به D1 + توابع کمکی
├── auth.ts                # OTP، نشست، هش، کوکی
├── sms.ts                 # آداپتر پیامک (dev / کاوه‌نگار / Twilio)
├── types.ts               # تایپ‌های D1Database / Bindings
├── components/
│   ├── icons.tsx          # آیکون‌های SVG
│   ├── art.tsx            # المان‌های گرافیکی (موج، بلاب، نقطه‌چین، پنجره کد)
│   └── layout.tsx         # Nav (با وضعیت ورود)، Footer، Breadcrumbs، PageShell
└── pages/
    ├── home.tsx           # لندینگ اصلی
    ├── paths.tsx          # /paths و /paths/:slug (+ PathCard، CourseCard، 404)
    ├── courses.tsx        # /courses و /courses/:slug
    └── auth.tsx           # /login، /register، /account
migrations/
├── 0001_initial_schema.sql
└── 0002_auth_and_images.sql
seed.sql                       # داده‌های نمونه
seed_media.sql                 # تصاویر جلد مسیرها و دوره‌ها
public/static/
├── app.js                 # دارک‌مود، reveal، شمارنده، منو، فرم‌ها، جریان OTP
├── style.css              # استایل‌های سفارشی
└── tailwind.config.js     # تنظیمات Tailwind CDN
```

## توسعهٔ محلی
```bash
npm run build                       # ساخت پروژه
npm run db:migrate:local            # اجرای مهاجرت‌های D1 (محلی)
npm run db:seed                     # درج داده‌های نمونه
wrangler d1 execute webapp-production --local --file=./seed_media.sql   # تصاویر
pm2 start ecosystem.config.cjs      # اجرای سرویس روی پورت 3000
npm run db:reset                    # بازنشانی کامل پایگاه‌داده محلی
pm2 logs webapp --nostream          # مشاهدهٔ لاگ
```

## استقرار
- **پلتفرم**: Cloudflare Pages + D1
- **وضعیت**: ✅ فعال (پیش‌نمایش sandbox با D1 محلی)
- **پشتهٔ فناوری**: Hono + TypeScript + Cloudflare D1 + Tailwind CSS (CDN)
- **نکتهٔ استقرار تولید**:
  ```bash
  npx wrangler d1 create webapp-production          # شناسه را در wrangler.jsonc جایگزین کنید
  npx wrangler d1 migrations apply webapp-production
  npx wrangler d1 execute webapp-production --file=./seed.sql
  npx wrangler d1 execute webapp-production --file=./seed_media.sql
  npx wrangler secret put KAVENEGAR_API_KEY          # برای پیامک واقعی
  npm run deploy
  ```
- **آخرین به‌روزرسانی**: ۱۴۰۴

## مراحل بعدی پیشنهادی
- ثبت‌نام واقعی کاربر در دوره و پیگیری پیشرفت در صفحهٔ حساب
- جست‌وجو و مرتب‌سازی پیشرفته در دوره‌ها
- صفحهٔ پروفایل مدرس و نظرات دوره‌ها
- خروج از همهٔ نشست‌ها و ورود دو مرحله‌ای برای عملیات حساس
- اتصال ایمیل تراکنشی (Resend/SendGrid) برای خوش‌آمدگویی


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
