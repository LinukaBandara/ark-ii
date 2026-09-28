import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";
import "./ResourcePage.css";

const sections = [
  ["Simple business website", "A focused brochure or service website with clear pages, responsive design, enquiry paths and foundational SEO."],
  ["Premium brand website", "A more involved experience with stronger art direction, custom UI/UX, richer content and more detailed interaction."],
  ["Custom web application", "A product or operational system with authentication, dashboards, workflows, data, integrations or role-based experiences."]
];

function ResourcePage() {
  useEffect(() => {
    document.title = "ARK II | How Much Does a Business Website Cost?";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", "A practical guide to business website costs, what affects the budget, and what to consider when hiring a web design or development studio.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://ark-ii.studio/resources/business-website-cost");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resource-page">
      <Navbar />
      <main>
        <section className="resource-page__hero">
          <div className="resource-page__top">
            <a href="/services"><ArrowLeft size={15} /> Services</a>
            <span>RESOURCE / 01</span>
          </div>
          <div className="resource-page__grid">
            <div>
              <p className="resource-page__kicker">ARK II / Buying guide</p>
              <h1>How much does a <span>business website</span> cost?</h1>
            </div>
            <div className="resource-page__intro">
              <p>There is no useful one-size-fits-all price. The budget depends on the website's purpose, content, design depth, functionality, integrations and who will maintain it after launch.</p>
              <p>This guide is for businesses comparing web design, development and redesign options in the US, UK, Australia and other international markets.</p>
            </div>
          </div>
        </section>
        <section className="resource-page__body">
          <div className="resource-page__lead"><p className="section-kicker"><span>01</span> The short answer</p><h2>Scope matters more than a <em>headline price.</em></h2></div>
          <div className="resource-page__copy">
            <p>A small business website can be relatively straightforward when the pages, content and functionality are simple. Costs rise when a project needs bespoke design, extensive content, integrations, custom workflows, ecommerce, portals or application features.</p>
            <p>When comparing proposals, look beyond the number at what is actually included: strategy, information architecture, copy or content preparation, UI/UX design, responsive development, CMS setup, integrations, testing, launch and ongoing support.</p>
          </div>
        </section>
        <section className="resource-page__tiers">
          <p className="section-kicker"><span>02</span> What changes the budget</p>
          <div className="resource-page__tier-list">{sections.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </section>
        <section className="resource-page__body">
          <div className="resource-page__lead"><p className="section-kicker"><span>03</span> Before you compare quotes</p><h2>Ask what the project is <em>supposed to achieve.</em></h2></div>
          <div className="resource-page__copy">
            <p>Start with the business outcome. Is the site primarily there to establish credibility, generate enquiries, explain a service, support bookings, sell products or connect customers to a larger system?</p>
            <p>Then define the pages, content, integrations and responsibilities. A clear brief makes proposals easier to compare and reduces the chance of paying for features that do not solve the actual problem.</p>
            <a className="resource-page__link" href="/services">Explore ARK II services <ArrowUpRight size={16} /></a>
          </div>
        </section>
        <section className="resource-page__closing">
          <div><p className="section-kicker section-kicker--light"><span>04</span> Need a project estimate?</p><h2>Start with the <em>problem.</em></h2></div>
          <a href="#contact">Discuss a project <ArrowUpRight size={17} /></a>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
export default ResourcePage;
