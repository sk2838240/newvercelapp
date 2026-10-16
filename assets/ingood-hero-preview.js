/*!
 * InGood hero app preview  ·  v1.0
 * Vanilla JS, no dependencies, no build step.
 *
 * Usage: put <div class="igp" data-igp></div> where the old hero image was and
 * load this file with `defer`. Every [data-igp] element is upgraded on
 * DOMContentLoaded. API (optional): window.InGoodHeroPreview.init(el) returns
 * { destroy() }.
 *
 * What runs in JS: one requestAnimationFrame loop that drives the amount, the
 * slider and one live bar. It only runs while the preview is on screen, the tab
 * is visible and the user has not asked for reduced motion. The partner marquee
 * and the floating cards are pure CSS animations (paused via a class).
 */
(function () {
  'use strict';

  var MAX = 800;                    // slider range: ₹0 – ₹800 (matches the site's comfort zone)
  var STEP = 10;                    // amount counter granularity
  var PATH = [350, 800, 0, 600, 150, 750]; // amounts the demo slides through, in order
  var MOVE = 1500;                  // ms to glide between two amounts
  var HOLD = 800;                   // ms to rest on an amount
  var HOLD_ZERO = 1700;             // longer rest on ₹0 so "skip" registers
  var STATIC_AMOUNT = 350;          // what reduced-motion users see

  var AMCS = [
    ['HDFC Mutual Fund', 'HDFC', 1],
    ['Kotak Mutual Fund', 'K'],
    ['Axis Mutual Fund', 'A'],
    ['Aditya Birla Sun Life', 'ABSL', 1],
    ['ICICI Prudential', 'ICICI', 1]
  ];
  var MONTHS = [['Jan', 250], ['Feb', 180], ['Mar', 0], ['Apr', 320], ['May', 280], ['Jun', 350]];

  var ARIA_LABEL =
    'InGood app preview: the monthly investment slider moves anywhere between ₹0 and ₹800, ' +
    'and a month can be skipped without breaking your streak.';

  var nf = null;
  try { nf = new Intl.NumberFormat('en-IN'); } catch (e) { nf = null; }
  function money(n) { return '₹' + (nf ? nf.format(n) : String(n)); }

  /* ---------------------------------------------------------------- markup */
  function marqueeSet(hidden) {
    var h = '<div class="igp__set"' + (hidden ? ' aria-hidden="true"' : '') + '>';
    for (var i = 0; i < AMCS.length; i++) {
      var a = AMCS[i];
      h += '<span class="igp__item"><span class="igp__logo-box' + (a[2] ? ' igp__logo-box--sm' : '') + '">' +
        a[1] + '</span>' + a[0] + '</span>';
    }
    return h + '</div>';
  }

  function bars() {
    var h = '';
    for (var i = 0; i < MONTHS.length; i++) {
      var v = MONTHS[i][1];
      var ratio = v ? (v / MAX) : 0.05;
      h += '<div class="igp__col"><div class="igp__barwrap"><div class="igp__bar' + (v ? '' : ' igp__bar--skip') +
        '" style="--h:' + ratio.toFixed(3) + ';--i:' + i + '"></div></div><span class="igp__ml">' + MONTHS[i][0] + '</span></div>';
    }
    return h + '<div class="igp__col"><div class="igp__barwrap"><div class="igp__bar igp__bar--now"></div></div>' +
      '<span class="igp__ml igp__ml--now">Now</span></div>';
  }

  var NAV = [
    ['Home', '<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>', 1],
    ['Portfolio', '<rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5"/>'],
    ['Goals', '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>'],
    ['Profile', '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.5 3.6-5.2 7-5.2s6.2 1.7 7 5.2"/>']
  ];
  function nav() {
    var h = '<div class="igp__nav igp__full">';
    for (var i = 0; i < NAV.length; i++) {
      h += '<span class="igp__ni' + (NAV[i][2] ? ' igp__ni--on' : '') + '"><svg viewBox="0 0 24 24">' + NAV[i][1] +
        '</svg>' + NAV[i][0] + '</span>';
    }
    return h + '</div>';
  }

  function template() {
    return '' +
      '<div class="igp__glow"></div>' +
      '<div class="igp__phone"><div class="igp__screen">' +
        '<i class="igp__island"></i>' +
        '<div class="igp__head">' +
          '<span class="igp__logo"><span class="igp__mark"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></span><span class="igp__brand">InGood</span></span>' +
          '<span class="igp__tag">Flex SIP</span>' +
        '</div>' +
        '<div class="igp__hero">' +
          '<div class="igp__eyebrow">This month · your call</div>' +
          '<div class="igp__amount" data-igp-amount>' + money(STATIC_AMOUNT) + '</div>' +
          '<div class="igp__status"><span class="igp__s igp__s--on">Goes straight to your fund</span><span class="igp__s igp__s--skip">Skipped · your streak stays alive</span></div>' +
        '</div>' +
        '<div class="igp__slider" data-igp-slider><div class="igp__rail"><div class="igp__track"></div><div class="igp__fill"></div><div class="igp__mover"><div class="igp__thumb"></div></div></div></div>' +
        '<div class="igp__scale"><span>₹0</span><span>' + money(MAX) + '</span></div>' +
        '<div class="igp__btn igp__full" data-igp-btn>Invest ' + money(STATIC_AMOUNT) + '</div>' +
        '<div class="igp__zone igp__full"><div><div class="igp__zl">Your comfort zone</div><div class="igp__zv">₹0 – ' + money(MAX) + '</div></div><span class="igp__zt"></span></div>' +
        '<div class="igp__bars igp__full"><div class="igp__bt">Your last 6 months</div><div class="igp__chart" data-igp-chart>' + bars() + '</div></div>' +
        '<div class="igp__partners"><div class="igp__ptitle">Trusted Partners. Secure Platform.</div><div class="igp__psub">Built around established fund houses</div>' +
          '<div class="igp__marquee"><div class="igp__belt">' + marqueeSet(false) + marqueeSet(true) + '</div></div></div>' +
        nav() +
      '</div></div>' +
      '<div class="igp__card igp__card--a"><span class="igp__ci"><svg viewBox="0 0 24 24"><path d="M12 3c.5 3-3 4.5-3 8a3 3 0 0 0 6 0c0-1-.4-1.7-1-2.5 2.2.8 4 3 4 5.5a6 6 0 0 1-12 0c0-5 4-6.5 6-11z"/></svg></span><span><span class="igp__cl">Streak</span><span class="igp__cv">6 months</span></span></div>' +
      '<div class="igp__card igp__card--b"><span class="igp__ci"><svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></span><span><span class="igp__cl">Invested</span><span class="igp__cv">' + money(3150) + '</span></span></div>';
  }

  /* ------------------------------------------------------------- timeline */
  var SEGS = (function () {
    var out = [], total = 0;
    for (var i = 0; i < PATH.length; i++) {
      var to = PATH[(i + 1) % PATH.length];
      var hold = to === 0 ? HOLD_ZERO : HOLD;
      out.push({ from: PATH[i], to: to, hold: hold });
      total += MOVE + hold;
    }
    out.total = total;
    return out;
  })();

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function sample(t) {
    t = t % SEGS.total;
    for (var i = 0; i < SEGS.length; i++) {
      var s = SEGS[i];
      if (t < MOVE) return s.from + (s.to - s.from) * ease(t / MOVE);
      t -= MOVE;
      if (t < s.hold) return s.to;
      t -= s.hold;
    }
    return PATH[0];
  }

  /* ------------------------------------------------------------- instance */
  function init(host) {
    if (!host || host.__igp) return host && host.__igp;

    var original = host.innerHTML;     // e.g. a <noscript> fallback; restored by destroy()
    host.innerHTML = template();
    host.setAttribute('role', 'img');
    host.setAttribute('aria-label', ARIA_LABEL);

    var amountEl = host.querySelector('[data-igp-amount]');
    var btnEl = host.querySelector('[data-igp-btn]');
    var sliderEl = host.querySelector('[data-igp-slider]');
    var chartEl = host.querySelector('[data-igp-chart]');

    var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reduced = !!(mq && mq.matches);
    var visible = true;
    var running = false;
    var raf = 0;
    var last = 0;
    var clock = 0;
    var lastAmt = -1;
    var lastP = -1;
    var io = null;

    function render(p) {
      var ratio = p / MAX;
      if (Math.abs(ratio - lastP) > 0.0004) {
        lastP = ratio;
        sliderEl.style.setProperty('--p', ratio.toFixed(4));
      }
      var amt = Math.round(p / STEP) * STEP;
      if (amt !== lastAmt) {
        lastAmt = amt;
        amountEl.textContent = money(amt);
        if (btnEl) btnEl.textContent = amt ? 'Invest ' + money(amt) : 'Skip this month';
        if (chartEl) chartEl.style.setProperty('--b', (amt / MAX).toFixed(3));
        host.classList.toggle('igp--skip', amt === 0);
      }
    }

    function tick(now) {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      // clamp dt so returning to the tab / scrolling back never makes the amount jump
      var dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      clock += dt;
      render(sample(clock));
    }

    function start() {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function update() {
      var shouldRun = visible && !reduced && !document.hidden;
      host.classList.toggle('igp--paused', !shouldRun);   // pauses CSS animations too
      if (reduced) { stop(); render(STATIC_AMOUNT); return; }
      if (shouldRun) start(); else stop();
    }

    function onMq() { reduced = !!mq.matches; update(); }
    function onVis() { update(); }

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        visible = entries[entries.length - 1].isIntersecting;
        update();
      }, { rootMargin: '80px 0px' });
      io.observe(host);
    }
    document.addEventListener('visibilitychange', onVis);
    if (mq) {
      if (mq.addEventListener) mq.addEventListener('change', onMq);
      else if (mq.addListener) mq.addListener(onMq);
    }

    render(reduced ? STATIC_AMOUNT : PATH[0]);
    update();

    var api = {
      destroy: function () {
        stop();
        if (io) io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        if (mq) {
          if (mq.removeEventListener) mq.removeEventListener('change', onMq);
          else if (mq.removeListener) mq.removeListener(onMq);
        }
        host.classList.remove('igp--paused', 'igp--skip');
        host.removeAttribute('role');
        host.removeAttribute('aria-label');
        host.innerHTML = original;
        host.__igp = null;
      }
    };
    host.__igp = api;
    return api;
  }

  function initAll(root) {
    var nodes = (root || document).querySelectorAll('[data-igp]');
    for (var i = 0; i < nodes.length; i++) init(nodes[i]);
  }

  window.InGoodHeroPreview = { init: init, initAll: initAll };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { initAll(); });
  else initAll();
})();
