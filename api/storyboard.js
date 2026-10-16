// Vercel serverless function: writes a custom storyboard with Gemini.
// It reads the client's public website (if given) and returns JSON the page renders.
// Setup: add an environment variable GEMINI_API_KEY in Vercel (Settings > Environment Variables).
// Optional: GEMINI_MODEL to force a specific model.

const MODELS = [process.env.GEMINI_MODEL, "gemini-3.6-flash", "gemini-3.5-flash-lite", "gemini-2.5-flash"].filter(Boolean);
const API = "https://generativelanguage.googleapis.com/v1beta/models/";

function clip(s, n) { return String(s || "").replace(/\s+/g, " ").trim().slice(0, n); }

function buildPrompt(b, beats) {
  return `You are a senior creative director for short-form AI video ads (TikTok, Reels, Shorts).
Write a storyboard for this client brief. Be specific to the client's real business and industry.
Avoid generic filler like "a person reacts" or "the product appears". Name concrete places, props,
moments and emotions a real ad for this industry would use. Hooks must stop the scroll in under 2 seconds.

CLIENT BRIEF
- Brand or product: ${b.brand}
- Industry (may be "auto"): ${b.industryLabel || b.industry || "auto"}
- Website or Facebook page: ${b.website || "not given"}
- Problem it solves: ${b.problem || "not given (infer the most compelling one)"}
- Target audience: ${b.audience}
- Main benefit or offer: ${b.benefit || "not given"}
- Video style: ${b.styleLabel}
- Voice and sound: ${b.audioLabel}
- Duration: ${b.duration} seconds, platform: ${b.platform}
- Goal: ${b.goal}
- Notes: ${b.notes || "none"}

${b.website ? `If the website or page is publicly readable, read it and use real details (services, locations, offers, tone, product names). If you cannot read it, do not invent facts about the business; keep claims general.` : ""}

Write exactly ${beats.length} scenes in this order: ${beats.join(", ")}.
For each scene give:
- "title": short scene name
- "shot": camera shot (2-4 words)
- "visual": what we see, specific and cinematic, 1-2 sentences, written for the chosen style
- "text": on-screen text, max 8 words
- "line": the spoken line (voiceover or talking head), max 20 words. If voice is "Music only", give the on-screen caption idea instead.
- "flowPrompt": a detailed image-generation prompt for Google Flow to create this storyboard frame: subject, setting, action, camera angle, lighting, mood, the "${b.styleLabel}" style, ${/landscape/i.test(b.platform) ? "16:9" : "9:16"} framing. Do not ask for text or logos inside the image.

Also give:
- "industry": the industry in 1-3 words
- "concept": { "title": 2-4 words, "logline": 1 sentence }
- "patterns": 3 short bullets on what top-performing ads in this industry do
- "hooks": 3 different scroll-stopping hook lines (max 12 words each)
- "brandNotes": 1-2 sentences on what you learned from the website, or "" if none

Return ONLY valid JSON with keys: industry, concept, patterns, hooks, brandNotes, scenes. No markdown.`;
}

function extractJSON(text) {
  if (!text) return null;
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{"), z = t.lastIndexOf("}");
  if (a < 0 || z < a) return null;
  try { return JSON.parse(t.slice(a, z + 1)); } catch (e) { return null; }
}

function valid(d, n) {
  return d && Array.isArray(d.hooks) && d.hooks.length >= 1 && Array.isArray(d.scenes) && d.scenes.length >= Math.min(3, n) &&
    d.scenes.every(s => s && s.visual && (s.text || s.line));
}

async function callGemini(model, key, prompt, useTools) {
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.9, maxOutputTokens: 4096 }
  };
  if (useTools) body.tools = [{ url_context: {} }];
  else body.generationConfig.responseMimeType = "application/json";
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 24000);
  try {
    const r = await fetch(API + encodeURIComponent(model) + ":generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return { error: (j.error && j.error.message) || ("HTTP " + r.status), status: r.status };
    const parts = (((j.candidates || [])[0] || {}).content || {}).parts || [];
    return { text: parts.map(p => p.text || "").join("") };
  } catch (e) {
    return { error: e.name === "AbortError" ? "timeout" : String(e.message || e) };
  } finally { clearTimeout(timer); }
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.status(405).json({ ok: false, error: "POST only" }); return; }
  const key = process.env.GEMINI_API_KEY;
  if (!key) { res.status(503).json({ ok: false, error: "AI not configured" }); return; }

  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  const brief = {
    brand: clip(b.brand, 120), industry: clip(b.industry, 40), industryLabel: clip(b.industryLabel, 60),
    website: clip(b.website, 300), problem: clip(b.problem, 300), audience: clip(b.audience, 300),
    benefit: clip(b.benefit, 300), styleLabel: clip(b.styleLabel, 60), audioLabel: clip(b.audioLabel, 60),
    duration: Math.max(10, Math.min(90, parseInt(b.duration, 10) || 30)), platform: clip(b.platform, 60),
    goal: clip(b.goal, 60), notes: clip(b.notes, 600)
  };
  if (!brief.brand || !brief.audience) { res.status(400).json({ ok: false, error: "Missing brand or audience" }); return; }
  const beats = (Array.isArray(b.beats) ? b.beats : []).map(x => clip(x, 20)).filter(Boolean).slice(0, 10);
  if (!beats.length) beats.push("hook", "problem", "turn", "reveal", "benefit", "cta");

  const prompt = buildPrompt(brief, beats);
  const tries = [];
  for (const model of MODELS) {
    for (const useTools of brief.website ? [true, false] : [false]) {
      const r = await callGemini(model, key, prompt, useTools);
      if (r.error) {
        tries.push(model + (useTools ? "+url" : "") + ": " + r.error);
        if (r.status === 404) break;          // model name not available, try the next model
        continue;
      }
      const data = extractJSON(r.text);
      if (valid(data, beats.length)) {
        res.status(200).json({ ok: true, model, readWebsite: useTools, data });
        return;
      }
      tries.push(model + ": unreadable JSON");
    }
  }
  res.status(502).json({ ok: false, error: "AI unavailable", details: tries.slice(-4) });
};
