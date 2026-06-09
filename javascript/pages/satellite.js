/**
 * Substitui a imagem principal da galeria na página de Detalhes do Produto (Satélite)
 * pela imagem da miniatura em que o usuário acabou de clicar.
 * 
 * @param {string} imagePath - O caminho (URL) da nova imagem que deve ser exibida grande.
 * @param {HTMLElement} clickedButton - A referência do botão/miniatura HTML que sofreu o clique.
 */
function changeMainPreviewImage(imagePath, clickedButton) {

  // Troca a fonte (src) da imagem grandona pela imagem selecionada
  document.getElementById('main-preview-img').src = imagePath;

  // Seleciona todas as miniaturas (thumbnails) que compõem a pequena galeria
  const thumbnailButtons = document.querySelectorAll('.gallery-thumb');

  // Remove o estado de "selecionado/foco" de todas as miniaturas, deixando elas meio transparentes (opacity-70)
  thumbnailButtons.forEach(currentButton => {

    currentButton.classList.remove('ring-2', 'ring-black', 'opacity-100');

    currentButton.classList.add('opacity-70');

  });

  // Aplica o contorno escuro (ring) e remove a transparência apenas da miniatura que foi clicada agora
  clickedButton.classList.add('ring-2', 'ring-black', 'opacity-100');

  clickedButton.classList.remove('opacity-70');

}

/**
 * Função simplificada para rolar o carrossel específico de "Produtos Similares" 
 * quando não estamos utilizando a biblioteca completa de carrosséis da Navbar.
 * 
 * @param {number} scrollDirection - Recebe -1 para rolar para a esquerda (voltar), ou 1 para rolar para a direita (avançar).
 */
function scrollCarousel(scrollDirection) {

  const similarCarousel = document.getElementById('similar-scroll');

  if (similarCarousel) {

    // Calcula a quantidade de pixels a rolar. Ao usar `clientWidth`, ele rola exatamente uma "página inteira" de cards por clique.
    const scrollAmount = scrollDirection * similarCarousel.clientWidth;

    // Rola usando o motor nativo do navegador de forma fluida/animada ('smooth')
    similarCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

  }

}

// Torna as funções globais (window) para que o HTML consiga acessá-las diretamente pelos atributos onclick=""
window.changeMainPreviewImage = changeMainPreviewImage;

window.scrollCarousel = scrollCarousel;

// Quando a página é montada por completo...
document.addEventListener('DOMContentLoaded', () => {

  // Injeta Cabeçalho (Navbar) e Rodapé (Footer) na página
  window.injectComponents();

  // Pede ao sistema para pegar os dados JSON de satélites e renderizá-los como cards HTML dentro do carrossel "similar-scroll".
  // Note o último parâmetro: ele manda as classes exatas do Tailwind necessárias para esses cards terem um tamanho responsivo e caberem de 1 a 4 por tela dependendo do dispositivo.
  window.renderSatellites('similar-scroll', undefined, '..', 'w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start flex-shrink-0 flex flex-col transition-shadow hover:shadow-xl');

  console.log('DataOrbit - Satellite Loaded via ES Modules');

  // Ativa a capacidade de rolar os carrosséis usando o mouse como se estivesse num celular (arrastando e puxando)
  if (window.initializeDragScroll) {

    window.initializeDragScroll();

  }

  // Inicializa as setas e comportamentos dos carrosséis da página
  if (window.initializeCarousel) {

    // Configura o carrossel local de produtos similares
    window.initializeCarousel('similar-scroll', 'slider-prev', 'slider-next');

    // Configura o carrossel global de categorias (que vem oculto no Navbar)
    const updateCarouselControls = window.initializeCarousel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div');

    const categoryDropdownButton = document.getElementById('categoriesDropdownBtn');

    // Hack visual: obriga o carrossel do Navbar a recalcular seu próprio tamanho quando o botão de menu for clicado, pois um display: none bagunça a matemática de scroll
    if (categoryDropdownButton && updateCarouselControls) {

      categoryDropdownButton.addEventListener('click', () => {

        setTimeout(updateCarouselControls, 100);

      });

    }

  }

});