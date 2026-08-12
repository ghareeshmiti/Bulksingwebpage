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

const STEP_CAPTIONS = [
  "Watching the desktop workflow…",
  "Clicking Select PDF — one document added",
  "Clicking Select Folder — all PDFs in the folder added",
  "Clicking clear — the batch is emptied",
];

const DEMO_SET = [
  { name: "Vendor-Agreement-2026.pdf", size: "1.2 MB" },
  { name: "Board-Resolution-04.pdf", size: "860 KB" },
  { name: "Compliance-Report-Q2.pdf", size: "2.4 MB" },
  { name: "Site-Certificate-118.pdf", size: "640 KB" },
];

const SelectPanel = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 2800);
    return () => clearInterval(t);
  }, []);

  const files = step === 2 ? DEMO_SET : step === 1 ? DEMO_SET.slice(0, 1) : [];
  const activeSide = step === 1 ? "Select PDF" : step === 2 ? "Select Folder" : null;
  const cursor =
    step === 1
      ? { x: 62, y: 96 }
      : step === 2
        ? { x: 62, y: 130 }
        : step === 3
          ? { x: 218, y: 20 }
          : { x: 40, y: 40 };

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#121214]/90 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-500/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
          <span className="font-mono2 ml-2 text-[10px] text-zinc-500">DSC BulkSigner — Select Documents</span>
        </div>

        <div className="relative flex h-[380px]">
          <motion.div
            data-testid="workflow-demo-cursor"
            animate={{ left: cursor.x, top: cursor.y }}
            transition={{ duration: 0.7, ease: EASE }}
            className="pointer-events-none absolute z-30"
          >
            {step > 0 && (
              <motion.span
                key={`ripple-${step}`}
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute -left-2 -top-2 h-6 w-6 rounded-full border-2 border-emerald-400"
              />
            )}
            <MousePointer2 size={17} className="fill-[#121214] text-emerald-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
          </motion.div>

          <div className="hidden w-36 shrink-0 flex-col gap-1 border-r border-white/10 bg-white/[0.02] p-2.5 sm:flex">
            <p className="font-heading mb-2 flex items-center gap-1.5 px-1 text-[11px] font-bold">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/15">
                <FileText size={10} className="text-emerald-400" />
              </span>
              BulkSigner
            </p>
            {["Dashboard", "Select PDF", "Select Folder", "History", "Settings"].map((item) => (
              <motion.span
                key={item}
                data-testid={item === "Select PDF" ? "workflow-select-pdf-btn" : item === "Select Folder" ? "workflow-select-folder-btn" : undefined}
                animate={{ scale: activeSide === item ? [1, 0.94, 1] : 1 }}
                transition={{ duration: 0.35 }}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] transition-[background-color,color] duration-300 ${
                  activeSide === item ? "bg-emerald-500/20 text-emerald-300" : "text-zinc-400"
                }`}
              >
                {item === "Dashboard" && <FolderOpen size={11} />}
                {item === "Select PDF" && <FileText size={11} />}
                {item === "Select Folder" && <FolderOpen size={11} />}
                {item === "History" && <X size={11} />}
                {item === "Settings" && <Settings2 size={11} />}
                {item}
              </motion.span>
            ))}
            <span className="mt-auto px-1 font-mono2 text-[8px] text-zinc-600">Version 2.0.0</span>
          </div>

          <div className="flex w-52 shrink-0 flex-col gap-2.5 border-r border-white/10 p-3">
            <p className="flex items-center justify-between text-[11px] font-semibold text-white">
              Files
              <motion.span
                data-testid="workflow-clear-selection-btn"
                animate={{ scale: step === 3 ? [1, 0.8, 1] : 1, color: step === 3 ? "#F87171" : "#71717A" }}
                transition={{ duration: 0.35 }}
              >
                <X size={12} />
              </motion.span>
            </p>
            <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-white/15 py-3 text-zinc-500">
              <FolderOpen size={14} />
              <p className="text-[9px]">Drop PDF files here</p>
              <p className="text-[7px] text-zinc-600">or click to browse</p>
            </div>
            <div className="flex-1 space-y-1.5 overflow-hidden">
              <AnimatePresence initial={false}>
                {files.map((f, i) => (
                  <motion.div
                    key={f.name}
                    layout
                    initial={{ opacity: 0, x: 28, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4, delay: step === 2 ? i * 0.15 : 0, ease: EASE }}
                    className="flex items-center gap-2 rounded-lg bg-emerald-500/[0.06] px-2 py-1.5"
                  >
                    <span className="rounded bg-red-500/15 px-1 font-mono2 text-[7px] font-bold text-red-400">PDF</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[9px] text-zinc-200">{f.name}</span>
                      <span className="block text-[7px] text-zinc-600">{f.size}</span>
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="space-y-1.5">
              <p className="text-[8px] text-zinc-500">Pages: <span className="text-zinc-300">All Pages</span></p>
              <div className="flex items-center justify-center gap-1 rounded-lg border border-dashed border-emerald-500/50 bg-emerald-500/[0.06] py-1.5 text-[9px] text-emerald-300">
                Drag to Sign
              </div>
            </div>
          </div>

          <div className="relative hidden flex-1 bg-white/[0.02] p-3 md:block">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-[9px] text-zinc-400">
              <span>Pages: {files.length > 0 ? 1 : 0}</span>
              <span className="ml-auto" data-testid="workflow-file-count">{files.length} files selected</span>
            </div>
            <AnimatePresence mode="wait">
              {files.length > 0 ? (
                <motion.div
                  key="doc"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="mx-auto mt-3 h-[290px] w-full max-w-[220px] overflow-hidden rounded-md bg-white p-4 shadow-xl"
                >
                  <div className="mb-1 h-1.5 w-2/5 rounded bg-zinc-300" />
                  <div className="mb-2 h-1 w-1/4 rounded bg-zinc-200" />
                  <div className="space-y-1.5 pt-2">
                    {[100, 92, 100, 96, 88, 100, 76].map((w, i) => (
                      <div key={i} className="h-1 rounded bg-zinc-200" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <div className="h-8 w-16 rounded-sm border border-dashed border-zinc-300" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col items-center justify-center gap-2 text-zinc-600"
                >
                  <FileText size={20} />
                  <p className="text-[10px]">Select a PDF or folder to preview</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p data-testid="workflow-demo-caption" className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
        <span className="h-1.5 w-1.5 animate-status-pulse rounded-full bg-emerald-400" />
        {STEP_CAPTIONS[step]}
      </p>
      <p className="mt-1 text-[11px] text-zinc-600">
        Auto-playing recreation of the real BulkSigner desktop window — no live product capture.
      </p>
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
    <section data-testid="product-interface-section" className="relative bg-[#0D0D0F] py-16 lg:py-20">
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
