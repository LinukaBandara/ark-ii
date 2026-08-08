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

          <a href="#contact">
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
            <a href="#work">Work</a>
            <a href="#lab">Lab</a>
            <a href="#services">Services</a>
            <a href="#studio">Studio</a>
            <a href="#contact">Contact</a>
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

            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </a>
            )}
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
        <p>Designed and developed by ARK II</p>
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
