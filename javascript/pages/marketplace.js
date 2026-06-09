document.addEventListener('DOMContentLoaded', () => {

  window.injectComponents();

  window.renderSatellites('satellite-cards-container', undefined, '..');

  window.renderSatellites('satellite-cards-container', undefined, '..');

  window.renderSatellites('satellite-cards-container', undefined, '..');

  console.log('DataOrbit - Marketplace Carregado via ES Modules');

  window.inicializarArrasteRolagem();

  const atualizarControlesDoCarrossel = window.inicializarCarrossel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div');

  const botaoDropdownCategorias = document.getElementById('categoriesDropdownBtn');

  if (botaoDropdownCategorias && atualizarControlesDoCarrossel) {

    botaoDropdownCategorias.addEventListener('click', () => {

      setTimeout(atualizarControlesDoCarrossel, 100);

    });

  }

});