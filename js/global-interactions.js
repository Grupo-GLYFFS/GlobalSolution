// js/global-interactions.js
// Lógica global para interações de interface, como arraste de rolagens horizontais e carrossel de categorias
// Depende: Nenhum

// Inicializa todos os comportamentos de interface assim que o documento estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  console.log('DataOrbit - Página Carregada');

  const conteineresDeRolagemPorArraste = document.querySelectorAll('.drag-scroll');

  // Adiciona lógica de clique e arraste para cada contêiner com rolagem horizontal nativa
  conteineresDeRolagemPorArraste.forEach(conteinerCorrente => {
    let mouseEstaPressionado = false;
    let coordenadaXInicialDoMouse;
    let posicaoDeRolagemEsquerdaInicial;
    let usuarioEstaArrastando = false;

    // Previne o comportamento padrão de arrastar itens (como imagens)
    conteinerCorrente.addEventListener('dragstart', (eventoDeArraste) => {
      eventoDeArraste.preventDefault();
    });

    // Impede o clique acidental em links ou botões durante o movimento de arraste
    conteinerCorrente.addEventListener('click', (eventoDeClique) => {
      if (usuarioEstaArrastando) {
        eventoDeClique.preventDefault();
      }
    });

    // Registra o estado e coordenadas iniciais ao pressionar o botão do mouse
    conteinerCorrente.addEventListener('mousedown', (eventoDeMousePressionado) => {
      mouseEstaPressionado = true;
      usuarioEstaArrastando = false;
      
      conteinerCorrente.classList.add('cursor-grabbing');
      conteinerCorrente.classList.remove('cursor-pointer');
      conteinerCorrente.style.scrollSnapType = 'none';
      
      coordenadaXInicialDoMouse = eventoDeMousePressionado.pageX - conteinerCorrente.offsetLeft;
      posicaoDeRolagemEsquerdaInicial = conteinerCorrente.scrollLeft;
    });

    // Finaliza a ação de arraste caso o cursor saia dos limites do contêiner
    conteinerCorrente.addEventListener('mouseleave', () => {
      if (!mouseEstaPressionado) return;
      mouseEstaPressionado = false;
      
      conteinerCorrente.classList.remove('cursor-grabbing');
      conteinerCorrente.style.scrollSnapType = '';
    });

    // Finaliza a ação de arraste ao soltar o botão do mouse
    conteinerCorrente.addEventListener('mouseup', () => {
      mouseEstaPressionado = false;
      
      conteinerCorrente.classList.remove('cursor-grabbing');
      conteinerCorrente.style.scrollSnapType = '';
    });

    // Atualiza a posição de rolagem com base no movimento do mouse
    conteinerCorrente.addEventListener('mousemove', (eventoDeMovimentoDoMouse) => {
      if (!mouseEstaPressionado) return;
      
      eventoDeMovimentoDoMouse.preventDefault();
      
      const coordenadaXAtualDoMouse = eventoDeMovimentoDoMouse.pageX - conteinerCorrente.offsetLeft;
      const distanciaPercorrida = (coordenadaXAtualDoMouse - coordenadaXInicialDoMouse) * 2;
      
      // Identifica se o usuário realmente arrastou o mouse, ou foi apenas um clique
      if (Math.abs(distanciaPercorrida) > 5) {
        usuarioEstaArrastando = true;
      }
      
      conteinerCorrente.scrollLeft = posicaoDeRolagemEsquerdaInicial - distanciaPercorrida;
    });
  });

  const carrosselDeCategorias = document.getElementById('category-scroll');
  const botaoCategoriaAnterior = document.getElementById('cat-prev');
  const botaoCategoriaProxima = document.getElementById('cat-next');
  const pontosIndicadoresDeCategoria = document.querySelectorAll('#category-dots div');

  // Inicializa o funcionamento e a sincronização do carrossel de categorias, se os elementos existirem na página
  if (carrosselDeCategorias && botaoCategoriaAnterior && botaoCategoriaProxima) {
    
    // Atualiza o estado dos botões e dos indicadores visuais (pontinhos) de acordo com a rolagem
    const atualizarControlesDoCarrossel = () => {
      botaoCategoriaAnterior.disabled = carrosselDeCategorias.scrollLeft <= 10; 
      botaoCategoriaProxima.disabled = carrosselDeCategorias.scrollLeft + carrosselDeCategorias.clientWidth >= carrosselDeCategorias.scrollWidth - 10;

      if (pontosIndicadoresDeCategoria.length > 0) {
        const limiteMaximoDeRolagem = carrosselDeCategorias.scrollWidth - carrosselDeCategorias.clientWidth;
        const porcentagemRolada = limiteMaximoDeRolagem > 0 ? (carrosselDeCategorias.scrollLeft / limiteMaximoDeRolagem) : 0;
        
        let indiceAtivoDoPonto = Math.round(porcentagemRolada * (pontosIndicadoresDeCategoria.length - 1));

        pontosIndicadoresDeCategoria.forEach((pontoCorrente, indiceAtual) => {
          if (indiceAtual === indiceAtivoDoPonto) {
            pontoCorrente.classList.remove('bg-gray-200');
            pontoCorrente.classList.add('bg-gray-900');
          } else {
            pontoCorrente.classList.remove('bg-gray-900');
            pontoCorrente.classList.add('bg-gray-200');
          }
        });
      }
    };

    carrosselDeCategorias.addEventListener('scroll', atualizarControlesDoCarrossel);
    window.addEventListener('resize', atualizarControlesDoCarrossel);
    setTimeout(atualizarControlesDoCarrossel, 150);

    const botaoDropdownCategorias = document.getElementById('categoriesDropdownBtn');
    if (botaoDropdownCategorias) {
      botaoDropdownCategorias.addEventListener('click', () => {
        setTimeout(atualizarControlesDoCarrossel, 100);
      });
    }

    // Navega para o item anterior com transição suave
    botaoCategoriaAnterior.addEventListener('click', () => {
      const larguraDoItem = carrosselDeCategorias.firstElementChild ? carrosselDeCategorias.firstElementChild.offsetWidth + 24 : carrosselDeCategorias.clientWidth;
      carrosselDeCategorias.scrollBy({ left: -larguraDoItem, behavior: 'smooth' });
    });

    // Navega para o próximo item com transição suave
    botaoCategoriaProxima.addEventListener('click', () => {
      const larguraDoItem = carrosselDeCategorias.firstElementChild ? carrosselDeCategorias.firstElementChild.offsetWidth + 24 : carrosselDeCategorias.clientWidth;
      carrosselDeCategorias.scrollBy({ left: larguraDoItem, behavior: 'smooth' });
    });
  }
});