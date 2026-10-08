import Link from "next/link";
import { listCourses } from "@/lib/server/data";
import { Badge, Card, LinkBtn, Title, td, th } from "@/components/admin/ui";
export const metadata = { title: "دوره‌ها" };
export default function CoursesAdmin() {
  const c = listCourses(false);
  const aud: Record<string, string> = { teen: "نوجوانان", youth: "جوانان", all: "همه" };
  return (<>
    <Title sub="در بخش «دوره‌های فعال» صفحه‌ی مدرسه مهارت نمایش داده می‌شوند" actions={<LinkBtn href="/admin/courses/new" primary>+ دوره‌ی جدید</LinkBtn>}>دوره‌های مدرسه مهارت</Title>
    <Card className="!p-0 overflow-x-auto"><table className="w-full min-w-[520px]"><thead className="border-b bg-slate-50"><tr><th className={th}>عنوان</th><th className={th}>مسیر</th><th className={th}>ترتیب</th><th className={th}>وضعیت</th></tr></thead>
      <tbody className="divide-y">{c.map((x) => <tr key={x.id}><td className={td}><Link href={`/admin/courses/${x.id}`} className="font-bold text-violet-700 hover:underline">{x.title}</Link></td><td className={td}>{aud[x.audience]}</td><td className={td}>{x.sort}</td><td className={td}><Badge tone={x.status === "published" ? "green" : "slate"}>{x.status === "published" ? "فعال" : "پیش‌نویس"}</Badge></td></tr>)}
        {c.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-500">دوره‌ای ثبت نشده است.</td></tr>}</tbody></table></Card></>);
}
