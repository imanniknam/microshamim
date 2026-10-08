import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionRoot } from "@/components/MotionRoot";
import { getSite } from "@/lib/server/data";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();
  return (
    <>
      <a href="#main" className="skip-link">پرش به محتوای اصلی</a>
      <div className="grain-overlay" aria-hidden="true" />
      <Header nav={site.nav} cta={site.headerCta} />
      <main id="main" className="main-over">{children}</main>
      <Footer site={site} />
      <MotionRoot />
    </>
  );
}
