#!/usr/bin/env python3
"""
ساخت نسخهٔ استاتیک (HTML/CSS خالص + Tailwind) از پروژهٔ Hono.

هر صفحهٔ رندرشده از سرور محلی گرفته می‌شود، همهٔ لینک‌های داخلی
به مسیرهای نسبی تبدیل می‌شوند تا سایت بدون سرور و بدون فریم‌ورک کار کند.
"""
import os
import re
import subprocess
import urllib.request

BASE = "http://localhost:3000"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # /home/user/webapp
OUT = os.path.join(ROOT, "static-html")

CDN_SCRIPT = '<script src="https://cdn.tailwindcss.com"></script>'
CFG_SCRIPT = '<script src="/static/tailwind.config.js"></script>'

# (آدرس روی سرور، مسیر خروجی نسبت به OUT)
PAGES = [
    ("/", "index.html"),
    ("/paths", "paths/index.html"),
    ("/paths/frontend", "paths/frontend/index.html"),
    ("/paths/backend", "paths/backend/index.html"),
    ("/paths/ai-data", "paths/ai-data/index.html"),
    ("/paths/mobile", "paths/mobile/index.html"),
    ("/courses", "courses/index.html"),
    ("/courses/js-modern", "courses/js-modern/index.html"),
    ("/courses/react-pro", "courses/react-pro/index.html"),
    ("/courses/node-api", "courses/node-api/index.html"),
    ("/courses/python-data", "courses/python-data/index.html"),
    ("/courses/ml-basics", "courses/ml-basics/index.html"),
    ("/courses/react-native-app", "courses/react-native-app/index.html"),
    ("/instructors/sara-mohammadi", "instructors/sara-mohammadi/index.html"),
    ("/instructors/amir-rezaei", "instructors/amir-rezaei/index.html"),
    ("/instructors/negar-karimi", "instructors/negar-karimi/index.html"),
    ("/instructors/hossein-tabrizi", "instructors/hossein-tabrizi/index.html"),
    ("/login", "login/index.html"),
    ("/register", "register/index.html"),
]

ASSETS = ["app.js", "style.css"]   # tailwind.config.js لازم نیست (CDN حذف شد)
ASSET_DIRS = ["img"]


def fetch(url):
    req = urllib.request.Request(BASE + url, headers={"User-Agent": "static-builder"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8")


def make_resolver(prefix):
    def resolve(url):
        if url.startswith("/static/"):
            return prefix + url[len("/"):]
        if url.startswith("/api/"):
            return "#"          # بدون سرور: لینک غیرفعال می‌شود
        if url == "/":
            return prefix + "index.html"
        if url.startswith("/#"):
            return prefix + "index.html" + url[1:]
        if url.startswith("#"):
            return url
        if url.startswith("http") or url.startswith("mailto:") or url.startswith("data:"):
            return url
        return prefix + url.strip("/") + "/index.html"
    return resolve


def rewrite(html, prefix):
    """هر خصیصه‌ای که مقدارش با «/» شروع شود بازنویسی می‌شود.

    شامل href/src/action و همچنین poster و data-video-poster که
    مسیر تصویر محلی دارند (در غیر این صورت در صفحات تودرتو می‌شکنند).
    مقادیر http/https/data:/# دست‌نخورده می‌مانند.
    """
    resolve = make_resolver(prefix)
    pattern = re.compile(r'([\w-]+)="(/[^"]*)"')

    def repl(m):
        attr, url = m.group(1), m.group(2)
        return '%s="%s"' % (attr, resolve(url))

    return pattern.sub(repl, html)


def main():
    os.makedirs(OUT, exist_ok=True)

    # دارایی‌های استاتیک
    src_static = os.path.join(os.path.dirname(OUT), "public", "static")
    dst_static = os.path.join(OUT, "static")
    os.makedirs(dst_static, exist_ok=True)
    for name in ASSETS:
        with open(os.path.join(src_static, name), "rb") as f:
            data = f.read()
        with open(os.path.join(dst_static, name), "wb") as f:
            f.write(data)
        print("  + static/" + name)

    # پوشه‌های دارایی (تصاویر محلی)
    for d in ASSET_DIRS:
        src_dir = os.path.join(src_static, d)
        if not os.path.isdir(src_dir):
            continue
        dst_dir = os.path.join(dst_static, d)
        os.makedirs(dst_dir, exist_ok=True)
        n = 0
        for fname in sorted(os.listdir(src_dir)):
            with open(os.path.join(src_dir, fname), "rb") as f:
                data = f.read()
            with open(os.path.join(dst_dir, fname), "wb") as f:
                f.write(data)
            n += 1
        print("  + static/%s/ (%d فایل)" % (d, n))

    for url, out_rel in PAGES:
        html = fetch(url)
        depth = out_rel.count("/")            # تعداد پوشه‌های تودرتو
        prefix = "../" * depth
        html = rewrite(html, prefix)

        # Tailwind را از CDN حذف می‌کنیم و به CSS کامپایل‌شده وصل می‌شویم
        html = html.replace(CDN_SCRIPT, "")
        html = re.sub(r'<script[^>]*tailwind\.config\.js[^>]*></script>', "", html)

        # نشانه‌گذاری نسخهٔ استاتیک + لینک CSS کامپایل‌شده
        html = html.replace(
            "</head>",
            '<meta name="devcast-build" content="static" />\n'
            '<link href="' + prefix + 'static/tailwind.css" rel="stylesheet" />\n'
            "</head>",
            1,
        )
        out_path = os.path.join(OUT, out_rel)
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        print("  ✓ %-42s -> %s (prefix=%r)" % (url, out_rel, prefix))

    # کامپایل Tailwind فقط از کلاس‌های موجود در HTML تولیدشده
    print("\n  ... کامپایل Tailwind")
    result = subprocess.run(
        [
            "npx", "--no-install", "tailwindcss",
            "-c", os.path.join(ROOT, "tools", "tw", "tailwind.config.cjs"),
            "-i", os.path.join(ROOT, "tools", "tw", "input.css"),
            "-o", os.path.join(OUT, "static", "tailwind.css"),
            "--minify",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(result.stdout[-1500:])
        print(result.stderr[-1500:])
        raise SystemExit("کامپایل Tailwind ناموفق بود")
    kb = os.path.getsize(os.path.join(OUT, "static", "tailwind.css")) // 1024
    print("  + static/tailwind.css (%d KB — کامپایل‌شده، بدون CDN)" % kb)

    print("\n✔ %d صفحه ساخته شد." % len(PAGES))


if __name__ == "__main__":
    main()
