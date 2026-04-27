/**
 * Personal Portfolio - Main JavaScript
 * Clean, minimal, and mobile-ready
 */

(function () {
  "use strict";

  // ==============================
  // Helpers
  // ==============================

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selected = select(el, all);
    if (!selected) return;

    if (all) {
      selected.forEach((e) => e.addEventListener(type, listener));
    } else {
      selected.addEventListener(type, listener);
    }
  };

  const scrollTo = (el) => {
    const element = typeof el === "string" ? select(el) : el;
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // ==============================
  // Mobile Navigation
  // ==============================

  const mobileToggle = select(".mobile-nav-toggle");
  const navbar = select("#navbar ul");
  const body = document.body;

  if (mobileToggle && navbar) {
    // Toggle menu
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.toggle("active");
      body.classList.toggle("mobile-nav-active");
      mobileToggle.classList.toggle("bi-list");
      mobileToggle.classList.toggle("bi-x");
    });

    // Close menu on nav link click
    on(
      "click",
      "#navbar .nav-link",
      function () {
        if (body.classList.contains("mobile-nav-active")) {
          navbar.classList.remove("active");
          body.classList.remove("mobile-nav-active");
          mobileToggle.classList.add("bi-list");
          mobileToggle.classList.remove("bi-x");
        }
      },
      true
    );

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        body.classList.contains("mobile-nav-active") &&
        !e.target.closest("#navbar") &&
        !e.target.closest(".mobile-nav-toggle")
      ) {
        navbar.classList.remove("active");
        body.classList.remove("mobile-nav-active");
        mobileToggle.classList.add("bi-list");
        mobileToggle.classList.remove("bi-x");
      }
    });
  }

  // ==============================
  // Smooth Scroll Navigation
  // ==============================

  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      const hash = this.getAttribute("href");

      if (hash && hash.startsWith("#")) {
        e.preventDefault();
        const target = select(hash);

        if (target) {
          // Active state update
          select("#navbar .nav-link", true).forEach((link) =>
            link.classList.remove("active")
          );
          this.classList.add("active");

          // Show section
          if (hash !== "#header") {
            select("section", true).forEach((section) =>
              section.classList.remove("section-show")
            );
            target.classList.add("section-show");

            const header = select("#header");
            if (header && !header.classList.contains("header-top")) {
              header.classList.add("header-top");
            }
          }

          scrollTo(target);
        }
      }
    },
    true
  );

  // ==============================
  // Load with Hash
  // ==============================

  window.addEventListener("load", () => {
    const hash = window.location.hash;

    if (hash) {
      const target = select(hash);

      if (target) {
        select("#navbar .nav-link", true).forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === hash
          );
        });

        setTimeout(() => {
          select("section", true).forEach((section) =>
            section.classList.remove("section-show")
          );
          target.classList.add("section-show");
        }, 100);

        const header = select("#header");
        if (header && hash !== "#header") {
          header.classList.add("header-top");
        }
      }
    }
  });

  // ==============================
  // Back to Top
  // ==============================

  const backToTop = select(".back-to-top");

  if (backToTop) {
    const toggle = () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    };

    window.addEventListener("scroll", toggle);

    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    toggle();
  }

  // ==============================
  // Skills Animation
  // ==============================

  const skillsContent = select(".skills-content");

  if (skillsContent && typeof Waypoint !== "undefined") {
    new Waypoint({
      element: skillsContent,
      offset: "80%",
      handler: function () {
        select(".progress .progress-bar", true).forEach((bar) => {
          const width =
            bar.getAttribute("aria-valuenow") || bar.dataset.width;
          if (width) bar.style.width = width + "%";
        });
        this.destroy();
      },
    });
  }

  // ==============================
  // Contact Form
  // ==============================

  const contactForm = select("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      const btn = select("#submitBtn");
      const successMsg = select("#successMessage");

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending...";
      }

      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Send Message";
        }

        if (successMsg) {
          successMsg.classList.remove("d-none");
          setTimeout(() => {
            successMsg.classList.add("d-none");
          }, 5000);
        }
      }, 3000);
    });
  }
})();