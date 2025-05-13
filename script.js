// 粒子背景初始化
particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/gh/VincentGarreau/particles.js/particles.json');

// 主题切换
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeBtn.onclick = () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeIcon.src = isDark ? 'assets/moon.svg' : 'assets/sun.svg';
};

// 语言切换
const langBtn = document.getElementById('lang-toggle');
const langIcon = document.getElementById('lang-icon');
let currentLang = 'en';

langBtn.onclick = () => {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  langIcon.src = currentLang === 'en' ? 'assets/en.svg' : 'assets/zh.svg';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[currentLang];
  });
};
