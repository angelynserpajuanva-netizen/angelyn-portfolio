/* Storyboard request: builds an instant hook + storyboard draft from the
   brief, and emails the brief (with the draft) to Angelyn via FormSubmit. */
(function () {
  "use strict";
  var D = window.PORTFOLIO || {};
  var CFG = D.storyboard || {};
  // Built-in fallback so the form still emails even if an older data.js is live.
  var OWNER_EMAIL = (D.contact && D.contact.email) || "serpajuanangelyn@gmail.com";
  var ENDPOINT = CFG.endpoint || ("https://formsubmit.co/ajax/" + OWNER_EMAIL);
  var form = document.getElementById("sb-form");
  if (!form) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function clean(s) { return String(s || "").trim().replace(/\s+/g, " ").replace(/[.!?]+$/, ""); }
  function lc(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  /* ---------- Style library ---------- */
  var STYLES = {
    pixar: {
      label: "Pixar-style 3D cartoon",
      subject: "a lovable 3D animated character",
      look: "Bright, rounded 3D characters with big expressive eyes and soft cinematic lighting.",
      hook: "Meet the little hero who's had enough of {problem}.",
      tint: ["#2b4c8c", "#e8a33d"]
    },
    clay: {
      label: "Clay animation",
      subject: "a handmade clay-style character",
      look: "Tactile claymation look with visible texture, warm practical lighting and gentle, slightly stepped motion.",
      hook: "“I thought it was nothing…” (until {problem} wouldn't go away)",
      tint: ["#8c4a2b", "#e8c07d"]
    },
    ugc: {
      label: "UGC creator",
      subject: "the creator, filmed selfie-style on a phone",
      look: "Natural light, handheld phone framing, jump cuts and bold native captions. Feels like a real recommendation.",
      hook: "Okay, I finally get why everyone's talking about {brand}.",
      tint: ["#6b5b52", "#d9b8a0"]
    },
    dtc: {
      label: "DTC product ad",
      subject: "relatable on-screen talent",
      look: "Clean, bright product-first visuals, fast cuts every 1–2 seconds, bold benefit text on screen.",
      hook: "Stop scrolling if {problem} sounds familiar.",
      tint: ["#0f6b6b", "#3ee0ee"]
    },
    podcast: {
      label: "Podcast clip",
      subject: "the host at a podcast mic",
      look: "Two-camera podcast set, warm key light, punchy word-by-word captions and B-roll cutaways.",
      hook: "“Nobody talks about this, but {problem} is fixable.”",
      tint: ["#3a2a4f", "#b07de8"]
    },
    drama: {
      label: "Realistic drama",
      subject: "the lead actor in a real-life setting",
      look: "Grounded, emotional storytelling with natural performances, shallow depth of field and a moody score.",
      hook: "Every day started the same way: {problem}.",
      tint: ["#2e3640", "#9aa7b4"]
    },
    cinematic: {
      label: "Cinematic commercial",
      subject: "the hero talent, shot with shallow depth of field",
      look: "Premium commercial look: slow push-ins, dramatic lighting, macro product shots and a big music build.",
      hook: "Made for the moment {problem} finally ends.",
      tint: ["#1b1e24", "#c9a46a"]
    },
    explainer: {
      label: "Educational explainer",
      subject: "an animated mascot with simple diagrams",
      look: "Friendly animated characters and clear visual metaphors that explain how it works in plain language.",
      hook: "Here's what's really going on with {problem}.",
      tint: ["#1d4d3a", "#7de8b0"]
    }
  };
  var DURATIONS = [15, 30, 45, 60];
  (function fillIndustries() {
    var sel = document.getElementById("sb-industry");
    if (!sel || !window.SB_PLAYBOOKS) return;
    window.SB_PLAYBOOKS.forEach(function (pb) {
      var o = document.createElement("option"); o.value = pb.id; o.textContent = pb.label; sel.appendChild(o);
    });
  })();

  /* ---------- Voice and sound options ---------- */
  var AUDIO = {
    voiceover: {
      label: "Voiceover",
      direction: "AI voiceover matched to the brand's tone, with a music bed and sound effects underneath.",
      lines: {}
    },
    talking: {
      label: "AI talking head",
      direction: "An AI presenter speaks straight to camera, cut together with B-roll and product shots.",
      lines: {
        hook: "AI talking head delivers the hook straight to camera in the first 2 seconds.",
        problem: "Talking head names the problem in the viewer's own words.",
        reveal: "Talking head introduces {brand} in one line, cut to the product shot.",
        benefit: "Talking head lands the main benefit.",
        cta: "Talking head delivers the call to action, then a short logo sting."
      }
    },
    music: {
      label: "Music only",
      direction: "No voice. The story is told with on-screen text, timed to a custom music track.",
      lines: {
        hook: "Strong beat drop on the first cut. The hook is carried by on-screen text.",
        problem: "No voice. On-screen text tells the story over the music.",
        reveal: "Music swells for the product reveal.",
        benefit: "Music peaks while the benefit appears on screen.",
        cta: "Music resolves on the end card with a logo sting."
      }
    },
    mixed: {
      label: "Mixed",
      direction: "A mix of AI talking head, voiceover and music, switching to whatever fits each scene best.",
      lines: {
        hook: "AI talking head delivers the hook over a music bed, with a sound hit on the first cut.",
        problem: "Voiceover names the problem while the music sits underneath.",
        reveal: "Talking head introduces {brand} as the music builds.",
        benefit: "Voiceover lands the main benefit over the music peak.",
        cta: "Talking head call to action, music resolves, logo sting."
      }
    }
  };
  var CTA = {
    "Drive sales": "Shop {brand} now",
    "Launch a new product": "{brand} is here. Get yours",
    "Build brand awareness": "Follow {brand} for more",
    "Get leads or bookings": "Book with {brand} today"
  };

  /* ---------- Render chips ---------- */
  var state = { style: "ugc", duration: 30, audio: "voiceover" };
  function chips(el, items, key) {
    el.innerHTML = items.map(function (it) {
      var v = it.value, sel = String(state[key]) === String(v);
      return '<button type="button" class="sb-chip" role="radio" aria-checked="' + sel + '" data-v="' + esc(v) + '">' + esc(it.label) + "</button>";
    }).join("");
    el.setAttribute("role", "radiogroup");
    el.onclick = function (e) {
      var b = e.target.closest(".sb-chip"); if (!b) return;
      state[key] = key === "duration" ? +b.getAttribute("data-v") : b.getAttribute("data-v");
      chips(el, items, key);
      var nb = el.querySelector('[data-v="' + b.getAttribute("data-v") + '"]'); if (nb) nb.focus();
    };
    el.onkeydown = function (e) {
      if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].indexOf(e.key) < 0) return;
      e.preventDefault();
      var list = Array.prototype.slice.call(el.querySelectorAll(".sb-chip"));
      var i = list.indexOf(document.activeElement); if (i < 0) return;
      var n = list[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : list.length - 1)) % list.length];
      n.click();
    };
  }
  var styleItems = Object.keys(STYLES).map(function (k) { return { value: k, label: STYLES[k].label }; });
  var durItems = DURATIONS.map(function (d) { return { value: d, label: d + "s" }; });
  chips($("#sb-styles"), styleItems, "style");
  chips($("#sb-durations"), durItems, "duration");
  chips($("#sb-audio"), Object.keys(AUDIO).map(function (k) { return { value: k, label: AUDIO[k].label }; }), "audio");

  /* ---------- Generator ---------- */
  function fill(t, v) {
    return t.replace(/\{(\w+)\}/g, function (_, k) { return v[k] != null ? v[k] : ""; });
  }
  function beatsFor(sec) {
    if (sec <= 15) return ["hook", "problem", "reveal", "cta"];
    if (sec <= 30) return ["hook", "problem", "turn", "reveal", "benefit", "cta"];
    if (sec <= 45) return ["hook", "problem", "turn", "reveal", "demo", "benefit", "cta"];
    return ["hook", "problem", "turn", "reveal", "demo", "benefit", "proof", "cta"];
  }
  function timecodes(n, total) {
    var hookLen = 3, ctaLen = total <= 15 ? 3 : 4;
    var mid = n - 2, rest = total - hookLen - ctaLen, out = [], t = 0;
    for (var i = 0; i < n; i++) {
      var len = i === 0 ? hookLen : i === n - 1 ? ctaLen : rest / mid;
      var a = Math.round(t), b = Math.round(t + len);
      out.push(a + "–" + b + "s"); t += len;
    }
    return out;
  }
  var PLAYBOOKS = window.SB_PLAYBOOKS || [];
  var FALLBACK = window.SB_FALLBACK;
  // Match the industry from everything the visitor typed, including their website address.
  function detectIndustry(v) {
    if (v.industry && v.industry !== "auto") {
      for (var i = 0; i < PLAYBOOKS.length; i++) if (PLAYBOOKS[i].id === v.industry) return PLAYBOOKS[i];
    }
    var site = (v.website || "").toLowerCase().replace(/^https?:\/\//, "").replace(/[\/._-]+/g, " ");
    var hay = " " + [v.brand, v.problem, v.benefit, v.audience, v.notes, site].join(" ").toLowerCase() + " ";
    var squashed = hay.replace(/[^a-z0-9]/g, "");
    var best = null, bestScore = 0;
    PLAYBOOKS.forEach(function (pb) {
      var score = 0;
      pb.keys.forEach(function (k) {
        if (hay.indexOf(k) > -1) score += k.length > 5 ? 3 : 2;
        else if (k.length > 5 && squashed.indexOf(k.replace(/[^a-z0-9]/g, "")) > -1) score += 2;
      });
      if (score > bestScore) { bestScore = score; best = pb; }
    });
    return best || FALLBACK;
  }
  var STYLE_NOTE = {
    pixar: "Rendered as Pixar-style 3D characters.",
    clay: "Rendered in a handmade clay-animation look.",
    ugc: "Shot selfie-style on a phone, like a real creator.",
    dtc: "Clean, bright and product-first, with fast cuts.",
    podcast: "Framed as a podcast clip, with B-roll cutaways for this moment.",
    drama: "Played as a grounded, emotional drama scene.",
    cinematic: "Lit and graded like a premium commercial.",
    explainer: "Animated with simple diagrams and a friendly mascot."
  };
  function audioFor(v, k, line) {
    var A = AUDIO[v.audioKey] || AUDIO.voiceover;
    if (v.audioKey === "music") return (A.lines[k] || "Music only. On-screen text") + (line ? " Caption: \u201c" + line + "\u201d" : "");
    if (v.audioKey === "talking") return "AI talking head: \u201c" + line + "\u201d";
    if (v.audioKey === "mixed") return (k === "hook" || k === "cta" ? "AI talking head: \u201c" : "Voiceover: \u201c") + line + "\u201d (over the music bed)";
    return "Voiceover: \u201c" + line + "\u201d";
  }
  var ICON_BY_BEAT = { hook: "face", problem: "face", turn: "spark", reveal: "product", demo: "hand", benefit: "smile", proof: "people", cta: "cta" };

  // Build the on-page storyboard from the AI's answer (same shape as generate()).
  function fromAI(v, d) {
    var S = STYLES[v.styleKey], A = AUDIO[v.audioKey] || AUDIO.voiceover;
    var keys = beatsFor(v.duration), tcs = timecodes(keys.length, v.duration);
    var str = function (x, n) { return String(x == null ? "" : x).replace(/\s+/g, " ").trim().slice(0, n || 400); };
    var hooks = (d.hooks || []).map(function (h) { return str(h, 160); }).filter(Boolean).slice(0, 3);
    while (hooks.length < 3) hooks.push(hooks[0] || v.brand);
    var scenes = keys.map(function (k, i) {
      var sc = (d.scenes || [])[i] || {};
      return { n: i + 1, tc: tcs[i], title: str(sc.title, 40) || cap(k), shot: str(sc.shot, 40) || "Shot",
        icon: ICON_BY_BEAT[k], visual: str(sc.visual, 400), text: str(sc.text, 90) || str(sc.line, 90),
        audio: audioFor(v, k, str(sc.line, 220)), flowPrompt: str(sc.flowPrompt, 900) };
    }).filter(function (s) { return s.visual; });
    return {
      style: S, audio: A, hooks: hooks, scenes: scenes, wide: /landscape/i.test(v.platform),
      industry: str(d.industry, 40) || "Custom",
      concept: { title: str(d.concept && d.concept.title, 60) || "Custom concept", logline: str(d.concept && d.concept.logline, 300) },
      patterns: (d.patterns || []).map(function (p) { return str(p, 200); }).filter(Boolean).slice(0, 3),
      brandNotes: str(d.brandNotes, 400), ai: true,
      pain: v.problem || "", offer: v.benefit || ""
    };
  }

  // Ask the site's AI function for a custom storyboard. Resolves to null if it isn't available.
  function askAI(v) {
    if (/claude|anthropic/i.test(location.hostname) || location.origin === "null" || location.protocol === "file:") return Promise.resolve(null);
    var PB = detectIndustry(v), S = STYLES[v.styleKey], A = AUDIO[v.audioKey] || AUDIO.voiceover;
    var ctrl = window.AbortController ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 40000);
    return fetch("/api/storyboard", {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: ctrl ? ctrl.signal : undefined,
      body: JSON.stringify({
        brand: v.brand, industry: v.industry, industryLabel: PB.id === "general" ? "" : PB.label, website: v.website,
        problem: v.problem, audience: v.audience, benefit: v.benefit, styleLabel: S.label, audioLabel: A.label,
        duration: v.duration, platform: v.platform, goal: v.goal, notes: v.notes, beats: beatsFor(v.duration)
      })
    }).then(function (res) { return res.ok ? res.json() : null; })
      .then(function (j) { clearTimeout(t); return j && j.ok && j.data ? fromAI(v, j.data) : null; })
      .catch(function () { clearTimeout(t); return null; });
  }

  function generate(v) {
    var S = STYLES[v.styleKey];
    var PB = detectIndustry(v);
    var pain = lc(v.problem) || PB.pain;
    var offer = v.benefit || PB.offer;
    var hero = PB.hero;
    var vars = {
      brand: v.brand, hero: hero, Hero: cap(hero), pain: pain, Pain: cap(pain),
      offer: offer, audience: lc(v.audience) || "your customers"
    };
    var hooks = PB.hooks.map(function (h) { return fill(h, vars); });
    var CTA_BY_GOAL = {
      "Drive sales": PB.cta,
      "Get leads or bookings": PB.cta,
      "Launch a new product": "New from {brand}. " + PB.cta.replace(/ \{brand\}| with \{brand\}| at \{brand\}/, ""),
      "Build brand awareness": "Follow {brand} for more"
    };
    var ctaText = fill(CTA_BY_GOAL[v.goal] || PB.cta, vars);
    var A = AUDIO[v.audioKey] || AUDIO.voiceover;
    var ICON = { hook: "face", problem: "face", turn: "spark", reveal: "product", demo: "hand", benefit: "smile", proof: "people", cta: "cta" };
    var TITLE = { hook: "Hook", problem: "Problem", turn: "Turning point", reveal: "Reveal", demo: "How it works", benefit: "Result", proof: "Social proof", cta: "Call to action" };
    var keys = beatsFor(v.duration), tcs = timecodes(keys.length, v.duration);
    var scenes = keys.map(function (k, i) {
      var b = PB.scenes[k];
      var visual = fill(b.visual, vars);
      if (k === "hook" || k === "problem") visual += " " + (STYLE_NOTE[v.styleKey] || "");
      var text = k === "hook" ? hooks[0] : k === "cta" ? ctaText : fill(b.text || "", vars);
      var line = fill(b.vo || "", vars);
      if (k === "hook") line = hooks[0];
      if (k === "cta") line = fill(b.vo || ctaText, vars);
      var audio = audioFor(v, k, line);
      return { n: i + 1, tc: tcs[i], title: TITLE[k], shot: b.shot, icon: ICON[k], visual: visual.trim(), text: text, audio: audio };
    });
    return {
      style: S, audio: A, hooks: hooks, scenes: scenes, wide: /landscape/i.test(v.platform),
      industry: PB.label, concept: { title: PB.concept.title, logline: fill(PB.concept.logline, vars) },
      patterns: PB.patterns.map(function (p) { return fill(p, vars); }),
      pain: pain, offer: offer
    };
  }

  /* ---------- Frame drawings (simple storyboard sketches) ---------- */
  var ICONS = {
    face: '<circle cx="50" cy="44" r="15"/><path d="M24 92c2-18 13-28 26-28s24 10 26 28"/>',
    smile: '<circle cx="50" cy="44" r="15"/><path d="M43 47c4 4 10 4 14 0"/><path d="M24 92c2-18 13-28 26-28s24 10 26 28"/>',
    spark: '<circle cx="40" cy="48" r="13"/><path d="M18 92c2-16 11-24 22-24s20 8 22 24"/><path d="M72 26v14M65 33h14M78 50l6 6M84 50l-6 6"/>',
    product: '<rect x="38" y="34" width="24" height="48" rx="5"/><rect x="43" y="22" width="14" height="12" rx="2"/><path d="M38 56h24"/><path d="M22 30l6 4M78 30l-6 4M20 60h7M73 60h7"/>',
    hand: '<rect x="54" y="24" width="18" height="36" rx="4"/><path d="M30 92V64c0-5 7-5 7 0v-8c0-5 7-5 7 0v4c0-5 7-5 7 0v6c0-5 7-5 7 0v12c0 8-5 14-12 14"/>',
    people: '<circle cx="34" cy="46" r="11"/><circle cx="66" cy="46" r="11"/><path d="M14 90c2-14 10-21 20-21s18 7 20 21"/><path d="M46 90c2-14 10-21 20-21s18 7 20 21"/>',
    cta: '<rect x="40" y="22" width="20" height="38" rx="4"/><rect x="24" y="70" width="52" height="14" rx="7"/><path d="M60 77h6M63 74l3 3-3 3"/>'
  };
  function frameHTML(sc, out) {
    var t = out.style.tint;
    return '<div class="sb-frame' + (out.wide ? " wide" : "") + '" style="--t1:' + t[0] + ";--t2:" + t[1] + '">' +
      '<span class="sb-frame-tc">' + esc(sc.tc) + "</span>" +
      '<span class="sb-frame-shot">' + esc(sc.shot) + "</span>" +
      '<p class="sb-frame-text' + (sc.text.length > 60 ? " xlong" : sc.text.length > 34 ? " long" : "") + '">' + esc(sc.text) + "</p>" +
      '<svg class="sb-frame-art" viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + ICONS[sc.icon] + "</svg>" +
      "</div>";
  }

  function plainText(v, out) {
    var lines = [
      "STORYBOARD DRAFT: " + v.brand,
      "Industry: " + out.industry + (v.industry === "auto" ? " (auto-detected)" : ""),
      "Style: " + out.style.label + " | Sound: " + out.audio.label + " | " + v.duration + "s | " + v.platform + " | Goal: " + v.goal,
      "Audience: " + v.audience,
      "Problem: " + (v.problem || (out.pain ? "(not given; used: " + out.pain + ")" : "(not given)")) + " | Benefit/offer: " + (v.benefit || "(not given)"),
      "Website / Facebook: " + (v.website || "(not given)"),
      "",
      "CONCEPT: " + out.concept.title + ". " + out.concept.logline,
      "",
      "WHAT WORKS IN " + out.industry.toUpperCase() + " ADS",
      "- " + out.patterns.join("\n- "),
      "",
      "HOOK OPTIONS",
      "1. " + out.hooks[0], "2. " + out.hooks[1], "3. " + out.hooks[2],
      "",
      "VISUAL DIRECTION: " + out.style.look,
      "VOICE AND SOUND (" + out.audio.label + "): " + out.audio.direction,
      ""
    ];
    if (out.brandNotes) lines.splice(8, 0, "FROM THE WEBSITE: " + out.brandNotes, "");
    lines.splice(1, 0, "Written by: " + (out.ai ? "Gemini (custom)" : "built-in playbook"));
    out.scenes.forEach(function (s) {
      lines.push("SCENE " + s.n + " (" + s.tc + ") " + s.title.toUpperCase() + " | " + s.shot);
      lines.push("  Visual: " + s.visual);
      lines.push("  On screen: " + s.text);
      lines.push("  Audio: " + s.audio);
    });
    return lines.join("\n");
  }
  // Google Flow prompts go only to Angelyn's email, as her working notes.
  function flowPrompts(out) {
    var withP = out.scenes.filter(function (s) { return s.flowPrompt; });
    if (!withP.length) return "";
    return withP.map(function (s) { return "SCENE " + s.n + " (" + s.title + "):\n" + s.flowPrompt; }).join("\n\n");
  }

  function render(v, out, sendState) {
    var r = $("#sb-result");
    r.innerHTML =
      '<div class="sb-result-head">' +
        '<div><p class="eyebrow">Storyboard draft for</p><h3 class="sb-result-title">' + esc(v.brand) + "</h3>" +
        '<p class="sb-meta">' + esc(out.industry) + " · " + esc(out.style.label) + " · " + esc(out.audio.label) + " · " + v.duration + "s · " + esc(v.platform) + " · " + esc(v.goal) + "</p></div>" +
        '<div class="sb-status" id="sb-status" role="status" aria-live="polite">' + sendState + "</div>" +
      "</div>" +
      '<div class="sb-concept"><div><p class="label">Concept</p><h4>' + esc(out.concept.title) + "</h4><p>" + esc(out.concept.logline) + "</p></div>" +
        '<div><p class="label">What works in ' + esc(out.industry.toLowerCase()) + " ads</p><ul>" +
        out.patterns.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div></div>" +
      (out.brandNotes ? '<p class="sb-brandnotes"><b>From your website.</b> ' + esc(out.brandNotes) + "</p>" : "") +
      '<div class="sb-hooks"><p class="label">Hook options</p><ol>' +
        out.hooks.map(function (h, i) { return '<li' + (i === 0 ? ' class="top"' : "") + "><span>" + (i === 0 ? "Recommended" : "Alt " + i) + "</span>" + esc(h) + "</li>"; }).join("") +
      "</ol></div>" +
      '<div class="sb-looks"><p class="sb-look"><b>Visual direction.</b> ' + esc(out.style.look) + "</p>" +
      '<p class="sb-look"><b>Voice and sound: ' + esc(out.audio.label) + ".</b> " + esc(out.audio.direction) + "</p></div>" +
      '<ol class="sb-scenes' + (out.wide ? " wide" : "") + '">' + out.scenes.map(function (s) {
        return '<li class="sb-scene">' + frameHTML(s, out) +
          '<div class="sb-scene-body"><p class="sb-scene-n">Scene ' + s.n + " · " + esc(s.title) + "</p>" +
          "<dl><div><dt>Visual</dt><dd>" + esc(s.visual) + "</dd></div>" +
          "<div><dt>On screen</dt><dd>" + esc(s.text) + "</dd></div>" +
          "<div><dt>Audio</dt><dd>" + esc(s.audio) + "</dd></div></dl></div></li>";
      }).join("") + "</ol>" +
      '<div class="sb-actions">' +
        '<button type="button" class="btn btn-ghost" id="sb-copy">Copy storyboard</button>' +
        '<button type="button" class="btn btn-ghost" id="sb-again">Try another style</button>' +
        '<p class="sb-copy-status" id="sb-copy-status" role="status" aria-live="polite"></p>' +
      "</div>" +
      '<p class="sb-note">This is an instant draft ' + (out.ai ? "written by AI for your brand" : "built from your answers and proven " + esc(out.industry.toLowerCase()) + " ad structures") + ". Angelyn will review your brief" + (v.website ? " and <b>" + esc(v.website) + "</b>" : "") + " and follow up by email with a refined concept, script and AI-generated frames.</p>";
    r.hidden = false;
    r.focus({ preventScroll: true });
    r.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

    $("#sb-copy").onclick = function () {
      var txt = plainText(v, out), st = $("#sb-copy-status");
      try {
        navigator.clipboard.writeText(txt).then(function () { st.textContent = "Storyboard copied."; },
          function () { st.textContent = "Copy isn't available here. Select the text to copy it."; });
      } catch (e) { st.textContent = "Copy isn't available here. Select the text to copy it."; }
    };
    $("#sb-again").onclick = function () {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      var first = $("#sb-styles .sb-chip[aria-checked='true']"); if (first) first.focus({ preventScroll: true });
    };
  }

  /* ---------- Loading bar + confirmation toast ---------- */
  var btn = $("#sb-submit"), btnLabel = btn ? btn.textContent : "";
  var progress = document.getElementById("sb-progress");
  var formStatus = document.getElementById("sb-form-status");
  function setProgress(pct, text) {
    if (!progress) return;
    progress.hidden = false;
    progress.querySelector(".sb-progress-fill").style.width = pct + "%";
    progress.querySelector(".sb-progress-text").textContent = text;
  }
  function endProgress() { if (progress) setTimeout(function () { progress.hidden = true; }, 900); }
  function busy(on) {
    if (!btn) return;
    btn.disabled = on; btn.classList.toggle("is-busy", on);
    btn.innerHTML = on ? '<span class="sb-spin" aria-hidden="true"></span>Generating\u2026' : esc(btnLabel);
  }
  var toastEl = null, toastT = null;
  function toast(kind, html) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "sb-toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.className = "sb-toast show " + kind;
    toastEl.innerHTML = '<span class="sb-toast-icon" aria-hidden="true">' + (kind === "ok" ? "\u2713" : "!") + "</span><p>" + html + '</p><button type="button" class="sb-toast-x" aria-label="Close">\u00d7</button>';
    toastEl.querySelector(".sb-toast-x").onclick = function () { toastEl.classList.remove("show"); };
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, kind === "ok" ? 7000 : 12000);
  }
  function both(kind, html) {
    var s = $("#sb-status"); if (s) s.innerHTML = (kind === "ok" ? '<span class="ok">\u2713</span>' : '<span class="warn">!</span>') + "<span>" + html + "</span>";
    if (formStatus) { formStatus.className = "sb-form-status " + kind; formStatus.innerHTML = html; }
    toast(kind, html);
  }

  /* ---------- Submit ---------- */
  var lastSent = "";
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    try { handleSubmit(); }
    catch (err) { fail(err); }
  });
  function fail(err) {
    busy(false); if (progress) progress.hidden = true;
    toast("warn", "Something went wrong (" + esc(err && err.message || err) + "). Please email <b>" + esc(OWNER_EMAIL) + "</b> directly.");
  }
  // Last-resort report for any other script error while using the form
  window.addEventListener("error", function (ev) {
    if (form.contains(document.activeElement) || (btn && btn.disabled)) fail(ev.message);
  });

  function handleSubmit() {
    var err = $("#sb-error"); if (err) err.textContent = "";
    if (formStatus) { formStatus.className = "sb-form-status"; formStatus.textContent = ""; }
    var fields = ["sb-name", "sb-email", "sb-brand", "sb-audience"];
    var bad = fields.filter(function (id) {
      var el = document.getElementById(id); if (!el) return false;
      var ok = el.value.trim() && (el.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      return !ok;
    });
    if (bad.length) {
      var msg = bad.indexOf("sb-email") > -1 && bad.length === 1 ? "Please enter a valid email address." : "Please fill in the highlighted fields.";
      if (err) err.textContent = msg;
      toast("warn", msg);
      document.getElementById(bad[0]).focus();
      return;
    }

    var val = function (id) { var el = document.getElementById(id); return el ? el.value : ""; };
    var v = {
      name: clean(val("sb-name")), email: val("sb-email").trim(),
      brand: clean(val("sb-brand")), problem: clean(val("sb-problem")),
      audience: clean(val("sb-audience")), benefit: clean(val("sb-benefit")),
      styleKey: state.style, duration: state.duration, audioKey: state.audio,
      platform: val("sb-platform") || "TikTok / Instagram Reels", goal: val("sb-goal") || "Drive sales", notes: val("sb-notes").trim(),
      website: val("sb-website").trim(), industry: val("sb-industry") || "auto"
    };
    var key = JSON.stringify(v);

    busy(true);
    setProgress(12, v.website ? "Reading your website\u2026" : "Studying your industry\u2026");
    var steps = [[2500, 30, "Researching what works in your industry\u2026"], [6000, 48, "Writing your hooks\u2026"], [11000, 62, "Building your scenes\u2026"], [18000, 70, "Almost there\u2026"]];
    var stepTimers = steps.map(function (st) { return setTimeout(function () { setProgress(st[1], st[2]); }, st[0]); });

    askAI(v).then(function (aiOut) {
      stepTimers.forEach(clearTimeout);
      try {
        var out = aiOut && aiOut.scenes.length >= 3 ? aiOut : generate(v);
        var alreadySent = key === lastSent;
        render(v, out, alreadySent ? "Brief already sent to Angelyn." : '<span class="dot"></span>Sending your brief to Angelyn\u2026');
        if (alreadySent) {
          setProgress(100, "Done"); endProgress(); busy(false);
          both("ok", "Your storyboard is ready. This brief was already sent to Angelyn.");
          return;
        }
        setProgress(85, "Sending your brief to Angelyn\u2026");
        sendBrief(v, out, key);
      } catch (e2) { fail(e2); }
    });
  }

  function sendBrief(v, out, key) {
    var payload = {
      _subject: "Storyboard request: " + v.brand + " (" + STYLES[v.styleKey].label + ", " + v.duration + "s)",
      _template: "box",
      _replyto: v.email,
      Name: v.name, Email: v.email, Brand: v.brand,
      Industry: out.industry, "Website / Facebook": v.website || "-",
      Problem: v.problem || "-", Audience: v.audience, "Benefit or offer": v.benefit || "-",
      Style: STYLES[v.styleKey].label, "Voice and sound": AUDIO[v.audioKey].label, Duration: v.duration + " seconds",
      Platform: v.platform, Goal: v.goal, Notes: v.notes || "-",
      "Generated draft": plainText(v, out)
    };
    var fp = flowPrompts(out);
    if (fp) payload["Google Flow image prompts"] = fp;
    var failMsg = "Your storyboard is ready below, but the email didn\u2019t go through. Please email <b>" + esc(OWNER_EMAIL) + "</b> and paste in your storyboard.";
    function finish() { setProgress(100, "Done"); endProgress(); busy(false); }

    // Inside the Claude preview, outside requests are blocked. The live site sends normally.
    if (/claude|anthropic/i.test(location.hostname) || location.origin === "null") {
      finish(); both("ok", "Your storyboard is ready below. (Preview only: on the live site this brief is emailed to Angelyn.)");
      return;
    }
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, j: j || {} }; });
    }).then(function (r) {
      clearTimeout(timer); finish();
      var ok = r.ok && (r.j.success === true || r.j.success === "true");
      var m = String(r.j.message || "");
      if (ok) {
        lastSent = key;
        both("ok", "Submitted! Your storyboard is ready below, and Angelyn will reply to <b>" + esc(v.email) + "</b>.");
      } else if (/activat/i.test(m)) {
        // FormSubmit sends the site owner a one-time activation email first.
        both("warn", "Your storyboard is ready below. The email form is waiting for one-time activation by the site owner, so please also email <b>" + esc(OWNER_EMAIL) + "</b>.");
      } else { both("warn", failMsg); }
    }).catch(function () { clearTimeout(timer); finish(); both("warn", failMsg); });
  }

  // Clear the invalid state as people type
  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) e.target.setAttribute("aria-invalid", "false");
  });
})();
