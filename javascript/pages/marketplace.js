/**
 * Script de inicialização da página principal do Marketplace.
 * Configura os carrosseis, injeta o menu/rodapé e carrega a vasta vitrine de produtos (satélites) na tela.
 */
document.addEventListener('DOMContentLoaded', () => {

  // Injeta o HTML da Navbar superior e do Footer no final da página
  window.injectComponents();

  // Como o marketplace precisa exibir muitos produtos para simular um catálogo de e-commerce real,
  // chamamos a função de renderização três vezes seguidas para triplicar o volume visual de cards.
  // O parâmetro '..' avisa a função que este HTML está na pasta interna /pages/,
  // logo as imagens devem usar o caminho relativo voltando uma pasta para não quebrarem.
  window.renderSatellites('satellite-cards-container', undefined, '..');

  window.renderSatellites('satellite-cards-container', undefined, '..');

  window.renderSatellites('satellite-cards-container', undefined, '..');

  console.log('DataOrbit - Marketplace Loaded via ES Modules');

  // Ativa a funcionalidade de arrasto fluido com o mouse (drag-to-scroll) nos carrosséis da página
  if (window.initializeDragScroll) {

    window.initializeDragScroll();

  }

  // Vincula as setas de navegação (prev/next) e os indicadores visuais ao carrossel de categorias da Navbar
  const updateCarouselControls = window.initializeCarousel ? window.initializeCarousel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div') : null;

  // Botão que abre a gaveta de categorias no topo do site
  const categoryDropdownButton = document.getElementById('categoriesDropdownBtn');

  // Hack de layout: Garante que o carrossel escondido no dropdown calcule seu próprio tamanho corretamente 
  // apenas após o usuário abri-lo (saindo do estado 'display: none')
  if (categoryDropdownButton && updateCarouselControls) {

    categoryDropdownButton.addEventListener('click', () => {

      setTimeout(updateCarouselControls, 100);

    });

  }

});