/**
 * Alterna as abas/etapas do processo de pagamento (Checkout).
 * Esconde as seções inativas e exibe a seção correspondente ao passo atual na tela.
 * 
 * @param {number} stepIndex - O número do passo a ser exibido (1: Autenticação, 2: Detalhes, 3: Pagamento).
 *                             O índice 0 é usado como um fallback inicial antes do processo iniciar oficialmente.
 */
function displayCheckoutStep(stepIndex) {

  // Passo 1: Limpa a tela ocultando todas as seções de checkout possíveis (sec-0 até sec-3)
  for (let i = 0; i <= 3; i++) {

    const sectionElement = document.getElementById('sec-' + i);

    // Se a tag <section> existir no HTML atual, esconde ela
    if (sectionElement) sectionElement.style.display = 'none';

  }

  // Passo 2: Seleciona apenas a seção alvo do clique e a torna visível na tela
  const currentSection = document.getElementById('sec-' + stepIndex);

  if (currentSection) currentSection.style.display = 'block';

  // Passo 3: Atualiza os estilos da barra de progresso no topo (abas numeradas 1, 2, 3)
  if (stepIndex >= 1 && stepIndex <= 3) {

    for (let i = 1; i <= 3; i++) {

      const navigationButton = document.getElementById('nav-step-' + i);

      // Se a aba correspondente não existir no HTML por algum motivo de segurança, apenas pula o erro
      if (!navigationButton) continue;

      // Localiza o pequeno círculo interno que envolve o número da etapa
      const spanElement = navigationButton.querySelector('span');

      // Se esta é exatamente a etapa em que o usuário se encontra agora...
      if (i === stepIndex) {

        // Destaca a aba inteira, colocando-a em foco (fundo branco, adicionando sombra projetada, texto azul)
        navigationButton.className = 'flex-1 justify-center px-5 py-2 rounded-lg text-base font-bold tracking-heading transition-all flex items-center gap-2 text-accent-blue bg-white dark:bg-gray-750 shadow-sm';

        // Destaca o pequeno círculo dentro da aba (fundo azul claro com texto azul primário)
        if (spanElement) spanElement.className = 'w-5 h-5 rounded-full flex items-center justify-center text-xs bg-accent-blue/10 text-accent-blue';

      } else {

        // Se é uma aba que o usuário não está acessando no momento (etapa inativa), deixa a aparência "apagada" (texto cinza)
        navigationButton.className = 'flex-1 justify-center px-5 py-2 rounded-lg text-base font-bold tracking-heading transition-all flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white';

        // Escurece/Acinzenta o círculo com o número indicando que não está ativo
        if (spanElement) spanElement.className = 'w-5 h-5 rounded-full flex items-center justify-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400';

      }

    }

  }

}

// Exporta a função para o objeto global `window` para garantir que o HTML consiga chamá-la no "onclick"
window.displayCheckoutStep = displayCheckoutStep;

// Assim que a página for montada pelo navegador, renderiza a Navbar e o Rodapé compartilhados
document.addEventListener('DOMContentLoaded', () => {

  window.injectComponents();

});