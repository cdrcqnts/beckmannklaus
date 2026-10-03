// Mobile menu, current year, and the mailto contact form. No dependencies.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('hauptmenue');
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // The year is baked in at build time; keep it current between deploys.
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Build a readable mailto link instead of the browser's raw text/plain post.
  var form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.reportValidity()) return;
      e.preventDefault();
      var f = form.elements;
      var subject = 'Anfrage: ' + f.thema.value + ' – ' + f.name.value;
      var body = f.nachricht.value + '\n\n' + f.name.value + '\n' + f.kontakt.value;
      window.location.href = 'mailto:' + form.dataset.mailto +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
