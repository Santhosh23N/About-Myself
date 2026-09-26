/**
 * ============================================================================
 * SANTHOSH M - PERSONAL PORTFOLIO SCRIPT
 * Clean, Well-Commented, Beginner-Friendly Vanilla JavaScript
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize typing effect in hero section
  initTypingEffect();

  // 2. Initialize mobile navigation hamburger toggle
  initMobileNavigation();

  // 3. Initialize smooth scrolling & active link highlighting
  initScrollSpy();

  // 4. Initialize scroll reveal animations
  initScrollReveal();

  // 5. Initialize contact form with validation and mailto fallback
  initContactForm();

  // 6. Initialize back-to-top button
  initBackToTop();

  // 7. Initialize theme toggle (dark/light)
  initThemeToggle();

  // 8. Set current year dynamically in footer
  setCurrentYear();
});

/**
 * ----------------------------------------------------------------------------
 * 1. Typing Animation
 * Cycles through titles in the hero section with a clean typewriter effect
 * ----------------------------------------------------------------------------
 */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = [
    'Computer Science Engineering Student',
    'Python & Django Developer',
    'Full-Stack & Backend Engineer',
    'Problem Solver & Continuous Learner'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 75;
  const deleteSpeed = 35;
  const pauseEnd = 1800;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 500);
}

/**
 * ----------------------------------------------------------------------------
 * 2. Mobile Navigation
 * Toggles the navigation drawer on mobile and closes when clicking a link
 * ----------------------------------------------------------------------------
 */
function initMobileNavigation() {
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggleBtn || !navMenu) return;

  // Toggle menu when clicking hamburger
  mobileToggleBtn.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    mobileToggleBtn.setAttribute('aria-expanded', isActive);
  });

  // Close menu when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !mobileToggleBtn.contains(event.target)) {
      navMenu.classList.remove('active');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * ----------------------------------------------------------------------------
 * 3. ScrollSpy & Active Link Highlighting
 * Highlights the corresponding navigation item as the user scrolls
 * ----------------------------------------------------------------------------
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // Add box-shadow to navbar when scrolled
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // IntersectionObserver for active section link highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * ----------------------------------------------------------------------------
 * 4. Scroll Reveal Animations
 * Smoothly fades and slides sections into view as user scrolls
 * ----------------------------------------------------------------------------
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal once
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));
}

/**
 * ----------------------------------------------------------------------------
 * 5. Contact Form Validation with Mailto Fallback
 * Validates fields cleanly on client-side and opens default email client
 * ----------------------------------------------------------------------------
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields before submitting.', 'error');
      return;
    }

    if (!emailPattern.test(email)) {
      showFeedback('Please provide a valid email address.', 'error');
      return;
    }

    // Prepare mailto URL fallback (no fake backend)
    const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
    const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:santhosh23102005@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    showFeedback('Launching your email client to complete sending...', 'success');
    showToast('Draft ready in your email app!');

    // Open mailto link
    setTimeout(() => {
      window.location.href = mailtoUrl;
      contactForm.reset();
    }, 700);
  });

  function showFeedback(text, type) {
    if (!formFeedback) return;
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
  }
}

/**
 * ----------------------------------------------------------------------------
 * 6. Back-to-Top Button
 * Smooth scroll back to top of the page
 * ----------------------------------------------------------------------------
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * ----------------------------------------------------------------------------
 * 7. Theme Toggle (Dark / Light Mode)
 * Saves user preference in localStorage for persistent experience
 * ----------------------------------------------------------------------------
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Read saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('santhosh_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('santhosh_theme', newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (sunIcon && moonIcon) {
      if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * 8. Toast Helper
 * ----------------------------------------------------------------------------
 */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * ----------------------------------------------------------------------------
 * 9. Set Current Year Dynamically
 * ----------------------------------------------------------------------------
 */
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
