import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FORMS } from "@/lib/forms";
import { RequestForm } from "@/components/RequestForm";
import { Doodle } from "@/components/ui/Doodle";
import type { FormType } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const d = FORMS[type as FormType];
  return d ? { title: d.title, description: d.intro } : {};
}

export default async function RequestPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const def = FORMS[type as FormType];
  if (!def) notFound();
  return (
    <section className="relative overflow-x-clip pt-[calc(var(--header-h)+28px)] pb-16 lg:pb-24 paper-fibre min-h-[80svh]">
      <div className="container-x grid gap-8 lg:gap-14 lg:grid-cols-[.85fr_1.15fr] items-start">
        <div className="relative" data-reveal>
          <p className="hand text-lg text-purple">فرم درخواست</p>
          <h1 className="display-lg mt-1"><span className="marker">{def.title}</span></h1>
          <p className="lead mt-5 text-navy/80">{def.intro}</p>
          <Doodle name="doodles/doodle-arrow-bend" w={110} className="static mt-6 hidden lg:block" rotate={160} />
          <Doodle name="doodles/doodle-crown" w={70} className="top-0 end-4 hidden lg:block" rotate={8} />
        </div>
        <div className="paper-card relative rounded-[22px] p-5 sm:p-8" style={{ rotate: "-0.5deg" }} data-reveal>
          <span className="tape -top-3 start-1/2 -ms-12" style={{ ["--tape" as string]: "var(--color-yellow)" }} />
          <RequestForm def={def} />
        </div>
      </div>
    </section>
  );
}
