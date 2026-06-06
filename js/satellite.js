// js/satellite.js
// Lógica para galeria de imagens e carrossel de satélites similares
// Depende: Nenhum

// Altera a imagem principal exibida na galeria do satélite
function alterarImagemPrincipal(caminhoImagem, botaoClicado) {
  document.getElementById('main-preview-img').src = caminhoImagem;

  const botoesMiniatura = document.querySelectorAll('.gallery-thumb');

  botoesMiniatura.forEach(botaoCorrente => {
    botaoCorrente.classList.remove('ring-2', 'ring-gray-900', 'opacity-100');
    botaoCorrente.classList.add('opacity-70');
  });

  botaoClicado.classList.add('ring-2', 'ring-gray-900', 'opacity-100');
  botaoClicado.classList.remove('opacity-70');
}

// Rola o carrossel de satélites similares para a esquerda ou direita
function rolarCarrossel(direcaoRolagem) {
  const carrosselSimilares = document.getElementById('similar-scroll');

  if (carrosselSimilares) {
    const quantidadeRolagem = direcaoRolagem * carrosselSimilares.clientWidth;
    carrosselSimilares.scrollBy({ left: quantidadeRolagem, behavior: 'smooth' });
  }
}

// Configura os botões de navegação e limites do carrossel ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const carrosselSimilares = document.getElementById('similar-scroll');
  const botaoAnterior = document.getElementById('slider-prev');
  const botaoProximo = document.getElementById('slider-next');

  if (carrosselSimilares && botaoAnterior && botaoProximo) {
    // Atualiza o estado habilitado/desabilitado dos botões baseado na rolagem atual
    const atualizarBotoesNavegacao = () => {
      botaoAnterior.disabled = carrosselSimilares.scrollLeft <= 10; 
      botaoProximo.disabled = carrosselSimilares.scrollLeft + carrosselSimilares.clientWidth >= carrosselSimilares.scrollWidth - 10;
    };

    carrosselSimilares.addEventListener('scroll', atualizarBotoesNavegacao);
    window.addEventListener('resize', atualizarBotoesNavegacao);
    setTimeout(atualizarBotoesNavegacao, 150);
  }
});