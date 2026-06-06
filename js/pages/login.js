// js/pages/login.js
// Lógica de alternância de formulários de login/cadastro e exibição de estados (erro/sucesso)
// Depende: Nenhum

// Oculta todas as seções e abas de autenticação
export function ocultarTudo() {
  document.getElementById('auth-tabs').classList.add('hidden');
  document.getElementById('auth-tab-content').classList.add('hidden');
  document.getElementById('state-error-email').classList.add('hidden');
  document.getElementById('state-error-password').classList.add('hidden');
  document.getElementById('state-success').classList.add('hidden');
}

// Exibe a mensagem de erro específica com base no tipo
export function exibirErro(tipoErro) {
  ocultarTudo();
  if (tipoErro === 'email') {
    document.getElementById('state-error-email').classList.remove('hidden');
  } else {
    document.getElementById('state-error-password').classList.remove('hidden');
  }
}

// Exibe a tela de sucesso após o cadastro
export function exibirSucesso() {
  ocultarTudo();
  document.getElementById('state-success').classList.remove('hidden');
}

// Redefine a interface para a aba de login padrão
export function voltarParaLogin() {
  ocultarTudo();
  document.getElementById('auth-tabs').classList.remove('hidden');
  document.getElementById('auth-tab-content').classList.remove('hidden');
  document.getElementById('tab-login').click();
}

// Redefine a interface para a aba de criação de conta
export function voltarParaCadastro() {
  ocultarTudo();
  document.getElementById('auth-tabs').classList.remove('hidden');
  document.getElementById('auth-tab-content').classList.remove('hidden');
  document.getElementById('tab-signup').click();
}

// Exporta as funções para o escopo global para compatibilidade com onclick inline no HTML
window.exibirErro = exibirErro;
window.exibirSucesso = exibirSucesso;
window.voltarParaLogin = voltarParaLogin;
window.voltarParaCadastro = voltarParaCadastro;