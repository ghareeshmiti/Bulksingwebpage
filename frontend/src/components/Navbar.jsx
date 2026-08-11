import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SECTIONS } from "@/sections";

export const Logo = ({ onNavigate }) => (
  <button
    data-testid="nav-logo"
    onClick={() => onNavigate("overview")}
    className="flex items-center gap-2.5"
  >
    <img
      src="https://www.signuluone.com/img/Signing%20Solutions.png"
      alt="SignuluOne logo"
      className="h-9 w-9 rounded-lg object-contain"
    />
    <span className="text-left leading-tight">
      <span className="font-heading block text-base font-bold tracking-tight">SignuluOne</span>
      <span className="font-mono2 block text-[10px] uppercase tracking-[0.25em] text-emerald-400">
        BulkSigner
      </span>
    </span>
  </button>
);

export default function Navbar({ active, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#09090B]/85 backdrop-blur-xl"
          : "border-b border-white/[0.06] bg-[#09090B]/60 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo onNavigate={go} />
        <div className="hidden items-center gap-4 xl:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className={`relative pb-1 text-[13px] transition-colors duration-300 ${
                active === l.id ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-400"
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-emerald-400"
                />
              )}
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-3 xl:flex">
          <button
            data-testid="nav-request-demo-btn"
            onClick={() => go("demo")}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-[background-color,box-shadow,border-color,color] duration-300 ${
              active === "demo"
                ? "border-emerald-500 bg-emerald-500 text-[#09090B]"
                : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 btn-glow"
            }`}
          >
            Request a Demo
          </button>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <button
            data-testid="nav-mobile-menu-btn"
            className="text-zinc-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/10 bg-[#09090B]/95 backdrop-blur-xl xl:hidden"
          >
            <div className="grid max-h-[70vh] grid-cols-2 gap-1 overflow-y-auto px-6 py-4">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  data-testid={`nav-mobile-link-${s.id}`}
                  onClick={() => go(s.id)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                    active === s.id
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "text-zinc-300 hover:bg-white/5 hover:text-emerald-400"
                  }`}
                >
                  <span className="font-mono2 text-[9px] text-emerald-500/70">{s.chapter}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
