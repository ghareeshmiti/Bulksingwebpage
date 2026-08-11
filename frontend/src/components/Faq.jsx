import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { goToSection } from "@/lib/sectionNav";
import { Reveal, ChapterHeader } from "@/components/shared";

const FAQS = [
  {
    q: "Which USB DSC tokens are supported?",
    a: "BulkSigner is designed for mToken USB DSC devices carrying Class 3 Individual or Organisation certificates issued by licensed Certifying Authorities such as eMudhra.",
  },
  {
    q: "Do my PDF files get uploaded anywhere?",
    a: "No. Documents are read, signed and written locally inside the installed desktop application. The website is used only for product information, downloads and enquiries.",
  },
  {
    q: "How do I know my certificate is still valid?",
    a: "BulkSigner shows the certificate holder, issuer and validity period before signing, so you can confirm the certificate is current before processing any document.",
  },
  {
    q: "What happens when a certificate expires mid-renewal?",
    a: "The application raises a Certificate Expired alert. Connect a token containing a valid certificate or select another available certificate to continue signing.",
  },
  {
    q: "Can I control where the visible signature appears?",
    a: "Yes. Choose the supported page, horizontal and vertical position, and the width and height of the visible signature, with a preview before it is applied.",
  },
  {
    q: "How are signed documents exported?",
    a: "After reviewing the signing status of each file, you export the successfully signed PDF documents through the controlled export workflow in the desktop app.",
  },
  {
    q: "Can one licence be used on multiple computers?",
    a: "Licences are per Windows desktop system. Choose the licence band that matches the number of systems — 1–4 systems are billed as individual Basic licences.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section data-testid="faq-section" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <ChapterHeader
          chapter="12"
          overline="FAQ"
          title="Questions About DSC Signing"
          description="Details on USB DSC support, certificate validity and how signed files are exported."
        />
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-7 backdrop-blur-xl">
            {FAQS.map((f, i) => (
              <div key={f.q} className="border-b border-white/[0.07] last:border-0">
                <button
                  data-testid={`faq-question-${i + 1}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-heading text-base font-bold tracking-tight transition-colors duration-300 md:text-lg ${open === i ? "text-emerald-400" : "text-white"}`}>
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ${open === i ? "text-emerald-400" : "text-zinc-500"}`}
                  >
                    <Plus size={19} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p data-testid={`faq-answer-${i + 1}`} className="max-w-2xl pb-6 text-sm leading-relaxed text-zinc-400">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-zinc-500">
            Still unsure?{" "}
            <button
              data-testid="faq-request-demo-link"
              onClick={() => goToSection("demo")}
              className="font-medium text-emerald-400 underline decoration-emerald-500/40 underline-offset-4 transition-colors duration-300 hover:text-emerald-300"
            >
              Request a demo
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
