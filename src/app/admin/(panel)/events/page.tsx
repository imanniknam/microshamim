import Link from "next/link";
import { listEvents } from "@/lib/server/data";
import { Badge, Card, LinkBtn, Title, fdate, td, th } from "@/components/admin/ui";

export const metadata = { title: "رویدادها" };
export default function EventsAdmin() {
  const ev = listEvents(false);
  return (
    <>
      <Title actions={<LinkBtn href="/admin/events/new" primary>+ رویداد جدید</LinkBtn>}>رویدادها</Title>
      <Card className="!p-0 overflow-x-auto"><table className="w-full min-w-[560px]"><thead className="border-b bg-slate-50"><tr><th className={th}>عنوان</th><th className={th}>نوع</th><th className={th}>تاریخ</th><th className={th}>وضعیت</th></tr></thead>
        <tbody className="divide-y">{ev.map((e) => <tr key={e.id}><td className={td}><Link href={`/admin/events/${e.id}`} className="font-bold text-violet-700 hover:underline">{e.title}</Link></td><td className={td}>{e.kind || "—"}</td><td className={td + " text-slate-500"}>{fdate(e.starts_at)}</td><td className={td}><Badge tone={e.status === "published" ? "green" : "slate"}>{e.status === "published" ? "منتشر شده" : "پیش‌نویس"}</Badge></td></tr>)}
          {ev.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-500">رویدادی ثبت نشده است.</td></tr>}</tbody></table></Card>
    </>
  );
}
