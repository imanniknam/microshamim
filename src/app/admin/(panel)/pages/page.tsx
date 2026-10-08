import Link from "next/link";
import { listPages } from "@/lib/server/data";
import { Badge, Card, Title, fdate, td, th } from "@/components/admin/ui";
import { ActionForm, Field, inputCls } from "@/components/admin/Forms";
import { createPageAction } from "../../actions";

export const metadata = { title: "صفحات" };

export default function PagesAdmin() {
  const pages = listPages();
  return (
    <>
      <Title sub="هر صفحه از بلوک‌های قابل‌ویرایش ساخته شده است؛ بلوک‌ها را اضافه، حذف و جابه‌جا کن.">صفحات سایت</Title>
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full min-w-[560px]"><thead className="border-b bg-slate-50"><tr><th className={th}>عنوان</th><th className={th}>نشانی</th><th className={th}>وضعیت</th><th className={th}>آخرین ویرایش</th></tr></thead>
          <tbody className="divide-y">{pages.map((p) => (
            <tr key={p.slug}><td className={td}><Link href={`/admin/pages/${encodeURIComponent(p.slug)}`} className="font-bold text-violet-700 hover:underline">{p.title}</Link></td>
              <td className={td} dir="ltr"><a className="text-slate-500" href={`/${p.slug}`} target="_blank">/{p.slug}</a></td>
              <td className={td}><Badge tone={p.published ? "green" : "slate"}>{p.published ? "منتشر شده" : "پیش‌نویس"}</Badge></td><td className={td + " text-slate-500"}>{fdate(p.updated_at)}</td></tr>))}</tbody></table>
      </Card>
      <Card className="mt-6 max-w-xl"><h2 className="mb-3 font-black">صفحه‌ی جدید</h2>
        <ActionForm action={createPageAction} submit="ساخت صفحه">
          <Field label="عنوان"><input name="title" required className={inputCls} /></Field>
          <Field label="نشانی (مثلاً partners)" hint="حروف، عدد و خط‌تیره"><input name="slug" required dir="ltr" className={inputCls} /></Field>
        </ActionForm></Card>
      <p className="mt-4 text-sm text-slate-500">صفحه‌ی اصلی در بخش «صفحه اصلی»، مطالب مجله در «مجله» و رویدادها در «رویدادها» ویرایش می‌شوند.</p>
    </>
  );
}
