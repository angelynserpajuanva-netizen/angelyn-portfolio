#!/usr/bin/env node
/* =====================================================================
   Machine-readable build: generates crawler-friendly copies of the
   portfolio from the single data source (data.js → window.PORTFOLIO).

   Outputs (all regenerated on every Vercel deploy, see vercel.json):
     - index.html  : static project index + JSON-LD between the
                     PRERENDER / JSONLD markers (visually hidden, so the
                     design is unchanged; JS-free readers can see it)
     - llms.txt    : plain-text project list for LLM browsers
     - portfolio.json : same data, structured
     - sitemap.xml

   Only fields that exist in data.js are published. Nothing is invented:
   empty fields are left out (or null in JSON).
   Run locally:  node scripts/build-machine-readable.js
   ===================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE = (process.env.SITE_URL || "https://angelyn-portfolio.vercel.app").replace(/\/$/, "");

/* ---------- load data.js exactly as the browser does ---------- */
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data.js"), "utf8"), sandbox, { filename: "data.js" });
const D = sandbox.window.PORTFOLIO;
if (!D || !Array.isArray(D.projects)) throw new Error("data.js did not define window.PORTFOLIO.projects");

/* ---------- helpers ---------- */
const clean = (v) => (typeof v === "string" ? v.trim() : v);
const has = (v) => (Array.isArray(v) ? v.length > 0 : typeof v === "string" ? v.trim() !== "" : v != null);
const abs = (src) => (src ? (/^https?:\/\//.test(src) ? src : SITE + "/" + src.replace(/^\.?\//, "").split("/").map(encodeURIComponent).join("/")) : null);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const isoDuration = (d) => {
  const m = /^(\d+):(\d{1,2})$/.exec(d || "");
  return m ? "PT" + (+m[1] ? +m[1] + "M" : "") + +m[2] + "S" : null;
};
const missing = (src) => src && !/^https?:/.test(src) && !fs.existsSync(path.join(ROOT, src));

/* Claude Code workflow: the portfolio's own description of the
   "Claude Code" pipeline stage, attached only to projects that list
   Claude Code among their tools. */
const ccStage = (D.pipeline || []).find((s) => (s.tools || []).includes("Claude Code"));

/* ---------- normalise projects ---------- */
const warnings = [];
const projects = D.projects.map((p) => {
  const tools = (p.tools || []).map(clean).filter(has);
  const videoSrc = p.video && p.video.src;
  const variants = (p.variants || []).map((v) => ({
    label: clean(v.label) || null,
    hook: clean(v.hook) || null,
    videoUrl: abs(v.src),
    thumbnailUrl: abs(v.thumbnail),
  }));
  [videoSrc, p.thumbnail].concat((p.variants || []).map((v) => v.src)).forEach((s) => { if (missing(s)) warnings.push(p.id + ": missing file " + s); });

  const usesClaudeCode = tools.includes("Claude Code");
  return {
    id: p.id,
    title: clean(p.title),
    brand: clean(p.brand) || null,
    creativeStyle: clean(p.category) || null,
    concept: clean(p.concept) || null,
    description: clean(p.summary) || null,
    hook: clean(p.hook) || null,
    audience: clean(p.audience) || null,
    objective: clean(p.objective) || null,
    aiGenerationTools: tools,
    production: clean(p.production) || null,
    editing: clean(p.editing) || null,
    claudeCodeWorkflow: usesClaudeCode && ccStage ? {
      stage: ccStage.stage,
      description: ccStage.does,
      outputs: ccStage.output || [],
    } : null,
    deliverables: clean(p.deliverables) || null,
    aspectRatio: clean(p.aspect) || null,
    duration: clean(p.duration) || null,
    videoUrl: abs(videoSrc),
    thumbnailUrl: abs(p.thumbnail),
    variants: variants,
    pageUrl: SITE + "/#work",
  };
});

const contact = D.contact || {};
const person = D.person || {};
const meta = {
  name: person.name,
  title: person.title,
  location: person.location || null,
  availability: person.availability || null,
  intro: person.intro || null,
  website: SITE + "/",
  email: contact.email || null,
  phone: (D.settings && D.settings.showPhone === false) ? null : (contact.phone || null),
  messaging: (contact.messaging || []).map((m) => ({ label: m.label, url: m.url })),
  links: (contact.links || []).map((m) => ({ label: m.label, url: m.url })),
};
const showreel = D.showreel && D.showreel.src ? { title: D.showreel.label || "Showreel", videoUrl: abs(D.showreel.src), thumbnailUrl: abs(D.showreel.poster) } : null;

/* ---------- portfolio.json ---------- */
const json = {
  generatedFrom: SITE + "/data.js",
  generatedAt: new Date().toISOString(),
  creator: meta,
  showreel: showreel,
  workflow: (D.pipeline || []).map((s) => ({ stage: s.stage, tools: s.tools || [], description: s.does, outputs: s.output || [] })),
  projectCount: projects.length,
  projects: projects,
};
fs.writeFileSync(path.join(ROOT, "portfolio.json"), JSON.stringify(json, null, 2) + "\n");

/* ---------- llms.txt ---------- */
const L = [];
const line = (k, v) => { if (has(v)) L.push("- " + k + ": " + (Array.isArray(v) ? v.join(", ") : v)); };
L.push("# " + meta.name + " — " + meta.title, "");
if (meta.intro) L.push("> " + meta.intro, "");
L.push("Portfolio of " + projects.length + " AI video projects. Every project below links to its direct video file. Structured version: " + SITE + "/portfolio.json", "");
L.push("## Contact", "");
line("Website", meta.website);
line("Email", meta.email);
line("Phone (WhatsApp / Telegram)", meta.phone);
meta.messaging.forEach((m) => line(m.label, m.url));
meta.links.forEach((m) => line(m.label, m.url));
line("Location", meta.location);
line("Availability", meta.availability);
L.push("");
if (showreel) { L.push("## Showreel", "", "- [" + showreel.title + "](" + showreel.videoUrl + ")", ""); }
if (json.workflow.length) {
  L.push("## Production workflow", "");
  json.workflow.forEach((s) => L.push("- " + s.stage + " (" + s.tools.join(", ") + "): " + s.description));
  L.push("");
}
L.push("## Projects", "");
projects.forEach((p, i) => {
  L.push("### " + (i + 1) + ". " + p.title, "");
  line("Brand", p.brand || "Not named");
  line("Creative style", p.creativeStyle);
  line("Concept", p.concept);
  line("Description", p.description);
  line("Hook", p.hook);
  line("Audience", p.audience);
  line("Objective", p.objective);
  line("AI generation and production tools", p.aiGenerationTools.length ? p.aiGenerationTools : "Not listed");
  line("Production", p.production);
  line("Editing", p.editing);
  if (p.claudeCodeWorkflow) line("Claude Code editing and automation workflow", p.claudeCodeWorkflow.description);
  line("Deliverables", p.deliverables);
  line("Format", [p.aspectRatio, p.duration].filter(Boolean).join(", "));
  line("Video URL", p.videoUrl);
  p.variants.forEach((v) => line("Variant video — " + v.label + (v.hook ? " (hook: " + v.hook + ")" : ""), v.videoUrl));
  L.push("");
});
fs.writeFileSync(path.join(ROOT, "llms.txt"), L.join("\n").replace(/\n+$/, "\n"));

/* ---------- static HTML index + JSON-LD injected into index.html ---------- */
const field = (label, v) => (has(v) ? "<dt>" + esc(label) + "</dt><dd>" + esc(Array.isArray(v) ? v.join(", ") : v) + "</dd>" : "");
const indexHTML =
  '<section id="project-index" aria-labelledby="project-index-h" style="position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important;border:0!important">\n' +
  '<h2 id="project-index-h">Project index: ' + projects.length + " AI video projects</h2>\n" +
  '<p>Plain-text list of every project on this page. Also available as <a href="/llms.txt">llms.txt</a> and <a href="/portfolio.json">portfolio.json</a>.</p>\n' +
  "<ol>\n" +
  projects.map((p) =>
    '<li><article><h3>' + esc(p.title) + "</h3><dl>" +
    field("Brand", p.brand || "Not named") +
    field("Creative style", p.creativeStyle) +
    field("Description", p.description) +
    field("Concept", p.concept) +
    field("AI generation and production tools", p.aiGenerationTools.length ? p.aiGenerationTools : "Not listed") +
    field("Production", p.production) +
    field("Editing", p.editing) +
    (p.claudeCodeWorkflow ? field("Claude Code editing and automation workflow", p.claudeCodeWorkflow.description) : "") +
    field("Deliverables", p.deliverables) +
    field("Format", [p.aspectRatio, p.duration].filter(Boolean).join(", ")) +
    '<dt>Video</dt><dd><a href="' + esc(p.videoUrl) + '">' + esc(p.videoUrl) + "</a></dd>" +
    p.variants.map((v) => "<dt>Variant: " + esc(v.label) + '</dt><dd><a href="' + esc(v.videoUrl) + '">' + esc(v.videoUrl) + "</a></dd>").join("") +
    "</dl></article></li>"
  ).join("\n") +
  "\n</ol>\n</section>";

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": SITE + "/#person",
      name: meta.name,
      jobTitle: meta.title,
      url: SITE + "/",
      email: meta.email ? "mailto:" + meta.email : undefined,
      telephone: meta.phone || undefined,
      address: meta.location ? { "@type": "PostalAddress", addressLocality: meta.location } : undefined,
    },
    {
      "@type": "ItemList",
      name: "AI video portfolio projects",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoObject",
          name: p.title,
          description: p.description || p.title,
          contentUrl: p.videoUrl,
          thumbnailUrl: p.thumbnailUrl || undefined,
          duration: isoDuration(p.duration) || undefined,
          genre: p.creativeStyle || undefined,
          creator: { "@id": SITE + "/#person" },
          sourceOrganization: p.brand ? { "@type": "Organization", name: p.brand } : undefined,
        },
      })),
    },
  ],
};
const ldHTML = '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, "\\u003c") + "</script>";

function inject(html, start, end, content) {
  const a = html.indexOf(start), b = html.indexOf(end);
  if (a < 0 || b < a) throw new Error("index.html is missing markers " + start + " / " + end);
  return html.slice(0, a + start.length) + "\n" + content + "\n" + html.slice(b);
}
const idxPath = path.join(ROOT, "index.html");
let html = fs.readFileSync(idxPath, "utf8");
html = inject(html, "<!--JSONLD-START-->", "<!--JSONLD-END-->", ldHTML);
html = inject(html, "<!--PRERENDER-START-->", "<!--PRERENDER-END-->", indexHTML);
fs.writeFileSync(idxPath, html);

/* ---------- sitemap.xml ---------- */
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ["/", "/llms.txt", "/portfolio.json"].map((u) => "  <url><loc>" + SITE + u + "</loc><lastmod>" + today + "</lastmod></url>").join("\n") +
  "\n</urlset>\n");

warnings.forEach((w) => console.warn("WARN " + w));
console.log("machine-readable build: " + projects.length + " projects → index.html, llms.txt, portfolio.json, sitemap.xml");
