import "./Footer.css";

const socials = [
  { label: "GitHub",   href: "https://github.com/Afnan-Sufian",                       icon: "G" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sufyan-khan-68855940b",      icon: "L" },
  { label: "Email",    href: "mailto:12sufyan16@gmail.com",                            icon: "E" },
];

export default function Footer() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <button className="footer__logo" onClick={() => scrollTo("home")}>
          SF<span className="footer__logo-dot">.</span>
        </button>

        <p className="footer__copy">
          {year} Sufyan. Built with <span className="accent">React.js</span> + Vite. Designed with passion.
        </p>

        <div className="footer__right">
          <div className="footer__socials">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer__social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          <div className="footer__links">
            {["home","about","projects","resume","contact"].map(id => (
              <button key={id} className="footer__link" onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}