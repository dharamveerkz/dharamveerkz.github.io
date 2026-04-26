(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Smooth scroll navigation with hash links   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()
      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => item.classList.remove('active'))
      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => item.classList.remove('section-show'))
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => item.classList.remove('section-show'))
          section.classList.add('section-show')
        }, 350);
      } else {
        sections.forEach((item) => item.classList.remove('section-show'))
        section.classList.add('section-show')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)
      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)
        header.classList.add('header-top')        navlinks.forEach((item) => {
          item.classList.toggle('active', item.getAttribute('href') == window.location.hash)
        })
        setTimeout(() => initial_nav.classList.add('section-show'), 350);
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate Pure Counter (for animated stats)
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /* 
   * ❌ REMOVED: EmailJS form handling
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
   * ❌ COMMENTED OUT: Features not currently used
   * Uncomment only if you add these sections to your portfolio
   */

  /*
  // Skills animation with Waypoints
  let skilsContent = select('.skills-content');
  if (skilsContent && typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }  */

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
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item', layoutMode: 'fitRows'
      });
      let portfolioFilters = select('#portfolio-flters li', true);
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(el => el.classList.remove('filter-active'));
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
    new Swiper('.portfolio-details-slider', {
      speed: 400, loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
    });  }
  */

})();