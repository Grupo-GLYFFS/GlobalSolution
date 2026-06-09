/**
 * Script auto-executável (IIFE) que roda instantaneamente antes mesmo do HTML da página terminar de carregar.
 * Seu objetivo é aplicar o tema (Claro ou Escuro) o mais rápido possível para evitar o "FOUC" (Flash of Unstyled Content),
 * que é aquele momento indesejado em que a tela pisca em branco antes de carregar o modo noturno.
 */
(function() {

  function getTheme() {

    const savedTheme = localStorage.getItem('theme');

    // Se o usuário já escolheu manualmente um tema antes e salvou, prioriza a escolha dele
    if (savedTheme) {

      return savedTheme;

    }

    // Se é a primeira visita do usuário, pergunta ao sistema operacional (Windows/Mac/iOS) se ele prefere modo escuro
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  }

  const theme = getTheme();

  // Aplica ou remove a classe 'dark' diretamente na tag raiz <html> do documento, acionando o TailwindCSS
  if (theme === 'dark') {

    document.documentElement.classList.add('dark');

  } else {

    document.documentElement.classList.remove('dark');

  }

})();

/**
 * Objeto global (API) que permite aos outros scripts gerenciarem o tema em tempo de execução.
 * É muito utilizado pelos botões do rodapé para alternar entre os modos Claro, Escuro e Sistema.
 */
window.ThemeManager = {

  // Retorna a preferência exata do usuário salva na memória. Se não houver, assume que o padrão é 'system'
  getTheme: function() {

    return localStorage.getItem('theme') || 'system';

  },

  // Altera ativamente o tema da página inteira e avisa os demais componentes sobre a mudança
  setTheme: function(theme) {

    if (theme === 'system') {

      // Ao escolher 'system', deletamos o salvamento manual do navegador para voltar a espelhar as regras do computador
      localStorage.removeItem('theme');

      // Aplica imediatamente a cor baseada no sistema do usuário
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {

        document.documentElement.classList.add('dark');

      } else {

        document.documentElement.classList.remove('dark');

      }

    } else {

      // Salva permanentemente a escolha ('light' ou 'dark') substituindo as preferências do sistema operacional
      localStorage.setItem('theme', theme);

      if (theme === 'dark') {

        document.documentElement.classList.add('dark');

      } else {

        document.documentElement.classList.remove('dark');

      }

    }

    // Dispara um alarme/evento global avisando todos os scripts que o tema acabou de mudar.
    // O rodapé (footer.js) fica escutando esse alarme para trocar a cor (destaque) de seus próprios botõezinhos.
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));

  },

  // Função utilitária: retorna verdadeiro (true) se a página estiver, neste exato milissegundo, renderizada no modo escuro
  isDarkResolved: function() {

    return document.documentElement.classList.contains('dark');

  }

};

// Adiciona um "ouvido" sensível às mudanças na configuração do painel de controle do Sistema Operacional do usuário.
// Exemplo: se o usuário abrir o macOS e trocar de claro para escuro com a página já aberta,
// o site vai escurecer magicamente sozinho na mesma hora (desde que ele não tenha forçado manualmente um tema antes).
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {

  if (window.ThemeManager.getTheme() === 'system') {

    if (e.matches) {

      document.documentElement.classList.add('dark');

    } else {

      document.documentElement.classList.remove('dark');

    }

  }

});