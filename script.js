/* ============================================================
   TECNOLABPRO — script.js
   • Partículas en canvas (hero)
   • Navbar sticky scroll
   • Menú hamburger
   • Reveal on scroll (IntersectionObserver)
   • Contadores animados
   • Validación de formulario
   • Botón back-to-top
   ============================================================ */

'use strict';

/* ========== CANVAS PARTICLES ========== */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;

  const CONFIG = {
    count:      90,
    maxDist:    130,
    speed:      0.4,
    blueColor:  '0,212,255',
    violetColor:'139,92,246',
    dotAlpha:   0.55,
    lineAlpha:  0.12,
  };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      r:  Math.random() * 1.5 + 0.5,
      hue: Math.random() > 0.5 ? CONFIG.blueColor : CONFIG.violetColor,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.count }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* update & draw dots */
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${CONFIG.dotAlpha})`;
      ctx.fill();
    });

    /* draw connecting lines */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONFIG.maxDist) {
          const alpha = (1 - dist / CONFIG.maxDist) * CONFIG.lineAlpha;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${particles[i].hue},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  /* Pause when not visible for performance */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { if (!animId) draw(); }
      else { cancelAnimationFrame(animId); animId = null; }
    });
  }, { threshold: 0.01 });

  observer.observe(canvas);

  init();
  draw();

  window.addEventListener('resize', () => {
    resize();
    /* redistribute particles */
    particles.forEach(p => {
      if (p.x > W) p.x = W * Math.random();
      if (p.y > H) p.y = H * Math.random();
    });
  });
})();


/* ========== NAVBAR SCROLL ========== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ========== HAMBURGER MENU ========== */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  function toggle(force) {
    const open = force !== undefined ? force : !links.classList.contains('open');
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  btn.addEventListener('click', () => toggle());

  /* Close when a link is clicked */
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggle(false));
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });
})();


/* ========== REVEAL ON SCROLL ========== */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
})();


/* ========== ANIMATED COUNTERS ========== */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  function animateCounter(el) {
    const target  = +el.dataset.target;
    const duration = 1800;
    const start   = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* easeOutExpo */
      const ease = 1 - Math.pow(2, -10 * progress);
      const value = Math.round(ease * target);
      el.textContent = value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target >= 1000 ? (target / 1000).toFixed(1) + 'k' : target;
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
})();


/* ========== CONTACT FORM ========== */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    /* Basic client-side validation */
    const nombre  = form.nombre.value.trim();
    const email   = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre) { showError('Por favor ingresa tu nombre.'); return; }
    if (!emailRx.test(email)) { showError('Por favor ingresa un email válido.'); return; }
    if (mensaje.length < 10) { showError('El mensaje debe tener al menos 10 caracteres.'); return; }

    /* Simulate submission */
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Enviando…';

    setTimeout(() => {
      success.textContent = '✅ ¡Mensaje enviado! Te responderemos en menos de 24 horas.';
      form.reset();
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Enviar mensaje';

      setTimeout(() => { success.textContent = ''; }, 6000);
    }, 1200);
  });

  function showError(msg) {
    success.style.color = '#ef4444';
    success.textContent = '⚠️ ' + msg;
    setTimeout(() => {
      success.textContent = '';
      success.style.color = '';
    }, 4000);
  }
})();


/* ========== BACK TO TOP ========== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ========== FOOTER YEAR ========== */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ========== ACTIVE NAV LINK (scroll spy) ========== */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


/* ========== TOOL CARD GLOW CURSOR EFFECT ========== */
(function initCardGlowCursor() {
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
})();


/* ========== BOTÓN CURSO — abre enlace Hotmart en pestaña nueva ========== */
(function initCursoBtn() {
  document.querySelectorAll('.curso-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.dataset.href || '';

      /* Si el enlace aún no está configurado, muestra aviso */
      if (!url || url.includes('TU-ENLACE-HOTMART-AQUI') || url === '#') {
        const span = this.querySelector('span');
        const original = span.textContent;
        span.textContent = '⚠️ Configura tu enlace Hotmart';
        this.style.opacity = '0.75';
        setTimeout(() => {
          span.textContent = original;
          this.style.opacity = '';
        }, 2500);
        return;
      }

      /* Enlace válido → abre en pestaña nueva */
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
})();
