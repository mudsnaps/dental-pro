/* ============================================================
   SMILECRAFT DENTAL — main.js
   Modules: Nav | Reveal | FAQ | Hours | Forms | WhatsApp | Cookie
   ============================================================ */

'use strict';

/* =================== NAV =================== */
const Nav = (() => {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('nav-drawer');

  const toggleDrawer = () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };

  const init = () => {
    if (!nav || !hamburger || !drawer) return;
    hamburger.addEventListener('click', toggleDrawer);
    // Close drawer on nav link click
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Close on outside click
    document.addEventListener('click', e => {
      if (drawer.classList.contains('open') &&
          !drawer.contains(e.target) &&
          !hamburger.contains(e.target)) {
        closeDrawer();
      }
    });
  };

  return { init };
})();


/* =================== SMOOTH SCROLL =================== */
const SmoothScroll = (() => {
  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById('main-nav')?.offsetHeight || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  };
  return { init };
})();


/* =================== SCROLL REVEAL =================== */
const Reveal = (() => {
  const init = () => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.in)');
          siblings.forEach((el, idx) => {
            setTimeout(() => el.classList.add('in'), idx * 75);
          });
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  };
  return { init };
})();


/* =================== SCROLL-TO-TOP =================== */
const ScrollTop = (() => {
  const init = () => {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };
  return { init };
})();


/* =================== LIVE OPENING HOURS =================== */
const OpeningHours = (() => {
  // 24h schedule: [openHour, openMin, closeHour, closeMin] or null = closed
  const SCHEDULE = {
    0: null,                   // Sunday — emergency only
    1: [8, 30, 18, 30],       // Monday
    2: [8, 30, 18, 30],       // Tuesday
    3: [8, 30, 18, 30],       // Wednesday
    4: [8, 30, 18, 30],       // Thursday
    5: [8, 30, 18, 30],       // Friday
    6: [9, 0, 16, 0],         // Saturday
  };

  const isOpenNow = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const slot = SCHEDULE[day];
    if (!slot) return false;
    const [oh, om, ch, cm] = slot;
    const nowMins = hours * 60 + mins;
    const openMins = oh * 60 + om;
    const closeMins = ch * 60 + cm;
    return nowMins >= openMins && nowMins < closeMins;
  };

  const init = () => {
    const badge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    if (!badge) return;

    if (isOpenNow()) {
      badge.className = 'status-badge status-badge--open';
      if (statusText) statusText.textContent = 'Open Now';
    } else {
      badge.className = 'status-badge status-badge--closed';
      if (statusText) statusText.textContent = 'Currently Closed';
    }
  };

  return { init };
})();


/* =================== FAQ ACCORDION =================== */
const FAQ = (() => {
  const init = () => {
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        document.querySelectorAll('.faq-item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-answer').style.maxHeight = '0';
          }
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
        answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : '0';
      });
    });
  };
  return { init };
})();


/* =================== WHATSAPP FORM SUBMISSION =================== */
const WAForm = (() => {
  /**
   * Build a WhatsApp message from form field values.
   * @param {HTMLFormElement} form
   * @param {string} clinicName
   * @returns {string} encoded WhatsApp URL
   */
  const buildWAMessage = (form, clinicName = 'SmileCraft Dental') => {
    const get = (name) => {
      const el = form.querySelector(`[name="${name}"]`);
      return el ? el.value.trim() : '';
    };

    const firstName   = get('first_name');
    const lastName    = get('last_name');
    const phone       = get('phone');
    const email       = get('email');
    const service     = get('service');
    const date        = get('pref_date');
    const time        = get('pref_time');
    const notes       = get('notes');
    const heardFrom   = get('heard_from');

    const lines = [
      `🦷 *New Appointment Request — ${clinicName}*`,
      ``,
      `👤 *Patient:* ${firstName} ${lastName}`,
      `📞 *Phone:* ${phone || 'Not provided'}`,
      `📧 *Email:* ${email || 'Not provided'}`,
      ``,
      `🩺 *Service:* ${service || 'Not selected'}`,
      `📅 *Preferred Date:* ${date || 'Flexible'}`,
      `🕐 *Preferred Time:* ${time || 'Flexible'}`,
      notes ? `📝 *Notes:* ${notes}` : '',
      heardFrom ? `🔍 *Heard via:* ${heardFrom}` : '',
      ``,
      `_Submitted via website_`,
    ].filter(Boolean).join('\n');

    return lines;
  };

  const init = () => {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const waNumber = form.dataset.waNumber || '917000000000';
      const clinicName = form.dataset.clinicName || 'SmileCraft Dental';

      const message = buildWAMessage(form, clinicName);
      const encoded = encodeURIComponent(message);
      const waURL = `https://wa.me/${waNumber}?text=${encoded}`;

      // Show success state
      form.style.display = 'none';
      const successEl = document.getElementById('booking-success');
      if (successEl) successEl.style.display = 'block';

      // Open WhatsApp after brief delay so success message shows first
      setTimeout(() => {
        window.open(waURL, '_blank');
      }, 600);
    });
  };

  return { init };
})();


