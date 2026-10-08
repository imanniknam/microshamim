"use client";
import { useState } from "react";
import { ActionForm, Field, inputCls } from "@/components/admin/Forms";
import { JsonEditor, type AssetItem, type MediaItem } from "@/components/admin/JsonEditor";
import { saveCourseAction } from "../../actions";
type C = { id?: number; title?: string; summary?: string; audience?: string; image?: string; link?: string; sort?: number; status?: string };
export function CourseForm({ c, media, assets }: { c: C; media: MediaItem[]; assets: AssetItem[] }) {
  const [image, setImage] = useState(c.image ?? "");
  return (
    <ActionForm action={saveCourseAction} submit={c.id ? "ذخیره‌ی دوره" : "ایجاد دوره"}>
      {c.id && <input type="hidden" name="id" value={c.id} />}
      <div className="grid gap-4 rounded-2xl border bg-white p-5 lg:grid-cols-2">
        <Field label="عنوان دوره"><input name="title" defaultValue={c.title} required className={inputCls} /></Field>
        <Field label="مسیر"><select name="audience" defaultValue={c.audience ?? "all"} className={inputCls}><option value="teen">نوجوانان (۱۳ تا ۱۸)</option><option value="youth">جوانان (۱۸ تا ۳۰)</option><option value="all">همه</option></select></Field>
        <div className="lg:col-span-2"><Field label="توضیح کوتاه"><textarea name="summary" defaultValue={c.summary} rows={3} className={inputCls} /></Field></div>
        <Field label="لینک ثبت‌نام (خالی = فرم ثبت‌نام مدرسه)"><input name="link" defaultValue={c.link} dir="ltr" className={inputCls} /></Field>
        <Field label="ترتیب نمایش"><input type="number" name="sort" defaultValue={c.sort ?? 0} className={inputCls} /></Field>
        <Field label="وضعیت"><select name="status" defaultValue={c.status ?? "draft"} className={inputCls}><option value="draft">پیش‌نویس</option><option value="published">فعال (نمایش در سایت)</option></select></Field>
        <div className="lg:col-span-2"><span className="mb-1.5 block text-[0.82rem] font-bold text-slate-600">تصویر</span><input type="hidden" name="image" value={image} /><JsonEditor value={{ image }} onChange={(v) => setImage((v as { image: string }).image)} media={media} assets={assets} /></div>
      </div>
    </ActionForm>);
}
