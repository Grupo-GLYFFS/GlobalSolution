function showStep(step) {
  // Update sections
  for (let i = 0; i <= 3; i++) {
    const el = document.getElementById('sec-' + i);
    if (el) el.style.display = 'none';
  }
  const currentSec = document.getElementById('sec-' + step);
  if (currentSec) currentSec.style.display = 'block';

  // Update nav buttons
  if (step >= 1 && step <= 3) {
    for (let i = 1; i <= 3; i++) {
      const btn = document.getElementById('nav-step-' + i);
      if (!btn) continue;
      const span = btn.querySelector('span');
      if (i === step) {
        btn.className = 'flex-1 justify-center px-5 py-2 rounded-lg text-base font-bold tracking-heading transition-all flex items-center gap-2 text-gray-900 bg-white shadow-sm';
        if (span) span.className = 'w-5 h-5 rounded-full flex items-center justify-center text-xs bg-blue-100 text-blue-600';
      } else {
        btn.className = 'flex-1 justify-center px-5 py-2 rounded-lg text-base font-bold tracking-heading transition-all flex items-center gap-2 text-gray-500 hover:text-gray-900';
        if (span) span.className = 'w-5 h-5 rounded-full flex items-center justify-center text-xs bg-gray-200 text-gray-500';
      }
    }
  }
}
