document.addEventListener("DOMContentLoaded", function () {

  // ================= NAVBAR =================
  const toggle = document.querySelector(".mobile-nav-toggle");
  const navbar = document.querySelector("#navbar");
  const links = document.querySelectorAll("#navbar .nav-link");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("#header");

  // Mobile Toggle
  if (toggle && navbar) {
    toggle.addEventListener("click", function () {
      navbar.classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  }

  // Navigation Click
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        sections.forEach(sec => sec.classList.remove("section-show"));
        targetSection.classList.add("section-show");

        header.classList.add("header-top");

        navbar.classList.remove("navbar-mobile");
        toggle.classList.add("bi-list");
        toggle.classList.remove("bi-x");
      }
    });
  });


  // ================= CONTACT FORM =================
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const success = document.getElementById("successMessage");

  if (!form || !btn || !success) return;

  let status = "idle";

  const setStatus = (newStatus) => {
    status = newStatus;

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
        setStatus("idle");
      }, 5000);
    }

    if (status === "error") {
      alert("Oops! Something went wrong.");
      btn.disabled = false;
      btn.textContent = "Send Message";
    }

    if (status === "idle") {
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
      console.error(error);
      setStatus("error");
    }
  };

  form.addEventListener("submit", handleSubmit);

});