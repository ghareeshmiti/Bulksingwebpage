import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Download, PenLine } from "lucide-react";
import { Reveal } from "@/components/shared";

const EASE = [0.22, 1, 0.36, 1];
const PHASE_MS = 3200;

const PHASES = [
  { label: "Drop the PDF", caption: "Drag your PDF document into the BulkSigner window." },
  { label: "Position the signature", caption: "Place the visible signature exactly where it belongs on the page." },
  { label: "Dongle signs locally", caption: "The connected mToken USB DSC applies the Class 3 signature." },
  { label: "Signed output", caption: "The signed PDF is ready to export — nothing ever leaves your desktop." },
];

const Zone = ({ title, active, children, testid }) => (
  <div
    data-testid={testid}
    className={`relative flex h-56 flex-col items-center justify-center rounded-xl border p-3 transition-[border-color,background-color] duration-500 ${
      active
        ? "border-emerald-500/50 bg-emerald-500/[0.06]"
        : "border-white/10 bg-white/[0.02]"
    }`}
  >
    <span
      className={`font-mono2 absolute left-3 top-2.5 text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 ${
        active ? "text-emerald-400" : "text-zinc-600"
      }`}
    >
      {title}
    </span>
    {children}
  </div>
);

const PdfDoc = ({ stamped, faded = false }) => (
  <div
    className={`relative h-36 w-28 overflow-hidden rounded-md bg-white p-2.5 shadow-xl ${
      faded ? "opacity-40" : ""
    }`}
  >
    <div className="mb-1.5 h-1.5 w-3/5 rounded bg-zinc-300" />
    <div className="space-y-1">
      {[100, 90, 100, 95, 70].map((w, i) => (
        <div key={i} className="h-1 rounded bg-zinc-200" style={{ width: `${w}%` }} />
      ))}
    </div>
    {stamped && (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute bottom-2 right-2 flex items-center gap-1 border border-dashed border-zinc-400 bg-white px-1.5 py-1"
      >
        <CheckCircle2 size={9} className="text-emerald-600" />
        <span>
          <span className="block text-[5px] font-semibold leading-tight text-zinc-700">
            Digitally signed by
          </span>
          <span className="block text-[5px] leading-tight text-zinc-500">
            Class 3 Organization · 2026.04.02
          </span>
        </span>
      </motion.div>
    )}
  </div>
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
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          connected ? "animate-status-pulse bg-emerald-400" : "bg-zinc-600"
        }`}
      />
    </div>
  </div>
);

export default function SigningFlow() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), PHASE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <Reveal delay={0.15}>
      <div data-testid="signing-flow" className="mt-20">
        <p className="font-mono2 mb-3 text-xs uppercase tracking-[0.35em] text-emerald-400">
          Pictorial flow
        </p>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Watch One PDF Travel Through BulkSigner
          </h3>
          <p data-testid="flow-caption" className="max-w-md text-sm text-zinc-400">
            {PHASES[phase].caption}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl md:p-7">
          <div className="relative grid gap-4 md:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent md:block" />

            <Zone title="01 · Inbox" active={phase === 0} testid="flow-zone-inbox">
              {phase === 0 ? (
                <motion.div
                  data-testid="flow-pdf-actor"
                  initial={{ y: -46, opacity: 0, rotate: -8 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <PdfDoc />
                </motion.div>
              ) : (
                <PdfDoc faded />
              )}
            </Zone>

            <Zone title="02 · Page" active={phase === 1} testid="flow-zone-page">
              <div className="relative">
                <PdfDoc stamped={phase >= 2} />
                {phase === 1 && (
                  <motion.div
                    data-testid="flow-chip-actor"
                    initial={{ x: -60, y: 46, opacity: 0 }}
                    animate={{ x: 14, y: 26, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 z-10 flex items-center gap-1 rounded-md border border-dashed border-emerald-500 bg-[#121214] px-2 py-1 text-[9px] text-emerald-300 shadow-lg"
                  >
                    <PenLine size={9} /> Signature
                  </motion.div>
                )}
              </div>
            </Zone>

            <Zone title="03 · USB Dongle" active={phase === 2} testid="flow-zone-dongle">
              <motion.div
                animate={phase >= 2 ? { x: 0, opacity: 1 } : { x: 56, opacity: 0.35 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Dongle connected={phase >= 2} />
              </motion.div>
              {phase === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 w-full max-w-[130px]"
                >
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.2, ease: "easeInOut" }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>
                  <p className="font-mono2 mt-1.5 text-center text-[8px] uppercase tracking-[0.2em] text-emerald-400">
                    Signing…
                  </p>
                </motion.div>
              )}
            </Zone>

            <Zone title="04 · Output" active={phase === 3} testid="flow-zone-output">
              {phase === 3 ? (
                <motion.div
                  data-testid="flow-output-actor"
                  initial={{ x: -70, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="relative"
                >
                  <PdfDoc stamped />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[#09090B] shadow-lg"
                  >
                    <CheckCircle2 size={15} />
                  </motion.span>
                </motion.div>
              ) : (
                <div className="flex h-36 w-28 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-white/15 text-zinc-600">
                  <Download size={16} />
                  <span className="text-[9px]">Signed PDF lands here</span>
                </div>
              )}
            </Zone>
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
                <FileText size={12} className={phase === i ? "text-emerald-400" : "text-zinc-600"} />
                {p.label}
                {phase === i && (
                  <motion.span
                    layoutId="flow-dot"
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  />
                )}
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
