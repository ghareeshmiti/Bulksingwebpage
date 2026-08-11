import { useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { goToSection } from "@/lib/sectionNav";
import { Reveal, ChapterHeader } from "@/components/shared";

const CORE = [
  "Windows desktop application",
  "Single PDF signing",
  "Folder-based bulk signing",
  "mToken USB DSC support",
  "Class 3 Individual certificate support",
  "Class 3 Organisation certificate support",
  "Visible signature placement",
  "Page selection",
  "Signature preview",
  "Token and issuer visibility",
  "Local PDF processing",
  "Signed-document export",
];

const TIERS = [
  { name: "Basic", band: "1 licence", price: 2200, extra: ["Standard support"], cta: "Get Basic", popular: false },
  {
    name: "Pro", band: "5–10 licences", price: 1800, popular: true, cta: "Choose Pro",
    extra: ["5–10 device licences", "Priority onboarding", "Priority support", "Centralised licence coordination"],
  },
  {
    name: "Business", band: "11–50 licences", price: 1500, popular: false, cta: "Contact Sales",
    extra: ["11–50 device licences", "Business onboarding", "Business support", "Licence-allocation assistance", "Account-level coordination"],
  },
  {
    name: "Enterprise", band: "51+ licences", price: 1000, popular: false, cta: "Talk to Enterprise Sales",
    extra: ["51 or more device licences", "Enterprise onboarding", "Enterprise support", "Deployment coordination", "Dedicated commercial discussion"],
  },
];

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

const planFor = (n) => {
  if (n <= 4) return TIERS[0];
  if (n <= 10) return TIERS[1];
  if (n <= 50) return TIERS[2];
  return TIERS[3];
};

export default function Pricing() {
  const [licences, setLicences] = useState(5);
  const plan = useMemo(() => planFor(licences || 1), [licences]);
  const subtotal = (licences || 0) * plan.price;

  return (
    <section id="pricing" data-testid="pricing-section" className="relative overflow-hidden bg-[#0D0D0F] py-28 lg:py-36">
      <div className="glow-emerald pointer-events-none absolute left-1/2 top-40 h-[600px] w-[1000px] -translate-x-1/2" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="09"
          overline="Pricing"
          title="Simple Annual Pricing by Licence Volume"
          description="Choose the licence band that matches the number of Windows desktop systems on which BulkSigner will be used."
        />
        <Reveal>
          <p className="font-mono2 -mt-6 mb-12 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Annual billing · Price shown per device licence · Taxes extra
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-4">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.09} className="h-full">
              <div
                data-testid={`pricing-card-${t.name.toLowerCase()}`}
                className={`relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-1.5 ${
                  t.popular
                    ? "border-emerald-500/60 bg-emerald-500/[0.07] card-glow"
                    : "border-white/10 bg-white/[0.03] hover:border-emerald-500/30"
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-3.5 left-6 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#09090B]">
                    <Sparkles size={11} /> Most Popular
                  </span>
                )}
                <h3 className="font-heading text-2xl font-extrabold tracking-tight">{t.name}</h3>
                <p className="font-mono2 mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">{t.band}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-extrabold text-emerald-400">{inr(t.price)}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">per device / year</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {[...CORE, ...t.extra].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[11px] leading-snug text-zinc-400">
                      <Check size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  data-testid={`pricing-cta-${t.name.toLowerCase()}`}
                  onClick={() => (t.name === "Basic" ? goToSection("download") : goToSection("demo"))}
                  className={`mt-7 rounded-full py-3 text-sm font-semibold transition-[background-color,box-shadow,color] duration-300 ${
                    t.popular
                      ? "bg-emerald-500 text-[#09090B] hover:bg-emerald-400 btn-glow"
                      : "border border-white/15 text-white hover:border-emerald-500/50 hover:bg-white/5"
                  }`}
                >
                  {t.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-xs leading-relaxed text-zinc-600">
            Licence bands: 1–4 licences are billed as individual Basic licences at ₹2,200 per
            device/year. Taxes are additional. Final commercial terms are subject to order
            confirmation.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            data-testid="licence-estimator"
            className="mt-20 grid gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-12 lg:grid-cols-[1fr_1fr]"
          >
            <div>
              <h3 className="font-heading text-3xl font-bold tracking-tight">
                Estimate Your Annual Licence Cost
              </h3>
              <p className="mt-3 text-sm text-zinc-400">
                Enter the number of Windows desktop systems that will use BulkSigner.
              </p>
              <label className="mb-2 mt-8 block text-xs text-zinc-400">Number of licences</label>
              <input
                data-testid="estimator-licence-input"
                type="number"
                min={1}
                step={1}
                value={licences}
                onChange={(e) => setLicences(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
                className="w-40 rounded-lg border border-white/15 bg-[#121214] px-4 py-3 font-mono2 text-lg text-white outline-none transition-[border-color] duration-300 focus:border-emerald-500"
              />
              <p className="mt-2 text-[11px] text-zinc-600">Whole numbers only. Minimum one licence.</p>
              <input
                data-testid="estimator-licence-slider"
                type="range"
                min={1}
                max={100}
                value={Math.min(licences, 100)}
                onChange={(e) => setLicences(Number(e.target.value))}
                className="mt-6 w-full max-w-sm"
              />
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] p-7">
              <p className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Recommended plan
              </p>
              <p data-testid="estimator-plan-name" className="font-heading mt-1 text-3xl font-extrabold text-emerald-400">
                {plan.name}
              </p>
              <div className="mt-6 space-y-3 text-sm">
                {[
                  ["Number of licences", licences],
                  ["Price per licence/year", inr(plan.price)],
                  ["Estimated annual subtotal", inr(subtotal)],
                ].map(([k, v], idx) => (
                  <div key={k} className="flex items-center justify-between border-b border-white/[0.07] pb-3 last:border-0">
                    <span className="text-zinc-400">{k}</span>
                    <span
                      data-testid={`estimator-value-${idx}`}
                      className={`font-mono2 ${idx === 2 ? "text-lg font-bold text-emerald-300" : "text-zinc-100"}`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-zinc-600">
                GST and applicable taxes are additional. Final commercial terms are subject to
                order confirmation.
              </p>
              <button
                data-testid="estimator-choose-plan-btn"
                onClick={() => {
                  toast.success(`${plan.name} plan selected — ${licences} licence(s)`);
                  goToSection("demo");
                }}
                className="mt-6 w-full rounded-full bg-emerald-500 py-3 text-sm font-bold text-[#09090B] transition-[background-color,box-shadow] duration-300 hover:bg-emerald-400 btn-glow"
              >
                Choose {plan.name}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
