document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const siteData = window.BIMO_SITE_DATA || {};
  const busTypes = Array.isArray(siteData.busTypes) ? siteData.busTypes : [];
  const posts = Array.isArray(siteData.posts) ? siteData.posts : [];

  const createPageSkeleton = () => {
    if (document.querySelector('.page-content-skeleton')) return;

    const skeleton = document.createElement('div');
    skeleton.className = 'page-content-skeleton';
    skeleton.setAttribute('aria-hidden', 'true');
    skeleton.innerHTML = `
      <div class="page-content-skeleton__inner">
        <div class="page-content-skeleton__toolbar">
          <span class="page-content-skeleton__pill page-content-skeleton__pill--wide"></span>
          <span class="page-content-skeleton__pill"></span>
          <span class="page-content-skeleton__pill"></span>
        </div>
        <div class="page-content-skeleton__layout">
          <aside class="page-content-skeleton__filters">
            <span class="page-content-skeleton__block page-content-skeleton__block--hero"></span>
            <span class="page-content-skeleton__filter"></span>
            <span class="page-content-skeleton__filter"></span>
            <span class="page-content-skeleton__filter"></span>
            <span class="page-content-skeleton__filter"></span>
          </aside>
          <section class="page-content-skeleton__list">
            ${Array.from({ length: 4 }).map(() => `
              <article class="page-content-skeleton__card">
                <div class="page-content-skeleton__media"></div>
                <div class="page-content-skeleton__copy">
                  <span class="page-content-skeleton__line page-content-skeleton__line--title"></span>
                  <span class="page-content-skeleton__line"></span>
                  <span class="page-content-skeleton__line page-content-skeleton__line--short"></span>
                  <div class="page-content-skeleton__chips">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div class="page-content-skeleton__action">
                  <span></span>
                  <span></span>
                </div>
              </article>
            `).join('')}
          </section>
        </div>
      </div>
    `;
    document.body.appendChild(skeleton);
  };

  createPageSkeleton();

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
  const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  const currentBus = busTypes.find((bus) => normalizeFile(bus.href || '') === currentFile);

  const renderBusDropdowns = () => {
    if (!busTypes.length) return;

    document.querySelectorAll('details').forEach((details) => {
      const summary = details.querySelector('summary');
      const menu = details.querySelector('div');
      if (!summary || !menu || !summary.textContent.toLowerCase().includes('jenis bus')) return;

      menu.setAttribute('data-bus-nav', '');
      menu.innerHTML = busTypes.map((bus) => {
        const isActive = normalizeFile(bus.href) === currentFile;
        const activeClass = isActive ? ' text-secondary bg-surface-container-low font-bold' : '';
        return `<a class="block rounded-lg px-4 py-3 text-sm text-on-surface hover:bg-surface-container-low hover:text-secondary${activeClass}" href="${escapeHtml(bus.href)}">${escapeHtml(bus.name)}</a>`;
      }).join('');
    });
  };

  const renderBusList = () => {
    if (!busTypes.length) return;
    const list = document.querySelector('[data-bus-list], section[aria-label="Pilihan jenis bus"]');
    if (!list) return;

    list.setAttribute('data-bus-list', '');
    list.classList.add('bus-type-grid');
    list.innerHTML = busTypes.map((bus, index) => {
      const featured = normalizeFile(bus.href) === currentFile || (!currentBus && index === 1);
      const cardClass = featured ? 'bus-type-card bus-type-card--featured' : 'bus-type-card';
      const iconClass = featured ? 'bus-type-card__icon bus-type-card__icon--featured' : 'bus-type-card__icon';
      const features = (bus.specs || bus.facilities || []).slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join('');
      return `
        <article id="${escapeHtml(bus.slug)}" class="${cardClass}">
          <div class="bus-type-card__top">
            <span class="${iconClass} material-symbols-outlined">${escapeHtml(bus.icon || 'directions_bus')}</span>
            <span class="bus-type-card__capacity">${escapeHtml(bus.capacity)}</span>
          </div>
          <h3>${escapeHtml(bus.name)}</h3>
          <p>${escapeHtml(bus.summary)}</p>
          <ul>${features}</ul>
          <div class="bus-type-card__actions">
            <a href="${escapeHtml(bus.href)}">Lihat detail <span class="material-symbols-outlined">arrow_forward</span></a>
            <a href="kontak.html">Tanyakan ketersediaan</a>
          </div>
        </article>
      `;
    }).join('');
  };

  const postCard = (post) => `
    <article class="news-card scroll-mt-28" id="${escapeHtml(post.slug)}">
      <a class="news-card__media" href="artikel.html?slug=${encodeURIComponent(post.slug)}" aria-label="${escapeHtml(post.title)}">
        <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy">
      </a>
      <div class="news-card__body">
        <div class="news-card__meta">
          <span>${escapeHtml(post.category)}</span>
          <span>${escapeHtml(post.date)}</span>
        </div>
        <h3><a href="artikel.html?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <a class="news-card__link" href="artikel.html?slug=${encodeURIComponent(post.slug)}">Baca artikel <span class="material-symbols-outlined">arrow_forward</span></a>
      </div>
    </article>
  `;

  const renderLatestPosts = () => {
    const container = document.querySelector('[data-latest-posts]');
    if (!container || !posts.length) return;
    container.innerHTML = posts.slice(0, 3).map(postCard).join('');
  };

  const renderBlogList = () => {
    const container = document.querySelector('[data-blog-list]');
    if (!container || !posts.length) return;
    const searchInput = document.querySelector('[data-blog-search]');
    const categoryFilter = document.querySelector('[data-blog-category]');
    const emptyState = document.querySelector('[data-blog-empty]');

    if (categoryFilter && categoryFilter.options.length <= 1) {
      [...new Set(posts.map((post) => post.category).filter(Boolean))]
        .forEach((category) => {
          const option = document.createElement('option');
          option.value = category;
          option.textContent = category;
          categoryFilter.appendChild(option);
        });
    }

    const applyFilters = () => {
      const query = (searchInput?.value || '').trim().toLowerCase();
      const category = categoryFilter?.value || '';
      const filteredPosts = posts.filter((post) => {
        const haystack = `${post.title} ${post.category} ${post.excerpt}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const matchesCategory = !category || post.category === category;
        return matchesQuery && matchesCategory;
      });

      container.innerHTML = filteredPosts.map(postCard).join('');
      if (emptyState) emptyState.hidden = filteredPosts.length > 0;
    };

    searchInput?.addEventListener('input', applyFilters);
    categoryFilter?.addEventListener('change', applyFilters);
    applyFilters();
  };

  const renderArticleDetail = () => {
    const container = document.querySelector('[data-article-detail]');
    if (!container || !posts.length) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || posts[0].slug;
    const post = posts.find((item) => item.slug === slug);
    const related = posts.filter((item) => item.slug !== slug).slice(0, 3);

    if (!post) {
      container.innerHTML = `
        <section class="max-w-3xl mx-auto px-gutter py-section-padding text-center">
          <span class="blog-kicker">Artikel</span>
          <h1 class="font-headline-lg text-headline-lg text-primary">Artikel tidak ditemukan</h1>
          <p class="font-body-md text-body-md text-on-surface-variant mt-4">Konten yang Anda buka belum tersedia atau alamatnya berubah.</p>
          <a class="news-section__all mt-8" href="blog.html">Kembali ke Blog <span class="material-symbols-outlined">arrow_back</span></a>
        </section>
      `;
      return;
    }

    document.title = `${post.title} | Bimo Transport`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', post.excerpt);

    container.innerHTML = `
      <section class="article-hero bg-surface">
        <div class="max-w-container-max mx-auto px-gutter py-section-padding">
          <div class="article-hero__grid">
            <div>
              <a class="article-back" href="blog.html"><span class="material-symbols-outlined">arrow_back</span> Kembali ke Blog</a>
              <div class="news-card__meta mt-8">
                <span>${escapeHtml(post.category)}</span>
                <span>${escapeHtml(post.date)}</span>
              </div>
              <h1 class="font-display-lg text-display-lg text-primary">${escapeHtml(post.title)}</h1>
              <p class="font-body-lg text-body-lg text-on-surface-variant mt-5">${escapeHtml(post.excerpt)}</p>
            </div>
            <div class="article-hero__media">
              <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}">
            </div>
          </div>
        </div>
      </section>
      <section class="bg-surface-container-low py-section-padding">
        <div class="article-layout max-w-container-max mx-auto px-gutter">
          <article class="article-content">
            ${(post.content || [post.excerpt]).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
            <div class="article-cta">
              <h2>Konsultasikan kebutuhan perjalanan Anda</h2>
              <p>Tim Bimo dapat membantu memilih unit, menghitung kebutuhan kapasitas, dan menyusun rute yang sesuai agenda rombongan.</p>
              <a href="kontak.html">Hubungi Admin <span class="material-symbols-outlined">arrow_forward</span></a>
            </div>
          </article>
          <aside class="article-related">
            <h2>Artikel Lainnya</h2>
            ${related.map((item) => `
              <a class="article-related__item" href="artikel.html?slug=${encodeURIComponent(item.slug)}">
                <img src="${escapeHtml(item.image)}" alt="">
                <span>${escapeHtml(item.category)}</span>
                <strong>${escapeHtml(item.title)}</strong>
              </a>
            `).join('')}
          </aside>
        </div>
      </section>
    `;
  };

  renderBusDropdowns();
  renderBusList();
  renderLatestPosts();
  renderBlogList();
  renderArticleDetail();

  const activeGroups = {
    'index.html': ['index.html', '', 'sejarah.html', 'blog.html', 'artikel.html'],
    'armada.html': ['armada.html', 'rute.html', ...busTypes.map((bus) => normalizeFile(bus.href))],
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
      createPageSkeleton();
      document.documentElement.classList.add('page-is-leaving');
      window.setTimeout(() => {
        window.location.href = link.href;
      }, reduceMotion ? 0 : 260);
    });
  });
});
