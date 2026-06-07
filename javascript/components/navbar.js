window.getNavbarHtml = function getNavbarHtml(basePath = '.') {
  return `
  <nav id="navbar" class="sticky top-0 z-50 bg-white border-b border-gray-200">

    <div class="max-w-container mx-auto px-6 md:px-12 xl:px-24 flex items-center h-20">

      <div class="flex-1">

        <a href="${basePath}/index.html" id="nav-logo" class="inline-block">

          <img src="${basePath}/assets/logo/dataorbit-logo-3.png" alt="DataOrbit" class="h-12">

        </a>

      </div>

      <div class="hidden lg:flex items-center gap-2">

        <button id="categoriesDropdownBtn" data-dropdown-toggle="categoriesDropdownMenu" class="h-12 flex items-center gap-1 px-5 text-base font-medium text-gray-800 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors">

          Categories

          <span class="material-symbols-outlined text-[20px] text-gray-400 ml-1">expand_more</span>

        </button>

        <div id="categoriesDropdownMenu" class="z-50 hidden bg-white shadow-xl border-t border-gray-200 !w-full !left-0 !top-20 !transform-none">

          <div class="max-w-container mx-auto px-6 md:px-12 xl:px-24 py-8">

            <div class="flex justify-between items-center mb-6">

              <h3 class="text-xs font-bold tracking-caps uppercase text-gray-400 m-0">Browse Categories</h3>

              <div class="flex items-center gap-3">

                <div class="flex items-center gap-2 mr-2 hidden md:flex" id="category-dots">

                  <div class="w-2 h-2 rounded-full bg-gray-900 transition-colors"></div>

                  <div class="w-2 h-2 rounded-full bg-gray-200 transition-colors"></div>

                </div>

                <button id="cat-prev" class="w-10 h-10 flex items-center justify-center p-0 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed">

                  <span class="material-symbols-outlined text-[20px] text-gray-900">chevron_left</span>

                </button>

                <button id="cat-next" class="w-10 h-10 flex items-center justify-center p-0 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed">

                  <span class="material-symbols-outlined text-[20px] text-gray-900">chevron_right</span>

                </button>

              </div>

            </div>

            <div id="category-scroll" class="flex items-start gap-6 overflow-x-auto pb-4 scroll-smooth drag-scroll cursor-pointer select-none snap-x snap-mandatory" style="scrollbar-width: none;">

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Imagery" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Imagery</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Optical, SAR, and hyperspectral data.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Climate" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Climate</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Weather patterns and GHG tracking.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Connectivity" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Connectivity</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">IoT network and broadband links.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Analytics" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Analytics</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Derived intelligence and mapping.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Telemetry" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Telemetry</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Raw sensor outputs and GNSS data.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Maritime" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Maritime</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Vessel tracking and AIS overlays.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Agriculture" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Agriculture</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Crop health and NDVI models.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Urban Planning" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Urban</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Infrastructure and night lights.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Forestry" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Forestry</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Deforestation and biomass.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-100">

                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="Energy" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-gray-900 group-hover:text-black transition-colors">Energy</h4>

                <p class="text-xs text-gray-500 mt-1 leading-normal">Solar irradiance and pipelines.</p>

              </a>

            </div>

          </div>

        </div>

        <input type="text" id="nav-search" placeholder="Search satellites, providers, data types..." class="h-12 w-64 xl:w-[448px] px-4 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 placeholder-gray-400">

        <button id="nav-search-btn" class="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">

          <span class="material-symbols-outlined text-[20px]">search</span>

        </button>

      </div>

      <div class="flex lg:hidden flex-1 justify-end">

        <button data-collapse-toggle="mobile-menu" type="button" class="text-gray-900 focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">

          <span class="material-symbols-outlined text-[24px]">menu</span>

        </button>

      </div>

      <div class="flex-1 hidden lg:flex items-center justify-end gap-3">

        <a href="${basePath}/pages/login.html" id="nav-login-btn" class="h-12 px-6 text-base font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center">Log in</a>

        <a href="${basePath}/pages/login.html" id="nav-signup-btn" class="h-12 px-6 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center justify-center">Sign up</a>

      </div>

    </div>

    <div class="hidden lg:hidden w-full" id="mobile-menu">

      <div class="px-6 pt-2 pb-6 space-y-2 bg-white border-t border-gray-200 shadow-xl">

        <div class="mb-4 pt-2">

          <input type="text" placeholder="Search satellites..." class="w-full h-12 px-4 text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">

        </div>

        <a href="#" class="block px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-50 border border-gray-200 text-center">Categories</a>

        <a href="#" class="block px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-50 border border-gray-200 text-center">Log in</a>

        <a href="#" class="block px-4 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 text-center">Sign up</a>

      </div>

    </div>

  </nav>
`;
}


