import { useState, useEffect } from "react";
import "./Projects.css";

const GITHUB_USER = "Afnan-Sufian";

// Fallback descriptions keyed by repo name (used when GitHub has no description)
const DESCRIPTIONS = {
  "Todoo-app":
    "A task management app built with React.js. Supports adding, completing, and deleting tasks with a clean, responsive UI and local state management.",
  "Props":
    "A React.js practice project exploring how props work — passing data between parent and child components with reusable, dynamic UI elements.",
  "HooksPractice":
    "Hands-on practice with core React Hooks including useState, useEffect, and useRef. Built to solidify understanding of functional component patterns.",
  "Wheather-Project":
    "A weather dashboard app that fetches real-time weather data using the OpenWeather API. Displays temperature, conditions, and forecasts with a responsive layout.",
};

// Map language names to tag labels & colors
const langMeta = {
  JavaScript: { tag: "JS Project",     color: "#f7df1e" },
  TypeScript:  { tag: "TS Project",     color: "#3178c6" },
  Python:      { tag: "Python Project", color: "#ec4899" },
  HTML:        { tag: "HTML Project",   color: "#e44d26" },
  CSS:         { tag: "CSS Project",    color: "#264de4" },
  default:     { tag: "Code Project",   color: "#f97316" },
};

function getLangMeta(lang) {
  return langMeta[lang] || langMeta.default;
}

function getIcon(lang) {
  const icons = {
    JavaScript: "JS",
    TypeScript: "TS",
    Python: "🐍",
    HTML: "🌐",
    CSS: "🎨",
  };
  return icons[lang] || "💻";
}

export default function Projects() {
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [filter,  setFilter]  = useState("All");

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const own = data
          .filter(r => !r.fork)
          .map(r => ({
            ...r,
            // Use GitHub description if available, else use our fallback map
            description: r.description || DESCRIPTIONS[r.name] || "A project by Sufyan — click GitHub to explore the code.",
          }));
        setRepos(own);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const languages = ["All", ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))];
  const filtered  = filter === "All" ? repos : repos.filter(r => r.language === filter);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-tag">
          <span>My <strong>Projects</strong></span>
        </div>
        <div className="section-line" />

        {loading && (
          <div className="projects__loading">
            <div className="projects__spinner" />
            <p>Fetching repositories from GitHub...</p>
          </div>
        )}

        {error && (
          <div className="projects__error">
            <span>⚠</span>
            <p>Could not load repositories: {error}</p>
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" className="btn-primary">
              View on GitHub
            </a>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="projects__stats">
              <span className="projects__stats-count">
                <strong className="accent">{repos.length}</strong> public repositories on GitHub
              </span>
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noreferrer"
                className="projects__gh-link"
              >
                View GitHub Profile →
              </a>
            </div>

            {languages.length > 1 && (
              <div className="projects__filters">
                {languages.map(lang => (
                  <button
                    key={lang}
                    className={`projects__filter ${filter === lang ? "projects__filter--active" : ""}`}
                    onClick={() => setFilter(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="projects__empty">No repositories found for this filter.</div>
            ) : (
              <div className="projects__grid">
                {filtered.map(repo => {
                  const meta = getLangMeta(repo.language);
                  return (
                    <div key={repo.id} className="project-card card">
                      <div className="project-card__header">
                        <span className="project-card__icon">{getIcon(repo.language)}</span>
                        {repo.language && (
                          <span
                            className="project-card__tag"
                            style={{ color: meta.color, borderColor: meta.color + "44" }}
                          >
                            {meta.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="project-card__title">{repo.name.replace(/-/g, " ")}</h3>

                      <p className="project-card__desc">{repo.description}</p>

                      <div className="project-card__meta">
                        {repo.language && (
                          <span className="project-card__meta-item" style={{ color: meta.color }}>
                            ● {repo.language}
                          </span>
                        )}
                        <span className="project-card__meta-item">★ {repo.stargazers_count}</span>
                        <span className="project-card__meta-item">⑂ {repo.forks_count}</span>
                        {repo.topics?.slice(0, 2).map(t => (
                          <span key={t} className="project-card__tech-item">{t}</span>
                        ))}
                      </div>

                      <div className="project-card__actions">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="project-card__btn project-card__btn--ghost"
                        >
                          GitHub →
                        </a>
                        {repo.homepage ? (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="project-card__btn project-card__btn--primary"
                          >
                            Live Demo →
                          </a>
                        ) : (
                          <span className="project-card__btn project-card__btn--disabled">
                            No Live Demo
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}