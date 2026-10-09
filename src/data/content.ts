import type { IconName } from "@/components/ui/Icon";

/** All visible copy comes from the MicroShamim brief PDFs (docs/). */


export const quickNav: { label: string; icon: IconName; href: string; blob: string }[] = [
  { label: "مدرسه مهارت", icon: "cap", href: "/school", blob: "stickers/blob-pink" },
  { label: "فضاها و امکانات", icon: "building", href: "/spaces", blob: "stickers/blob-lavender" },
  { label: "استودیو محتوا", icon: "camera", href: "/studio", blob: "stickers/blob-green" },
  { label: "رویدادها", icon: "calendar", href: "/events", blob: "stickers/watercolor-lavender" },
  { label: "فضای کار اشتراکی", icon: "laptop", href: "/cowork", blob: "stickers/blob-yellow" },
];

export const experiences = [
  { id: "learn", title: "یاد بگیر", icon: "cap" as IconName, text: "مهارت‌هایی را یاد بگیر که در دنیای واقعی به کار می‌آیند؛ از تولید محتوا و بازاریابی دیجیتال تا سئو، طراحی، هوش مصنوعی و مهارت‌های حرفه‌ای.", cta: "مشاهده مدرسه مهارت", href: "/school", photo: "photos/p1-dream", pos: "50% 30%", tint: "var(--color-tint-pink)", accent: "#B0238F", r: -1.6, y: 22 },
  { id: "work", title: "کار کن", icon: "laptop" as IconName, text: "در یک فضای حرفه‌ای، پویا و زنانه کار کن؛ تنها یا در کنار تیمی که برای رشد و ساختن آمده است.", cta: "درخواست فضای کار اشتراکی", href: "/request/cowork", photo: "photos/p2-cowork", pos: "50% 45%", tint: "var(--color-tint-lime)", accent: "#10162F", r: 1.1, y: 0 },
  { id: "build", title: "بساز", icon: "bulb" as IconName, text: "ایده‌ات را از مرحله فکر به پروژه واقعی برسان و با تجربه عملی، مسیر حرفه‌ای خودت را پیدا کن.", cta: "ببین چطور", href: "/school", photo: "model/m11", pos: "50% 60%", tint: "var(--color-tint-peach)", accent: "#C2410C", r: -0.8, y: 34 },
  { id: "create", title: "تولید کن", icon: "video" as IconName, text: "از استودیو تخصصی میکروشمیم برای تولید ویدئو، پادکست، عکس و سایر محتوای حرفه‌ای استفاده کن.", cta: "رزرو استودیو", href: "/request/studio", photo: "photos/p4-podcast", pos: "55% 35%", tint: "var(--color-tint-lilac)", accent: "#4B1FB0", r: 1.4, y: 6 },
  { id: "network", title: "شبکه بساز", icon: "network" as IconName, text: "میکروشمیم فقط یک ساختمان نیست؛ یک پاتوق برای ارتباط، گفت‌وگو، یادگیری و همکاری میان دختران، زنان و متخصصان.", cta: "مشاهده فضاها", href: "/spaces", photo: "model/m07", pos: "50% 55%", tint: "var(--color-tint-sky)", accent: "#0B5C99", r: -1.2, y: 28 },
  { id: "shine", title: "دیده شو", icon: "star" as IconName, text: "در رویدادها، نشست‌ها و برنامه‌های میکروشمیم شرکت کن، دستاوردت را ارائه بده و خودت را به فرصت‌های تازه وصل کن.", cta: "مشاهده رویدادها", href: "/events", photo: "photos/p7-event", pos: "50% 55%", tint: "var(--color-tint-mint)", accent: "#10162F", r: 1.8, y: 0 },
];

export const learnSteps: { title: string; text: string; icon: IconName; color: string }[] = [
  { title: "کلاس", text: "مفهوم و ابزار را از مربی‌ها یاد می‌گیری", icon: "cap", color: "var(--color-lavender)" },
  { title: "چالش", text: "یک مسئله واقعی جلوی تو گذاشته می‌شود", icon: "puzzle", color: "var(--color-yellow)" },
  { title: "پروژه", text: "با تیمت چیزی می‌سازی که قابل نشان‌دادن است", icon: "laptop", color: "var(--color-green)" },
  { title: "تجربه واقعی", text: "مهارت از کلاس بیرون می‌آید و وارد کار می‌شود", icon: "briefcase", color: "var(--color-coral)" },
  { title: "ارائه", text: "کارت را جلوی آدم‌های واقعی ارائه می‌دهی", icon: "megaphone", color: "var(--color-lavender)" },
  { title: "بازخورد", text: "می‌شنوی، بهتر می‌شوی و دوباره می‌سازی", icon: "chat", color: "var(--color-yellow)" },
];

