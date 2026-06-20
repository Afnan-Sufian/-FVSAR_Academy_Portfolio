"use strict";
const { Router } = require("express");
const https = require("https");
const router = Router();

const GITHUB_USER = "Afnan-Sufian";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min

const DESCRIPTIONS = {
  "Todoo-app": "A task management app built with React.js. Supports adding, completing, and deleting tasks with a clean, responsive UI and local state management.",
  "Props": "A React.js practice project exploring how props work — passing data between parent and child components with reusable, dynamic UI elements.",
  "HooksPractice": "Hands-on practice with core React Hooks including useState, useEffect, and useRef. Built to solidify understanding of functional component patterns.",
  "Wheather-Project": "A weather dashboard app that fetches real-time weather data using the OpenWeather API. Displays temperature, conditions, and forecasts with a responsive layout.",
};

let cache = { data: null, fetchedAt: 0 };

function fetchGitHub(apiPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: apiPath,
      method: "GET",
      headers: {
        "User-Agent": "portfolio-server/1.0",
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    };
    const req = https.request(options, (res2) => {
      let body = "";
      res2.on("data", (chunk) => { body += chunk; });
      res2.on("end", () => {
        if (res2.statusCode >= 200 && res2.statusCode < 300) {
          try { resolve(JSON.parse(body)); }
          catch { reject(new Error("Invalid JSON from GitHub")); }
        } else {
          reject(new Error(`GitHub API error: ${res2.statusCode}`));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

router.get("/repos", async (_req, res) => {
  const now = Date.now();
  if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
    return res.json({ source: "cache", repos: cache.data });
  }

  try {
    const raw = await fetchGitHub(`/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
    const repos = raw
      .filter((r) => !r.fork)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description || DESCRIPTIONS[r.name] || "A project by Sufyan — click GitHub to explore the code.",
        html_url: r.html_url,
        homepage: r.homepage || null,
        language: r.language || null,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        topics: r.topics || [],
        updated_at: r.updated_at,
      }));

    cache = { data: repos, fetchedAt: now };
    console.log(`[GitHub] Fetched ${repos.length} repos, cached 10 min`);
    return res.json({ source: "github", repos });
  } catch (err) {
    console.error("[GitHub] Fetch error:", err.message);
    if (cache.data) return res.json({ source: "stale-cache", repos: cache.data });
    return res.status(502).json({ error: "Could not fetch GitHub repos.", message: err.message });
  }
});

module.exports = router;
