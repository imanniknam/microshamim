import Link from "next/link";
import { listPosts } from "@/lib/server/data";
import { Badge, Card, LinkBtn, Title, fdate, td, th } from "@/components/admin/ui";

export const metadata = { title: "مجله" };

export default function PostsAdmin() {
  const posts = listPosts(false, 500);
  return (
    <>
      <Title sub={`${posts.length.toLocaleString("fa-IR")} مطلب`} actions={<LinkBtn href="/admin/posts/new" primary>+ مطلب جدید</LinkBtn>}>مجله شمیم</Title>
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full min-w-[620px]"><thead className="border-b bg-slate-50"><tr><th className={th}>عنوان</th><th className={th}>دسته</th><th className={th}>وضعیت</th><th className={th}>تاریخ انتشار</th></tr></thead>
          <tbody className="divide-y">{posts.map((p) => (
            <tr key={p.id}><td className={td}><Link href={`/admin/posts/${p.id}`} className="font-bold text-violet-700 hover:underline">{p.title}</Link></td><td className={td}>{p.category || "—"}</td>
              <td className={td}><Badge tone={p.status === "published" ? "green" : "slate"}>{p.status === "published" ? "منتشر شده" : "پیش‌نویس"}</Badge></td><td className={td + " text-slate-500"}>{fdate(p.published_at ?? p.created_at)}</td></tr>))}
            {posts.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-500">هنوز مطلبی نوشته نشده است.</td></tr>}</tbody></table>
      </Card>
    </>
  );
}
