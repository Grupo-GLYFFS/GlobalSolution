/**
 * Inicializa a funcionalidade de um carrossel horizontal, vinculando os botões de "Anterior" e "Próximo"
 * e atualizando os pontos indicadores (dots) com base na posição de rolagem atual.
 * 
 * @param {string} carouselId - O ID do elemento HTML que servirá de contêiner rolável.
 * @param {string} previousButtonId - O ID do botão que faz o carrossel voltar.
 * @param {string} nextButtonId - O ID do botão que faz o carrossel avançar.
 * @param {string|null} dotSelector - (Opcional) Um seletor CSS para os pontos indicadores de progresso.
 * @returns {Function|null} - Retorna a função que atualiza os controles, ou null se os elementos não forem encontrados.
 */
window.initializeCarousel = function initializeCarousel(carouselId, previousButtonId, nextButtonId, dotSelector = null) {

  // Captura as referências dos elementos essenciais no DOM
  const carouselElement = document.getElementById(carouselId);

  const previousButton = document.getElementById(previousButtonId);

  const nextButton = document.getElementById(nextButtonId);

  // Se um seletor para os pontinhos for passado, busca os elementos; caso contrário, usa um array vazio
  const indicatorDots = dotSelector ? document.querySelectorAll(dotSelector) : [];

  // Garante que a lógica só será executada se os três elementos principais (carrossel e 2 botões) existirem na página
  if (carouselElement && previousButton && nextButton) {

    // Função interna responsável por atualizar o estado visual dos controles do carrossel
    const updateCarouselControls = () => {

      // Desativa o botão "Anterior" se o carrossel já estiver totalmente rolado para o início (com uma folga de 10px)
      previousButton.disabled = carouselElement.scrollLeft <= 10; 

      // Desativa o botão "Próximo" se o carrossel já estiver totalmente rolado para o final
      // A conta é: (Posição Atual + Tamanho Visível da Tela) >= (Tamanho Total Oculto do Carrossel - 10px de folga)
      nextButton.disabled = carouselElement.scrollLeft + carouselElement.clientWidth >= carouselElement.scrollWidth - 10;

      // Se existirem pontos indicadores (dots), atualiza a cor deles para mostrar em qual aba ou página estamos
      if (indicatorDots.length > 0) {

        // Calcula qual é o limite máximo de rolagem possível em pixels (tamanho total menos o tamanho que já aparece na tela)
        const maximumScrollLimit = carouselElement.scrollWidth - carouselElement.clientWidth;

        // Calcula a porcentagem atual da rolagem, variando de 0 (início) a 1 (final)
        const scrolledPercentage = maximumScrollLimit > 0 ? (carouselElement.scrollLeft / maximumScrollLimit) : 0;

        // Baseado na porcentagem, determina o índice de qual ponto (dot) deve ser considerado o "ativo"
        let activeDotIndex = Math.round(scrolledPercentage * (indicatorDots.length - 1));

        // Percorre todos os pontos indicadores para atualizar as classes de estilo (usando TailwindCSS)
        indicatorDots.forEach((currentDot, currentIndex) => {

          if (currentIndex === activeDotIndex) {

            // Se for o ponto ativo atual, remove a cor clara e pinta de preto
            currentDot.classList.remove('bg-gray-100');

            currentDot.classList.add('bg-black');

          } else {

            // Caso contrário (está inativo), volta para a cor cinza claro
            currentDot.classList.remove('bg-black');

            currentDot.classList.add('bg-gray-100');

          }

        });

      }

    };

    // Escuta o evento de rolagem (scroll) nativo do contêiner para recalcular os botões e dots em tempo real
    carouselElement.addEventListener('scroll', updateCarouselControls);

    // Se a janela mudar de tamanho, a largura visível do carrossel muda, então precisamos recalcular as proporções
    window.addEventListener('resize', updateCarouselControls);

    // Força uma atualização inicial com um leve atraso (150ms) para dar tempo de o navegador renderizar todas as larguras corretamente
    setTimeout(updateCarouselControls, 150);

    // Configura o que acontece ao clicar no botão "Anterior"
    previousButton.addEventListener('click', () => {

      // Tenta pegar a largura real do primeiro item do carrossel (+ 24px de espaço/gap do CSS).
      // Se o carrossel estiver vazio, ele adota como padrão a largura inteira da tela visível.
      const itemWidth = carouselElement.firstElementChild ? carouselElement.firstElementChild.offsetWidth + 24 : carouselElement.clientWidth;

      // Rola para a esquerda passando um valor negativo (-itemWidth) de forma suave e animada ('smooth')
      carouselElement.scrollBy({ left: -itemWidth, behavior: 'smooth' });

    });

    // Configura o que acontece ao clicar no botão "Próximo"
    nextButton.addEventListener('click', () => {

      const itemWidth = carouselElement.firstElementChild ? carouselElement.firstElementChild.offsetWidth + 24 : carouselElement.clientWidth;

      // Rola para a direita de forma suave
      carouselElement.scrollBy({ left: itemWidth, behavior: 'smooth' });

    });

    // Retorna a própria função interna caso outro script precise chamá-la manualmente no futuro (útil ao injetar novos itens via JS)
    return updateCarouselControls;

  }

  // Retorna nulo se o elemento principal ou botões não estiverem na página
  return null;

}