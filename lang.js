(function(){
  // Language toggle system
  // Elements with data-es attribute will swap between original (EN) and Spanish text
  const STORAGE_KEY = 'solvr-lang';

  function detectBrowserLang(){
    const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for(const l of langs){
      if(l && l.toLowerCase().startsWith('es')) return 'es';
      if(l && l.toLowerCase().startsWith('en')) return 'en';
    }
    return 'en';
  }

  function getStoredLang(){
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if(stored) return stored;
      return detectBrowserLang();
    } catch(e){ return detectBrowserLang(); }
  }

  function setStoredLang(lang){
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
  }

  function applyLang(lang){
    document.documentElement.lang = lang;
    const els = document.querySelectorAll('[data-es]');
    els.forEach(el => {
      if(!el.dataset.en){
        // Store original English content on first run
        el.dataset.en = el.innerHTML;
      }
      el.innerHTML = lang === 'es' ? el.dataset.es : el.dataset.en;
    });
    // Update toggle button text
    const btn = document.getElementById('langToggle');
    if(btn){
      btn.textContent = lang === 'es' ? 'EN' : 'ES';
      btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
    }
    setStoredLang(lang);
  }

  function toggleLang(){
    const current = getStoredLang();
    applyLang(current === 'en' ? 'es' : 'en');
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    const lang = getStoredLang();
    if(lang === 'es') applyLang('es');
    const btn = document.getElementById('langToggle');
    if(btn){
      btn.textContent = lang === 'es' ? 'EN' : 'ES';
      btn.addEventListener('click', toggleLang);
    }
  });
})();
