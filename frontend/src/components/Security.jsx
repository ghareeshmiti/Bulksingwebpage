import {
  HardDrive,
  Usb,
  BadgeCheck,
  FileCheck2,
  ShieldCheck,
  FileLock2,
  KeyRound,
  Headset,
} from "lucide-react";
import { Reveal, ChapterHeader } from "@/components/shared";

const PILLARS = [
  { icon: HardDrive, title: "Local PDF Processing", desc: "Selected PDFs are processed through the desktop application." },
  { icon: Usb, title: "USB DSC Signing", desc: "Signing is performed using the certificate available through the connected mToken." },
  { icon: BadgeCheck, title: "Certificate Review", desc: "Review the certificate holder, issuer and validity before proceeding." },
  { icon: FileCheck2, title: "Controlled Export", desc: "Export the successfully signed PDF documents after reviewing their status." },
];

const COMMITMENTS = [
  { icon: ShieldCheck, title: "Enterprise Security", desc: "Signing happens on the desktop with the USB DSC; PDF contents are not uploaded to our servers." },
  { icon: FileLock2, title: "Standards Compliant", desc: "PAdES-compatible PDF signatures using certificates issued by licensed Certifying Authorities." },
  { icon: KeyRound, title: "Private Key Stays on Token", desc: "Keys never leave the mToken hardware — the application only requests the signing operation." },
  { icon: Headset, title: "Business-Hours Support", desc: "Installation, token driver and signing assistance from a team that works with DSC setups daily." },
];

export default function Security() {
  return (
    <section data-testid="security-section" className="relative overflow-hidden bg-[#0D0D0F] py-16 lg:py-20">
      <div className="glow-emerald pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="04"
          overline="Security"
          title="Your PDFs Stay Within the Desktop Workflow"
          description="BulkSigner processes selected PDF documents through the installed desktop application. The website is used for product information, downloads and enquiries — not for browser-based document signing."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div
                data-testid={`security-pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group h-full rounded-2xl border border-white/10 bg-[#09090B]/80 p-7 backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-transform duration-500 group-hover:scale-110">
                  <p.icon size={22} />
                </span>
                <h3 className="font-heading text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 md:p-10">
            <p className="font-mono2 mb-8 text-xs uppercase tracking-[0.35em] text-emerald-400">
              Compliance and support commitments
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {COMMITMENTS.map((c) => (
                <div key={c.title} data-testid={`commitment-${c.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <c.icon size={20} className="mb-3 text-emerald-400" />
                  <h4 className="font-heading text-sm font-bold">{c.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
