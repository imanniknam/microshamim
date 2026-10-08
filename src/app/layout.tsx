import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const estedad = localFont({
  src: "../fonts/Estedad-VF.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const vazir = localFont({
  src: "../fonts/Vazirmatn-VF.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const hand = localFont({
  src: "../fonts/Lemonada-VF.woff2",
  variable: "--font-hand",
  weight: "400 700",
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const { getSite } = await import("@/lib/server/data");
  const { seo, name } = getSite();
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: { default: seo.title, template: `%s | ${name}` },
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description, locale: "fa_IR", type: "website", images: seo.ogImage ? [seo.ogImage] : undefined },
  };
}

export const viewport: Viewport = {
  themeColor: "#F7F0E4",
  width: "device-width",
  initialScale: 1,
};

/* Adds .motion-ok before first paint so the hero intro can start from its hidden state
   without a flash — never when the visitor prefers reduced motion, and it is removed again
   after 4.5s if the motion bundle never booted (so content can't stay hidden). */
const bootScript = `try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');setTimeout(function(){if(!window.__mo)d.classList.remove('motion-ok')},4500)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className={`${estedad.variable} ${vazir.variable} ${hand.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
