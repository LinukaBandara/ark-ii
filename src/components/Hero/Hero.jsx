import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import NetworkCanvas from "../NetworkCanvas/NetworkCanvas";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./Hero.css";

const lineVariants = {
  hidden: { y: "115%" },
  visible: (delay) => ({
    y: "0%",
    transition: {
      delay,
      duration: 1.05,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

function Hero({ ready = true }) {
  const fadeState = ready
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 18 };

  return (
    <section className="hero" id="top">
      <div className="hero__noise" aria-hidden="true" />
      <div className="hero__orb hero__orb--one" aria-hidden="true" />
      <div className="hero__orb hero__orb--two" aria-hidden="true" />

      <div className="hero__grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <ErrorBoundary>
          <NetworkCanvas variant="hero" />
        </ErrorBoundary>

      <div className="hero__content">
        <motion.div
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={fadeState}
          transition={{ delay: 0.18, duration: 0.65 }}
        >
          <span className="hero__status-dot" />
          Independent digital studio
        </motion.div>

        <h1
          className="hero__title"
          aria-label="We build digital identities that move business"
        >
          <span className="hero__line hero__line--sans">
            <span className="hero__line-mask">
              <motion.span
                custom={0.16}
                variants={lineVariants}
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
              >
                We build
              </motion.span>
            </span>
          </span>

          <span className="hero__line hero__line--serif">
            <span className="hero__line-mask">
              <motion.span
                custom={0.28}
                variants={lineVariants}
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
              >
                digital identities
              </motion.span>
            </span>
          </span>

          <span className="hero__line hero__line--sans hero__line--last">
            <span className="hero__line-mask">
              <motion.span
                custom={0.4}
                variants={lineVariants}
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
              >
                that move business.
              </motion.span>
            </span>
          </span>
        </h1>

        <div className="hero__bottom">
          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 22 }}
            animate={fadeState}
            transition={{ delay: 0.78, duration: 0.75 }}
          >
            ARK II creates strategic, high-performance websites for
            ambitious businesses ready to become impossible to ignore.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 22 }}
            animate={fadeState}
            transition={{ delay: 0.9, duration: 0.75 }}
          >
            <a className="button button--primary" href="#work">
              Explore our work
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>

            <a className="button button--ghost" href="#contact">
              Start a project
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        className="hero__scroll"
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.25, duration: 0.7 }}
      >
        <span>Scroll to discover</span>
        <ArrowDown size={15} strokeWidth={1.7} />
      </motion.a>

      <motion.div
        className="hero__signature"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.35, duration: 0.7 }}
      >
        <span>Design</span>
        <span>Development</span>
        <span>Direction</span>
      </motion.div>
    </section>
  );
}

export default Hero;
