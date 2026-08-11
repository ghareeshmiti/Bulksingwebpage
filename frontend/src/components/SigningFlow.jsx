import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  FolderOpen,
  CheckCircle2,
  Download,
  Usb,
  MonitorSmartphone,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/shared";

const EASE = [0.22, 1, 0.36, 1];
const PHASE_MS = 3600;

const PHASES = [
  { label: "Select PDFs or folder", caption: "Pick a single PDF or a whole folder — drag one file or many into BulkSigner." },
  { label: "Connect the dongle", caption: "Plug your mToken USB DSC into the PC — no setup needed at this step." },
  { label: "Auto-detect and sign", caption: "BulkSigner detects the dongle automatically and signs every file in the batch." },
  { label: "Download signed docs", caption: "Download the signed PDFs individually or all together — originals stay untouched." },
];

const FILES = ["Agreement-2026.pdf", "Certificate-118.pdf", "Report-Q2.pdf"];

const Panel = ({ title, active, children, testid, className = "" }) => (
  <div
    data-testid={testid}
    className={`relative flex flex-col rounded-xl border p-4 transition-[border-color,background-color] duration-500 ${
      active ? "border-emerald-500/50 bg-emerald-500/[0.05]" : "border-white/10 bg-white/[0.02]"
    } ${className}`}
  >
    <span
      className={`font-mono2 mb-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 ${
        active ? "text-emerald-400" : "text-zinc-500"
      }`}
    >
      {title}
    </span>
    {children}
  </div>
);

const MiniFile = ({ name, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: EASE }}
    className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5"
  >
    <FileText size={10} className="shrink-0 text-zinc-500" />
    <span className="truncate text-[9px] text-zinc-300">{name}</span>
  </motion.div>
);

const Dongle = ({ connected }) => (
  <div className="flex items-center" data-testid="flow-dongle">
    <div className="flex h-4 w-5 flex-col justify-center gap-0.5 rounded-l-sm bg-zinc-400 pl-1">
      <span className="h-0.5 w-2.5 rounded bg-zinc-500" />
      <span className="h-0.5 w-2.5 rounded bg-zinc-500" />
    </div>
    <div
      className={`flex h-10 w-24 items-center justify-between rounded-r-lg border px-2.5 transition-[border-color,background-color,box-shadow] duration-500 ${
        connected
          ? "border-emerald-500/60 bg-emerald-500/15 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
          : "border-white/15 bg-[#121214]"
      }`}
    >
      <span className="font-mono2 text-[9px] text-zinc-300">mToken</span>
      <span className={`h-1.5 w-1.5 rounded-full ${connected ? "animate-status-pulse bg-emerald-400" : "bg-zinc-600"}`} />
    </div>
  </div>
);

const StatusPill = ({ phase, rowIndex }) => {
  if (phase < 2) {
    return <span className="rounded-full border border-zinc-500/40 bg-zinc-500/10 px-2 py-0.5 font-mono2 text-[8px] text-zinc-400">Ready</span>;
  }
  if (phase === 2) {
    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: rowIndex * 0.55, ease: EASE }}
        className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono2 text-[8px] text-amber-400"
      >
        Signing…
      </motion.span>
    );
  }
  return (
    <motion.span
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, delay: rowIndex * 0.15, ease: EASE }}
      className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono2 text-[8px] text-emerald-400"
    >
      <CheckCircle2 size={8} /> Signed
    </motion.span>
  );
};

