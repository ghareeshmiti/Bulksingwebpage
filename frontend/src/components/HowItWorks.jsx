import { FolderOpen, Usb, PenLine, FileCheck2 } from "lucide-react";
import { Reveal, ChapterHeader } from "@/components/shared";

const STEPS = [
  {
    icon: FolderOpen,
    title: "Select PDFs or Folders",
    desc: "Add an individual PDF or select an entire folder for bulk signing.",
  },
  {
    icon: Usb,
    title: "Download or Configure the DSC",
    desc: "Install BulkSigner if required, connect your mToken and select the available certificate.",
  },
  {
    icon: PenLine,
    title: "Sign in Bulk or Individually",
    desc: "Choose the documents, configure the visible signature and start signing.",
  },
  {
    icon: FileCheck2,
    title: "Verify and Export",
    desc: "Review the signing status and export the successfully signed documents.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="relative py-28 lg:py-36">
      <div className="glow-emerald pointer-events-none absolute -left-32 top-1/3 h-[520px] w-[520px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="04"
          overline="How it works"
          title="From PDF Selection to Signed Document"
          description="Complete the signing workflow in four clear steps — no uploads, no manual page-by-page signing."
        />
        <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent xl:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div
                data-testid={`how-it-works-step-${i + 1}`}
                className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-transform duration-500 group-hover:scale-110">
                    <s.icon size={22} />
                  </span>
                  <span className="font-heading text-4xl font-extrabold text-white/[0.07] transition-colors duration-500 group-hover:text-emerald-500/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="font-mono2 mb-2 text-[10px] uppercase tracking-[0.25em] text-emerald-500">
                  Step {i + 1}
                </p>
                <h3 className="font-heading text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
