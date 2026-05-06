document.addEventListener('DOMContentLoaded', () => {

  /* ── CURSOR ──────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .impacto-item, .team-card, .empresa-img-block').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
  }

  /* ── NAVBAR SCROLL ───────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          navbar.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── HERO ANIMATIONS ─────────────────────────────── */
  const heroBg   = document.getElementById('heroBg');
  const heroLine = document.getElementById('heroLine');
  const heroTag  = document.getElementById('heroTag');
  const heroH1   = document.getElementById('heroH1');
  const heroSub  = document.getElementById('heroSub');
  const heroCta  = document.getElementById('heroCta');
  const scrollCue = document.getElementById('scrollCue');

  // trigger after a tiny delay so CSS transitions fire
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (heroBg)    heroBg.classList.add('loaded');
      if (heroLine)  heroLine.classList.add('visible');
      if (heroTag)   heroTag.classList.add('visible');
      if (heroH1)    heroH1.classList.add('visible');
      if (heroSub)   heroSub.classList.add('visible');
      if (heroCta)   heroCta.classList.add('visible');
      if (scrollCue) scrollCue.classList.add('visible');
    }, 100);
  });

  /* ── SCROLL REVEAL ───────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    // fallback: show everything
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── SMOOTH SCROLL (âncoras internas) ───────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', href);
    });
  });

});
