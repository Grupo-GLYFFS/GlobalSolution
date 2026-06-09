window.getFooterHtml = function getFooterHtml(basePath = '.') {

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

window.initFooter = function() {

  if (!window.ThemeManager) return;

  const sysBtn = document.getElementById('theme-sys');

  const lightBtn = document.getElementById('theme-light');

  const darkBtn = document.getElementById('theme-dark');

  function updateActiveBtn(currentTheme) {

    if(!sysBtn || !lightBtn || !darkBtn) return;

    [sysBtn, lightBtn, darkBtn].forEach(btn => {

      btn.classList.remove('active', 'bg-gray-700', 'text-white');

      btn.classList.add('text-gray-500');

    });

    let activeBtn = sysBtn;

    if (currentTheme === 'light') activeBtn = lightBtn;

    else if (currentTheme === 'dark') activeBtn = darkBtn;

    activeBtn.classList.add('active', 'bg-gray-700', 'text-white');

    activeBtn.classList.remove('text-gray-500');

  }

  updateActiveBtn(window.ThemeManager.getTheme());

  window.addEventListener('themeChanged', (e) => {

    updateActiveBtn(e.detail.theme);

  });

  if(sysBtn) sysBtn.addEventListener('click', () => window.ThemeManager.setTheme('system'));

  if(lightBtn) lightBtn.addEventListener('click', () => window.ThemeManager.setTheme('light'));

  if(darkBtn) darkBtn.addEventListener('click', () => window.ThemeManager.setTheme('dark'));

  if (window.LanguageManager) {

    const langLabel = document.getElementById('current-language-label');

    const langOptions = document.querySelectorAll('.lang-option');

    function updateLangUI(lang) {

      if (langLabel) {

        if (lang === 'pt') langLabel.textContent = 'Português';

        else if (lang === 'es') langLabel.textContent = 'Español';

        else langLabel.textContent = 'English';

      }

      langOptions.forEach(opt => {

        if (opt.getAttribute('data-lang-val') === lang) {

          opt.classList.add('font-medium');

        } else {

          opt.classList.remove('font-medium');

        }

      });

    }

    updateLangUI(window.LanguageManager.getLanguage());

    langOptions.forEach(opt => {

      opt.addEventListener('click', (e) => {

        e.preventDefault();

        const lang = opt.getAttribute('data-lang-val');

        window.LanguageManager.setLanguage(lang);

      });

    });

    window.addEventListener('languageChanged', (e) => {

      updateLangUI(e.detail.language);

    });

  }

}