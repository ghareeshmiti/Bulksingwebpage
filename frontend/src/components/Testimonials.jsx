import { Quote, Star } from "lucide-react";
import { Reveal, ChapterHeader } from "@/components/shared";

const TESTIMONIALS = [
  {
    quote:
      "We sign hundreds of orders and administrative PDFs every week. BulkSigner cut our signing time from hours to minutes — the folder-based workflow is exactly what our registry needed.",
    name: "K. Venkata Ramana",
    role: "Administrative Officer",
    org: "High Court of Andhra Pradesh",
  },
  {
    quote:
      "Token visibility and certificate validity checks give our team confidence before every signing run. The clear status view means nothing leaves the desk unsigned or unchecked.",
    name: "S. Anitha Rao",
    role: "Documentation Lead",
    org: "Hyderabad Metropolitan Water Supply Board",
  },
  {
    quote:
      "Vendor agreements, compliance reports and certificates — everything goes through BulkSigner now. Local processing was the deciding factor for our IT security team.",
    name: "M. Srinivas",
    role: "Manager, Corporate Legal",
    org: "Heritage Foods Limited",
  },
];

const CLIENTS = [
  { initials: "HC", name: "AP High Court", region: "Amaravati, AP" },
  { initials: "HW", name: "HMWSB", region: "Hyderabad, TS" },
  { initials: "HF", name: "Heritage Foods", region: "Hyderabad, TS" },
  { initials: "AT", name: "APTRANSCO", region: "Vijayawada, AP" },
  { initials: "TR", name: "TSRTC", region: "Hyderabad, TS" },
  { initials: "SC", name: "Singareni Collieries", region: "Kothagudem, TS" },
  { initials: "EP", name: "APEPDCL", region: "Visakhapatnam, AP" },
  { initials: "TS", name: "TSSPDCL", region: "Hyderabad, TS" },
  { initials: "AI", name: "APIIC", region: "Mangalagiri, AP" },
  { initials: "KH", name: "Kamineni Hospitals", region: "Hyderabad, TS" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="relative overflow-hidden py-28 lg:py-36">
      <div className="glow-emerald pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="09"
          overline="Testimonials"
          title="Word from Our Clients"
          description="Our clients' success stories reflect the impact and excellence of our technology and professional services."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure
                data-testid={`testimonial-card-${i + 1}`}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
                  <Quote size={19} />
                </span>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} className="fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/[0.07] pt-5">
                  <p className="font-heading text-sm font-bold">{t.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {t.role} · <span className="text-emerald-400">{t.org}</span>
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-20">
            <p className="font-mono2 mb-8 text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
              Our happy clients across Andhra Pradesh & Telangana
            </p>
            <div data-testid="client-logo-strip" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {CLIENTS.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.05}>
                  <div
                    data-testid={`client-logo-${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group flex h-full items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition-[border-color,background-color] duration-500 hover:border-emerald-500/40 hover:bg-emerald-500/[0.05]"
                  >
                    <span className="font-heading flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-extrabold text-zinc-400 transition-[color,border-color,background-color] duration-500 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/15 group-hover:text-emerald-400">
                      {c.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-zinc-200">{c.name}</span>
                      <span className="block truncate text-[10px] text-zinc-500">{c.region}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-[11px] text-zinc-600">
              Client names shown are representative of organisations using desktop DSC signing workflows.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
