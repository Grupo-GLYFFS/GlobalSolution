function alterarImagemPrincipal(caminhoImagem, botaoClicado) {

  document.getElementById('main-preview-img').src = caminhoImagem;

  const botoesMiniatura = document.querySelectorAll('.gallery-thumb');

  botoesMiniatura.forEach(botaoCorrente => {

    botaoCorrente.classList.remove('ring-2', 'ring-black', 'opacity-100');

    botaoCorrente.classList.add('opacity-70');

  });

  botaoClicado.classList.add('ring-2', 'ring-black', 'opacity-100');

  botaoClicado.classList.remove('opacity-70');

}

function rolarCarrossel(direcaoRolagem) {

  const carrosselSimilares = document.getElementById('similar-scroll');

  if (carrosselSimilares) {

    const quantidadeRolagem = direcaoRolagem * carrosselSimilares.clientWidth;

    carrosselSimilares.scrollBy({ left: quantidadeRolagem, behavior: 'smooth' });

  }

}

window.alterarImagemPrincipal = alterarImagemPrincipal;

window.rolarCarrossel = rolarCarrossel;

document.addEventListener('DOMContentLoaded', () => {

  window.injectComponents();

  window.renderSatellites('similar-scroll', undefined, '..', 'w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start flex-shrink-0 flex flex-col transition-shadow hover:shadow-xl');

  console.log('DataOrbit - Satellite Loaded via ES Modules');

  window.inicializarArrasteRolagem();

  window.inicializarCarrossel('similar-scroll', 'slider-prev', 'slider-next');

  const atualizarControlesDoCarrossel = window.inicializarCarrossel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div');

  const botaoDropdownCategorias = document.getElementById('categoriesDropdownBtn');

  if (botaoDropdownCategorias && atualizarControlesDoCarrossel) {

    botaoDropdownCategorias.addEventListener('click', () => {

      setTimeout(atualizarControlesDoCarrossel, 100);

    });

  }

});