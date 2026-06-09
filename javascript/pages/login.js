function ocultarTudo() {

  document.getElementById('auth-tabs').classList.add('hidden');

  document.getElementById('auth-tab-content').classList.add('hidden');

  document.getElementById('state-error-email').classList.add('hidden');

  document.getElementById('state-error-password').classList.add('hidden');

  document.getElementById('state-success').classList.add('hidden');

}

function exibirErro(tipoErro) {

  ocultarTudo();

  if (tipoErro === 'email') {

    document.getElementById('state-error-email').classList.remove('hidden');

  } else {

    document.getElementById('state-error-password').classList.remove('hidden');

  }

}

function exibirSucesso() {

  ocultarTudo();

  document.getElementById('state-success').classList.remove('hidden');

}

function voltarParaLogin() {

  ocultarTudo();

  document.getElementById('auth-tabs').classList.remove('hidden');

  document.getElementById('auth-tab-content').classList.remove('hidden');

  document.getElementById('tab-login').click();

}

function voltarParaCadastro() {

  ocultarTudo();

  document.getElementById('auth-tabs').classList.remove('hidden');

  document.getElementById('auth-tab-content').classList.remove('hidden');

  document.getElementById('tab-signup').click();

}

window.exibirErro = exibirErro;

window.exibirSucesso = exibirSucesso;

window.voltarParaLogin = voltarParaLogin;

window.voltarParaCadastro = voltarParaCadastro;

document.addEventListener('DOMContentLoaded', () => {

  window.injectComponents();

});