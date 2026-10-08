"use client";

import { useActionState, useState } from "react";
import { JsonEditor, type AssetItem, type MediaItem } from "./JsonEditor";
import type { State } from "@/app/admin/actions";

export const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[0.92rem] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";
export const btnCls = "rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700 disabled:opacity-60";

export function Banner({ state }: { state: State }) {
  if (!state) return null;
  return <p role="status" className={`rounded-lg px-4 py-2.5 text-sm font-bold ${state.error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{state.error ?? state.message}</p>;
}

/** Generic server-action form with pending + result banner. */
export function ActionForm({ action, children, submit = "ذخیره", className = "grid gap-4" }: { action: (s: State, f: FormData) => Promise<State>; children: React.ReactNode; submit?: string; className?: string }) {
  const [state, act, pending] = useActionState(action, null);
  return (
    <form action={act} className={className}>
      {children}
      <div className="flex items-center gap-3"><button className={btnCls} disabled={pending}>{pending ? "در حال ذخیره…" : submit}</button><Banner state={state} /></div>
    </form>
  );
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <label className="grid gap-1.5"><span className="text-[0.82rem] font-bold text-slate-600">{label}</span>{children}{hint && <span className="text-xs text-slate-400">{hint}</span>}</label>;
}

export function JsonForm({ action, initial, media, assets, plainAssets, extra, submit = "ذخیره‌ی تغییرات" }: { action: (s: State, f: FormData) => Promise<State>; initial: unknown; media: MediaItem[]; assets: AssetItem[]; plainAssets?: boolean; extra?: React.ReactNode; submit?: string }) {
  const [val, setVal] = useState(initial);
  const [state, act, pending] = useActionState(action, null);
  return (
    <form action={act} className="grid gap-5">
      {extra}
      <input type="hidden" name="json" value={JSON.stringify(val)} />
      <JsonEditor value={val} onChange={setVal} media={media} assets={assets} plainAssets={plainAssets} />
      <div className="sticky bottom-0 -mx-4 flex items-center gap-3 border-t bg-white/95 px-4 py-3 backdrop-blur"><button className={btnCls} disabled={pending}>{pending ? "در حال ذخیره…" : submit}</button><Banner state={state} /></div>
    </form>
  );
}

/* ───────── block editor ───────── */
const BLOCK_LABEL: Record<string, string> = { hero: "هیرو (سربرگ)", text: "متن", cards: "کارت‌ها", checklist: "چک‌لیست", steps: "مراحل (زنجیره)", feature: "ویژگی (تصویر + متن)", faq: "سؤالات متداول", cta: "دعوت به اقدام", gallery: "گالری عکس (کلاژ)", courses: "فهرست دوره‌ها", flow: "جریان (مراحل با فلش)" };
const TEMPLATES: Record<string, unknown> = {
  hero: { type: "hero", eyebrow: "", title: "عنوان", subtitle: "", paragraphs: [""], buttons: [{ label: "", href: "/", variant: "purple" }], image: "", tone: "" },
  text: { type: "text", eyebrow: "", title: "عنوان", paragraphs: [""], highlight: "", tone: "" },
  cards: { type: "cards", eyebrow: "", title: "عنوان", intro: "", columns: 3, tone: "", items: [{ title: "کارت", text: "", icon: "", list: [], image: "" }] },
  checklist: { type: "checklist", title: "عنوان", intro: "", items: [""], footer: "", tone: "" },
  steps: { type: "steps", title: "عنوان", intro: "", items: ["مرحله ۱", "مرحله ۲"], statement: "" },
  feature: { type: "feature", eyebrow: "", title: "عنوان", paragraphs: [""], listTitle: "", list: [], image: "", buttons: [], reverse: false, tone: "" },
  faq: { type: "faq", title: "سؤالات متداول", items: [{ q: "", a: "" }] },
  cta: { type: "cta", title: "عنوان", text: "", tone: "", buttons: [{ label: "", href: "/", variant: "purple" }] },
  gallery: { type: "gallery", eyebrow: "", title: "گالری", intro: "", tone: "", items: [{ image: "", caption: "" }] },
  courses: { type: "courses", title: "دوره‌های فعال", intro: "" },
  flow: { type: "flow", title: "عنوان", intro: "", items: ["گام ۱", "گام ۲"], text: "" },
};

export function PageForm({ action, page, media, assets }: { action: (s: State, f: FormData) => Promise<State>; page: { slug: string; title: string; seo_title: string; seo_desc: string; published: number; blocks: Record<string, unknown>[] }; media: MediaItem[]; assets: AssetItem[] }) {
  const [blocks, setBlocks] = useState(page.blocks);
  const [state, act, pending] = useActionState(action, null);
  const [add, setAdd] = useState("text");
  const move = (i: number, d: number) => { const j = i + d; if (j < 0 || j >= blocks.length) return; const c = [...blocks]; [c[i], c[j]] = [c[j], c[i]]; setBlocks(c); };
  const small = "rounded-md border border-slate-300 bg-white px-2 py-1 text-xs hover:bg-slate-50";
  return (
    <form action={act} className="grid gap-5">
      <input type="hidden" name="slug" value={page.slug} />
      <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />
      <div className="grid gap-4 rounded-2xl border bg-white p-5 sm:grid-cols-2">
        <Field label="عنوان صفحه (منو و پیش‌فرض سئو)"><input name="title" defaultValue={page.title} className={inputCls} required /></Field>
        <Field label="نشانی صفحه"><input value={`/${page.slug}`} readOnly dir="ltr" className={inputCls + " bg-slate-50"} /></Field>
        <Field label="عنوان سئو"><input name="seo_title" defaultValue={page.seo_title} className={inputCls} /></Field>
        <Field label="توضیح سئو (متای دیسکریپشن)"><input name="seo_desc" defaultValue={page.seo_desc} className={inputCls} /></Field>
        <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" name="published" defaultChecked={!!page.published} /> منتشر شده</label>
      </div>
      <div className="grid gap-3">
        {blocks.map((b, i) => (
          <details key={i} className="rounded-2xl border border-slate-300 bg-white" open={i === 0}>
            <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="grid size-7 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{i + 1}</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">{BLOCK_LABEL[String(b.type)] ?? String(b.type)}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-bold">{String(b.title ?? "")}</span>
              <span className="flex gap-1" onClick={(e) => e.preventDefault()}>
                <button type="button" className={small} onClick={() => move(i, -1)}>↑</button><button type="button" className={small} onClick={() => move(i, 1)}>↓</button>
                <button type="button" className={small} onClick={() => { const c = [...blocks]; c.splice(i + 1, 0, JSON.parse(JSON.stringify(b))); setBlocks(c); }}>کپی</button>
                <button type="button" className={small + " text-red-600"} onClick={() => confirm("این بلوک حذف شود؟") && setBlocks(blocks.filter((_, j) => j !== i))}>حذف</button>
              </span>
            </summary>
            <div className="border-t p-4"><JsonEditor value={b} onChange={(v) => setBlocks(blocks.map((x, j) => (j === i ? (v as Record<string, unknown>) : x)))} media={media} assets={assets} /></div>
          </details>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-violet-400 bg-violet-50 p-3">
        <select value={add} onChange={(e) => setAdd(e.target.value)} className={inputCls + " !w-auto"}>{Object.entries(BLOCK_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
        <button type="button" className="rounded-lg bg-violet-100 px-4 py-2 text-sm font-bold text-violet-800 hover:bg-violet-200" onClick={() => setBlocks([...blocks, JSON.parse(JSON.stringify(TEMPLATES[add]))])}>+ افزودن بلوک</button>
      </div>
      <div className="sticky bottom-0 -mx-4 flex items-center gap-3 border-t bg-white/95 px-4 py-3 backdrop-blur">
        <button className={btnCls} disabled={pending}>{pending ? "در حال ذخیره…" : "ذخیره‌ی صفحه"}</button>
        <a href={`/${page.slug}`} target="_blank" className="rounded-lg border px-4 py-2.5 text-sm font-bold hover:bg-slate-50">مشاهده‌ی صفحه ↗</a>
        <Banner state={state} />
      </div>
    </form>
  );
}

export function ConfirmButton({ children, message = "مطمئنی؟", className = "" }: { children: React.ReactNode; message?: string; className?: string }) {
  return <button className={className} onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}>{children}</button>;
}

/** Markdown textarea with a tiny toolbar + live preview toggle. */
export function MarkdownField({ name, defaultValue }: { name: string; defaultValue: string }) {
  const [v, setV] = useState(defaultValue);
  const wrap = (a: string, b = a) => setV((x) => x + `${a}متن${b}`);
  const small = "rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold hover:bg-slate-50";
  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-1.5">
        <button type="button" className={small} onClick={() => setV((x) => x + "\n## عنوان بخش\n")}>H2</button>
        <button type="button" className={small} onClick={() => setV((x) => x + "\n### زیرعنوان\n")}>H3</button>
        <button type="button" className={small} onClick={() => wrap("**")}>پررنگ</button>
        <button type="button" className={small} onClick={() => wrap("*")}>کج</button>
        <button type="button" className={small} onClick={() => setV((x) => x + "\n- مورد اول\n- مورد دوم\n")}>فهرست</button>
        <button type="button" className={small} onClick={() => setV((x) => x + "\n> نقل‌قول\n")}>نقل‌قول</button>
        <button type="button" className={small} onClick={() => setV((x) => x + "[متن لینک](https://)")}>لینک</button>
        <button type="button" className={small} onClick={() => setV((x) => x + "\n![توضیح تصویر](/uploads/…)\n")}>تصویر</button>
      </div>
      <textarea name={name} value={v} onChange={(e) => setV(e.target.value)} rows={18} className={inputCls + " font-[inherit] leading-8"} />
    </div>
  );
}
