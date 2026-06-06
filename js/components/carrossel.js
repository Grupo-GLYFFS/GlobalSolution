// js/components/carrossel.js
// Lógica genérica de carrosséis (navegação, botões e controles)
// Depende: Nenhum

// Inicializa a lógica de navegação horizontal (setas e scroll) para um carrossel específico
export function inicializarCarrossel(idCarrossel, idBotaoAnterior, idBotaoProximo, seletorDePontos = null) {
  const carrossel = document.getElementById(idCarrossel);
  const botaoAnterior = document.getElementById(idBotaoAnterior);
  const botaoProximo = document.getElementById(idBotaoProximo);
  const pontosIndicadores = seletorDePontos ? document.querySelectorAll(seletorDePontos) : [];

  if (carrossel && botaoAnterior && botaoProximo) {
    const atualizarControles = () => {
      botaoAnterior.disabled = carrossel.scrollLeft <= 10; 
      botaoProximo.disabled = carrossel.scrollLeft + carrossel.clientWidth >= carrossel.scrollWidth - 10;

      if (pontosIndicadores.length > 0) {
        const limiteMaximoDeRolagem = carrossel.scrollWidth - carrossel.clientWidth;
        const porcentagemRolada = limiteMaximoDeRolagem > 0 ? (carrossel.scrollLeft / limiteMaximoDeRolagem) : 0;
        let indiceAtivoDoPonto = Math.round(porcentagemRolada * (pontosIndicadores.length - 1));

        pontosIndicadores.forEach((pontoCorrente, indiceAtual) => {
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

    carrossel.addEventListener('scroll', atualizarControles);
    window.addEventListener('resize', atualizarControles);
    setTimeout(atualizarControles, 150);

    botaoAnterior.addEventListener('click', () => {
      const larguraDoItem = carrossel.firstElementChild ? carrossel.firstElementChild.offsetWidth + 24 : carrossel.clientWidth;
      carrossel.scrollBy({ left: -larguraDoItem, behavior: 'smooth' });
    });

    botaoProximo.addEventListener('click', () => {
      const larguraDoItem = carrossel.firstElementChild ? carrossel.firstElementChild.offsetWidth + 24 : carrossel.clientWidth;
      carrossel.scrollBy({ left: larguraDoItem, behavior: 'smooth' });
    });
    
    // Retorna a função de atualização para ser usada externamente (como em eventos de dropdown)
    return atualizarControles;
  }
  return null;
}