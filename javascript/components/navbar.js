window.getNavbarHtml = function getNavbarHtml(basePath = '.') {
  return `
  <nav id="navbar" class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">

    <div class="max-w-container mx-auto px-6 md:px-12 xl:px-24 flex items-center h-20">

      <div class="flex-1">

        <a href="${basePath}/index.html" id="nav-logo" class="inline-block">

          <img src="${basePath}/assets/logo/dataorbit-logo-3.png" alt="DataOrbit" class="h-12 dark:invert">

        </a>

      </div>

      <div class="hidden lg:flex items-center gap-2">

        <button id="categoriesDropdownBtn" data-dropdown-toggle="categoriesDropdownMenu" class="h-12 flex items-center gap-1 px-5 text-base font-medium text-gray-800 dark:text-gray-200 border border-gray-400 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">

          <span data-lang="nav_categories">Categories</span>

          <span class="material-symbols-outlined text-[20px] text-black dark:text-gray-200 ml-1">expand_more</span>

        </button>

        <div id="categoriesDropdownMenu" class="z-50 hidden absolute bg-white dark:bg-gray-900 shadow-xl border-t border-gray-200 dark:border-gray-800 !w-full !left-0 !top-20 !transform-none">

          <div class="max-w-container mx-auto px-6 md:px-12 xl:px-24 py-8">

            <div class="flex justify-between items-center mb-6">

              <h3 class="text-xs font-bold tracking-caps uppercase text-gray-500 dark:text-gray-400 m-0" data-lang="nav_browse_categories">Browse Categories</h3>

              <div class="flex items-center gap-3">

                <div class="flex items-center gap-2 mr-2 hidden md:flex" id="category-dots">

                  <div class="w-2 h-2 rounded-full bg-black dark:bg-white transition-colors"></div>

                  <div class="w-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700 transition-colors"></div>

                </div>

                <button id="cat-prev" class="w-10 h-10 flex items-center justify-center p-0 rounded-full border border-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed">

                  <span class="material-symbols-outlined text-[20px] text-black dark:text-gray-200">chevron_left</span>

                </button>

                <button id="cat-next" class="w-10 h-10 flex items-center justify-center p-0 rounded-full border border-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed">

                  <span class="material-symbols-outlined text-[20px] text-black dark:text-gray-200">chevron_right</span>

                </button>

              </div>

            </div>

            <div id="category-scroll" class="flex items-start gap-6 overflow-x-auto pb-4 scroll-smooth drag-scroll cursor-pointer select-none snap-x snap-mandatory" style="scrollbar-width: none;">

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/imagery-category.png" alt="Imagery" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_imagery">Imagery</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_imagery_desc">Optical, SAR, and hyperspectral data.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/climate-category.png" alt="Climate" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_climate">Climate</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_climate_desc">Weather patterns and GHG tracking.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/connectivity-category.png" alt="Connectivity" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_connectivity">Connectivity</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_connectivity_desc">IoT network and broadband links.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/analytics-category.png" alt="Analytics" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_analytics">Analytics</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_analytics_desc">Derived intelligence and mapping.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/telemetry-category.png" alt="Telemetry" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_telemetry">Telemetry</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_telemetry_desc">Raw sensor outputs and GNSS data.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/maritime-category.png" alt="Maritime" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_maritime">Maritime</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_maritime_desc">Vessel tracking and AIS overlays.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/agriculture-category.png" alt="Agriculture" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_agriculture">Agriculture</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_agriculture_desc">Crop health and NDVI models.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/urban-category.png" alt="Urban Planning" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_urban">Urban</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_urban_desc">Infrastructure and night lights.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/forestry-category.png" alt="Forestry" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_forestry">Forestry</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_forestry_desc">Deforestation and biomass.</p>

              </a>

              <a href="#" class="group block w-[calc(20%-1.2rem)] flex-shrink-0 snap-start">

                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-black mb-3 relative border border-gray-200 dark:border-gray-700">

                  <img src="${basePath}/assets/categories/energy-category.png" alt="Energy" class="w-full h-full object-cover">

                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>

                <h4 class="text-base font-bold tracking-heading text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors" data-lang="cat_energy">Energy</h4>

                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal" data-lang="cat_energy_desc">Solar irradiance and pipelines.</p>

              </a>

            </div>

          </div>

        </div>

        <input type="text" id="nav-search" data-lang="nav_search_placeholder" placeholder="Search satellites, providers, data types..." class="h-12 w-64 xl:w-[448px] px-4 text-base bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white transition-colors">

        <button id="nav-search-btn" class="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">

          <span class="material-symbols-outlined text-[20px]">search</span>

        </button>

      </div>

      <div class="flex lg:hidden flex-1 justify-end">

        <button data-collapse-toggle="mobile-menu" type="button" class="text-black dark:text-white focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">

          <span class="material-symbols-outlined text-[24px]">menu</span>

        </button>

      </div>

      <div class="flex-1 hidden lg:flex items-center justify-end gap-3">

        <a href="${basePath}/pages/login.html" id="nav-login-btn" class="h-12 px-6 text-base font-medium text-gray-800 dark:text-gray-200 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors inline-flex items-center justify-center" data-lang="nav_login">Log in</a>

        <a href="${basePath}/pages/login.html" id="nav-signup-btn" class="h-12 px-6 text-base font-medium text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors inline-flex items-center justify-center" data-lang="nav_signup">Sign up</a>

      </div>

    </div>

    <div class="hidden lg:hidden w-full" id="mobile-menu">

      <div class="px-6 pt-2 pb-6 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl">

        <div class="mb-4 pt-2">

          <input type="text" data-lang="nav_search_mobile" placeholder="Search satellites..." class="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 text-black dark:text-white dark:placeholder-gray-500 transition-colors">

        </div>

        <a href="#" class="block px-4 py-3 text-base font-medium text-black dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center" data-lang="nav_categories">Categories</a>

        <a href="#" class="block px-4 py-3 text-base font-medium text-black dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center" data-lang="nav_login">Log in</a>

        <a href="#" class="block px-4 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 text-center" data-lang="nav_signup">Sign up</a>

      </div>

    </div>

  </nav>
`;
}
