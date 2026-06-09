/**
 * Retorna o HTML em formato de string (Template Literal) que representa o rodapé do site.
 * Usamos uma função que gera o HTML dinamicamente para facilitar a manutenção: se precisarmos
 * alterar o rodapé, mudamos apenas aqui, em vez de alterar em todas as páginas HTML do projeto.
 * 
 * @param {string} basePath - O caminho relativo raiz (ex: '.' ou '..') para garantir que links e imagens funcionem independente da pasta onde a página atual está.
 * @returns {string} - O HTML completo e estruturado do rodapé.
 */
window.getFooterHtml = function getFooterHtml(basePath = '.') {

  // Retorna uma string multilinhas contendo a estrutura HTML do rodapé
  return `

  <footer id="footer" class="bg-black">

    <div class="max-w-container mx-auto px-6 md:px-12 xl:px-24 pt-24 pb-8">

      <div class="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0">

        <div>

          <a href="${basePath}/index.html" class="inline-block">

<img src="${basePath}/assets/logo/dataorbit-logo-3.png" alt="DataOrbit" class="h-12 brightness-0 invert">

</a>

          <p class="text-base text-gray-500 mt-4 leading-normal max-w-xs" data-lang="footer_desc">Satellite data marketplace for enterprises and developers.</p>

        </div>

        <div>

          <h4 class="text-xs font-medium text-gray-400 uppercase tracking-caps mb-4" data-lang="footer_nav">Navigation</h4>

          <ul class="space-y-3">

            <li><a href="${basePath}/index.html" class="text-base text-gray-400 hover:text-white transition-colors" data-lang="footer_home">Home</a></li>

            <li><a href="${basePath}/pages/marketplace.html" class="text-base text-gray-400 hover:text-white transition-colors" data-lang="footer_marketplace">Marketplace</a></li>

            <li><a href="${basePath}/pages/login.html" class="text-base text-gray-400 hover:text-white transition-colors" data-lang="nav_login">Login</a></li>

            <li><a href="${basePath}/pages/checkout.html" class="text-base text-gray-400 hover:text-white transition-colors" data-lang="footer_checkout">Checkout</a></li>

          </ul>

        </div>

        <div class="space-y-6">

          <div>

            <h4 class="text-xs font-medium text-gray-400 uppercase tracking-caps mb-3" data-lang="footer_theme">Theme</h4>

            <div class="inline-flex items-center bg-gray-800 rounded-lg p-1 gap-1">

              <button id="theme-sys" class="theme-toggle-btn p-2 rounded-md inline-flex items-center justify-center text-gray-500 hover:bg-gray-700 hover:text-white" title="System">

                <span class="material-symbols-outlined text-[16px]">desktop_windows</span>

              </button>

              <button id="theme-light" class="theme-toggle-btn p-2 rounded-md text-gray-500 hover:bg-gray-700 hover:text-white inline-flex items-center justify-center" title="Light mode">

                <span class="material-symbols-outlined text-[16px]">light_mode</span>

              </button>

              <button id="theme-dark" class="theme-toggle-btn p-2 rounded-md text-gray-500 hover:bg-gray-700 hover:text-white inline-flex items-center justify-center" title="Dark mode">

                <span class="material-symbols-outlined text-[16px]">dark_mode</span>

              </button>

            </div>

          </div>

          <div>

            <h4 class="text-xs font-medium text-gray-400 uppercase tracking-caps mb-3" data-lang="footer_language">Language</h4>

            <div class="relative inline-block"><button id="languageDropdownBtn" data-dropdown-toggle="languageDropdownMenu" data-dropdown-placement="bottom-start" class="flex items-center gap-2 px-3 py-2 text-base text-white bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">

              <span class="material-symbols-outlined text-[16px]">language</span>

              <span id="current-language-label">English</span>

              <span class="material-symbols-outlined text-[12px]">expand_more</span>

            </button>

            <div id="languageDropdownMenu" class="z-10 hidden absolute top-full left-0 mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-800 w-40">

              <ul class="text-base text-gray-400">

                <li><a href="#" class="block px-4 py-2 hover:bg-gray-700 hover:text-white font-medium lang-option" data-lang-val="en">English</a></li>

                <li><a href="#" class="block px-4 py-2 hover:bg-gray-700 hover:text-white lang-option" data-lang-val="pt">Português</a></li>

                <li><a href="#" class="block px-4 py-2 hover:bg-gray-700 hover:text-white lang-option" data-lang-val="es">Español</a></li>

              </ul>

            </div>

            </div>

          </div>

        </div>

      </div>

      <div class="mt-24 pt-8 border-t border-gray-800">

        <p class="text-xs text-gray-500" data-lang="footer_copyright">&copy; 2026 DataOrbit. All rights reserved.</p>

      </div>

    </div>

  </footer>

`;

}

/**
 * Inicializa a lógica interativa do rodapé após ele ser injetado no DOM.
 * Isso inclui os botões de alternância de tema (claro/escuro/sistema) e o dropdown de seleção de idioma.
 */
