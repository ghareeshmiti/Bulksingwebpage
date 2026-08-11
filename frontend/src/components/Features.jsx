import {
  FileSignature,
  FolderOpen,
  HardDrive,
  Move,
  BadgeCheck,
  ListChecks,
} from "lucide-react";
import { Reveal, ChapterHeader } from "@/components/shared";

const FEATURES = [
  {
    icon: FileSignature,
    title: "Single PDF Signing",
    desc: "Select and sign an individual PDF when only one document needs attention.",
    span: "md:col-span-2",
  },
  {
    icon: FolderOpen,
    title: "Folder-Based Bulk Signing",
    desc: "Select a folder and process multiple supported PDF documents through one signing workflow.",
    span: "md:col-span-1",
  },
  {
    icon: HardDrive,
    title: "Local Processing",
    desc: "Process documents through the desktop application without uploading PDF files to the website.",
    span: "md:col-span-1",
  },
  {
    icon: Move,
    title: "Visible Signature Placement",
    desc: "Choose the supported page, position and size before applying the visible signature.",
    span: "md:col-span-2",
  },
  {
    icon: BadgeCheck,
    title: "Certificate Visibility",
    desc: "Review the connected token, selected certificate, issuer and certificate validity.",
    span: "md:col-span-1",
  },
  {
    icon: ListChecks,
    title: "Clear Signing Status",
    desc: "See whether each selected PDF is ready, signing, signed or failed.",
    span: "md:col-span-2",
  },
];

export default function Features() {
  return (
    <section id="features" data-testid="features-section" className="relative py-28 lg:py-36">
      <div className="glow-emerald pointer-events-none absolute right-0 top-24 h-[480px] w-[480px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="02"
          overline="Core benefits"
          title="Built for Faster Desktop PDF Signing"
          description="Reduce repetitive document selection and signature placement while keeping PDF processing within the desktop application."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className={f.span}>
              <div
                data-testid={`feature-card-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/0 blur-3xl transition-[background-color] duration-700 group-hover:bg-emerald-500/15" />
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-transform duration-500 group-hover:scale-110">
                  <f.icon size={22} />
                </span>
                <h3 className="font-heading text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                <span className="font-mono2 absolute bottom-5 right-6 text-[10px] text-zinc-600 transition-colors duration-500 group-hover:text-emerald-500/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
