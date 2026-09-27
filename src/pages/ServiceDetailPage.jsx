import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import ProcessSection from "../components/ProcessSection/ProcessSection";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";
import "./ServiceDetailPage.css";

const serviceData = {
  "web-design": {
    number: "01",
    label: "Web Design",
    title: <>Premium websites built to <span>be chosen.</span></>,
    description: "ARK II designs conversion-focused business websites that make your positioning clear, communicate quality and give customers a confident next step.",
    meta: ["Strategy + UI/UX", "Responsive by default", "Working worldwide"],
    points: [
      ["Positioning & structure", "Clarify the offer, audience and page hierarchy before visual design begins."],
      ["Premium UI/UX", "Create a distinctive interface with purposeful typography, spacing, imagery and interaction."],
      ["Conversion paths", "Shape navigation and calls to action around the actions that matter to the business."],
      ["Responsive delivery", "Build a consistent experience across mobile, tablet and desktop without compromising the visual system."]
    ],
    deliverables: ["Website strategy", "Information architecture", "UI/UX design", "Responsive development", "CMS/content integration", "Launch support"],
    projects: "Brand websites, service businesses, hospitality, studios, professional services and ambitious small businesses."
  },
  "web-development": {
    number: "02",
    label: "Web Development",
    title: <>Web development that turns design into <span>working systems.</span></>,
    description: "ARK II builds fast, responsive websites and digital products with clean frontend architecture, real integrations and a focus on maintainability.",
    meta: ["Frontend + integrations", "Performance focused", "Built for growth"],
    points: [
      ["Production-ready frontend", "Translate approved designs into responsive, accessible interfaces with reusable components."],
      ["API & data integration", "Connect websites and products to APIs, databases, forms, authentication and third-party services where required."],
      ["Performance foundations", "Keep assets, rendering and page structure focused on a fast experience across devices."],
      ["Maintainable delivery", "Use a clear project structure so the product can be improved instead of rebuilt every time."]
    ],
    deliverables: ["Frontend development", "API integration", "Database integration", "Forms & workflows", "Responsive implementation", "Deployment support"],
    projects: "Marketing websites, business platforms, client portals, dashboards and custom digital experiences."
  },
  "web-app-development": {
    number: "03",
    label: "Web App Development",
    title: <>Custom web applications for <span>real operations.</span></>,
    description: "When a business needs more than pages, ARK II designs and develops focused web applications around real workflows, data and operational requirements.",
    meta: ["Product thinking", "Custom workflows", "Business software"],
    points: [
      ["Workflow mapping", "Turn manual or fragmented processes into clear digital flows before development starts."],
      ["Role-based experiences", "Design interfaces around the responsibilities of admins, staff, customers and other users."],
      ["Data-driven interfaces", "Build dashboards, records, search, filtering, reporting and other views around useful information."],
      ["Scalable foundations", "Structure the application so features can evolve as the business learns what it needs."]
    ],
    deliverables: ["Product discovery", "UX flows", "Dashboard & portal UI", "Frontend development", "API integration", "Database workflows"],
    projects: "Internal tools, operational dashboards, customer portals, booking systems, inventory systems and business platforms."
  },
  "website-redesign": {
    number: "04",
    label: "Website Redesign",
    title: <>Turn an outdated website into a <span>stronger first impression.</span></>,
    description: "ARK II redesigns websites that no longer represent the quality of the business, making the experience clearer, more credible and easier to use.",
    meta: ["Audit + strategy", "UX restructuring", "Visual rebuild"],
    points: [
      ["Website audit", "Identify clarity, content, UX and responsive issues that are getting in the way of the current site."],
      ["Content & hierarchy", "Reorganise the important information so visitors can understand the business faster."],
      ["Visual direction", "Refresh the interface while keeping what is useful and removing what feels dated or inconsistent."],
      ["Rebuild & refine", "Implement the new experience with responsive behaviour, performance and a cleaner component structure."]
    ],
    deliverables: ["UX audit", "Content hierarchy", "Visual redesign", "Responsive rebuild", "Technical cleanup", "Launch support"],
    projects: "Established businesses, service companies, studios and brands whose current website no longer matches their ambition."
  }
};

function ServiceDetailPage({ slug }) {
  const service = serviceData[slug] || serviceData["web-design"];

  useEffect(() => {
    document.title = `ARK II | ${service.label} Services`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", service.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://ark-ii.studio/services/${slug}/`);

    let schema = document.getElementById("service-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "service-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `https://ark-ii.studio/services/${slug}/#service`,
          name: service.label,
          description: service.description,
          url: `https://ark-ii.studio/services/${slug}/`,
          provider: {
            "@type": "Organization",
            "@id": "https://ark-ii.studio/#organization",
            name: "ARK II",
            url: "https://ark-ii.studio/"
          },
          areaServed: "Worldwide",
          serviceType: service.label
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://ark-ii.studio/services/${slug}/#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://ark-ii.studio/"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://ark-ii.studio/services"
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.label,
              item: `https://ark-ii.studio/services/${slug}/`
            }
          ]
        }
      ]
    });

    window.scrollTo(0, 0);

    return () => {
      document.getElementById("service-schema")?.remove();
    };
  }, [slug, service]);

  return (
    <div className="service-detail-page">
      <Navbar />
      <main>
        <section className="service-detail__hero">
          <div className="service-detail__top">
            <a href="/services"><ArrowLeft size={15} /> All services</a>
            <span>{service.number} / {service.label.toUpperCase()}</span>
          </div>
          <div className="service-detail__grid">
            <div>
              <p className="service-detail__kicker">ARK II / {service.label}</p>
              <h1>{service.title}</h1>
            </div>
            <div className="service-detail__copy">
              <p>{service.description}</p>
              <a href="#service-details">Explore the service <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="service-detail__meta">
            {service.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section className="service-detail__body" id="service-details">
          <div className="service-detail__body-head">
            <p className="section-kicker"><span>{service.number}</span> What we focus on</p>
            <h2>Built around the<br /><em>actual problem.</em></h2>
          </div>
          <div className="service-detail__points">
            {service.points.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="service-detail__deliverables">
          <div>
            <p className="section-kicker"><span>→</span> Typical scope</p>
            <h2>What you<br /><em>can expect.</em></h2>
          </div>
          <div className="service-detail__deliverable-list">
            {service.deliverables.map((item) => <div key={item}><Check size={15} />{item}</div>)}
          </div>
        </section>

        <section className="service-detail__fit">
          <p className="section-kicker"><span>→</span> Where it fits</p>
          <h2>{service.projects}</h2>
        </section>

        <section className="service-detail__related">
          <p className="section-kicker"><span>→</span> Explore ARK II work</p>
          <h2>See how the service<br /><em>becomes a real product.</em></h2>
          <a href="/work">View selected work <ArrowUpRight size={17} /></a>
        </section>

        <ProcessSection />

        <section className="service-detail__closing">
          <div>
            <p className="section-kicker section-kicker--light"><span>→</span> Start a project</p>
            <h2>Have a digital problem<br /><em>worth solving?</em></h2>
          </div>
          <a href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default ServiceDetailPage;
