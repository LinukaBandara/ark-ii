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
    title: <>Premium business websites built to <span>be chosen.</span></>,
    description: "ARK II provides premium web design services for business websites that need clearer positioning, stronger UX and a more confident path to enquiry — for ambitious businesses in the US, UK, Australia and worldwide.",
    meta: ["Strategy + UI/UX", "Responsive by default", "Working worldwide"],
    points: [
      ["Positioning & structure", "Clarify the offer, audience and page hierarchy before visual design begins."],
      ["Premium UI/UX", "Create a distinctive interface with purposeful typography, spacing, imagery and interaction."],
      ["Conversion paths", "Shape navigation and calls to action around the actions that matter to the business."],
      ["Responsive delivery", "Build a consistent experience across mobile, tablet and desktop without compromising the visual system."]
    ],
    deliverables: ["Website strategy", "Information architecture", "UI/UX design", "Responsive development", "CMS/content integration", "Launch support"],
    projects: "Brand websites, service businesses, hospitality, studios, professional services and ambitious small businesses.",
    when: "Choose this when the website needs to establish trust quickly, explain a clear offer and give visitors a confident path to enquiry.",
    relatedWork: [
      ["Ceylon Gem Atelier", "Premium gemstone digital experience", "/work/ceylon-gem-atelier"],
      ["Suranga Gems", "Luxury brand website", "/work/suranga-gems"]
    ],
    faqs: [
      ["What is included in a business website design project?", "Typical work can include strategy, information architecture, UI/UX design, responsive development, content integration and launch support."],
      ["Can ARK II design a website for an international business?", "Yes. ARK II works remotely from Sri Lanka with businesses in the US, UK, Australia and other markets worldwide."],
      ["Is the website designed for mobile devices?", "Yes. Responsive behaviour is planned as part of the design so the experience works across mobile, tablet and desktop."]
    ]
  },
  "web-development": {
    number: "02",
    label: "Web Development",
    title: <>Web development that turns design into <span>working systems.</span></>,
    description: "ARK II provides custom web development for responsive business websites and digital products, with integrations, performance and maintainable architecture built in for businesses in the US, UK, Australia and worldwide.",
    meta: ["Frontend + integrations", "Performance focused", "Built for growth"],
    points: [
      ["Production-ready frontend", "Translate approved designs into responsive, accessible interfaces with reusable components."],
      ["API & data integration", "Connect websites and products to APIs, databases, forms, authentication and third-party services where required."],
      ["Performance foundations", "Keep assets, rendering and page structure focused on a fast experience across devices."],
      ["Maintainable delivery", "Use a clear project structure so the product can be improved instead of rebuilt every time."]
    ],
    deliverables: ["Frontend development", "API integration", "Database integration", "Forms & workflows", "Responsive implementation", "Deployment support"],
    projects: "Marketing websites, business platforms, client portals, dashboards and custom digital experiences.",
    when: "Choose this when an existing design or product direction needs a reliable technical implementation, integrations and a maintainable frontend.",
    relatedWork: [
      ["DispatchArc", "Operations & dispatch platform", "/work/dispatcharc"],
      ["BGS AgriStock", "Inventory management system", "/work/bgs-agristock"]
    ],
    faqs: [
      ["What kind of web applications can ARK II build?", "Projects can include internal tools, dashboards, customer portals, booking systems, inventory systems and other workflow-driven business software."],
      ["Can a web application have different user roles?", "Yes. Interfaces and permissions can be structured around admins, staff, customers and other user types where the workflow requires it."],
      ["Does ARK II build the backend as well as the frontend?", "The scope can cover frontend development, APIs, database workflows and integrations so the application works as a complete product."]
    ]
  },
  "web-app-development": {
    number: "03",
    label: "Web App Development",
    title: <>Custom web applications for <span>real operations.</span></>,
    description: "ARK II provides custom web application development for businesses in the US, UK, Australia and worldwide that need dashboards, portals, workflows and data-driven software beyond a standard website.",
    meta: ["Product thinking", "Custom workflows", "Business software"],
    points: [
      ["Workflow mapping", "Turn manual or fragmented processes into clear digital flows before development starts."],
      ["Role-based experiences", "Design interfaces around the responsibilities of admins, staff, customers and other users."],
      ["Data-driven interfaces", "Build dashboards, records, search, filtering, reporting and other views around useful information."],
      ["Scalable foundations", "Structure the application so features can evolve as the business learns what it needs."]
    ],
    deliverables: ["Product discovery", "UX flows", "Dashboard & portal UI", "Frontend development", "API integration", "Database workflows"],
    projects: "Internal tools, operational dashboards, customer portals, booking systems, inventory systems and business platforms.",
    faqs: [
      ["What kind of web applications can ARK II build?", "Projects can include internal tools, dashboards, customer portals, booking systems, inventory systems and other workflow-driven business software."],
      ["Can a web application have different user roles?", "Yes. Interfaces and permissions can be structured around admins, staff, customers and other user types where the workflow requires it."],
      ["Does ARK II build the backend as well as the frontend?", "The scope can cover frontend development, APIs, database workflows and integrations so the application works as a complete product."]
    ],
    when: "Choose this when the business needs software around workflows, users, data or operational tasks that a standard marketing website cannot handle.",
    relatedWork: [
      ["DispatchArc", "Operations & dispatch platform", "/work/dispatcharc"],
      ["BGS AgriStock", "Inventory management system", "/work/bgs-agristock"]
    ]
  },
  "website-redesign": {
    number: "04",
    label: "Website Redesign",
    title: <>Turn an outdated website into a <span>stronger first impression.</span></>,
    description: "ARK II provides website redesign services for businesses in the US, UK, Australia and worldwide with outdated or unclear websites, combining UX restructuring, visual design and responsive redevelopment.",
    meta: ["Audit + strategy", "UX restructuring", "Visual rebuild"],
    points: [
      ["Website audit", "Identify clarity, content, UX and responsive issues that are getting in the way of the current site."],
      ["Content & hierarchy", "Reorganise the important information so visitors can understand the business faster."],
      ["Visual direction", "Refresh the interface while keeping what is useful and removing what feels dated or inconsistent."],
      ["Rebuild & refine", "Implement the new experience with responsive behaviour, performance and a cleaner component structure."]
    ],
    deliverables: ["UX audit", "Content hierarchy", "Visual redesign", "Responsive rebuild", "Technical cleanup", "Launch support"],
    projects: "Established businesses, service companies, studios and brands whose current website no longer matches their ambition.",
    when: "Choose this when the current website is dated, difficult to navigate, weak on mobile or no longer reflects the quality of the business.",
    relatedWork: [
      ["Suranga Gems", "Luxury brand website", "/work/suranga-gems"],
      ["Ceylon Gem Atelier", "Premium gemstone digital experience", "/work/ceylon-gem-atelier"]
    ],
    faqs: [
      ["When does a business need a website redesign?", "A redesign makes sense when the current website is outdated, difficult to use, weak on mobile, unclear about the offer or no longer reflects the quality of the business."],
      ["Does ARK II redesign existing websites?", "Yes. ARK II can audit the existing experience, restructure content and UX, refresh the visual direction and rebuild the website responsively."],
      ["Can a redesign include SEO foundations?", "Yes. The rebuild can include clean page structure, responsive implementation, metadata, internal linking and other foundational SEO considerations."]
    ]
  }
};

