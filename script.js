(function () {
  try {
    // Particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      const particleCount = 60;
      const frag = document.createDocumentFragment();

      for (let i = 0; i < particleCount; i++) {
        const d = document.createElement('div');
        d.className = 'particle';
        d.style.left = Math.random() * 100 + '%';
        d.style.top = Math.random() * 100 + '%';
        d.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
        d.style.animationDuration = (Math.random() * 3 + 3).toFixed(2) + 's';
        d.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
        frag.appendChild(d);
      }
      particlesContainer.appendChild(frag);
    }

    // Show popup reason
    window.showReason = function (button, reason) {
      const popup = button.nextElementSibling;
      if (!popup) return;
      popup.textContent = reason;
      popup.classList.add('show');
      clearTimeout(popup._hideTimer);
      popup._hideTimer = setTimeout(() => popup.classList.remove('show'), 4200);
    };

    // Reveal love letter
    window.revealLetter = function () {
      const letter = document.getElementById('loveLetter');
      if (!letter) return;
      letter.classList.add('show');
      letter.setAttribute('aria-hidden', 'false');
      letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // Intersection observer to reveal sections when visible
    function setupSectionObserver() {
      const sections = document.querySelectorAll('.section');
      if (!sections || sections.length === 0) return;

      if (!('IntersectionObserver' in window)) {
        sections.forEach(s => s.classList.add('visible'));
        return;
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

      sections.forEach(section => observer.observe(section));
    }

    // Init
    window.addEventListener('DOMContentLoaded', () => {
      createParticles();
      setupSectionObserver();
    });
  } catch (err) {
    console.error('Page init error:', err);
    document.querySelectorAll('.section').forEach(s => s.classList.add('visible'));
  }
})();
