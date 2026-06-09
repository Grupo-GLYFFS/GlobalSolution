window.inicializarArrasteRolagem = function inicializarArrasteRolagem() {

  const conteineresDeRolagemPorArraste = document.querySelectorAll('.drag-scroll');

  conteineresDeRolagemPorArraste.forEach(conteinerCorrente => {

    let mouseEstaPressionado = false;

    let coordenadaXInicialDoMouse;

    let posicaoDeRolagemEsquerdaInicial;

    let usuarioEstaArrastando = false;

    conteinerCorrente.addEventListener('dragstart', (eventoDeArraste) => {

      eventoDeArraste.preventDefault();

    });

    conteinerCorrente.addEventListener('click', (eventoDeClique) => {

      if (usuarioEstaArrastando) {

        eventoDeClique.preventDefault();

      }

    });

    conteinerCorrente.addEventListener('mousedown', (eventoDeMousePressionado) => {

      mouseEstaPressionado = true;

      usuarioEstaArrastando = false;

      conteinerCorrente.classList.add('cursor-grabbing');

      conteinerCorrente.classList.remove('cursor-pointer');

      conteinerCorrente.style.scrollSnapType = 'none';

      coordenadaXInicialDoMouse = eventoDeMousePressionado.pageX - conteinerCorrente.offsetLeft;

      posicaoDeRolagemEsquerdaInicial = conteinerCorrente.scrollLeft;

    });

    conteinerCorrente.addEventListener('mouseleave', () => {

      if (!mouseEstaPressionado) return;

      mouseEstaPressionado = false;

      conteinerCorrente.classList.remove('cursor-grabbing');

      conteinerCorrente.style.scrollSnapType = '';

    });

    conteinerCorrente.addEventListener('mouseup', () => {

      mouseEstaPressionado = false;

      conteinerCorrente.classList.remove('cursor-grabbing');

      conteinerCorrente.style.scrollSnapType = '';

    });

    conteinerCorrente.addEventListener('mousemove', (eventoDeMovimentoDoMouse) => {

      if (!mouseEstaPressionado) return;

      eventoDeMovimentoDoMouse.preventDefault();

      const coordenadaXAtualDoMouse = eventoDeMovimentoDoMouse.pageX - conteinerCorrente.offsetLeft;

      const distanciaPercorrida = (coordenadaXAtualDoMouse - coordenadaXInicialDoMouse) * 2;

      if (Math.abs(distanciaPercorrida) > 5) {

        usuarioEstaArrastando = true;

      }

      conteinerCorrente.scrollLeft = posicaoDeRolagemEsquerdaInicial - distanciaPercorrida;

    });

  });

}