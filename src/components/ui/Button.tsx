import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  variant?: "purple" | "outline" | "yellow" | "navy";
  icon?: IconName | "arrow-end";
  small?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** In RTL the leading edge is the right: a `plus`/icon sits before text, `arrow` after (visually left). */
export function Btn({ href, variant = "purple", icon, small, className, children }: Props) {
  const isArrow = icon === "arrow-end" || icon === "arrow";
  const cls = cn("btn", `btn-${variant}`, small && "btn-sm", className);
  const inner = (
    <>
      {icon && !isArrow && <Icon name={icon as IconName} />}
      <span>{children}</span>
      {isArrow && <Icon name="arrow" className="arrow" />}
    </>
  );
  if (/^(https?:|mailto:|tel:)/.test(href)) return <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{inner}</a>;
  return <Link href={href} className={cls}>{inner}</Link>;
}
