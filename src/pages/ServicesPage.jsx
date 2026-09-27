import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import ProcessSection from "../components/ProcessSection/ProcessSection";
import CapabilitiesSection from "../components/CapabilitiesSection/CapabilitiesSection";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";
import "./ServicesPage.css";

function ServicesPage() {
  useEffect(() => {
    document.title = "ARK II | Web Design & Development Services";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "Explore ARK II web design, web development, web app development and website redesign services for ambitious businesses in the US, UK, Australia and worldwide.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://ark-ii.studio/services");
  }, []);

  return (
    <div className="services-page">
      <Navbar />
      <main>
        <section className="services-page__hero">
          <div className="services-page__hero-top">
            <a href="/"><ArrowLeft size={15} /> Back home</a>
            <span>03 / SERVICES</span>
          </div>
          <div className="services-page__hero-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
              <p className="services-page__kicker">ARK II / Capabilities</p>
              <h1>Digital work with a <span>purpose.</span></h1>
            </motion.div>
            <motion.div className="services-page__hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .75 }}>
              <p>We design and build premium business websites, custom web applications and digital products around what a business actually needs — not a pre-made package.</p>
              <a href="#services-detail">Explore capabilities <ArrowUpRight size={16} /></a>
            </motion.div>
          </div>
          <div className="services-page__hero-meta">
            <span>Strategy → Design → Development</span>
            <span>01—06 core services</span>
            <span>Remote / Worldwide</span>
          </div>
        </section>

        <div id="services-detail">
          <ServicesSection />
        </div>

        <section className="services-page__seo-copy" aria-label="Who ARK II works with">
          <div>
            <p className="section-kicker"><span>06</span> Who we work with</p>
            <h2>Built for ambitious <em>businesses.</em></h2>
          </div>
          <div>
            <p>ARK II works remotely with small and growing businesses, professional services firms, hospitality brands, studios and teams building digital products.</p>
            <p>Our priority international markets include the United States, United Kingdom and Australia, while projects can be delivered remotely for clients worldwide.</p>
          </div>
        </section>

        <section className="services-page__seo-copy">
          <div>
            <p className="section-kicker"><span>07</span> What we build</p>
            <h2>Digital experiences built for <em>real business goals.</em></h2>
          </div>
          <div>
            <p>ARK II provides website design, web development, custom web application development and website redesign services for businesses in the US, UK, Australia, Sri Lanka and other markets worldwide.</p>
            <p>From a focused business website to a data-driven dashboard or customer portal, every engagement is shaped around the audience, workflow and outcome that matter.</p>
          </div>
        </section>

        <ProcessSection />
        <CapabilitiesSection />

        <section className="services-page__closing">
          <div>
            <p className="section-kicker"><span>08</span> A focused engagement</p>
            <h2>Have a project<br /><em>in mind?</em></h2>
          </div>
          <a href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default ServicesPage;
