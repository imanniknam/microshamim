import { NextResponse } from "next/server";
import { run } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (!rateLimit(`nl:${ip}`, 5, 600)) return NextResponse.json({ ok: false, message: "تعداد درخواست‌ها زیاد است." }, { status: 429 });
  let b: { email?: string; website?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, message: "درخواست نامعتبر است." }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true, message: "عضویت شما ثبت شد." });
  const email = (b.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, message: "ایمیل معتبر نیست." }, { status: 422 });
  run("INSERT OR IGNORE INTO subscribers(email) VALUES(?)", email);
  return NextResponse.json({ ok: true, message: "عضویت شما در خبرنامه ثبت شد." });
}
