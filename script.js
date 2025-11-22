// Initialize
document.addEventListener('DOMContentLoaded', () => {

  // Theme Management
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    themeIcon.src = theme === 'dark' ? 'assets/moon.png' : 'assets/sun.png';
    localStorage.setItem('theme', theme);
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

  document.querySelectorAll('.section-card, .hero-content > *').forEach(section => {
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

          setTimeout(() => overlay.remove(), 1000);
        }, 2000);
      }, 500);
    }, 1000);
  }

  initLoading();

  // Interactive Elements Logic

  // Interactive Background
  const bgContainer = document.querySelector('.gradient-background');
  if (bgContainer) {
    bgContainer.innerHTML = '';
    const orb1 = document.createElement('div'); orb1.className = 'orb orb-1';
    const orb2 = document.createElement('div'); orb2.className = 'orb orb-2';
    const orb3 = document.createElement('div'); orb3.className = 'orb orb-3';
    bgContainer.appendChild(orb1);
    bgContainer.appendChild(orb2);
    bgContainer.appendChild(orb3);

    const orbs = document.querySelectorAll('.orb');

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20; // Different speeds for depth
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;

        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });
  }

  // Spotlight Effect
  const spotlightElements = document.querySelectorAll('.section-card, .project, .experience-item');

  spotlightElements.forEach(el => {
    el.classList.add('spotlight');
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.cta-button');

  magneticBtns.forEach(btn => {
    btn.classList.add('magnetic-btn');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
});
