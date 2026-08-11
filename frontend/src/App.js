import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
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
import Footer from "@/components/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="grain relative min-h-screen bg-[#09090B] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Workflow />
        <HowItWorks />
        <SignatureStudio />
        <SigningProcess />
        <Security />
        <UseCases />
        <Pricing />
        <Download />
        <DemoForm />
        <Faq />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#18181B",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}
