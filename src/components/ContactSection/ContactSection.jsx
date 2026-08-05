import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { site } from "../../data/site";
import NetworkCanvas from "../NetworkCanvas/NetworkCanvas";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./ContactSection.css";

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    project: "Brand website",
    budget: "LKR 25,000 – 50,000",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = [
      "Hello ARK II, I would like to discuss a project.",
      "",
      `Name: ${form.name || "Not provided"}`,
      `Business: ${form.business || "Not provided"}`,
      `Project: ${form.project}`,
      `Budget: ${form.budget}`,
      `Details: ${
        form.message || "I would like to know more."
      }`,
    ].join("\n");

    const url = `https://wa.me/${
      site.whatsappNumber
    }?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact-section" id="contact">
      <div
        className="contact-section__glow"
        aria-hidden="true"
      />
      <ErrorBoundary>
        <NetworkCanvas variant="contact" />
      </ErrorBoundary>

      <div className="contact-section__heading">
        <motion.div
          className="section-kicker section-kicker--light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <span>06</span>
          Start a project
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Your business deserves
          <span> more than ordinary.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          Tell us what you are building, what needs to improve, or where
          your current digital presence is holding the business back.
        </motion.p>
      </div>

      <div className="contact-section__layout">
        <motion.div
          className="contact-section__details"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75 }}
        >
          <p className="contact-section__availability">
            <span />
            Currently accepting selected projects
          </p>

          <div className="contact-section__direct">
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} strokeWidth={1.7} />
              {site.whatsappDisplay}
              <ArrowUpRight size={17} strokeWidth={1.7} />
            </a>

            {site.email && (
              <a href={`mailto:${site.email}`}>
                <Mail size={18} strokeWidth={1.7} />
                {site.email}
                <ArrowUpRight size={17} strokeWidth={1.7} />
              </a>
            )}
          </div>

          <div className="contact-section__location">
            <span>Based in</span>
            <p>
              {site.location} / {site.serviceArea}
            </p>
          </div>
        </motion.div>

        <motion.form
          className="project-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.08, duration: 0.75 }}
        >
          <div className="project-form__row">
            <label>
              <span>Your name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>Business name</span>
              <input
                type="text"
                name="business"
                placeholder="Your business or brand"
                value={form.business}
                onChange={handleChange}
                autoComplete="organization"
              />
            </label>
          </div>

          <div className="project-form__row">
            <label>
              <span>Project type</span>
              <select
                name="project"
                value={form.project}
                onChange={handleChange}
              >
                <option>Brand website</option>
                <option>Website redesign</option>
                <option>E-commerce website</option>
                <option>Web application</option>
                <option>UI/UX design</option>
                <option>Not sure yet</option>
              </select>
            </label>

            <label>
              <span>Estimated budget</span>
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
              >
                <option>LKR 25,000 – 50,000</option>
                <option>LKR 50,000 – 100,000</option>
                <option>LKR 100,000+</option>
                <option>Need a recommendation</option>
              </select>
            </label>
          </div>

          <label>
            <span>Project details</span>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us what you need, what is not working, or what you want the website to achieve."
              value={form.message}
              onChange={handleChange}
            />
          </label>

          <button type="submit">
            Continue on WhatsApp
            <ArrowUpRight size={19} strokeWidth={1.8} />
          </button>

          <p className="project-form__note">
            Submitting this form opens WhatsApp with your project
            information prepared as a message. Nothing is stored on the
            website.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

export default ContactSection;
