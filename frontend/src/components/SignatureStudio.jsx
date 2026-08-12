import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Reveal, ChapterHeader } from "@/components/shared";

const DOC_LINES = [92, 100, 96, 100, 88, 100, 94, 100, 70];

export default function SignatureStudio() {
  const [page, setPage] = useState("Last page");
  const [x, setX] = useState(58);
  const [y, setY] = useState(74);
  const [w, setW] = useState(180);
  const [h, setH] = useState(60);

  return (
    <section data-testid="signature-studio-section" className="relative overflow-hidden bg-[#0D0D0F] py-16 lg:py-20">
      <div className="glow-emerald pointer-events-none absolute right-0 top-0 h-[500px] w-[500px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          overline="Visible signature"
          title="Place the Signature Where It Belongs"
          description="Preview and configure the visible signature before processing the selected PDFs. Drag the sliders and watch the stamp move in real time."
        />
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="mb-3 flex items-center justify-between font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <span>Page 1 of 4</span>
                <span>100%</span>
              </div>
              <div
                data-testid="signature-canvas"
                className="relative h-[460px] w-[340px] overflow-hidden rounded-lg bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:h-[520px] sm:w-[380px]"
              >
                <div className="space-y-3 p-7">
                  <div className="h-3 w-2/5 rounded bg-zinc-300" />
                  <div className="h-2 w-1/4 rounded bg-zinc-200" />
                  <div className="pt-4" />
                  {DOC_LINES.map((lw, i) => (
                    <div key={i} className="h-1.5 rounded bg-zinc-200" style={{ width: `${lw}%` }} />
                  ))}
                </div>
                <div
                  data-testid="signature-box"
                  className="absolute border-2 border-dashed border-emerald-500 bg-emerald-500/[0.06] transition-[left,top,width,height] duration-200 ease-out"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${w}px`,
                    height: `${h}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex h-full w-full flex-col justify-center overflow-hidden border-l-2 border-emerald-600 bg-white/90 pl-2">
                    <p className="font-mono2 text-[7px] uppercase text-zinc-500">Digitally signed by</p>
                    <p className="font-heading text-[11px] font-bold leading-tight text-zinc-900">
                      RAHUL MEHTA
                    </p>
                    <p className="text-[7px] text-zinc-500">Issuer: eMudhra Sub CA · Class 3</p>
                    <p className="text-[7px] text-zinc-500">Date: 2026-08-09 11:24 IST</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:p-9">
              <p className="font-mono2 mb-1 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Certificate
              </p>
              <p data-testid="studio-certificate-name" className="font-heading mb-7 text-lg font-bold">
                RAHUL MEHTA — <span className="text-emerald-400">Class 3 Individual</span>
                <span className="block text-sm font-medium text-zinc-500">eMudhra Sub CA</span>
              </p>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-xs text-zinc-400">Page selection</label>
                  <select
                    data-testid="studio-page-select"
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#121214] px-4 py-2.5 text-sm text-white outline-none transition-[border-color] duration-300 focus:border-emerald-500"
                  >
                    {["First page", "Last page", "All pages", "Custom page"].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {[
                  { label: "Horizontal position", value: x, set: setX, min: 0, max: 100, unit: "%", tid: "studio-horizontal-slider" },
                  { label: "Vertical position", value: y, set: setY, min: 0, max: 100, unit: "%", tid: "studio-vertical-slider" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-xs text-zinc-400">{s.label}</label>
                      <span className="font-mono2 text-xs text-emerald-400">
                        {s.value}
                        {s.unit}
                      </span>
                    </div>
                    <input
                      data-testid={s.tid}
                      type="range"
                      min={s.min}
                      max={s.max}
                      value={s.value}
                      onChange={(e) => s.set(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Width", value: w, set: setW, tid: "studio-width-input" },
                    { label: "Height", value: h, set: setH, tid: "studio-height-input" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="mb-2 block text-xs text-zinc-400">{f.label}</label>
                      <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-[#121214] px-3 py-2">
                        <input
                          data-testid={f.tid}
                          type="number"
                          min={40}
                          max={320}
                          value={f.value}
                          onChange={(e) => f.set(Math.max(40, Math.min(320, Number(e.target.value) || 40)))}
                          className="w-full bg-transparent font-mono2 text-sm text-white outline-none"
                        />
                        <span className="text-[10px] text-zinc-500">px</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  data-testid="studio-apply-btn"
                  onClick={() => toast.success(`Configuration applied — ${page}, ${x}% × ${y}%, ${w}×${h}px`)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 py-3.5 text-sm font-bold text-[#09090B] transition-[background-color,box-shadow] duration-300 hover:bg-emerald-400 btn-glow"
                >
                  <Check size={16} /> Apply Configuration
                </button>
                <p className="text-[11px] leading-relaxed text-zinc-600">
                  Signature configuration is completed through the BulkSigner desktop
                  application. This preview is a website demonstration only.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
