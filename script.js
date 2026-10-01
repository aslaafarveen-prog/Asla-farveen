/**
 * ASLA FARVEEN — PERSONAL PORTFOLIO
 * Client-side Interactions & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // Theme Toggle (Light / Dark Mode)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('asla_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (prefersDark) {
    // Optional: respect system dark if desired, default is light
    // document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('asla_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // --------------------------------------------------------------------------
  // Scroll Progress Bar
  // --------------------------------------------------------------------------
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

  // --------------------------------------------------------------------------
  // Mobile Hamburger Menu
  // --------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu(forceClose = false) {
    if (!hamburger || !navMenu) return;
    const isOpen = forceClose ? false : navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    if (forceClose) {
      navMenu.classList.remove('open');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open')) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMenu(true);
      }
    }
  });

  // --------------------------------------------------------------------------
  // Active Navigation on Scroll (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // --------------------------------------------------------------------------
  // Scroll Reveal Animations
  // --------------------------------------------------------------------------
  const fadeElements = document.querySelectorAll('.fade-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // Toast Notification System
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // Copy Email Placeholder Action
  // --------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailText = btn.getAttribute('data-email') || 'aslaafarveen@gmail.com';
      navigator.clipboard.writeText(emailText).then(() => {
        showToast(`Copied email: ${emailText}`);
      }).catch(() => {
        showToast(`Email: ${emailText}`);
      });
    });
  });

  // --------------------------------------------------------------------------
  // Contact Form Submission (Mock Handler with Client Validation)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Mock successful submission for static portfolio
      if (formStatus) {
        formStatus.textContent = 'Thank you! Your message inquiry has been simulated. Replace form action with your email backend (e.g. Formspree or EmailJS) when ready.';
        formStatus.classList.add('success');
      }

      showToast('Message submitted (Demo Mode)');
      contactForm.reset();

      setTimeout(() => {
        if (formStatus) formStatus.classList.remove('success');
      }, 7000);
    });
  }


  // --------------------------------------------------------------------------
  // Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
