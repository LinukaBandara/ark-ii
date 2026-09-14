import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { labProjects, workProjects } from "../data/projects";
import "./ArchivePage.css";

function ArchivePage({ section }) {
  const isWork = section === "work";
  const items = isWork ? workProjects : labProjects;
  const [featured, ...rest] = items;
  const title = isWork ? <>Built for the real world.<span> Built to last.</span></> : <>A place to <span>experiment.</span></>;
  const intro = isWork
    ? "The complete ARK II work archive — client websites, business products and software platforms built around real problems."
    : "The complete ARK II Lab — self-initiated concepts, experiments and live digital experiences across different industries.";

  return (
    <div className={`archive-page ${!isWork ? "archive-page--lab" : ""}`}>
      <Navbar />
      <main>
        <section className="archive-hero">
          <div className="archive-hero__top"><a href="/"><ArrowLeft size={15} /> Back home</a><span>{isWork ? "01 / WORK" : "02 / LAB"}</span></div>
          <div className="archive-hero__content">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <p className="archive-kicker">ARK II / {isWork ? "Selected Work" : "Experiments"}</p>
              <h1>{title}</h1>
            </motion.div>
            <motion.p className="archive-hero__intro" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .7 }}>{intro}</motion.p>
          </div>
          <div className="archive-hero__stats"><span>{String(items.length).padStart(2, "0")} projects</span><span>2026 archive</span><span>{isWork ? "Client / Product" : "Concept / Live demo"}</span></div>
        </section>
        <section className="archive-list">
          <ArchiveCard project={featured} featured isLab={!isWork} />
          {rest.map((project) => <ArchiveCard key={project.id} project={project} isLab={!isWork} />)}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ArchiveCard({ project, featured = false, isLab = false }) {
  if (isLab) return <LabArchiveCard project={project} />;

  const imageClass = project.id === "bgs-agristock" ? "archive-card__image--bgs" : "";

  return (
    <motion.article className={`archive-card ${featured ? "archive-card--featured" : ""}`} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .14 }} transition={{ duration: .65, ease: [0.22,1,0.36,1] }}>
      <a className="archive-card__visual" href={project.liveUrl} target="_blank" rel="noreferrer">
        <img className={imageClass} src={project.image} alt={project.imageAlt} loading={featured ? "eager" : "lazy"} referrerPolicy="no-referrer" />
        <div className="archive-card__shade" />
        <div className="archive-card__chrome"><span>{project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span><strong>LIVE</strong></div>
        <div className="archive-card__launch"><ArrowUpRight size={22} /></div>
      </a>
      <div className="archive-card__info">
        <div className="archive-card__index">{project.index}</div>
        <div className="archive-card__body">
          <div className="archive-card__heading"><div><p>{project.type}</p><h2>{project.title}</h2></div><span>{project.year}</span></div>
          <p className="archive-card__category">{project.category}</p>
          <p className="archive-card__description">{project.description}</p>
          <div className="archive-card__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="archive-card__actions"><a href={project.liveUrl} target="_blank" rel="noreferrer">Open live site <ExternalLink size={15} /></a></div>
        </div>
      </div>
    </motion.article>
  );
}

function LabArchiveCard({ project }) {
  return (
    <motion.article className="lab-archive-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, ease: [0.22,1,0.36,1] }}>
      <a className="lab-archive-card__visual" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live site`}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" referrerPolicy="no-referrer" />
        <div className="lab-archive-card__shade" />
        <div className="lab-archive-card__chrome"><span>{project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span><strong>LIVE</strong></div>
        <div className="lab-archive-card__launch"><ArrowUpRight size={19} strokeWidth={1.8} /></div>
      </a>
      <div className="lab-archive-card__info">
        <div className="lab-archive-card__topline"><span>LAB PROJECT</span><ArrowUpRight size={16} /></div>
        <div className="lab-archive-card__heading">
          <h2>{project.title}</h2>
        </div>
        <p className="lab-archive-card__description">{project.description}</p>
        <div className="lab-archive-card__tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </motion.article>
  );
}

export default ArchivePage;