window.initializeFooter = function () {

  // Se o gerenciador de temas global (ThemeManager) não foi carregado, aborta a inicialização para evitar erros
  if (!window.ThemeManager) return;

  // Busca os botões de seleção de tema usando seus IDs específicos definidos no HTML acima
  const systemThemeButton = document.getElementById('theme-sys');

  const lightThemeButton = document.getElementById('theme-light');

  const darkThemeButton = document.getElementById('theme-dark');

  /**
   * Função auxiliar para atualizar a aparência visual dos botões de tema.
   * O botão do tema atual fica destacado (fundo cinza escuro, texto branco),
   * enquanto os inativos ficam mais discretos (texto cinza claro).
   * 
   * @param {string} currentTheme - O nome do tema ativo ('light', 'dark', ou 'system')
   */
  function updateActiveButton(currentTheme) {

    // Se algum dos botões não existir no HTML, aborta a função para garantir segurança
    if (!systemThemeButton || !lightThemeButton || !darkThemeButton) return;

    // Passo 1: Percorre todos os botões e remove as classes de estado "ativo" (reset visual)
    [systemThemeButton, lightThemeButton, darkThemeButton].forEach(button => {

      button.classList.remove('active', 'bg-gray-700', 'text-white');

      button.classList.add('text-gray-500');

    });

    // Passo 2: Descobre qual é o botão que deve estar ativo. Assume que 'system' é o padrão.
    let activeButton = systemThemeButton;

    if (currentTheme === 'light') activeButton = lightThemeButton;

    else if (currentTheme === 'dark') activeButton = darkThemeButton;

    // Passo 3: Aplica as classes de destaque do TailwindCSS apenas no botão ativo selecionado
    activeButton.classList.add('active', 'bg-gray-700', 'text-white');

    activeButton.classList.remove('text-gray-500');

  }

  // Sincroniza a aparência visual inicial puxando o tema salvo no gerenciador
  updateActiveButton(window.ThemeManager.getTheme());

  // Fica escutando eventos customizados de 'themeChanged'. Se outro script alterar o tema, o rodapé reage e atualiza os botões instantaneamente
  window.addEventListener('themeChanged', (event) => {

    updateActiveButton(event.detail.theme);

  });

  // Vincula o evento de clique (click) de cada botão à função que realmente altera o tema global do site
  if (systemThemeButton) systemThemeButton.addEventListener('click', () => window.ThemeManager.setTheme('system'));

  if (lightThemeButton) lightThemeButton.addEventListener('click', () => window.ThemeManager.setTheme('light'));

  if (darkThemeButton) darkThemeButton.addEventListener('click', () => window.ThemeManager.setTheme('dark'));

  // Bloco dedicado exclusivamente a configurar a funcionalidade de idiomas no rodapé
  if (window.LanguageManager) {

    // Captura o elemento <span> que exibe textualmente o idioma atualmente selecionado (ex: "English")
    const languageLabel = document.getElementById('current-language-label');

    // Seleciona todos os links <a> que representam as opções de idiomas dentro do menu dropdown
    const languageOptions = document.querySelectorAll('.lang-option');

    /**
     * Atualiza o texto do rótulo e coloca em negrito a opção de idioma correspondente na lista
     * 
     * @param {string} language - O código do idioma selecionado ('en', 'pt', 'es')
     */
    function updateLanguageUserInterface(language) {

      // Atualiza o rótulo visível no botão do dropdown principal
      if (languageLabel) {

        if (language === 'pt') languageLabel.textContent = 'Português';

        else if (language === 'es') languageLabel.textContent = 'Español';

        else languageLabel.textContent = 'English';

      }

      // Adiciona estilo de negrito ('font-medium') apenas na opção que bate com o idioma ativo
      languageOptions.forEach(option => {

        // Verifica o atributo 'data-lang-val' para saber qual idioma a opção representa
        if (option.getAttribute('data-lang-val') === language) {

          option.classList.add('font-medium');

        } else {

          option.classList.remove('font-medium');

        }

      });

    }

    // Inicialização da interface puxando o idioma preferido do usuário salvo no LocalStorage
    updateLanguageUserInterface(window.LanguageManager.getLanguage());

    // Registra o evento de clique em todas as opções do menu de idiomas
    languageOptions.forEach(option => {

      option.addEventListener('click', (event) => {

        // Evita que a página role forçadamente de volta para o topo da tela ao clicar em links com href="#"
        event.preventDefault();

        // Extrai o valor do novo idioma a partir do atributo data e aplica a mudança
        const selectedLanguage = option.getAttribute('data-lang-val');

        window.LanguageManager.setLanguage(selectedLanguage);

      });

    });

    // Se outro local do site alterar o idioma, escuta o evento global e reflete a alteração na interface do rodapé
    window.addEventListener('languageChanged', (event) => {

      updateLanguageUserInterface(event.detail.language);

    });

  }

}