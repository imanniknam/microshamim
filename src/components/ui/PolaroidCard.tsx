import { cn } from "@/lib/cn";
import { Photo } from "./Photo";

export function PolaroidCard({
  photo, pos, caption, rotate = 0, tape = "var(--color-yellow)", className, sizes = "(min-width:1024px) 320px, 70vw", aspect = "aspect-[4/3.4]", alt,
}: {
  photo: string; pos?: string; caption?: string; rotate?: number; tape?: string; className?: string; sizes?: string; aspect?: string; alt: string;
}) {
  return (
    <figure className={cn("polaroid m-0", className)} style={{ rotate: `${rotate}deg` }}>
      <div className={cn("relative overflow-hidden bg-navy/10", aspect)}>
        <Photo name={photo} alt={alt} sizes={sizes} pos={pos} />
      </div>
      {caption && <figcaption className="cap hand text-[0.95rem] text-navy">{caption}</figcaption>}
      <span className="tape -top-3 start-1/2 -ms-12" style={{ ["--tape" as string]: tape, rotate: `${-rotate * 1.5 - 3}deg` }} />
    </figure>
  );
}
