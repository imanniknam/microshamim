# میکروشمیم — وب‌سایت + پنل مدیریت

## اجرا
```bash
npm install
npm run dev            # توسعه  → http://localhost:3000
npm run build && npm start   # پروداکشن
```
- پنل مدیریت: `/admin` — در اولین ورود، «اولین اجرا؟ ساخت مدیر اصلی» را باز کن و مدیر را بساز.
- داده‌ها (SQLite، آپلودها، کلید نشست) در پوشه‌ی `data/` ذخیره می‌شوند. روی سرور حتماً این پوشه را پایدار نگه دار (یا `DATA_DIR=/path` بگذار) و از آن بکاپ بگیر.
- متغیرها: `SITE_URL` (آدرس اصلی سایت برای OG)، `ADMIN_SECRET` (اختیاری؛ کلید امضای نشست)، `DATA_DIR`.
- پشت HTTP ساده (بدون SSL) برای تست پروداکشن: `INSECURE_COOKIES=1`.
- نیازمند Node.js 22+ (از `node:sqlite` استفاده می‌شود).

## ساختار
- `src/app/(site)` صفحات عمومی؛ `src/app/admin` پنل مدیریت؛ `src/app/api` فرم‌ها و خبرنامه.
- `src/data/pages-seed.ts` متن صفحات از PDFهای `docs/` (بعد از اولین اجرا از پنل ویرایش می‌شود).
- `src/lib/forms.ts` تعریف فیلدهای فرم‌ها. `src/lib/animations/` انیمیشن‌های GSAP.
- `scripts/` پایپ‌لاین تصاویر (README داخل پوشه).
