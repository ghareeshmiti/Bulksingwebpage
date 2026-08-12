import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText,
  Usb,
  ShieldCheck,
  FolderOpen,
  ArrowRight,
  Download,
  MonitorSmartphone,
  Fingerprint,
} from "lucide-react";
import { goToSection } from "@/lib/sectionNav";
import { StatusBadge, SignatureStamp } from "@/components/shared";

const EASE = [0.22, 1, 0.36, 1];

const lineVariants = {
  hidden: { y: "115%" },
  visible: (i) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.25 + i * 0.14, ease: EASE },
  }),
};

const FILES = [
  { name: "Vendor-Agreement-2026.pdf", status: "Signed" },
  { name: "Board-Resolution-04.pdf", status: "Signing" },
  { name: "Compliance-Report-Q2.pdf", status: "Ready" },
  { name: "Site-Certificate-118.pdf", status: "Ready" },
];

const BADGES = [
  { icon: MonitorSmartphone, label: "Local desktop processing" },
  { icon: FolderOpen, label: "Single and folder-based signing" },
  { icon: Fingerprint, label: "Class 3 DSC support" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section id="overview" ref={ref} data-testid="hero-section" className="relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="glow-emerald absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2" />
        <div className="hero-grid-overlay absolute inset-0" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-16 pt-8 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-mono2 mb-6 text-xs uppercase tracking-[0.35em] text-emerald-400"
          >
            SignuluOne BulkSigner — Windows Desktop
          </motion.p>

          <h1 className="font-heading text-5xl font-extrabold leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
            {["Sign Multiple PDFs", "with Your"].map((t, i) => (
              <span key={t} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {t}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block text-emerald-400"
                custom={2}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              >
                USB DSC
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-6 max-w-xl text-base text-zinc-400 md:text-lg"
          >
            Sign individual PDF documents or process an entire folder using your mToken USB
            DSC. Configure the visible signature, monitor the signing status and export signed
            files through one desktop application.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-download-btn"
              onClick={() => goToSection("download")}
              className="group flex items-center gap-2.5 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-[#09090B] transition-[box-shadow,background-color] duration-300 hover:bg-emerald-400 btn-glow"
            >
              <Download size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download BulkSigner
            </button>
            <button
              data-testid="hero-view-plans-btn"
              onClick={() => goToSection("pricing")}
              className="group flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-[border-color,background-color] duration-300 hover:border-emerald-500/50 hover:bg-white/5"
            >
              View Plans
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {BADGES.map((b) => (
              <span
                key={b.label}
                data-testid={`hero-badge-${b.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300"
              >
                <b.icon size={14} className="text-emerald-400" />
                {b.label}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="mt-8 text-xs text-zinc-500"
          >
            Designed for Windows desktop systems using supported mToken USB DSC certificates.
          </motion.p>
        </div>

        <div className="relative flex items-center">
          <motion.div
            style={{ y: mockupY }}
            initial={{ opacity: 0, y: 60, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            className="relative w-full [perspective:1200px]"
          >
            <div
              data-testid="hero-app-mockup"
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121214]/90 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="font-mono2 ml-3 text-[11px] text-zinc-500">
                  SignuluOne BulkSigner — Windows Desktop
                </span>
              </div>

              <div className="grid gap-4 p-4 sm:grid-cols-[1.2fr_1fr]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] px-3 py-2">
                    <span className="flex items-center gap-2 text-xs text-zinc-300">
                      <Usb size={14} className="text-emerald-400" /> mToken CryptoID
                    </span>
                    <StatusBadge status="Connected" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        Selected PDFs
                      </p>
                      <span className="font-mono2 text-[10px] text-emerald-400">4 files</span>
                    </div>
                    <div className="space-y-2">
                      {FILES.map((f, i) => (
                        <motion.div
                          key={f.name}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1 + i * 0.12, ease: EASE }}
                          className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2"
                        >
                          <span className="flex min-w-0 items-center gap-2 text-[11px] text-zinc-300">
                            <FileText size={13} className="shrink-0 text-zinc-500" />
                            <span className="truncate">{f.name}</span>
                          </span>
                          <StatusBadge status={f.status} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                  >
                    <p className="font-mono2 mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Certificate
                    </p>
                    <p className="font-heading text-sm font-bold">RAHUL MEHTA</p>
                    <p className="text-[10px] text-emerald-400">Class 3 Individual</p>
                    <div className="mt-2 space-y-0.5 text-[10px] text-zinc-500">
                      <p>Issuer: eMudhra Sub CA</p>
                      <p>Valid till: 12 Mar 2028</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.45, ease: EASE }}
                  >
                    <p className="font-mono2 mb-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Signature preview
                    </p>
                    <div className="rounded-md bg-white/95 p-1.5">
                      <SignatureStamp compact />
                    </div>
                  </motion.div>
                  <motion.button
                    data-testid="hero-start-signing-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.6 }}
                    className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-[#09090B] transition-[background-color,box-shadow] duration-300 hover:bg-emerald-400 hover:shadow-[0_0_28px_rgba(16,185,129,0.5)]"
                  >
                    <ShieldCheck size={14} /> Start Signing
                  </motion.button>
                </div>
              </div>
            </div>

            <motion.div
              style={{ y: cardY }}
              className="animate-float-slow absolute -bottom-8 -left-4 hidden rounded-xl border border-white/10 bg-[#18181B]/90 px-4 py-3 shadow-2xl backdrop-blur-xl md:block"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Fingerprint size={18} />
                </span>
                <div>
                  <p className="font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
                    Private key
                  </p>
                  <p className="text-xs font-medium text-zinc-200">Never leaves the token</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            "Windows Desktop Application",
            "Local PDF Processing",
            "mToken USB DSC",
            "Visible Signature Placement",
          ].map((t) => (
            <div
              key={t}
              className="flex items-center justify-center px-4 py-5 text-center font-mono2 text-[11px] uppercase tracking-[0.2em] text-zinc-500"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
