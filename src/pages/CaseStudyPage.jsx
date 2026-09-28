import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";
import { workProjects } from "../data/projects";
import "./CaseStudyPage.css";

function CaseStudyPage({ slug }) {
  const project = workProjects.find((item) => item.id === slug) || workProjects[0];

  useEffect(() => {
    const title = `ARK II | ${project.title} — ${project.category} Case Study`;
    document.title = title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", project.description);
    const socialTitle = document.querySelector('meta[property="og:title"]');
    const socialDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (socialTitle) socialTitle.setAttribute("content", document.title);
    if (socialDescription) socialDescription.setAttribute("content", project.description);
    if (twitterTitle) twitterTitle.setAttribute("content", document.title);
    if (twitterDescription) twitterDescription.setAttribute("content", project.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://ark-ii.studio/work/${project.id}`);

    let schema = document.getElementById("case-study-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "case-study-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://ark-ii.studio/work/${project.id}#webpage`,
          url: `https://ark-ii.studio/work/${project.id}`,
          name: title,
          description: project.description,
          isPartOf: { "@id": "https://ark-ii.studio/#website" },
          about: { "@id": `https://ark-ii.studio/work/${project.id}#case-study` },
          inLanguage: "en"
        },
        {
          "@type": "CreativeWork",
          "@id": `https://ark-ii.studio/work/${project.id}#case-study`,
          name: project.title,
          description: project.description,
          url: `https://ark-ii.studio/work/${project.id}`,
          image: project.image.startsWith("http") ? project.image : `https://ark-ii.studio${project.image}`,
          creator: { "@type": "Organization", "@id": "https://ark-ii.studio/#organization", name: "ARK II", url: "https://ark-ii.studio/" },
          keywords: project.tags.join(", "),
          dateCreated: project.year,
          about: project.category,
          mainEntityOfPage: { "@id": `https://ark-ii.studio/work/${project.id}#webpage` }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://ark-ii.studio/work/${project.id}#breadcrumb`,
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
              name: "Work",
              item: "https://ark-ii.studio/work"
            },
            {
              "@type": "ListItem",
              position: 3,
              name: project.title,
              item: `https://ark-ii.studio/work/${project.id}`
            }
          ]
        }
      ]
    });

    window.scrollTo(0, 0);

    return () => {
      document.getElementById("case-study-schema")?.remove();
    };
  }, [project]);

  return (
    <div className="case-study-page">
      <Navbar />
      <main>
        <section className="case-study__hero">
          <div className="case-study__top">
            <a href="/work"><ArrowLeft size={15} /> All work</a>
            <span>{project.index} / 05 CASE STUDY</span>
          </div>

          <div className="case-study__grid">
            <div>
              <p className="case-study__kicker">ARK II / {project.type}</p>
              <h1>{project.title}<span>.</span></h1>
              <p className="case-study__category">{project.category}</p>
            </div>
            <div className="case-study__intro">
              <p>{project.description}</p>
              <p className="case-study__service-context">ARK II {project.category.toLowerCase()} — relevant to businesses looking for premium web design, web development or custom digital products.</p>
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                View live project <ExternalLink size={15} />
              </a>
            </div>
          </div>

          <div className="case-study__visual">
            <img src={project.image} alt={project.imageAlt} />
          </div>
        </section>

        <section className="case-study__overview">
          <div>
            <p className="section-kicker"><span>01</span> Project overview</p>
            <h2>A digital experience<br /><em>with a job to do.</em></h2>
          </div>
          <div className="case-study__overview-copy">
            <div><span>Challenge</span><p>{project.challenge}</p></div>
            <div><span>Approach</span><p>{project.approach}</p></div>
            <div><span>Outcome</span><p>{project.outcome}</p></div>
          </div>
        </section>

        <section className="case-study__seo-intro">
          <div>
            <p className="section-kicker"><span>02</span> Project details</p>
            <h2>From brief to <em>built experience.</em></h2>
          </div>
          <div>
            <p>{project.title} is a {project.category.toLowerCase()} created by ARK II. The project brings together strategy, interface design and development around a specific business or product need.</p>
            <p>Explore the challenge, approach, technology and outcome below to see how the work was shaped from an initial brief into a usable digital experience.</p>
          </div>
        </section>

        <section className="case-study__stack">
          <div>
            <p className="section-kicker section-kicker--light"><span>02</span> Build</p>
            <h2>Tools behind<br /><em>the work.</em></h2>
          </div>
          <div className="case-study__tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </section>

        <section className="case-study__next">
          <p className="section-kicker"><span>03</span> More work</p>
          <div>
            {workProjects.filter((item) => item.id !== project.id).slice(0, 3).map((item) => (
              <a key={item.id} href={`/work/${item.id}`}>
                <span>{item.title}</span>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </section>

        <section className="case-study__service-link">
          <p className="section-kicker"><span>→</span> Need something similar?</p>
          <h2>Explore ARK II<br /><em>services.</em></h2>
          <div>
            <a href="/services/web-design">Web Design <ArrowUpRight size={16} /></a>
            <a href="/services/web-development">Web Development <ArrowUpRight size={16} /></a>
            <a href="/services/web-app-development">Web App Development <ArrowUpRight size={16} /></a>
            <a href="/services/website-redesign">Website Redesign <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="case-study__closing">
          <div>
            <p className="section-kicker section-kicker--light"><span>→</span> Have a similar project?</p>
            <h2>Let's build something<br /><em>worth remembering.</em></h2>
          </div>
          <a href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default CaseStudyPage;
