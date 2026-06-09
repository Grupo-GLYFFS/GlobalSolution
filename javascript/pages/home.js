/**
 * Script de inicialização da página principal (Home).
 * Espera o HTML ser totalmente carregado para depois buscar e instanciar
 * os componentes visuais e as funcionalidades 3D na tela.
 */
document.addEventListener('DOMContentLoaded', () => {

  console.log('DataOrbit - Home Page Loaded via ES Modules');

  // Injeta a Navbar e o Footer na página usando a função global agregadora de componentes
  window.injectComponents();

  // Renderiza a lista de cards de satélites (limitados ou todos) no contêiner designado no HTML
  window.renderSatellites('satellite-cards-container', undefined, '.');

  // Inicializa o globo 3D interativo se a função correspondente já estiver carregada na memória do navegador
  if (window.initialize3DGlobe) {

    window.initialize3DGlobe('globe-canvas', 'sat-popup', '.');

  }

  // Ativa a funcionalidade de "clicar e arrastar" horizontalmente nos carrosséis compatíveis
  if (window.initializeDragScroll) {

    window.initializeDragScroll();

  }

  // Inicializa a navegação do carrossel de categorias (vinculando botões de avançar/voltar e bolinhas indicadoras)
  // Salva a função retornada numa variável, pois precisaremos recalcular o carrossel sob demanda
  const updateCarouselControls = window.initializeCarousel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div');

  // Captura o botão que abre o menu dropdown de Categorias na Navbar
  const categoryDropdownButton = document.getElementById('categoriesDropdownBtn');

  // Hack visual crucial: Se o carrossel de categorias fica dentro de um menu Dropdown oculto (display: none),
  // o navegador não consegue calcular a largura física dele no momento em que a página carrega.
  // Portanto, forçamos um recalculo da barra de rolagem exatamente quando o usuário clica para abrir o menu.
  if (categoryDropdownButton && updateCarouselControls) {

    categoryDropdownButton.addEventListener('click', () => {

      // Atraso de 100ms para dar tempo do menu sair do "display: none" e renderizar sua largura real na tela
      setTimeout(updateCarouselControls, 100);

    });

  }

});