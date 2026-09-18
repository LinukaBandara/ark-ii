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
              <p>We design and build websites, interfaces and digital products around what a business actually needs — not a pre-made package.</p>
              <a href="#services-detail">Explore capabilities <ArrowUpRight size={16} /></a>
            </motion.div>
          </div>
          <div className="services-page__hero-meta">
            <span>Strategy → Design → Development</span>
            <span>01—05 core services</span>
            <span>Remote / Worldwide</span>
          </div>
        </section>

        <div id="services-detail">
          <ServicesSection />
        </div>

        <ProcessSection />
        <CapabilitiesSection />

        <section className="services-page__closing">
          <div>
            <p className="section-kicker"><span>06</span> A focused engagement</p>
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
