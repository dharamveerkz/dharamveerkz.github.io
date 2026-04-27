document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.navbar-mobile');
  const overlay = document.querySelector('.navbar-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  // Toggle mobile menu
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  // Close menu on overlay click
  overlay.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Page switching & active state
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);

      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Show target page
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');

      // Close mobile menu if open
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('header-scrolled', window.scrollY > 50);

  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const success = document.getElementById("successMessage");

  // Exit if elements not found (prevents errors on other pages)
  if (!form || !btn || !success) return;

  // Update UI based on form status
  const setStatus = (status) => {
    switch (status) {
      case "sending":
        btn.disabled = true;
        btn.textContent = "Sending...";
        success.classList.add("d-none");
        break;
        
      case "success":
        form.reset(); // Clear all fields
        success.classList.remove("d-none"); // Show success message
        btn.disabled = false;
        btn.textContent = "Send Message";
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          success.classList.add("d-none");
        }, 5000);
        break;
        
      case "error":
        alert("Oops! Something went wrong. Please try again.");
        btn.disabled = false;
        btn.textContent = "Send Message";
        break;
    }
  };

  // Handle form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop page reload
    
    setStatus("sending"); // Show loading state

    try {
      // Send form data via AJAX to FormSubmit.co
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          'Accept': 'application/json' // Get JSON response instead of redirect
        }
      });

      if (response.ok) {
        setStatus("success"); // Show thank you message
      } else {
        throw new Error("FormSubmit.co returned an error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error"); // Show error alert
    }
  });
});