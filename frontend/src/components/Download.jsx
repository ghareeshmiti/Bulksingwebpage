import { useState } from "react";
import { Download as DownloadIcon, MonitorDown, Check, Presentation, X, Phone, Mail, KeyRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { goToSection } from "@/lib/sectionNav";
import { Reveal, ChapterHeader } from "@/components/shared";

const REQUIREMENTS = [
  "Windows desktop system",
  "Connected mToken USB DSC",
  "Class 3 Individual or Organisation certificate",
  "Local folder access for PDF selection",
];

const DETAILS = [
  ["Operating System", "Windows 10 and 11 (64-bit)"],
  ["Token Support", "Supported mToken USB DSC devices"],
  ["Documents", "PDF files, single or folder-based"],
  ["Processing", "Local desktop processing"],
];

function DownloadModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0D0D0F] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <DownloadIcon size={17} />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-white">Download Started</p>
                <p className="text-[11px] text-zinc-500">DSCApp.zip — BulkSigner Installer</p>
              </div>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-5">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-5 py-4">
              <div className="flex items-start gap-3">
                <KeyRound size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-sm text-zinc-300 leading-relaxed">
                  After installing BulkSigner, you will need an <span className="text-white font-semibold">activation token</span> to get started. Please contact our team and we will provide the token for you.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact Our Team</p>
              <a
                href="tel:+919176446858"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-zinc-200 hover:border-emerald-500/40 hover:text-white transition-colors"
              >
                <Phone size={15} className="text-emerald-400 shrink-0" />
                +91 9176446858
              </a>
              <a
                href="mailto:support@signulu.com"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-zinc-200 hover:border-emerald-500/40 hover:text-white transition-colors"
              >
                <Mail size={15} className="text-emerald-400 shrink-0" />
                support@signulu.com
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-6 py-4 flex gap-3">
            <a
              href="/DSCApp.zip"
              download="DSCApp.zip"
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-[#09090B] hover:bg-emerald-400 transition-colors"
            >
              <DownloadIcon size={15} />
              Download Now
            </a>
            <button
              onClick={onClose}
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-zinc-300 hover:border-white/30 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Download() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <section id="download" data-testid="download-section" className="relative overflow-hidden py-28 lg:py-36">
      <div className="glow-emerald pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="08"
          overline="Download"
          title="Get BulkSigner for Windows"
          description="Install the desktop application, connect your mToken USB DSC and start signing individual PDFs or entire folders."
        />
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <ul className="mb-10 space-y-4">
              {REQUIREMENTS.map((r) => (
                <li
                  key={r}
                  data-testid={`download-requirement-${r.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "")}`}
                  className="flex items-center gap-3 text-sm text-zinc-300"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10">
                    <Check size={13} className="text-emerald-400" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <button
                data-testid="download-installer-btn"
                onClick={() => setShowModal(true)}
                className="group flex items-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-[#09090B] transition-[background-color,box-shadow] duration-300 hover:bg-emerald-400 btn-glow"
              >
                <DownloadIcon size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Download BulkSigner
              </button>
              <button
                data-testid="download-demo-btn"
                onClick={() => goToSection("demo")}
                className="flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-medium text-white transition-[border-color,background-color] duration-300 hover:border-emerald-500/50 hover:bg-white/5"
              >
                <Presentation size={16} /> Request a Demo
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121214]/90 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <MonitorDown size={17} />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold">SignuluOne BulkSigner</p>
                  <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Installer details
                  </p>
                </div>
              </div>
              <div className="divide-y divide-white/[0.06] px-6">
                {DETAILS.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-4 text-sm">
                    <span className="text-zinc-500">{k}</span>
                    <span className="font-mono2 text-right text-xs text-zinc-200">{v}</span>
                  </div>
                ))}
              </div>
              <p className="border-t border-white/10 px-6 py-4 text-[11px] leading-relaxed text-zinc-600">
                PDF documents are processed through the installed desktop application. The
                website is used for product information, downloads and enquiries.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
    {showModal && <DownloadModal onClose={() => setShowModal(false)} />}
    </>
  );
}
