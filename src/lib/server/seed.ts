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

export function seedIfEmpty(d: DatabaseSync) {
  const set = d.prepare("INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)");
  set.run("site", JSON.stringify(defaultSite));
  set.run("notify", JSON.stringify(defaultNotify));

  const ins = d.prepare("INSERT OR IGNORE INTO pages(slug,title,seo_title,seo_desc,blocks) VALUES(?,?,?,?,?)");
  for (const p of pagesSeed) ins.run(p.slug, p.title, p.seoTitle, p.seoDesc, JSON.stringify(p.blocks));
  // static informational pages the CMS can also hold
  d.prepare("INSERT OR IGNORE INTO home(id,content) VALUES(1,?)").run(JSON.stringify(homeDefaults));
}
