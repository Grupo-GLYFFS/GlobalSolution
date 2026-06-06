function hideAll() {
  document.getElementById('auth-tabs').classList.add('hidden');
  document.getElementById('auth-tab-content').classList.add('hidden');
  document.getElementById('state-error-email').classList.add('hidden');
  document.getElementById('state-error-password').classList.add('hidden');
  document.getElementById('state-success').classList.add('hidden');
}

function showError(type) {
  hideAll();
  if (type === 'email') {
    document.getElementById('state-error-email').classList.remove('hidden');
  } else {
    document.getElementById('state-error-password').classList.remove('hidden');
  }
}

function showSuccess() {
  hideAll();
  document.getElementById('state-success').classList.remove('hidden');
}

function resetToLogin() {
  hideAll();
  document.getElementById('auth-tabs').classList.remove('hidden');
  document.getElementById('auth-tab-content').classList.remove('hidden');
  document.getElementById('tab-login').click();
}

function resetToSignup() {
  hideAll();
  document.getElementById('auth-tabs').classList.remove('hidden');
  document.getElementById('auth-tab-content').classList.remove('hidden');
  document.getElementById('tab-signup').click();
}
