/* Rendering + interactions. Content lives in data.js. */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var draft = !!(D.settings && D.settings.draftMode);
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function has(v) { return Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim()); }

  /* ---------- Video helpers ---------- */
  function driveId(url) {
    var m = String(url).match(/\/d\/([\w-]{10,})/) || String(url).match(/[?&]id=([\w-]{10,})/);
    return m ? m[1] : "";
  }
  function youtubeId(url) {
    var m = String(url).match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    return m ? m[1] : "";
  }
  function vimeoId(url) {
    var m = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : "";
  }
  function hasVideo(p) { return p.video && has(p.video.src); }
  function ratio(p) { return (p.aspect || "9:16").replace(":", "/"); }
  function isWide(p) { var a = (p.aspect || "9:16").split(":"); return +a[0] > +a[1]; }

  function thumbFor(p) {
    if (has(p.thumbnail)) return p.thumbnail;
    if (hasVideo(p)) {
      var v = p.video;
      if (v.type === "drive" && driveId(v.src)) return "https://drive.google.com/thumbnail?id=" + driveId(v.src) + "&sz=w800";
      if (v.type === "youtube" && youtubeId(v.src)) return "https://i.ytimg.com/vi/" + youtubeId(v.src) + "/hqdefault.jpg";
    }
    return "";
  }
  function externalUrl(p) {
    if (!hasVideo(p)) return "";
    var v = p.video;
    if (v.type === "drive" && driveId(v.src)) return "https://drive.google.com/file/d/" + driveId(v.src) + "/view";
    if (v.type === "youtube" || v.type === "vimeo") return v.src;
    return "";
  }

  function slotLabel(p, i) {
    return has(p.title) ? p.title : "Video " + String(i + 1).padStart(2, "0");
  }

  /* ---------- Frame (thumbnail tile) ---------- */
  function frameHTML(p, i, opts) {
    opts = opts || {};
    var thumb = thumbFor(p);
    var ready = hasVideo(p) || has(thumb);
    var hasImg = has(thumb) || (p.video && p.video.type === "file" && hasVideo(p));
    var media = "";
    var isFile = p.video && p.video.type === "file" && hasVideo(p);
    if (isFile && !thumb) {
      media = '<video muted playsinline preload="metadata" src="' + esc(p.video.src) + '#t=0.5"></video>';
    } else if (thumb) {
      media = '<img loading="lazy" alt="" src="' + esc(thumb) + '" onerror="var f=this.closest(\'.frame\');if(f)f.classList.remove(\'has-img\');this.remove()">';
    }
    var cover = hasVideo(p) ?
      '<div class="cover" aria-hidden="true"><span class="cover-cat">' + esc(p.category) + '</span><strong class="cover-title">' + esc(p.shortTitle || slotLabel(p, i)) + "</strong></div>" : "";
    var note = ready ? "" :
      '<div class="slot-note"><b>' + (draft ? "Video slot" : "Coming soon") + "</b>" +
      (draft ? "<span>Add link in data.js</span>" : "") + "</div>";
    return (
      '<button type="button" class="frame' + (ready ? "" : " slot") + (hasImg ? " has-img" : "") + '"' + (isFile ? ' data-preview="' + esc(p.video.src) + '"' : "") + ' data-id="' + esc(p.id) + '" style="--ar:' + ratio(p) + '" ' +
      'aria-label="Open ' + esc(slotLabel(p, i)) + '">' +
        '<div class="frame-media">' + cover + media + note +
          '<div class="marks" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
          '<div class="tc" aria-hidden="true"><span>' + esc(p.aspect || "9:16") + "</span><span>TC " + String(i + 1).padStart(2, "0") + ":00:00:00</span></div>" +
          '<span class="play" aria-hidden="true"></span>' +
          (opts.caption ? '<div class="frame-cap"><span>' + esc(p.category) + "</span><strong>" + esc(slotLabel(p, i)) + "</strong></div>" : "") +
        "</div>" +
      "</button>"
    );
  }

  /* ---------- Bind simple text ---------- */
  var P = D.person;
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var k = el.getAttribute("data-bind");
    if (P[k] != null) el.textContent = P[k];
  });
  $("#hero-title").innerHTML = P.headline.map(function (l) {
    return '<span class="line"><span>' + esc(l) + "</span></span>";
  }).join("");

  /* ---------- Hero reel ---------- */
  var projects = D.projects;
  var featured = projects.filter(function (p) { return p.featured; }).slice(0, 3);
  if (featured.length < 3) featured = featured.concat(projects.filter(function (p) { return !p.featured; })).slice(0, 3);
  $("#hero-reel").innerHTML = featured.map(function (p) {
    var i = projects.indexOf(p);
    return '<div class="reel-item">' + frameHTML(p, i, { caption: false }) +
      '<p class="reel-label"><span>' + esc(p.category) + "</span>" + esc(p.shortTitle || slotLabel(p, i)) + "</p></div>";
  }).join("");

  /* ---------- Filters + grid ---------- */
  var cats = [];
  projects.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });
  var active = "All";
  try { var saved = localStorage.getItem("pf-filter"); if (saved && (saved === "All" || cats.indexOf(saved) > -1)) active = saved; } catch (e) {}

  function renderFilters() {
    if (cats.length < 2) { $("#filters").hidden = true; return; }
    var all = ["All"].concat(cats);
    $("#filters").innerHTML = all.map(function (c) {
      var n = c === "All" ? projects.length : projects.filter(function (p) { return p.category === c; }).length;
      return '<button type="button" class="chip" aria-pressed="' + (c === active) + '" data-cat="' + esc(c) + '">' + esc(c) + '<span class="n">' + n + "</span></button>";
    }).join("");
  }
  function cardHTML(p) {
    var i = projects.indexOf(p);
    var desc = has(p.summary) ? p.summary : (draft ? "Add a title and one-line description in data.js." : "");
    return '<article class="card">' + frameHTML(p, i) +
      '<div class="card-body"><span class="card-cat">' + esc(p.category) + "</span><h3>" + esc(slotLabel(p, i)) + "</h3>" +
      (desc ? "<p>" + esc(desc) + "</p>" : "") + "</div></article>";
  }
  function renderGrid(animate) {
    var grid = $("#grid");
    var list = projects.filter(function (p) { return active === "All" || p.category === active; });
    var draw = function () {
      grid.innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="empty-filter">No projects in this category yet.</p>';
      bindHoverPreview(grid);
    };
    if (animate && !reduceMotion && grid.children.length) {
      Array.prototype.forEach.call(grid.children, function (c) { c.classList.add("leaving"); });
      setTimeout(draw, 200);
    } else draw();
  }
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    active = b.getAttribute("data-cat");
    try { localStorage.setItem("pf-filter", active); } catch (err) {}
    renderFilters(); renderGrid(true);
    var nb = $('.chip[data-cat="' + CSS.escape(active) + '"]'); if (nb) nb.focus();
  });
  renderFilters(); renderGrid(false);

  // Silent hover preview on devices with a mouse. The video only loads on first hover.
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  function bindHoverPreview(root) {
    if (reduceMotion || !canHover) return;
    root.querySelectorAll(".frame[data-preview]").forEach(function (f) {
      var v = null;
      f.addEventListener("mouseenter", function () {
        if (!v) {
          v = document.createElement("video");
          v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
          v.src = f.getAttribute("data-preview");
          v.className = "hover-vid";
          f.querySelector(".frame-media").appendChild(v);
        }
        v.classList.add("on");
        var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
      });
      f.addEventListener("mouseleave", function () { if (v) { v.pause(); v.classList.remove("on"); } });
    });
  }
  bindHoverPreview($("#hero-reel"));

  /* ---------- Project dialog ---------- */
  var modal = $("#modal");
  var lastFocus = null;
  var labels = {
    audience: "Audience", objective: "Objective", concept: "Creative concept", hook: "Hook", production: "Production approach",
    tools: "AI tools used", editing: "Editing, captions & sound", deliverables: "Deliverables"
  };

  // Inside the Claude preview, outside players (Drive, YouTube, Vimeo) are blocked,
  // so show a cover with a link instead of a blank frame. Hosted sites embed normally.
  var inPreview = /claude|anthropic/i.test(location.hostname) || location.origin === "null";

  function playerHTML(p) {
    var v = p.video || {};
    var inner = "";
    var ext0 = externalUrl(p);
    if (hasVideo(p) && v.type !== "file" && inPreview && ext0) {
      return '<div class="player" style="--ar:' + ratio(p) + '">' +
        '<div class="cover"><span class="cover-cat">' + esc(p.category) + '</span><strong class="cover-title">' + esc(p.shortTitle || p.title) + "</strong></div>" +
        '<div class="player-fallback preview-play"><a class="btn btn-primary" href="' + esc(ext0) + '" target="_blank" rel="noopener">Watch on Google Drive ↗</a>' +
        "<span>Videos play right here once the site is hosted.</span></div></div>";
    }
    if (hasVideo(p)) {
      if (v.type === "file") {
        inner = '<video controls autoplay playsinline preload="auto"' + (has(p.thumbnail) ? ' poster="' + esc(p.thumbnail) + '"' : "") + ' src="' + esc(v.src) + '"></video>';
      } else if (v.type === "drive" && driveId(v.src)) {
        inner = '<iframe src="https://drive.google.com/file/d/' + driveId(v.src) + '/preview" allow="autoplay; fullscreen" allowfullscreen loading="lazy" title="' + esc(slotLabel(p, 0)) + '"></iframe>';
      } else if (v.type === "youtube" && youtubeId(v.src)) {
        inner = '<iframe src="https://www.youtube-nocookie.com/embed/' + youtubeId(v.src) + '?rel=0" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="' + esc(slotLabel(p, 0)) + '"></iframe>';
      } else if (v.type === "vimeo" && vimeoId(v.src)) {
        inner = '<iframe src="https://player.vimeo.com/video/' + vimeoId(v.src) + '" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="' + esc(slotLabel(p, 0)) + '"></iframe>';
      } else {
        inner = '<div class="player-fallback">This video link could not be read. Check the link format in data.js.</div>';
      }
    } else {
      inner = '<div class="player-fallback">' + (draft ? "No video yet. Add a link for this project in data.js." : "Video coming soon.") + "</div>";
    }
    var ext = externalUrl(p);
    return '<div class="player" style="--ar:' + ratio(p) + '">' + inner + "</div>" +
      (ext ? '<a class="ext-link" href="' + esc(ext) + '" target="_blank" rel="noopener">Video not loading? Watch it on ' + (v.type === "drive" ? "Google Drive" : v.type === "youtube" ? "YouTube" : "Vimeo") + " ↗</a>" : "");
  }

  function openProject(id, trigger) {
    var p = projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    lastFocus = trigger || document.activeElement;
    var i = projects.indexOf(p);
    $("#modal-cat").textContent = p.category || "";
    $("#modal-title").textContent = slotLabel(p, i);
    $("#modal-summary").textContent = p.summary || "";
    $("#modal-summary").hidden = !has(p.summary);
    var media = $("#modal-media");
    media.className = "modal-media" + (isWide(p) ? " wide" : "");
    media.innerHTML = playerHTML(p);
    $("#modal-details").innerHTML = Object.keys(labels).map(function (k) {
      var val = p[k];
      if (!has(val)) return draft ? "<div><dt>" + labels[k] + '</dt><dd><span class="todo">To add</span></dd></div>' : "";
      var dd = Array.isArray(val) ? '<div class="tag-list">' + val.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" : esc(val);
      return "<div><dt>" + labels[k] + "</dt><dd>" + dd + "</dd></div>";
    }).join("");
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    $("#modal-close").focus();
  }
  function closeProject() {
    $("#modal-media").innerHTML = ""; // stops playback
    if (modal.open) { if (typeof modal.close === "function") modal.close(); else modal.removeAttribute("open"); }
  }
  modal.addEventListener("close", function () {
    $("#modal-media").innerHTML = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });
  $("#modal-close").addEventListener("click", closeProject);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeProject(); });
  document.addEventListener("click", function (e) {
    var f = e.target.closest(".frame[data-id]");
    if (f) openProject(f.getAttribute("data-id"), f);
  });

  /* ---------- Case studies ---------- */
  var caseLabels = {
    brief: "Brief / objective", audience: "Target audience", storyboard: "Hook & storyboard",
    visualDirection: "Visual direction & AI workflow", consistency: "Product consistency & references",
    finalDeliverable: "Editing, sound & final deliverable"
  };
  var cases = projects.filter(function (p) { return p.caseStudy; });
  if (!cases.length) { $("#cases").hidden = true; }
  $("#case-list").innerHTML = cases.map(function (p) {
    var i = projects.indexOf(p);
    var fields = Object.keys(caseLabels).map(function (k) {
      var v = p.caseStudy[k];
      if (!has(v)) return draft ? "<div><dt>" + caseLabels[k] + '</dt><dd><span class="todo">To add</span></dd></div>' : "";
      return "<div><dt>" + caseLabels[k] + "</dt><dd>" + esc(v) + "</dd></div>";
    }).join("");
    var vids = (p.caseStudy.videos || [p.id]).map(function (id) { return projects.filter(function (x) { return x.id === id; })[0]; }).filter(Boolean);
    return '<article class="case"><div class="case-media' + (vids.length > 1 ? " multi" : "") + '">' + vids.map(function (v) { return frameHTML(v, projects.indexOf(v), { caption: false }); }).join("") + "</div>" +
      '<div class="case-body"><p class="eyebrow">' + esc(p.category) + '</p><h3 class="case-title">' + esc(slotLabel(p, i)) + "</h3>" +
      (has(p.summary) ? '<p class="muted" style="margin:0;max-width:60ch">' + esc(p.summary) + "</p>" : "") +
      '<dl class="case-fields">' + fields + "</dl></div></article>";
  }).join("");

  /* ---------- Timeline ---------- */
  $("#timeline").innerHTML = D.career.map(function (r, i) {
    var expandable = has(r.points) || has(r.skills);
    var creative = r.kind === "Creative";
    var head =
      '<span class="tl-date">' + esc(r.dates) + "</span>" +
      '<span class="tl-title">' + esc(r.title) + (r.kind === "Education" ? '<span class="tl-kind">Education</span>' : "") + "</span>" +
      (expandable ? '<span class="tl-toggle" aria-hidden="true">+</span>' : "") +
      '<span class="tl-org">' + esc(r.org) + "</span>";
    return '<li class="tl-item' + (creative ? " creative" : "") + '">' +
      '<span class="tl-dot" aria-hidden="true"></span>' +
      (expandable
        ? '<button type="button" class="tl-btn" aria-expanded="false" aria-controls="tl-p' + i + '">' + head + "</button>" +
          '<div class="tl-panel" id="tl-p' + i + '"><div>' +
            (has(r.points) ? "<ul>" + r.points.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul>" : "") +
            (has(r.skills) ? '<div class="tl-skills">' + r.skills.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + "</div>" : "") +
          "</div></div>"
        : '<div class="tl-btn" style="cursor:default">' + head + "</div>") +
      "</li>";
  }).join("");

  // Open the most recent creative role by default
  var items = document.querySelectorAll(".tl-item");
  function setOpen(li, open) {
    var b = li.querySelector("button.tl-btn"); if (!b) return;
    li.classList.toggle("open", open);
    b.setAttribute("aria-expanded", String(open));
    var panel = li.querySelector(".tl-panel");
    if (panel) panel.inert = !open;
  }
  items.forEach(function (li) { setOpen(li, false); });
  var creativeItem = document.querySelector(".tl-item.creative");
  if (creativeItem) setOpen(creativeItem, true);
  $("#timeline").addEventListener("click", function (e) {
    var b = e.target.closest("button.tl-btn"); if (!b) return;
    var li = b.closest(".tl-item");
    setOpen(li, !li.classList.contains("open"));
  });

  // Scroll-linked line draw + dots lighting up as the line reaches them
  var wrapEl = $("#tl-wrap"), prog = $("#tl-progress");
  function updateLine() {
    if (reduceMotion) { items.forEach(function (li) { li.classList.add("lit"); }); return; }
    var r = wrapEl.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    var p = (vh * 0.65 - r.top) / Math.max(r.height, 1);
    p = Math.max(0, Math.min(1, p));
    prog.style.setProperty("--p", p.toFixed(3));
    var lineY = r.top + p * r.height;
    items.forEach(function (li) {
      var d = li.querySelector(".tl-dot").getBoundingClientRect();
      li.classList.toggle("lit", d.top <= lineY);
    });
  }
  var ticking = false;
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; updateLine(); parallax(); }); }
  }

  // Subtle hero parallax
  var reelFrames = document.querySelectorAll("#hero-reel .reel-item");
  function parallax() {
    if (reduceMotion || window.innerWidth < 900) { reelFrames.forEach(function (f) { f.style.transform = ""; }); return; }
    var y = Math.min(window.scrollY, 900);
    reelFrames.forEach(function (f, i) { f.style.transform = "translateY(" + (y * [-0.04, 0.03, -0.07][i]).toFixed(1) + "px)"; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // Expanding panels changes height; keep line in sync
  if (window.ResizeObserver) new ResizeObserver(onScroll).observe(wrapEl);
  updateLine();

  $("#certs").innerHTML = (D.certifications || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");

  /* ---------- About, tools, workflow ---------- */
  if (D.photo && has(D.photo.src)) {
    $("#about-photo").innerHTML = '<img src="' + esc(D.photo.src) + '" alt="' + esc(D.photo.alt || "") + '" width="760" height="927" loading="lazy">';
  } else { $("#about-photo").hidden = true; }
  $("#about-body").innerHTML = D.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
  $("#tools-list").innerHTML = D.tools.map(function (t) {
    return '<li class="tool"><b>' + esc(t.name) + "</b>" + (t.use ? "<span>" + esc(t.use) + "</span>" : "") + "</li>";
  }).join("");
  $("#workflow").innerHTML = D.workflow.map(function (w) {
    return "<li><h3>" + esc(w.step) + "</h3><p>" + esc(w.text) + "</p></li>";
  }).join("");

  /* ---------- Contact ---------- */
  var C = D.contact;
  var mail = $("#email-link");
  mail.textContent = C.email;
  mail.href = "mailto:" + C.email;
  if (D.settings.showPhone && has(C.phone)) {
    $("#phone").textContent = C.phone;
    $("#msg-links").innerHTML = (C.messaging || []).map(function (m) {
      return '<a class="btn btn-small" href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.label) + " ↗</a>";
    }).join("");
    $("#phone-row").hidden = false;
  }
  $("#links").innerHTML = C.links.map(function (l) {
    return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a></li>";
  }).join("");
  function copier(btn, text, node, statusEl, what) {
    btn.addEventListener("click", function () {
      var status = $(statusEl);
      function selectIt() {
        var r = document.createRange(); r.selectNodeContents($(node));
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        status.textContent = what + " selected. Press Ctrl+C or ⌘C to copy.";
      }
      try {
        navigator.clipboard.writeText(text).then(function () { status.textContent = what + " copied."; }, selectIt);
      } catch (e) { selectIt(); }
    });
  }
  copier($("#copy-email"), C.email, "#email-link", "#copy-status", "Email");
  copier($("#copy-phone"), C.phone, "#phone", "#copy-status-phone", "Number");

  /* ---------- Nav ---------- */
  var toggle = $("#nav-toggle"), links = $("#nav-links");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "Menu"; }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("open")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "Menu"; toggle.focus(); }
  });

  /* ---------- Draft note ---------- */
  var missing = projects.filter(function (p) { return !hasVideo(p); }).length;
  if (draft && missing) {
    var n = $("#draft-note");
    n.textContent = "Preview · " + missing + " of " + projects.length + " video slots waiting for links";
    n.hidden = false;
  }
})();
