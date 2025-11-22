// Initialize particles background with custom configuration
document.addEventListener('DOMContentLoaded', () => {
  // Particles.js initialization
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#6c5ce7' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#6c5ce7',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // Theme Management
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    themeIcon.src = theme === 'dark' ? 'assets/moon.png' : 'assets/sun.png';
    localStorage.setItem('theme', theme);

    // Update particles color
    if (window.pJSDom && window.pJSDom.length > 0) {
      const color = theme === 'dark' ? '#a29bfe' : '#6c5ce7';
      const pJS = window.pJSDom[0].pJS;
      pJS.particles.color.value = color;
      pJS.particles.line_linked.color = color;
      pJS.fn.particlesRefresh();
    }
  }

  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme('dark');
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });

  // Language Management
  const langBtn = document.getElementById('lang-toggle');
  const langIcon = document.getElementById('lang-icon');
  let currentLang = localStorage.getItem('language') || 'en';

  function updateLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.textContent = text;
    });

    langIcon.src = lang === 'en' ? langIcon.dataset.zh : langIcon.dataset.en;
    localStorage.setItem('language', lang);
  }

  // Initialize language
  updateLanguage(currentLang);

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateLanguage(currentLang);
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Footer Year
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Intersection Observer for Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-card').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });

  // Loading Animation - Curtain Reveal
  function initLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';

    const text = document.createElement('div');
    text.className = 'intro-text';
    text.textContent = 'Hello';

    const line = document.createElement('div');
    line.className = 'intro-line';

    overlay.appendChild(text);
    overlay.appendChild(line);
    document.body.prepend(overlay);
    document.body.style.overflow = 'hidden';

    // Animation Sequence
    setTimeout(() => {
      text.style.opacity = '0';
      text.style.transform = 'translateY(-20px)';
      text.style.transition = 'all 0.5s ease';

      setTimeout(() => {
        text.textContent = "I'm Heng Cheng";
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';

        setTimeout(() => {
          overlay.classList.add('hidden');
          document.body.style.overflow = '';

          // Trigger hero animations
          const heroTitle = document.querySelector('.hero-title');
          const heroSubtitle = document.querySelector('.hero-subtitle');

          if (heroTitle) {
            heroTitle.style.animation = 'none';
            heroTitle.offsetHeight; /* trigger reflow */
            heroTitle.style.animation = 'fadeInUp 1s forwards 0.3s';
            heroTitle.style.opacity = '0';
          }

          if (heroSubtitle) {
            heroSubtitle.style.animation = 'none';
            heroSubtitle.offsetHeight; /* trigger reflow */
            heroSubtitle.style.animation = 'fadeInUp 1s forwards 0.5s';
            heroSubtitle.style.opacity = '0';
          }

          setTimeout(() => overlay.remove(), 1000);
        }, 2000);
      }, 500);
    }, 1000);
  }

  initLoading();
});
