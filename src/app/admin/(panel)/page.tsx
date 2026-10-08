import Link from "next/link";
import { all, get } from "@/lib/server/db";
import { FORMS, STATUS_LABEL } from "@/lib/forms";
import { Badge, Card, Title, fdate } from "@/components/admin/ui";
import type { FormType } from "@/lib/types";

export const metadata = { title: "داشبورد" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const sp = await searchParams;
  const n = (sql: string) => get<{ n: number }>(sql)?.n ?? 0;
  const stats = [
    ["درخواست جدید", n("SELECT COUNT(*) n FROM submissions WHERE status='new'"), "/admin/submissions?status=new", "bg-yellow-100"],
    ["کل درخواست‌ها", n("SELECT COUNT(*) n FROM submissions"), "/admin/submissions", "bg-violet-100"],
    ["مطلب منتشرشده", n("SELECT COUNT(*) n FROM posts WHERE status='published'"), "/admin/posts", "bg-sky-100"],
    ["رویداد منتشرشده", n("SELECT COUNT(*) n FROM events WHERE status='published'"), "/admin/events", "bg-pink-100"],
    ["دوره‌ی فعال", n("SELECT COUNT(*) n FROM courses WHERE status='published'"), "/admin/courses", "bg-emerald-100"],
    ["عضو خبرنامه", n("SELECT COUNT(*) n FROM subscribers"), "/admin/subscribers", "bg-orange-100"],
  ] as const;
  const byType = all<{ type: string; n: number }>("SELECT type, COUNT(*) n FROM submissions GROUP BY type ORDER BY n DESC");
  const recent = all<{ id: number; type: string; name: string; phone: string; status: string; created_at: string }>("SELECT id,type,name,phone,status,created_at FROM submissions ORDER BY id DESC LIMIT 8");
  const days = all<{ d: string; n: number }>("SELECT date(created_at) d, COUNT(*) n FROM submissions WHERE created_at >= date('now','-13 day') GROUP BY d");
  const max = Math.max(1, ...days.map((x) => x.n));
  return (
    <>
      <Title sub="خلاصه‌ی وضعیت سایت و درخواست‌ها">داشبورد</Title>
      {sp.denied && <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700">این بخش فقط برای مدیر کل است.</p>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {stats.map(([l, v, h, c]) => <Link key={l} href={h} className={`rounded-2xl p-4 ${c} hover:shadow-md transition-shadow`}><p className="text-3xl font-black">{v.toLocaleString("fa-IR")}</p><p className="text-sm font-bold text-slate-600">{l}</p></Link>)}
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <h2 className="mb-3 font-black">آخرین درخواست‌ها</h2>
          {recent.length === 0 ? <p className="text-sm text-slate-500">هنوز درخواستی ثبت نشده است.</p> : (
            <ul className="divide-y">{recent.map((r) => (
              <li key={r.id}><Link href={`/admin/submissions/${r.id}`} className="flex items-center gap-3 py-2.5 hover:bg-slate-50">
                <Badge tone={r.status === "new" ? "yellow" : r.status === "done" ? "green" : "slate"}>{STATUS_LABEL[r.status]}</Badge>
                <span className="font-bold">{r.name || "—"}</span><span className="text-sm text-slate-500">{FORMS[r.type as FormType]?.label}</span>
                <span className="ms-auto text-xs text-slate-400">{fdate(r.created_at)}</span>
              </Link></li>))}</ul>)}
        </Card>
        <div className="grid gap-5">
          <Card>
            <h2 className="mb-3 font-black">درخواست‌ها در ۱۴ روز گذشته</h2>
            <div className="flex h-28 items-end gap-1" role="img" aria-label="نمودار درخواست‌های ۱۴ روز اخیر">
              {Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * 864e5).toISOString().slice(0, 10); const v = days.find((x) => x.d === d)?.n ?? 0; return <div key={d} title={`${d}: ${v}`} className="flex-1 rounded-t bg-violet-400" style={{ height: `${Math.max(4, (v / max) * 100)}%`, opacity: v ? 1 : 0.25 }} />; })}
            </div>
          </Card>
          <Card>
            <h2 className="mb-3 font-black">به تفکیک نوع فرم</h2>
            {byType.length === 0 ? <p className="text-sm text-slate-500">—</p> : <ul className="grid gap-2 text-sm">{byType.map((t) => <li key={t.type} className="flex justify-between"><span>{FORMS[t.type as FormType]?.label ?? t.type}</span><b>{t.n.toLocaleString("fa-IR")}</b></li>)}</ul>}
          </Card>
        </div>
      </div>
    </>
  );
}
