import { all } from "@/lib/server/db";
import { Card, LinkBtn, Title, fdate, td, th } from "@/components/admin/ui";
import { deleteSubscriberAction } from "../../actions";
export const metadata = { title: "خبرنامه" };
export default function Subscribers() {
  const rows = all<{ id: number; email: string; created_at: string }>("SELECT * FROM subscribers ORDER BY id DESC");
  return (<>
    <Title sub={`${rows.length.toLocaleString("fa-IR")} عضو`} actions={<LinkBtn href="/admin/export/subscribers">خروجی CSV</LinkBtn>}>اعضای خبرنامه</Title>
    <Card className="!p-0 overflow-x-auto"><table className="w-full min-w-[420px]"><thead className="border-b bg-slate-50"><tr><th className={th}>ایمیل</th><th className={th}>تاریخ</th><th className={th}></th></tr></thead>
      <tbody className="divide-y">{rows.map((r) => <tr key={r.id}><td className={td} dir="ltr"><span className="block text-right">{r.email}</span></td><td className={td + " text-slate-500"}>{fdate(r.created_at)}</td>
        <td className={td}><form action={deleteSubscriberAction}><input type="hidden" name="id" value={r.id} /><button className="text-xs font-bold text-red-600">حذف</button></form></td></tr>)}
        {rows.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-slate-500">هنوز کسی عضو نشده است.</td></tr>}</tbody></table></Card></>);
}
