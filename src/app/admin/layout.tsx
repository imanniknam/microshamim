import type { Metadata } from "next";

export const metadata: Metadata = { title: { default: "پنل مدیریت میکروشمیم", template: "%s | پنل مدیریت" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh bg-slate-100 text-slate-800 leading-7 [&_*]:[font-family:var(--font-body)]" style={{ fontFamily: "var(--font-body)" }}>{children}</div>;
}
