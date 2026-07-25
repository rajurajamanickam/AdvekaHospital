document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav.main');
  if (toggle && nav) {
    var closeMenu = function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    var openMenu = function () {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (nav.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    // close when tapping outside the open menu
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggle) {
        closeMenu();
      }
    });
    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); }
    });
    // if the viewport is resized back to desktop width, make sure menu isn't left open
    window.addEventListener('resize', function () {
      if (window.innerWidth > 880) { closeMenu(); }
    });
  }

  // Department filter (services page)
  var filterBar = document.querySelector('.filters');
  if (filterBar) {
    var buttons = filterBar.querySelectorAll('button');
    var cards = document.querySelectorAll('.dept-card');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var group = btn.dataset.group;
        cards.forEach(function (card) {
          if (group === 'all' || card.dataset.group === group) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Simple appointment form handling (no backend — front-end confirmation only)
  var form = document.querySelector('.appointment-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'Thanks — your request is noted. Our team will call you shortly to confirm.';
        note.style.color = '#0E4B48';
      }
      form.reset();
    });
  }
});
