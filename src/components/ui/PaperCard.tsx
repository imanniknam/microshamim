import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

/** Paper sheet with soft real-world shadow and a controlled rotation. */
export function PaperCard({
  rotate = 0,
  className,
  style,
  children,
  as: Tag = "div",
  ...rest
}: {
  rotate?: number;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  as?: "div" | "article" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cn("paper-card", className)} style={{ rotate: `${rotate}deg`, ...style }} {...(rest as object)}>
      {children}
    </Tag>
  );
}
