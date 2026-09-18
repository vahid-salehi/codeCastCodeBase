/* ==========================================================================
   دِوکَست — اسکریپت‌های صفحه
   ========================================================================== */
(function () {
  'use strict'

  /* ---------- ۱. حالت روشن/تاریک ---------- */
  const root = document.documentElement
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (stored === 'dark' || (!stored && prefersDark)) {
    root.classList.add('dark')
  }

  const toggle = document.getElementById('theme-toggle')
  if (toggle) {
    toggle.addEventListener('click', function () {
      const isDark = root.classList.toggle('dark')
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    })
  }

  /* ---------- ۲. منوی موبایل ---------- */
  const menuToggle = document.getElementById('menu-toggle')
  const mobileMenu = document.getElementById('mobile-menu')
  if (menuToggle && mobileMenu) {
    const close = () => {
      mobileMenu.classList.add('hidden')
      mobileMenu.classList.remove('flex')
      menuToggle.setAttribute('aria-expanded', 'false')
    }
    menuToggle.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('hidden')
      mobileMenu.classList.toggle('flex', !open)
      menuToggle.setAttribute('aria-expanded', String(!open))
    })
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close))
  }

  /* ---------- ۳. ظاهر شدن با اسکرول ---------- */
  const reveals = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    reveals.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms'
      io.observe(el)
    })
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'))
  }

  /* ---------- ۴. شمارنده‌های آماری ---------- */
  const faNum = (n) => Number(n).toLocaleString('fa-IR')

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count || '0', 10)
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = faNum(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
      else el.textContent = faNum(target)
    }
    requestAnimationFrame(tick)
  }

  const counters = document.querySelectorAll('[data-count]')
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target)
            co.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    counters.forEach((el) => co.observe(el))
  } else {
    counters.forEach((el) => (el.textContent = faNum(el.dataset.count)))
  }

  /* ---------- ۵. فرم ثبت‌نام (متصل به /api/signup) ---------- */
  const form = document.getElementById('signup-form')
  const msg = document.getElementById('form-msg')
  if (form && msg) {
    const setMsg = (text, tone) => {
      msg.textContent = text
      msg.className =
        'mt-3 min-h-[1.25rem] text-xs font-medium ' + (tone === 'error' ? 'text-red-400' : 'text-emerald-400')
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault()
      const input = document.getElementById('email')
      const button = form.querySelector('button[type="submit"]')
      const value = input ? input.value.trim() : ''
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

      if (!valid) {
        setMsg('لطفاً یک ایمیل معتبر وارد کن.', 'error')
        return
      }

      setMsg('در حال ثبت…', 'success')
      if (button) button.disabled = true

      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value, source: 'landing' }),
        })
        const data = await res.json()

        if (!res.ok || !data.ok) {
          if (data.error === 'invalid_email') setMsg('ایمیل وارد‌شده معتبر نیست.', 'error')
          else setMsg('ثبت انجام نشد. لطفاً کمی بعد دوباره تلاش کن.', 'error')
          return
        }

        setMsg(
          data.duplicate
            ? 'این ایمیل قبلاً ثبت شده بود؛ لینک شروع برایت ارسال می‌شود. ✅'
            : 'ثبت شد! لینک شروع به ایمیلت ارسال می‌شود. ✅',
          'success'
        )

        const counter = document.querySelector('[data-signup-count]')
        if (counter && typeof data.total === 'number') {
          counter.textContent = Number(12480 + data.total).toLocaleString('fa-IR')
        }

        form.reset()
      } catch (err) {
        setMsg('ارتباط با سرور برقرار نشد. اتصال اینترنتت را بررسی کن.', 'error')
      } finally {
        if (button) button.disabled = false
      }
    })
  }

  /* ---------- ۶. سال جاری در فوتر ---------- */
  const year = document.getElementById('year')
  if (year) year.textContent = new Date().getFullYear()
})()
