/**
 * Utilitário global responsável por pegar a lista de dados puros em JSON (window.satellites)
 * e convertê-la em marcação HTML visual (Cards), injetando o resultado diretamente na tela.
 * 
 * @param {string} containerId - O ID da tag HTML (ex: uma div ou section) onde os cards serão descarregados.
 * @param {Array} satellitesList - O array de satélites a carregar. Se não for passado, usa a base de dados global padrão.
 * @param {string} basePath - O caminho relativo da pasta raiz, essencial para os caminhos de imagens não quebrarem.
 * @param {string} extraClasses - (Opcional) Classes do Tailwind injetadas em cada card para manipular seu tamanho no grid.
 */
window.renderSatellites = function renderSatellites(containerId, satellitesList = window.satellites, basePath = '.', extraClasses = '') {

  // Procura na página atual pela caixa (container) que vai abrigar os satélites
  const container = document.getElementById(containerId);

  // Se a página não tiver esse container (ex: página de Login não tem satélites), aborta a função silenciosamente
  if (!container) return;

  // Processo de Transformação (Mapping): Para cada satélite no JSON, chama a função que gera o HTML dele,
  // e depois junta todos os pedaços de HTML gerados numa única string longa (usando join(''))
  const cardsHtml = satellitesList.map(s => window.getSatelliteCardHtml(s, basePath, extraClasses)).join('');

  // Procura por um card fixo de "Promoção" especial que pode já existir dentro do container (ex: no Marketplace)
  const promoCard = container.querySelector('.promo-card');

  if (promoCard) {

    // Se o card promocional existir, insere os cards de satélite exatamente antes dele,
    // garantindo que a promoção fique sempre como o último item da lista
    promoCard.insertAdjacentHTML('beforebegin', cardsHtml);

    // Imediatamente aciona o tradutor para converter os textos do HTML que acabamos de injetar
    if (window.LanguageManager) { window.LanguageManager.setLanguage(window.LanguageManager.currentLanguage); }

  } else {

    // Se o container estiver vazio, apenas joga todos os cards lá dentro
    container.innerHTML = cardsHtml;

  }

  // Volta o foco do carrossel horizontal para o início (esquerda total) após renderizar
  container.scrollLeft = 0;

  // Aciona a tradução novamente para garantir consistência visual no novo HTML
  if (window.LanguageManager) { window.LanguageManager.setLanguage(window.LanguageManager.currentLanguage); }

}