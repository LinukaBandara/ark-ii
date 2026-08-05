import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  X,
} from "lucide-react";
import "./ProjectModal.css";

function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    previousFocusRef.current = document.activeElement;
    document.body.classList.add("has-dialog");

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 80);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("has-dialog");
      previousFocusRef.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.section
            className="project-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-${project.id}-title`}
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.62,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="project-modal__topbar">
              <span>{project.type}</span>

              <div className="project-modal__top-actions">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live site
                  <ExternalLink size={15} strokeWidth={1.7} />
                </a>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label={`Close ${project.title} case study`}
                >
                  <X size={22} strokeWidth={1.6} />
                </button>
              </div>
            </div>

            <div className="project-modal__hero">
              <div>
                <p>
                  {project.index} / {project.year}
                </p>
                <h2 id={`project-${project.id}-title`}>
                  {project.title}
                </h2>
                <span>{project.category}</span>
              </div>

              <p>{project.description}</p>
            </div>

            <div className="project-modal__image">
              <img
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="project-modal__facts">
              <div>
                <span>Status</span>
                <p>{project.status}</p>
              </div>

              <div>
                <span>Capabilities</span>
                <p>{project.tags.join(" · ")}</p>
              </div>
            </div>

            <div className="project-modal__story">
              <article>
                <span>01 / Challenge</span>
                <p>{project.challenge}</p>
              </article>

              <article>
                <span>02 / Approach</span>
                <p>{project.approach}</p>
              </article>

              <article>
                <span>03 / Outcome</span>
                <p>{project.outcome}</p>
              </article>
            </div>

            <div className="project-modal__cta">
              <p>Explore the finished project.</p>

              <div className="project-modal__cta-actions">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit live site
                  <ExternalLink size={18} strokeWidth={1.8} />
                </a>

                <a href="#contact" onClick={onClose}>
                  Start a project
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
