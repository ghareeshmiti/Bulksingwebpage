import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileSignature,
  FolderOpen,
  HardDrive,
  Move,
  BadgeCheck,
  ListChecks,
} from "lucide-react";
import { Reveal, ChapterHeader } from "@/components/shared";

const LOOP = { repeat: Infinity, ease: "easeInOut" };

const SignatureDrawVisual = () => (
  <svg viewBox="0 0 120 40" className="h-10 w-28" data-testid="visual-signature-draw">
    <motion.path
      d="M6 30 C 22 4, 32 44, 46 18 S 68 36, 84 14 S 104 30, 115 18"
      fill="none"
      stroke="#10B981"
      strokeWidth="2.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{ duration: 3.6, times: [0, 0.45, 0.75, 1], ...LOOP }}
    />
  </svg>
);

const BulkStackVisual = () => (
  <div className="relative h-11 w-28" data-testid="visual-bulk-stack">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute left-0 flex h-3.5 w-24 items-center rounded border border-emerald-500/30 bg-emerald-500/15 px-1"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: [-16, i * 13, i * 13], opacity: [0, 1, 1] }}
        transition={{ duration: 1.4, delay: i * 0.55, ...LOOP, repeatDelay: 1.4 }}
      >
        <span className="h-1 w-10 rounded bg-emerald-500/50" />
      </motion.div>
    ))}
  </div>
);

const LocalRadarVisual = () => (
  <div className="relative flex h-12 w-12 items-center justify-center" data-testid="visual-local-radar">
    {[0, 1].map((i) => (
      <motion.span
        key={i}
        className="absolute inset-0 rounded-full border border-emerald-500/50"
        initial={{ scale: 1, opacity: 0.7 }}
        animate={{ scale: 2.1, opacity: 0 }}
        transition={{ duration: 2, delay: i * 1, repeat: Infinity, ease: "easeOut" }}
      />
    ))}
    <HardDrive size={18} className="text-emerald-400" />
  </div>
);

const StampHopVisual = () => (
  <div className="relative h-12 w-16 overflow-hidden rounded-md bg-white/90 p-1" data-testid="visual-stamp-hop">
    <div className="space-y-0.5">
      {[100, 80, 100, 60].map((w, i) => (
        <div key={i} className="h-0.5 rounded bg-zinc-300" style={{ width: `${w}%` }} />
      ))}
    </div>
    <motion.div
      className="absolute h-3 w-7 rounded-sm border border-emerald-600 bg-emerald-500/60"
      animate={{ left: [4, 32, 32, 4], top: [4, 24, 24, 4] }}
      transition={{ duration: 4.5, times: [0, 0.35, 0.6, 1], ...LOOP }}
    />
  </div>
);

const CertScanVisual = () => (
  <div className="relative h-12 w-20 overflow-hidden rounded-md border border-emerald-500/30 bg-emerald-500/[0.06] p-1.5" data-testid="visual-cert-scan">
    <div className="mb-1 h-1 w-3/4 rounded bg-zinc-500/50" />
    <div className="mb-1 h-1 w-1/2 rounded bg-zinc-600/50" />
    <div className="h-1 w-2/3 rounded bg-emerald-500/40" />
    <motion.div
      className="absolute left-0 right-0 h-[3px] bg-emerald-400/60 blur-[1px]"
      animate={{ top: [2, 42, 2] }}
      transition={{ duration: 2.8, ...LOOP }}
    />
  </div>
);

const STATUS_CYCLE = [
  { label: "Ready", cls: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300" },
  { label: "Signing", cls: "border-amber-500/40 bg-amber-500/10 text-amber-400" },
  { label: "Signed", cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" },
];

const StatusCycleVisual = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % STATUS_CYCLE.length), 1300);
    return () => clearInterval(t);
  }, []);
  const s = STATUS_CYCLE[i];
  return (
    <div className="flex h-11 items-center" data-testid="visual-status-cycle">
      <motion.span
        key={s.label}
        initial={{ opacity: 0, y: 8, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className={`rounded-full border px-3 py-1 font-mono2 text-[10px] ${s.cls}`}
      >
        {s.label}
      </motion.span>
    </div>
  );
};

const FEATURES = [
  { icon: FileSignature, title: "Single PDF Signing", desc: "Select and sign an individual PDF when only one document needs attention.", span: "md:col-span-2", Visual: SignatureDrawVisual },
  { icon: FolderOpen, title: "Folder-Based Bulk Signing", desc: "Select a folder and process multiple supported PDF documents through one signing workflow.", span: "md:col-span-1", Visual: BulkStackVisual },
  { icon: HardDrive, title: "Local Processing", desc: "Process documents through the desktop application without uploading PDF files to the website.", span: "md:col-span-1", Visual: LocalRadarVisual },
  { icon: Move, title: "Visible Signature Placement", desc: "Choose the supported page, position and size before applying the visible signature.", span: "md:col-span-2", Visual: StampHopVisual },
  { icon: BadgeCheck, title: "Certificate Visibility", desc: "Review the connected token, selected certificate, issuer and certificate validity.", span: "md:col-span-1", Visual: CertScanVisual },
  { icon: ListChecks, title: "Clear Signing Status", desc: "See whether each selected PDF is ready, signing, signed or failed.", span: "md:col-span-2", Visual: StatusCycleVisual },
];

export default function Features() {
  return (
    <section id="features" data-testid="features-section" className="relative py-16 lg:py-20">
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
                <div className="flex items-start justify-between gap-4">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-transform duration-500 group-hover:scale-110">
                    <f.icon size={22} />
                  </span>
                  <span className="font-mono2 text-[10px] text-zinc-600 transition-colors duration-500 group-hover:text-emerald-500/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                <div className="mt-6 flex justify-end border-t border-white/[0.06] pt-5">
                  <f.Visual />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
