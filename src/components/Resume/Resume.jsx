import "./Resume.css";

const timeline = [
  {
    id: 1,
    phase: "Frontend Development",
    period: "2025",
    color: "#f97316",
    desc: "Completed React.js, JavaScript, HTML, CSS and UI libraries. Built responsive layouts and interactive web applications.",
    items: ["React.js & Hooks", "JavaScript ES6+", "HTML5 & CSS3", "Responsive Design"],
  },
  {
    id: 2,
    phase: "Backend Development",
    period: "2026 - Present",
    color: "#0ea5e9",
    desc: "Learning Node.js, Express.js and MongoDB. Building REST APIs and understanding server-side architecture.",
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    id: 3,
    phase: "Machine Learning",
    period: "2026 - Present",
    color: "#9333ea",
    desc: "Exploring AI, ML algorithms and data analysis. Working with Python, Pandas, and Scikit-learn.",
    items: ["Python", "Pandas & NumPy", "Scikit-learn", "Data Analysis"],
  },
];

const tools = [
  { name: "VS Code",    icon: "📝" },
  { name: "Git",        icon: "🐙" },
  { name: "GitHub",     icon: "💾" },
  { name: "Figma",      icon: "🎨" },
  { name: "npm/Yarn",   icon: "📦" },
  { name: "Postman",    icon: "🔬" },
  { name: "Chrome DevTools", icon: "🔧" },
  { name: "Vite",       icon: "⚡" },
];

export default function Resume() {
  return (
    <section id="resume" className="section resume">
      <div className="container">
        <div className="section-tag">
          <span>My <strong>Resume</strong></span>
        </div>
        <div className="section-line" />

        <div className="resume__layout">
          {/* Timeline */}
          <div className="resume__timeline">
            {timeline.map((item, i) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-item__dot" style={{ background: item.color, boxShadow: `0 0 12px ${item.color}66` }} />
                {i < timeline.length - 1 && <div className="timeline-item__line" />}
                <div className="timeline-item__content card">
                  <div className="timeline-item__header">
                    <div>
                      <h3 className="timeline-item__phase">{item.phase}</h3>
                      <span className="timeline-item__period" style={{ color: item.color }}>{item.period}</span>
                    </div>
                  </div>
                  <p className="timeline-item__desc">{item.desc}</p>
                  <ul className="timeline-item__list">
                    {item.items.map(it => (
                      <li key={it} className="timeline-item__li">
                        <span className="timeline-item__check" style={{ color: item.color }}>✓</span> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Right panel */}
          <div className="resume__right">
            <div className="resume__tools card">
              <h3 className="resume__tools-title">Tools & Environment</h3>
              <div className="resume__tools-grid">
                {tools.map(t => (
                  <div key={t.name} className="resume__tool">
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="resume__download card">
              <div className="resume__download-icon">📄</div>
              <h3>Download CV</h3>
              <p>Get my full resume with all details, projects, and contact info.</p>
              <a href="#" className="btn-primary resume__dl-btn">
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
