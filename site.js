/* Angelyn Serpa Juan — portfolio (v2)
   All content comes from data.js. Motion uses transform/opacity only, runs only
   when it's on screen, and turns off for visitors who choose "reduce motion".
   Each section has its own scroll effect:
     Hero ............ rolling headline word, mouse-parallax cards, cinematic scroll exit
     Services ........ two ribbons that speed up with your scroll
     Hook wall ....... pinned film strip with a 3-second countdown (swipe on phones)
     Work ............ filter pill, 3D tilt + glare, hover/center previews
     Skills .......... expanding panels with real covers
     Process ......... sticky step counter + progress line
     About ........... words light up as you read, portrait parallax
     Experience ...... timeline rail that fills as you scroll
     Contact/footer .. magnetic buttons, giant name with videos inside the letters */
(function () {
  "use strict";
  var D = window.PORTFOLIO || {};
  var mm = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduce = mm("(prefers-reduced-motion: reduce)");
  var fine = mm("(hover: hover) and (pointer: fine)");
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var has = function (v) { return Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim()); };
  var projects = D.projects || [];
  var byId = function (id) { return projects.filter(function (p) { return p.id === id; })[0]; };
  var isWide = function (p) { var a = (p.aspect || "9:16").split(":"); return +a[0] > +a[1]; };
  document.documentElement.classList.add("js");
  if (reduce) document.documentElement.classList.add("reduce");
  if (fine) document.documentElement.classList.add("fine");

  /* One scroll loop for every scroll effect */
  var scrollFns = [];
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; scrollFns.forEach(function (f) { f(); }); }); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  var vh = function () { return window.innerHeight || 800; };

  /* ================= NAV ================= */
  var progress = $("#progress");
  scrollFns.push(function () {
    var h = document.documentElement.scrollHeight - vh();
    progress.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0).toFixed(4) + ")";
    $(".nav").classList.toggle("scrolled", window.scrollY > 20);
  });
  var toggle = $("#nav-toggle"), links = $("#nav-links");
  function setMenu(open) {
    links.classList.toggle("open", open); toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("menu-open", open);
  }
  toggle.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); toggle.focus(); } });
  // highlight the section you're reading
  var navLinks = $$('a[href^="#"]', links), navTargets = navLinks.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  scrollFns.push(function () {
    var look = window.scrollY + vh() * 0.4, act = -1;
    navTargets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top + window.scrollY <= look) act = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle("active", i === act); });
  });

  /* ================= HERO ================= */
  var H = D.hero || {}, P = D.person || {};
  $("#ht-lead").textContent = H.lead || "";
  $("#ht-rolllead").textContent = H.rollLead || "";
  if (H.kicker) $("#hero-kicker").textContent = H.kicker;
  $("#hero-intro").textContent = H.intro || P.intro || "";
  $("#proof").innerHTML = ['<li><b>' + projects.length + '</b> ads made</li>'].concat((H.proof || []).map(function (t) { return "<li>" + esc(t) + "</li>"; })).join("");
  var words = H.words && H.words.length ? H.words : ["stop."];
  var wordEl = $("#ht-word"), roll = wordEl.parentNode, wi = 0;
  wordEl.textContent = words[0];
  roll.setAttribute("aria-label", words.join(" "));
  function sizeRoll() {
    // reserve the widest word so the headline never jumps
    var probe = document.createElement("span"); probe.className = "ht-word"; probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap";
    roll.appendChild(probe);
    var w = 0; words.forEach(function (t) { probe.textContent = t; w = Math.max(w, probe.getBoundingClientRect().width); });
    roll.removeChild(probe);
    roll.style.width = Math.ceil(w + 4) + "px";
  }
  sizeRoll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeRoll);
  window.addEventListener("resize", sizeRoll);
  if (!reduce && words.length > 1) {
    setInterval(function () {
      if (document.hidden) return;
      wordEl.classList.add("out");
      setTimeout(function () {
        wi = (wi + 1) % words.length;
        wordEl.textContent = words[wi];
        wordEl.classList.remove("out"); wordEl.classList.add("in");
        void wordEl.offsetWidth; wordEl.classList.remove("in");
      }, 380);
    }, 2400);
  }

  // floating cover cards behind the showreel
  var featured = projects.filter(function (p) { return p.featured; });
  [["#fc1", featured[2] || projects[2]], ["#fc2", featured[1] || projects[1]]].forEach(function (x) {
    var el = $(x[0]), p = x[1]; if (el && p) el.innerHTML = '<img src="' + esc(p.thumbnail) + '" alt="" decoding="async" fetchpriority="low">';
  });

  // showreel in the phone frame
  var SR = D.showreel || {}, srBox = $("#showreel");
  if (srBox && SR.src) {
    srBox.innerHTML =
      '<video muted loop playsinline preload="none" controlslist="nodownload" disablepictureinpicture disableremoteplayback' + (SR.poster ? ' poster="' + esc(SR.poster) + '"' : "") + ' src="' + esc(SR.src) + '" aria-hidden="true"></video>' +
      '<span class="phone-notch" aria-hidden="true"></span>' +
      '<p class="sr-label"><span class="rec" aria-hidden="true"></span>' + esc(SR.label || "Showreel") + '<span class="sr-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></p>' +
      '<div class="sr-controls"><button type="button" class="sr-sound" id="sr-sound" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path class="w" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/><path class="x" d="M17 9l5 6M22 9l-5 6"/></svg><span>Sound on</span></button>' +
      '<button type="button" class="sr-toggle" id="sr-toggle" aria-label="Pause showreel"><span aria-hidden="true"></span></button></div>';
    var srv = $("video", srBox), srBtn = $("#sr-toggle"), srSound = $("#sr-sound"), userPaused = reduce, pageReady = document.readyState === "complete", srVisible = false;
    var srState = function () { var playing = !srv.paused; srBox.classList.toggle("is-paused", !playing); srBtn.setAttribute("aria-label", playing ? "Pause showreel" : "Play showreel"); };
    var srPlay = function () { var pr = srv.play(); if (pr && pr.catch) pr.catch(srState); };
    srv.addEventListener("play", srState); srv.addEventListener("pause", srState);
    srSound.addEventListener("click", function () {
      var on = srv.muted; srv.muted = !on;
      if (on) { srv.currentTime = 0; userPaused = false; srPlay(); }
      srSound.setAttribute("aria-pressed", String(on)); srBox.classList.toggle("has-sound", on);
      $("span", srSound).textContent = on ? "Sound off" : "Sound on";
    });
    srBtn.addEventListener("click", function () { if (srv.paused) { userPaused = false; srPlay(); } else { userPaused = true; srv.pause(); } });
    var srMaybe = function () { if (pageReady && srVisible && !userPaused) srPlay(); };
    if (!pageReady) window.addEventListener("load", function () { pageReady = true; srMaybe(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { srVisible = en[0].isIntersecting; if (srVisible) srMaybe(); else srv.pause(); }, { threshold: 0.25 }).observe(srBox);
    srState();
    // running timecode while the reel plays
    var tcEl = $("#stage-tc");
    setInterval(function () {
      if (srv.paused) return;
      var t = srv.currentTime || 0, s = Math.floor(t);
      tcEl.textContent = "00:00:" + pad(s % 60) + ":" + pad(Math.floor((t - s) * 24));
    }, 84);
  }

  // mouse parallax on the hero stage + cinematic exit on scroll
  var stage = $("#hero-stage"), heroCopy = $("#hero-copy"), hero = $("#hero");
  var mx = 0, my = 0;
  if (fine && !reduce) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5;
      heroFx();
    }, { passive: true });
  }
  function heroFx() {
    if (reduce) return;
    var y = Math.min(window.scrollY, vh()), k = y / vh();
    if (y > vh() * 1.2) return;
    heroCopy.style.transform = "translate3d(0," + (-y * 0.18).toFixed(1) + "px,0)";
    heroCopy.style.opacity = String(Math.max(0.15, 1 - k * 0.9).toFixed(3));
    $("#showreel").style.transform = "translate3d(" + (mx * -10).toFixed(1) + "px," + (y * 0.06 + my * -10).toFixed(1) + "px,0) scale(" + (1 - k * 0.06).toFixed(3) + ")";
    $("#fc1").style.transform = "translate3d(" + (mx * 26).toFixed(1) + "px," + (-y * 0.12 + my * 20).toFixed(1) + "px,0) rotate(-9deg)";
    $("#fc2").style.transform = "translate3d(" + (mx * 34).toFixed(1) + "px," + (-y * 0.22 + my * 26).toFixed(1) + "px,0) rotate(8deg)";
  }
  scrollFns.push(heroFx);

  /* ================= SERVICES RIBBONS (speed follows your scroll) ================= */
  var services = D.services || [];
  var ribbonHTML = function (list) { var one = list.map(function (s) { return '<span class="rib-item">' + esc(s) + '</span><i class="rib-star" aria-hidden="true">✦</i>'; }).join(""); return '<div class="rib-group">' + one + '</div><div class="rib-group" aria-hidden="true">' + one + "</div>"; };
  var rib1 = $("#rib1"), rib2 = $("#rib2");
  rib1.innerHTML = ribbonHTML(services);
  rib2.innerHTML = ribbonHTML(services.slice().reverse());
  if (!reduce) {
    var off1 = 0, off2 = 0, lastY = window.scrollY, boost = 0, lastT = performance.now(), ribOn = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { ribOn = en[0].isIntersecting; if (ribOn) requestAnimationFrame(ribLoop); }, {}).observe($(".ribbons"));
    var ribLoop = function (t) {
      if (!ribOn) return;
      var dt = Math.min(64, t - lastT); lastT = t;
      var dy = window.scrollY - lastY; lastY = window.scrollY;
      boost += (Math.abs(dy) * 0.6 - boost) * 0.08;
      var sp = (0.045 + Math.min(boost, 40) * 0.012) * dt;
      var w1 = rib1.firstChild.offsetWidth || 1, w2 = rib2.firstChild.offsetWidth || 1;
      off1 = (off1 + sp) % w1; off2 = (off2 + sp * 0.8) % w2;
      rib1.style.transform = "translate3d(" + (-off1).toFixed(1) + "px,0,0)";
      rib2.style.transform = "translate3d(" + (off2 - w2).toFixed(1) + "px,0,0)";
      requestAnimationFrame(ribLoop);
    };
    requestAnimationFrame(ribLoop);
  }

  /* ================= MEDIA HELPERS ================= */
  function cover(p, eager) {
    return '<img src="' + esc(p.thumbnail) + '" alt="" decoding="async" ' + (eager ? 'fetchpriority="high"' : 'loading="lazy"') + ">";
  }
  function previewVideo(host, src) {
    var v = host._pv;
    if (!v) {
      v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto"; v.disablePictureInPicture = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("controlslist", "nodownload");
      v.className = "pv"; v.src = src; host.appendChild(v); host._pv = v;
      v.addEventListener("playing", function () { v.classList.add("on"); });
    }
    var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    return v;
  }
  function stopPreview(host) { if (host && host._pv) { host._pv.pause(); host._pv.classList.remove("on"); } }

  /* ================= HOOK WALL ================= */
  (function () {
    var hw = $("#hooks"), track = $("#hw-track"), vp = $("#hw-viewport");
    var list = (D.hookWall || []).map(function (h) { var p = byId(h.id); return p ? { h: h, p: p } : null; }).filter(Boolean);
    if (!hw || !list.length) return;
    hw.hidden = false;
    $("#hw-total").textContent = pad(list.length);
    track.innerHTML = list.map(function (o, i) {
      var p = o.p, h = o.h;
      return '<li class="hw-item' + (i === 0 ? " is-active" : "") + '"><button type="button" class="hw-card" data-open-project="' + esc(p.id) + '" aria-label="Watch ' + esc(p.shortTitle || p.title) + '">' +
        '<span class="hw-cover">' + cover(p, i < 2) + "</span>" +
        '<span class="hw-copy"><span class="hw-no">' + pad(i + 1) + "<i>Hook</i></span>" +
        '<span class="hw-hook">“' + esc(h.hook) + "”</span>" + (h.sub ? '<span class="hw-sub">' + esc(h.sub) + "</span>" : "") +
        '<span class="hw-meta">' + esc(p.shortTitle || p.title) + " · " + esc(p.duration || "") + "</span>" +
        '<span class="hw-watch">Watch the ad <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span></span></button></li>';
    }).join("");
    var items = $$(".hw-item", track), n = $("#hw-n"), bar = $("#hw-bar"), tc = $("#hw-tc"), bg = $(".hw-bg", hw);
    var pin = false, dist = 0, len = 0, start = 0, active = -1, inView = false, rt;
    var coarse = mm("(pointer: coarse)") || mm("(hover: none)");
    var swipe = function () { return reduce || coarse || !fine || window.innerWidth <= 900; };
    var dots = $("#hw-dots");
    dots.innerHTML = list.map(function () { return "<i></i>"; }).join("");
    var dotEls = $$("i", dots);
    function setActive(i) {
      if (i === active) return;
      if (active > -1) stopPreview($(".hw-cover", items[active]));
      items.forEach(function (it, k) { it.classList.toggle("is-active", k === i); });
      active = i; n.textContent = pad(i + 1);
      dotEls.forEach(function (d, k) { d.classList.toggle("on", k === i); });
      $("#hw-prev").disabled = i === 0; $("#hw-next").disabled = i === items.length - 1;
      if (fine && !reduce && inView && list[i].p.preview) previewVideo($(".hw-cover", items[i]), list[i].p.preview);
    }
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) {
      inView = en[0].isIntersecting;
      var host = active > -1 && $(".hw-cover", items[active]);
      if (inView && fine && !reduce && host && list[active].p.preview) previewVideo(host, list[active].p.preview); else if (host) stopPreview(host);
    }, { threshold: 0.25 }).observe(hw);
    function stickTop() { return $(".nav").offsetHeight; }
    function progressTo(p) {
      bar.style.transform = "scaleX(" + Math.max(0.02, p).toFixed(3) + ")";
      var f = Math.round((1 - p) * 72);
      tc.textContent = "00:00:" + pad(Math.floor(f / 24)) + ":" + pad(f % 24);
      hw.classList.toggle("is-zero", f === 0);
    }
    function layout() {
      pin = !swipe();
      hw.classList.toggle("is-pin", pin); hw.classList.toggle("is-swipe", !pin);
      track.style.transform = ""; if (bg) bg.style.transform = "";
      if (!pin) { hw.style.height = ""; onSwipe(); return; }
      var top = stickTop();
      hw.style.setProperty("--hw-top", top + "px");
      dist = Math.max(0, track.scrollWidth - vp.clientWidth);
      len = dist * 0.62;
      hw.style.height = (vh() - top + len) + "px";
      start = hw.getBoundingClientRect().top + window.scrollY - top;
      fx();
    }
    function fx() {
      if (!pin) return;
      var p = len ? Math.min(1, Math.max(0, (window.scrollY - start) / len)) : 0, x = -p * dist;
      track.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
      if (bg) bg.style.transform = "translate3d(" + (x * 0.35).toFixed(1) + "px,0,0)";
      progressTo(p);
      var mid = window.innerWidth * 0.42, best = 0, bd = 1e9;
      items.forEach(function (it, k) { var r = it.getBoundingClientRect(), c = r.left + Math.min(r.width, 420) / 2, d = Math.abs(c - mid); if (d < bd) { bd = d; best = k; } });
      setActive(best);
    }
    function onSwipe() {
      var max = vp.scrollWidth - vp.clientWidth, p = max > 0 ? vp.scrollLeft / max : 0;
      progressTo(p);
      // the card whose left edge is closest to where cards snap
      var edge = vp.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft || 0), best = 0, bd = 1e9;
      items.forEach(function (it, k) { var d = Math.abs(it.getBoundingClientRect().left - edge); if (d < bd) { bd = d; best = k; } });
      if (p > 0.995) best = items.length - 1;
      setActive(best);
    }
    function goTo(i) {
      i = Math.max(0, Math.min(items.length - 1, i));
      if (!pin) {
        var edge = parseFloat(getComputedStyle(track).paddingLeft || 0);
        vp.scrollTo({ left: items[i].offsetLeft - edge, behavior: reduce ? "auto" : "smooth" });
      } else {
        var target = Math.min(dist, Math.max(0, items[i].offsetLeft - parseFloat(getComputedStyle(track).paddingLeft || 0)));
        window.scrollTo({ top: start + (dist ? target / dist : 0) * len + 2, behavior: reduce ? "auto" : "smooth" });
      }
    }
    $("#hw-prev").addEventListener("click", function () { goTo(active - 1); });
    $("#hw-next").addEventListener("click", function () { goTo(active + 1); });
    // drag with a mouse when the strip is in swipe mode (touch screens swipe natively)
    var drag = null, moved = false;
    vp.addEventListener("pointerdown", function (e) {
      if (pin || e.pointerType !== "mouse") return;
      drag = { x: e.clientX, left: vp.scrollLeft }; moved = false; vp.classList.add("dragging");
    });
    window.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x; if (Math.abs(dx) > 4) moved = true;
      vp.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", function () { if (drag) { drag = null; vp.classList.remove("dragging"); } });
    vp.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    scrollFns.push(fx);
    vp.addEventListener("scroll", function () { if (!pin) requestAnimationFrame(onSwipe); }, { passive: true });
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(layout, 150); });
    window.addEventListener("load", layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    $$("img", track).forEach(function (im) { if (!im.complete) im.addEventListener("load", function () { clearTimeout(rt); rt = setTimeout(layout, 80); }); });
    layout();
  })();

  /* ================= INSIDE ONE AD (beat-by-beat breakdown) ================= */
  (function () {
    var A = D.anatomy, list = $("#an-beats");
    if (!A || !list) return;
    var proj = byId(A.project), beats = A.beats || [];
    var toSec = function (t) { var m = String(t).split(":"); return (+m[0]) * 60 + (+m[1] || 0); };
    var total = proj && proj.duration ? toSec(proj.duration) : 60;
    $("#an-sub").textContent = "Here's how my " + (proj ? proj.duration + " " : "") + "ad for NineOne Car Rental moves a viewer from “wait, what?” to “book now”, one beat at a time.";
    $("#an-len").textContent = proj ? proj.duration : "";
    $("#an-frames").innerHTML = beats.map(function (b, i) { return '<img src="' + esc(b.img) + '" alt="" loading="lazy" decoding="async" class="' + (i === 0 ? "on" : "") + '">'; }).join("");
    list.innerHTML = beats.map(function (b, i) {
      return '<li class="beat' + (i === 0 ? " on" : "") + '" data-i="' + i + '">' +
        '<span class="beat-thumb" aria-hidden="true"><img src="' + esc(b.img) + '" alt="" loading="lazy" decoding="async"></span>' +
        '<div class="beat-copy"><p class="beat-t"><span>' + esc(b.t) + '</span><em>' + esc(b.why) + '</em></p><h3>' + esc(b.name) + "</h3><p>" + esc(b.text) + "</p></div></li>";
    }).join("");
    var frames = $$("#an-frames img"), items = $$(".beat", list), cur = -1;
    function show(i) {
      if (i === cur) return; cur = i;
      frames.forEach(function (f, k) { f.classList.toggle("on", k === i); });
      items.forEach(function (it, k) { it.classList.toggle("on", k === i); it.classList.toggle("past", k < i); });
      $("#an-tc").textContent = beats[i].t;
      $("#an-why").textContent = beats[i].why;
      $("#an-bar").style.transform = "scaleX(" + Math.max(0.02, toSec(beats[i].t) / total).toFixed(3) + ")";
    }
    show(0);
    scrollFns.push(function () {
      var line = vh() * 0.5, act = 0;
      items.forEach(function (it, k) { if (it.getBoundingClientRect().top < line) act = k; });
      show(act);
    });
    list.addEventListener("click", function (e) {
      var it = e.target.closest(".beat"); if (!it) return;
      it.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    });
    $("#an-watch").addEventListener("click", function (e) { if (proj) openProject(proj.id, e.currentTarget); });
  })();

  /* ================= WORK ================= */
  var cats = [];
  projects.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });
  var activeCat = "All", showAll = false;
  var grid = $("#grid"), filters = $("#filters"), pill = $(".filter-pill");
  function renderFilters() {
    filters.innerHTML = ["All"].concat(cats).map(function (c) {
      var n = c === "All" ? projects.length : projects.filter(function (p) { return p.category === c; }).length;
      return '<button type="button" class="chip" aria-pressed="' + (c === activeCat) + '" data-cat="' + esc(c) + '">' + esc(c) + "<span>" + n + "</span></button>";
    }).join("");
    placePill();
  }
  function placePill() {
    var on = $('.chip[aria-pressed="true"]', filters);
    if (!on || window.innerWidth <= 600) { pill.classList.remove("on"); return; }
    pill.style.width = on.offsetWidth + "px"; pill.style.height = on.offsetHeight + "px";
    pill.style.transform = "translate(" + on.offsetLeft + "px," + on.offsetTop + "px)";
    pill.classList.add("on");
  }
  function limit() {
    var cols = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length || 2;
    var n = cols * (cols <= 2 ? 4 : 2);
    return n % 2 ? n + 1 : n;
  }
  function cardHTML(p, n, total) {
    var wide = isWide(p);
    return '<article class="card' + (wide ? " wide" : "") + '">' +
      '<button type="button" class="frame" data-id="' + esc(p.id) + '"' + (p.preview ? ' data-preview="' + esc(p.preview) + '"' : "") + ' style="--ar:' + (p.aspect || "9:16").replace(":", "/") + '" aria-label="Watch ' + esc(p.title) + '">' +
        '<span class="frame-media">' + (wide ? '<img class="wbg" src="' + esc(p.thumbnail) + '" alt="" loading="lazy" decoding="async">' : "") + cover(p, n < 4) + '<span class="glare" aria-hidden="true"></span><span class="play" aria-hidden="true"></span></span></button>' +
      '<div class="card-body"><p class="card-meta"><span class="card-no">' + pad(n + 1) + "<i>/" + pad(total) + "</i></span><span>" + esc(p.category) + "</span></p>" +
        "<h3>" + esc(p.shortTitle || p.title) + "</h3>" + (p.cardHook ? '<p class="card-hook">“' + esc(p.cardHook) + "”</p>" : "") + "</div></article>";
  }
  function renderGrid() {
    var list = projects.filter(function (p) { return activeCat === "All" || p.category === activeCat; });
    var lim = showAll ? list.length : limit();
    if (list.length - lim <= 1) lim = list.length;
    grid.innerHTML = list.slice(0, lim).map(function (p, i) { return cardHTML(p, i, list.length); }).join("");
    var more = $("#grid-more"), btn = $("#grid-more-btn");
    more.hidden = limit() >= list.length - 1;
    btn.innerHTML = showAll ? "<span>Show less</span>" : "<span>Show all " + list.length + " videos</span>";
    btn.classList.toggle("is-less", showAll);
    bindPreviews(grid);
    var cnt = $("#work-count");
    if (cnt) cnt.textContent = "Chapter 03 · The proof · " + list.length + (list.length === 1 ? " ad" : " ads") + (activeCat === "All" ? "" : " · " + activeCat);
  }
  filters.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    activeCat = b.getAttribute("data-cat"); showAll = false;
    renderFilters(); renderGrid();
    var nb = $('.chip[data-cat="' + CSS.escape(activeCat) + '"]'); if (nb) nb.focus();
  });
  $("#grid-more-btn").addEventListener("click", function () {
    var before = grid.children.length; showAll = !showAll; renderGrid();
    if (showAll) { var f = grid.children[before] && $(".frame", grid.children[before]); if (f) f.focus({ preventScroll: true }); }
    else $("#grid-more-btn").scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  });
  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(placePill, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placePill);

  // previews: hover on desktop, the card in the middle of the screen on phones
  var centreIO = false && (!reduce && !fine && !saveData && "IntersectionObserver" in window) ? new IntersectionObserver(function (en) {
    en.forEach(function (e) { var host = $(".frame-media", e.target); if (e.isIntersecting) previewVideo(host, e.target.getAttribute("data-preview")); else stopPreview(host); });
  }, { rootMargin: "-42% 0px -42% 0px" }) : null;
  function bindPreviews(root) {
    if (reduce) return;
    $$(".frame[data-preview]", root).forEach(function (f) {
      var host = $(".frame-media", f);
      if (fine) {
        f.addEventListener("mouseenter", function () { previewVideo(host, f.getAttribute("data-preview")); });
        f.addEventListener("mouseleave", function () { stopPreview(host); });
      } else if (centreIO) centreIO.observe(f);
    });
  }
  renderFilters(); renderGrid();

  // 3D tilt + glare (mouse)
  if (fine && !reduce) {
    var tf = null, traf = 0, tev = null;
    document.addEventListener("pointermove", function (e) {
      var f = e.target.closest && e.target.closest(".grid .frame, .skill-thumb");
      if (f !== tf) { if (tf) { tf.classList.remove("tilting"); tf.style.removeProperty("--rx"); tf.style.removeProperty("--ry"); } tf = f; if (f) f.classList.add("tilting"); }
      if (!tf) return; tev = e;
      if (!traf) traf = requestAnimationFrame(function () {
        traf = 0; if (!tf || !tev) return;
        var r = tf.getBoundingClientRect(), x = (tev.clientX - r.left) / r.width, y = (tev.clientY - r.top) / r.height;
        tf.style.setProperty("--ry", ((x - .5) * 12).toFixed(2) + "deg"); tf.style.setProperty("--rx", ((.5 - y) * 9).toFixed(2) + "deg");
        tf.style.setProperty("--gx", (x * 100).toFixed(1) + "%"); tf.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
      });
    }, { passive: true });
  }

  /* ================= PROJECT DIALOG ================= */
  var modal = $("#modal"), lastFocus = null;
  var labels = { audience: "Audience", objective: "Objective", concept: "Creative concept", hook: "Hook", production: "Production", tools: "AI tools used", editing: "Editing, captions & sound", deliverables: "Deliverables" };
  function openProject(id, trigger) {
    var p = byId(id); if (!p) return;
    lastFocus = trigger || document.activeElement;
    $("#modal-cat").textContent = p.category || "";
    $("#modal-title").textContent = p.title;
    $("#modal-summary").textContent = p.summary || "";
    var media = $("#modal-media");
    media.className = "modal-media" + (isWide(p) ? " wide" : "");
    media.innerHTML = '<div class="player" style="--ar:' + (p.aspect || "9:16").replace(":", "/") + '"><video controls autoplay playsinline preload="auto" poster="' + esc(p.thumbnail) + '" controlslist="nodownload noplaybackrate noremoteplayback" disablepictureinpicture disableremoteplayback src="' + esc(p.video && p.video.src) + '"></video></div>';
    $("#modal-details").innerHTML = Object.keys(labels).map(function (k) {
      var v = p[k]; if (!has(v)) return "";
      return "<div><dt>" + labels[k] + "</dt><dd>" + (Array.isArray(v) ? '<span class="tags">' + v.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</span>" : esc(v)) + "</dd></div>";
    }).join("");
    if (modal.showModal) modal.showModal(); else modal.setAttribute("open", "");
    document.documentElement.classList.add("modal-open");
    $("#modal-close").focus();
  }
  function closeProject() { $("#modal-media").innerHTML = ""; if (modal.open) { if (modal.close) modal.close(); else modal.removeAttribute("open"); } }
  modal.addEventListener("close", function () { $("#modal-media").innerHTML = ""; document.documentElement.classList.remove("modal-open"); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); });
  $("#modal-close").addEventListener("click", closeProject);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeProject(); });
  document.addEventListener("click", function (e) {
    var f = e.target.closest && e.target.closest(".frame[data-id], [data-open-project]");
    if (f) { e.preventDefault(); openProject(f.getAttribute("data-id") || f.getAttribute("data-open-project"), f); }
  });
  // no right-click / long-press "Save video"
  document.addEventListener("contextmenu", function (e) { if (e.target.closest && e.target.closest("video, .frame, .phone, .player, .hw-cover, .skill-thumb")) e.preventDefault(); });

  /* ================= SKILLS ================= */
  var deck = $("#skill-deck"), skills = D.skills || [];
  deck.innerHTML = skills.map(function (s, i) {
    var ps = (s.projects || []).map(byId).filter(Boolean), bgP = ps[0];
    return '<article class="skill' + (i === 0 ? " open" : "") + '" style="--i:' + i + '">' +
      '<button type="button" class="skill-head" aria-expanded="' + (i === 0) + '" aria-controls="skill-' + i + '">' +
        '<span class="skill-n">' + pad(i + 1) + '</span><span class="skill-name">' + esc(s.name) + '</span><span class="skill-tag">' + esc(s.tag || "") + '</span><span class="skill-plus" aria-hidden="true"></span></button>' +
      '<div class="skill-body" id="skill-' + i + '">' +
        (bgP ? '<span class="skill-bg" aria-hidden="true">' + cover(bgP) + "</span>" : '<span class="skill-bg glyph" aria-hidden="true">' + esc((s.name || "").split(" ")[0]) + "</span>") +
        '<div class="skill-inner"><p class="skill-text">' + esc(s.text) + "</p>" +
          (ps.length ? '<div class="skill-thumbs">' + ps.map(function (p) { return '<button type="button" class="skill-thumb" data-open-project="' + esc(p.id) + '" aria-label="Watch ' + esc(p.shortTitle || p.title) + '">' + cover(p) + "<span>" + esc(p.shortTitle || p.title) + "</span></button>"; }).join("") + "</div>" : "") +
          (s.cta ? '<a class="btn btn-line" href="' + esc(s.cta) + '"><span>Try the storyboard builder</span></a>' : "") +
        "</div></div></article>";
  }).join("");
  function openSkill(el) {
    $$(".skill", deck).forEach(function (s) { var on = s === el; s.classList.toggle("open", on); $(".skill-head", s).setAttribute("aria-expanded", String(on)); });
  }
  deck.addEventListener("click", function (e) {
    var h = e.target.closest(".skill-head"); if (!h) return;
    var el = h.parentNode;
    // tapping or clicking an open panel closes it (desktop and mobile)
    if (el.classList.contains("open")) { openSkill(null); return; }
    openSkill(el);
  });

  $("#tool-cloud").innerHTML = (D.tools || []).map(function (t, i) { return '<li style="--d:' + (i % 5) + '"><b>' + esc(t.name) + "</b><span>" + esc(t.use || "") + "</span></li>"; }).join("");

  /* ================= PROCESS ================= */
  var steps = $("#process-steps");
  steps.innerHTML = (D.clientProcess || D.workflow || []).map(function (w, i) { return '<li class="step" data-n="' + pad(i + 1) + '"><span class="step-n">' + pad(i + 1) + "</span><h3>" + esc(w.step) + "</h3><p>" + esc(w.text) + "</p></li>"; }).join("");
  var stepEls = $$(".step", steps), pNum = $("#process-num"), pLine = $("#process-line");
  scrollFns.push(function () {
    var r = steps.getBoundingClientRect(), mid = vh() * 0.55, cur = 0;
    stepEls.forEach(function (s, i) { var b = s.getBoundingClientRect(); var on = b.top < mid; s.classList.toggle("lit", on); if (on) cur = i; });
    pNum.textContent = pad(cur + 1);
    var p = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
    pLine.style.transform = "scaleY(" + p.toFixed(3) + ")";
  });

  /* ================= ABOUT ================= */
  if (D.photo && D.photo.src) { var ai = $("#about-img"); ai.src = D.photo.src; ai.alt = D.photo.alt || ""; }
  $("#fact-loc").textContent = P.location || ""; $("#fact-avail").textContent = P.availability || "";
  var story = $("#about-story");
  story.innerHTML = (D.aboutStory || D.about || []).map(function (t) {
    return "<p>" + esc(t).split(" ").map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ") + "</p>";
  }).join("");
  var wordsEls = $$(".w", story), lit = -1;
  function aboutFx() {
    if (reduce) return;
    var r = story.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, (vh() * 0.85 - r.top) / (r.height + vh() * 0.35)));
    var upto = Math.min(wordsEls.length - 1, Math.floor(p * wordsEls.length * 1.08) - 1);
    if (upto === lit) return;
    for (var i = Math.min(upto, lit) + 1; i <= Math.max(upto, lit); i++) if (wordsEls[i]) wordsEls[i].classList.toggle("lit", i <= upto);
    lit = upto;
  }
  if (reduce) wordsEls.forEach(function (w) { w.classList.add("lit"); });
  scrollFns.push(aboutFx);

  /* ================= EXPERIENCE ================= */
  var career = (D.career || []).slice();
  $("#timeline").innerHTML = career.map(function (r) {
    var creative = r.kind === "Creative";
    var body = (has(r.points) ? "<ul>" + r.points.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
      (has(r.skills) ? '<p class="tl-skills">' + r.skills.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + "</p>" : "");
    var head = '<span class="tl-date">' + esc(r.dates) + '</span><span class="tl-title">' + esc(r.title) + '</span><span class="tl-org">' + esc(r.org) + (r.kind === "Education" ? " · Education" : "") + "</span>";
    return '<li class="tl-item' + (creative ? " creative" : "") + '"><span class="tl-dot" aria-hidden="true"></span>' +
      (body ? "<details" + (creative ? " open" : "") + "><summary>" + head + '<span class="tl-more" aria-hidden="true"></span></summary><div class="tl-body">' + body + "</div></details>" : '<div class="tl-static">' + head + "</div>") + "</li>";
  }).join("");
  $("#certs").innerHTML = (D.certifications || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
  var tl = $("#tl"), tlFill = $("#tl-fill"), tlItems = $$(".tl-item", tl);
  scrollFns.push(function () {
    var r = tl.getBoundingClientRect(), line = vh() * 0.6;
    var p = Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height)));
    tlFill.style.transform = "scaleY(" + (reduce ? 1 : p).toFixed(3) + ")";
    tlItems.forEach(function (li) { li.classList.toggle("lit", reduce || $(".tl-dot", li).getBoundingClientRect().top < line); });
  });
  if (window.ResizeObserver) new ResizeObserver(onScroll).observe(tl);

  /* ================= CONTACT ================= */
  var C = D.contact || {};
  $("#email-btn").href = "mailto:" + C.email;
  $("#email-text").textContent = C.email || "";
  $("#phone-text").textContent = C.phone || "";
  (C.messaging || []).forEach(function (m) { if (/whatsapp/i.test(m.label)) $("#wa-btn").href = m.url; if (/telegram/i.test(m.label)) $("#tg-btn").href = m.url; });
  if (C.links && C.links[0]) $("#drive-link").href = C.links[0].url;
  $$(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var what = b.getAttribute("data-copy"), text = what === "email" ? C.email : C.phone, st = $("#copy-status");
      var done = function () { b.textContent = "Copied"; st.textContent = (what === "email" ? "Email" : "Number") + " copied."; setTimeout(function () { b.textContent = "Copy"; }, 1600); };
      try { navigator.clipboard.writeText(text).then(done, function () { st.textContent = text; }); } catch (e) { st.textContent = text; }
    });
  });

  /* ================= GIANT NAME (videos inside the letters) ================= */
  var mega = $("#mega"), megaText = mega && $(".mega-text", mega);
  if (mega) {
    var layer = document.createElement("span"); layer.className = "mega-img"; mega.insertBefore(layer, megaText);
    var fit = function () {
      megaText.style.fontSize = "";
      var w = mega.clientWidth, cur = parseFloat(getComputedStyle(megaText).fontSize), tw = 0;
      var rg = document.createRange(); rg.selectNodeContents(megaText);
      var lines = {};   // add up the pieces of text that sit on the same line
      Array.prototype.forEach.call(rg.getClientRects(), function (r) { var k = Math.round(r.top / 8); lines[k] = (lines[k] || 0) + r.width; });
      Object.keys(lines).forEach(function (k) { tw = Math.max(tw, lines[k]); });
      if (!tw) tw = megaText.scrollWidth;
      if (w && tw) megaText.style.fontSize = Math.floor(cur * (w / tw) * 0.96) + "px";
      mega.style.setProperty("--tile", Math.round(4242 * (mega.clientHeight / 360)) + "px");
    };
    fit(); window.addEventListener("load", fit); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", function () { clearTimeout(fit._t); fit._t = setTimeout(fit, 150); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) mega.classList.add("loaded", "running"); else mega.classList.remove("running"); }); }, { rootMargin: "300px 0px" }).observe(mega);
    else mega.classList.add("loaded", "running");
  }

  /* ================= REVEALS + DECODING LABELS ================= */
  if (!reduce && "IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    $$(".display, .contact-title, .sec-sub, .skill, .tool-cloud li, .portrait, .contact-row .btn").forEach(function (el) { el.classList.add("rv"); rio.observe(el); });
    var glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>";
    var scramble = function (el) {
      var fin = el.textContent, len = fin.length, t0 = performance.now(), dur = Math.min(900, 280 + len * 18);
      (function fr(now) {
        var k = Math.min(1, (now - t0) / dur), done = Math.floor(k * len), out = "";
        for (var i = 0; i < len; i++) { var ch = fin[i]; out += i < done || ch === " " || ch === "·" ? ch : glyphs[(Math.random() * glyphs.length) | 0]; }
        el.textContent = k < 1 ? out : fin; if (k < 1) requestAnimationFrame(fr);
      })(t0);
    };
    var sio = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { sio.unobserve(e.target); scramble(e.target); } }); });
    $$("[data-scramble]").forEach(function (el) { if (el.id !== "work-count") sio.observe(el); });
  }

  /* ================= CURSOR + MAGNETIC BUTTONS (mouse) ================= */
  if (fine && !reduce) {
    var cur = document.createElement("div"); cur.className = "cursor"; cur.setAttribute("aria-hidden", "true");
    cur.innerHTML = '<span class="cursor-ring"></span><span class="cursor-label">Play</span>';
    document.body.appendChild(cur);
    var tx = -99, ty = -99, cx = -99, cy = -99, run = false;
    var loop = function () { cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22; cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)"; if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5) requestAnimationFrame(loop); else run = false; };
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      tx = e.clientX; ty = e.clientY; cur.classList.add("on");
      var t = e.target, play = t.closest && t.closest(".frame[data-id], [data-open-project]"), link = !play && t.closest && t.closest("a, button, input, select, textarea, label, summary");
      cur.classList.toggle("is-play", !!play); cur.classList.toggle("is-link", !!link);
      if (!run) { run = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.addEventListener("pointerleave", function () { cur.classList.remove("on"); });
    document.documentElement.classList.add("has-cursor");
    $$(".magnetic").forEach(function (b) {
      b.addEventListener("pointermove", function (e) { var r = b.getBoundingClientRect(); b.style.transform = "translate(" + (((e.clientX - r.left) / r.width - .5) * 14).toFixed(1) + "px," + (((e.clientY - r.top) / r.height - .5) * 10).toFixed(1) + "px)"; });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ================= SOUNDTRACK (opt-in, never autoplays) ================= */
  (function () {
    var M = D.music || {}, btn = $("#music-btn");
    if (!btn || !M.src) return;
    var audio = new Audio(); audio.preload = "none"; audio.loop = true; audio.src = M.src;
    var target = typeof M.volume === "number" ? M.volume : 0.35, fadeT = null, wanted = false, ducked = false;
    btn.hidden = false;
    $(".music-title", btn).textContent = M.title || "Play the soundtrack";
    function fade(to, done) {
      clearInterval(fadeT);
      fadeT = setInterval(function () {
        var v = audio.volume + (to > audio.volume ? 0.03 : -0.04);
        if ((to > audio.volume && v >= to) || (to <= audio.volume && v <= to)) { audio.volume = Math.max(0, Math.min(1, to)); clearInterval(fadeT); if (done) done(); }
        else audio.volume = Math.max(0, Math.min(1, v));
      }, 40);
    }
    function play() { audio.volume = 0; var pr = audio.play(); if (pr && pr.catch) pr.catch(function () { set(false); }); fade(target); }
    function pause() { fade(0, function () { audio.pause(); }); }
    function set(on) {
      wanted = on; btn.classList.toggle("on", on); btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "Pause the soundtrack" : "Play the soundtrack");
      try { localStorage.setItem("asj-music", on ? "1" : "0"); } catch (e) {}
      if (on && !ducked) play(); else pause();
    }
    btn.addEventListener("click", function () { set(!wanted); });
    audio.addEventListener("error", function () { btn.hidden = true; });
    // step aside whenever a video with sound is playing, then come back
    function duck(on) { ducked = on; if (!wanted) return; if (on) pause(); else play(); }
    document.addEventListener("play", function (e) { if (e.target.tagName === "VIDEO" && !e.target.muted) duck(true); }, true);
    document.addEventListener("pause", function (e) { if (e.target.tagName === "VIDEO" && !e.target.muted) duck(false); }, true);
    document.addEventListener("volumechange", function (e) { if (e.target.tagName === "VIDEO") duck(!e.target.muted && !e.target.paused); }, true);
    modal.addEventListener("close", function () { if (ducked) duck(false); });
    document.addEventListener("visibilitychange", function () { if (!wanted) return; if (document.hidden) audio.pause(); else if (!ducked) play(); });
  })();

  onScroll();
})();
