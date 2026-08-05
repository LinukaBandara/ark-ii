import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "../../data/projects";
import ProjectModal from "../ProjectModal/ProjectModal";
import "./WorkSection.css";

const reveal = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ProjectCard({ project, layout, onOpen }) {
  return (
    <motion.article
      className={`project-card project-card--${layout}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
    >
      <button
        className="project-card__link"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title} case study`}
      >
        <div className="project-card__visual">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          <div className="project-card__visual-top">
            <span>{project.type}</span>
            <span>{project.year}</span>
          </div>

          <div className="project-card__open">
            <ArrowUpRight size={20} strokeWidth={1.7} />
          </div>

          <span className="project-card__view-label">
            View case study
          </span>

          <span className="project-card__live-badge">
            <i />
            Live
          </span>
        </div>

        <div className="project-card__content">
          <div className="project-card__heading">
            <span className="project-card__index">
              {project.index}
            </span>

            <div>
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </div>
          </div>

          <p className="project-card__description">
            {project.description}
          </p>

          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </button>

      <a
        className="project-card__external"
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
      >
        Visit live project
        <ExternalLink size={15} strokeWidth={1.7} />
      </a>
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
            Selected work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Built to be
            <span> remembered.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            Three real, deployed projects—one client website, one
            internal business product, and one reusable storefront
            demo.
          </motion.p>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              layout={
                index === 0
                  ? "featured"
                  : index === 1
                    ? "left"
                    : "right"
              }
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        <motion.div
          className="work-section__footer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7 }}
        >
          <p>
            Every project is labelled honestly according to what it
            is: client work, an internal product, or a reusable demo.
          </p>

          <a href="#contact">
            Discuss your project
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
