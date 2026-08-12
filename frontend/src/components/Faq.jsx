import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { goToSection } from "@/lib/sectionNav";
import { Reveal, ChapterHeader } from "@/components/shared";

const FAQS = [
  {
    q: "Which USB DSC tokens are supported?",
    a: "BulkSigner works with supported mToken USB DSC devices on Windows 10 and 11 (64-bit). The token driver and middleware supplied by your Certifying Authority must be installed, and the token must be connected before you start a signing batch.",
  },
  {
    q: "Do my PDF files get uploaded anywhere?",
    a: "No. Documents are read, signed and written on your own machine. The signing operation is performed by the USB DSC itself, so the private key never leaves the hardware token.",
  },
  {
    q: "How do I know my certificate is still valid?",
    a: "The application shows the connected token, the selected certificate, its issuer and its validity dates before signing. If the certificate has expired or the token is removed, signing stops and an alert explains what to fix.",
  },
  {
    q: "What happens when a certificate expires mid-renewal?",
    a: "Signing is blocked for that certificate and the affected files stay in a Ready state. Once you connect a token containing a valid certificate, you can re-run the batch without reselecting the documents.",
  },
  {
    q: "Can I control where the visible signature appears?",
    a: "Yes. Choose the supported page, position and size of the visible signature before processing, and the same layout is applied consistently across every PDF in the batch.",
  },
  {
    q: "How are signed documents exported?",
    a: "Signed PDFs can be written back to the source folder or exported to a separate output folder, keeping original file names. Each row in the status list also has its own Export action for individual documents.",
  },
  {
    q: "Can one licence be used on multiple computers?",
    a: "Licences are priced per device per year. Volume tiers from 5 licences upward let you cover several machines under one annual agreement.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section data-testid="faq-section" className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <ChapterHeader
          chapter="10"
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
