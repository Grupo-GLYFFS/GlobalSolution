// js/utils/themeManager.js

// Executado imediatamente para evitar FOUC
(function() {
  function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const theme = getTheme();
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

// API global para manipulação do tema a partir da UI
window.ThemeManager = {
  getTheme: function() {
    return localStorage.getItem('theme') || 'system';
  },
  
  setTheme: function(theme) {
    if (theme === 'system') {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Dispara evento customizado para outros componentes (como o Footer) poderem atualizar sua UI
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  },

  // Método auxiliar para obter o estado resolvido (se é de fato escuro no momento)
  isDarkResolved: function() {
    return document.documentElement.classList.contains('dark');
  }
};

// Escutar mudanças no sistema (se estiver usando 'system')
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (window.ThemeManager.getTheme() === 'system') {
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});
