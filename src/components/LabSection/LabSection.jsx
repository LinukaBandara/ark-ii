import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { labProjects } from "../../data/projects";
import "./LabSection.css";

const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

function LabSection() {
  const previewProjects = labProjects.slice(0, 4);

  return (
    <section className="lab-section" id="lab">
      <div className="lab-section__header">
        <motion.div className="lab-section__kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6 }}>
          <span>LAB</span> ARK II / Experiments
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          Different industries.<span> Same obsession.</span>
        </motion.h2>
        <motion.div className="lab-section__intro" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ delay: 0.08, duration: 0.7 }}>
          <p>A growing archive of self-initiated concepts used to explore industries, visual systems and interaction ideas beyond client briefs.</p>
          <div><i /> Concept work / Live demos</div>
        </motion.div>
      </div>

      <div className="lab-grid">
        {previewProjects.map((project, index) => (
          <motion.article className={`lab-card ${index === 0 ? "lab-card--featured" : ""}`} key={project.id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }}>
            <a className="lab-card__visual" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live concept`}>
              <img src={project.image} alt={`${project.title} website preview`} loading="lazy" referrerPolicy="no-referrer" />
              <div className="lab-card__shade" />
              <div className="lab-card__top"><span>ARK II LAB / {String(index + 1).padStart(2, "0")}</span><span>2026</span></div>
              <div className="lab-card__launch"><ArrowUpRight size={20} strokeWidth={1.7} /></div>
              <div className="lab-card__overlay-title"><span>{project.category}</span><strong>{project.title}</strong></div>
            </a>
            <div className="lab-card__caption">
              <div><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{project.title}</h3><p>{project.category}</p></div></div>
              <p>{project.tags.slice(0, 3).join(" / ")}</p>
              <a href={project.liveUrl} target="_blank" rel="noreferrer">Open live concept <ArrowUpRight size={15} strokeWidth={1.8} /></a>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div className="lab-section__footer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.7 }}>
        <div><span>01—06 / LAB ARCHIVE</span><p>Not client work. Not filler. Explore the full collection of experiments and live concepts.</p></div>
        <a href="/lab">Explore the full lab <ArrowUpRight size={17} strokeWidth={1.8} /></a>
      </motion.div>
    </section>
  );
}

export default LabSection;
