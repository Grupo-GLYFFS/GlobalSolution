// js/pages/satellite.js
// Lógica para galeria de imagens e inicialização do carrossel de satélites similares
// Depende: arrastar-rolagem.js, carrossel.js

import { inicializarArrasteRolagem } from '../components/arrastar-rolagem.js';
import { inicializarCarrossel } from '../components/carrossel.js';

// Altera a imagem principal exibida na galeria do satélite
export function alterarImagemPrincipal(caminhoImagem, botaoClicado) {
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
export function rolarCarrossel(direcaoRolagem) {
  const carrosselSimilares = document.getElementById('similar-scroll');
  if (carrosselSimilares) {
    const quantidadeRolagem = direcaoRolagem * carrosselSimilares.clientWidth;
    carrosselSimilares.scrollBy({ left: quantidadeRolagem, behavior: 'smooth' });
  }
}

// Exporta para o escopo global para o HTML
window.alterarImagemPrincipal = alterarImagemPrincipal;
window.rolarCarrossel = rolarCarrossel;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DataOrbit - Satellite Loaded via ES Modules');
  inicializarArrasteRolagem();
  
  // Inicializa o carrossel similar e os de categorias no navbar
  inicializarCarrossel('similar-scroll', 'slider-prev', 'slider-next');
  
  const atualizarControlesDoCarrossel = inicializarCarrossel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div');
  const botaoDropdownCategorias = document.getElementById('categoriesDropdownBtn');
  if (botaoDropdownCategorias && atualizarControlesDoCarrossel) {
    botaoDropdownCategorias.addEventListener('click', () => {
      setTimeout(atualizarControlesDoCarrossel, 100);
    });
  }
});