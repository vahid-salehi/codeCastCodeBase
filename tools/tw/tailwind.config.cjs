/**
 * تنظیمات کامپایل Tailwind برای نسخهٔ استاتیک (HTML/CSS خالص).
 * مسیرها با __dirname تعیین می‌شوند تا از هر پوشه‌ای قابل اجرا باشد.
 */
const path = require('path')

module.exports = {
  darkMode: 'class',
  content: [
    path.join(__dirname, '../../static-html/**/*.html'),
    // کلاس‌هایی که با جاوااسکریپت اضافه می‌شوند (پیام‌های فرم) اینجا پیدا می‌شوند
    path.join(__dirname, '../../static-html/static/app.js'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0f',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
