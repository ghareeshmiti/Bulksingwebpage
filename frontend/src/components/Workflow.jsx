import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  FileText,
  FolderOpen,
  X,
  Settings2,
  FileCheck2,
  MousePointerClick,
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

const SelectPanel = () => {
  const [files, setFiles] = useState(INITIAL_FILES);

  const addSingle = () => {
    if (files.includes(INITIAL_FILES[0])) {
      toast.info("That PDF is already in the list");
      return;
    }
    setFiles((prev) => [INITIAL_FILES[0], ...prev]);
    toast.success("1 PDF added to the selection");
  };

  const addFolder = () => {
    const merged = [...INITIAL_FILES];
    setFiles(merged);
    toast.success(`Folder added — ${INITIAL_FILES.length} PDFs found`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-3">
        <button
          data-testid="workflow-select-pdf-btn"
          onClick={addSingle}
          className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-3 text-sm font-medium text-emerald-300 transition-[background-color] duration-300 hover:bg-emerald-500/20"
        >
          <FileText size={16} /> Select PDF
        </button>
        <button
          data-testid="workflow-select-folder-btn"
          onClick={addFolder}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm text-zinc-300 transition-[border-color,background-color] duration-300 hover:border-emerald-500/40 hover:bg-white/5"
        >
          <FolderOpen size={16} /> Select Folder
        </button>
        <button
          data-testid="workflow-clear-selection-btn"
          onClick={() => setFiles([])}
          className="rounded-xl border border-white/10 py-2.5 text-xs text-zinc-500 transition-colors duration-300 hover:border-red-500/40 hover:text-red-400"
        >
          Clear selection
        </button>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          Choose one PDF or select a folder containing multiple PDF documents.
        </p>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#0D0D0F] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Selected files
          </p>
          <span data-testid="workflow-file-count" className="font-mono2 text-[10px] text-emerald-400">
            {files.length} files
          </span>
        </div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {files.map((f) => (
              <motion.div
                key={f}
                layout
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2"
              >
                <span className="flex items-center gap-2 text-xs text-zinc-300">
                  <FileText size={13} className="text-zinc-500" /> {f}
                </span>
                <button
                  data-testid={`workflow-remove-${f}`}
                  onClick={() => setFiles((prev) => prev.filter((x) => x !== f))}
                  className="text-zinc-600 transition-colors duration-200 hover:text-red-400"
                >
                  <X size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {files.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-6 text-center text-xs text-zinc-600"
            >
              No files selected. Add a PDF or a folder to begin.
            </motion.p>
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
