/* ==========================================================================
   دِوکَست — اسکریپت‌های صفحه
   ========================================================================== */
(function () {
  'use strict'

  /* نسخهٔ استاتیک (بدون سرور)؟ با متاتگ در build استاتیک علامت می‌خورد */
  const STATIC_MODE =
    (document.querySelector('meta[name="devcast-build"]') || {}).content === 'static'
  const STATIC_MSG =
    'این نسخهٔ استاتیک (HTML/CSS) است و به سرور متصل نیست. برای فعال شدن این فرم، نسخهٔ Hono را اجرا کنید.'

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

      if (STATIC_MODE) {
        setMsg(STATIC_MSG, 'error')
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

  /* ---------- ۷. جریان ورود/ثبت‌نام با OTP ---------- */
  const requestForm = document.getElementById('otp-request-form')
  const verifyForm = document.getElementById('otp-verify-form')

  if (requestForm && verifyForm) {
    const msgRequest = document.getElementById('otp-request-msg')
    const msgVerify = document.getElementById('otp-verify-msg')
    const phoneDisplay = document.getElementById('otp-phone-display')
    const codeInput = document.getElementById('otp-code')
    const resendBtn = document.getElementById('otp-resend')
    const resendSeconds = document.getElementById('otp-resend-seconds')
    const countdownEl = document.getElementById('otp-countdown')
    const editPhoneBtn = document.getElementById('otp-edit-phone')
    const backBtn = document.getElementById('otp-back')
    const devBox = document.getElementById('dev-otp-box')
    const devCode = document.getElementById('dev-otp-code')

    const purpose = requestForm.dataset.purpose || 'login'
    const nextUrl = (requestForm.querySelector('[name="next"]') || {}).value || '/'
    const nameInput = document.getElementById('name')

    let currentPhone = ''
    let otpTimer = null
    let resendTimer = null

    const setMsg = (el, text, tone) => {
      if (!el) return
      el.textContent = text
      el.className = 'min-h-[1.25rem] text-xs font-medium ' + (tone === 'error' ? 'text-red-500' : tone === 'success' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400')
    }

    const faDigits = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])

    const normalizePhone = (raw) => {
      let s = String(raw || '').replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      s = s.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      s = s.replace(/[\s\-()]/g, '')
      if (/^09\d{9}$/.test(s)) return s
      if (/^\+989\d{9}$/.test(s)) return '0' + s.slice(3)
      if (/^00989\d{9}$/.test(s)) return '0' + s.slice(4)
      if (/^989\d{9}$/.test(s)) return '0' + s.slice(2)
      return null
    }

    const stopTimers = () => {
      clearInterval(otpTimer)
      clearInterval(resendTimer)
    }

    const startCountdown = (seconds) => {
      let left = seconds
      const render = () => {
        const m = String(Math.floor(left / 60)).padStart(2, '0')
        const s = String(left % 60).padStart(2, '0')
        if (countdownEl) countdownEl.textContent = faDigits(m + ':' + s)
      }
      render()
      clearInterval(otpTimer)
      otpTimer = setInterval(() => {
        left -= 1
        if (left <= 0) {
          clearInterval(otpTimer)
          if (countdownEl) countdownEl.textContent = '۰۰:۰۰'
          if (resendBtn) resendBtn.disabled = false
          return
        }
        render()
      }, 1000)
    }

    const startResendCooldown = (seconds) => {
      let left = seconds
      const render = () => {
        if (resendSeconds) resendSeconds.textContent = faDigits(left)
      }
      render()
      if (resendBtn) resendBtn.disabled = true
      clearInterval(resendTimer)
      resendTimer = setInterval(() => {
        left -= 1
        if (left <= 0) {
          clearInterval(resendTimer)
          if (resendBtn) {
            resendBtn.disabled = false
            resendBtn.innerHTML = 'ارسال مجدد'
          }
          return
        }
        render()
      }, 1000)
    }

    const goToVerify = (phone) => {
      currentPhone = phone
      if (phoneDisplay) phoneDisplay.textContent = phone
      requestForm.classList.add('hidden')
      verifyForm.classList.remove('hidden')
      if (codeInput) {
        codeInput.value = ''
        codeInput.focus()
      }
      setMsg(msgVerify, '', 'info')
    }

    const goToRequest = () => {
      stopTimers()
      verifyForm.classList.add('hidden')
      requestForm.classList.remove('hidden')
      if (devBox) devBox.classList.add('hidden')
      setMsg(msgVerify, '', 'info')
    }

    /* --- درخواست کد --- */
    const requestOtp = async (isResend) => {
      const phoneRaw = currentPhone || (document.getElementById('phone') || {}).value || ''
      const phone = normalizePhone(phoneRaw)

      if (!phone) {
        setMsg(msgRequest, 'شمارهٔ موبایل معتبر نیست. نمونه: ۰۹۱۲۳۴۵۶۷۸۹', 'error')
        return
      }

      if (STATIC_MODE) {
        setMsg(msgRequest, STATIC_MSG, 'error')
        return
      }

      const btn = requestForm.querySelector('button[type="submit"]')
      if (btn) btn.disabled = true
      setMsg(msgRequest, 'در حال ارسال کد…', 'info')

      try {
        const res = await fetch('/api/auth/otp/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone,
            purpose,
            name: nameInput && nameInput.value.trim() ? nameInput.value.trim() : undefined,
          }),
        })
        const data = await res.json()

        if (!res.ok || !data.ok) {
          if (data.error === 'rate_limited') {
            setMsg(msgRequest, 'کد قبلی هنوز معتبر است. کمی بعد دوباره تلاش کن.', 'error')
          } else if (data.error === 'invalid_phone') {
            setMsg(msgRequest, 'شمارهٔ موبایل معتبر نیست.', 'error')
          } else {
            setMsg(msgRequest, 'ارسال کد با خطا مواجه شد. لطفاً دوباره تلاش کن.', 'error')
          }
          return
        }

        goToVerify(phone)
        startCountdown(data.expiresInSec || 120)
        startResendCooldown(data.retryAfterSec || 60)

        if (data.devMode && data.devCode) {
          if (devBox) devBox.classList.remove('hidden')
          if (devCode) devCode.textContent = data.devCode
        } else if (devBox) {
          devBox.classList.add('hidden')
        }

        setMsg(msgVerify, isResend ? 'کد جدید ارسال شد.' : 'کد ورود برایت پیامک شد.', 'success')
      } catch (err) {
        setMsg(msgRequest, 'ارتباط با سرور برقرار نشد.', 'error')
      } finally {
        if (btn) btn.disabled = false
      }
    }

    requestForm.addEventListener('submit', (e) => {
      e.preventDefault()
      requestOtp(false)
    })

    if (resendBtn) {
      resendBtn.addEventListener('click', () => {
        requestOtp(true)
      })
    }

    if (editPhoneBtn) editPhoneBtn.addEventListener('click', goToRequest)
    if (backBtn) backBtn.addEventListener('click', goToRequest)

    /* فقط ارقام در ورودی کد */
    if (codeInput) {
      codeInput.addEventListener('input', () => {
        codeInput.value = codeInput.value.replace(/\D/g, '').slice(0, 6)
        if (codeInput.value.length === 6) {
          verifyForm.requestSubmit()
        }
      })
    }

    /* --- تأیید کد --- */
    verifyForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const code = (codeInput ? codeInput.value : '').replace(/\D/g, '')

      if (code.length !== 6) {
        setMsg(msgVerify, 'کد ۶ رقمی را کامل وارد کن.', 'error')
        return
      }

      if (STATIC_MODE) {
        setMsg(msgVerify, STATIC_MSG, 'error')
        return
      }

      const btn = verifyForm.querySelector('button[type="submit"]')
      if (btn) btn.disabled = true
      setMsg(msgVerify, 'در حال بررسی…', 'info')

      try {
        const res = await fetch('/api/auth/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: currentPhone,
            code,
            name: nameInput && nameInput.value.trim() ? nameInput.value.trim() : undefined,
          }),
        })
        const data = await res.json()

        if (!res.ok || !data.ok) {
          const messages = {
            invalid: 'کد وارد‌شده اشتباه است.',
            expired: 'کد منقضی شده؛ دوباره درخواست کن.',
            too_many_attempts: 'تلاش‌های زیاد. کد جدید بگیر.',
            not_found: 'کد فعالی پیدا نشد. دوباره ارسال کن.',
          }
          setMsg(msgVerify, messages[data.error] || 'تأیید انجام نشد.', 'error')
          return
        }

        setMsg(msgVerify, 'ورود موفق! در حال انتقال…', 'success')
        stopTimers()
        window.location.href = data.redirectTo || nextUrl || '/'
      } catch (err) {
        setMsg(msgVerify, 'ارتباط با سرور برقرار نشد.', 'error')
      } finally {
        if (btn) btn.disabled = false
      }
    })
  }
  /* ---------- ۸. پخش‌کنندهٔ ویدیو ---------- */
  const activateVideo = (figure, src) => {
    const el = figure.querySelector('.video-el')
    const poster = figure.querySelector('.video-poster')
    if (!el) return

    if (!el.getAttribute('src')) el.setAttribute('src', src)
    el.classList.remove('hidden')
    if (poster) poster.classList.add('hidden')

    const play = el.play()
    if (play && typeof play.catch === 'function') play.catch(() => {})
  }

  document.querySelectorAll('.video-poster').forEach((poster) => {
    const figure = poster.closest('figure')
    const src = poster.dataset.videoSrc
    if (!figure || !src) return

    const open = () => activateVideo(figure, src)
    poster.addEventListener('click', open)
    poster.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    })
  })

  /* ---------- ۹. پخش درون‌خطی جلسات (مودال) ---------- */
  const modal = document.getElementById('lesson-modal')
  if (modal) {
    const modalVideo = modal.querySelector('video')
    const modalTitle = modal.querySelector('[data-modal-title]')

    const closeModal = () => {
      modal.classList.add('hidden')
      modal.classList.remove('flex')
      if (modalVideo) {
        modalVideo.pause()
        modalVideo.removeAttribute('src')
        modalVideo.load()
      }
      document.body.style.overflow = ''
    }

    const openModal = (src, title, poster) => {
      if (!modalVideo) return
      if (modalTitle) modalTitle.textContent = title || 'پیش‌نمایش جلسه'
      if (poster) modalVideo.setAttribute('poster', poster)
      modalVideo.setAttribute('src', src)
      modal.classList.remove('hidden')
      modal.classList.add('flex')
      document.body.style.overflow = 'hidden'
      const play = modalVideo.play()
      if (play && typeof play.catch === 'function') play.catch(() => {})
    }

    document.querySelectorAll('.video-inline-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        openModal(btn.dataset.videoSrc, btn.dataset.lessonTitle, btn.dataset.videoPoster)
      })
    })

    modal.querySelectorAll('[data-modal-close]').forEach((el) => el.addEventListener('click', closeModal))
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal()
    })
  }
})()
