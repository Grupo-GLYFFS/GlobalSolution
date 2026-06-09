/**
 * Inicializa a funcionalidade de arrastar para rolar (drag-to-scroll) em elementos específicos.
 * Qualquer elemento com a classe '.drag-scroll' permitirá que o usuário clique e arraste
 * o mouse horizontalmente para rolar o conteúdo, melhorando a usabilidade em carrosseis.
 */
window.initializeDragScroll = function initializeDragScroll() {

  // Seleciona todos os contêineres que possuem a classe '.drag-scroll'
  const dragScrollContainers = document.querySelectorAll('.drag-scroll');

  // Itera sobre cada contêiner encontrado para aplicar a lógica individualmente
  dragScrollContainers.forEach(currentContainer => {

    // Variáveis de controle de estado para rastrear a ação do mouse
    let isMousePressed = false;

    // Guarda a posição horizontal inicial do mouse quando o clique começou
    let initialMouseXCoordinate;

    // Guarda a posição de rolagem horizontal atual do contêiner
    let initialLeftScrollPosition;

    // Flag para saber se o usuário está de fato arrastando (movendo) ou apenas clicando
    let isUserDragging = false;

    // Previne o comportamento padrão de "arrastar imagem/texto" do navegador para evitar bugs visuais
    currentContainer.addEventListener('dragstart', (dragEvent) => {

      dragEvent.preventDefault();

    });

    // Se o usuário estiver arrastando, impede o clique de acionar links ou botões internos
    currentContainer.addEventListener('click', (clickEvent) => {

      if (isUserDragging) {

        clickEvent.preventDefault();

      }

    });

    // Evento disparado quando o botão do mouse é pressionado (início do clique)
    currentContainer.addEventListener('mousedown', (mousePressEvent) => {

      isMousePressed = true;

      isUserDragging = false; // Reseta a flag de arrasto no início de cada clique

      // Muda o cursor visualmente para a mãozinha fechada "agarrando"
      currentContainer.classList.add('cursor-grabbing');

      currentContainer.classList.remove('cursor-pointer');

      // Desativa temporariamente o "snap" (alinhamento magnético) para permitir rolagem livre
      currentContainer.style.scrollSnapType = 'none';

      // Calcula a posição x inicial do mouse em relação ao elemento (e não à página inteira)
      initialMouseXCoordinate = mousePressEvent.pageX - currentContainer.offsetLeft;

      // Salva a posição exata de onde o scroll (barra de rolagem invisível) estava antes do arrasto
      initialLeftScrollPosition = currentContainer.scrollLeft;

    });

    // Evento disparado caso o mouse saia da área do contêiner enquanto ainda está pressionado
    currentContainer.addEventListener('mouseleave', () => {

      if (!isMousePressed) return; // Se não estava segurando o clique, não faz nada

      isMousePressed = false; // Cancela a ação de clique

      // Restaura o cursor normal e reativa o snap
      currentContainer.classList.remove('cursor-grabbing');

      currentContainer.style.scrollSnapType = '';

    });

    // Evento disparado quando o botão do mouse é solto (fim do clique/arrasto)
    currentContainer.addEventListener('mouseup', () => {

      isMousePressed = false; // Finaliza a ação

      // Restaura o cursor normal e reativa o snap magnético do CSS
      currentContainer.classList.remove('cursor-grabbing');

      currentContainer.style.scrollSnapType = '';

    });

    // Evento principal: disparado continuamente quando o mouse se move sobre o contêiner
    currentContainer.addEventListener('mousemove', (mouseMoveEvent) => {

      if (!isMousePressed) return; // Só faz algo se o botão do mouse estiver efetivamente pressionado

      mouseMoveEvent.preventDefault(); // Evita seleções indesejadas de texto ao redor

      // Calcula a nova posição X do mouse neste exato quadro
      const currentMouseXCoordinate = mouseMoveEvent.pageX - currentContainer.offsetLeft;

      // Calcula o quanto o mouse andou desde o clique inicial. Multiplica por 2 para acelerar a sensação de rolagem
      const traveledDistance = (currentMouseXCoordinate - initialMouseXCoordinate) * 2;

      // Se moveu mais de 5 pixels, considera como um "arrasto" de fato e não apenas um clique acidental que "escorregou"
      if (Math.abs(traveledDistance) > 5) {

        isUserDragging = true;

      }

      // Aplica a nova posição de rolagem subtraindo a distância percorrida da posição inicial
      currentContainer.scrollLeft = initialLeftScrollPosition - traveledDistance;

    });

  });

}