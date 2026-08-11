import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { SECTIONS } from "@/sections";
import { registerSectionNav } from "@/lib/sectionNav";

const sectionFromHash = () => {
  const id = window.location.hash.replace("#", "");
  return SECTIONS.some((s) => s.id === id) ? id : "overview";
};

export default function App() {
  const [active, setActive] = useState(sectionFromHash);

  const goTo = useCallback((id) => {
    if (!SECTIONS.some((s) => s.id === id)) return;
    window.history.pushState(null, "", `#${id}`);
    setActive(id);
  }, []);

  useEffect(() => {
    registerSectionNav(goTo);
    const onPop = () => setActive(sectionFromHash());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [goTo]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const s = SECTIONS.find((x) => x.id === active);
    if (s) document.title = s.title;
  }, [active]);

  const idx = SECTIONS.findIndex((s) => s.id === active);
  const ActiveComponent = SECTIONS[idx].component;
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  return (
    <div className="grain relative min-h-screen bg-[#09090B] text-white antialiased">
      <Navbar active={active} onNavigate={goTo} />
      <main className="pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveComponent />
            {active === "overview" && <Marquee />}
          </motion.div>
        </AnimatePresence>
      </main>

      <div
        data-testid="section-pager"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-white/10 bg-[#09090B]/90 px-4 py-3 backdrop-blur-xl md:hidden"
      >
        {prev ? (
          <button
            data-testid="pager-prev-btn"
            onClick={() => goTo(prev.id)}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-zinc-300"
          >
            <ArrowLeft size={13} /> {prev.label}
          </button>
        ) : (
          <span />
        )}
        <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-emerald-400">
          {SECTIONS[idx].chapter} · {SECTIONS[idx].label}
        </span>
        {next ? (
          <button
            data-testid="pager-next-btn"
            onClick={() => goTo(next.id)}
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300"
          >
            {next.label} <ArrowRight size={13} />
          </button>
        ) : (
          <span />
        )}
      </div>

      <Footer onNavigate={goTo} />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#18181B",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}
