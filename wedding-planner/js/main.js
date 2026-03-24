// MonMariagePerfait.fr — Main JS

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== NAV: Scroll effect =====
  const header = document.getElementById('header');
  const observer = new IntersectionObserver(
    ([e]) => header.classList.toggle('scrolled', !e.isIntersecting),
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );
  const heroSection = document.querySelector('.hero');
  if (heroSection) observer.observe(heroSection);

  // ===== NAV: Mobile menu =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav__links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== INTERSECTION OBSERVER: Reveal on scroll =====
  const revealEls = document.querySelectorAll(
    '.feature-card, .testimonial, .pricing-card, .faq-item, .problem__col'
  );
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${i * 0.05}s`;
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });
  }
  // Add revealed styles inline (no extra CSS class file needed)
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ===== DEMO: Sidebar link switching =====
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ===== PRICING: Annual/Monthly toggle (future enhancement) =====
  // Placeholder for toggle if added

  // ===== UTM PARAMS: Pass to CTA links =====
  const utmParams = new URLSearchParams(window.location.search);
  const utmString = utmParams.toString();
  if (utmString) {
    document.querySelectorAll('a[href*="inscription"]').forEach(link => {
      const url = new URL(link.href, window.location.origin);
      utmParams.forEach((val, key) => url.searchParams.set(key, val));
      link.href = url.toString();
    });
  }

  // ===== COUNTDOWN: Days to wedding (demo data) =====
  // In the real app, this reads from user's wedding date in localStorage/server
  const countdownEl = document.querySelector('.sidebar-date strong');
  if (countdownEl) {
    // Demo: keep static
  }

});
