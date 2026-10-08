import { Btn } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Doodle";

export default function NotFound() {
  return (
    <section className="relative overflow-x-clip pt-[calc(var(--header-h)+60px)] pb-24 text-center paper-fibre min-h-[80svh]">
      <div className="container-x relative">
        <p className="font-display font-black text-[7rem] leading-none text-purple">۴۰۴</p>
        <h1 className="display-md mt-2">این صفحه را پیدا نکردیم</h1>
        <p className="lead mt-3 text-navy/70">شاید آدرس تغییر کرده یا هنوز منتشر نشده است.</p>
        <div className="mt-6 flex justify-center gap-3"><Btn href="/" variant="purple" icon="arrow-end">بازگشت به خانه</Btn><Btn href="/contact" variant="outline">تماس با ما</Btn></div>
        <Doodle name="doodles/doodle-arrow-bend" w={120} className="top-4 start-[12%] hidden md:block" rotate={20} />
        <Doodle name="doodles/doodle-star-yellow" w={50} className="bottom-6 end-[14%]" />
      </div>
    </section>
  );
}
