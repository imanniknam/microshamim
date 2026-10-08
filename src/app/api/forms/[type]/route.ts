import { NextResponse } from "next/server";
import { FORMS } from "@/lib/forms";
import { run } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/auth";
import { notifySubmission } from "@/lib/server/notify";
import type { FormType } from "@/lib/types";

export const dynamic = "force-dynamic";

const FA = "۰۱۲۳۴۵۶۷۸۹", AR = "٠١٢٣٤٥٦٧٨٩";
const latin = (s: string) => s.replace(/[۰-۹]/g, (d) => String(FA.indexOf(d))).replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)));
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\u0000/g, "").trim().slice(0, max) : "");

export async function POST(req: Request, ctx: { params: Promise<{ type: string }> }) {
  const { type } = await ctx.params;
  const def = FORMS[type as FormType];
  if (!def) return NextResponse.json({ ok: false, message: "فرم نامعتبر است." }, { status: 404 });

  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (!rateLimit(`form:${ip}`, 8, 600)) return NextResponse.json({ ok: false, message: "تعداد درخواست‌ها زیاد است؛ چند دقیقه بعد دوباره تلاش کن." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    if (+(req.headers.get("content-length") ?? 0) > 30_000) throw new Error("big");
    body = await req.json();
  } catch { return NextResponse.json({ ok: false, message: "درخواست نامعتبر است." }, { status: 400 }); }

  // honeypot: bots fill the hidden field. Pretend success.
  if (body.website) return NextResponse.json({ ok: true, message: def.success });

  const data: Record<string, string> = {};
  const errors: Record<string, string> = {};
  for (const f of def.fields) {
    let v = clean(body[f.name], f.type === "textarea" ? 3000 : 300);
    if (f.type === "tel" || f.type === "number" || f.type === "date") v = latin(v);
    if (f.required && !v) { errors[f.name] = "این فیلد الزامی است."; continue; }
    if (!v) continue;
    if (f.type === "tel" && !/^\+?[0-9\s-]{7,16}$/.test(v)) errors[f.name] = "شماره تماس معتبر نیست.";
    if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors[f.name] = "ایمیل معتبر نیست.";
    if (f.type === "number" && !/^\d{1,5}$/.test(v)) errors[f.name] = "عدد معتبر وارد کن.";
    if (f.type === "select" && f.options && !f.options.includes(v)) errors[f.name] = "گزینه نامعتبر است.";
    data[f.name] = v;
  }
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, message: "لطفاً فیلدهای مشخص‌شده را بررسی کن.", errors }, { status: 422 });

  const res = run(
    "INSERT INTO submissions(type,name,phone,email,data,source) VALUES(?,?,?,?,?,?)",
    def.type, data.name ?? "", data.phone ?? "", data.email ?? "", JSON.stringify(data), clean(req.headers.get("referer"), 200),
  );
  const id = Number(res.lastInsertRowid);
  // do not await: the visitor gets an instant answer while mail/webhook run in the background
  void notifySubmission({ id, type: def.type, name: data.name ?? "", phone: data.phone ?? "", email: data.email ?? "", data });
  return NextResponse.json({ ok: true, message: def.success });
}
