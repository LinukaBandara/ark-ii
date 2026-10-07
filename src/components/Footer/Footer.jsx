import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "../../data/site";
import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__statement">
          <a
            className="footer__brand"
            href="#top"
            aria-label="ARK II home"
          >
            <span>ARK</span>
            <strong>II</strong>
          </a>

          <h2>
            Independent thinking.
            <span> Intentional digital work.</span>
          </h2>
        </div>

        <div className="footer__action">
          <p>
            Ready to give your business a stronger digital identity?
          </p>

          <a href="/#contact">
            Start a project
            <ArrowUpRight size={18} strokeWidth={1.8} />
          </a>
        </div>
      </div>

      <div className="footer__middle">
        <p className="footer__description">
          {site.description}
        </p>

        <div className="footer__links">
          <div>
            <span>Navigate</span>
            <a href="/work">Work</a>
            <a href="/lab">Lab</a>
            <a href="/services">Services</a>
            <a href="/resources/business-website-cost">Website cost guide</a>
            <a href="/studio">Studio</a>
            <a href="/#contact">Contact</a>
          </div>

          <div>
            <span>Connect</span>
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
              <ArrowUpRight size={14} strokeWidth={1.7} />
            </a>

            {site.email && (
              <a href={`mailto:${site.email}`}>
                Email
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </a>
            )}

            <div className="footer__socials" aria-label="ARK II social media">
              <a href={site.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.4" cy="6.7" r="1" fill="currentColor"/></svg>
              </a>
              <a href={site.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V13h2.8v8h3.4Z" fill="currentColor"/></svg>
              </a>
              <a href={site.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok" title="TikTok">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.7 3c.3 2.2 1.5 3.5 3.7 3.7v3.1c-1.9.1-3.2-.5-3.7-1v6.1a5.1 5.1 0 1 1-4.4-5.1v3.2a2 2 0 1 0 1.3 1.9V3h3.1Z" fill="currentColor"/></svg>
              </a>
              <a href={site.linkedinUrl || "#"} target={site.linkedinUrl ? "_blank" : undefined} rel={site.linkedinUrl ? "noreferrer" : undefined} aria-label="LinkedIn" title={site.linkedinUrl ? "LinkedIn" : "LinkedIn — link coming soon"} className={!site.linkedinUrl ? "is-disabled" : ""} onClick={!site.linkedinUrl ? (event) => event.preventDefault() : undefined}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.1 8.2H2.2V21h2.9V8.2ZM3.7 3a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 3.7 3ZM8.4 8.2V21h2.9v-6.3c0-1.7.3-3.4 2.5-3.4s2.2 2 2.2 3.5V21h2.9v-6.8c0-3.3-.7-5.8-4.4-5.8-1.8 0-3 .9-3.5 1.8h-.1V8.2H8.4Z" fill="currentColor"/></svg>
              </a>
            </div>
          </div>

          <div>
            <span>Location</span>
            <p>{site.location}</p>
            <p>{site.serviceArea}</p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 ARK II</p>
        <p>All projects designed and developed by ARK II</p>
        <p>All rights reserved</p>

        <button
          className="footer__back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to the top"
        >
          <ArrowUp size={19} strokeWidth={1.8} />
        </button>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        <span>ARK</span>
        <strong>II</strong>
      </div>
    </footer>
  );
}

export default Footer;
