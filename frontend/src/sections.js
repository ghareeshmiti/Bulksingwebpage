import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
import HowItWorks from "@/components/HowItWorks";
import SignatureStudio from "@/components/SignatureStudio";
import SigningProcess from "@/components/SigningProcess";
import Security from "@/components/Security";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Download from "@/components/Download";
import DemoForm from "@/components/DemoForm";
import Faq from "@/components/Faq";

export const SECTIONS = [
  { id: "overview", label: "Overview", chapter: "01", component: Hero, title: "SignuluOne BulkSigner — Sign PDFs Locally with Your Class 3 DSC" },
  { id: "features", label: "Features", chapter: "02", component: Features, title: "Features — SignuluOne BulkSigner" },
  { id: "product", label: "Product Interface", chapter: "03", component: Workflow, title: "Product Interface — SignuluOne BulkSigner" },
  { id: "how-it-works", label: "How It Works", chapter: "04", component: HowItWorks, title: "How It Works — SignuluOne BulkSigner" },
  { id: "signature", label: "Signature Placement", chapter: "05", component: SignatureStudio, title: "Visible Signature Placement — SignuluOne BulkSigner" },
  { id: "process", label: "Signing Process", chapter: "06", component: SigningProcess, title: "Signing Process & Status — SignuluOne BulkSigner" },
  { id: "security", label: "Security", chapter: "07", component: Security, title: "Security — SignuluOne BulkSigner" },
  { id: "use-cases", label: "Use Cases", chapter: "08", component: UseCases, title: "Use Cases — SignuluOne BulkSigner" },
  { id: "pricing", label: "Pricing", chapter: "09", component: Pricing, title: "Pricing — SignuluOne BulkSigner" },
  { id: "download", label: "Download", chapter: "10", component: Download, title: "Download BulkSigner for Windows — SignuluOne" },
  { id: "demo", label: "Request a Demo", chapter: "11", component: DemoForm, title: "Request a Demo — SignuluOne BulkSigner" },
  { id: "faq", label: "FAQ", chapter: "12", component: Faq, title: "FAQ — SignuluOne BulkSigner" },
];

export const NAV_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "security", label: "Security" },
  { id: "use-cases", label: "Use Cases" },
  { id: "pricing", label: "Pricing" },
  { id: "download", label: "Download" },
];
