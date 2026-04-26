assets/js/main.js

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Smooth scroll to element
   */
  const scrollto = (el) => {
    const element = typeof el === "string" ? select(el) : el;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    const navbar = select('#navbar');
    if (navbar) {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    }
  });
  /**
   * Smooth scroll navigation with section showing
   */
  on('click', '#navbar .nav-link.scrollto', function(e) {
    const section = select(this.hash);
    if (section) {
      e.preventDefault();

      const navbar = select('#navbar');
      const header = select('#header');
      const sections = select('section', true);
      const navlinks = select('#navbar .nav-link', true);

      // Update active link
      navlinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');

      // Close mobile menu if open
      if (navbar?.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        const toggle = select('.mobile-nav-toggle');
        toggle?.classList.toggle('bi-list');
        toggle?.classList.toggle('bi-x');
      }

      // Handle header top state
      if (this.hash === '#header') {
        header?.classList.remove('header-top');
        sections.forEach(sec => sec.classList.remove('section-show'));
        return;
      }

      if (!header?.classList.contains('header-top')) {
        header?.classList.add('header-top');
        setTimeout(() => {
          sections.forEach(sec => sec.classList.remove('section-show'));
          section.classList.add('section-show');
        }, 350);
      } else {
        sections.forEach(sec => sec.classList.remove('section-show'));
        section.classList.add('section-show');
      }

      scrollto(section);
    }
  }, true);

  /**
   * Activate section on page load if hash exists   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const initialNav = select(window.location.hash);
      if (initialNav) {
        const header = select('#header');
        const navlinks = select('#navbar .nav-link', true);

        header?.classList.add('header-top');

        navlinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === window.location.hash);
        });

        setTimeout(() => initialNav.classList.add('section-show'), 350);
        scrollto(initialNav);
      }
    }
  });

  /*
   * ❌ REMOVED: EmailJS form handler
   * Reason: Using FormSubmit.co for contact form (static-friendly, no backend)
   * 
   * If you switch back to EmailJS later, restore this block:
   * 
   * emailjs.init('YOUR_PUBLIC_KEY');
   * document.getElementById('contact-form').addEventListener('submit', function(event) {
   *   event.preventDefault();
   *   var templateParams = { ... };
   *   emailjs.send('service_id', 'template_id', templateParams)...
   * });
   */

  /*
   * ❌ COMMENTED OUT: Features not used in your portfolio
   * Uncomment only if you add these sections later
   */

  /*
  // Skills animation with Waypoints
  const skillsContent = select('.skills-content');
  if (skillsContent && typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function(direction) {
        const progress = select('.progress .progress-bar', true);
        progress?.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';        });
      }
    });
  }
  */

  /*
  // Testimonials slider (Swiper)
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-slider')) {
    new Swiper('.testimonials-slider', {
      speed: 600, loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: 'auto',
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 }
      }
    });
  }
  */

  /*
  // Portfolio isotope filter + lightbox
  window.addEventListener('load', () => {
    const portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item', layoutMode: 'fitRows'
      });
      const portfolioFilters = select('#portfolio-filters li', true);
      on('click', '#portfolio-filters li', function(e) {
        e.preventDefault();
        portfolioFilters?.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        portfolioIsotope.arrange({ filter: this.getAttribute('data-filter') });
      }, true);
    }
    // Lightbox init
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.portfolio-lightbox' });
      GLightbox({ selector: '.portfolio-details-lightbox', width: '90%', height: '90vh' });
    }
  });
  */

  /*
  // Portfolio details slider (Swiper)
  if (typeof Swiper !== 'undefined' && document.querySelector('.portfolio-details-slider')) {
    new Swiper('.portfolio-details-slider', {      speed: 400, loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
    });
  }
  */

  /*
  // Pure Counter animation (for stats)
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }
  */

})();