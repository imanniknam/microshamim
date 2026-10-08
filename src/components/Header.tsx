"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "./ui/Icon";
import { Btn } from "./ui/Button";

export function Header({ nav, cta }: { nav: { label: string; href: string }[]; cta: { label: string; href: string } }) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCompact(window.scrollY > 40));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`} data-header>
      <div className="bar">
        <Link href="/" aria-label="میکروشمیم — صفحه اصلی" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="منوی اصلی" className="hidden xl:flex items-center gap-[clamp(10px,1.35vw,22px)] ms-4">
          {nav.map((n) => (
            <Link key={n.label} href={n.href} className="nav-link" aria-current={n.href === pathname ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-3">
          <Btn href={cta.href} variant="yellow" icon="plus" small className="hidden md:inline-flex">
            {cta.label}
          </Btn>
          <button
            className="xl:hidden grid place-items-center size-11 rounded-full border-2 border-navy bg-paper"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile paper menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="xl:hidden fixed inset-0 top-0 z-[-1] bg-cream pt-28 px-[var(--gutter)] pb-10 overflow-y-auto"
      >
        <ul className="grid gap-1">
          {nav.map((n, i) => (
            <li key={n.label}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 border-b-2 border-dashed border-navy/15 font-display font-extrabold text-2xl"
              >
                <span>{n.label}</span>
                <span className="text-sm text-purple font-body">{(i + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Btn href={cta.href} variant="yellow" icon="plus" className="w-full justify-center">
            {cta.label}
          </Btn>
        </div>
      </div>
    </header>
  );
}
