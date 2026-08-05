import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, Plus } from "lucide-react";
import { services } from "../../data/services";
import "./ServicesSection.css";

function ServiceItem({ service, index, isOpen, onToggle }) {
  const triggerId = `service-trigger-${index}`;
  const panelId = `service-panel-${index}`;

  return (
    <article
      className={`service-item ${
        isOpen ? "service-item--open" : ""
      }`}
    >
      <button
        className="service-item__trigger"
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="service-item__number">
          {service.number}
        </span>
        <span className="service-item__title">
          {service.title}
        </span>

        <span className="service-item__icon" aria-hidden="true">
          <Plus size={20} strokeWidth={1.6} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="service-item__body"
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="service-item__body-inner">
              <p>{service.description}</p>

              <div className="service-item__deliverables">
                {service.deliverables.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="services-section" id="services">
      <div className="services-section__heading">
        <motion.div
          className="section-kicker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <span>03</span>
          Capabilities
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
          What we
          <span> build.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          From first idea to final launch, ARK II creates focused digital
          experiences that support real business growth.
        </motion.p>
      </div>

      <motion.div
        className="services-section__list"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {services.map((service, index) => (
          <ServiceItem
            key={service.number}
            service={service}
            index={index}
            isOpen={activeService === index}
            onToggle={() =>
              setActiveService(
                activeService === index ? -1 : index,
              )
            }
          />
        ))}
      </motion.div>

      <motion.a
        className="services-section__cta"
        href="#contact"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.65 }}
      >
        Tell us what you need
        <ArrowDownRight size={19} strokeWidth={1.7} />
      </motion.a>
    </section>
  );
}

export default ServicesSection;
