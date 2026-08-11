import { motion } from "framer-motion";

export const scrollTo = (hash) => {
  if (window.__lenis) {
    window.__lenis.scrollTo(hash, { offset: -72 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
};

export const Reveal = ({ children, delay = 0, y = 40, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ChapterHeader = ({ chapter, overline, title, description, align = "left" }) => (
  <div className={`relative mb-16 ${align === "center" ? "text-center" : ""}`}>
    <span
      aria-hidden
      className={`chapter-num pointer-events-none absolute -top-16 select-none text-[9rem] font-extrabold md:text-[13rem] ${
        align === "center" ? "left-1/2 -translate-x-1/2" : "-left-2"
      }`}
    >
      {chapter}
    </span>
    <Reveal>
      <p className="font-mono2 relative mb-4 text-xs uppercase tracking-[0.35em] text-emerald-400">
        {overline}
      </p>
      <h2 className="font-heading relative text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`relative mt-5 max-w-2xl text-base text-zinc-400 md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  </div>
);

export const StatusBadge = ({ status }) => {
  const styles = {
    Signed: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    Signing: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    Ready: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
    "Token Required": "border-red-500/40 bg-red-500/10 text-red-400",
    Failed: "border-red-500/40 bg-red-500/10 text-red-400",
    Connected: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  };
  return (
    <span
      data-testid={`status-badge-${status.toLowerCase().replace(/\s+/g, "-")}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono2 text-[11px] ${styles[status]}`}
    >
      {status === "Signing" && (
        <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-amber-400" />
      )}
      {status === "Signed" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
      {status}
    </span>
  );
};

export const SignatureStamp = ({ compact = false }) => (
  <div
    data-testid="signature-preview-stamp"
    className={`border-l-2 border-emerald-500 bg-white pl-3 text-left text-zinc-800 ${
      compact ? "py-1.5" : "py-2"
    }`}
  >
    <p className="font-mono2 text-[9px] uppercase tracking-wide text-zinc-500">
      Digitally signed by
    </p>
    <p className={`font-heading font-bold text-zinc-900 ${compact ? "text-xs" : "text-sm"}`}>
      RAHUL MEHTA
    </p>
    <p className="text-[9px] text-zinc-500">Issuer: eMudhra Sub CA · Class 3</p>
    <p className="text-[9px] text-zinc-500">Date: 2026-08-09 11:24 IST</p>
  </div>
);
