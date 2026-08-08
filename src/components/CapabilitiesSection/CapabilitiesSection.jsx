import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  PenTool,
} from "lucide-react";
import ArkCoreCanvas from "./ArkCoreCanvas";
import "./CapabilitiesSection.css";

const capabilities = [
  {
    number: "01",
    title: "Frontend",
    tagline: "Fast. Interactive. Resilient.",
    description:
      "Responsive interfaces built for clarity, speed and polished interaction across devices.",
    items: [
      "React",
      "Vite",
      "JavaScript",
      "Responsive UI",
      "Motion & interaction",
    ],
    icon: Code2,
  },
  {
    number: "02",
    title: "Backend + Data",
    tagline: "Structured. Secure. Practical.",
    description:
      "Business logic, data flows and integrations shaped around the product rather than unnecessary complexity.",
    items: ["Node.js", "PHP", "MySQL", "REST APIs"],
    icon: Database,
  },
  {
    number: "03",
    title: "Infrastructure",
    tagline: "Deployed. Tested. Ready.",
    description:
      "Production delivery across modern hosting platforms with attention to reliability and maintainability.",
    items: ["Cloudflare", "Vercel", "Netlify", "Railway", "GitHub"],
    icon: Cloud,
  },
  {
    number: "04",
    title: "Product + Design",
    tagline: "Useful. Distinct. Intentional.",
    description:
      "Visual systems and product decisions built around brand character, usability and real business goals.",
    items: [
      "UI/UX Design",
      "Responsive systems",
      "Design systems",
      "Prototyping",
      "Performance optimization",
    ],
    icon: PenTool,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCapability = capabilities[activeIndex];

  return (
    <section className="capabilities-section" id="capabilities">
      <div className="capabilities-section__grid" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="capabilities-section__content">
        <motion.div
          className="capabilities-section__intro"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <div className="capabilities-kicker">
            <span>CAPABILITIES</span>
            ARK CORE
          </div>

          <h2>
            What we
            <span> build with.</span>
          </h2>

          <p>
            We choose the technology around the problem — not the other way
            around. Every decision is made for performance, clarity and long
            term value.
          </p>

          <a href="#contact">
            Discuss your project
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </motion.div>

        <div className="capabilities-section__core-space" aria-hidden="true">
          <ArkCoreCanvas activeIndex={activeIndex} />
          <span className="capabilities-core-label capabilities-core-label--strategy">
            Strategy
          </span>
          <span className="capabilities-core-label capabilities-core-label--design">
            Design
          </span>
          <span className="capabilities-core-label capabilities-core-label--development">
            Development
          </span>
          <span className="capabilities-core-label capabilities-core-label--deployment">
            Deployment
          </span>
          <div className="capabilities-core-name">
            <i />
            ARK CORE
          </div>
        </div>

        <motion.div
          className="capabilities-panel"
          initial={{ opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const active = index === activeIndex;

            return (
              <article
                className={`capability-row ${
                  active ? "capability-row--active" : ""
                }`}
                key={capability.number}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <button
                  className="capability-row__trigger"
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={active}
                >
                  <span className="capability-row__number">
                    {capability.number}
                  </span>
                  <span className="capability-row__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.45} />
                  </span>
                  <span className="capability-row__title">
                    {capability.title}
                  </span>
                  <span className="capability-row__arrow" aria-hidden="true">
                    →
                  </span>
                </button>

                <div className="capability-row__body">
                  <div className="capability-row__copy">
                    <span>{capability.tagline}</span>
                    <p>{capability.description}</p>
                  </div>

                  <div className="capability-row__items">
                    {capability.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        className="capabilities-flow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7 }}
      >
        <div className="capabilities-flow__mark" aria-hidden="true">
          <i />
          <span />
        </div>

        <div className="capabilities-flow__heading">
          <strong>From idea to production.</strong>
          <span>One connected process.</span>
        </div>

        <div className="capabilities-flow__steps" aria-label="Production flow">
          {["Strategy", "Design", "Development", "Deployment"].map(
            (step, index) => (
              <span key={step}>
                {step}
                {index < 3 ? <i aria-hidden="true">→</i> : null}
              </span>
            ),
          )}
        </div>

        <div className="capabilities-flow__signal" aria-hidden="true">
          <i />
        </div>
      </motion.div>

      <span className="capabilities-section__active" aria-live="polite">
        {activeCapability.title}
      </span>
    </section>
  );
}

export default CapabilitiesSection;
