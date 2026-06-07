// js/pages/marketplace.js
// Ponto de entrada e inicialização para a página do Marketplace
// Depende: arrastar-rolagem.js, carrossel.js

document.addEventListener('DOMContentLoaded', () => {
  window.injectComponents();
  // Render satellites multiple times to simulate 20 items
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


