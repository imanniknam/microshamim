import Link from "next/link";

export function Title({ children, sub, actions }: { children: React.ReactNode; sub?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div><h1 className="text-2xl font-black">{children}</h1>{sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}</div>
      <div className="flex flex-wrap gap-2">{actions}</div>
    </div>
  );
}
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`rounded-2xl border bg-white p-5 ${className}`}>{children}</div>;
export const LinkBtn = ({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) => (
  <Link href={href} className={`rounded-lg px-4 py-2 text-sm font-bold ${primary ? "bg-violet-600 text-white hover:bg-violet-700" : "border bg-white hover:bg-slate-50"}`}>{children}</Link>
);
export const Badge = ({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "green" | "yellow" | "red" | "violet" | "blue" }) => {
  const m = { slate: "bg-slate-100 text-slate-700", green: "bg-emerald-100 text-emerald-700", yellow: "bg-yellow-100 text-yellow-800", red: "bg-red-100 text-red-700", violet: "bg-violet-100 text-violet-700", blue: "bg-sky-100 text-sky-700" }[tone];
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${m}`}>{children}</span>;
};
export const fdate = (d?: string | null) => (d ? new Date(d.replace(" ", "T") + (d.length <= 10 ? "" : "Z")).toLocaleString("fa-IR", { dateStyle: "medium", timeStyle: d.length > 10 ? "short" : undefined }) : "—");
export const th = "px-3 py-2.5 text-start text-xs font-bold text-slate-500";
export const td = "px-3 py-3 text-sm align-top";
