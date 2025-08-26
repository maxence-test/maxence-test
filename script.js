// Scrollspy: highlight nav link based on section in view
(function() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const ids = links.map(a => a.getAttribute('href')).filter(Boolean);
  const sections = ids.map(id => document.querySelector(id)).filter(Boolean);

  const activate = (id) => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activate(`#${entry.target.id}`);
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 });

  sections.forEach(sec => observer.observe(sec));

  // Smooth scroll offset already handled via CSS; ensure hash updates on click
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', href);
        }
      }
    });
  });
})();
