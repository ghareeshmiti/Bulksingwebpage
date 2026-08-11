import {
  FileSignature,
  Award,
  ShieldCheck,
  FileBarChart2,
  CheckSquare,
  ClipboardList,
} from "lucide-react";
import { Reveal, ChapterHeader } from "@/components/shared";

const CASES = [
  { icon: FileSignature, title: "Agreements", desc: "Apply visible DSC signatures to approved agreement documents." },
  { icon: Award, title: "Certificates", desc: "Sign multiple certificate PDFs through a structured desktop workflow." },
  { icon: ShieldCheck, title: "Compliance Documents", desc: "Process approved compliance documents using the selected Class 3 certificate." },
  { icon: FileBarChart2, title: "Statements and Reports", desc: "Sign finalised business statements and PDF reports." },
  { icon: CheckSquare, title: "Approval Documents", desc: "Apply DSC signatures to documents after internal approval is completed." },
  { icon: ClipboardList, title: "Administrative Forms", desc: "Process approved forms and official PDF documents individually or in folders." },
];

export default function UseCases() {
  return (
    <section id="use-cases" data-testid="use-cases-section" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="05"
          overline="Use cases"
          title="Designed for Document-Intensive Teams"
          description="Use BulkSigner wherever teams regularly apply DSC signatures to individual PDFs or document folders."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div
                data-testid={`use-case-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40"
              >
                <div className="absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-emerald-500/0 blur-3xl transition-[background-color] duration-700 group-hover:bg-emerald-500/15" />
                <c.icon size={24} className="mb-5 text-emerald-400 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-heading text-lg font-bold tracking-tight">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
