import Hero from "@/components/Hero";
import OverviewFlow from "@/components/OverviewFlow";
import Workflow from "@/components/Workflow";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import SignatureStudio from "@/components/SignatureStudio";
import SigningProcess from "@/components/SigningProcess";
import Security from "@/components/Security";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Download from "@/components/Download";
import DemoForm from "@/components/DemoForm";
import Faq from "@/components/Faq";

const OverviewPage = () => (
  <>
    <Hero />
    <OverviewFlow />
    <Workflow />
  </>
);

const HowItWorksPage = () => (
  <>
    <HowItWorks />
    <SignatureStudio />
    <SigningProcess />
  </>
);

export const SECTIONS = [
  { id: "overview", label: "Overview", chapter: "01", component: OverviewPage, title: "SignuluOne BulkSigner — Sign PDFs Locally with Your Class 3 DSC" },
  { id: "features", label: "Features", chapter: "02", component: Features, title: "Features — SignuluOne BulkSigner" },
  { id: "how-it-works", label: "How It Works", chapter: "03", component: HowItWorksPage, title: "How It Works — SignuluOne BulkSigner" },
  { id: "security", label: "Security", chapter: "04", component: Security, title: "Security — SignuluOne BulkSigner" },
  { id: "use-cases", label: "Use Cases", chapter: "05", component: UseCases, title: "Use Cases — SignuluOne BulkSigner" },
  { id: "pricing", label: "Pricing", chapter: "07", component: Pricing, title: "Pricing — SignuluOne BulkSigner" },
  { id: "download", label: "Download", chapter: "08", component: Download, title: "Download BulkSigner for Windows — SignuluOne" },
  { id: "demo", label: "Request a Demo", chapter: "09", component: DemoForm, title: "Request a Demo — SignuluOne BulkSigner" },
  { id: "faq", label: "FAQ", chapter: "10", component: Faq, title: "FAQ — SignuluOne BulkSigner" },
];

export const NAV_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "security", label: "Security" },
  { id: "use-cases", label: "Use Cases" },
  { id: "pricing", label: "Pricing" },
  { id: "download", label: "Download" },
  { id: "faq", label: "FAQ" },
];
