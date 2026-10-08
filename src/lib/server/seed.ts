import type { DatabaseSync } from "node:sqlite";
import { pagesSeed } from "@/data/pages-seed";
import { homeDefaults } from "@/data/home-defaults";
import type { NotifySettings, SiteSettings } from "@/lib/types";

export const defaultSite: SiteSettings = {
  name: "میکروشمیم",
  tagline: "میکروکارخانه نوآوری و صنایع خالق شمیم",
  phone: "",
  email: "",
  address: "",
  hours: "",
  mapUrl: "",
  socials: { instagram: "", telegram: "", linkedin: "", aparat: "", whatsapp: "" },
  copyright: "تمام حقوق برای میکروشمیم محفوظ است.",
  footerAbout: "میکروکارخانه نوآوری و صنایع خالق شمیم؛ فضایی برای دختران و زنان جوان که می‌خواهند یاد بگیرند، بسازند و رشد کنند.",
  seo: {
    title: "میکروشمیم؛ جایی برای یادگرفتن، ساختن و شروع کردن",
    description: "میکروکارخانه نوآوری و صنایع خالق شمیم؛ فضایی برای دختران و زنان جوان با مدرسه مهارت، فضای کار اشتراکی، استودیو تولید محتوا و رویدادهای تخصصی.",
    ogImage: "",
  },
  nav: [
    { label: "خانه", href: "/" },
    { label: "درباره شمیم", href: "/about" },
    { label: "فضاها و امکانات", href: "/spaces" },
    { label: "مدرسه مهارت", href: "/school" },
    { label: "رویدادها", href: "/events" },
    { label: "استودیو محتوا", href: "/studio" },
    { label: "فضای کار اشتراکی", href: "/cowork" },
    { label: "مجله شمیم", href: "/blog" },
    { label: "تماس با ما", href: "/contact" },
  ],
  headerCta: { label: "درخواست استفاده از فضای شمیم", href: "/request/visit" },
  footerLinks: [
    { label: "خانه", href: "/" },
    { label: "درباره شمیم", href: "/about" },
    { label: "فضاها و امکانات", href: "/spaces" },
    { label: "مدرسه مهارت", href: "/school" },
    { label: "رویدادها", href: "/events" },
  ],
};

export const defaultNotify: NotifySettings = {
  email: "",
  webhook: "",
  smtp: { host: "", port: 587, secure: false, user: "", pass: "", from: "" },
};

export const modelGallery = {
  type: "gallery" as const,
  eyebrow: "ماکت میکروشمیم",
  title: "میکروشمیم را از نزدیک ببین",
  intro: "ماکتی از فضای میکروشمیم؛ پلان، ستون‌ها، اتاق‌ها و محوطه‌ای که قرار است یادگیری، کار و ایده‌ها در آن کنار هم قرار بگیرند.",
  items: [
    ["m01", "نمای بالای پلان"], ["m02", "ستون‌ها و فضای باز"], ["m03", "فضای مرکزی"], ["m04", "ستون‌ها و چادر"],
    ["m05", "چادر و محوطه‌ی بیرونی"], ["m09", "چادر، درخت و آتشگاه"], ["m06", "اتاق‌ها و دیوارها"], ["m07", "گوشه‌ی نشستن و گفت‌وگو"],
    ["m08", "جزئیات ماکت"], ["m10", "ماکت روی میز کار"], ["m11", "نمای کلی ماکت در حال ساخت"], ["m12", "میز و صندلی‌های محوطه"],
    ["m13", "ستون‌ها و محوطه"], ["m14", "جزئیات و تجهیزات"], ["m15", "اتاق‌ها از نزدیک"], ["m16", "پلان در مرحله‌ی ساخت"],
    ["m17", "تخت سلطنتی؛ یک جزئیات کوچک"], ["m18", "تخت و تجهیزات"], ["m19", "نمای نزدیک جزئیات"],
  ].map(([k, c]) => ({ image: `asset:model/${k}`, caption: c })),
};

/** Idempotent content migrations for databases created by older versions. */
function migrate(d: DatabaseSync) {
  // run once only, so a gallery the admin later deletes does not come back
  if (d.prepare("SELECT 1 FROM settings WHERE key='mig:model-gallery'").get()) return;
  d.prepare("INSERT INTO settings(key,value) VALUES('mig:model-gallery','true')").run();
  const row = d.prepare("SELECT blocks FROM pages WHERE slug='spaces'").get() as { blocks: string } | undefined;
  if (!row) return;
  const blocks = JSON.parse(row.blocks) as { type: string }[];
  if (blocks.some((b) => b.type === "gallery")) return;
  blocks.splice(1, 0, modelGallery);
  d.prepare("UPDATE pages SET blocks=? WHERE slug='spaces'").run(JSON.stringify(blocks));
}

export function seedIfEmpty(d: DatabaseSync) {
  const set = d.prepare("INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)");
  set.run("site", JSON.stringify(defaultSite));
  set.run("notify", JSON.stringify(defaultNotify));

  const ins = d.prepare("INSERT OR IGNORE INTO pages(slug,title,seo_title,seo_desc,blocks) VALUES(?,?,?,?,?)");
  for (const p of pagesSeed) ins.run(p.slug, p.title, p.seoTitle, p.seoDesc, JSON.stringify(p.blocks));
  // static informational pages the CMS can also hold
  d.prepare("INSERT OR IGNORE INTO home(id,content) VALUES(1,?)").run(JSON.stringify(homeDefaults));
  migrate(d);
}
