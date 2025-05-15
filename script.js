// Initialize particles background with custom configuration
document.addEventListener('DOMContentLoaded', () => {
  // Particles.js initialization with custom configuration
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#4a6bff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#4a6bff',
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

  // Theme toggle functionality
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark');
    themeIcon.src = 'assets/moon.png';
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeIcon.src = isDark ? 'assets/moon.png' : 'assets/sun.png';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update particles color based on theme
    const particleColor = isDark ? '#6c8fff' : '#4a6bff';
    pJSDom[0].pJS.particles.color.value = particleColor;
    pJSDom[0].pJS.particles.line_linked.color = particleColor;
    pJSDom[0].pJS.fn.particlesRefresh();
  });

  // Language toggle functionality
  const langBtn = document.getElementById('lang-toggle');
  const langIcon = document.getElementById('lang-icon');
  let currentLang = localStorage.getItem('language') || 'en';
  
  // Apply saved language preference
  if (currentLang === 'zh') {
    langIcon.src = 'assets/zh.svg';
    updateLanguage(currentLang);
  } else {
    updateLanguage(currentLang);
  }

  // 更新后的语言切换逻辑
  langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'zh' : 'en';
      langIcon.src = currentLang === 'en' ? langIcon.dataset.zh : langIcon.dataset.en;
      updateLanguage(currentLang);
      localStorage.setItem('language', currentLang);
  });
  
  // 新增初始化逻辑
  langIcon.src = currentLang === 'en' ? langIcon.dataset.zh : langIcon.dataset.en;

  function updateLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.dataset[lang];
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });

  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Add scroll animations
  // Scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});


// 添加加载动画初始化逻辑
function initLoadingAnimation() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  
  const chars = ['H', 'HE', 'HEN', 'HENG', 'HENG C', 'HENG CH', 'HENG CHE', 'HENG CHEN','HENG CHENG'];
  
  chars.forEach((text, index) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.style.animation = `revealText 0.5s ease forwards`;
      div.textContent = text;
      overlay.appendChild(div);
    }, index * 250);
  });

  document.body.prepend(overlay);
  document.body.style.overflow = 'hidden';

  // 动画完成处理
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = '';
    document.querySelector('.name').style.opacity = '1';
  }, 3500);
}

// 立即执行加载动画
initLoadingAnimation();

