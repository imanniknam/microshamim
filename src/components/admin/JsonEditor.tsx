"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type MediaItem = { url: string; alt: string; filename: string };
export type AssetItem = { key: string; src: string };
const Ctx = createContext<{ media: MediaItem[]; assets: AssetItem[]; plain: boolean }>({ media: [], assets: [], plain: false });

const LABELS: Record<string, string> = {
  model: "ماکت — عکس‌های کوچک زیر تصویر اصلی", mdEyebrow: "ماکت — برچسب", mdA: "ماکت — عنوان (۱)", mdB: "ماکت — هایلایت", mdIntro: "ماکت — مقدمه", mdBtn: "ماکت — دکمه ۱", mdBtn2: "ماکت — دکمه ۲", mdNote: "ماکت — دست‌نویس",
  caption: "کپشن زیر عکس",
  title: "عنوان", text: "متن", eyebrow: "برچسب بالای عنوان", subtitle: "زیرعنوان", paragraphs: "پاراگراف‌ها", buttons: "دکمه‌ها", button: "دکمه",
  label: "متن دکمه / برچسب", href: "پیوند", variant: "سبک دکمه", image: "تصویر", cover: "تصویر شاخص", photo: "تصویر", tone: "رنگ پس‌زمینه",
  items: "آیتم‌ها", columns: "تعداد ستون", list: "فهرست", listTitle: "عنوان فهرست", intro: "مقدمه", statement: "جمله‌ی بزرگ", highlight: "جمله‌ی برجسته",
  footer: "جمله‌ی پایانی", reverse: "تصویر سمت دیگر", icon: "آیکون", q: "پرسش", a: "پاسخ", cta: "متن دکمه", name: "نام", pos: "نقطه‌ی تمرکز تصویر",
  tint: "رنگ کارت", c: "رنگ", ink: "رنگ متن", accent: "رنگ تأکید", age: "بازه سنی", chips: "برچسب‌ها", t: "عنوان", x: "موقعیت افقی (٪)", y: "موقعیت عمودی (٪)",
  s: "اندازه", r: "چرخش", speed: "سرعت پارالکس", cap: "کپشن", blob: "لکه‌ی رنگی", zoom: "بزرگ‌نمایی", id: "شناسه", texts: "متن‌های بخش‌ها",
  quickNav: "دسترسی سریع (زیر Hero)", experiences: "کارت‌های «میکروشمیم برای تو چه کاری می‌کند؟»", learnSteps: "مراحل یادگیری", spaces: "فضاها",
  studioItems: "کارت‌های استودیو", coworkAudience: "مخاطبان فضای کار", journey: "مراحل مسیر رشد", audiences: "مسیرهای مخاطب", skills: "مهارت‌ها",
  events: "عکس‌های دیوار رویداد", intents: "انتخاب تجربه", nav: "منوی اصلی", footerLinks: "پیوندهای فوتر", headerCta: "دکمه‌ی هدر", socials: "شبکه‌های اجتماعی",
  seo: "سئو", description: "توضیح", ogImage: "تصویر اشتراک‌گذاری", tagline: "شعار", phone: "تلفن", email: "ایمیل", address: "نشانی", hours: "ساعت کاری",
  mapUrl: "لینک نقشه", copyright: "متن حقوق", footerAbout: "درباره‌ی میکروشمیم در فوتر", instagram: "اینستاگرام", telegram: "تلگرام", linkedin: "لینکدین",
  aparat: "آپارات", whatsapp: "واتساپ",
  heroL1: "هیرو — سطر ۱ عنوان", heroL2: "هیرو — سطر ۲ عنوان", heroL3a: "هیرو — سطر ۳ (بخش عادی)", heroL3b: "هیرو — سطر ۳ (بخش هایلایت‌شده)", heroP1: "هیرو — پاراگراف اول",
  heroP2a: "هیرو — جمله‌ی دوم (عادی)", heroP2b: "هیرو — جمله‌ی دوم (برجسته)", heroCta1Label: "هیرو — دکمه‌ی ۱ متن", heroCta1Href: "هیرو — دکمه‌ی ۱ لینک", heroCta2Label: "هیرو — دکمه‌ی ۲ متن", heroCta2Href: "هیرو — دکمه‌ی ۲ لینک",
  heroHand1: "هیرو — دست‌نویس سطر ۱", heroHand2: "هیرو — دست‌نویس سطر ۲", heroHand3: "هیرو — دست‌نویس سطر ۳",
  xpEyebrow: "کارت‌ها — برچسب بالا", xpA: "کارت‌ها — عنوان (بخش اول)", xpB: "کارت‌ها — عنوان (بخش دوم)",
  learnEyebrow: "یادگیری — برچسب", learnL1: "یادگیری — عنوان سطر ۱", learnL2: "یادگیری — عنوان سطر ۲", learnIntro: "یادگیری — مقدمه", learnLead: "یادگیری — جمله‌ی قبل از نقل‌قول", learnStatement: "یادگیری — جمله‌ی بزرگ",
  spEyebrow: "فضاها — برچسب", spA: "فضاها — عنوان (۱)", spB: "فضاها — کلمه‌ی هایلایت", spC: "فضاها — عنوان (۳)", spIntro: "فضاها — مقدمه", spBtn: "فضاها — دکمه", spNote: "فضاها — یادداشت دست‌نویس",
  stEyebrow: "استودیو — برچسب", stL1: "استودیو — عنوان سطر ۱", stL2: "استودیو — عنوان سطر ۲", stSub: "استودیو — زیرعنوان", stIntro: "استودیو — مقدمه", stBtn: "استودیو — دکمه", stWhatA: "استودیو — «چه چیزی» (هایلایت)", stWhatB: "استودیو — «تولید می‌کنیم؟»", stHand: "استودیو — دست‌نویس",
  cwEyebrow: "فضای کار — برچسب", cwA: "فضای کار — عنوان (۱)", cwB: "فضای کار — هایلایت", cwC: "فضای کار — عنوان (۳)", cwIntro: "فضای کار — مقدمه", cwBtn: "فضای کار — دکمه",
  jyEyebrow: "مسیر رشد — برچسب", jyA: "مسیر رشد — عنوان (۱)", jyB: "مسیر رشد — عنوان (۲)", jyIntro: "مسیر رشد — مقدمه", jyHint: "مسیر رشد — راهنمای اسکرول", jyHand: "مسیر رشد — دست‌نویس",
  jyF1a: "مسیر رشد پایانی — سطر ۱ (۱)", jyF1b: "مسیر رشد پایانی — سطر ۱ (زرد)", jyF1c: "مسیر رشد پایانی — سطر ۱ (۳)", jyF2a: "مسیر رشد پایانی — سطر ۲ (۱)", jyF2b: "مسیر رشد پایانی — سطر ۲ (هایلایت)", jyF2c: "مسیر رشد پایانی — سطر ۲ (۳)", jyBtn: "مسیر رشد — دکمه",
  auEyebrow: "مسیرهای مخاطب — برچسب", auA: "مسیرهای مخاطب — عنوان (۱)", auB: "مسیرهای مخاطب — هایلایت", auIntro: "مسیرهای مخاطب — مقدمه",
  skEyebrow: "مهارت‌ها — برچسب", skA: "مهارت‌ها — عنوان (۱)", skB: "مهارت‌ها — هایلایت", skFoot: "مهارت‌ها — متن پایین", skBtn: "مهارت‌ها — دکمه",
  evEyebrow: "رویدادها — برچسب", evA: "رویدادها — عنوان (۱)", evB: "رویدادها — کلمه‌ی بنفش", evC: "رویدادها — عنوان (۳)", evIntro: "رویدادها — مقدمه", evBtn: "رویدادها — دکمه", evNote: "رویدادها — یادداشت صورتی",
  inA: "انتخاب تجربه — عنوان (۱)", inB: "انتخاب تجربه — هایلایت", inC: "انتخاب تجربه — عنوان (۳)",
  fnEyebrow: "پوستر پایانی — برچسب", fnL1: "پوستر — سطر ۱", fnL2a: "پوستر — سطر ۲ (عادی)", fnL2b: "پوستر — سطر ۲ (هایلایت)", fnP: "پوستر — پاراگراف", fnQuote: "پوستر — جمله‌ی بنفش", fnBtn: "پوستر — دکمه",
};
const TONES: Record<string, string> = { cream: "کرم (پیش‌فرض)", lavender: "یاسی", mint: "سبز روشن", navy: "سرمه‌ای", purple: "بنفش", yellow: "زرد" };
const VARIANTS: Record<string, string> = { purple: "بنفش", yellow: "زرد", outline: "توخالی", navy: "سرمه‌ای" };
const ICONS = ["cap","laptop","calendar","camera","mic","users","coffee","network","megaphone","play","building","star","heart","user","gear","coin","briefcase","bulb","puzzle","chat","link","video","send","search","plus"];
const TOKENS = ["var(--color-tint-pink)","var(--color-tint-lime)","var(--color-tint-lilac)","var(--color-tint-peach)","var(--color-tint-mint)","var(--color-tint-sky)","var(--color-yellow)","var(--color-coral)","var(--color-green)","var(--color-lavender)","var(--color-purple)","var(--color-navy)"];
const IMAGE_KEYS = new Set(["image", "cover", "photo", "ogImage"]);
const LONG_KEYS = new Set(["text", "description", "a", "intro", "footerAbout", "body", "heroP1", "spIntro", "learnIntro", "stIntro", "cwIntro", "jyIntro", "evIntro", "fnP", "skFoot", "auIntro", "stSub", "stHand", "evNote", "jyHand"]);

