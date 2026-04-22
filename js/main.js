// AIUNITES - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // About dropdown
  const aboutBtn = document.getElementById('nav-about-btn');
  const aboutDrop = document.getElementById('nav-about-drop');
  if (aboutBtn && aboutDrop) {
    aboutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = aboutDrop.classList.toggle('open');
      aboutBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => {
      aboutDrop.classList.remove('open');
      aboutBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Movement dropdown
  const movementBtn = document.getElementById('nav-movement-btn');
  const movementDrop = document.getElementById('nav-movement-drop');
  if (movementBtn && movementDrop) {
    movementBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = movementDrop.classList.toggle('open');
      movementBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => {
      movementDrop.classList.remove('open');
      movementBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // More dropdown
  const moreBtn = document.getElementById('nav-more-btn');
  const moreDrop = document.getElementById('nav-more-drop');
  if (moreBtn && moreDrop) {
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = moreDrop.classList.toggle('open');
      moreBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => {
      moreDrop.classList.remove('open');
      moreBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    
    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // Account for fixed nav
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
  
  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Open Google Form with AIUNITES pre-filled
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSeQUi49AdTBRjetz5MDFQgMIkm9-vOMb_ARKwYEz41j_Nfiwg/viewform?usp=pp_url&entry.2053726945=AIUNITES', '_blank');
      
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '✓ Opening form...';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
      }, 3000);
    });
  }
  
  // Navbar background on scroll
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
      } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
      }
    });
  }
  
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe service cards, portfolio cards, etc.
  document.querySelectorAll('.service-card, .portfolio-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // Add animate-in styles
  const style = document.createElement('style');
  style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
});
