import type { Metadata } from "next";
import { FORMS } from "@/lib/forms";
import { RequestForm } from "@/components/RequestForm";
import { Icon } from "@/components/ui/Icon";
import { Btn } from "@/components/ui/Button";
import { getSite } from "@/lib/server/data";

export const metadata: Metadata = { title: "تماس با ما", description: "با میکروشمیم در تماس باش؛ پیام بفرست یا درخواست بازدید ثبت کن." };

export default function ContactPage() {
  const site = getSite();
  const items = [
    site.phone && { icon: "send" as const, label: "تلفن", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, ltr: true },
    site.email && { icon: "chat" as const, label: "ایمیل", value: site.email, href: `mailto:${site.email}`, ltr: true },
    site.address && { icon: "building" as const, label: "نشانی", value: site.address },
    site.hours && { icon: "calendar" as const, label: "ساعت کاری", value: site.hours },
  ].filter(Boolean) as { icon: "send"; label: string; value: string; href?: string; ltr?: boolean }[];
  return (
    <section className="relative overflow-x-clip pt-[calc(var(--header-h)+28px)] pb-16 lg:pb-24 paper-fibre">
      <div className="container-x grid gap-9 lg:gap-14 lg:grid-cols-[.85fr_1.15fr] items-start">
        <div data-reveal>
          <p className="hand text-lg text-purple">تماس با ما</p>
          <h1 className="display-lg mt-1"><span className="marker">{FORMS.contact.title}</span></h1>
          <p className="lead mt-5 text-navy/80">{FORMS.contact.intro}</p>
          {items.length > 0 && (
            <ul className="mt-7 grid gap-3">
              {items.map((it) => (
                <li key={it.label} className="flex items-center gap-3 rounded-2xl border-2 border-navy bg-paper px-4 py-3 shadow-[4px_5px_0_-1px_#10162f]">
                  <span className="grid size-10 place-items-center rounded-full bg-lavender border-2 border-navy"><Icon name={it.icon} className="size-5" /></span>
                  <span><span className="block text-xs text-navy/60">{it.label}</span>
                    {it.href ? <a href={it.href} dir={it.ltr ? "ltr" : undefined} className="font-bold hover:text-purple">{it.value}</a> : <span className="font-bold">{it.value}</span>}</span>
                </li>
              ))}
            </ul>
          )}
          {site.mapUrl && <div className="mt-5"><Btn href={site.mapUrl} variant="outline" icon="arrow-end">مسیریابی روی نقشه</Btn></div>}
          <div className="mt-6"><Btn href="/request/visit" variant="yellow" icon="arrow-end">درخواست بازدید از میکروشمیم</Btn></div>
        </div>
        <div className="paper-card relative rounded-[22px] p-5 sm:p-8" data-reveal>
          <RequestForm def={FORMS.contact} />
        </div>
      </div>
    </section>
  );
}
