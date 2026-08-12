import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  FolderOpen,
  X,
  Settings2,
  FileCheck2,
  MousePointerClick,
  MousePointer2,
} from "lucide-react";
import { Reveal, ChapterHeader, StatusBadge, SignatureStamp } from "@/components/shared";
import AppTour from "@/components/AppTour";

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  { id: "select", label: "Select Documents", icon: MousePointerClick },
  { id: "configure", label: "Configure Signature", icon: Settings2 },
  { id: "export", label: "Sign and Export", icon: FileCheck2 },
];

const INITIAL_FILES = [
  "Vendor-Agreement-2026.pdf",
  "Board-Resolution-04.pdf",
  "Compliance-Report-Q2.pdf",
  "Site-Certificate-118.pdf",
];

const STEP_CAPTIONS = [
  "Watching the desktop workflow…",
  "Clicking Select PDF — one file added",
  "Clicking Select Folder — whole folder added",
  "Clicking Clear selection — list emptied",
];

const SelectPanel = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);

  const files = step === 2 ? INITIAL_FILES : step === 1 ? INITIAL_FILES.slice(0, 1) : [];
  const pressed = step === 1 ? "pdf" : step === 2 ? "folder" : step === 3 ? "clear" : null;
  const cursorY = step === 1 ? 26 : step === 2 ? 78 : step === 3 ? 128 : 26;
  const cursorX = step === 0 ? "18%" : "52%";

  const ActionButton = ({ id, active, primary, icon: Icon, children, testid }) => (
    <motion.div
      data-testid={testid}
      animate={{ scale: active ? [1, 0.94, 1] : 1 }}
      transition={{ duration: 0.35 }}
      className={`pointer-events-none flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-[border-color,background-color,color] duration-300 ${
        active
          ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-300"
          : primary
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
            : "border-white/15 text-zinc-300"
      }`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.div>
  );

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
      <div className="relative flex flex-col gap-3">
        <motion.div
          data-testid="workflow-demo-cursor"
          animate={{ left: cursorX, top: cursorY }}
          transition={{ duration: 0.7, ease: EASE }}
          className="pointer-events-none absolute z-20"
        >
          {pressed && (
            <motion.span
              key={`ripple-${step}`}
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -left-2 -top-2 h-6 w-6 rounded-full border-2 border-emerald-400"
            />
          )}
          <MousePointer2 size={18} className="fill-[#121214] text-emerald-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
        </motion.div>

        <ActionButton id="pdf" active={pressed === "pdf"} primary icon={FileText} testid="workflow-select-pdf-btn">
          Select PDF
        </ActionButton>
        <ActionButton id="folder" active={pressed === "folder"} icon={FolderOpen} testid="workflow-select-folder-btn">
          Select Folder
        </ActionButton>
        <ActionButton id="clear" active={pressed === "clear"} icon={X} testid="workflow-clear-selection-btn">
          Clear selection
        </ActionButton>

        <p data-testid="workflow-demo-caption" className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
          <span className="h-1.5 w-1.5 animate-status-pulse rounded-full bg-emerald-400" />
          {STEP_CAPTIONS[step]}
        </p>
        <p className="text-[11px] leading-relaxed text-zinc-600">
          Auto-playing demonstration of the BulkSigner desktop selection flow.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0D0D0F] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Selected files
          </p>
          <AnimatePresence mode="wait">
            <motion.span
              key={files.length}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              data-testid="workflow-file-count"
              className="font-mono2 text-[10px] text-emerald-400"
            >
              {files.length} files
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {files.map((f, i) => (
              <motion.div
                key={f}
                layout
                initial={{ opacity: 0, x: 32, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={{ duration: 0.4, delay: step === 2 ? i * 0.15 : 0, ease: EASE }}
                className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2"
              >
                <span className="flex items-center gap-2 text-xs text-zinc-300">
                  <FileText size={13} className="text-zinc-500" /> {f}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <X size={13} className="text-zinc-600" />
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          {files.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 py-8 text-zinc-600"
            >
              <FolderOpen size={18} />
              <p className="text-xs">No files selected — the demo adds them automatically.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConfigurePanel = () => (
  <div className="grid items-start gap-6 md:grid-cols-2">
    <div className="rounded-xl border border-white/10 bg-[#0D0D0F] p-5">
      <p className="font-mono2 mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        Certificate
      </p>
      <p className="font-heading text-lg font-bold">RAHUL MEHTA</p>
      <p className="text-xs text-emerald-400">Class 3 Individual · eMudhra Sub CA</p>
      <p className="mt-1 text-[11px] text-zinc-500">Valid till: 12 Mar 2028</p>
      <div className="mt-5 space-y-3">
        {[
          ["Page selection", "Last page"],
          ["Horizontal position", "58%"],
          ["Vertical position", "74%"],
          ["Signature size", "180 × 60 px"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">{k}</span>
            <span className="font-mono2 text-zinc-200">{v}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-white/10 bg-[#0D0D0F] p-5">
      <p className="font-mono2 mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        Signature preview
      </p>
      <div className="rounded-md bg-white/95 p-2">
        <SignatureStamp />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Preview the exact visible signature before it is applied to the selected PDFs.
      </p>
    </div>
  </div>
);

const ExportPanel = () => (
  <div className="rounded-xl border border-white/10 bg-[#0D0D0F] p-5">
    <div className="mb-4 flex items-center justify-between">
      <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        Signing run — 4 documents
      </p>
      <span className="font-mono2 text-[10px] text-emerald-400">3 signed · 1 ready</span>
    </div>
    <div className="space-y-2">
      {[
        ["Vendor-Agreement-2026.pdf", "Signed"],
        ["Board-Resolution-04.pdf", "Signed"],
        ["Compliance-Report-Q2.pdf", "Signed"],
        ["Site-Certificate-118.pdf", "Ready"],
      ].map(([f, s]) => (
        <div
          key={f}
          className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2"
        >
          <span className="flex items-center gap-2 text-xs text-zinc-300">
            <FileText size={13} className="text-zinc-500" /> {f}
          </span>
          <StatusBadge status={s} />
        </div>
      ))}
    </div>
    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "75%" }}
        transition={{ duration: 1.4, ease: EASE }}
        className="h-full rounded-full bg-emerald-500"
      />
    </div>
    <p className="mt-3 text-xs text-zinc-500">
      Review each status, then export the successfully signed PDF documents.
    </p>
  </div>
);

export default function Workflow() {
  const [active, setActive] = useState("select");

  return (
    <section data-testid="product-interface-section" className="relative bg-[#0D0D0F] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          overline="Product interface"
          title="Everything Needed for Desktop PDF Signing"
          description="Select documents, configure the certificate and visible signature, complete the signing process and export signed PDFs from one interface."
        />
        <Reveal>
          <div className="mb-8 flex flex-wrap gap-3">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                data-testid={`workflow-tab-${s.id}`}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm transition-[border-color,background-color,color] duration-300 ${
                  active === s.id
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:text-white"
                }`}
              >
                <span className="font-mono2 text-[10px] text-emerald-500">{`0${i + 1}`}</span>
                <s.icon size={15} />
                {s.label}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {active === "select" && <SelectPanel />}
                {active === "configure" && <ConfigurePanel />}
                {active === "export" && <ExportPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
        <AppTour />
      </div>
    </section>
  );
}
