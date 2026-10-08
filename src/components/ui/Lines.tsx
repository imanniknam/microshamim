import type { ElementType } from "react";

/** Headline split into hand-authored lines; each line sits in a mask so it can slide up on reveal. */
export function Lines({ lines, as: Tag = "span", className }: { lines: React.ReactNode[]; as?: ElementType; className?: string }) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span className="line-mask" key={i} data-line>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
