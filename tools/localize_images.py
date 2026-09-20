#!/usr/bin/env python3
"""
محلی‌سازی تصاویر پروژهٔ دِوکَست.

CDN فعلی هدر «content-security-policy: img-src data:» می‌فرستد و مرورگر
تصاویر را در صفحه بلاک می‌کند (ERR_BLOCKED_BY_ORB). این اسکریپت همهٔ
تصاویر را دانلود، به JPEG تبدیل و در public/static/img ذخیره می‌کند.
"""
import os
import hashlib
import urllib.request
from io import BytesIO
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = os.path.join(ROOT, "public", "static", "img")

# نام فایل -> (URL منبع، عرض نهایی)
IMAGES = {
    # مسیرها
    "path-frontend.jpg": ("https://sspark.genspark.ai/i/APTdWqKEvkBoPqQ3?width=1600", 1600),
    "path-backend.jpg": ("https://sspark.genspark.ai/i/F2XExF57U86x6ovV?width=1600", 1600),
    "path-ai-data.jpg": ("https://sspark.genspark.ai/i/tilRcz5RK0A2Y1Gi?width=1600", 1600),
    "path-mobile.jpg": ("https://sspark.genspark.ai/i/wVNifJq3WEOvV9za?width=1600", 1600),
    # دوره‌ها
    "course-js-modern.jpg": ("https://sspark.genspark.ai/i/zkFPgonnkDVNFyi5?width=1200", 1200),
    "course-react-pro.jpg": ("https://sspark.genspark.ai/i/APTdWqKEvkBoPqQ3?width=1200", 1200),
    # تصویر قبلی ۴۰۳ می‌داد؛ جانشین تأییدشده:
    "course-node-api.jpg": ("https://sspark.genspark.ai/i/n9nhubuHOVgxTRZU?width=1200", 1200),
    "course-python-data.jpg": ("https://sspark.genspark.ai/i/aDXhrbyl7pHf8W7X?width=1200", 1200),
    "course-ml-basics.jpg": ("https://sspark.genspark.ai/i/yOd768NxKMESCi4f?width=1200", 1200),
    "course-react-native-app.jpg": ("https://sspark.genspark.ai/i/QyUbx3mIXXpgC0K9?width=1200", 1200),
    # آواتار مدرسان
    "instructor-sara-mohammadi.jpg": ("https://sspark.genspark.ai/i/QrQQ7HZ4QLIeEdjC?width=800", 800),
    "instructor-amir-rezaei.jpg": ("https://sspark.genspark.ai/i/fywV9PSiKXRhS9z8?width=800", 800),
    "instructor-negar-karimi.jpg": ("https://sspark.genspark.ai/i/oIst5TrJHNok25Dd?width=800", 800),
    "instructor-hossein-tabrizi.jpg": ("https://sspark.genspark.ai/i/w6Edj1d156S6EnIN?width=800", 800),
}

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"


def download(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*,*/*"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()


def main():
    os.makedirs(DEST, exist_ok=True)
    ok = fail = 0
    for name, (url, width) in IMAGES.items():
        out = os.path.join(DEST, name)
        try:
            raw = download(url)
            im = Image.open(BytesIO(raw))
            im = im.convert("RGB")
            if im.width > width:
                h = round(im.height * width / im.width)
                im = im.resize((width, h), Image.LANCZOS)
            im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
            kb = os.path.getsize(out) // 1024
            print("  ✓ %-34s %4dx%-5d %4d KB" % (name, im.width, im.height, kb))
            ok += 1
        except Exception as e:
            print("  ✗ %-34s %s" % (name, type(e).__name__ + ': ' + str(e)[:60]))
            fail += 1
    print("\n✔ %d تصویر محلی شد، %d ناموفق" % (ok, fail))
    if fail:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
