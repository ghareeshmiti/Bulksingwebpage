import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  FolderOpen,
  Clock,
  Settings,
  LayoutGrid,
  Trash2,
  Search,
  ZoomIn,
  Lock,
  PenLine,
  CheckCircle2,
  Upload,
  X,
} from "lucide-react";
import { Reveal } from "@/components/shared";

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 5600;

const TOUR_STEPS = [
  { label: "Drag to Sign", caption: "Drop a PDF in the Files panel and drag the signature chip onto the page." },
  { label: "Signature Placed", caption: "The visible DSC stamp lands exactly where you placed it — drag again to add more." },
  { label: "Dashboard Overview", caption: "Track signed files, connected tokens and failures from one dashboard." },
];

const Sidebar = ({ activeItem }) => (
  <div className="hidden w-40 shrink-0 flex-col gap-1 border-r border-white/10 bg-white/[0.02] p-3 sm:flex">
    <p className="font-heading mb-2 flex items-center gap-2 px-1 text-xs font-bold">
      <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/15">
        <PenLine size={11} className="text-emerald-400" />
      </span>
      DSC BulkSigner
    </p>
    {[
      { icon: LayoutGrid, label: "Dashboard" },
      { icon: FileText, label: "Select PDF" },
      { icon: FolderOpen, label: "Select Folder" },
      { icon: Clock, label: "History" },
      { icon: Settings, label: "Settings" },
    ].map((item) => (
      <span
        key={item.label}
        className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] ${
          activeItem === item.label
            ? "bg-emerald-500/15 text-emerald-300"
            : "text-zinc-400"
        }`}
      >
        <item.icon size={13} />
        {item.label}
      </span>
    ))}
    <span className="mt-auto px-1 font-mono2 text-[9px] text-zinc-600">Version 2.0.0</span>
  </div>
);

const Toast = ({ title, sub }) => (
  <motion.div
    data-testid="tour-toast"
    initial={{ opacity: 0, y: -14, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.45, ease: EASE }}
    className="absolute right-3 top-3 z-20 flex w-56 items-start gap-2.5 rounded-xl border border-white/10 bg-[#18181B]/95 p-3 shadow-2xl backdrop-blur-xl"
  >
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 text-emerald-400">
      <PenLine size={11} />
    </span>
    <span>
      <span className="flex items-center justify-between gap-3 text-xs font-semibold text-white">
        {title}
        <X size={11} className="text-zinc-500" />
      </span>
      <span className="mt-0.5 block text-[10px] leading-snug text-zinc-400">{sub}</span>
    </span>
  </motion.div>
);

const Invoice = ({ children }) => (
  <div className="relative mx-auto h-full w-full max-w-sm overflow-hidden rounded-md bg-white p-5 text-zinc-800 shadow-xl">
    <p className="font-heading text-sm font-bold">Invoice - INV-22</p>
    <p className="absolute right-5 top-5 text-[10px] font-semibold text-zinc-500">#INV-22</p>
    <div className="mt-3 space-y-1">
      <p className="text-[9px] font-semibold">Quikhyr</p>
      <p className="text-[8px] text-zinc-500">MILLENNIUM Tower, 5th Floor, Plot 10/1, Sector III,</p>
      <p className="text-[8px] text-zinc-500">HUDA Techno Enclave, Madhapur, Hyderabad — 500081</p>
    </div>
    <div className="mt-4 space-y-1.5">
      {[100, 92, 100, 96, 78].map((w, i) => (
        <div key={i} className="h-1.5 rounded bg-zinc-200" style={{ width: `${w}%` }} />
      ))}
    </div>
    <div className="mt-4 grid grid-cols-4 gap-2 border-y border-zinc-200 py-2 text-[8px] font-semibold text-zinc-500">
      <span>Description</span><span className="text-right">Qty</span><span className="text-right">Rate</span><span className="text-right">Amount</span>
    </div>
    <div className="grid grid-cols-4 gap-2 py-2 text-[8px] text-zinc-600">
      <span>Annual subscription</span><span className="text-right">1</span><span className="text-right">INR 2800.00</span><span className="text-right">INR 2800</span>
    </div>
    <p className="mt-2 text-[8px] text-zinc-500">Coupon Applied: WELCOME11</p>
    {children}
  </div>
);

const FilesPanel = () => (
  <div className="flex w-52 shrink-0 flex-col gap-3 border-r border-white/10 p-3">
    <p className="flex items-center justify-between text-xs font-semibold text-white">
      Files <Trash2 size={12} className="text-zinc-500" />
    </p>
    <div className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-white/15 py-4 text-zinc-500">
      <Upload size={16} />
      <p className="text-[10px]">Drop PDF files here</p>
      <p className="text-[8px] text-zinc-600">or click to browse</p>
    </div>
    <div className="flex items-center gap-2 rounded-lg bg-emerald-500/[0.07] px-2.5 py-2">
      <span className="rounded bg-red-500/15 px-1 font-mono2 text-[8px] font-bold text-red-400">PDF</span>
      <span className="truncate text-[10px] text-zinc-300">invoice-order_SYExf.pdf</span>
    </div>
    <div className="mt-auto space-y-2">
      <p className="text-[9px] text-zinc-500">Pages: <span className="text-zinc-300">All Pages</span></p>
      <div className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-emerald-500/50 bg-emerald-500/[0.06] py-2 text-[10px] text-emerald-300">
        <PenLine size={11} /> Drag to Sign
      </div>
      <div className="flex gap-2">
        <span className="flex flex-1 items-center justify-center gap-1 rounded-md border border-white/10 py-1.5 text-[9px] text-zinc-400">
          <Settings size={10} /> Settings
        </span>
        <span className="flex flex-1 items-center justify-center gap-1 rounded-md bg-emerald-500 py-1.5 text-[9px] font-bold text-[#09090B]">
          <PenLine size={10} /> Sign PDF
        </span>
      </div>
    </div>
  </div>
);

const ViewerToolbar = () => (
  <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2 text-[10px] text-zinc-400">
    <span>Pages: 1</span>
    <span className="flex items-center gap-1"><Search size={10} /> 100% <ZoomIn size={10} /></span>
    <span className="ml-auto flex items-center gap-1"><Trash2 size={10} /> Clear Signatures</span>
  </div>
);

const DragScreen = () => (
  <div className="flex h-full">
    <FilesPanel />
    <div className="relative flex-1 bg-white/[0.02] p-4">
      <ViewerToolbar />
      <div className="relative h-[calc(100%-2rem)] pt-3">
        <Invoice />
        <motion.div
          data-testid="tour-drag-chip"
          initial={{ left: "6%", top: "72%", opacity: 0 }}
          animate={{ left: ["6%", "6%", "46%"], top: ["72%", "72%", "18%"], opacity: [0, 1, 1] }}
          transition={{ duration: 2.6, times: [0, 0.25, 1], delay: 0.7, ease: "easeInOut" }}
          className="absolute z-10 flex w-36 items-center justify-center gap-1.5 rounded-lg border border-dashed border-emerald-500 bg-[#121214] py-2.5 text-[10px] font-medium text-emerald-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <PenLine size={11} /> Signature
        </motion.div>
      </div>
      <Toast title="Drag to Sign" sub="Drag the chip or click on the page to place the signature" />
    </div>
  </div>
);

const PlacedScreen = () => (
  <div className="flex h-full">
    <FilesPanel />
    <div className="relative flex-1 bg-white/[0.02] p-4">
      <ViewerToolbar />
      <div className="relative h-[calc(100%-2rem)] pt-3">
        <Invoice>
          <motion.div
            data-testid="tour-placed-stamp"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="absolute left-[30%] top-[8%] flex items-center gap-2 border border-dashed border-zinc-400 bg-white/95 px-3 py-2"
          >
            <span className="text-left">
              <span className="block text-[8px] font-bold leading-tight text-zinc-900">CLASS 3</span>
              <span className="block text-[8px] font-bold leading-tight text-zinc-900">ORGANIZATION</span>
              <span className="block text-[8px] font-bold leading-tight text-zinc-900">TEST</span>
            </span>
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span className="border-l border-zinc-300 pl-2">
              <span className="block text-[7px] font-semibold text-zinc-700">Digitally signed by</span>
              <span className="block text-[7px] text-zinc-500">Class 3 Organization..</span>
              <span className="block text-[7px] text-zinc-500">Date: 2026.04.02 14:44:42 +05:30</span>
            </span>
          </motion.div>
        </Invoice>
      </div>
      <Toast title="Signature Placed" sub="Drag again to add more signatures" />
    </div>
  </div>
);

const STATS = [
  { label: "Signed Today", value: "11", icon: PenLine, tint: "text-violet-400" },
  { label: "This Month", value: "11", icon: LayoutGrid, tint: "text-emerald-400" },
  { label: "Connected Tokens", value: "1", icon: Lock, tint: "text-amber-400" },
  { label: "Failed Signs", value: "0", icon: X, tint: "text-red-400" },
];

const ACTIVITY = [
  "invoice-order_SYExfyfBuPF4oJ.pdf",
  "Vendor-Agreement-2026.pdf",
  "Compliance-Report-Q2.pdf",
  "Board-Resolution-04.pdf",
];

const DashboardScreen = () => (
  <div className="h-full space-y-3 overflow-hidden p-4">
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
    >
      <div>
        <p className="font-heading text-sm font-bold text-white">Welcome back, MOUNIKA!</p>
        <p className="text-[10px] text-zinc-400">Here&apos;s your signing activity overview</p>
      </div>
      <div className="text-right">
        <p className="font-heading text-lg font-extrabold text-emerald-400">46 <span className="text-[9px] font-medium text-zinc-400">DAYS LEFT</span></p>
        <p className="text-[9px] text-zinc-500">Plan expires 19 May 2026</p>
      </div>
    </motion.div>
    <div className="grid grid-cols-4 gap-3">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          data-testid={`tour-stat-${i}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
        >
          <s.icon size={15} className={s.tint} />
          <p className="font-heading mt-1.5 text-xl font-extrabold text-white">{s.value}</p>
          <p className="text-[9px] text-zinc-500">{s.label}</p>
        </motion.div>
      ))}
    </div>
    <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
      >
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-white">
          <Clock size={11} className="text-zinc-400" /> Recent Activity
        </p>
        {ACTIVITY.map((f, i) => (
          <div key={f} className="flex items-center justify-between border-b border-white/[0.06] py-1.5 last:border-0">
            <span className="flex min-w-0 items-center gap-2">
              <CheckCircle2 size={11} className="shrink-0 text-emerald-400" />
              <span className="truncate text-[10px] text-zinc-300">{f}</span>
              <span className="hidden text-[8px] text-zinc-600 md:inline">CCA India 2022</span>
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono2 text-[8px] text-emerald-400">Signed</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
        className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
      >
        <p className="mb-2 flex items-center justify-between text-[11px] font-semibold text-white">
          Token Info
          <span className="flex items-center gap-1 text-[8px] font-normal text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Connected
          </span>
        </p>
        <div className="mb-2 flex flex-col items-center py-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Lock size={15} />
          </span>
          <p className="mt-1 text-[10px] font-semibold text-white">mToken CryptoID</p>
        </div>
        {[
          ["Token Name", "mToken CryptoID"],
          ["Certificate CN", "CCA India 2022"],
          ["Valid Until", "2042-02-02"],
          ["Issuer", "CCA India 2022"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between border-t border-white/[0.06] py-1 text-[9px]">
            <span className="text-zinc-500">{k}</span>
            <span className="font-mono2 text-zinc-300">{v}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default function AppTour() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % TOUR_STEPS.length), DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <Reveal delay={0.1}>
      <div data-testid="app-tour" className="mt-20">
        <p className="font-mono2 mb-3 text-xs uppercase tracking-[0.35em] text-emerald-400">
          Inside the desktop app
        </p>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Watch BulkSigner at Work
          </h3>
          <p className="max-w-md text-sm text-zinc-400">{TOUR_STEPS[step].caption}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121214]/90 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="font-mono2 ml-3 text-[11px] text-zinc-500">
              DSC BulkSigner — {TOUR_STEPS[step].label}
            </span>
          </div>
          <div className="relative h-[460px]">
            <Sidebar activeItem={step === 2 ? "Dashboard" : "Select PDF"} />
            <div className="absolute inset-0 sm:left-40">
              <AnimatePresence initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="absolute inset-0"
                >
                  {step === 0 && <DragScreen />}
                  {step === 1 && <PlacedScreen />}
                  {step === 2 && <DashboardScreen />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {TOUR_STEPS.map((s, i) => (
            <button
              key={s.label}
              data-testid={`tour-step-btn-${i}`}
              onClick={() => setStep(i)}
              className={`group flex items-center gap-3 rounded-full border px-4 py-2 text-xs transition-[border-color,background-color,color] duration-300 ${
                step === i
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                  : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
              }`}
            >
              <span className="font-mono2 text-[9px] text-emerald-500">{`0${i + 1}`}</span>
              {s.label}
              <span className="relative h-0.5 w-10 overflow-hidden rounded-full bg-white/10">
                {step === i && (
                  <motion.span
                    key={`progress-${step}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-emerald-500"
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-zinc-600">
          Recreated interface demonstration. Screens shown are illustrative, not live product captures.
        </p>
      </div>
    </Reveal>
  );
}
