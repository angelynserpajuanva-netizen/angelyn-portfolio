/* Rendering + interactions. Content lives in data.js. */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var draft = !!(D.settings && D.settings.draftMode);
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
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
      media = '<img ' + (opts.eager ? 'fetchpriority="high" ' : 'loading="lazy" ') + 'decoding="async" alt="" src="' + esc(thumb) + '" onerror="var f=this.closest(\'.frame\');if(f)f.classList.remove(\'has-img\');this.remove()">';
    }
    var cover = hasVideo(p) ?
      '<div class="cover" aria-hidden="true"><span class="cover-cat">' + esc(p.category) + '</span><strong class="cover-title">' + esc(p.shortTitle || slotLabel(p, i)) + "</strong></div>" : "";
    var note = ready ? "" :
      '<div class="slot-note"><b>' + (draft ? "Video slot" : "Coming soon") + "</b>" +
      (draft ? "<span>Add link in data.js</span>" : "") + "</div>";
    return (
      '<button type="button" class="frame' + (ready ? "" : " slot") + (hasImg ? " has-img" : "") + '"' + (isFile ? ' data-preview="' + esc(p.preview || p.video.src) + '"' : "") + ' data-id="' + esc(p.id) + '" style="--ar:' + ratio(p) + '" ' +
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
    return '<span class="line"><span><span class="t">' + esc(l) + "</span></span></span>";
  }).join("");

  // On laptops and desktops, size the headline so its widest line reaches the
  // showreel. This keeps the gap between them small whichever font loads.
  var heroTitle = $("#hero-title");
  function fitHero() {
    heroTitle.style.fontSize = "";
    if (window.innerWidth < 901) return;
    var size = parseFloat(getComputedStyle(heroTitle).fontSize);
    for (var k = 0; k < 5; k++) {
      var widest = 0;
      heroTitle.querySelectorAll(".t").forEach(function (t) {
        Array.prototype.forEach.call(t.getClientRects(), function (r) { widest = Math.max(widest, r.width); });
      });
      var col = heroTitle.clientWidth;
      if (!widest || !col) return;
      var next = Math.max(48, Math.min(124, size * (col / widest) * 0.985));
      if (Math.abs(next - size) < 1) break;
      size = next; heroTitle.style.fontSize = size + "px";
    }
  }
  fitHero();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHero);
  window.addEventListener("load", fitHero);
  var fitT; window.addEventListener("resize", function () { clearTimeout(fitT); fitT = setTimeout(fitHero, 120); });

  /* ---------- Hero reel ---------- */
  var projects = D.projects;
  var featured = projects.filter(function (p) { return p.featured; }).slice(0, 3);
  if (featured.length < 3) featured = featured.concat(projects.filter(function (p) { return !p.featured; })).slice(0, 3);
  $("#hero-reel").innerHTML = featured.map(function (p) {
    return '<div class="reel-item">' + frameHTML(p, projects.indexOf(p), { caption: false, eager: true }) + "</div>";
  }).join("");

  /* ---------- Showreel ---------- */
  var SR = D.showreel || {};
  var srBox = $("#showreel");
  if (srBox && SR.src) {
    srBox.innerHTML =
      '<video muted loop playsinline preload="none"' + (SR.poster ? ' poster="' + esc(SR.poster) + '"' : "") + ' src="' + esc(SR.src) + '" aria-hidden="true"></video>' +
      '<div class="marks" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
      '<p class="sr-top"><span class="rec" aria-hidden="true"></span>' + esc(SR.label || "Showreel") + "</p>" +
      '<div class="sr-bottom"><button type="button" class="sr-sound" id="sr-sound" aria-pressed="false">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path class="w1" d="M16.5 8.5a5 5 0 0 1 0 7"/><path class="w2" d="M19 6a8.5 8.5 0 0 1 0 12"/><path class="x" d="M17 9l5 6M22 9l-5 6"/></svg>' +
      '<span class="sr-sound-label">Sound on</span></button>' +
      '<button type="button" class="sr-toggle" id="sr-toggle" aria-label="Pause showreel"><span aria-hidden="true"></span></button></div>' +
      (SR.music ? '<p class="sr-music">\u266A ' + esc(SR.music) + "</p>" : "");
    var srv = srBox.querySelector("video"), srBtn = $("#sr-toggle"), userPaused = reduceMotion;
    function srState() {
      var playing = !srv.paused;
      srBox.classList.toggle("is-paused", !playing);
      srBtn.setAttribute("aria-label", playing ? "Pause showreel" : "Play showreel");
    }
    function srPlay() { var pr = srv.play(); if (pr && pr.catch) pr.catch(function () { srState(); }); }
    srv.addEventListener("play", srState); srv.addEventListener("pause", srState);
    var srSound = $("#sr-sound");
    srSound.addEventListener("click", function () {
      var on = srv.muted;
      srv.muted = !on;
      if (on) { srv.currentTime = 0; userPaused = false; srPlay(); }
      srSound.setAttribute("aria-pressed", String(on));
      srBox.classList.toggle("has-sound", on);
      srSound.querySelector(".sr-sound-label").textContent = on ? "Sound off" : "Sound on";
    });
    srBtn.addEventListener("click", function () {
      if (srv.paused) { userPaused = false; srPlay(); } else { userPaused = true; srv.pause(); }
    });
    var pageReady = document.readyState === "complete", srVisible = false;
    function srMaybePlay() { if (pageReady && srVisible && !userPaused) srPlay(); }
    if (!pageReady) window.addEventListener("load", function () { pageReady = true; srMaybePlay(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        srVisible = en[0].isIntersecting;
        if (srVisible) srMaybePlay(); else srv.pause();
      }, { threshold: 0.25 }).observe(srBox);
    } else { srVisible = true; srMaybePlay(); }
    srState();
  } else if (srBox) { srBox.hidden = true; }

  /* ---------- Hook marquee ---------- */
  var mq = $("#marquee-track");
  if (mq) {
    var services = D.services || [];
    if (!services.length) { $("#marquee").hidden = true; }
    else {
      var one = services.map(function (s) {
        return '<a class="mq-item" href="#storyboard">' + esc(s) + "</a>" +
          '<span class="mq-sep" aria-hidden="true"></span>';
      }).join("");
      mq.innerHTML = '<div class="mq-group">' + one + '</div><div class="mq-group" aria-hidden="true" inert>' + one + "</div>";
      var mqBox = $("#marquee"), mqBtn = $("#mq-pause");
      if (mqBtn) mqBtn.addEventListener("click", function () {
        var paused = mqBox.classList.toggle("is-paused");
        mqBtn.setAttribute("aria-pressed", paused ? "true" : "false");
        mqBtn.setAttribute("aria-label", paused ? "Play scrolling services" : "Pause scrolling services");
      });
    }
  }

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
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function cardHTML(p, n, total) {
    var i = projects.indexOf(p);
    var hook = p.cardHook || "";
    var wide = isWide(p);
    return '<article class="card' + (wide ? " card-wide" : "") + '">' + frameHTML(p, i, { eager: n < 4 }) +
      '<div class="card-body">' +
        '<div class="card-meta"><span class="card-no">' + pad2(n + 1) + '<i>/' + pad2(total) + "</i></span>" +
          '<span class="card-cat">' + esc(p.category) + "</span>" +
          (p.featured ? '<span class="card-pick">\u2605 Top pick</span>' : "") +
          "</div>" +
        "<h3>" + esc(p.shortTitle || slotLabel(p, i)) + "</h3>" +
        (hook ? '<p class="card-hook">\u201c' + esc(hook) + "\u201d</p>" : "") +
      "</div></article>";
  }
  // Cards slide up gently as they scroll into view (transform/opacity only, so it stays fast).
  var revealIO = (!reduceMotion && "IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function revealCards(root) {
    return; // cards show immediately (no fade-in delay)
    root.classList.add("reveal-ready");
    root.querySelectorAll(".card").forEach(function (c) { revealIO.observe(c); });
  }
  // Show a few rows first (shorter page, faster load); "Show all" reveals the rest.
  var showAll = false;
  function gridLimit(grid) {
    var cols = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length || 2;
    var rows = window.innerWidth <= 600 ? 4 : 2;
    return Math.max(cols * rows, 6);
  }
  function renderGrid(animate) {
    var grid = $("#grid");
    var list = projects.filter(function (p) { return active === "All" || p.category === active; });
    var draw = function () {
      var limit = (showAll || active !== "All") ? list.length : gridLimit(grid);
      var shown = list.slice(0, limit);
      grid.innerHTML = list.length ? shown.map(function (p, n) { return cardHTML(p, n, list.length); }).join("") : '<p class="empty-filter">No projects in this category yet.</p>';
      var more = $("#grid-more"), moreBtn = $("#grid-more-btn");
      if (more && moreBtn) {
        more.hidden = shown.length >= list.length;
        moreBtn.textContent = "Show all " + list.length + " videos";
      }
      bindHoverPreview(grid);
      revealCards(grid);
      var cnt = $("#work-count");
      if (cnt) cnt.textContent = list.length + (list.length === 1 ? " video" : " videos") + (active === "All" ? " \u00b7 " + cats.length + " categories" : " \u00b7 " + active);
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
  var moreBtnEl = $("#grid-more-btn");
  if (moreBtnEl) moreBtnEl.addEventListener("click", function () {
    var grid = $("#grid"), before = grid.children.length;
    showAll = true; renderGrid(false);
    var next = grid.children[before]; var f = next && next.querySelector(".frame");
    if (f) f.focus({ preventScroll: true });
  });

  // Silent previews. Desktop: play on hover. Phones and tablets: the card in the
  // middle of the screen plays on its own, like Reels. Videos load only when needed.
  function previewStart(f) {
    var v = f._pv;
    if (!v) {
      v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto"; v.disablePictureInPicture = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.src = f.getAttribute("data-preview");
      v.className = "hover-vid";
      f.querySelector(".frame-media").appendChild(v);
      f._pv = v;
    }
    v.classList.add("on");
    var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
  }
  function previewStop(f) { if (f._pv) { f._pv.pause(); f._pv.classList.remove("on"); } }
  var centreIO = null, centreNow = null;
  if (!reduceMotion && !canHover && !saveData && "IntersectionObserver" in window) {
    centreIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (centreNow && centreNow !== en.target) previewStop(centreNow);
          centreNow = en.target; previewStart(en.target);
        } else if (en.target === centreNow) { previewStop(en.target); centreNow = null; }
        else previewStop(en.target);
      });
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
  }
  function bindHoverPreview(root) {
    if (reduceMotion) return;
    root.querySelectorAll(".frame[data-preview]").forEach(function (f) {
      if (f._bound) return;
      if (canHover) {
        f._bound = true;
        f.addEventListener("mouseenter", function () { previewStart(f); });
        f.addEventListener("mouseleave", function () { previewStop(f); });
      } else if (centreIO) { f._bound = true; centreIO.observe(f); }
    });
  }
  bindHoverPreview($("#grid"));
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
        inner = '<video controls autoplay playsinline preload="auto" src="' + esc(v.src) + '"></video>';
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
    var f = e.target.closest(".frame[data-id], [data-open-project]");
    if (f) openProject(f.getAttribute("data-id") || f.getAttribute("data-open-project"), f);
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
  bindHoverPreview($("#case-list"));
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
  var reelFrames = document.querySelectorAll("#showreel, #hero-reel");
  function parallax() {
    if (reduceMotion || window.innerWidth < 900) { reelFrames.forEach(function (f) { f.style.transform = ""; }); return; }
    var y = Math.min(window.scrollY, 900);
    reelFrames.forEach(function (f, i) { f.style.transform = "translateY(" + (y * [-0.03, 0.05][i]).toFixed(1) + "px)"; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // Expanding panels changes height; keep line in sync
  if (window.ResizeObserver) new ResizeObserver(onScroll).observe(wrapEl);
  updateLine();

  $("#certs").innerHTML = (D.certifications || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");

  /* ---------- About, tools, workflow ---------- */
  if (D.photo && has(D.photo.src)) {
    $("#about-photo").innerHTML = '<img src="' + esc(D.photo.src) + '" alt="' + esc(D.photo.alt || "") + '" width="760" height="927" decoding="async">';
    // Reveal the photo when it scrolls into view
    var ap = $("#about-photo");
    if (!reduceMotion && "IntersectionObserver" in window) {
      ap.insertAdjacentHTML("beforeend", '<span class="scan" aria-hidden="true"></span>');

      var io = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        ap.classList.add("in-view"); io.disconnect();
        setTimeout(function () { ap.classList.add("floating"); }, 1600);
      }, { threshold: 0.25 });
      io.observe(ap);
    }

    // Desktop: a warm camera light follows the cursor across About, and a
    // viewfinder with a running REC timecode frames the face on hover.
    if (!reduceMotion && canHover) {
      var sec = $("#about");
      sec.classList.add("has-spot");
      sec.insertAdjacentHTML("afterbegin", '<div class="about-spot" aria-hidden="true"></div>');
      sec.addEventListener("pointermove", function (e) {
        var r = sec.getBoundingClientRect();
        sec.style.setProperty("--mx", (e.clientX - r.left) + "px");
        sec.style.setProperty("--my", (e.clientY - r.top) + "px");
        sec.classList.add("lit");
      });
      sec.addEventListener("pointerleave", function () { sec.classList.remove("lit"); });

      ap.insertAdjacentHTML("beforeend",
        '<div class="vf" aria-hidden="true"><i></i><i></i><i></i><i></i>' +
        '<span class="vf-rec"><b></b>REC <span class="vf-tc">00:00:00:00</span></span>' +
        '<span class="vf-af">AF</span></div>');
      var tcEl = ap.querySelector(".vf-tc"), tcTimer = null, tcStart = 0;
      function pad(n) { return (n < 10 ? "0" : "") + n; }
      ap.addEventListener("pointerenter", function () {
        ap.classList.add("framing"); tcStart = performance.now();
        clearInterval(tcTimer);
        tcTimer = setInterval(function () {
          var ms = performance.now() - tcStart, s = Math.floor(ms / 1000);
          tcEl.textContent = "00:" + pad(Math.floor(s / 60)) + ":" + pad(s % 60) + ":" + pad(Math.floor((ms % 1000) / (1000 / 24)));
        }, 42);
      });
      ap.addEventListener("pointerleave", function () { ap.classList.remove("framing"); clearInterval(tcTimer); });
    }
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