const lab = (k: string) => LABELS[k] ?? k;
const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[0.92rem] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";
const small = "rounded-md border border-slate-300 bg-white px-2 py-1 text-xs hover:bg-slate-50 disabled:opacity-40";

function blank(v: unknown): unknown {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return "";
}
const titleOf = (v: unknown, i: number) => {
  if (v && typeof v === "object") { const o = v as Record<string, unknown>; const t = o.title ?? o.label ?? o.q ?? o.t ?? o.age ?? o.cap ?? o.name ?? o.caption; if (typeof t === "string" && t) return t; }
  return `آیتم ${i + 1}`;
};

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { media, assets, plain } = useContext(Ctx);
  const [open, setOpen] = useState(false);
  const prefixed = value.startsWith("asset:") || !plain;
  const pick = (v: string) => { onChange(v); setOpen(false); };
  const preview = value.startsWith("asset:") ? assets.find((a) => a.key === value.slice(6))?.src : assets.find((a) => a.key === value)?.src ?? value;
  return (
    <div className="flex items-start gap-2">
      <div className="size-14 shrink-0 overflow-hidden rounded-lg border bg-slate-100">{preview && /* eslint-disable-next-line @next/next/no-img-element */ <img src={preview} alt="" className="size-full object-cover" />}</div>
      <div className="min-w-0 flex-1">
        <input className={input} value={value} onChange={(e) => onChange(e.target.value)} placeholder="آدرس تصویر یا انتخاب از کتابخانه" dir="ltr" />
        <div className="mt-1 flex gap-2"><button type="button" className={small} onClick={() => setOpen(true)}>انتخاب از کتابخانه</button>{value && <button type="button" className={small} onClick={() => onChange("")}>حذف</button>}</div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="max-h-[85vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h3 className="font-bold">انتخاب تصویر</h3><button type="button" className={small} onClick={() => setOpen(false)}>بستن</button></div>
            {media.length > 0 && <><p className="mt-4 mb-2 text-sm font-bold">بارگذاری‌شده‌ها</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">{media.filter((m) => !m.url.endsWith(".pdf")).map((m) => (
                <button key={m.url} type="button" onClick={() => pick(m.url)} className="aspect-square overflow-hidden rounded-lg border hover:ring-2 hover:ring-violet-500">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={m.url} alt={m.alt} className="size-full object-cover" /></button>))}</div></>}
            <p className="mt-5 mb-2 text-sm font-bold">تصاویر آماده‌ی میکروشمیم</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">{assets.map((a) => (
              <button key={a.key} type="button" onClick={() => pick(prefixed ? `asset:${a.key}` : a.key)} className="aspect-square overflow-hidden rounded-lg border bg-slate-100 hover:ring-2 hover:ring-violet-500">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={a.src} alt={a.key} className="size-full object-cover" /></button>))}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Node({ k, v, onChange, depth }: { k: string; v: unknown; onChange: (v: unknown) => void; depth: number }) {
  if (Array.isArray(v)) return <ArrayField k={k} v={v} onChange={onChange} depth={depth} />;
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    return (
      <fieldset className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
        {k && depth > 0 && <legend className="px-2 text-sm font-bold text-slate-700">{lab(k)}</legend>}
        {Object.keys(o).map((key) => key === "type" && typeof o[key] === "string" ? null : (
          <div key={key}><Node k={key} v={o[key]} depth={depth + 1} onChange={(nv) => onChange({ ...o, [key]: nv })} /></div>
        ))}
      </fieldset>
    );
  }
  const L = <label className="mb-1 block text-[0.82rem] font-bold text-slate-600">{lab(k)}</label>;
  if (typeof v === "boolean") return <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" checked={v} onChange={(e) => onChange(e.target.checked)} /> {lab(k)}</label>;
  if (typeof v === "number") return <div>{L}<input type="number" step="any" className={input} value={v} onChange={(e) => onChange(Number(e.target.value))} /></div>;
  const s = String(v ?? "");
  if (IMAGE_KEYS.has(k)) return <div>{L}<ImageField value={s} onChange={onChange} /></div>;
  if (k === "icon") return <div>{L}<select className={input} value={s} onChange={(e) => onChange(e.target.value)}><option value="">— بدون آیکون —</option>{ICONS.map((i) => <option key={i} value={i}>{i}</option>)}</select></div>;
  if (k === "tone") return <div>{L}<select className={input} value={s} onChange={(e) => onChange(e.target.value)}><option value="">پیش‌فرض</option>{Object.entries(TONES).map(([a, b]) => <option key={a} value={a}>{b}</option>)}</select></div>;
  if (k === "variant") return <div>{L}<select className={input} value={s} onChange={(e) => onChange(e.target.value)}><option value="">خودکار</option>{Object.entries(VARIANTS).map(([a, b]) => <option key={a} value={a}>{b}</option>)}</select></div>;
  if (k === "columns") return <div>{L}<select className={input} value={s} onChange={(e) => onChange(Number(e.target.value))}>{[2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select></div>;
  if (["tint", "c", "ink", "accent"].includes(k)) return <div>{L}<div className="flex gap-2"><input className={input} list="tokens" dir="ltr" value={s} onChange={(e) => onChange(e.target.value)} /><span className="size-10 shrink-0 rounded-lg border" style={{ background: s }} /></div></div>;
  const multi = LONG_KEYS.has(k) || s.includes("\n") || s.length > 80;
  return <div>{L}{multi ? <textarea className={input} rows={Math.min(8, Math.max(3, Math.ceil(s.length / 70)))} value={s} onChange={(e) => onChange(e.target.value)} /> : <input className={input} value={s} onChange={(e) => onChange(e.target.value)} dir={k === "href" || k === "link" || k === "slug" ? "ltr" : undefined} />}</div>;
}

function ArrayField({ k, v, onChange, depth }: { k: string; v: unknown[]; onChange: (v: unknown) => void; depth: number }) {
  const prim = v.length === 0 || typeof v[0] !== "object";
  const move = (i: number, d: number) => { const j = i + d; if (j < 0 || j >= v.length) return; const c = [...v]; [c[i], c[j]] = [c[j], c[i]]; onChange(c); };
  const add = () => onChange([...v, prim ? "" : blank(v[v.length - 1])]);
  return (
    <div className="grid gap-2">
      {depth > 0 && <p className="text-sm font-bold text-slate-700">{lab(k)} <span className="font-normal text-slate-400">({v.length})</span></p>}
      {v.map((it, i) => prim ? (
        <div key={i} className="flex gap-2">
          <textarea className={input} rows={typeof it === "string" && it.length > 90 ? 3 : 1} value={String(it ?? "")} onChange={(e) => onChange(v.map((x, j) => (j === i ? e.target.value : x)))} />
          <div className="flex flex-col gap-1"><button type="button" className={small} onClick={() => move(i, -1)}>↑</button><button type="button" className={small} onClick={() => move(i, 1)}>↓</button></div>
          <button type="button" className={small + " text-red-600"} onClick={() => onChange(v.filter((_, j) => j !== i))}>حذف</button>
        </div>
      ) : (
        <details key={i} className="rounded-xl border border-slate-300 bg-white" open={v.length <= 2 && depth < 2}>
          <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-bold [&::-webkit-details-marker]:hidden">
            <span className="grid size-6 place-items-center rounded-full bg-violet-100 text-xs text-violet-700">{i + 1}</span>
            <span className="min-w-0 flex-1 truncate">{titleOf(it, i)}</span>
            <span className="flex gap-1" onClick={(e) => e.preventDefault()}>
              <button type="button" className={small} onClick={() => move(i, -1)}>↑</button>
              <button type="button" className={small} onClick={() => move(i, 1)}>↓</button>
              <button type="button" className={small} onClick={() => { const c = [...v]; c.splice(i + 1, 0, JSON.parse(JSON.stringify(it))); onChange(c); }}>کپی</button>
              <button type="button" className={small + " text-red-600"} onClick={() => confirm("این آیتم حذف شود؟") && onChange(v.filter((_, j) => j !== i))}>حذف</button>
            </span>
          </summary>
          <div className="border-t p-3"><Node k={k} v={it} depth={depth + 1} onChange={(nv) => onChange(v.map((x, j) => (j === i ? nv : x)))} /></div>
        </details>
      ))}
      <div><button type="button" className="rounded-lg border border-dashed border-violet-400 bg-violet-50 px-3 py-1.5 text-sm font-bold text-violet-700 hover:bg-violet-100" onClick={add}>+ افزودن</button></div>
    </div>
  );
}

export function JsonEditor({ value, onChange, media, assets, plainAssets = false }: { value: unknown; onChange: (v: unknown) => void; media: MediaItem[]; assets: AssetItem[]; plainAssets?: boolean }) {
  const ctx = useMemo(() => ({ media, assets, plain: plainAssets }), [media, assets, plainAssets]);
  return (
    <Ctx.Provider value={ctx}>
      <datalist id="tokens">{TOKENS.map((t) => <option key={t} value={t} />)}</datalist>
      <Node k="" v={value} onChange={onChange} depth={0} />
    </Ctx.Provider>
  );
}
