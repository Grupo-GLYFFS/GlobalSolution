/**
 * Gera o HTML dinâmico para um "card" individual de satélite.
 * Este componente reutilizável pega os dados em JSON de um satélite específico e os injeta 
 * na marcação HTML, permitindo renderizar listas de satélites no Marketplace ou em Produtos Similares.
 * 
 * @param {Object} satellite - Objeto contendo os dados do satélite (nome, categoria, preço, nota, etc).
 * @param {string} basePath - O caminho relativo raiz para as imagens e links de página.
 * @param {string} extraClasses - (Opcional) Classes CSS adicionais do Tailwind para injetar no container pai do card.
 * @returns {string} - Código HTML renderizável do card preenchido com as informações.
 */
window.getSatelliteCardHtml = function getSatelliteCardHtml(satellite, basePath = '.', extraClasses = '') {

  // Arredonda a nota do satélite para baixo para sabermos quantas estrelas inteiras desenhar (ex: 4.8 = 4 estrelas cheias)
  const ratingStars = Math.floor(satellite.rating);

  let starsHtml = '';

  // Cria um loop de 0 a 4 (5 vezes no total) para gerar os ícones de estrela
  for (let i = 0; i < 5; i++) {

    // Se a iteração atual for menor que a nota (ex: i=0, 1, 2, 3 para nota 4), pinta a estrela de preto. Senão, pinta de cinza.
    const starClass = i < ratingStars ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600';

    starsHtml += `<span class="material-symbols-outlined text-[16px] ${starClass}">star</span>`;

  }

  // Define uma cor padrão (azul) para o pontinho colorido ao lado da categoria do satélite
  let dotColor = 'bg-accent-blue';

  // Altera a cor do ponto de acordo com a categoria específica para ajudar na identificação visual rápida
  if (satellite.category === 'Climate') dotColor = 'bg-accent-purple';

  if (satellite.category === 'Telemetry') dotColor = 'bg-accent-orange';

  // Retorna o template HTML gigante, interpolando as variáveis preparadas acima usando ${...}
  return `

    <div class="satellite-card bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden transition-colors ${extraClasses}">

      <div class="h-40 bg-black overflow-hidden"><img src="${basePath}/${satellite.image}" alt="${satellite.name}" class="w-full h-full object-cover"></div>

      <div class="p-4 flex-1 flex flex-col">

        <div class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-caps flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span><span data-lang="cat_${satellite.category.toLowerCase().replace(' ', '_')}">${satellite.category}</span></div>

        <h3 class="text-base font-bold tracking-heading text-black dark:text-white mt-1 leading-none"><a href="${basePath}/pages/satellite.html?id=${satellite.id}" class="hover:underline">${satellite.name}</a></h3>

        <p class="text-base text-gray-500 dark:text-gray-400 mt-1">${satellite.provider}</p>

        <div class="flex items-center gap-2 mt-2">

          <div class="flex items-center">

            ${starsHtml}

          </div>

          <span class="text-xs text-gray-400 dark:text-gray-500">${satellite.rating.toFixed(1)} (${satellite.reviews})</span>

        </div>

        <div class="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">

          <span data-lang="sat_res_${satellite.resolution.toLowerCase().replace(/[^a-z0-9]/g, '_')}">${satellite.resolution}</span><span class="text-gray-400 dark:text-gray-600"> • </span><span data-lang="sat_rev_${satellite.revisit.toLowerCase().replace(/[^a-z0-9]/g, '_')}">${satellite.revisit}</span><span class="text-gray-400 dark:text-gray-600"> • </span><span data-lang="sat_fmt_${satellite.format.toLowerCase().replace(/[^a-z0-9]/g, '_')}">${satellite.format}</span>

        </div>

        <div class="mt-auto">

          <div class="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-baseline gap-1">

            <span class="text-xl font-bold tracking-heading dark:text-white">${satellite.price}</span>

            <span class="text-xs text-gray-400 dark:text-gray-500" data-lang="sat_unit_${satellite.priceUnit.replace('/ ', '').replace('', '2')}">${satellite.priceUnit}</span>

          </div>

          <a href="${basePath}/pages/satellite.html?id=${satellite.id}" class="mt-4 w-full py-2 text-base font-semibold text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center inline-block" data-lang="satellite_get_access">Get access</a>

        </div>

      </div>

    </div>

  `;

}