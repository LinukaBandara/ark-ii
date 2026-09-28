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
    if (canonical) canonical.setAttribute("href", "https://ark-ii.studio/services");\n\n    let schema = document.getElementById("services-schema");\n    if (!schema) {\n      schema = document.createElement("script");\n      schema.id = "services-schema";\n      schema.type = "application/ld+json";\n      document.head.appendChild(schema);\n    }\n    schema.textContent = JSON.stringify({\n      "@context": "https://schema.org",\n      "@graph": [\n        {\n          "@type": "CollectionPage",\n          "@id": "https://ark-ii.studio/services#webpage",\n          url: "https://ark-ii.studio/services",\n          name: "ARK II | Web Design & Development Services",\n          description: "Explore ARK II web design, web development, web app development and website redesign services for ambitious businesses in the US, UK, Australia and worldwide.",\n          isPartOf: { "@id": "https://ark-ii.studio/#website" },\n          inLanguage: "en"\n        },\n        {\n          "@type": "BreadcrumbList",\n          "@id": "https://ark-ii.studio/services#breadcrumb",\n          itemListElement: [\n            { "@type": "ListItem", position: 1, name: "Home", item: "https://ark-ii.studio/" },\n            { "@type": "ListItem", position: 2, name: "Services", item: "https://ark-ii.studio/services" }\n          ]\n        }\n      ]\n    });
    return () => document.getElementById("services-schema")?.remove();\n  }, []);

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
              <h1>Web design & development with a <span>purpose.</span></h1>
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

        <section className="services-page__seo-guide">
          <div>
            <p className="section-kicker"><span>08</span> Planning a website</p>
            <h2>Know what the project<br /><em>actually needs.</em></h2>
          </div>
          <div>
            <p>Before choosing a web design or development partner, define the job the website needs to do: establish credibility, generate enquiries, support a workflow, or become part of a larger digital product.</p>
            <p>Scope, content, integrations, responsive design, SEO foundations and ongoing ownership can change the work considerably. ARK II starts with those requirements rather than forcing every business into the same package.</p>
          </div>
        </section>

        <section className="services-page__closing">
          <div>
            <p className="section-kicker"><span>09</span> A focused engagement</p>
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
