const fs = require("fs");

write("api/github/repos.js", `"use strict";
const https = require("https");
const GITHUB_USER = "Afnan-Sufian";
const CACHE_TTL = 600000;
const DESC = {
  "Todoo-app": "A task management app built with React.js. Supports adding, completing, and deleting tasks with a clean, responsive UI.",
  "Props": "A React.js practice project exploring how props work between parent and child components.",
  "HooksPractice": "Hands-on practice with core React Hooks: useState, useEffect, and useRef.",
  "Wheather-Project": "A weather dashboard app fetching real-time data using the OpenWeather API.",
};
let cache = { data: null, at: 0 };

function fetchGH(path) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: "api.github.com", path, method: "GET",
      headers: { "User-Agent": "portfolio/1.0", Accept: "application/vnd.github.v3+json" },
    };
    const req = https.request(opts, (r) => {
      let b = "";
      r.on("data", (c) => { b += c; });
      r.on("end", () => r.statusCode < 300 ? resolve(JSON.parse(b)) : reject(new Error("GH " + r.statusCode)));
    });
    req.on("error", reject);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const now = Date.now();
  if (cache.data && now - cache.at < CACHE_TTL) return res.json({ source: "cache", repos: cache.data });
  try {
    const raw = await fetchGH("/users/" + GITHUB_USER + "/repos?sort=updated&per_page=100");
    const repos = raw.filter((r) => !r.fork).map((r) => ({
      id: r.id, name: r.name,
      description: r.description || DESC[r.name] || "A project by Sufyan.",
      html_url: r.html_url, homepage: r.homepage || null,
      language: r.language || null, stargazers_count: r.stargazers_count,
      forks_count: r.forks_count, topics: r.topics || [], updated_at: r.updated_at,
    }));
    cache = { data: repos, at: now };
    return res.json({ source: "github", repos });
  } catch (err) {
    if (cache.data) return res.json({ source: "stale", repos: cache.data });
    return res.status(502).json({ error: err.message });
  }
};
`);

write("vercel.json", JSON.stringify({
  buildCommand: "npm run build",
  outputDirectory: "dist",
  framework: "vite",
  rewrites: [
    { source: "/api/(.*)", destination: "/api/$1" },
    { source: "/(.*)", destination: "/index.html" }
  ]
}, null, 2));

console.log("Done!");

function write(p, c) { fs.writeFileSync(p, c, "utf8"); console.log("wrote:", p); }
