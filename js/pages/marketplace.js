// js/pages/marketplace.js
// Ponto de entrada e inicialização para a página do Marketplace
// Depende: arrastar-rolagem.js, carrossel.js

import { inicializarArrasteRolagem } from '../components/arrastar-rolagem.js';
import { inicializarCarrossel } from '../components/carrossel.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DataOrbit - Marketplace Carregado via ES Modules');
  
  inicializarArrasteRolagem();
  
  const atualizarControlesDoCarrossel = inicializarCarrossel('category-scroll', 'cat-prev', 'cat-next', '#category-dots div');
  
  const botaoDropdownCategorias = document.getElementById('categoriesDropdownBtn');
  if (botaoDropdownCategorias && atualizarControlesDoCarrossel) {
    botaoDropdownCategorias.addEventListener('click', () => {
      setTimeout(atualizarControlesDoCarrossel, 100);
    });
  }
});