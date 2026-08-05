import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./StudioSection.css";

const tickerItems = [
  "STRATEGY",
  "IDENTITY",
  "DESIGN",
  "DEVELOPMENT",
  "DIRECTION",
];

const tickerSequence = Array.from(
  { length: 4 },
  () => tickerItems,
).flat();

function TickerGroup() {
  return (
    <div className="studio-section__ticker-group">
      {tickerSequence.map((item, index) => (
        <span className="studio-section__ticker-item" key={`${item}-${index}`}>
          <span>{item}</span>
          <i />
        </span>
      ))}
    </div>
  );
}

function StudioSection() {
  return (
    <section className="studio-section" id="studio">
      <div className="studio-section__grid">
        <motion.div
          className="section-kicker section-kicker--light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <span>02</span>
          The studio
        </motion.div>

        <motion.div
          className="studio-section__statement"
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="studio-section__lead">
            Not another
            <span> template agency.</span>
          </p>

          <p className="studio-section__copy">
            ARK II combines strategy, storytelling, interface design and
            development to turn ordinary businesses into memorable digital
            brands.
          </p>
        </motion.div>

        <motion.div
          className="studio-section__manifesto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.08, duration: 0.75 }}
        >
          <div className="studio-section__line">
            <span>We design for</span>
            <strong>clarity.</strong>
          </div>

          <div className="studio-section__line">
            <span>We build for</span>
            <strong>performance.</strong>
          </div>

          <div className="studio-section__line">
            <span>We create for</span>
            <strong>impact.</strong>
          </div>
        </motion.div>

        <motion.div
          className="studio-section__meta"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          <p>
            Based in Sri Lanka.
            <br />
            Working with businesses everywhere.
          </p>

          <a href="#contact">
            Meet ARK II
            <ArrowUpRight size={17} strokeWidth={1.8} />
          </a>
        </motion.div>
      </div>

      <div className="studio-section__ticker" aria-hidden="true">
        <div className="studio-section__ticker-track">
          <TickerGroup />
          <TickerGroup />
        </div>
      </div>
    </section>
  );
}

export default StudioSection;
