(function () {
  "use strict";

  // ==============================
  // Helper Functions
  // ==============================

  const select = (el, all = false) => {
    el = el.trim();
    return all
      ? Array.from(document.querySelectorAll(el))
      : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    if (!elements) return;

    if (all) {
      elements.forEach(e => e.addEventListener(type, listener));
    } else {
      elements.addEventListener(type, listener);
    }
  };

  const scrollto = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // Mobile Nav Toggle
  // ==============================

  window.addEventListener("DOMContentLoaded", () => {

    const navbar = select("#navbar");
    const toggle = select(".mobile-nav-toggle");

    if (toggle && navbar) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        navbar.classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
      });
    }

    // ==============================
    // Navigation Click
    // ==============================

    const navLinks = select("#navbar .nav-link", true);
    const sections = select("section", true);
    const header = select("#header");

    if (navLinks) {
      navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          const hash = this.getAttribute("href");

          if (!hash || !hash.startsWith("#")) return;

          const section = select(hash);
          if (!section) return;

          e.preventDefault();

          // Active link
          navLinks.forEach((item) => item.classList.remove("active"));
          this.classList.add("active");

          // Close mobile menu
          if (navbar.classList.contains("navbar-mobile")) {
            navbar.classList.remove("navbar-mobile");
            toggle.classList.add("bi-list");
            toggle.classList.remove("bi-x");
          }

          // Special case: Home
          if (hash === "#header") {
            header.classList.remove("header-top");
            sections.forEach((sec) => sec.classList.remove("section-show"));
            scrollto();
            return;
          }

          // Show section
          header.classList.add("header-top");

          sections.forEach((sec) => sec.classList.remove("section-show"));
          section.classList.add("section-show");

          scrollto();
        });
      });
    }
  });

  // ==============================
  // Load with Hash (#about etc.)
  // ==============================

  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    const header = document.querySelector("#header");
    const navLinks = document.querySelectorAll("#navbar .nav-link");

    header?.classList.add("header-top");

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    setTimeout(() => {
      document.querySelectorAll("section").forEach(sec => sec.classList.remove("section-show"));
      target.classList.add("section-show");
    }, 200);

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

})();