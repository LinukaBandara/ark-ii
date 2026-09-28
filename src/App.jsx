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
import ArchivePage from "./pages/ArchivePage";
import ServicesPage from "./pages/ServicesPage";
import StudioPage from "./pages/StudioPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResourcePage from "./pages/ResourcePage";

function getInitialSiteReady() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function HomePage() {
  const [siteReady, setSiteReady] = useState(getInitialSiteReady);
  const handleLoaderComplete = useCallback(() => setSiteReady(true), []);

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
        <div className={`site-content ${siteReady ? "site-content--ready" : ""}`}>
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

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/work") return <ArchivePage section="work" />;
  if (path.startsWith("/work/")) {
    const slug = path.split("/")[2];
    const validWork = ["ceylon-gem-atelier", "dispatcharc", "suranga-gems", "bgs-agristock", "linuka-bandara"];
    return validWork.includes(slug) ? <CaseStudyPage slug={slug} /> : <NotFoundPage />;
  }
  if (path === "/lab") return <ArchivePage section="lab" />;
  if (path === "/services") return <ServicesPage />;
  if (path === "/studio") return <StudioPage />;
  if (path === "/resources/business-website-cost") return <ResourcePage />;
  if (path.startsWith("/services/")) {
    const slug = path.split("/")[2];
    const validServices = ["web-design", "web-development", "web-app-development", "website-redesign"];
    return validServices.includes(slug) ? <ServiceDetailPage slug={slug} /> : <NotFoundPage />;
  }
  return <NotFoundPage />;
}

export default App;
