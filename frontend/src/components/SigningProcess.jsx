import { Usb, BadgeCheck, ListChecks, AlertTriangle, Unplug } from "lucide-react";
import { toast } from "sonner";
import { Reveal, ChapterHeader, StatusBadge } from "@/components/shared";

const ROWS = [
  { file: "Vendor-Agreement-2026.pdf", token: "mToken CryptoID", issuer: "eMudhra Sub CA", status: "Signed", action: "Export" },
  { file: "Board-Resolution-04.pdf", token: "mToken CryptoID", issuer: "eMudhra Sub CA", status: "Signing", action: "—" },
  { file: "Compliance-Report-Q2.pdf", token: "mToken CryptoID", issuer: "eMudhra Sub CA", status: "Ready", action: "Sign" },
  { file: "Site-Certificate-118.pdf", token: "Not detected", issuer: "—", status: "Token Required", action: "—" },
  { file: "Annual-Statement-FY26.pdf", token: "mToken CryptoID", issuer: "eMudhra Sub CA", status: "Failed", action: "View" },
];

const INFO = [
  { icon: Usb, title: "Token Name", desc: "View the mToken currently connected to the desktop application." },
  { icon: BadgeCheck, title: "Certificate Issuer", desc: "Confirm the issuer of the certificate selected for signing." },
  { icon: ListChecks, title: "Signing Status", desc: "Track whether each document is ready, signing, signed or failed." },
];

const ALERTS = [
  {
    icon: AlertTriangle,
    title: "Certificate Expired",
    desc: "Certificate expired. Connect a token containing a valid certificate.",
    cta: "Select Another Certificate",
    tid: "alert-select-certificate-btn",
  },
  {
    icon: Unplug,
    title: "Token Disconnected",
    desc: "Token disconnected. Reconnect your mToken to continue.",
    cta: "Reconnect Token",
    tid: "alert-reconnect-token-btn",
  },
];

export default function SigningProcess() {
  return (
    <section data-testid="signing-process-section" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          overline="Signing process"
          title="Follow Every Document Through the Signing Process"
          description="Review the token, certificate issuer and current signing status for each selected PDF."
        />

        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <table data-testid="signing-status-table" className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  {["File Name", "Token Name", "Certificate Issuer", "Status", "Action"].map((h) => (
                    <th key={h} className="font-mono2 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.file}
                    data-testid={`signing-row-${i + 1}`}
                    className="border-b border-white/5 transition-colors duration-300 last:border-0 hover:bg-emerald-500/[0.04]"
                  >
                    <td className="px-5 py-4 text-sm text-zinc-200">{r.file}</td>
                    <td className={`px-5 py-4 text-xs ${r.token === "Not detected" ? "text-red-400" : "text-zinc-400"}`}>
                      {r.token}
                    </td>
                    <td className="px-5 py-4 text-xs text-zinc-400">{r.issuer}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-5 py-4">
                      {r.action !== "—" ? (
                        <button
                          data-testid={`signing-action-${r.action.toLowerCase()}-${i + 1}`}
                          onClick={() => toast.info(`${r.action} — handled inside the BulkSigner desktop app`)}
                          className="rounded-full border border-emerald-500/40 px-4 py-1 text-xs text-emerald-400 transition-[background-color] duration-300 hover:bg-emerald-500/15"
                        >
                          {r.action}
                        </button>
                      ) : (
                        <span className="text-xs text-zinc-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {INFO.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div
                data-testid={`status-info-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-[border-color] duration-500 hover:border-emerald-500/40"
              >
                <c.icon size={20} className="mb-4 text-emerald-400" />
                <h3 className="font-heading text-base font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="font-mono2 mb-6 mt-20 text-xs uppercase tracking-[0.35em] text-emerald-400">
            Supported alerts
          </p>
          <h3 className="font-heading mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            Actionable Token and Certificate Alerts
          </h3>
          <p className="mb-10 max-w-2xl text-sm text-zinc-400">
            BulkSigner highlights token and certificate conditions that need your attention
            before signing continues.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {ALERTS.map((a) => (
              <div
                key={a.title}
                data-testid={`alert-card-${a.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-start gap-5 rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                  <a.icon size={20} />
                </span>
                <div>
                  <h4 className="font-heading text-base font-bold text-amber-200">{a.title}</h4>
                  <p className="mt-1.5 text-sm text-zinc-400">{a.desc}</p>
                  <button
                    data-testid={a.tid}
                    onClick={() => toast.info(`${a.cta} — handled inside the BulkSigner desktop app`)}
                    className="mt-4 rounded-full border border-amber-500/40 px-4 py-1.5 text-xs text-amber-300 transition-[background-color] duration-300 hover:bg-amber-500/15"
                  >
                    {a.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
