/**
 * Personal Portfolio - Main JavaScript
 * Clean, minimal, and mobile-ready
 */

(function() {
  "use strict";

  // Helper: Select element(s)
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  // Helper: Add event listener
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;
    
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  // Smooth scroll to element
  const scrollTo = (el) => {
    const element = typeof el === 'string' ? select(el) : el;
    if (!element) return;
    
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  // Mobile Navigation Toggle - CRITICAL FIX
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const navbar = document.querySelector('#navbar ul');
const body = document.body;

if (mobileToggle && navbar) {
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // ← Prevents event bubbling
    navbar.classList.toggle('active');
    body.classList.toggle('mobile-nav-active');
    mobileToggle.classList.toggle('bi-list');
    mobileToggle.classList.toggle('bi-x');
  });

  // Close when clicking a link
  document.querySelectorAll('#navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) {
        navbar.classList.remove('active');
        body.classList.remove('mobile-nav-active');
        mobileToggle.classList.add('bi-list');
        mobileToggle.classList.remove('bi-x');
      }
    });
  });
}

// Close when clicking overlay
document.addEventListener('click', (e) => {
  if (body.classList.contains('mobile-nav-active') && 
      !e.target.closest('#navbar ul') && 
      !e.target.closest('.mobile-nav-toggle')) {
    navbar.classList.remove('active');
    body.classList.remove('mobile-nav-active');
    mobileToggle.classList.add('bi-list');
    mobileToggle.classList.remove('bi-x');
  }
});

  // Handle hash links on page load
  window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
      const target = select(hash);
      if (target) {
        // Set active nav link
        select('#navbar .nav-link', true).forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === hash);
        });
        
        // Show section after small delay for transition
        setTimeout(() => {
          select('section', true).forEach(section => {
            section.classList.remove('section-show');
          });
          target.classList.add('section-show');
        }, 100);
        
        // Compact header
        const header = select('#header');
        if (header && hash !== '#header') {
          header.classList.add('header-top');
        }
      }
    }
  });

  // Back to Top Button
  const backToTop = select('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    };
    
    window.addEventListener('scroll', toggleBackToTop);
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Initial check
    toggleBackToTop();
  }

  // Skills Progress Animation (if Waypoints is loaded)
  const skillsContent = select('.skills-content');
  if (skillsContent && typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function() {
        select('.progress .progress-bar', true).forEach(bar => {
          const width = bar.getAttribute('aria-valuenow') || bar.dataset.width;
          if (width) {
            bar.style.width = width + '%';
          }
        });
        this.destroy(); // Run only once
      }
    });
  }

  // Form Submit Handling (for FormSubmit.co)
  const contactForm = select('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      const btn = select('#submitBtn');
      const successMsg = select('#successMessage');
      
      // Let FormSubmit handle submission normally
      // But add loading state for UX
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending...';
      }
      
      // Re-enable button after 3 seconds (FormSubmit redirects or handles)
      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Send Message';
        }
        if (successMsg) {
          successMsg.classList.remove('d-none');
          setTimeout(() => {
            successMsg.classList.add('d-none');
          }, 5000);
        }
      }, 3000);
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (body.classList.contains('mobile-nav-active') && 
        !e.target.closest('#navbar') && 
        !e.target.closest('.mobile-nav-toggle')) {
      navbar.classList.remove('active');
      body.classList.remove('mobile-nav-active');
      mobileToggle.classList.add('bi-list');
      mobileToggle.classList.remove('bi-x');
    }
  });

})();