import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "../../data/projects";
import ProjectModal from "../ProjectModal/ProjectModal";
import "./WorkSection.css";

const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function getProjectHost(url) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

function ProjectShowcase({ project, position, onOpen }) {
  const reverse = position % 2 === 1;

  return (
    <motion.article
      className={`work-project ${
        reverse ? "work-project--reverse" : ""
      }`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
    >
      <div className="work-project__screen">
        <div className="work-project__chrome" aria-hidden="true">
          <div className="work-project__dots">
            <i />
            <i />
            <i />
          </div>
          <span>{getProjectHost(project.liveUrl)}</span>
          <strong>LIVE</strong>
        </div>

        <button
          className="work-project__visual"
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open ${project.title} case study`}
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          <span className="work-project__visual-action">
            Case study
            <ArrowUpRight size={18} strokeWidth={1.8} />
          </span>
        </button>
      </div>

      <div className="work-project__info">
        <div className="work-project__meta">
          <span>{project.index} / 03</span>
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>

        <div>
          <h3>{project.title}</h3>
          <p className="work-project__category">
            {project.category}
          </p>
        </div>

        <p className="work-project__description">
          {project.description}
        </p>

        <div className="work-project__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="work-project__actions">
          <button
            type="button"
            onClick={() => onOpen(project)}
          >
            View case study
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live site
            <ExternalLink size={15} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function WorkSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <section className="work-section" id="work">
        <div className="work-section__intro">
          <motion.div
            className="section-kicker"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <span>01</span>
            Selected work / 03
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Real work.
            <span> Built to be remembered.</span>
          </motion.h2>

          <motion.div
            className="work-section__intro-copy"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            <p>
              Three deployed projects across brand, product and
              commerce—each solving a different business problem.
            </p>
            <span>Client work · Internal product · Storefront demo</span>
          </motion.div>
        </div>

        <div className="work-list">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              position={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        <motion.div
          className="work-section__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7 }}
        >
          <p>
            Selected Work stays intentionally small: only projects
            that are live, usable and worth putting the ARK II name
            behind.
          </p>

          <a href="#contact">
            Build something with us
            <ArrowUpRight size={17} strokeWidth={1.8} />
          </a>
        </motion.div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
      />
    </>
  );
}

export default WorkSection;
