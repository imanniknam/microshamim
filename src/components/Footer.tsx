import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { Doodle } from "./ui/Doodle";
import { Icon, type IconName } from "./ui/Icon";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";

const SOCIAL: { key: keyof SiteSettings["socials"]; label: string; icon: IconName }[] = [
  { key: "instagram", label: "اینستاگرام", icon: "insta" },
  { key: "telegram", label: "تلگرام", icon: "send" },
  { key: "whatsapp", label: "واتساپ", icon: "chat" },
  { key: "linkedin", label: "لینکدین", icon: "link" },
  { key: "aparat", label: "آپارات", icon: "play" },
];
const fa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export function Footer({ site }: { site: SiteSettings }) {
  const socials = SOCIAL.filter((s) => site.socials[s.key]);
  const year = fa(new Date().toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric" }).replace(/\D/g, ""));
  return (
    <footer id="contact" className="footer-reveal on-dark relative bg-navy text-white overflow-hidden" data-footer>
      <div aria-hidden className="absolute inset-0 opacity-[.06] pointer-events-none" style={{ backgroundImage: "url(/assets/shamim/textures/paper.jpg)", backgroundSize: "480px", mixBlendMode: "screen" }} />
      <Doodle name="doodles/leaf-purple" w={120} className="-bottom-4 start-3 opacity-90" rotate={-12} />
      <Doodle name="doodles/leaf-dark-tall" w={90} className="-bottom-3 end-4 opacity-90 hidden sm:block" rotate={12} style={{ filter: "hue-rotate(60deg) brightness(1.3)" }} />

      <div className="container-x relative z-10 pt-12 pb-8 lg:pt-24">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.9fr_1.3fr] lg:gap-12">
          <div>
            <Logo className="[&_span:last-child]:text-white" />
            <p className="mt-4 text-white/70 text-[0.95rem] max-w-xs">{site.footerAbout}</p>
          </div>
          <nav aria-label="دسترسی سریع">
            <h2 className="font-display font-black text-base text-yellow">دسترسی سریع</h2>
            <ul className="mt-4 grid gap-2 text-white/80 text-[0.95rem]">
              {site.footerLinks.map((l) => (
                <li key={l.label}><Link href={l.href} className="hover:text-yellow transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-display font-black text-base text-yellow">ارتباط با ما</h2>
            <ul className="mt-4 grid gap-2 text-white/80 text-[0.95rem]">
              <li><Link href="/contact" className="hover:text-yellow transition-colors">تماس با ما</Link></li>
              <li><Link href="/request/visit" className="hover:text-yellow transition-colors">درخواست بازدید</Link></li>
              <li><Link href="/request/studio" className="hover:text-yellow transition-colors">رزرو استودیو</Link></li>
              {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-yellow transition-colors">{site.phone}</a></li>}
              {site.email && <li><a href={`mailto:${site.email}`} className="hover:text-yellow transition-colors">{site.email}</a></li>}
              {site.address && <li className="text-white/65">{site.address}</li>}
            </ul>
            {socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3" aria-label="شبکه‌های اجتماعی">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a href={site.socials[s.key]} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid place-items-center size-10 rounded-full border-2 border-white/25 hover:bg-yellow hover:text-navy hover:border-yellow transition-colors">
                      <Icon name={s.icon} className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="font-display font-black text-base text-yellow">عضویت در خبرنامه</h2>
            <p className="mt-3 mb-4 text-white/70 text-[0.9rem]">از رویدادها و دوره‌های تازه، اول از همه خبردار شو.</p>
            <Newsletter />
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-white/60 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} — {site.copyright}</p>
          <p>
            طراحی و توسعه:{" "}
            <a href="https://shamimhouse.ir" target="_blank" rel="noopener noreferrer" className="font-bold text-white/90 underline decoration-yellow decoration-2 underline-offset-4 hover:text-yellow transition-colors">
              خانه شمیم
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
