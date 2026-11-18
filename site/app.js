(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const GYM_WHATSAPP = '447961608259';
  const GYM_EMAIL = 'info@thewaygym.co.uk';

  /* ---- Mobile menu (disclosure) ---- */
  const btn = $('.menu-btn');
  const nav = $('#nav');
  const setMenu = open => { nav.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => {
    if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) setMenu(false);
  });

  /* ---- Timetable filter ---- */
  const chips = $$('.chip');
  const status = $('#tt-status');
  const labels = { all: 'all classes', adult: 'adult classes', kids: "kids' classes" };
  function applyFilter(f, announce) {
    chips.forEach(c => { const on = c.dataset.filter === f; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
    let n = 0;
    $$('.day li').forEach(li => { li.hidden = f !== 'all' && li.dataset.aud !== f; if (!li.hidden) n++; });
    if (announce && status) status.textContent = 'Showing ' + labels[f] + ': ' + n + ' a week.';
  }
  chips.forEach(chip => chip.addEventListener('click', () => applyFilter(chip.dataset.filter, true)));
  $$('[data-filter-link]').forEach(a => a.addEventListener('click', () => applyFilter(a.dataset.filterLink, true)));

  /* ---- Class descriptions: show on hover and keyboard focus (CSS); tap or click toggles; Escape closes ---- */
  const rows = $$('.day li');
  const closeTips = except => rows.forEach(li => { if (li !== except) li.classList.remove('is-open'); });
  rows.forEach(li => {
    const b = $('.what', li);
    if (!b) return;
    b.addEventListener('click', () => { li.classList.remove('is-shut'); closeTips(li); li.classList.toggle('is-open'); });
    li.addEventListener('mouseleave', () => li.classList.remove('is-shut'));
    b.addEventListener('blur', () => li.classList.remove('is-shut', 'is-open'));
  });
  document.addEventListener('click', e => { if (!e.target.closest('.day li')) closeTips(); });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (nav.classList.contains('is-open')) { setMenu(false); btn.focus(); }
    // WCAG 1.4.13: a tooltip must be dismissible without moving the pointer or focus
    rows.forEach(li => { if (li.matches(':hover, :focus-within, .is-open')) { li.classList.remove('is-open'); li.classList.add('is-shut'); } });
  });

  /* ---- Scroll reveals, staggered within a row ---- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce.matches) {
    // Blocks are only hidden-until-seen once this script is running, so nothing can stay invisible.
    document.documentElement.classList.add('anim');
    const io = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach((e, i) => {
        e.target.style.setProperty('--d', Math.min(i, 4) * 90 + 'ms');
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---- Disciplines ticker: moves only as the page scrolls, so the visitor controls it ---- */
  const tick = $('.ticker-track');
  if (tick && !reduce.matches) {
    let queued = false;
    const move = () => { queued = false; if (reduce.matches) return; const half = tick.scrollWidth / 2; tick.style.transform = 'translate3d(' + (-((scrollY * 0.4) % half)).toFixed(1) + 'px,0,0)'; };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }

  /* ---- Photo carousel: glides on a loop; pauses on hover, touch, focus or the Pause button; arrows step a photo ---- */
  const strip = $('#strip');
  const prev = $('#car-prev'), next = $('#car-next'), carPause = $('#car-pause');
  if (strip && prev && next) {
    // Set up only when the carousel is nearly on screen, so its photos are not downloaded on arrival.
    const setup = () => {
      const track = $('.strip-track', strip);
      const originals = $$('li', track);
      // A second copy of the photos makes the loop seamless. Screen readers get the first set only.
      const clones = originals.map(li => {
        const c = li.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        const img = $('img', c);
        if (img) img.alt = '';
        track.append(c);
        return c;
      });
      const period = () => clones[0].offsetLeft - originals[0].offsetLeft; // width of one full set
      const wrap = () => {
        const w = period();
        if (w <= 0) return;
        if (strip.scrollLeft >= w) strip.scrollLeft -= w;
        else if (strip.scrollLeft <= 0) strip.scrollLeft += w;
      };
      strip.scrollLeft = 1;
      strip.addEventListener('scroll', wrap, { passive: true });

      let hold = 0;          // short breather after an arrow press or a swipe
      let userPaused = false, hovering = false, focused = false, onScreen = false;
      const step = dir => {
        hold = performance.now() + 2500;
        strip.scrollBy({ left: dir * (originals[0].getBoundingClientRect().width + 8), behavior: reduce.matches ? 'auto' : 'smooth' });
      };
      prev.addEventListener('click', () => step(-1));
      next.addEventListener('click', () => step(1));

      if (!reduce.matches) {
        const SPEED = 28; // pixels a second
        let last = 0, carry = 0;
        const tick = t => {
          const dt = Math.min(100, t - (last || t));
          last = t;
          if (!userPaused && !hovering && !focused && onScreen && !document.hidden && !reduce.matches && t > hold) {
            carry += SPEED * dt / 1000;
            const whole = Math.floor(carry);
            if (whole >= 1) { strip.scrollLeft += whole; carry -= whole; }
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        strip.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hovering = true; });
        strip.addEventListener('pointerleave', () => { hovering = false; });
        strip.addEventListener('touchstart', () => { hold = Infinity; }, { passive: true });
        strip.addEventListener('touchend', () => { hold = performance.now() + 3000; }, { passive: true });
        strip.addEventListener('wheel', () => { hold = performance.now() + 2500; }, { passive: true });
        strip.addEventListener('focusin', () => { focused = true; });
        strip.addEventListener('focusout', () => { focused = false; });
        if ('IntersectionObserver' in window) new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }).observe(strip);
        else onScreen = true;
        if (carPause) {
          carPause.hidden = false;
          carPause.addEventListener('click', () => { userPaused = !userPaused; carPause.textContent = userPaused ? 'Play' : 'Pause'; });
        }
      }
  
    };
    if ('IntersectionObserver' in window) {
      const near = new IntersectionObserver(es => { if (es[0].isIntersecting) { near.disconnect(); setup(); } }, { rootMargin: '700px 0px' });
      near.observe(strip);
    } else setup();
  }

  /* ---- Hero: the still frame comes first; a short silent loop fades in over it, with a pause control ---- */
  const video = $('#hero-vid');
  const toggle = $('#hero-pause');
  const saveData = navigator.connection && navigator.connection.saveData;
  if (video && toggle && !reduce.matches && !saveData) {
    let stopped = false; // true once the visitor (or the browser) has paused it
    const start = () => {
      video.src = innerWidth >= 700 ? 'assets/hero-kick-640.mp4' : 'assets/hero-kick-400.mp4';
      video.addEventListener('playing', () => { video.classList.add('is-on'); toggle.hidden = false; }, { once: true });
      const p = video.play();
      if (p && p.catch) p.catch(() => { stopped = true; });
    };
    if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
    toggle.addEventListener('click', () => {
      stopped = !video.paused;
      if (stopped) video.pause(); else video.play().catch(() => {});
      toggle.textContent = stopped ? 'Play' : 'Pause';
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
      else if (!stopped) video.play().catch(() => {});
    });
  }

  /* ---- Click-to-play clips: fetch their still frames only when they are near the screen ---- */
  const stills = $$('.videos video[data-poster]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.poster = e.target.dataset.poster; io.unobserve(e.target); } }), { rootMargin: '600px 0px' });
    stills.forEach(v => io.observe(v));
  } else {
    stills.forEach(v => { v.poster = v.dataset.poster; });
  }

  /* ---- Phone action dock: appears after the hero, steps aside at the form ---- */
  const dock = $('#dock');
  if (dock && 'IntersectionObserver' in window) {
    dock.hidden = false;
    const seen = new Map();
    const update = () => dock.classList.toggle('is-up', !seen.get('hero') && !seen.get('trial') && !seen.get('foot'));
    const io = new IntersectionObserver(es => { es.forEach(e => seen.set(e.target.dataset.dock, e.isIntersecting)); update(); });
    [['.hero', 'hero'], ['#trial', 'trial'], ['.site-footer', 'foot']].forEach(([s, k]) => { const el = $(s); el.dataset.dock = k; seen.set(k, k === 'hero'); io.observe(el); });
  }

  /* ---- Current section in the header nav ---- */
  if ('IntersectionObserver' in window) {
    const links = new Map($$('.nav a').map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.removeAttribute('aria-current'));
        const a = links.get(e.target.id);
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => io.observe(s));
  }

  /* ---- Trial form: checks the fields, then hands the message to WhatsApp or email ---- */
  const form = $('#trial-form');
  const msg = $('#form-msg');
  const checks = [
    ['f-name', v => v.trim() ? '' : 'Enter your name'],
    ['f-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter an email address, like name@example.com'],
  ];
  function validate() {
    let first = null;
    checks.forEach(([id, test]) => {
      const input = $('#' + id), err = $('#' + id + '-err');
      const text = test(input.value);
      err.textContent = text;
      err.hidden = !text;
      if (text) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', err.id); first = first || input; }
      else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
    });
    return first;
  }
  checks.forEach(([id]) => $('#' + id).addEventListener('input', () => { if ($('#' + id).hasAttribute('aria-invalid')) validate(); }));
  form.noValidate = true; // our own messages replace the browser's; without script the browser still checks
  let lastVia = 'whatsapp';
  $$('[data-via]', form).forEach(b => b.addEventListener('click', () => { lastVia = b.dataset.via; }));
  const say = (text, href, label) => {
    msg.textContent = text + ' ';
    const a = document.createElement('a');
    a.href = href; a.textContent = label; a.rel = 'noopener';
    msg.append(a);
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = validate();
    if (bad) { msg.textContent = ''; bad.focus(); return; }
    const via = (e.submitter && e.submitter.dataset.via) || lastVia;
    const d = new FormData(form);
    const name = d.get('name').trim();
    const lines = [
      'Hi Rocket Gym, I would like to book a free 7-day trial.',
      '',
      'Name: ' + name,
      'Email: ' + d.get('email').trim(),
      d.get('phone').trim() ? 'Phone: ' + d.get('phone').trim() : null,
      'Interested in: ' + d.get('interest'),
    ].filter(l => l !== null).join('\n');
    const first = name.split(' ')[0];
    if (via === 'email') {
      const url = 'mailto:' + GYM_EMAIL + '?subject=' + encodeURIComponent('Free 7-day trial: ' + name) + '&body=' + encodeURIComponent(lines);
      location.href = url;
      say('Thanks ' + first + '. Your email app should open with the message ready to send. Nothing opened?', url, 'Open the email');
    } else {
      const url = 'https://wa.me/' + GYM_WHATSAPP + '?text=' + encodeURIComponent(lines);
      const win = window.open(url, '_blank');
      if (win) win.opener = null; else location.href = url; // some in-app browsers block new tabs
      say('Thanks ' + first + '. WhatsApp should open with your message ready to send. Nothing opened?', url, 'Open WhatsApp');
    }
  });
})();
