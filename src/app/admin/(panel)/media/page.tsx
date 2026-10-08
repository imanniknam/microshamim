import { all } from "@/lib/server/db";
import { Card, Title } from "@/components/admin/ui";
import { ActionForm, ConfirmButton, inputCls } from "@/components/admin/Forms";
import { deleteMediaAction, updateMediaAltAction, uploadMediaAction } from "../../actions";
import { CopyButton } from "./CopyButton";

export const metadata = { title: "رسانه" };
export default function MediaAdmin() {
  const items = all<{ id: number; url: string; filename: string; alt: string; mime: string; size: number; w: number | null; h: number | null }>("SELECT * FROM media ORDER BY id DESC");
  return (
    <>
      <Title sub="تصاویر بارگذاری‌شده خودکار بهینه (WebP، حداکثر ۲۴۰۰ پیکسل) و بدون متادیتا ذخیره می‌شوند">کتابخانه‌ی رسانه</Title>
      <Card className="mb-6"><ActionForm action={uploadMediaAction} submit="بارگذاری">
        <input type="file" name="files" multiple accept="image/*,application/pdf" required className={inputCls} />
      </ActionForm></Card>
      {items.length === 0 ? <p className="text-slate-500">فایلی بارگذاری نشده است.</p> : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-2xl border bg-white">
              <div className="grid aspect-[4/3] place-items-center bg-slate-100">{m.mime?.startsWith("image/") ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={m.url} alt={m.alt} loading="lazy" className="size-full object-cover" /> : <span className="font-black text-slate-400">PDF</span>}</div>
              <div className="grid gap-2 p-3 text-xs">
                <p className="truncate font-bold" title={m.filename}>{m.filename}</p>
                <p className="text-slate-400" dir="ltr">{m.w ? `${m.w}×${m.h} · ` : ""}{Math.round(m.size / 1024)} KB</p>
                <form action={updateMediaAltAction} className="flex gap-1"><input type="hidden" name="id" value={m.id} /><input name="alt" defaultValue={m.alt} placeholder="متن جایگزین (alt)" className="min-w-0 flex-1 rounded border px-2 py-1" /><button className="rounded border px-2">ثبت</button></form>
                <div className="flex gap-2"><CopyButton text={m.url} />
                  <form action={deleteMediaAction}><input type="hidden" name="id" value={m.id} /><ConfirmButton message="این فایل حذف شود؟ اگر جایی استفاده شده باشد، تصویرش از بین می‌رود." className="rounded border border-red-300 px-2 py-1 font-bold text-red-700">حذف</ConfirmButton></form></div>
              </div>
            </li>))}
        </ul>)}
    </>
  );
}
