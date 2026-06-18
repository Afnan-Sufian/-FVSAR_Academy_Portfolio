import { useState, useEffect } from "react";
import "./Navbar.css";

const navLinks = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume",   label: "Resume" },
  { id: "contact",  label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(l => document.getElementById(l.id));
      let current = "home";
      sections.forEach(sec => {
        if (sec && window.scrollY >= sec.offsetTop - 100) {
          current = sec.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo("home")}>
          SF<span className="navbar__logo-dot">.</span>
        </button>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`navbar__link ${active === link.id ? "navbar__link--active" : ""}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="btn-primary navbar__cta" onClick={() => scrollTo("contact")}>
          Hire Me
        </button>

        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
