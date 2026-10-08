import { all } from "@/lib/server/db";
import { Card, Title, fdate, td, th } from "@/components/admin/ui";
export const metadata = { title: "گزارش فعالیت" };
export default function Audit() {
  const rows = all<{ id: number; user_email: string; action: string; entity: string; at: string }>("SELECT * FROM audit ORDER BY id DESC LIMIT 300");
  return (<><Title sub="۳۰۰ رویداد آخر">گزارش فعالیت‌ها</Title>
    <Card className="!p-0 overflow-x-auto"><table className="w-full min-w-[520px]"><thead className="border-b bg-slate-50"><tr><th className={th}>زمان</th><th className={th}>کاربر</th><th className={th}>عملیات</th><th className={th}>مورد</th></tr></thead>
      <tbody className="divide-y">{rows.map((r) => <tr key={r.id}><td className={td + " text-slate-500"}>{fdate(r.at)}</td><td className={td} dir="ltr"><span className="block text-right">{r.user_email}</span></td><td className={td}>{r.action}</td><td className={td} dir="ltr"><span className="block text-right">{r.entity}</span></td></tr>)}</tbody></table></Card></>);
}
