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
  });
});