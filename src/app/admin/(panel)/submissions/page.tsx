import Link from "next/link";
import { all, get } from "@/lib/server/db";
import { FORMS, FORM_TYPES, STATUS_LABEL } from "@/lib/forms";
import { Badge, Card, LinkBtn, Title, fdate, td, th } from "@/components/admin/ui";
import { bulkSubmissionAction } from "../../actions";
import type { FormType } from "@/lib/types";

export const metadata = { title: "درخواست‌ها" };
const PER = 30;

export default async function Submissions({ searchParams }: { searchParams: Promise<{ type?: string; status?: string; q?: string; page?: string }> }) {
  const sp = await searchParams;
  const where: string[] = []; const args: unknown[] = [];
  if (sp.type) { where.push("type = ?"); args.push(sp.type); }
  if (sp.status) { where.push("status = ?"); args.push(sp.status); }
  if (sp.q) { where.push("(name LIKE ? OR phone LIKE ? OR email LIKE ? OR data LIKE ?)"); const q = `%${sp.q}%`; args.push(q, q, q, q); }
  const W = where.length ? "WHERE " + where.join(" AND ") : "";
  const page = Math.max(1, Number(sp.page) || 1);
  const total = get<{ n: number }>(`SELECT COUNT(*) n FROM submissions ${W}`, ...args)?.n ?? 0;
  const rows = all<{ id: number; type: string; name: string; phone: string; email: string; status: string; created_at: string }>(`SELECT id,type,name,phone,email,status,created_at FROM submissions ${W} ORDER BY id DESC LIMIT ${PER} OFFSET ${(page - 1) * PER}`, ...args);
  const qs = (o: Record<string, string | undefined>) => "?" + new URLSearchParams(Object.entries({ ...sp, ...o }).filter(([, v]) => v) as [string, string][]).toString();
  const exportHref = "/admin/export/submissions" + qs({ page: undefined });
  const pages = Math.ceil(total / PER);
  const sel = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return (
    <>
      <Title sub={`${total.toLocaleString("fa-IR")} مورد`} actions={<LinkBtn href={exportHref}>خروجی CSV</LinkBtn>}>درخواست‌ها و فرم‌ها</Title>
      <form className="mb-4 flex flex-wrap gap-2" method="get">
        <input name="q" defaultValue={sp.q} placeholder="جست‌وجو (نام، تلفن، ایمیل، متن)" className={sel + " min-w-60 flex-1"} />
        <select name="type" defaultValue={sp.type ?? ""} className={sel}><option value="">همه‌ی فرم‌ها</option>{FORM_TYPES.map((t) => <option key={t} value={t}>{FORMS[t].label}</option>)}</select>
        <select name="status" defaultValue={sp.status ?? ""} className={sel}><option value="">همه‌ی وضعیت‌ها</option>{Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-white">فیلتر</button>
      </form>
      <form action={bulkSubmissionAction}>
        <Card className="!p-0 overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="border-b bg-slate-50"><tr><th className={th}></th><th className={th}>وضعیت</th><th className={th}>نام</th><th className={th}>تماس</th><th className={th}>فرم</th><th className={th}>تاریخ</th></tr></thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.id} className={r.status === "new" ? "bg-yellow-50/50" : ""}>
                  <td className={td}><input type="checkbox" name="ids" value={r.id} aria-label="انتخاب" /></td>
                  <td className={td}><Badge tone={r.status === "new" ? "yellow" : r.status === "done" ? "green" : r.status === "progress" ? "blue" : "slate"}>{STATUS_LABEL[r.status]}</Badge></td>
                  <td className={td}><Link href={`/admin/submissions/${r.id}`} className="font-bold text-violet-700 hover:underline">{r.name || "—"}</Link></td>
                  <td className={td} dir="ltr"><span className="block text-right">{r.phone}</span><span className="block text-right text-xs text-slate-400">{r.email}</span></td>
                  <td className={td}>{FORMS[r.type as FormType]?.label ?? r.type}</td>
                  <td className={td + " text-slate-500"}>{fdate(r.created_at)}</td>
                </tr>))}
              {rows.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-500">موردی پیدا نشد.</td></tr>}
            </tbody>
          </table>
        </Card>
        {rows.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-bold">با موارد انتخاب‌شده:</span>
            {[["seen", "دیده‌شده"], ["progress", "در حال پیگیری"], ["done", "انجام‌شده"], ["archived", "بایگانی"], ["delete", "حذف"]].map(([v, l]) => (
              <button key={v} name="action" value={v} className={`rounded-lg border px-3 py-1.5 font-bold ${v === "delete" ? "border-red-300 text-red-700" : "bg-white"}`}>{l}</button>))}
          </div>)}
      </form>
      {pages > 1 && <div className="mt-5 flex flex-wrap gap-1.5">{Array.from({ length: pages }, (_, i) => <Link key={i} href={qs({ page: String(i + 1) })} className={`rounded-lg border px-3 py-1 text-sm ${i + 1 === page ? "bg-violet-600 text-white" : "bg-white"}`}>{(i + 1).toLocaleString("fa-IR")}</Link>)}</div>}
    </>
  );
}
