(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var menu = document.querySelector('.menu');
  var links = document.getElementById('links');
  if (menu && links) {
    menu.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var copy = document.getElementById('copy');
  var mail = document.getElementById('mail');
  var note = document.getElementById('copied');
  if (copy && mail) {
    copy.addEventListener('click', function () {
      var text = mail.textContent.trim();
      function done(ok) { note.textContent = ok ? 'Email address copied.' : 'Copy failed. Please select the address above.'; }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        var r = document.createRange(); r.selectNodeContents(mail);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try { done(document.execCommand('copy')); } catch (err) { done(false); }
      }
    });
  }

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.card, .steps li, .path li, .skills > div').forEach(function (el) {
      el.classList.add('reveal'); io.observe(el);
    });
  }
})();
