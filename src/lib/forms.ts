import type { FormType } from "./types";

export type Field = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "select" | "number" | "date";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  half?: boolean;
};
export type FormDef = { type: FormType; label: string; title: string; intro: string; submit: string; success: string; fields: Field[] };

const person: Field[] = [
  { name: "name", label: "نام و نام‌خانوادگی", type: "text", required: true, half: true },
  { name: "phone", label: "شماره تماس", type: "tel", required: true, half: true, placeholder: "۰۹۱۲۳۴۵۶۷۸۹" },
  { name: "email", label: "ایمیل (اختیاری)", type: "email" },
];

export const FORMS: Record<FormType, FormDef> = {
  cowork: {
    type: "cowork", label: "درخواست استقرار در فضای کار اشتراکی",
    title: "درخواست استقرار در فضای کار اشتراکی",
    intro: "اطلاعات اولیه را برای ما ارسال کن. تیم میکروشمیم درخواستت را بررسی می‌کند و درباره شرایط، ظرفیت و فرآیند استقرار با تو در ارتباط خواهد بود.",
    submit: "ارسال درخواست استقرار", success: "درخواستت ثبت شد. تیم میکروشمیم برای هماهنگی شرایط و ظرفیت با تو تماس می‌گیرد.",
    fields: [...person,
      { name: "activity", label: "نوع فعالیت", type: "select", required: true, options: ["فریلنسر", "دانشجو", "تیم کوچک / استارتاپی", "فعال حوزه خلاق و دیجیتال", "سایر"] },
      { name: "people", label: "تعداد نفرات", type: "number", required: true, half: true },
      { name: "duration", label: "مدت مورد نیاز", type: "select", required: true, half: true, options: ["روزانه", "هفتگی", "ماهانه", "چند ماهه", "هنوز مطمئن نیستم"] },
      { name: "startDate", label: "تاریخ پیشنهادی استقرار", type: "date" },
      { name: "message", label: "توضیحات", type: "textarea" },
    ],
  },
  studio: {
    type: "studio", label: "رزرو استودیو", title: "رزرو استودیو تولید محتوا",
    intro: "در مرحله اول کافی است نوع پروژه، نوع محتوای موردنظر و نیاز کلی خود را ثبت کنی. جزئیات استفاده بعد از بررسی درخواست هماهنگ می‌شود.",
    submit: "ثبت درخواست رزرو استودیو", success: "درخواست رزرو استودیو ثبت شد. برای هماهنگی جزئیات با تو تماس می‌گیریم.",
    fields: [...person,
      { name: "projectType", label: "نوع پروژه", type: "select", required: true, options: ["پادکست و محتوای صوتی", "تولید ویدئو", "عکاسی محصول و خدمات", "تیزر و محتوای تبلیغاتی", "محتوای شبکه‌های اجتماعی", "هنوز مطمئن نیستم"] },
      { name: "contentType", label: "نوع محتوای موردنظر", type: "text", required: true },
      { name: "date", label: "تاریخ پیشنهادی", type: "date", half: true },
      { name: "hours", label: "مدت تقریبی (ساعت)", type: "number", half: true },
      { name: "message", label: "نیاز کلی پروژه", type: "textarea", required: true },
    ],
  },
  meeting: {
    type: "meeting", label: "رزرو اتاق جلسه", title: "رزرو اتاق جلسه",
    intro: "برای جلسات تیمی، جلسات کاری، مشاوره و ملاقات‌های حرفه‌ای.",
    submit: "ثبت درخواست رزرو", success: "درخواست رزرو اتاق جلسه ثبت شد. تیم میکروشمیم تأیید نهایی را اعلام می‌کند.",
    fields: [...person,
      { name: "date", label: "تاریخ پیشنهادی", type: "date", required: true, half: true },
      { name: "time", label: "ساعت (از – تا)", type: "text", required: true, half: true, placeholder: "۱۰ تا ۱۲" },
      { name: "people", label: "تعداد حاضرین", type: "number", half: true },
      { name: "topic", label: "موضوع جلسه", type: "text", half: true },
      { name: "message", label: "توضیحات", type: "textarea" },
    ],
  },
  event: {
    type: "event", label: "درخواست برگزاری ایونت", title: "درخواست برگزاری ایونت",
    intro: "اگر می‌خواهی یک کارگاه، نشست، دورهمی تخصصی یا ایونت برگزار کنی، میکروشمیم می‌تواند میزبان ایده تو باشد.",
    submit: "ارسال درخواست برگزاری", success: "درخواست برگزاری ایونت ثبت شد. برای بررسی ایده و هماهنگی با تو تماس می‌گیریم.",
    fields: [...person,
      { name: "org", label: "نام مجموعه / برند (اختیاری)", type: "text" },
      { name: "eventType", label: "نوع رویداد", type: "select", required: true, options: ["کارگاه", "نشست", "دورهمی تخصصی", "رونمایی / ارائه", "سایر"] },
      { name: "attendees", label: "تعداد تقریبی شرکت‌کنندگان", type: "number", half: true },
      { name: "date", label: "تاریخ پیشنهادی", type: "date", half: true },
      { name: "message", label: "درباره ایده رویداد", type: "textarea", required: true },
    ],
  },
  visit: {
    type: "visit", label: "درخواست بازدید", title: "درخواست بازدید از میکروشمیم",
    intro: "اگر می‌خواهی قبل از تصمیم‌گیری با فضای مجموعه آشنا شوی، زمان بازدیدت را ثبت کن.",
    submit: "ثبت درخواست بازدید", success: "درخواست بازدید ثبت شد. زمان بازدید را برایت هماهنگ می‌کنیم.",
    fields: [...person,
      { name: "interest", label: "بیشتر درباره چه بخشی می‌خواهی بدانی؟", type: "select", options: ["مدرسه مهارت", "فضای کار اشتراکی", "استودیو تولید محتوا", "اتاق جلسه / رویداد", "همه‌ی فضاها"] },
      { name: "date", label: "تاریخ پیشنهادی بازدید", type: "date" },
      { name: "message", label: "توضیحات", type: "textarea" },
    ],
  },
  school: {
    type: "school", label: "ثبت‌نام در مدرسه مهارت", title: "ثبت‌نام در مدرسه مهارت",
    intro: "اطلاعاتت را ثبت کن تا تیم مدرسه مهارت درباره دوره‌های فعال و مسیر مناسب با تو در ارتباط باشد.",
    submit: "ثبت‌نام اولیه", success: "ثبت‌نام اولیه‌ات انجام شد. تیم مدرسه مهارت درباره دوره‌ها و مسیر مناسب با تو تماس می‌گیرد.",
    fields: [...person,
      { name: "path", label: "مسیر", type: "select", required: true, options: ["مسیر نوجوانان (۱۳ تا ۱۸ سال)", "مسیر جوانان (۱۸ تا ۳۰ سال)"] },
      { name: "age", label: "سن", type: "number", half: true },
      { name: "interest", label: "علاقه‌مندی", type: "select", half: true, options: ["بازاریابی دیجیتال", "سئو", "طراحی وب و وردپرس", "پایتون", "طراحی گرافیک", "تولید محتوا", "هوش مصنوعی مولد", "مهارت‌های حرفه‌ای", "هنوز نمی‌دانم (استعدادسنجی)"] },
      { name: "message", label: "توضیحات", type: "textarea" },
    ],
  },
  contact: {
    type: "contact", label: "تماس با ما", title: "با ما در تماس باش",
    intro: "سؤال، پیشنهاد یا ایده‌ای داری؟ برایمان بنویس.",
    submit: "ارسال پیام", success: "پیامت ارسال شد. به‌زودی پاسخ می‌دهیم.",
    fields: [...person,
      { name: "subject", label: "موضوع", type: "text" },
      { name: "message", label: "پیام", type: "textarea", required: true },
    ],
  },
};

export const FORM_TYPES = Object.keys(FORMS) as FormType[];
export const STATUS_LABEL: Record<string, string> = { new: "جدید", seen: "دیده‌شده", progress: "در حال پیگیری", done: "انجام‌شده", archived: "بایگانی" };
