import { all } from "@/lib/server/db";
import { getSession } from "@/lib/server/auth";
import { FORMS } from "@/lib/forms";
import type { FormType } from "@/lib/types";

export const dynamic = "force-dynamic";
const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

export async function GET(req: Request, ctx: { params: Promise<{ kind: string }> }) {
  if (!(await getSession())) return new Response("Unauthorized", { status: 401 });
  const { kind } = await ctx.params;
  const u = new URL(req.url);
  let csv = "";
  if (kind === "submissions") {
    const where: string[] = []; const args: string[] = [];
    for (const k of ["type", "status"]) if (u.searchParams.get(k)) { where.push(`${k} = ?`); args.push(u.searchParams.get(k)!); }
    const q = u.searchParams.get("q");
    if (q) { where.push("(name LIKE ? OR phone LIKE ? OR email LIKE ? OR data LIKE ?)"); args.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`); }
    const rows = all<{ id: number; type: string; name: string; phone: string; email: string; status: string; note: string; data: string; created_at: string }>(`SELECT * FROM submissions ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY id DESC`, ...args);
    csv = "شناسه,نوع فرم,نام,تلفن,ایمیل,وضعیت,تاریخ,یادداشت,جزئیات\n" + rows.map((r) => {
      const d = JSON.parse(r.data) as Record<string, string>;
      const def = FORMS[r.type as FormType];
      const detail = (def?.fields ?? []).map((f) => d[f.name] ? `${f.label}: ${d[f.name]}` : "").filter(Boolean).join(" | ");
      return [r.id, def?.label ?? r.type, r.name, r.phone, r.email, r.status, r.created_at, r.note, detail].map(esc).join(",");
    }).join("\n");
  } else if (kind === "subscribers") {
    csv = "ایمیل,تاریخ عضویت\n" + all<{ email: string; created_at: string }>("SELECT email, created_at FROM subscribers ORDER BY id DESC").map((r) => [r.email, r.created_at].map(esc).join(",")).join("\n");
  } else return new Response("Not found", { status: 404 });
  return new Response("﻿" + csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="${kind}-${new Date().toISOString().slice(0, 10)}.csv"` } });
}
