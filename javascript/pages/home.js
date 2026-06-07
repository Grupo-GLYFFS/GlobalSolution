document.addEventListener('DOMContentLoaded', () => {
  console.log('DataOrbit - Página Inicial Carregada via ES Modules');
  
  window.injectComponents();
  window.renderSatellites('satellite-cards-container', undefined, '.');

  if (window.init3DGlobe) {
    window.init3DGlobe('globe-canvas', 'sat-popup', '.');
  }
  
  window.inicializarArrasteRolagem();
  
  const atualizarControlesDoCarrossel = window.inicializarCarrossel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div');
  
  const botaoDropdownCategorias = document.getElementById('categoriesDropdownBtn');
  if (botaoDropdownCategorias && atualizarControlesDoCarrossel) {
    botaoDropdownCategorias.addEventListener('click', () => {
      setTimeout(atualizarControlesDoCarrossel, 100);
    });
  }
});



