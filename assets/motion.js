document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const loader = document.createElement('div');
  loader.className = 'page-shell-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = `
    <div class="page-shell-loader__panel">
      <div class="page-shell-loader__brand">
        <div class="page-shell-loader__mark"></div>
        <div class="page-shell-loader__title"></div>
      </div>
      <div class="page-shell-loader__line"></div>
      <div class="page-shell-loader__line"></div>
      <div class="page-shell-loader__line"></div>
      <div class="page-shell-loader__grid">
        <div class="page-shell-loader__pill"></div>
        <div class="page-shell-loader__pill"></div>
        <div class="page-shell-loader__pill"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loader);

  const setNavState = () => {
    document.querySelectorAll('.site-nav').forEach((nav) => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 20);
    });
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const activeGroups = {
    'index.html': ['index.html', ''],
    'armada.html': ['armada.html', 'medium-long.html', 'single-glass.html', 'double-glass.html', 'jetbus-5.html'],
    'mitra-testimoni.html': ['mitra-testimoni.html'],
    'kontak.html': ['kontak.html']
  };
  document.querySelectorAll('.mobile-bottom-nav').forEach((nav) => {
    nav.querySelectorAll('.mobile-bottom-nav__item').forEach((item) => {
      const itemFile = (new URL(item.href, window.location.href).pathname.split('/').pop() || 'index.html').toLowerCase();
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
