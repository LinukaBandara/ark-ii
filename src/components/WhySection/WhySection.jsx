import { motion } from "framer-motion";
import { Check, MoveUpRight } from "lucide-react";
import NetworkCanvas from "../NetworkCanvas/NetworkCanvas";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./WhySection.css";

const principles = [
  {
    number: "01",
    title: "Mobile-first by default",
    description:
      "The smallest screen is never an afterthought. Every experience is planned for real users browsing on their phones.",
  },
  {
    number: "02",
    title: "Original design systems",
    description:
      "Each project receives its own typography, layout rhythm, visual language and interaction style.",
  },
  {
    number: "03",
    title: "Clear communication",
    description:
      "You always know the current stage, the reason behind each decision and what is required next.",
  },
  {
    number: "04",
    title: "Performance-focused",
    description:
      "Strong visuals are balanced with responsive code, sensible loading behaviour and practical usability.",
  },
  {
    number: "05",
    title: "Built for business goals",
    description:
      "Every page is designed to strengthen trust, support enquiries and make the business easier to choose.",
  },
];

function WhySection() {
  return (
    <section className="why-section">
      <div className="why-section__top">
        <motion.div
          className="section-kicker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <span>05</span>
          Why ARK II
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
          Less noise.
          <span> More intention.</span>
        </motion.h2>

        <motion.div
          className="why-section__intro"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          <p>
            ARK II is built for businesses that want more than a website
            that simply exists. We create digital experiences that
            communicate quality before a customer reads the first
            paragraph.
          </p>

          <a href="#contact">
            Build with ARK II
            <MoveUpRight size={18} strokeWidth={1.7} />
          </a>
        </motion.div>
      </div>

      <div className="why-section__layout">
        <motion.div
          className="why-section__mark"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <ErrorBoundary>
            <NetworkCanvas variant="why" />
          </ErrorBoundary>

          <div className="why-section__wordmark" aria-label="ARK II">
            <span>ARK</span>
            <strong>II</strong>
          </div>

          <i className="why-section__signal" aria-hidden="true" />
        </motion.div>

        <div className="why-section__principles">
          {principles.map((principle, index) => (
            <motion.article
              className="principle"
              key={principle.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                delay: index * 0.05,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="principle__icon" aria-hidden="true">
                <Check size={15} strokeWidth={2} />
              </div>

              <span className="principle__number">
                {principle.number}
              </span>

              <div className="principle__content">
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhySection;
