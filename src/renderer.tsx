import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ?? 'دِوکَست | آکادمی برنامه‌نویسی'}</title>
        <meta
          name="description"
          content="دِوکَست — مسیرهای یادگیری پروژه‌محور برنامه‌نویسی. از صفر تا استخدام، با منتورینگ فارسی."
        />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%236366f1'/%3E%3Cpath d='M20 11l5 5-5 5M12 21l-5-5 5-5' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E"
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Tailwind */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/static/tailwind.config.js"></script>

        {/* Icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css"
          rel="stylesheet"
        />

        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-white text-slate-800 antialiased selection:bg-indigo-500/20 dark:bg-[#0a0a0f] dark:text-slate-200">
        {children}
      </body>
    </html>
  )
})
