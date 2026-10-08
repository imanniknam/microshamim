"use client";
import { useState } from "react";
import { ActionForm, Field, MarkdownField, inputCls } from "@/components/admin/Forms";
import { JsonEditor, type AssetItem, type MediaItem } from "@/components/admin/JsonEditor";
import { savePostAction } from "../../actions";

type P = { id?: number; slug?: string; title?: string; excerpt?: string; body?: string; cover?: string; category?: string; author?: string; status?: string; published_at?: string | null };

export function PostForm({ post, media, assets }: { post: P; media: MediaItem[]; assets: AssetItem[] }) {
  const [cover, setCover] = useState(post.cover ?? "");
  return (
    <ActionForm action={savePostAction} submit={post.id ? "ذخیره‌ی مطلب" : "ایجاد مطلب"}>
      {post.id && <input type="hidden" name="id" value={post.id} />}
      <div className="grid gap-4 rounded-2xl border bg-white p-5 lg:grid-cols-2">
        <Field label="عنوان"><input name="title" defaultValue={post.title} required className={inputCls} /></Field>
        <Field label="نشانی (اختیاری)" hint="خالی بگذار تا از عنوان ساخته شود"><input name="slug" defaultValue={post.slug} dir="ltr" className={inputCls} /></Field>
        <Field label="دسته‌بندی"><input name="category" defaultValue={post.category} className={inputCls} /></Field>
        <Field label="نویسنده"><input name="author" defaultValue={post.author} className={inputCls} /></Field>
        <Field label="وضعیت"><select name="status" defaultValue={post.status ?? "draft"} className={inputCls}><option value="draft">پیش‌نویس</option><option value="published">منتشر شده</option></select></Field>
        <Field label="تاریخ انتشار" hint="خالی = همین الان (UTC)"><input type="datetime-local" name="published_at" defaultValue={post.published_at ? post.published_at.replace(" ", "T").slice(0, 16) : ""} dir="ltr" className={inputCls} /></Field>
        <div className="lg:col-span-2"><Field label="خلاصه (در فهرست و سئو)"><textarea name="excerpt" defaultValue={post.excerpt} rows={2} className={inputCls} /></Field></div>
        <div className="lg:col-span-2"><span className="mb-1.5 block text-[0.82rem] font-bold text-slate-600">تصویر شاخص</span>
          <input type="hidden" name="cover" value={cover} />
          <JsonEditor value={{ cover }} onChange={(v) => setCover((v as { cover: string }).cover)} media={media} assets={assets} /></div>
      </div>
      <div className="rounded-2xl border bg-white p-5"><span className="mb-2 block text-[0.82rem] font-bold text-slate-600">متن مطلب (Markdown)</span><MarkdownField name="body" defaultValue={post.body ?? ""} /></div>
    </ActionForm>
  );
}
