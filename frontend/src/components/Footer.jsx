import { Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal, scrollTo } from "@/components/shared";
import { Logo } from "@/components/Navbar";

const PRODUCT_LINKS = [
  { label: "Overview", hash: "#overview" },
  { label: "Features", hash: "#features" },
  { label: "How It Works", hash: "#how-it-works" },
  { label: "Use Cases", hash: "#use-cases" },
];

const START_LINKS = [
  { label: "Pricing", hash: "#pricing" },
  { label: "Download", hash: "#download" },
  { label: "Request a Demo", hash: "#demo" },
  { label: "Contact Sales", hash: "#demo" },
];

export default function Footer() {
  return (
    <footer data-testid="footer-section" className="relative overflow-hidden border-t border-white/5 bg-[#0D0D0F]">
      <div className="glow-emerald pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.07] py-20 lg:flex-row lg:items-center">
            <h2 className="font-heading max-w-xl text-4xl font-extrabold tracking-tighter sm:text-5xl">
              Start signing PDFs with your <span className="text-emerald-400">Class 3 DSC</span>
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                data-testid="footer-download-btn"
                onClick={() => toast.success("BulkSigner installer download started (demo build)")}
                className="flex items-center gap-2.5 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-[#09090B] transition-[background-color,box-shadow] duration-300 hover:bg-emerald-400 hover:shadow-[0_0_36px_rgba(16,185,129,0.5)]"
              >
                <Download size={16} /> Download BulkSigner
              </button>
              <button
                data-testid="footer-view-plans-btn"
                onClick={() => scrollTo("#pricing")}
                className="group flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-[border-color,background-color] duration-300 hover:border-emerald-500/50 hover:bg-white/5"
              >
                View Plans
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-500">
              SignuluOne BulkSigner is a Windows desktop application for signing individual
              PDFs or folders of PDFs using an mToken USB DSC.
            </p>
          </div>
          {[
            { title: "Product", links: PRODUCT_LINKS },
            { title: "Get started", links: START_LINKS },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-mono2 mb-5 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => scrollTo(l.hash)}
                      className="text-sm text-zinc-400 transition-colors duration-300 hover:text-emerald-400"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-600">© 2026 SignuluOne. All rights reserved.</p>
          <p className="text-xs text-zinc-600">
            Prices are per device licence per year; taxes are additional.
          </p>
        </div>
      </div>
    </footer>
  );
}
