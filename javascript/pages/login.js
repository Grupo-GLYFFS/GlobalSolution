/**
 * Oculta todos os elementos principais da interface de autenticação.
 * Funciona como uma função auxiliar (helper) para "limpar" a tela inteira antes de mostrar um novo estado visual (como uma tela de erro ou sucesso).
 */
function hideAllElements() {

  // Esconde os botões superiores que alternam entre as abas de "Login" e "Cadastro"
  document.getElementById('auth-tabs').classList.add('hidden');

  // Esconde a área central (o contêiner) onde os formulários de digitação ficam
  document.getElementById('auth-tab-content').classList.add('hidden');

  // Esconde o painel de alerta de erro específico para "e-mail não encontrado"
  document.getElementById('state-error-email').classList.add('hidden');

  // Esconde o painel de alerta de erro específico para "senha incorreta"
  document.getElementById('state-error-password').classList.add('hidden');

  // Esconde a tela verde brilhante de sucesso ("Conta criada com sucesso")
  document.getElementById('state-success').classList.add('hidden');

}

/**
 * Exibe a tela de erro apropriada baseada no tipo de falha que ocorreu durante a tentativa do usuário.
 * 
 * @param {string} errorType - Identificador textual do tipo de erro ocorrido (espera-se 'email' ou 'password').
 */
function displayErrorMessage(errorType) {

  // Primeiro limpa a tela completamente de qualquer outro formulário ou mensagem
  hideAllElements();

  if (errorType === 'email') {

    // Se o erro for de email, mostra a tela amigável sugerindo a criação de uma conta
    document.getElementById('state-error-email').classList.remove('hidden');

  } else {

    // Caso contrário (senha), mostra a tela com o link para "esqueci minha senha"
    document.getElementById('state-error-password').classList.remove('hidden');

  }

}

/**
 * Exibe a tela de animação de sucesso após o usuário criar conta com sucesso.
 * Em um sistema real, essa tela ficaria visível por uns 2 segundos antes de redirecionar para a Home.
 */
function displaySuccessMessage() {

  hideAllElements();

  document.getElementById('state-success').classList.remove('hidden');

}

/**
 * Retorna a interface do usuário de volta para o formulário tradicional de Log in.
 * Acionada geralmente por um botão de "Voltar" dentro de uma tela de erro.
 */
function returnToLoginView() {

  hideAllElements();

  // Restaura a visibilidade da caixa de formulários padrão
  document.getElementById('auth-tabs').classList.remove('hidden');

  document.getElementById('auth-tab-content').classList.remove('hidden');

  // Força (simula) um clique do mouse na aba "Login" para garantir que o formulário de entrar esteja ativo, e não o de cadastro
  document.getElementById('tab-login').click();

}

/**
 * Retorna a interface do usuário para o formulário de Cadastro (Sign Up).
 * Muito útil quando o usuário tenta logar, recebe "conta não encontrada", e clica no botão "Criar conta" sugerido pelo próprio erro.
 */
function returnToSignupView() {

  hideAllElements();

  document.getElementById('auth-tabs').classList.remove('hidden');

  document.getElementById('auth-tab-content').classList.remove('hidden');

  // Força (simula) um clique na aba "Sign Up" para abrir diretamente os campos de criar conta
  document.getElementById('tab-signup').click();

}

// Exporta as funções criadas neste arquivo para o objeto global `window`.
// Isso é estritamente necessário porque os botões no HTML usam eventos inline (ex: onclick="displayErrorMessage(...)")
// e eles só enxergam variáveis globais.
window.displayErrorMessage = displayErrorMessage;

window.displaySuccessMessage = displaySuccessMessage;

window.returnToLoginView = returnToLoginView;

window.returnToSignupView = returnToSignupView;

// Inicia a renderização do Navbar e Footer compartilhados assim que a árvore HTML da página estiver 100% montada
document.addEventListener('DOMContentLoaded', () => {

  window.injectComponents();

});