document.addEventListener("DOMContentLoaded", function () {

  // ================= NAVBAR =================
  const toggle = document.querySelector(".mobile-nav-toggle");
  const navbar = document.querySelector("#navbar");
  const links = document.querySelectorAll("#navbar .nav-link");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("#header");
  const overlay = document.querySelector(".navbar-overlay");

  // ================= MOBILE TOGGLE =================
  if (toggle && navbar) {
    toggle.addEventListener("click", function () {
      navbar.classList.add("navbar-mobile");
      navbar.classList.toggle("active");

      if (overlay) overlay.classList.toggle("active");

      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  }

  // Close menu
  const closeMenu = () => {
    if (navbar) navbar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");

    if (toggle) {
      toggle.classList.add("bi-list");
      toggle.classList.remove("bi-x");
    }
  };

  // ================= NAV LINK CLICK =================
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        // Smooth scroll
        targetSection.scrollIntoView({
          behavior: "smooth"
        });

        // Active link
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        // Close mobile menu
        closeMenu();
      }
    });
  });

  // ================= OVERLAY CLICK =================
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // ================= HEADER SCROLL EFFECT =================
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // ================= ACTIVE LINK ON SCROLL (SCROLLSPY) =================
  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // ================= CONTACT FORM =================
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const success = document.getElementById("successMessage");

  if (form && btn && success) {

    const setStatus = (status) => {

      if (status === "sending") {
        btn.disabled = true;
        btn.textContent = "Sending...";
      }

      if (status === "success") {
        form.reset();
        form.classList.add("d-none");
        success.classList.remove("d-none");

        setTimeout(() => {
          form.classList.remove("d-none");
          success.classList.add("d-none");
          btn.disabled = false;
          btn.textContent = "Send Message";
        }, 5000);
      }

      if (status === "error") {
        alert("Oops! Something went wrong.");
        btn.disabled = false;
        btn.textContent = "Send Message";
      }
    };

    const handleSubmit = async (e) => {
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
          throw new Error("Failed");
        }

      } catch (error) {
        console.error("Error:", error);
        setStatus("error");
      }
    };

    form.addEventListener("submit", handleSubmit);
  }

});