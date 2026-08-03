document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('main > section, main > div > section, footer');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { target.classList.add('is-visible'); observer.unobserve(target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' });
    revealTargets.forEach((target) => { target.classList.add('motion-reveal'); observer.observe(target); });
  }

  document.querySelectorAll('a[href]').forEach((link) => {
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || link.target === '_blank' || url.pathname === window.location.pathname) return;
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(-6px)';
      window.setTimeout(() => { window.location.href = link.href; }, reduceMotion ? 0 : 180);
    });
  });
});
