import { motion } from "framer-motion";
import "./ProcessSection.css";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "We understand the business, audience, goals and real problem behind the project.",
  },
  {
    number: "02",
    title: "Define",
    text: "We establish the positioning, structure, content direction and project priorities.",
  },
  {
    number: "03",
    title: "Design",
    text: "We create a distinct visual system and responsive experience shaped around the brand.",
  },
  {
    number: "04",
    title: "Develop",
    text: "We turn the approved direction into a polished, responsive and high-performance product.",
  },
  {
    number: "05",
    title: "Deploy",
    text: "We test, refine, launch and make sure the final experience works reliably across devices.",
  },
];

function ProcessSection() {
  return (
    <section className="process-section">
      <div className="process-section__heading">
        <motion.div
          className="section-kicker section-kicker--light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <span>04</span>
          The process
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 38 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Clear from
          <span> start to launch.</span>
        </motion.h2>
      </div>

      <div className="process-section__steps">
        {steps.map((step, index) => (
          <motion.article
            className="process-step"
            key={step.number}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              delay: index * 0.06,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="process-step__top">
              <span>{step.number}</span>
              <i />
            </div>

            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="process-section__closing"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.7 }}
      >
        <p>
          You always know what is being built,
          <span> why it matters,</span> and what comes next.
        </p>
      </motion.div>
    </section>
  );
}

export default ProcessSection;
