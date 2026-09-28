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
    const socialTitle = document.querySelector('meta[property="og:title"]');
    const socialDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (socialTitle) socialTitle.setAttribute("content", document.title);
    if (socialDescription) socialDescription.setAttribute("content", "A practical guide to business website costs, what affects the budget, and what to consider when hiring a web design or development studio.");
    if (twitterTitle) twitterTitle.setAttribute("content", document.title);
    if (twitterDescription) twitterDescription.setAttribute("content", "A practical guide to business website costs, what affects the budget, and what to consider when hiring a web design or development studio.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://ark-ii.studio/resources/business-website-cost");
    let schema = document.getElementById("resource-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "resource-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://ark-ii.studio/resources/business-website-cost#article",
          headline: "How Much Does a Business Website Cost?",
          description: "A practical guide to business website costs, what affects the budget, and what to consider when hiring a web design or development studio.",
          url: "https://ark-ii.studio/resources/business-website-cost",
          author: { "@type": "Organization", "name": "ARK II", "url": "https://ark-ii.studio/" },
          publisher: { "@type": "Organization", "name": "ARK II", "url": "https://ark-ii.studio/" },
          inLanguage: "en",
          mainEntityOfPage: { "@id": "https://ark-ii.studio/resources/business-website-cost#webpage" },
          isPartOf: { "@id": "https://ark-ii.studio/#website" }
        },
        {
          "@type": "WebPage",
          "@id": "https://ark-ii.studio/resources/business-website-cost#webpage",
          url: "https://ark-ii.studio/resources/business-website-cost",
          name: "ARK II | How Much Does a Business Website Cost?",
          description: "A practical guide to business website costs, what affects the budget, and what to consider when hiring a web design or development studio.",
          isPartOf: { "@id": "https://ark-ii.studio/#website" },
          inLanguage: "en"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://ark-ii.studio/resources/business-website-cost#breadcrumb",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ark-ii.studio/" },
            { "@type": "ListItem", position: 2, name: "Business Website Cost", item: "https://ark-ii.studio/resources/business-website-cost" }
          ]
        }
      ]
    });
    window.scrollTo(0, 0);
    return () => document.getElementById("resource-schema")?.remove();
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
            <div className="resource-page__links">
              <a href="/services">Explore ARK II services <ArrowUpRight size={16} /></a>
              <a href="/services/web-design">Web design services <ArrowUpRight size={16} /></a>
              <a href="/services/website-redesign">Website redesign services <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
        <section className="resource-page__body">
          <div className="resource-page__lead"><p className="section-kicker"><span>04</span> Choosing a web design partner</p><h2>Compare the <em>whole project.</em></h2></div>
          <div className="resource-page__copy">
            <p>When comparing web design agencies, review more than the visual portfolio. Look at whether the team understands the business problem, explains its process, handles responsive design and development, and provides a clear path from strategy to launch.</p>
            <p>Ask what is included in the scope, who owns the website and source code, how content and integrations are handled, and what support is available after launch. Relevant case studies are often more useful than a long list of technologies.</p>
            <div className="resource-page__links">
              <a href="/services">Compare ARK II services <ArrowUpRight size={16} /></a>
              <a href="/work">Review selected work <ArrowUpRight size={16} /></a>
              <a href="/studio">Meet the studio <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
        <section className="resource-page__closing">
          <div><p className="section-kicker section-kicker--light"><span>05</span> Need a project estimate?</p><h2>Start with the <em>problem.</em></h2></div>
          <a href="#contact">Discuss a project <ArrowUpRight size={17} /></a>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
export default ResourcePage;