export const spaces = [
  { title: "مدرسه مهارت", text: "آموزش تجربی، پروژه‌محور و بازی‌وارسازی‌شده", icon: "cap" as IconName, c: "var(--color-lavender)" },
  { title: "فضای کار اشتراکی", text: "محیطی حرفه‌ای برای فریلنسرها، دانشجویان و تیم‌های نوپا", icon: "laptop" as IconName, c: "var(--color-tint-mint)" },
  { title: "استودیو تولید محتوا", text: "ویدئو، پادکست، عکس و محتوای حرفه‌ای", icon: "camera" as IconName, c: "var(--color-yellow)" },
  { title: "کافه نوآوری", text: "پاتوقی برای گفت‌وگو، شبکه‌سازی و نشست‌ها", icon: "coffee" as IconName, c: "var(--color-tint-pink)" },
  { title: "اتاق جلسه", text: "جلسات کاری، تیمی، مشاوره و ملاقات‌های حرفه‌ای", icon: "users" as IconName, c: "var(--color-tint-peach)" },
];

export const studioItems: { title: string; text: string; icon: IconName; tint: string; photo: string; pos: string; zoom?: number }[] = [
  { title: "پادکست و محتوای صوتی", text: "برای زمانی که حرفی برای گفتن داری.", icon: "mic" as IconName, tint: "var(--color-tint-lilac)", photo: "photos/p4-podcast", pos: "70% 55%", zoom: 1.5 },
  { title: "تولید ویدئو", text: "برای اینکه ایده‌ات فقط گفته نشود؛ دیده هم بشود.", icon: "video" as IconName, tint: "var(--color-tint-lime)", photo: "photos/p5-video", pos: "55% 78%", zoom: 1.35 },
  { title: "عکاسی محصول و خدمات", text: "گاهی یک تصویر خوب، داستان یک برند را تعریف می‌کند.", icon: "camera" as IconName, tint: "var(--color-tint-pink)", photo: "photos/p6-product", pos: "50% 62%" },
  { title: "تیزر و محتوای تبلیغاتی", text: "برای معرفی حرفه‌ای‌تر یک محصول، خدمت یا ایده.", icon: "megaphone" as IconName, tint: "var(--color-tint-sky)", photo: "photos/p5-video", pos: "30% 18%", zoom: 1.5 },
  { title: "محتوای شبکه‌های اجتماعی", text: "ریل، استوری و ویدئوهایی که دیده می‌شوند.", icon: "play" as IconName, tint: "var(--color-tint-peach)", photo: "photos/p7-event", pos: "20% 70%", zoom: 1.7 },
];

export const coworkAudience = ["فریلنسرها", "دانشجویان", "تیم‌های کوچک و استارتاپی", "زنان فعال در حوزه‌های خالق و دیجیتال"];

export const journey: { title: string; text: string; icon: IconName }[] = [
  { title: "شناخت استعداد", text: "با استعدادسنجی و ارزیابی مهارت شروع می‌کنی تا مسیر درست را پیدا کنی.", icon: "user" },
  { title: "تجربه پروژه واقعی", text: "روی پروژه‌ها و چالش‌های واقعی کار می‌کنی، نه فقط تمرین کلاسی.", icon: "gear" },
  { title: "یادگیری مهارت", text: "مهارت‌های تخصصی و حرفه‌ای را در مدرسه مهارت یاد می‌گیری.", icon: "cap" },
  { title: "شبکه‌سازی", text: "با آدم‌های هم‌مسیر، منتورها و متخصصان آشنا می‌شوی.", icon: "network" },
  { title: "درآمدزایی", text: "مهارتت را به پروژه، مشتری و درآمد تبدیل می‌کنی.", icon: "coin" },
  { title: "ورود به بازار کار", text: "با نمونه‌کار و تجربه واقعی، قدم بعدی را برمی‌داری.", icon: "briefcase" },
];

export const audiences = [
  { age: "۱۳ تا ۱۸ سال", title: "مسیر نوجوانان", text: "در مدرسه مهارت با مهارت‌های دیجیتال، برنامه‌نویسی، خلاقیت و کارآفرینی آشنا شو و یادگیری را از طریق تجربه و پروژه دنبال کن.", chips: ["کشف استعداد", "تجربه", "بازی", "چالش", "ساختن"], tint: "var(--color-tint-pink)", ink: "#7a1d52", cta: "مسیر نوجوانان", href: "/school", r: -2.4 },
  { age: "۱۸ تا ۳۰ سال", title: "مسیر جوانان", text: "مهارت‌های تخصصی‌تر را یاد بگیر، روی پروژه‌های واقعی کار کن و با منتورها، متخصصان و فعالان اکوسیستم ارتباط بگیر.", chips: ["مهارت تخصصی", "پروژه واقعی", "شبکه‌سازی", "تجربه بازار", "فرصت حرفه‌ای"], tint: "var(--color-tint-lilac)", ink: "#3b1a96", cta: "مسیر جوانان", href: "/school", r: 1.2 },
  { age: "کسب‌وکار و کارآفرینی", title: "برای کسب‌وکارهای خانگی و زنان کارآفرین", text: "تولید محتوای حرفه‌ای، عکاسی، ویدئو، طراحی هویت بصری و سایر خدمات صنایع خالق؛ از مهارت تا دیده‌شدن.", chips: ["فضا", "محتوا", "شبکه", "همکاری", "رشد"], tint: "var(--color-tint-mint)", ink: "#0e5a3a", cta: "مسیر کسب‌وکار", href: "/studio", r: -0.8 },
];

