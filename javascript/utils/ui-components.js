/**
 * Objeto global utilitário para inicializar comportamentos de Interface de Usuário (UI).
 * Atua como um substituto leve e customizado para o Javascript do Flowbite/Bootstrap.
 * Controla os menus Dropdown, as Gavetas laterais (Drawers) e os sistemas de Abas (Tabs).
 */
window.UIComponents = {

  // Chama a inicialização de todos os módulos de interface presentes na página
  init() {

    this.initDropdowns();

    this.initDrawers();

    this.initTabs();

    // Adiciona um listener global de clique no documento inteiro para fechar os Dropdowns
    // caso o usuário clique fora da área do menu aberto
    document.addEventListener('click', (e) => {

      // Se o clique NÃO foi num botão que abre dropdown E também NÃO foi dentro de um menu já aberto...
      if (!e.target.closest('[data-dropdown-toggle]') && !e.target.closest('.dropdown-menu')) {

        // Procura todos os menus que não estão com a classe 'hidden' e os oculta
        document.querySelectorAll('.dropdown-menu:not(.hidden)').forEach(menu => {

          menu.classList.add('hidden');

        });

      }

    });

  },

  /**
   * Configura o funcionamento lógico dos Menus Suspensos (Dropdowns) como o de Categorias e de Idiomas.
   */
  initDropdowns() {

    // Encontra todos os botões no HTML que possuem o atributo mágico 'data-dropdown-toggle'
    const toggleBtns = document.querySelectorAll('[data-dropdown-toggle]');

    toggleBtns.forEach(btn => {

      // Evita vincular o mesmo evento de clique várias vezes se a função init() for chamada novamente
      if (btn.hasAttribute('data-ui-init')) return;

      btn.setAttribute('data-ui-init', 'true');

      // Descobre qual é a ID do menu que este botão deve abrir
      const targetId = btn.getAttribute('data-dropdown-toggle');

      const targetMenu = document.getElementById(targetId);

      if (targetMenu) {

        // Marca esse menu com a classe '.dropdown-menu' para facilitar a busca do script que fecha os menus (acima)
        targetMenu.classList.add('dropdown-menu');

        btn.addEventListener('click', (e) => {

          // Impede que o clique "vaze" pro documento e feche o menu imediatamente
          e.stopPropagation();

          // Garante que, ao abrir um menu, todos os outros menus da página sejam fechados (efeito sanfona)
          document.querySelectorAll('.dropdown-menu:not(.hidden)').forEach(menu => {

            if (menu.id !== targetId) menu.classList.add('hidden');

          });

          // Lógica de alternância (Toggle): Se está escondido, mostra. Se está visível, esconde.
          if (targetMenu.classList.contains('hidden')) {

            targetMenu.classList.remove('hidden');

            // --- Lógica avançada anti-quebra de layout ---
            // Torna o menu visível pro navegador mas invisível pro usuário, só para podermos medir a altura real dele
            targetMenu.style.visibility = 'hidden';

            const btnRect = btn.getBoundingClientRect();

            const menuHeight = targetMenu.offsetHeight;

            const spaceBelow = window.innerHeight - btnRect.bottom;

            // Se o menu costuma abrir para baixo, mas não tem espaço físico suficiente na tela antes de encostar no rodapé...
            if (targetMenu.classList.contains('top-full') || targetMenu.classList.contains('bottom-full')) {

                if (spaceBelow < menuHeight + 20 && btnRect.top > menuHeight + 20) {

                    // ... Inverte a direção e faz o menu abrir para cima
                    targetMenu.classList.remove('top-full', 'mt-2');

                    targetMenu.classList.add('bottom-full', 'mb-2');

                } else {

                    // Caso contrário, abre para baixo normalmente
                    targetMenu.classList.remove('bottom-full', 'mb-2');

                    targetMenu.classList.add('top-full', 'mt-2');

                }

            }

            // Devolve a visibilidade para o usuário ver
            targetMenu.style.visibility = '';

          } else {

            // Fecha o menu
            targetMenu.classList.add('hidden');

          }

        });

      }

    });

  },

  /**
   * Inicializa o menu lateral (Drawer) no formato Mobile (para telas pequenas)
   */
  initDrawers() {

    // Botões que abrem o menu lateral
    const showBtns = document.querySelectorAll('[data-drawer-show], [data-drawer-target]');

    showBtns.forEach(btn => {

      if (btn.hasAttribute('data-ui-init-drawer-show')) return;

      btn.setAttribute('data-ui-init-drawer-show', 'true');

      const targetId = btn.getAttribute('data-drawer-show') || btn.getAttribute('data-drawer-target');

      const targetDrawer = document.getElementById(targetId);

      if (targetDrawer) {

        btn.addEventListener('click', () => {

          // O Drawer usa uma classe CSS de transição no eixo X. Remover essa classe faz ele deslizar para a tela.
          targetDrawer.classList.remove('-translate-x-full');

          // Exibe um fundo escurecido semitransparente por trás do menu aberto
          this.showBackdrop(targetDrawer);

        });

      }

    });

    // Botões dedicados a fechar o menu lateral (geralmente um ícone de 'X')
    const hideBtns = document.querySelectorAll('[data-drawer-hide]');

    hideBtns.forEach(btn => {

      if (btn.hasAttribute('data-ui-init-drawer-hide')) return;

      btn.setAttribute('data-ui-init-drawer-hide', 'true');

      const targetId = btn.getAttribute('data-drawer-hide');

      const targetDrawer = document.getElementById(targetId);

      if (targetDrawer) {

        btn.addEventListener('click', () => {

          // Aplica a classe que puxa o menu 100% de volta para o lado esquerdo de fora da tela
          targetDrawer.classList.add('-translate-x-full');

          this.hideBackdrop();

        });

      }

    });

  },

  /**
   * Inicializa o sistema de Abas (Tabs) usado na tela de Login/Cadastro
   */
  initTabs() {

    const tabLists = document.querySelectorAll('[data-tabs-toggle]');

    tabLists.forEach(list => {

      if (list.hasAttribute('data-ui-init-tabs')) return;

      list.setAttribute('data-ui-init-tabs', 'true');

      const tabs = list.querySelectorAll('[role="tab"]');

      tabs.forEach(tab => {

        tab.addEventListener('click', () => {

          // 1. Reseta o estado de todas as abas, marcando-as como não selecionadas
          tabs.forEach(t => {

            t.setAttribute('aria-selected', 'false');

            const tId = t.getAttribute('data-tabs-target');

            // Esconde os formulários vinculados às outras abas
            if (tId) document.querySelector(tId)?.classList.add('hidden');

          });

          // 2. Marca a aba recém clicada como ativa
          tab.setAttribute('aria-selected', 'true');

          const targetId = tab.getAttribute('data-tabs-target');

          // Mostra apenas o formulário da aba clicada
          if (targetId) document.querySelector(targetId)?.classList.remove('hidden');

        });

      });

      // Configuração Inicial: Se o HTML já indica que uma aba deve começar aberta, força o layout
      // Senão, pega a primeira aba por padrão
      const activeTab = list.querySelector('[aria-selected="true"]') || tabs[0];

      if (activeTab) {

        // Esconde tudo primeiro
        tabs.forEach(t => {

          const tId = t.getAttribute('data-tabs-target');

          if (tId) document.querySelector(tId)?.classList.add('hidden');

        });

        // Revela apenas o conteúdo da aba correta
        const targetId = activeTab.getAttribute('data-tabs-target');

        if (targetId) document.querySelector(targetId)?.classList.remove('hidden');

      }

    });

  },

  /**
   * Utilitário visual: Cria a película escura atrás do menu mobile
   */
  showBackdrop(drawerElement) {

    if (!document.getElementById('ui-backdrop')) {

      const backdrop = document.createElement('div');

      backdrop.id = 'ui-backdrop';

      backdrop.className = 'fixed inset-0 bg-black/50 z-40 transition-opacity';

      document.body.appendChild(backdrop);

      // Se o usuário clicar no fundo escuro, fecha o menu automaticamente (comportamento padrão de apps modernos)
      backdrop.addEventListener('click', () => {

        drawerElement.classList.add('-translate-x-full');

        this.hideBackdrop();

      });

    }

  },

  /**
   * Utilitário visual: Remove a película escura
   */
  hideBackdrop() {

    const backdrop = document.getElementById('ui-backdrop');

    if (backdrop) {

      backdrop.remove();

    }

  }

};

// Inicializa automaticamente o sistema caso o script seja carregado
if (document.readyState === 'loading') {

  // Se o HTML ainda não acabou de ser lido pelo navegador, aguarda o evento DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => window.UIComponents.init());

} else {

  // Se já carregou tudo, inicializa de imediato
  window.UIComponents.init();

}