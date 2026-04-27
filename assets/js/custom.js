document.addEventListener("DOMContentLoaded", function () {

  // ===== SELECTORS =====
  const toggle = document.querySelector(".mobile-nav-toggle");
  const mobileNav = document.querySelector(".navbar-mobile");
  const overlay = document.querySelector(".navbar-overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const header = document.querySelector("#header");

  // ===== PAGE SWITCHER =====
  function showPage(pageId) {
    // Hide all pages
    pages.forEach(p => p.classList.remove("active"));

    // Show target page (IDs are now #home, #about, etc.)
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add("active");
      // Reset scroll on scrollable content
      const scrollEl = target.querySelector(".scrollable");
      if (scrollEl) scrollEl.scrollTop = 0;
    }

    // Update active nav link
    navLinks.forEach(l => {
      l.classList.remove("active");
      if (l.getAttribute("data-page") === pageId) {
        l.classList.add("active");
      }
    });

    // Update URL hash without jumping
    history.replaceState(null, "", "#" + pageId);
  }

  // ===== NAV LINK CLICK =====
  navLinks.forEach(link => {
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
  const logoLink = document.querySelector(".logo a");  if (logoLink) {
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

  // ===== MOBILE MENU TOGGLE =====
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      mobileNav.classList.toggle("active");
      overlay?.classList.toggle("active");
      // Toggle icon: hamburger ↔ close
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  }

  // ===== CLOSE MENU =====
  function closeMenu() {
    mobileNav?.classList.remove("active");
    overlay?.classList.remove("active");
    if (toggle) {
      toggle.classList.add("bi-list");
      toggle.classList.remove("bi-x");
    }
  }

  // Close on overlay click
  overlay?.addEventListener("click", closeMenu);

  // Close menu when a nav link is clicked (mobile)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 991) closeMenu();
    });
  });

  // ===== HEADER SCROLL EFFECT =====  function bindScrollTint() {
    const activePage = document.querySelector(".page.active");
    if (!activePage) return;
    const scrollEl = activePage.querySelector(".scrollable");
    
    if (!scrollEl) {
      // Home page — no scroll, keep header transparent
      header?.classList.remove("header-scrolled");
      return;
    }
    
    scrollEl.addEventListener("scroll", function () {
      if (header) {
        header.classList.toggle("header-scrolled", this.scrollTop > 30);
      }
    });
  }

  // Re-bind scroll effect when page changes
  const observer = new MutationObserver(bindScrollTint);
  pages.forEach(p => observer.observe(p, { attributes: true, attributeFilter: ["class"] }));
  bindScrollTint();

  // ===== CONTACT FORM - FormSubmit.co Integration =====
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const success = document.getElementById("successMessage");

  if (form && btn && success) {
    const setStatus = (status) => {
      switch (status) {
        case "sending":
          btn.disabled = true;
          btn.textContent = "Sending...";
          success.classList.add("d-none");
          break;
        case "success":
          form.reset();
          success.classList.remove("d-none");
          btn.disabled = false;
          btn.textContent = "Send Message";
          setTimeout(() => success.classList.add("d-none"), 5000);
          break;
        case "error":
          alert("Oops! Something went wrong. Please try again.");
          btn.disabled = false;
          btn.textContent = "Send Message";
          break;
      }
    };
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      setStatus("sending");
      
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          setStatus("success");
        } else {
          throw new Error("Server error");
        }
      } catch (err) {
        console.error("Contact form error:", err);
        setStatus("error");
      }
    });
  }

  // ===== KEYBOARD & RESIZE HANDLERS =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 991) closeMenu();
    }, 250);
  });

});