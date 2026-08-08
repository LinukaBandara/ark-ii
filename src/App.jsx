import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Hero from "./components/Hero/Hero";
import WorkSection from "./components/WorkSection/WorkSection";
import LabSection from "./components/LabSection/LabSection";
import StudioSection from "./components/StudioSection/StudioSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import ProcessSection from "./components/ProcessSection/ProcessSection";
import CapabilitiesSection from "./components/CapabilitiesSection/CapabilitiesSection";
import WhySection from "./components/WhySection/WhySection";
import ContactSection from "./components/ContactSection/ContactSection";
import Footer from "./components/Footer/Footer";

function getInitialSiteReady() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

function App() {
  const [siteReady, setSiteReady] = useState(getInitialSiteReady);

  const handleLoaderComplete = useCallback(() => {
    setSiteReady(true);
  }, []);

  useEffect(() => {
    const failsafe = window.setTimeout(() => {
      document.body.classList.remove("is-loading");
      setSiteReady(true);
    }, 7000);

    return () => window.clearTimeout(failsafe);
  }, []);

  return (
    <SmoothScroll>
      <div className="site-shell">
        <Loader onComplete={handleLoaderComplete} />
        <ScrollProgress />

        <div
          className={`site-content ${
            siteReady ? "site-content--ready" : ""
          }`}
        >
          <Navbar />

          <main>
            <Hero ready={siteReady} />
            <WorkSection />
            <LabSection />
            <StudioSection />
            <ServicesSection />
            <ProcessSection />
            <CapabilitiesSection />
            <WhySection />
            <ContactSection />
          </main>

          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}

export default App;
