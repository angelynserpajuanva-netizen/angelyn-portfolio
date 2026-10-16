/* Cinematic extras:
   1. The menu highlights the section you're viewing.
   2. Fine film grain over the whole page.
   3. Letterbox bars that open like a film when the page loads. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Menu highlights the section you're viewing ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('#nav-links a[href^="#"]'));
  var targets = links.map(function (l) { return document.getElementById(l.getAttribute("href").slice(1)); });
  function markActive() {
    var look = window.scrollY + Math.max(140, window.innerHeight * 0.35), active = -1;
    targets.forEach(function (t, i) { if (t && !t.hidden && t.getBoundingClientRect().top + window.scrollY <= look) active = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = targets.length - 1;
    links.forEach(function (l, i) {
      l.classList.toggle("active", i === active);
      if (i === active) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
  }
  var busy = false;
  window.addEventListener("scroll", function () {
    if (!busy) { busy = true; requestAnimationFrame(function () { busy = false; markActive(); }); }
  }, { passive: true });
  window.addEventListener("resize", markActive);
  markActive();

  /* ---------- 2. Film grain ---------- */
  try {
    var n = document.createElement("canvas"); n.width = n.height = 140;
    var g = n.getContext("2d"), img = g.createImageData(140, 140), d = img.data;
    for (var i = 0; i < d.length; i += 4) { var v = Math.random() * 255; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    g.putImageData(img, 0, 0);
    var grain = document.createElement("div");
    grain.className = "film-grain" + (reduce ? " still" : "");
    grain.setAttribute("aria-hidden", "true");
    grain.style.backgroundImage = "url(" + n.toDataURL("image/png") + ")";
    document.body.appendChild(grain);
  } catch (e) { /* grain is decoration only */ }

  /* ---------- 3. Letterbox opening ---------- */
  if (!reduce) {
    var lb = document.createElement("div");
    lb.className = "letterbox"; lb.setAttribute("aria-hidden", "true");
    document.body.appendChild(lb);
    requestAnimationFrame(function () { requestAnimationFrame(function () { lb.classList.add("open"); }); });
    setTimeout(function () { if (lb.parentNode) lb.parentNode.removeChild(lb); }, 1500);
  }
})();
