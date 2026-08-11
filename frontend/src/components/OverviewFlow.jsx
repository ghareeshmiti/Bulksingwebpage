import { motion } from "framer-motion";
import {
  FileText,
  FolderOpen,
  Usb,
  CheckCircle2,
  Download,
  PenLine,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/shared";

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  { label: "Select PDFs or folder", sub: "One file or many at once", scene: "select" },
  { label: "Connect the dongle", sub: "Plug the mToken into your PC", scene: "dongle" },
  { label: "Auto-detect and sign", sub: "Every file signed in one run", scene: "sign" },
  { label: "Download signed docs", sub: "Individually or all together", scene: "download" },
];

const SelectScene = () => (
  <div className="relative flex h-24 items-center justify-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
      <FolderOpen size={24} />
    </div>
    <div className="animate-float-slow absolute right-4 top-1 flex items-center gap-1 rounded-md border border-white/15 bg-[#121214] px-2 py-1 shadow-lg">
      <FileText size={10} className="text-red-400" />
      <span className="font-mono2 text-[8px] text-zinc-300">Agreement.pdf</span>
    </div>
    <div className="animate-float-slow absolute bottom-1 left-4 flex items-center gap-1 rounded-md border border-white/15 bg-[#121214] px-2 py-1 shadow-lg [animation-delay:1.2s]">
      <FileText size={10} className="text-red-400" />
      <span className="font-mono2 text-[8px] text-zinc-300">+12 files</span>
    </div>
  </div>
);

const DongleScene = () => (
  <div className="relative flex h-24 items-center justify-center gap-1">
    <div className="flex h-4 w-5 flex-col justify-center gap-0.5 rounded-l-sm bg-zinc-400 pl-1">
      <span className="h-0.5 w-2.5 rounded bg-zinc-500" />
      <span className="h-0.5 w-2.5 rounded bg-zinc-500" />
    </div>
    <div className="flex h-11 w-24 items-center justify-between rounded-r-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
      <span className="font-mono2 text-[9px] text-zinc-300">mToken</span>
      <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </div>
    <div className="ml-2 flex h-12 w-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.03]">
      <Usb size={14} className="text-zinc-500" />
    </div>
  </div>
);

const SignScene = () => (
  <div className="relative flex h-24 items-center justify-center">
    <div className="relative h-20 w-16 rounded-md bg-white p-2 shadow-xl">
      <div className="mb-1 h-1 w-3/5 rounded bg-zinc-300" />
      <div className="space-y-1">
        {[100, 85, 100].map((w, i) => (
          <div key={i} className="h-1 rounded bg-zinc-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 border border-dashed border-zinc-400 bg-white px-1 py-0.5">
        <CheckCircle2 size={7} className="text-emerald-600" />
        <span className="text-[5px] font-semibold text-zinc-700">Digitally signed</span>
      </div>
    </div>
    <div className="animate-float-slow absolute -right-1 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-[#09090B] shadow-[0_0_20px_rgba(16,185,129,0.45)]">
      <PenLine size={13} />
    </div>
  </div>
);

const DownloadScene = () => (
  <div className="relative flex h-24 items-center justify-center">
    <div className="flex h-14 w-16 flex-col items-center justify-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
      <Download size={20} className="text-emerald-400" />
      <span className="font-mono2 text-[7px] uppercase tracking-widest text-emerald-400">Signed</span>
    </div>
    <div className="animate-float-slow absolute right-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[#09090B] shadow-lg">
      <CheckCircle2 size={13} />
    </div>
    <div className="animate-float-slow absolute bottom-0 left-3 flex items-center gap-1 rounded-md border border-white/15 bg-[#121214] px-2 py-1 shadow-lg [animation-delay:1.5s]">
      <FileText size={9} className="text-emerald-400" />
      <span className="font-mono2 text-[8px] text-zinc-300">3 signed</span>
    </div>
  </div>
);

const SCENES = { select: SelectScene, dongle: DongleScene, sign: SignScene, download: DownloadScene };

export default function OverviewFlow() {
  return (
    <section data-testid="overview-flow" className="relative overflow-hidden border-t border-white/5 bg-[#0D0D0F] py-16">
      <div className="glow-emerald pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="font-mono2 mb-2 text-center text-[10px] uppercase tracking-[0.35em] text-emerald-400">
            The whole journey at a glance
          </p>
          <h2 className="font-heading mb-12 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Select · Connect · Sign · Download
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Scene = SCENES[s.scene];
            return (
              <Reveal key={s.label} delay={i * 0.12}>
                <div className="relative">
                  <div
                    data-testid={`overview-flow-step-${i + 1}`}
                    className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-heading text-2xl font-extrabold text-white/[0.08] transition-colors duration-500 group-hover:text-emerald-500/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono2 text-[9px] uppercase tracking-[0.2em] text-emerald-500/70">
                        Step {i + 1}
                      </span>
                    </div>
                    <Scene />
                    <h3 className="font-heading mt-3 text-sm font-bold tracking-tight">{s.label}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{s.sub}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: EASE }}
                      className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-500/40 bg-[#121214] text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.25)] lg:flex"
                    >
                      <ChevronRight size={15} />
                    </motion.span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
