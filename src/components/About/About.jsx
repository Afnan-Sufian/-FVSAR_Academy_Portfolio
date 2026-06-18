import "./About.css";

const skills = [
  { name: "React.js",      icon: "⚛",  sub: "Modern React and Hooks",     level: 80,  color: "#61dafb" },
  { name: "JavaScript",   icon: "JS", sub: "ES6+ and APIs",               level: 82,  color: "#f7df1e" },
  { name: "HTML & CSS",   icon: "🎨", sub: "Responsive Design",           level: 90,  color: "#e44d26" },
  { name: "Git & GitHub", icon: "🐙", sub: "Version Control",             level: 75,  color: "#f97316" },
  { name: "Backend",      icon: "🟩", sub: "Node.js Learning",            level: 35,  color: "#68a063" },
  { name: "Machine Learning", icon: "🧠", sub: "AI Exploration",          level: 20,  color: "#9333ea" },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__layout">
          {/* Left description */}
          <div className="about__desc">
            <div className="section-tag">
              <span>About <strong>Me</strong></span>
            </div>
            <div className="section-line" />
            <p className="about__para">
              I am <strong className="accent">Sufyan</strong>, a passionate student and aspiring developer focused on
              building real-world projects. I enjoy the intersection of creativity and technology.
            </p>
            <p className="about__para">
              Currently expanding my knowledge in <span className="accent">Backend Development</span> while
              preparing for a future in <span className="accent">Machine Learning & AI</span>.
            </p>
            <div className="about__tags">
              {["React.js", "Open Source", "Problem Solver", "Self-taught", "AI/ML", "Team Player"].map(t => (
                <span key={t} className="about__tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Skill cards grid */}
          <div className="about__skills">
            {skills.map(sk => (
              <div key={sk.name} className="skill-card card">
                <div className="skill-card__icon" style={{ color: sk.color }}>{sk.icon}</div>
                <div className="skill-card__body">
                  <p className="skill-card__name">{sk.name}</p>
                  <p className="skill-card__sub">{sk.sub}</p>
                  <div className="skill-card__bar-bg">
                    <div
                      className="skill-card__bar"
                      style={{ width: `${sk.level}%`, background: sk.color }}
                    />
                  </div>
                  <p className="skill-card__pct" style={{ color: sk.color }}>{sk.level}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
