/* Yogic Threads — small progressive-enhancement script. No dependencies. */

(function () {
  'use strict';

  /* ---------- current year in footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- fade cards in as they scroll into view ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- placeholder for images that aren't added yet ----------
     Keeps the layout intact and names the missing file, so the site
     still looks deliberate before the photos are dropped into images/. */
  function placeholder(img) {
    var file = (img.getAttribute('src') || '').split('/').pop();
    var label = img.getAttribute('alt') || 'Photo';
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#d6d8fd"/><stop offset="1" stop-color="#b9a8e8"/>' +
      '</linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<text x="400" y="290" text-anchor="middle" font-family="Georgia,serif" ' +
      'font-size="34" fill="#4b3a6b">' + label.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</text>' +
      '<text x="400" y="336" text-anchor="middle" font-family="monospace" ' +
      'font-size="22" fill="#6d1fc0">images/' + file + '</text>' +
      '</svg>';
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  Array.prototype.forEach.call(document.images, function (img) {
    img.addEventListener('error', function () {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      placeholder(img);
    });
    if (img.complete && img.naturalWidth === 0 && !img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = '1';
      placeholder(img);
    }
  });

  /* ---------- contact form ----------
     Posts to Formspree via fetch when a real form ID is configured.
     Until then (or if the request fails) it falls back to a mailto: draft
     so no message is ever silently lost. */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var note = form.querySelector('.form-note');
  var EMAIL = 'rajnimundhra@gmail.com';

  /* Don't let anyone request a date that has already passed. Computed from the
     visitor's local clock, so it stays correct without ever being edited. */
  var dateField = form.querySelector('#date');
  if (dateField) {
    var now = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    dateField.min = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  }

  function setNote(html, cls) {
    if (!note) return;
    note.innerHTML = html;
    note.className = 'form-note' + (cls ? ' ' + cls : '');
  }

  function mailtoFallback(data) {
    var subject = 'Session request: ' + (data.interest || 'Yoga sessions');
    var body =
      'Name: ' + (data.name || '') + '\n' +
      'Email: ' + (data.email || '') + '\n' +
      'Interested in: ' + (data.interest || '') + '\n' +
      'Preferred date: ' + (data.date || 'no preference') + '\n' +
      'Preferred time: ' + (data.time || 'no preference') + '\n\n' +
      (data.message || '');
    window.location.href =
      'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (e) {
    var action = form.getAttribute('action') || '';
    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (v, k) { data[k] = v; });

    // Not configured yet -> open the visitor's email client instead.
    if (action.indexOf('YOUR_FORM_ID') !== -1 || !action) {
      e.preventDefault();
      setNote('Opening your email app&hellip; if nothing happens, write to <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.');
      mailtoFallback(data);
      return;
    }

    e.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    setNote('Sending your message&hellip;');

    fetch(action, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        setNote('Thank you! Your session request is on its way — I&rsquo;ll confirm by email within a day.', 'success');
      })
      .catch(function () {
        setNote('Sorry, that didn&rsquo;t send. Please email <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.', 'error');
      })
      .then(function () {
        if (button) { button.disabled = false; button.textContent = 'Request My Session'; }
      });
  });
})();
