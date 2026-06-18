import { useState, useEffect } from "react";
import profileImg from "../../assets/profile.png";
import "./Hero.css";

const roles = ["Frontend Developer", "React.js Developer", "ML Enthusiast", "Open Source Learner"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const avatarSrc = imgError
    ? "https://avatars.githubusercontent.com/Afnan-Sufian"
    : profileImg;

  return (
    <section id="home" className="hero">
      <div className="hero__bg-grid" />
      <div className="hero__bg-radial" />

      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__greeting">Hi, I am</p>
          <h1 className="hero__name">Sufyan</h1>
          <p className="hero__role">
            <span className="accent">{displayed}</span>
            <span className="hero__cursor" />
          </p>
          <p className="hero__tagline">&amp; ML Enthusiast</p>
          <p className="hero__desc">
            Passionate student and aspiring software developer skilled in React.js,
            JavaScript, Git and GitHub. Currently learning Backend Development and
            Machine Learning.
          </p>

          <div className="hero__actions">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Hire Me</button>
            <button className="btn-secondary" onClick={() => scrollTo("projects")}>View Projects</button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num accent">5+</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num accent">2+</span>
              <span className="hero__stat-label">Years Learning</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num accent">∞</span>
              <span className="hero__stat-label">Curiosity</span>
            </div>
          </div>
        </div>

        <div className="hero__img-wrap">
          <div className="hero__img-ring" />
          <div className="hero__img-inner">
            <img
              src={avatarSrc}
              alt="Sufyan - Frontend Developer"
              className="hero__img"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="hero__badge hero__badge--react">⚛ React</div>
          <div className="hero__badge hero__badge--js">JS</div>
          <div className="hero__badge hero__badge--ml">🤖 ML</div>
        </div>
      </div>
    </section>
  );
}