window.renderSatellites = function renderSatellites(containerId, satellitesList = window.satellites, basePath = '.', extraClasses = '') {

  const container = document.getElementById(containerId);

  if (!container) return;

  const cardsHtml = satellitesList.map(s => window.getSatelliteCardHtml(s, basePath, extraClasses)).join('');

  const promoCard = container.querySelector('.promo-card');

  if (promoCard) {

    promoCard.insertAdjacentHTML('beforebegin', cardsHtml);

    if (window.LanguageManager) { window.LanguageManager.setLanguage(window.LanguageManager.currentLanguage); }

  } else {

    container.innerHTML = cardsHtml;

  }

  container.scrollLeft = 0;

  if (window.LanguageManager) { window.LanguageManager.setLanguage(window.LanguageManager.currentLanguage); }

}