function ServiceDetailPage({ slug }) {
  const service = serviceData[slug] || serviceData["web-design"];

  useEffect(() => {
    document.title = `ARK II | ${service.label} Services | Premium Digital Studio`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", service.description);
    const socialTitle = document.querySelector('meta[property="og:title"]');
    const socialDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (socialTitle) socialTitle.setAttribute("content", document.title);
    if (socialDescription) socialDescription.setAttribute("content", service.description);
    if (twitterTitle) twitterTitle.setAttribute("content", document.title);
    if (twitterDescription) twitterDescription.setAttribute("content", service.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://ark-ii.studio/services/${slug}`);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://ark-ii.studio/services/${slug}`);

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
          "@type": "WebPage",
          "@id": `https://ark-ii.studio/services/${slug}#webpage`,
          url: `https://ark-ii.studio/services/${slug}`,
          name: `ARK II | ${service.label} Services | Premium Digital Studio`,
          description: service.description,
          isPartOf: { "@id": "https://ark-ii.studio/#website" },
          about: { "@id": `https://ark-ii.studio/services/${slug}#service` },
          inLanguage: "en"
        },
        {
          "@type": "Service",
          "@id": `https://ark-ii.studio/services/${slug}#service`,
          name: service.label,
          description: service.description,
          url: `https://ark-ii.studio/services/${slug}`,
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
          "@id": `https://ark-ii.studio/services/${slug}#breadcrumb`,
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
              item: `https://ark-ii.studio/services/${slug}`
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

        <section className="service-detail__other-services">
          <p className="section-kicker"><span>→</span> Related services</p>
          <div className="service-detail__other-grid">
            {Object.entries(serviceData).filter(([key]) => key !== slug).map(([key, item]) => (
              <a key={key} href={`/services/${key}`}>
                <span>{item.number}</span>
                <strong>{item.label}</strong>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </section>

        <section className="service-detail__fit service-detail__fit--light">
          <div className="service-detail__fit-grid">
            <div>
              <p className="section-kicker"><span>→</span> Is this the right fit?</p>
              <h2>Start with the <em>job to be done.</em></h2>
            </div>
            <p>{service.when}</p>
          </div>
        </section>

        <section className="service-detail__work">
          <div className="service-detail__work-head">
            <div>
              <p className="section-kicker"><span>→</span> Related work</p>
              <h2>See the approach<br /><em>in practice.</em></h2>
            </div>
            <a href="/work">View all work <ArrowUpRight size={16} /></a>
          </div>
          <div className="service-detail__work-grid">
            {service.relatedWork.map(([title, category, href]) => (
              <a key={href} href={href}>
                <span>{category}</span>
                <strong>{title}</strong>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </section>

        <section className="service-detail__planning">
          <p className="section-kicker"><span>→</span> Planning a website</p>
          <div>
            <h2>Understand the scope before comparing <em>quotes.</em></h2>
            <p>Project cost depends on pages, content, design depth, functionality, integrations and ongoing ownership. Use the ARK II guide to understand the variables before choosing a web design or development partner.</p>
            <a href="/resources/business-website-cost">Read the business website cost guide <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="service-detail__faq">
          <p className="section-kicker"><span>→</span> Common questions</p>
          <div className="service-detail__faq-list">
            {service.faqs?.map(([question, answer]) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
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
