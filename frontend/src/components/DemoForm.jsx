import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal, ChapterHeader } from "@/components/shared";

const FIELD =
  "w-full rounded-lg border border-white/15 bg-[#121214] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-[border-color] duration-300 focus:border-emerald-500";

export default function DemoForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    plan: "Business",
    licences: 5,
    requirement: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Demo request received — the SignuluOne team will get in touch.");
  };

  return (
    <section id="demo" data-testid="demo-section" className="relative overflow-hidden bg-[#0D0D0F] py-28 lg:py-36">
      <div className="glow-emerald pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChapterHeader
          chapter="09"
          overline="Demo and enquiries"
          title="Request a Demo or Talk to Sales"
          description="Share your requirement and the SignuluOne team will get in touch to walk through BulkSigner or discuss Business and Enterprise licensing."
        />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-5">
              <a
                data-testid="contact-email-link"
                href="mailto:support@signulu.com"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-[border-color] duration-300 hover:border-emerald-500/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
                  <Mail size={19} />
                </span>
                <div>
                  <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Email</p>
                  <p className="text-sm font-medium">support@signulu.com</p>
                </div>
              </a>
              <a
                data-testid="contact-phone-link"
                href="tel:+919000000000"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-[border-color] duration-300 hover:border-emerald-500/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
                  <Phone size={19} />
                </span>
                <div>
                  <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Phone</p>
                  <p className="text-sm font-medium">+91 9176446858</p>
                </div>
              </a>
              <p className="pt-4 text-sm leading-relaxed text-zinc-500">
                Tell us about your document signing workflow and the team will walk you through
                installation, mToken setup and licence planning for your desktops.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10">
              {submitted ? (
                <motion.div
                  data-testid="demo-form-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start gap-4 py-10"
                >
                  <CheckCircle2 size={44} className="text-emerald-400" />
                  <h3 className="font-heading text-2xl font-bold">Request received</h3>
                  <p className="max-w-md text-sm text-zinc-400">
                    Thanks{form.name ? `, ${form.name}` : ""}. The SignuluOne team will reach
                    out at {form.email || "your email"} to schedule your BulkSigner walkthrough
                    for the {form.plan} plan.
                  </p>
                  <button
                    data-testid="demo-form-another-btn"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 rounded-full border border-white/15 px-6 py-2.5 text-sm text-zinc-300 transition-[border-color] duration-300 hover:border-emerald-500/50"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form data-testid="demo-request-form" onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                  <input
                    data-testid="demo-form-name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full name"
                    className={FIELD}
                  />
                  <input
                    data-testid="demo-form-company"
                    value={form.company}
                    onChange={set("company")}
                    placeholder="Company"
                    className={FIELD}
                  />
                  <input
                    data-testid="demo-form-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="Work email"
                    className={FIELD}
                  />
                  <input
                    data-testid="demo-form-phone"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="Phone (+91)"
                    className={FIELD}
                  />
                  <select
                    data-testid="demo-form-plan"
                    value={form.plan}
                    onChange={set("plan")}
                    className={FIELD}
                  >
                    {["Basic", "Pro", "Business", "Enterprise"].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                  <input
                    data-testid="demo-form-licences"
                    type="number"
                    min={1}
                    value={form.licences}
                    onChange={set("licences")}
                    placeholder="Number of licences"
                    className={FIELD}
                  />
                  <textarea
                    data-testid="demo-form-requirement"
                    rows={4}
                    value={form.requirement}
                    onChange={set("requirement")}
                    placeholder="Tell us about your document signing workflow."
                    className={`${FIELD} sm:col-span-2`}
                  />
                  <button
                    data-testid="demo-form-submit-btn"
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 py-3.5 text-sm font-bold text-[#09090B] transition-[background-color,box-shadow] duration-300 hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)] sm:col-span-2"
                  >
                    <Send size={15} /> Request a Demo
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
