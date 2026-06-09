/**
 * Injeta dinamicamente os componentes de interface globais (Navbar e Footer) nas páginas HTML.
 * Este script é vital para evitar a repetição de dezenas de linhas de código HTML entre as diferentes telas do site.
 */
window.injectComponents = function injectComponents() {

  // Procura pela tag "âncora" temporária <div id="navbar-placeholder"> deixada no HTML da página atual
  const navbarPlaceholder = document.getElementById('navbar-placeholder');

  if (navbarPlaceholder) {

    // Lê o atributo "data-basepath" do HTML (ex: data-basepath="..") para saber em que nível de pasta a página está
    const basePath = navbarPlaceholder.dataset.basepath || '.';

    // Substitui completamente a div temporária pelo HTML real da barra de navegação montada pela função getNavbarHtml()
    navbarPlaceholder.outerHTML = window.getNavbarHtml(basePath);

  }

  // Faz exatamente o mesmo processo para injetar o Rodapé
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (footerPlaceholder) {

    const basePath = footerPlaceholder.dataset.basepath || '.';

    footerPlaceholder.outerHTML = window.getFooterHtml(basePath);

    // Diferente da Navbar, o Rodapé possui botões interativos de tema e idioma que exigem ouvintes de eventos (Listeners).
    // Por isso, chamamos a inicialização de eventos do rodapé logo após ele nascer na tela.
    if (window.initializeFooter) window.initializeFooter();

  }

  // Inicializa scripts de interface gerais, como por exemplo, fazer menus dropdown funcionarem
  if (window.UIComponents) {

    // Pequeno truque técnico (setTimeout): Aguardamos 50 milissegundos para garantir que 
    // a alteração do 'outerHTML' acima já foi 100% desenhada e assimilada pelo navegador
    // antes de tentar buscar os novos botões com getElementById.
    setTimeout(() => {

      window.UIComponents.init();

    }, 50);

  }

  // Inicializa o sistema de traduções (LanguageManager)
  // Fazemos isso por último para garantir que os textos da Navbar e do Footer recém injetados 
  // já estejam na tela para poderem ser traduzidos para Espanhol/Português se necessário.
  if (window.LanguageManager) {

    window.LanguageManager.init();

  }

}