(() => {
  'use strict';

  /* ---------- Mobile menu ---------- */
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.menu-btn');

  if (header && nav && toggle) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', (e) => { if (!header.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Highlight the section being read ---------- */
  const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));

  if ('IntersectionObserver' in window && byId.size) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const active = byId.get(entry.target.id);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Gentle reveal on scroll ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const selectors = [
      '.about__photo', '.about__text', '.exp__aside', '.role', '.slide__intro',
      '.project__text', '.devices', '.schema', '.comp__text', '.comp__media',
      '.cert', '.contact__email', '.tiles li'
    ];
    const items = document.querySelectorAll(selectors.join(','));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    items.forEach((el) => {
      // Neighbours in a row or grid arrive one after another.
      const siblings = Array.from(el.parentElement.children).filter((c) => c.matches(selectors.join(',')));
      const index = siblings.indexOf(el);
      if ((el.matches('.cert, .tiles li')) && index > 0) el.style.setProperty('--d', (index * 0.12) + 's');
      if (el.matches('.devices, .schema, .comp__media')) el.style.setProperty('--d', '0.15s');
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Certificate viewer ---------- */
  const box = document.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    const img = box.querySelector('img');
    const caption = box.querySelector('figcaption');

    document.querySelectorAll('[data-lightbox]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        img.src = link.href;
        img.alt = link.dataset.alt || '';
        caption.textContent = link.dataset.caption || '';
        box.showModal();
      });
    });

    // Clicking the dark area around the picture closes it.
    box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  }
})();