/* =================== REVIEW FUNNEL =================== */
const ReviewFunnel = (() => {
  /**
   * The review funnel works like this:
   * 1. Patient taps a star rating (1–5)
   * 2. 4–5 stars → redirect to Google review link
   * 3. 1–3 stars → show private feedback form, store in localStorage with expiry
   * 4. Stored negative feedback is auto-deleted after EXPIRY_DAYS
   */

  const EXPIRY_DAYS = 7;
  const STORAGE_KEY = 'smilecraft_feedback';

  const saveFeedback = (rating, message) => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const entry = {
      id: Date.now(),
      rating,
      message,
      date: new Date().toISOString(),
      expires: Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    };
    existing.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  };

  const pruneExpired = () => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const valid = existing.filter(e => e.expires > Date.now());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
  };

  const init = () => {
    pruneExpired();

    const stars = document.querySelectorAll('.funnel-star');
    const positiveSection = document.getElementById('funnel-positive');
    const negativeSection = document.getElementById('funnel-negative');
    const negativeFeedback = document.getElementById('negative-feedback-form');
    const negativeSuccess = document.getElementById('negative-success');

    if (!stars.length) return;

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating, 10);

        // Highlight stars up to selected
        stars.forEach(s => {
          const r = parseInt(s.dataset.rating, 10);
          s.classList.toggle('active', r <= rating);
        });

        // Delay to let animation show
        setTimeout(() => {
          if (rating >= 4) {
            // Positive — go to Google
            if (positiveSection) positiveSection.style.display = 'block';
            if (negativeSection) negativeSection.style.display = 'none';
          } else {
            // Negative — private form
            if (negativeSection) negativeSection.style.display = 'block';
            if (positiveSection) positiveSection.style.display = 'none';
          }
          // Hide stars section
          const starsSection = document.getElementById('funnel-stars');
          if (starsSection) starsSection.style.display = 'none';
        }, 400);
      });
    });

    // Handle negative form submission
    if (negativeFeedback) {
      negativeFeedback.addEventListener('submit', e => {
        e.preventDefault();
        const rating = document.querySelector('.funnel-star.active:last-of-type')?.dataset.rating || 0;
        const msg = document.getElementById('negative-message')?.value || '';
        saveFeedback(rating, msg);
        if (negativeFeedback) negativeFeedback.style.display = 'none';
        if (negativeSuccess) negativeSuccess.style.display = 'block';
      });
    }
  };

  return { init };
})();


/* =================== COOKIE CONSENT =================== */
const Cookie = (() => {
  const COOKIE_KEY = 'smilecraft_cookie_consent';

  const init = () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    if (!banner) return;

    // Only show if not already answered
    if (!localStorage.getItem(COOKIE_KEY)) {
      setTimeout(() => banner.classList.add('visible'), 1500);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        banner.classList.remove('visible');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'declined');
        banner.classList.remove('visible');
      });
    }
  };

  return { init };
})();


/* =================== MOBILE CTA BAR =================== */
const MobileCTA = (() => {
  const init = () => {
    const bar = document.getElementById('mobile-cta-bar');
    if (!bar) return;
    // Hide when booking form is visible on screen
    const form = document.getElementById('booking-form');
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => {
      bar.style.opacity = entry.isIntersecting ? '0' : '1';
      bar.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.5 });
    observer.observe(form);
  };
  return { init };
})();


/* =================== BEFORE/AFTER SLIDER =================== */
const BeforeAfter = (() => {
  const init = () => {
    document.querySelectorAll('.ba-slider').forEach(slider => {
      const handle = slider.querySelector('.ba-handle');
      const afterEl = slider.querySelector('.ba-after');
      if (!handle || !afterEl) return;

      let dragging = false;

      const setPos = (x) => {
        const rect = slider.getBoundingClientRect();
        const pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
        afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        handle.style.left = pct + '%';
      };

      handle.addEventListener('mousedown', () => dragging = true);
      handle.addEventListener('touchstart', () => dragging = true, { passive: true });

      document.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
      document.addEventListener('touchmove', e => {
        if (dragging) setPos(e.touches[0].clientX);
      }, { passive: true });

      document.addEventListener('mouseup',  () => dragging = false);
      document.addEventListener('touchend', () => dragging = false);
    });
  };
  return { init };
})();


/* =================== INIT ALL =================== */
document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  SmoothScroll.init();
  Reveal.init();
  ScrollTop.init();
  OpeningHours.init();
  FAQ.init();
  WAForm.init();
  ReviewFunnel.init();
  Cookie.init();
  MobileCTA.init();
  BeforeAfter.init();
});
