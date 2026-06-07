window.getFooterHtml = function getFooterHtml(basePath = '.') {
  return `
  <footer id="footer" class="bg-gray-900">

    <div class="max-w-container mx-auto px-6 md:px-12 xl:px-24 pt-24 pb-8">

      <div class="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0">

        <div>

          <a href="${basePath}/index.html" class="inline-block">
<img src="${basePath}/assets/logo/dataorbit-logo-3.png" alt="DataOrbit" class="h-12 brightness-0 invert">
</a>

          <p class="text-base text-gray-500 mt-4 leading-normal max-w-xs">Satellite data marketplace for enterprises and developers.</p>

        </div>

        <div>

          <h4 class="text-xs font-medium text-gray-400 uppercase tracking-caps mb-4">Navigation</h4>

          <ul class="space-y-3">

            <li><a href="${basePath}/index.html" class="text-base text-gray-300 hover:text-white transition-colors">Home</a></li>

            <li><a href="${basePath}/pages/marketplace.html" class="text-base text-gray-300 hover:text-white transition-colors">Marketplace</a></li>

            <li><a href="${basePath}/pages/login.html" class="text-base text-gray-300 hover:text-white transition-colors">Login</a></li>

            <li><a href="${basePath}/pages/checkout.html" class="text-base text-gray-300 hover:text-white transition-colors">Checkout</a></li>

          </ul>

        </div>

        <div class="space-y-6">

          <div>

            <h4 class="text-xs font-medium text-gray-400 uppercase tracking-caps mb-3">Theme</h4>

            <div class="inline-flex items-center bg-gray-800 rounded-lg p-1 gap-1">

              <button class="theme-toggle-btn active p-2 rounded-md inline-flex items-center justify-center" title="System">

                <span class="material-symbols-outlined text-[16px]">desktop_windows</span>

              </button>

              <button class="theme-toggle-btn p-2 rounded-md text-gray-500 hover:text-gray-300 inline-flex items-center justify-center" title="Light mode">

                <span class="material-symbols-outlined text-[16px]">light_mode</span>

              </button>

              <button class="theme-toggle-btn p-2 rounded-md text-gray-500 hover:text-gray-300 inline-flex items-center justify-center" title="Dark mode">

                <span class="material-symbols-outlined text-[16px]">dark_mode</span>

              </button>

            </div>

          </div>

          <div>

            <h4 class="text-xs font-medium text-gray-400 uppercase tracking-caps mb-3">Language</h4>

            <button id="languageDropdownBtn" data-dropdown-toggle="languageDropdownMenu" data-dropdown-placement="top-start" class="flex items-center gap-2 px-3 py-2 text-base text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">

              <span class="material-symbols-outlined text-[16px]">language</span>

              English

              <span class="material-symbols-outlined text-[12px]">expand_more</span>

            </button>

            <div id="languageDropdownMenu" class="z-10 hidden bg-gray-800 rounded-lg shadow-lg border border-gray-700 w-40">

              <ul class="py-1 text-base text-gray-300">

                <li><a href="#" class="block px-4 py-2 hover:bg-gray-700 font-medium">English</a></li>

                <li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Português</a></li>

                <li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Español</a></li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      <div class="mt-12 pt-8 border-t border-gray-800">

        <p class="text-xs text-gray-500">&copy; 2026 DataOrbit. All rights reserved.</p>

      </div>

    </div>

  </footer>
`;
}


