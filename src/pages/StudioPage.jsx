import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import StudioSection from "../components/StudioSection/StudioSection";
import WhySection from "../components/WhySection/WhySection";
import ProcessSection from "../components/ProcessSection/ProcessSection";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";
import "./StudioPage.css";

function StudioPage() {
  return (
    <div className="studio-page">
      <Navbar />
      <main>
        <section className="studio-page__hero">
          <div className="studio-page__hero-top">
            <a href="/"><ArrowLeft size={15} /> Back home</a>
            <span>04 / STUDIO</span>
          </div>
          <div className="studio-page__hero-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
              <p className="studio-page__kicker">ARK II / Independent digital studio</p>
              <h1>Small studio.<br /><span>Serious work.</span></h1>
            </motion.div>
            <motion.div className="studio-page__hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .75 }}>
              <p>ARK II is a focused digital studio built around one idea: good digital work should make a business clearer, more credible and easier to choose.</p>
              <a href="#studio-detail">Meet the studio <ArrowUpRight size={16} /></a>
            </motion.div>
          </div>
          <div className="studio-page__hero-meta">
            <span>Independent / Sri Lanka</span>
            <span>Design + Development</span>
            <span>Working worldwide</span>
          </div>
        </section>

        <div id="studio-detail">
          <StudioSection />
        </div>

        <section className="studio-page__principles">
          <div className="studio-page__principles-head">
            <p className="section-kicker"><span>05</span> How we think</p>
            <h2>Less noise.<br /><em>More intent.</em></h2>
          </div>
          <div className="studio-page__principles-list">
            <article><span>01</span><h3>Clarity before decoration.</h3><p>Every page has a job. We remove friction before adding visual detail.</p></article>
            <article><span>02</span><h3>Systems over shortcuts.</h3><p>Reusable structures, responsive behaviour and thoughtful content keep the work useful after launch.</p></article>
            <article><span>03</span><h3>Details earn attention.</h3><p>Motion, typography, spacing and interaction are treated as part of the product — not finishing touches.</p></article>
          </div>
        </section>

        <WhySection />
        <ProcessSection />

        <section className="studio-page__closing">
          <div>
            <p className="section-kicker section-kicker--light"><span>06</span> Work together</p>
            <h2>Build something<br /><em>worth remembering.</em></h2>
          </div>
          <a href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default StudioPage;
