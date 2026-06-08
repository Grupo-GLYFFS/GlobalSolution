window.getSatelliteCardHtml = function getSatelliteCardHtml(satellite, basePath = '.', extraClasses = '') {
  const ratingStars = Math.floor(satellite.rating);
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    const starClass = i < ratingStars ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600';
    starsHtml += `<span class="material-symbols-outlined text-[16px] ${starClass}">star</span>`;
  }

  let dotColor = 'bg-accent-blue';
  if (satellite.category === 'Climate') dotColor = 'bg-accent-purple';
  if (satellite.category === 'Telemetry') dotColor = 'bg-accent-orange';

  return `
    <div class="satellite-card bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden transition-colors ${extraClasses}">
      <div class="h-40 bg-black overflow-hidden"><img src="${satellite.image}" alt="${satellite.name}" class="w-full h-full object-cover"></div>
      <div class="p-4 flex-1 flex flex-col">
        <div class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-caps flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>${satellite.category}</div>
        <h3 class="text-base font-bold tracking-heading text-black dark:text-white mt-1 leading-none"><a href="${basePath}/pages/satellite.html?id=${satellite.id}" class="hover:underline">${satellite.name}</a></h3>
        <p class="text-base text-gray-500 dark:text-gray-400 mt-1">${satellite.provider}</p>
        <div class="flex items-center gap-2 mt-2">
          <div class="flex items-center">
            ${starsHtml}
          </div>
          <span class="text-xs text-gray-400 dark:text-gray-500">${satellite.rating.toFixed(1)} (${satellite.reviews})</span>
        </div>
        <div class="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span>${satellite.resolution}</span><span class="text-gray-400 dark:text-gray-600">•</span><span>${satellite.revisit}</span><span class="text-gray-400 dark:text-gray-600">•</span><span>${satellite.format}</span>
        </div>
        <div class="mt-auto">
          <div class="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-baseline gap-1">
            <span class="text-xl font-bold tracking-heading dark:text-white">${satellite.price}</span>
            <span class="text-xs text-gray-400 dark:text-gray-500">${satellite.priceUnit}</span>
          </div>
          <a href="${basePath}/pages/satellite.html?id=${satellite.id}" class="mt-4 w-full py-2 text-base font-semibold text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center inline-block">Get access</a>
        </div>
      </div>
    </div>
  `;
}
