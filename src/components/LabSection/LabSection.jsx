import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./LabSection.css";

const labProjects = [
  {
    index: "01",
    title: "Ayora Ocean Retreats",
    category: "Luxury hospitality concept",
    note: "Resort experience / Multi-page / Booking-led UI",
    url: "https://ayora.linukaipad.workers.dev",
    image: "/projects/ayora.png",
  },
  {
    index: "02",
    title: "Studio Lumière",
    category: "Wedding studio concept",
    note: "Editorial storytelling / Portfolio / Luxury direction",
    url: "https://studio-lumiere.linukaipad.workers.dev/",
    image: "/projects/studio.png",
  },
  {
    index: "03",
    title: "Forge Performance Club",
    category: "Performance gym concept",
    note: "High-energy identity / Membership / Mobile-first",
    url: "https://forge-performance-club.linukaipad.workers.dev",
    image: "/projects/gym.png",
  },
  {
    index: "04",
    title: "Nuvéa Glow",
    category: "Skincare storefront demo",
    note: "Social-first commerce / Mobile-first / Reusable storefront",
    url: "https://nuvea-glow.netlify.app/",
    image: "/projects/nuvea.png",
  },
];

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

function LabSection() {
  return (
    <section className="lab-section" id="lab">
      <div className="lab-section__header">
        <motion.div
          className="lab-section__kicker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <span>LAB</span>
          ARK II / Experiments
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Different industries.
          <span> Same obsession.</span>
        </motion.h2>

        <motion.div
          className="lab-section__intro"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          <p>
            A growing archive of self-initiated concepts used to explore
            industries, visual systems and interaction ideas beyond client
            briefs.
          </p>
          <div>
            <i />
            Concept work / Live demos
          </div>
        </motion.div>
      </div>

      <div className="lab-grid">
        {labProjects.map((project, index) => (
          <motion.article
            className={`lab-card ${index === 0 ? "lab-card--featured" : ""}`}
            key={project.title}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
          >
            <a
              className="lab-card__visual"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live concept`}
            >
              <img
                src={project.image}
                alt={`${project.title} website preview`}
                loading="lazy"
              />
              <div className="lab-card__shade" />

              <div className="lab-card__top">
                <span>ARK II LAB / {project.index}</span>
                <span>2026</span>
              </div>

              <div className="lab-card__launch">
                <ArrowUpRight size={20} strokeWidth={1.7} />
              </div>

              <div className="lab-card__overlay-title">
                <span>{project.category}</span>
                <strong>{project.title}</strong>
              </div>
            </a>

            <div className="lab-card__caption">
              <div>
                <span>{project.index}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </div>

              <p>{project.note}</p>

              <a href={project.url} target="_blank" rel="noreferrer">
                Open live concept
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="lab-section__footer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7 }}
      >
        <span>Not client work. Not filler.</span>
        <p>
          LAB exists to show range without pretending every experiment was a
          commissioned project.
        </p>
      </motion.div>
    </section>
  );
}

export default LabSection;
