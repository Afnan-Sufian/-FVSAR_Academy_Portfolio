"use strict";
require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const helmet  = require("helmet");
const path    = require("path");

const healthRouter  = require("./routes/health");
const contactRouter = require("./routes/contact");
const githubRouter  = require("./routes/github");

const app    = express();
const PORT   = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === "production";

// ── Middleware ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: isProd
    ? false
    : (process.env.CLIENT_ORIGIN || "http://localhost:5173"),
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));

// ── API Routes ──────────────────────────────────────────────
app.use("/api/health",  healthRouter);
app.use("/api/contact", contactRouter);
app.use("/api/github",  githubRouter);

// ── Serve React build in production ────────────────────────
if (isProd) {
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
}

// ── 404 ────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// ── Global error handler ────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("");
  console.log("  ✅  Portfolio API running");
  console.log(`  🌐  http://localhost:${PORT}/api/health`);
  console.log(`  📧  Emails → ${process.env.EMAIL_TO || process.env.EMAIL_USER || "(not configured)"}`);
  console.log(`  🌱  NODE_ENV: ${process.env.NODE_ENV || "development"}`);
  console.log("");
});
