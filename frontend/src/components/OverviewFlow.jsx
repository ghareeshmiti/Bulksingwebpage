import { motion } from "framer-motion";
import {
  FileText,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Check,
  CheckCircle2,
  Download,
  Usb,
} from "lucide-react";
import { Reveal } from "@/components/shared";

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  { label: "Select PDFs or folder", sub: "One file or many at once", scene: "select" },
  { label: "Connect the dongle", sub: "Plug the mToken into your PC", scene: "dongle" },
  { label: "Auto-detect and sign", sub: "Every file signed in one run", scene: "sign" },
  { label: "Download signed docs", sub: "Individually or all together", scene: "download" },
];

const MiniWindow = ({ title, children, className = "" }) => (
  <div className={`overflow-hidden rounded-lg border border-white/15 bg-[#121214] shadow-2xl ${className}`}>
    <div className="flex items-center gap-1 border-b border-white/10 bg-white/[0.03] px-2 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
      <span className="font-mono2 ml-1.5 text-[7px] uppercase tracking-wider text-zinc-500">{title}</span>
    </div>
    <div className="p-2">{children}</div>
  </div>
);

const FileRow = ({ name, checked = true, indent = false }) => (
  <div className={`flex items-center gap-1.5 rounded px-1 py-1 ${indent ? "ml-3" : ""}`}>
    <span className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-sm border ${checked ? "border-emerald-500 bg-emerald-500/20" : "border-zinc-600"}`}>
      {checked && <Check size={8} className="text-emerald-400" />}
    </span>
    <FileText size={9} className="shrink-0 text-red-400/80" />
    <span className="truncate text-[8px] text-zinc-300">{name}</span>
  </div>
);

const SelectScene = () => (
  <div className="flex h-28 items-center justify-center">
    <MiniWindow title="Select documents" className="w-[185px]">
      <div className="flex items-center gap-1.5 rounded bg-emerald-500/[0.08] px-1 py-1">
        <ChevronDown size={9} className="text-emerald-400" />
        <FolderOpen size={10} className="text-amber-400" />
        <span className="text-[8px] font-medium text-zinc-200">Certificates (12 PDFs)</span>
      </div>
      <FileRow name="Agreement-2026.pdf" indent />
      <FileRow name="Board-Resolution.pdf" indent />
      <div className="mt-1 flex items-center gap-1.5 rounded px-1 py-1">
        <ChevronRight size={9} className="text-zinc-600" />
        <FileText size={10} className="text-red-400/80" />
        <span className="text-[8px] text-zinc-400">Invoice-4471.pdf</span>
      </div>
    </MiniWindow>
  </div>
);

const DongleScene = () => (
  <div className="relative flex h-28 items-center justify-center">
    <div className="flex items-center">
      <div className="flex h-[18px] w-6 flex-col justify-center gap-[3px] rounded-l-sm bg-gradient-to-b from-zinc-300 to-zinc-500 pl-1.5">
        <span className="h-[2px] w-3 rounded bg-amber-400/80" />
        <span className="h-[2px] w-3 rounded bg-amber-400/80" />
      </div>
      <div className="flex h-11 w-[74px] flex-col justify-between rounded-r-md border border-zinc-700 bg-gradient-to-b from-[#26262b] to-[#141417] p-1.5 shadow-lg">
        <span className="font-mono2 text-[7px] tracking-wide text-zinc-300">mToken CryptoID</span>
        <span className="flex items-center justify-between">
          <span className="text-[6px] text-zinc-500">Class 3 DSC</span>
          <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
        </span>
      </div>
      <div className="ml-1.5 flex h-14 w-10 flex-col items-center justify-center gap-1 rounded-md border border-white/15 bg-[#17171b] shadow-inner">
        <span className="h-3.5 w-6 rounded-sm bg-emerald-500/25 ring-1 ring-emerald-500/50" />
        <Usb size={10} className="text-zinc-500" />
      </div>
    </div>
    <span className="absolute bottom-1 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[8px] text-emerald-400">
      <CheckCircle2 size={8} /> Auto-detected
    </span>
  </div>
);

const SignScene = () => (
  <div className="flex h-28 items-center justify-center">
    <div className="relative h-24 w-[84px] rounded-md bg-white p-2 shadow-2xl">
      <div className="mb-1 h-1 w-3/5 rounded bg-zinc-300" />
      <div className="space-y-[3px]">
        {[100, 88, 100, 94, 72].map((w, i) => (
          <div key={i} className="h-[3px] rounded bg-zinc-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1.5 rounded-sm border border-zinc-300 bg-white px-1.5 py-1 shadow-sm">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-emerald-600">
          <Check size={9} className="text-emerald-600" />
        </span>
        <span>
          <span className="block text-[5.5px] font-bold leading-tight text-zinc-800">Digitally signed by RAHUL MEHTA</span>
          <span className="block text-[5px] leading-tight text-zinc-500">eMudhra Sub CA · Class 3 · PAdES</span>
          <span className="block text-[5px] leading-tight text-zinc-500">2026-08-09 11:24 IST</span>
        </span>
      </div>
    </div>
  </div>
);

const DownloadScene = () => (
  <div className="flex h-28 items-center justify-center">
    <MiniWindow title="Downloads · signed" className="w-[185px]">
      {["Agreement-2026.pdf", "Certificate-118.pdf"].map((f) => (
        <div key={f} className="flex items-center justify-between rounded px-1 py-1">
          <span className="flex min-w-0 items-center gap-1.5">
            <CheckCircle2 size={9} className="shrink-0 text-emerald-400" />
            <span className="truncate text-[8px] text-zinc-300">{f}</span>
          </span>
          <Download size={9} className="shrink-0 text-emerald-400" />
        </div>
      ))}
      <div className="mt-1.5 flex items-center justify-center gap-1 rounded-md bg-emerald-500 py-1.5 text-[8px] font-bold text-[#09090B]">
        <Download size={9} /> Download all (12)
      </div>
    </MiniWindow>
  </div>
);

const SCENES = { select: SelectScene, dongle: DongleScene, sign: SignScene, download: DownloadScene };

export default function OverviewFlow() {
  return (
    <section data-testid="overview-flow" className="relative overflow-hidden border-t border-white/5 bg-[#0D0D0F] py-16">
      <div className="glow-emerald pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="font-heading mb-2 text-center text-xs font-medium uppercase tracking-[0.35em] text-emerald-400">
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
                      <span className="font-heading text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-500/70">
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
