import { useCallback, useEffect, useRef, useState } from "react";
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
  const mainRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("bs-theme");
    return stored === "light" || stored === "dark-amber" ? stored : "blue";
  });

  const cycleTheme = () =>
    setTheme((t) => (t === "blue" ? "light" : t === "light" ? "dark-amber" : "blue"));

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
    mainRef.current?.scrollTo({ top: 0 });
    const s = SECTIONS.find((x) => x.id === active);
    if (s) document.title = s.title;
  }, [active]);

  useEffect(() => {
    localStorage.setItem("bs-theme", theme);
  }, [theme]);

  const idx = SECTIONS.findIndex((s) => s.id === active);
  const ActiveComponent = SECTIONS[idx].component;
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  return (
    <div
      className={`grain relative flex h-screen flex-col overflow-hidden bg-[#09090B] text-white antialiased ${
        theme === "light"
          ? "theme-light"
          : theme === "dark-amber"
            ? "theme-dark-amber"
            : theme === "blue"
              ? "theme-blue"
              : ""
      }`}
    >
      <Navbar
        active={active}
        onNavigate={goTo}
        theme={theme}
        onToggleTheme={cycleTheme}
      />
      <main ref={mainRef} className="app-scroll flex-1 overflow-y-auto pb-24 pt-[72px] md:pb-0">
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
        <Footer onNavigate={goTo} />
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
        <span className="font-heading text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400">
          {SECTIONS[idx].label}
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
