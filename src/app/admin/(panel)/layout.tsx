import Link from "next/link";
import { requireAdmin } from "@/lib/server/auth";
import { get } from "@/lib/server/db";
import { logoutAction } from "../actions";

const NAV = [
  ["/admin", "داشبورد", "▦"], ["/admin/submissions", "درخواست‌ها و فرم‌ها", "✉"], ["/admin/home", "صفحه اصلی", "⌂"], ["/admin/pages", "صفحات", "▤"],
  ["/admin/posts", "مجله (مطالب)", "✎"], ["/admin/events", "رویدادها", "★"], ["/admin/courses", "دوره‌های مدرسه مهارت", "🎓"], ["/admin/media", "رسانه", "▣"],
  ["/admin/subscribers", "خبرنامه", "@"], ["/admin/settings", "تنظیمات سایت", "⚙"], ["/admin/users", "کاربران", "👤"], ["/admin/audit", "گزارش فعالیت", "☰"],
] as const;

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const me = await requireAdmin();
  const fresh = get<{ n: number }>("SELECT COUNT(*) n FROM submissions WHERE status='new'")?.n ?? 0;
  return (
    <div className="lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b bg-slate-900 text-slate-100 lg:sticky lg:top-0 lg:h-svh lg:overflow-y-auto lg:border-b-0">
        <div className="flex items-center justify-between px-4 py-3 lg:block lg:px-5 lg:py-6">
          <Link href="/admin" className="font-black text-xl text-yellow-300">پنل میکروشمیم</Link>
          <p className="hidden lg:block mt-1 text-xs text-slate-400">{me.name || me.email} · {me.role === "admin" ? "مدیر" : "ویراستار"}</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:grid lg:overflow-visible lg:px-3 lg:pb-6" aria-label="منوی مدیریت">
          {NAV.map(([href, label, ic]) => (
            <Link key={href} href={href} className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800">
              <span className="w-5 text-center text-slate-400">{ic}</span>{label}
              {href === "/admin/submissions" && fresh > 0 && <span className="ms-auto rounded-full bg-yellow-300 px-2 text-xs font-black text-slate-900">{fresh}</span>}
            </Link>
          ))}
          <a href="/" target="_blank" className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800"><span className="w-5 text-center text-slate-400">↗</span>مشاهده‌ی سایت</a>
          <form action={logoutAction}><button className="flex w-full shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-bold text-red-300 hover:bg-slate-800"><span className="w-5 text-center">⏻</span>خروج</button></form>
        </nav>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
