document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.querySelector(".mobile-nav-toggle");
  const navbar = document.querySelector("#navbar");
  const links = document.querySelectorAll("#navbar .nav-link");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("#header");

  // ✅ Mobile Toggle
  if (toggle && navbar) {
    toggle.addEventListener("click", function () {
      navbar.classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  }

  // ✅ Navigation Click
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        // Remove active from all links
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        // Hide all sections
        sections.forEach(sec => sec.classList.remove("section-show"));

        // Show selected
        targetSection.classList.add("section-show");

        // Header shrink
        header.classList.add("header-top");

        // Close mobile menu
        navbar.classList.remove("navbar-mobile");
        toggle.classList.add("bi-list");
        toggle.classList.remove("bi-x");
      }
    });
  });

});