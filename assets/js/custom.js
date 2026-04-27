document.addEventListener('DOMContentLoaded', () => {
  // ===== ELEMENTS =====
  const toggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.navbar-mobile');
  const overlay = document.querySelector('.navbar-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const header = document.getElementById('header');

  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const success = document.getElementById("successMessage");

  // ===== MOBILE NAV =====
  if (toggle && mobileNav && overlay) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // ===== PAGE SWITCHING =====
  if (navLinks.length && pages.length) {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href')?.substring(1);
        const targetPage = document.getElementById(targetId);

        if (!targetPage) return;

        // Active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Show page
        pages.forEach(p => p.classList.remove('active'));
        targetPage.classList.add('active');

        // Close mobile nav
        mobileNav?.classList.remove('active');
        overlay?.classList.remove('active');
      });
    });
  }

  // ===== HEADER SCROLL =====
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-scrolled', window.scrollY > 50);
    });
  }

  // ===== CONTACT FORM =====
  if (form && btn && success) {

    const setStatus = (status) => {
      if (status === "sending") {
        btn.disabled = true;
        btn.textContent = "Sending...";
        success.classList.add("d-none");
      }

      if (status === "success") {
        form.reset();
        success.classList.remove("d-none");
        btn.disabled = false;
        btn.textContent = "Send Message";

        setTimeout(() => {
          success.classList.add("d-none");
        }, 5000);
      }

      if (status === "error") {
        alert("Oops! Something went wrong. Please try again.");
        btn.disabled = false;
        btn.textContent = "Send Message";
      }
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus("sending");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error("Request failed");
        setStatus("success");

      } catch (error) {
        console.error("Form error:", error);
        setStatus("error");
      }
    });
  }
});