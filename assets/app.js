/* 8kajis.lv prototype interactivity
   Wires up cart counter, wishlist heart toggle, form submissions,
   language switcher persistence, and toast notifications.
   Pure JS, no framework, no backend — for client preview only. */

(function () {
  'use strict';

  // ─── Toast ────────────────────────────────────────────────────────────────
  function ensureToastContainer() {
    let c = document.getElementById('app-toast');
    if (c) return c;
    c = document.createElement('div');
    c.id = 'app-toast';
    c.style.cssText =
      'position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:9999;' +
      'display:flex;flex-direction:column;gap:8px;pointer-events:none';
    document.body.appendChild(c);
    return c;
  }
  function toast(msg, opts) {
    opts = opts || {};
    const c = ensureToastContainer();
    const t = document.createElement('div');
    const bg = opts.bg || '#0f766e';
    const icon = opts.icon || 'check_circle';
    t.style.cssText =
      'background:' + bg + ';color:white;padding:14px 22px;border-radius:14px;' +
      'font-family:"Plus Jakarta Sans",sans-serif;font-size:14px;font-weight:600;' +
      'box-shadow:0 20px 48px -12px rgba(0,0,0,.35);display:flex;align-items:center;' +
      'gap:10px;backdrop-filter:blur(8px);pointer-events:auto;' +
      'opacity:0;transform:translateY(-10px);transition:all .3s cubic-bezier(.22,1,.36,1)';
    t.innerHTML =
      '<span class="material-symbols-outlined" style="font-size:20px">' + icon + '</span>' +
      '<span>' + msg + '</span>';
    c.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(-10px)';
      setTimeout(() => t.remove(), 300);
    }, opts.duration || 2400);
  }
  window.app = window.app || {};
  window.app.toast = toast;

  // ─── State ────────────────────────────────────────────────────────────────
  function getState() {
    try {
      return JSON.parse(localStorage.getItem('8kajis-state') || '{}');
    } catch {
      return {};
    }
  }
  function setState(patch) {
    const s = Object.assign(getState(), patch);
    localStorage.setItem('8kajis-state', JSON.stringify(s));
    return s;
  }

  // ─── Cart counter badge ───────────────────────────────────────────────────
  function attachBadgeTo(btn, count, color) {
    if (!btn) return;
    let badge = btn.querySelector('.app-badge');
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'app-badge';
        badge.style.cssText =
          'position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;' +
          'padding:0 5px;background:' + (color || '#f59e0b') + ';color:white;' +
          'font-size:10px;font-weight:800;border-radius:999px;display:flex;' +
          'align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.2);' +
          'animation:appBadgePop .4s cubic-bezier(.22,1,.36,1)';
        btn.style.position = 'relative';
        btn.appendChild(badge);
      }
      badge.textContent = count > 99 ? '99+' : count;
    } else if (badge) {
      badge.remove();
    }
  }
  function refreshBadges() {
    const s = getState();
    document.querySelectorAll('[data-app="cart-btn"], button:has(.material-symbols-outlined)').forEach((btn) => {
      const sym = btn.querySelector('.material-symbols-outlined');
      if (!sym) return;
      const txt = sym.textContent.trim();
      if (txt === 'shopping_cart' || txt === 'shopping_bag') attachBadgeTo(btn, s.cart || 0, '#f59e0b');
      if (txt === 'favorite') attachBadgeTo(btn, s.wishlist || 0, '#ef4444');
    });
  }

  // ─── Add-to-cart buttons ──────────────────────────────────────────────────
  function wireAddToCart() {
    document.querySelectorAll('button, a').forEach((el) => {
      const txt = (el.textContent || '').trim().toLowerCase();
      if (
        txt.includes('pievienot grozam') ||
        txt.includes('add to cart') ||
        el.dataset.app === 'add-cart'
      ) {
        if (el.dataset.appWired) return;
        el.dataset.appWired = '1';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const s = getState();
          setState({ cart: (s.cart || 0) + 1 });
          refreshBadges();
          toast('Pievienots grozam', { icon: 'shopping_cart', bg: '#0f766e' });
        });
      }
    });
  }

  // ─── Wishlist heart toggle ────────────────────────────────────────────────
  function wireWishlistToggle() {
    document.querySelectorAll('button, a').forEach((el) => {
      const sym = el.querySelector('.material-symbols-outlined');
      if (!sym) return;
      const isHeart = sym.textContent.trim() === 'favorite';
      // Skip the navbar global-wishlist counter button
      const isNavbar = el.closest('header, nav');
      if (!isHeart || isNavbar) return;
      if (el.dataset.appWired) return;
      el.dataset.appWired = '1';
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const filled = sym.style.fontVariationSettings?.includes("'FILL' 1");
        const s = getState();
        if (filled) {
          sym.style.fontVariationSettings = "'FILL' 0, 'wght' 400";
          sym.style.color = '';
          setState({ wishlist: Math.max(0, (s.wishlist || 0) - 1) });
          toast('Noņemts no favorītiem', { icon: 'heart_broken', bg: '#475569' });
        } else {
          sym.style.fontVariationSettings = "'FILL' 1, 'wght' 400";
          sym.style.color = '#ef4444';
          setState({ wishlist: (s.wishlist || 0) + 1 });
          toast('Pievienots favorītiem', { icon: 'favorite', bg: '#dc2626' });
        }
        refreshBadges();
      });
    });
  }

  // ─── Form submit (any <form> on the page) ─────────────────────────────────
  function wireForms() {
    document.querySelectorAll('form').forEach((form) => {
      if (form.dataset.appWired) return;
      form.dataset.appWired = '1';
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Visual: replace form with success card
        const card = document.createElement('div');
        card.style.cssText =
          'padding:32px;background:linear-gradient(135deg,#10b981,#0d9488);color:white;' +
          'border-radius:24px;text-align:center;animation:appBadgePop .5s cubic-bezier(.22,1,.36,1);' +
          'box-shadow:0 24px 48px -12px rgba(15,118,110,.4)';
        card.innerHTML =
          '<div style="font-size:64px;line-height:1">✅</div>' +
          '<h3 style="font-size:24px;font-weight:800;margin:16px 0 8px">Paldies!</h3>' +
          '<p style="opacity:.9;font-size:15px">Ziņojums saņemts. Atbildam darba dienās 24h laikā.</p>' +
          '<button onclick="location.reload()" style="margin-top:20px;padding:10px 24px;background:white;color:#0d9488;font-weight:700;border-radius:999px;border:0;cursor:pointer">Aizvērt</button>';
        form.replaceWith(card);
        toast('Forma nosūtīta', { icon: 'mark_email_read', bg: '#10b981' });
      });
    });
  }

  // ─── Cart icon click → tiny demo cart drawer ──────────────────────────────
  function wireCartIcon() {
    document.querySelectorAll('button').forEach((btn) => {
      const sym = btn.querySelector('.material-symbols-outlined');
      if (!sym) return;
      const txt = sym.textContent.trim();
      if (txt !== 'shopping_cart' && txt !== 'shopping_bag') return;
      if (btn.dataset.appCartWired) return;
      btn.dataset.appCartWired = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const s = getState();
        const n = s.cart || 0;
        if (n === 0) {
          toast('Tavs grozs ir tukšs', { icon: 'shopping_cart', bg: '#475569' });
        } else {
          toast('Grozā: ' + n + ' ' + (n === 1 ? 'prece' : 'preces') + ' · Checkout drīzumā', {
            icon: 'shopping_cart',
            bg: '#0f766e',
            duration: 3200,
          });
        }
      });
    });
  }

  // ─── Language switcher persistence ────────────────────────────────────────
  function wireLanguageSwitcher() {
    const s = getState();
    const lang = s.lang || 'LV';
    document.querySelectorAll('.lang-switcher button').forEach((btn) => {
      const code = btn.textContent.trim();
      btn.classList.toggle('active', code === lang);
      if (btn.dataset.appWired) return;
      btn.dataset.appWired = '1';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.querySelectorAll('.lang-switcher button').forEach((x) => x.classList.remove('active'));
        btn.classList.add('active');
        setState({ lang: code });
        if (code !== 'LV') {
          toast('Tulkojums drīzumā · Translation coming soon (' + code + ')', {
            icon: 'translate',
            bg: '#0ea5e9',
          });
        }
      });
    });
  }

  // ─── Inject keyframes once ────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('app-styles')) return;
    const s = document.createElement('style');
    s.id = 'app-styles';
    s.textContent =
      '@keyframes appBadgePop{0%{transform:scale(0)}60%{transform:scale(1.25)}100%{transform:scale(1)}}' +
      '#app-toast > div{font-family:"Plus Jakarta Sans",sans-serif}';
    document.head.appendChild(s);
  }

  // ─── Init ────────────────────────────────────────────────────────────────
  function init() {
    injectStyles();
    refreshBadges();
    wireAddToCart();
    wireWishlistToggle();
    wireCartIcon();
    wireForms();
    wireLanguageSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
