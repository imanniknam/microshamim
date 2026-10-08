"use client";
import { useState } from "react";
import { ActionForm, Field, MarkdownField, inputCls } from "@/components/admin/Forms";
import { JsonEditor, type AssetItem, type MediaItem } from "@/components/admin/JsonEditor";
import { saveEventAction } from "../../actions";

type E = { id?: number; title?: string; slug?: string; kind?: string; starts_at?: string | null; place?: string; description?: string; image?: string; link?: string; status?: string };
export function EventForm({ ev, media, assets }: { ev: E; media: MediaItem[]; assets: AssetItem[] }) {
  const [image, setImage] = useState(ev.image ?? "");
  return (
    <ActionForm action={saveEventAction} submit={ev.id ? "ذخیره‌ی رویداد" : "ایجاد رویداد"}>
      {ev.id && <input type="hidden" name="id" value={ev.id} />}
      <div className="grid gap-4 rounded-2xl border bg-white p-5 lg:grid-cols-2">
        <Field label="عنوان"><input name="title" defaultValue={ev.title} required className={inputCls} /></Field>
        <Field label="نشانی (اختیاری)"><input name="slug" defaultValue={ev.slug} dir="ltr" className={inputCls} /></Field>
        <Field label="نوع (کارگاه، نشست، …)"><input name="kind" defaultValue={ev.kind} className={inputCls} /></Field>
        <Field label="تاریخ برگزاری"><input type="date" name="starts_at" defaultValue={ev.starts_at?.slice(0, 10) ?? ""} dir="ltr" className={inputCls} /></Field>
        <Field label="مکان"><input name="place" defaultValue={ev.place} className={inputCls} /></Field>
        <Field label="لینک ثبت‌نام / اطلاعات بیشتر"><input name="link" defaultValue={ev.link} dir="ltr" className={inputCls} /></Field>
        <Field label="وضعیت"><select name="status" defaultValue={ev.status ?? "draft"} className={inputCls}><option value="draft">پیش‌نویس</option><option value="published">منتشر شده</option></select></Field>
        <div className="lg:col-span-2"><span className="mb-1.5 block text-[0.82rem] font-bold text-slate-600">تصویر</span><input type="hidden" name="image" value={image} />
          <JsonEditor value={{ image }} onChange={(v) => setImage((v as { image: string }).image)} media={media} assets={assets} /></div>
      </div>
      <div className="rounded-2xl border bg-white p-5"><span className="mb-2 block text-[0.82rem] font-bold text-slate-600">توضیحات (Markdown)</span><MarkdownField name="description" defaultValue={ev.description ?? ""} /></div>
    </ActionForm>
  );
}
