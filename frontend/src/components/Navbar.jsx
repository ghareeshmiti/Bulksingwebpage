import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { scrollTo } from "@/components/shared";

const LINKS = [
  { label: "Overview", hash: "#overview" },
  { label: "Features", hash: "#features" },
  { label: "How It Works", hash: "#how-it-works" },
  { label: "Use Cases", hash: "#use-cases" },
  { label: "Pricing", hash: "#pricing" },
  { label: "Download", hash: "#download" },
];

export const Logo = () => (
  <button
    data-testid="nav-logo"
    onClick={() => scrollTo("#overview")}
    className="flex items-center gap-2.5"
  >
    <span className="font-heading flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-lg font-extrabold text-[#09090B]">
      S
    </span>
    <span className="text-left leading-tight">
      <span className="font-heading block text-base font-bold tracking-tight">SignuluOne</span>
      <span className="font-mono2 block text-[10px] uppercase tracking-[0.25em] text-emerald-400">
        BulkSigner
      </span>
    </span>
  </button>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash) => {
    setOpen(false);
    scrollTo(hash);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.hash}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => go(l.hash)}
              className="text-sm text-zinc-400 transition-colors duration-300 hover:text-emerald-400"
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="hidden lg:block">
          <button
            data-testid="nav-request-demo-btn"
            onClick={() => go("#demo")}
            className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400 transition-[background-color,box-shadow] duration-300 hover:bg-emerald-500/20 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]"
          >
            Request a Demo
          </button>
        </div>
        <button
          data-testid="nav-mobile-menu-btn"
          className="text-zinc-300 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/10 bg-[#09090B]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.hash}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => go(l.hash)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 transition-colors duration-200 hover:bg-white/5 hover:text-emerald-400"
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="nav-mobile-demo-btn"
                onClick={() => go("#demo")}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-[#09090B]"
              >
                <Download size={15} /> Request a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
