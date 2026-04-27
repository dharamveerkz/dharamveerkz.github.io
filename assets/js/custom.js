document.addEventListener("DOMContentLoaded", function () {

  // ===== SELECTORS =====
  const toggle   = document.querySelector(".mobile-nav-toggle");
  const navbar   = document.querySelector("#navbar");
  const links    = document.querySelectorAll("#navbar .nav-link");
  const header   = document.querySelector("#header");
  const overlay  = document.querySelector(".navbar-overlay");
  const pages    = document.querySelectorAll(".page");

  // ===== PAGE SWITCHER =====
  function showPage(pageId) {
    // Hide all pages
    pages.forEach(p => {
      p.classList.remove("active");
    });

    // Show target page
    const target = document.getElementById("page-" + pageId);
    if (target) {
      target.classList.add("active");

      // Reset scroll on scrollable content
      const scrollEl = target.querySelector(".scrollable");
      if (scrollEl) scrollEl.scrollTop = 0;
    }

    // Update active nav link
    links.forEach(l => {
      l.classList.remove("active");
      if (l.getAttribute("data-page") === pageId) {
        l.classList.add("active");
      }
    });

    // Update URL hash without jumping
    history.replaceState(null, "", "#" + pageId);
  }

  // ===== NAV LINK CLICK =====
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const pageId = this.getAttribute("data-page");
      if (pageId) {
        showPage(pageId);
        closeMenu();
      }
    });
  });

  // Logo click
  const logoLink = document.querySelector(".logo a");
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
      showPage("home");
      closeMenu();
    });
  }

  // ===== LOAD: show page from hash =====
  const hash = window.location.hash.replace("#", "");
  const validPages = ["home", "about", "resume", "services", "contact"];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage("home");
  }

  // ===== MOBILE TOGGLE =====
  if (toggle && navbar) {
    toggle.addEventListener("click", function () {
      navbar.classList.toggle("navbar-mobile");
      navbar.classList.toggle("active");
      if (overlay) overlay.classList.toggle("active");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  }

  // ===== CLOSE MENU =====
  function closeMenu() {
    if (navbar) {
      navbar.classList.remove("navbar-mobile");
      navbar.classList.remove("active");
    }
    if (overlay) overlay.classList.remove("active");
    if (toggle) {
      toggle.classList.add("bi-list");
      toggle.classList.remove("bi-x");
    }
  }

  if (overlay) overlay.addEventListener("click", closeMenu);

  // ===== HEADER SCROLL TINT =====
  // Since pages scroll inside #main (not window), we watch the active page's scrollable div
  function bindScrollTint() {
    const activePage = document.querySelector(".page.active");
    if (!activePage) return;
    const scrollEl = activePage.querySelector(".scrollable");
    if (!scrollEl) {
      // Home page — no scroll, always transparent-ish
      if (header) header.classList.remove("header-scrolled");
      return;
    }
    scrollEl.addEventListener("scroll", function () {
      if (header) {
        if (this.scrollTop > 30) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }
      }
    });
  }

  // Re-bind scroll tint whenever page changes
  const observer = new MutationObserver(() => {
    bindScrollTint();
  });

  pages.forEach(p => {
    observer.observe(p, { attributes: true, attributeFilter: ["class"] });
  });

  bindScrollTint();

  // ===== CONTACT FORM =====
  const form    = document.getElementById("contactForm");
  const btn     = document.getElementById("submitBtn");
  const success = document.getElementById("successMessage");

  if (form && btn && success) {

    const setStatus = (status) => {
      if (status === "sending") {
        btn.disabled    = true;
        btn.textContent = "Sending...";
      }
      if (status === "success") {
        form.reset();
        success.classList.remove("d-none");
        setTimeout(() => {
          success.classList.add("d-none");
          btn.disabled    = false;
          btn.textContent = "Send Message";
        }, 5000);
      }
      if (status === "error") {
        alert("Oops! Something went wrong. Please try again.");
        btn.disabled    = false;
        btn.textContent = "Send Message";
      }
    };

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      setStatus("sending");
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });
        if (response.ok) {
          setStatus("success");
        } else {
          throw new Error("Server error");
        }
      } catch (err) {
        console.error("Form error:", err);
        setStatus("error");
      }
    });
  }

});