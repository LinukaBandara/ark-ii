import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./Navbar.css";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 34);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        }`}
      >
        <a
          className="navbar__brand"
          href="#top"
          aria-label="ARK II home"
        >
          <span>ARK</span>
          <span className="navbar__brand-mark">II</span>
        </a>

        <nav
          className="navbar__desktop"
          aria-label="Primary navigation"
        >
          <div className="navbar__links">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a className="navbar__cta" href="#contact">
            Start a project
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </nav>

        <button
          className="navbar__menu-button"
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1.6} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            id="mobile-navigation"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{
              duration: 0.72,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="mobile-menu__top">
              <a
                className="navbar__brand navbar__brand--light"
                href="#top"
                onClick={closeMenu}
              >
                <span>ARK</span>
                <span className="navbar__brand-mark">II</span>
              </a>

              <button
                className="mobile-menu__close"
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <X size={27} strokeWidth={1.5} />
              </button>
            </div>

            <nav
              className="mobile-menu__links"
              aria-label="Mobile navigation"
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.18 + index * 0.08,
                    duration: 0.55,
                  }}
                >
                  <span>0{index + 1}</span>
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                className="mobile-menu__project-link"
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46, duration: 0.55 }}
              >
                Start a project
                <ArrowUpRight size={22} strokeWidth={1.7} />
              </motion.a>
            </nav>

            <div className="mobile-menu__footer">
              <p>Sri Lanka / Working worldwide</p>
              <p>Independent digital studio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