export default function SigningFlow() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), PHASE_MS);
    return () => clearInterval(t);
  }, []);

  const dongleConnected = phase >= 1;

  return (
    <Reveal delay={0.15}>
      <div data-testid="signing-flow" className="mt-20">
        <p className="font-mono2 mb-3 text-xs uppercase tracking-[0.35em] text-emerald-400">
          Pictorial flow
        </p>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            From Folder to Signed PDF, Automatically
          </h3>
          <p data-testid="flow-caption" className="max-w-md text-sm text-zinc-400">
            {PHASES[phase].caption}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl md:p-7">
          <div className="relative grid gap-4 lg:grid-cols-[1fr_1.5fr_1fr]">
            <div className="absolute left-[18%] right-[18%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent lg:block" />

            <Panel
              title={<><MonitorSmartphone size={11} /> 01 · Your files</>}
              active={phase === 0}
              testid="flow-zone-source"
              className="min-h-[300px]"
            >
              <div className="space-y-3">
                <div className={`rounded-lg border p-3 transition-[border-color] duration-500 ${phase === 0 ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/10"}`}>
                  <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-zinc-300">
                    <FileText size={11} className="text-emerald-400" /> Single PDF
                  </p>
                  <MiniFile name="Agreement-2026.pdf" />
                </div>
                <div className={`rounded-lg border p-3 transition-[border-color] duration-500 ${phase === 0 ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/10"}`}>
                  <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-zinc-300">
                    <FolderOpen size={11} className="text-emerald-400" /> Folder · 2 PDFs
                  </p>
                  <div className="space-y-1.5">
                    <MiniFile name="Certificate-118.pdf" />
                    <MiniFile name="Report-Q2.pdf" />
                  </div>
                </div>
                <p className="text-center text-[9px] text-zinc-600">
                  {phase === 0 ? "Dragging files into BulkSigner…" : "Drag one file or many"}
                </p>
              </div>
            </Panel>

            <Panel
              title={<><Zap size={11} /> 02 · BulkSigner app</>}
              active={phase === 0 || phase === 2}
              testid="flow-zone-app"
              className="min-h-[300px]"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold text-zinc-200">Signing batch</p>
                <AnimatePresence>
                  {dongleConnected && (
                    <motion.span
                      data-testid="flow-autodetect-badge"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[8px] text-emerald-400"
                    >
                      <Usb size={8} /> mToken auto-detected
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-3 space-y-2">
                {FILES.map((f, i) => (
                  <div
                    key={f}
                    data-testid={`flow-row-${i}`}
                    className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-[10px] text-zinc-300">
                      <FileText size={11} className="shrink-0 text-zinc-500" />
                      <span className="truncate">{f}</span>
                    </span>
                    <StatusPill phase={phase} rowIndex={i} />
                  </div>
                ))}
              </div>
              {phase === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.8, ease: "easeInOut" }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>
                  <p className="font-mono2 mt-1.5 text-center text-[8px] uppercase tracking-[0.2em] text-emerald-400">
                    Signing batch on the dongle…
                  </p>
                </motion.div>
              )}
              {phase === 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-4 text-center text-[10px] text-emerald-400"
                >
                  All 3 documents signed successfully
                </motion.p>
              )}
            </Panel>

            <div className="flex flex-col gap-4">
              <Panel
                title={<><Usb size={11} /> 03 · PC USB port</>}
                active={phase === 1}
                testid="flow-zone-dongle"
                className="flex-1"
              >
                <div className="flex flex-1 flex-col items-center justify-center gap-3">
                  <div className="relative w-full max-w-[170px] rounded-lg border border-white/15 bg-[#121214] p-2.5">
                    <p className="font-mono2 mb-2 text-[8px] uppercase tracking-[0.2em] text-zinc-500">Your PC</p>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-4 w-8 rounded-sm border transition-colors duration-500 ${dongleConnected ? "border-emerald-500/60 bg-emerald-500/20" : "border-zinc-600 bg-zinc-800"}`} />
                      <span className="font-mono2 text-[8px] text-zinc-600">USB</span>
                    </div>
                  </div>
                  <motion.div
                    animate={dongleConnected ? { y: -26, x: 0, opacity: 1 } : { y: 10, x: 26, opacity: 0.55 }}
                    transition={{ duration: 1, ease: EASE }}
                  >
                    <Dongle connected={dongleConnected} />
                  </motion.div>
                  <p className="text-center text-[9px] text-zinc-600">
                    {phase === 1 ? "Connecting dongle to the PC…" : dongleConnected ? "Dongle connected" : "Plug in your mToken"}
                  </p>
                </div>
              </Panel>

              <Panel
                title={<><Download size={11} /> 04 · Download</>}
                active={phase === 3}
                testid="flow-zone-output"
                className="flex-1"
              >
                <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
                  {phase === 3 ? (
                    <>
                      {FILES.map((f, i) => (
                        <motion.div
                          key={f}
                          data-testid={`flow-output-${i}`}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.2, ease: EASE }}
                          className="flex w-full items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] px-2.5 py-1.5"
                        >
                          <span className="flex min-w-0 items-center gap-1.5 text-[9px] text-zinc-200">
                            <CheckCircle2 size={10} className="shrink-0 text-emerald-400" />
                            <span className="truncate">{f}</span>
                          </span>
                          <Download size={10} className="shrink-0 text-emerald-400" />
                        </motion.div>
                      ))}
                      <motion.button
                        data-testid="flow-download-all-btn"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
                        className="btn-glow mt-1 flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2 text-[10px] font-bold text-[#09090B]"
                      >
                        <Download size={11} /> Download all signed
                      </motion.button>
                    </>
                  ) : (
                    <div className="flex h-full min-h-[90px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 text-zinc-600">
                      <Download size={15} />
                      <span className="px-3 text-center text-[9px]">Signed documents appear here</span>
                    </div>
                  )}
                </div>
              </Panel>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {PHASES.map((p, i) => (
              <button
                key={p.label}
                data-testid={`flow-phase-btn-${i}`}
                onClick={() => setPhase(i)}
                className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs transition-[border-color,background-color,color] duration-300 ${
                  phase === i
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                    : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-white"
                }`}
              >
                <span className="font-mono2 text-[9px] text-emerald-500">{`0${i + 1}`}</span>
                {p.label}
                {phase === i && <motion.span layoutId="flow-dot" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[11px] text-zinc-600">
          Animated recreation of the signing flow for illustration — no real product screens or images used.
        </p>
      </div>
    </Reveal>
  );
}
