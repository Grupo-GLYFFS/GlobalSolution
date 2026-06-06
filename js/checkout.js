// js/checkout.js
// Lógica de navegação entre as etapas do processo de checkout
// Depende: Nenhum

// Exibe a etapa especificada e oculta as demais
function exibirEtapa(indiceEtapa) {
  // Atualiza a exibição das seções
  for (let i = 0; i <= 3; i++) {
    const elementoSecao = document.getElementById('sec-' + i);
    if (elementoSecao) elementoSecao.style.display = 'none';
  }
  const secaoAtual = document.getElementById('sec-' + indiceEtapa);
  if (secaoAtual) secaoAtual.style.display = 'block';

  // Atualiza as classes visuais dos botões de navegação
  if (indiceEtapa >= 1 && indiceEtapa <= 3) {
    for (let i = 1; i <= 3; i++) {
      const botaoNavegacao = document.getElementById('nav-step-' + i);
      if (!botaoNavegacao) continue;

      const elementoSpan = botaoNavegacao.querySelector('span');
      if (i === indiceEtapa) {
        botaoNavegacao.className = 'flex-1 justify-center px-5 py-2 rounded-lg text-base font-bold tracking-heading transition-all flex items-center gap-2 text-gray-900 bg-white shadow-sm';
        if (elementoSpan) elementoSpan.className = 'w-5 h-5 rounded-full flex items-center justify-center text-xs bg-blue-100 text-blue-600';
      } else {
        botaoNavegacao.className = 'flex-1 justify-center px-5 py-2 rounded-lg text-base font-bold tracking-heading transition-all flex items-center gap-2 text-gray-500 hover:text-gray-900';
        if (elementoSpan) elementoSpan.className = 'w-5 h-5 rounded-full flex items-center justify-center text-xs bg-gray-200 text-gray-500';
      }
    }
  }
}