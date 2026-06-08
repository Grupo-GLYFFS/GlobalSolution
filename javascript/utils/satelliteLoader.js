window.renderSatellites = function renderSatellites(containerId, satellitesList = window.satellites, basePath = '.', extraClasses = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Render all cards
  const cardsHtml = satellitesList.map(s => window.getSatelliteCardHtml(s, basePath, extraClasses)).join('');
  
  // If the container has a placeholder for dynamic cards, insert before the promo card
  const promoCard = container.querySelector('.promo-card');
  if (promoCard) {
    promoCard.insertAdjacentHTML('beforebegin', cardsHtml);
    if (window.LanguageManager) { window.LanguageManager.setLanguage(window.LanguageManager.currentLanguage); }
  } else {
    container.innerHTML = cardsHtml;
  }
  
  // Prevent browser scroll anchoring from jumping to the old promo card
  container.scrollLeft = 0;

  // Re-run language translation for new elements
  if (window.LanguageManager) { window.LanguageManager.setLanguage(window.LanguageManager.currentLanguage); }
}