export const skills: { t: string; c: string; ink?: string; x: number; y: number; s: number; r: number; speed: number }[] = [
  { t: "بازاریابی دیجیتال", c: "var(--color-yellow)", x: 70, y: 6, s: 1.15, r: -4, speed: 0.1 },
  { t: "سئو", c: "var(--color-coral)", x: 40, y: 14, s: 1, r: 5, speed: 0.22 },
  { t: "طراحی وب", c: "var(--color-green)", x: 12, y: 3, s: 1.1, r: -3, speed: 0.15 },
  { t: "وردپرس", c: "var(--color-lavender)", x: 58, y: 30, s: 0.95, r: 4, speed: 0.28 },
  { t: "پایتون", c: "var(--color-sky, #cfe6fb)", x: 80, y: 36, s: 1.05, r: -6, speed: 0.12 },
  { t: "طراحی گرافیک", c: "var(--color-coral)", x: 24, y: 28, s: 1.3, r: 3, speed: 0.18 },
  { t: "تولید محتوا", c: "var(--color-yellow)", x: 44, y: 46, s: 1.25, r: -2, speed: 0.08 },
  { t: "هوش مصنوعی مولد", c: "var(--color-purple)", ink: "#fff", x: 6, y: 50, s: 1.2, r: 4, speed: 0.25 },
  { t: "ارائه", c: "var(--color-green)", x: 72, y: 60, s: 1, r: -5, speed: 0.2 },
  { t: "مذاکره", c: "var(--color-lavender)", x: 30, y: 68, s: 1, r: 6, speed: 0.14 },
  { t: "مدیریت زمان", c: "var(--color-yellow)", x: 55, y: 74, s: 1.05, r: -3, speed: 0.3 },
  { t: "کار تیمی", c: "var(--color-coral)", x: 8, y: 80, s: 1, r: 3, speed: 0.1 },
  { t: "حل مسئله", c: "var(--color-green)", x: 80, y: 82, s: 1.1, r: 4, speed: 0.24 },
  { t: "مدیریت کمپین دیجیتال", c: "var(--color-lavender)", x: 18, y: 14, s: 0.9, r: -7, speed: 0.32 },
];

export const events = [
  { cap: "نشست شبکه‌سازی", photo: "photos/p7-event", pos: "50% 50%", r: -4, tape: "var(--color-yellow)" },
  { cap: "کارگاه مهارتی", photo: "photos/p3-collab", pos: "50% 45%", r: 3, tape: "var(--color-coral)" },
  { cap: "ارائه دستاورد", photo: "photos/p4-podcast", pos: "55% 30%", r: -2, tape: "var(--color-green)" },
];

export const intents = [
  { title: "می‌خواهم یاد بگیرم", cta: "ثبت‌نام در مدرسه مهارت", icon: "cap" as IconName, c: "var(--color-lavender)", ink: "#4B1FB0", href: "/request/school", r: -2 },
  { title: "می‌خواهم کار کنم", cta: "درخواست فضای کار اشتراکی", icon: "laptop" as IconName, c: "var(--color-tint-mint)", ink: "#0e7a4f", href: "/request/cowork", r: 1.5 },
  { title: "می‌خواهم جلسه برگزار کنم", cta: "رزرو اتاق جلسه", icon: "calendar" as IconName, c: "var(--color-tint-pink)", ink: "#c0245f", href: "/request/meeting", r: -1 },
  { title: "می‌خواهم ایونت برگزار کنم", cta: "درخواست برگزاری ایونت", icon: "star" as IconName, c: "var(--color-tint-peach)", ink: "#c2410c", href: "/request/event", r: 2 },
  { title: "می‌خواهم محتوا تولید کنم", cta: "رزرو استودیو", icon: "camera" as IconName, c: "var(--color-tint-sky)", ink: "#0B5C99", href: "/request/studio", r: -1.6 },
  { title: "می‌خواهم با میکروشمیم آشنا شوم", cta: "درخواست بازدید", icon: "users" as IconName, c: "var(--color-yellow)", ink: "#10162f", href: "/request/visit", r: 1.2 },
];

