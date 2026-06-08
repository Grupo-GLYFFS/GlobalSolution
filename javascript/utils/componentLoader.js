window.injectComponents = function injectComponents() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    const basePath = navbarPlaceholder.dataset.basepath || '.';
    navbarPlaceholder.outerHTML = window.getNavbarHtml(basePath);
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    const basePath = footerPlaceholder.dataset.basepath || '.';
    footerPlaceholder.outerHTML = window.getFooterHtml(basePath);
    if (window.initFooter) window.initFooter();
  }

  // Initialize Custom UI Components
  if (window.UIComponents) {
    setTimeout(() => {
      window.UIComponents.init();
    }, 50);
  }

  // Initialize Language Manager
  if (window.LanguageManager) {
    window.LanguageManager.init();
  }
}




