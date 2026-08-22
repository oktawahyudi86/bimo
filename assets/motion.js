document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setNavState = () => {
    document.querySelectorAll('.site-nav').forEach((nav) => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 20);
    });
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  const normalizeFile = (path) => {
    const raw = (path.split('/').pop() || 'index.html').toLowerCase();
    if (!raw || raw === 'index') return 'index.html';
    return raw.endsWith('.html') ? raw : `${raw}.html`;
  };
  const currentFile = normalizeFile(window.location.pathname);
  const activeGroups = {
    'index.html': ['index.html', ''],
    'armada.html': ['armada.html', 'medium-long.html', 'single-glass.html', 'double-glass.html', 'jetbus-5.html'],
    'mitra-testimoni.html': ['mitra-testimoni.html'],
    'kontak.html': ['kontak.html']
  };
  const mobileItems = [
    ['index.html', 'home', 'Beranda'],
    ['armada.html', 'directions_bus', 'Armada'],
    ['mitra-testimoni.html', 'groups', 'Mitra'],
    ['kontak.html', 'support_agent', 'Kontak']
  ];
  document.querySelectorAll('.mobile-bottom-nav').forEach((nav) => {
    nav.innerHTML = mobileItems.map(([href, icon, label]) => (
      `<a class="mobile-bottom-nav__item" href="${href}"><span class="material-symbols-outlined">${icon}</span><span>${label}</span></a>`
    )).join('');
    nav.querySelectorAll('.mobile-bottom-nav__item').forEach((item) => {
      const itemFile = normalizeFile(new URL(item.href, window.location.href).pathname);
      const shouldActivate = Object.entries(activeGroups).some(([targetFile, files]) => {
        return itemFile === targetFile && files.includes(currentFile);
      });
      item.classList.toggle('is-active', shouldActivate);
    });
  });

  const revealTargets = document.querySelectorAll('main > section, main > div > section, footer');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('is-visible');
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' });
    revealTargets.forEach((target) => {
      target.classList.add('motion-reveal');
      observer.observe(target);
    });
  }

  document.querySelectorAll('a[href]').forEach((link) => {
    const url = new URL(link.href, window.location.href);
    const isSamePageHash = url.pathname === window.location.pathname && url.hash;
    const isExternal = url.origin !== window.location.origin;
    if (isExternal || link.target === '_blank' || isSamePageHash || url.pathname === window.location.pathname) return;

    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.documentElement.classList.add('page-is-leaving');
      window.setTimeout(() => {
        window.location.href = link.href;
      }, reduceMotion ? 0 : 220);
    });
  });
});
