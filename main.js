(function () {
  "use strict";

  const weddingDate = new Date("2026-10-03T16:30:00");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* Mobile navigation */
  const navToggle = qs("[data-nav-toggle]");
  const navPanel = qs("[data-nav-panel]");
  const navLinks = qsa("[data-nav-link]");

  function setNavOpen(open, opts) {
    if (!navToggle || !navPanel) return;
    opts = opts || {};
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navPanel.classList.toggle("hidden", !open);
    navPanel.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("overflow-hidden", open);
    if (open) {
      var first = navLinks[0];
      if (first) first.focus();
    } else if (opts.focusToggle) {
      navToggle.focus();
    }
  }

  if (navToggle && navPanel) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") !== "true";
      setNavOpen(open);
    });
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (navToggle && navPanel && navToggle.getAttribute("aria-expanded") === "true") {
      setNavOpen(false, { focusToggle: true });
    }
    var openFaq = qs("[data-faq-button][aria-expanded=\"true\"]");
    if (openFaq) {
      qsa("[data-faq-button]").forEach(function (b) {
        var it = b.closest("[data-faq-item]");
        var p = it && qs("[data-faq-panel]", it);
        b.setAttribute("aria-expanded", "false");
        if (p) p.classList.add("hidden");
      });
      openFaq.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!navPanel || !navToggle || navPanel.classList.contains("hidden")) return;
    var t = e.target;
    if (navPanel.contains(t) || navToggle.contains(t)) return;
    setNavOpen(false, { focusToggle: true });
  });

  /* Smooth scroll with fixed header offset */
  var header = qs("[data-site-header]");
  function headerOffset() {
    return header ? header.offsetHeight : 0;
  }

  qsa('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - headerOffset() - 12;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      var delay = prefersReducedMotion ? 0 : 380;
      window.setTimeout(function () {
        if (target.tabIndex < 0) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, delay);
      setNavOpen(false);
    });
  });

  /* Countdown */
  var cdDays = qs("[data-countdown-days]");
  var cdHours = qs("[data-countdown-hours]");
  var cdMinutes = qs("[data-countdown-minutes]");
  var cdSeconds = qs("[data-countdown-seconds]");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tickCountdown() {
    if (!cdDays) return;
    var now = new Date();
    var diff = weddingDate.getTime() - now.getTime();
    if (diff <= 0) {
      cdDays.textContent = "0";
      if (cdHours) cdHours.textContent = "00";
      if (cdMinutes) cdMinutes.textContent = "00";
      if (cdSeconds) cdSeconds.textContent = "00";
      return;
    }
    var s = Math.floor(diff / 1000) % 60;
    var m = Math.floor(diff / 60000) % 60;
    var h = Math.floor(diff / 3600000) % 24;
    var d = Math.floor(diff / 86400000);
    cdDays.textContent = String(d);
    if (cdHours) cdHours.textContent = pad(h);
    if (cdMinutes) cdMinutes.textContent = pad(m);
    if (cdSeconds) cdSeconds.textContent = pad(s);
  }

  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* FAQ accordion — one open at a time; toggle current closed on second click */
  qsa("[data-faq-button]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest("[data-faq-item]");
      var panel = item && qs("[data-faq-panel]", item);
      var expanded = btn.getAttribute("aria-expanded") === "true";
      qsa("[data-faq-button]").forEach(function (b) {
        var it = b.closest("[data-faq-item]");
        var p = it && qs("[data-faq-panel]", it);
        b.setAttribute("aria-expanded", "false");
        if (p) p.classList.add("hidden");
      });
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        if (panel) panel.classList.remove("hidden");
      }
    });
  });

  /* RSVP demo submit */
  var rsvpForm = qs("[data-rsvp-form]");
  var rsvpSuccess = qs("[data-rsvp-success]");
  if (rsvpForm && rsvpSuccess) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();
      rsvpForm.classList.add("hidden");
      rsvpSuccess.classList.remove("hidden");
      rsvpSuccess.focus();
    });
  }

  /* Subtle reveal on scroll */
  if (prefersReducedMotion) {
    qsa("[data-reveal]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    qsa("[data-reveal]").forEach(function (el) {
      io.observe(el);
    });
  } else {
    qsa("[data-reveal]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
