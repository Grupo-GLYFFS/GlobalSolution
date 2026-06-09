/**
 * Inicializa a renderização 3D do globo terrestre interativo usando a biblioteca Three.js.
 * Esta função cria a cena, a Terra, os satélites orbitando ao redor dela, e lida com
 * a interação do usuário (cliques para abrir popups de informações).
 * 
 * @param {string} canvasId - O ID do elemento <canvas> no HTML onde o 3D será desenhado.
 * @param {string} popupId - O ID do elemento HTML que funcionará como popup flutuante de dados do satélite.
 * @param {string} basePath - O caminho base para o carregamento de texturas (ex: imagens do planeta).
 */
window.initialize3DGlobe = function(canvasId = 'globe-canvas', popupId = 'sat-popup', basePath = '.') {

// Tenta pegar a largura e altura reais do elemento pai do canvas. Se falhar, usa 300px como um fallback seguro.
const INITIAL_WIDTH = document.getElementById(canvasId).parentElement.clientWidth || 300;

const INITIAL_HEIGHT  = document.getElementById(canvasId).parentElement.clientHeight || 300;

// Constantes físicas e matemáticas para a simulação orbital
const EARTH_RADIUS_IN_KM = 6371; // Raio real da Terra em km, usado como proporção para a altitude dos satélites

const GLOBE_ROTATION_SPEED = 0.001; // Velocidade com que o planeta Terra gira no próprio eixo

const SATELLITE_ORBITAL_SPEED = 0.003; // Velocidade base com que os satélites percorrem suas órbitas

const POPUP_DISTANCE_ABOVE_SATELLITE = 90; // Não está mais em uso, mas definia a distância do popup

// Lista que vai guardar os objetos 3D de cada satélite e seus dados brutos para uso futuro
const satellitesList = [];

// Variável que armazena qual satélite o usuário clicou por último (se houver algum)
let satelliteWithOpenPopup = null;

/**
 * Função global chamada quando o usuário clica no botão "X" (fechar) do popup.
 * Ela limpa a seleção atual e esconde o elemento HTML do popup.
 */
window.closeGlobePopup = function() { satelliteWithOpenPopup = null; document.getElementById(popupId).style.display = "none"; };

// --- CONFIGURAÇÃO INICIAL DO THREE.JS ---

// A 'Scene' é o palco 3D onde todos os objetos (Terra, luzes, satélites) serão colocados
const scene = new THREE.Scene();

// Cria uma câmera de perspectiva (parecida com o olho humano).
// Parâmetros: Campo de visão (45 graus), Proporção da tela, Distância mínima de renderização, Distância máxima
const camera = new THREE.PerspectiveCamera(45, INITIAL_WIDTH / INITIAL_HEIGHT, 0.1, 1000);

// Afasta a câmera no eixo Z para podermos ver o globo de fora
camera.position.z = 3;

// O Renderizador é o motor que desenha a cena 3D dentro do Canvas HTML
const renderer = new THREE.WebGLRenderer({

  canvas: document.getElementById(canvasId),

  antialias: true, // Suaviza as bordas dos objetos 3D (tira o serrilhado)

  alpha: true, // Permite que o fundo do canvas seja transparente para mostrar o CSS de fundo

});

// Define o tamanho inicial em pixels em que o renderizador vai desenhar
renderer.setSize(INITIAL_WIDTH, INITIAL_HEIGHT);

// Atualiza a matriz de cálculo da câmera sempre que mudamos seu tamanho (boas práticas do Three.js)
window.addEventListener('resize', () => {

  const newWidth = document.getElementById(canvasId).parentElement.clientWidth;

  const newHeight = document.getElementById(canvasId).parentElement.clientHeight;

  renderer.setSize(newWidth, newHeight);

  camera.aspect = newWidth / newHeight;

  camera.updateProjectionMatrix();

});

// --- CRIAÇÃO DO PLANETA TERRA ---

// Cria o formato de uma esfera perfeita (Raio 1, com 64 segmentos de largura e altura para ficar redonda)
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

// Carrega a imagem estática (textura) que será "enrolada" ao redor da esfera
const earthTexture = new THREE.TextureLoader().load(basePath + '/assets/textures/earth-night.jpg');

// Cria o material da Terra que reage à luz (MeshPhongMaterial), dando um brilho sutil aos oceanos
const earthSurfaceMaterial = new THREE.MeshPhongMaterial({

  map: earthTexture, // Aplica a imagem carregada

  specular: new THREE.Color(0x111111), // Define a cor do reflexo da luz (cinza escuro)

  shininess: 5, // Define o quão brilhante e concentrado é o reflexo

});

// Junta o formato (Geometria) com a aparência (Material) para formar o objeto 3D final
const globe = new THREE.Mesh(sphereGeometry, earthSurfaceMaterial);

// Adiciona a Terra no palco 3D
scene.add(globe);

// --- ILUMINAÇÃO ---

// Cria uma luz direcional forte, simulando o Sol vindo de cima/direita
const sunlight = new THREE.DirectionalLight(0xffffff, 0.8);

sunlight.position.set(5, 3, 5); // Posiciona a luz em (x=5, y=3, z=5)

scene.add(sunlight);

// Cria uma luz ambiente fraca que preenche as áreas de sombra para que não fiquem 100% pretas
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

scene.add(ambientLight);

// --- CONTROLES DE INTERAÇÃO DO MOUSE ---

// TrackballControls permite que o usuário clique e arraste para girar a Terra com o mouse
const orbitControls = new THREE.TrackballControls(camera, renderer.domElement);

orbitControls.noZoom = true; // Desabilita o zoom do scroll do mouse para não conflitar com a página

orbitControls.noPan = true; // Impede que o usuário arraste a câmera para fora do centro

orbitControls.rotateSpeed = 2.0; // Velocidade com que o globo acompanha o arrasto do mouse

// --- SISTEMA DE CLIQUES (RAYCASTER) ---

// O Raycaster funciona como um "laser" que sai da câmera em direção ao mouse para descobrir em qual objeto o usuário clicou
const clickDetector = new THREE.Raycaster();

// Guarda a posição X/Y do mouse convertida para o formato que o Raycaster entende (de -1 a 1)
const normalizedMousePosition = new THREE.Vector2();

// --- ANEL DE SELEÇÃO VISUAL ---

// Cria a geometria geométrica de um pequeno anel fino
const ringGeometry = new THREE.TorusGeometry(0.04, 0.005, 8, 24);

const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });

// Junta e cria o objeto do anel, que começará invisível
const selectionRing = new THREE.Mesh(ringGeometry, ringMaterial);

selectionRing.visible = false;

scene.add(selectionRing);

/**
 * Calcula a posição 3D exata (X, Y, Z) de um satélite com base em seus parâmetros orbitais clássicos.
 * É aqui que a matemática espacial (Mecânica Orbital simplificada) acontece.
 * 
 * @param {number} inclinationInDegrees - A inclinação da órbita em relação à linha do equador (0 = mesma linha, 90 = passa pelos polos).
 * @param {number} raanInDegrees - (Right Ascension of the Ascending Node) Rotaciona a órbita ao longo do equador.
 * @param {number} altitudeInKilometers - Distância da superfície (impacta quão longe o satélite renderiza do raio 1 da Terra).
 * @param {number} currentAngleInOrbit - O quão "frente" o satélite já andou em seu caminho (Anomalia verdadeira).
 * @returns {THREE.Vector3} Um vetor 3D com as coordenadas (x, y, z) finais prontas para o Three.js.
 */
function calculateSatellite3DPosition(inclinationInDegrees, raanInDegrees, altitudeInKilometers, currentAngleInOrbit) {

  // Passo 1: Calcula o raio total (Raio da Terra = 1, então somamos a proporção da altitude real)
  const orbitRadius = 1 + (altitudeInKilometers / EARTH_RADIUS_IN_KM);

  // Passo 2: Define a posição inicial num plano 2D perfeito (como se estivesse alinhado ao equador)
  const basePositionX = orbitRadius * Math.cos(currentAngleInOrbit);

  const basePositionY = orbitRadius * Math.sin(currentAngleInOrbit);

  const basePositionZ = 0; // Começa sem profundidade

  // Converte a inclinação de graus para radianos porque Math.cos e Math.sin do Javascript exigem radianos
  const inclinationInRadians = THREE.MathUtils.degToRad(inclinationInDegrees);

  // Passo 3: Rotaciona (inclina) essa posição no eixo X/Y dependendo da inclinação (ex: 90 graus coloca a órbita no eixo vertical/polar)
  const inclinedPositionX = basePositionX;

  const inclinedPositionY = basePositionY * Math.cos(inclinationInRadians) - basePositionZ * Math.sin(inclinationInRadians);

  const inclinedPositionZ = basePositionY * Math.sin(inclinationInRadians) + basePositionZ * Math.cos(inclinationInRadians);

  // Converte o ângulo RAAN para radianos
  const raanInRadians = THREE.MathUtils.degToRad(raanInDegrees);

  // Passo 4: Gira a órbita já inclinada ao redor do polo (eixo Z), posicionando ela perfeitamente no espaço sideral
  const finalPositionX = inclinedPositionX * Math.cos(raanInRadians) - inclinedPositionY * Math.sin(raanInRadians);

  const finalPositionY = inclinedPositionX * Math.sin(raanInRadians) + inclinedPositionY * Math.cos(raanInRadians);

  const finalPositionZ = inclinedPositionZ;

  // Retorna as coordenadas X, Y, Z finais
  return new THREE.Vector3(finalPositionX, finalPositionY, finalPositionZ);

}

/**
 * Converte a posição 3D pura de um objeto (X,Y,Z) para as coordenadas de Pixel da tela 2D do usuário.
 * Usado se precisarmos grudar elementos HTML (como popups) na tela seguindo um objeto 3D.
 */
function convert3DPositionToScreenPixels(position3D) {

  const clonedPosition = position3D.clone();

  // "Projéta" a posição no espaço bidimensional com base no ângulo da câmera atual
  clonedPosition.project(camera);

  // Pega onde o canvas HTML está desenhado fisicamente na tela
  const canvasRectangle = renderer.domElement.getBoundingClientRect();

  // Converte as coordenadas matemáticas de volta para Pixels Reais
  const xInPixels = (clonedPosition.x * 0.5 + 0.5) * canvasRectangle.width + canvasRectangle.left;

  const yInPixels = (-clonedPosition.y * 0.5 + 0.5) * canvasRectangle.height + canvasRectangle.top;

  return { x: xInPixels, y: yInPixels };

}

/**
 * Verifica matematicamente se o satélite está "de frente" para a câmera,
 * ou se ele está escondido atrás do planeta Terra.
 */
function checkIfSatelliteIsVisibleToCamera(satellitePosition) {

  const normalizedCameraDirection = camera.position.clone().normalize();

  const normalizedSatelliteDirection = satellitePosition.clone().normalize();

  // Se o Produto Escalar (dot) for maior que 0, eles estão apontando mais ou menos na mesma direção (satélite visível)
  return normalizedCameraDirection.dot(normalizedSatelliteDirection) > 0;

}

/**
 * Pega os dados do satélite selecionado e injeta no HTML do Popup.
 * Ele formata informações como preço, avaliação, estrelas e resolução para visualização.
 * 
 * @param {Object} satelliteData - Dicionário JSON do satélite com propriedades (name, price, rating, etc)
 */
function displayPopupWithSatelliteData(satelliteData) {

  const popupElement = document.getElementById(popupId);

  // Arredonda a nota de avaliação para descobrir quantas estrelas amarelas desenhar (ex: 4.8 = 4 estrelas cheias)
  const ratingStars = Math.floor(satelliteData.rating || 5);

  let starsHtml = '';

  // Cria um loop de 5 voltas para renderizar as 5 estrelas do sistema de avaliação
  for (let i = 0; i < 5; i++) {

    // Se o loop estiver abaixo do número da avaliação, pinta de preto/branco (ativo), senão cinza (inativo)
    const starClass = i < ratingStars ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500';

    starsHtml += `<span class="material-symbols-outlined text-[16px] ${starClass}">star</span>`;

  }

  // Preenche o HTML do Popup dinamicamente interpolando variáveis Javascript na string
  popupElement.innerHTML = `

    <div class="p-4 flex flex-col">

      <div class="flex justify-between items-start">

        <div>

          <div class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-caps">${satelliteData.category || "Imagery"}</div>

          <h3 class="text-base font-bold tracking-heading text-black dark:text-white mt-1 leading-none"><a href="${basePath}/pages/satellite.html?id=${satelliteData.id}" class="hover:underline">${satelliteData.name}</a></h3>

          <p class="text-base text-gray-500 mt-1">${satelliteData.provider}</p>

        </div>

        <button onclick="window.closeGlobePopup()" class="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">

          <span class="material-symbols-outlined text-[20px]">close</span>

        </button>

      </div>

      <div class="flex items-center gap-2 mt-2">

        <div class="flex items-center">

          ${starsHtml}

        </div>

        <span class="text-xs text-gray-400">${(satelliteData.rating || 5.0).toFixed(1)} (${satelliteData.reviews || 0})</span>

      </div>

      <div class="flex items-center gap-2 mt-3 text-xs text-gray-500">

        <span>${satelliteData.resolution || "N/A"}</span><span class="text-gray-400">•</span><span>${satelliteData.revisit || "N/A"}</span><span class="text-gray-400">•</span><span>${satelliteData.format || "N/A"}</span>

      </div>

      <div class="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 flex items-baseline gap-1">

        <span class="text-xl font-bold tracking-heading dark:text-white">${satelliteData.price || "Free"}</span>

        <span class="text-xs text-gray-400 dark:text-gray-500">${satelliteData.priceUnit || ""}</span>

      </div>

      <a href="${basePath}/pages/satellite.html?id=${satelliteData.id}" class="mt-4 w-full py-2 text-base font-semibold text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center inline-block">Get access</a>

    </div>

  `;

  // Depois de preenchido, torna a div (display: none) visível na tela (display: block)
  popupElement.style.display = 'block';

}

// --- GERAÇÃO DOS SATÉLITES E SUAS ÓRBITAS ---

// Se o banco de dados de satélites carregou globalmente...
if (window.satellites) {

  // Percorre a lista de todos os satélites disponíveis no sistema
  window.satellites.forEach(function(currentSatelliteData) {

    // Filtra: só renderiza no globo os satélites que possuírem altitude definida (ignora pacotes virtuais)
    if(!currentSatelliteData.altitudeInKilometers) return;

    // Cria a forma visual de um pequeno pontinho brilhante que será o satélite
    const satelliteGeometry = new THREE.SphereGeometry(0.02, 8, 8);

    const satelliteMaterial = new THREE.MeshBasicMaterial({

      color: currentSatelliteData.satelliteColorCode || '#E8510A' // Usa a cor do satélite ou laranja por padrão

    });

    const satelliteMesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);

    scene.add(satelliteMesh);

    // Agora desenhamos a "linha" tracejada da órbita por onde o satélite viaja
    const orbitLinePoints = [];

    // Calcula 64 pontos ao redor de todo o circulo 3D orbital para desenhar a linha
    for (let pointIndex = 0; pointIndex <= 64; pointIndex++) {

      const orbitPointAngle = (pointIndex / 64) * Math.PI * 2; // Faz a volta completa de 0 a 360 graus em radianos

      orbitLinePoints.push(

        calculateSatellite3DPosition(

          currentSatelliteData.inclinationInDegrees,

          currentSatelliteData.raanInDegrees,

          currentSatelliteData.altitudeInKilometers,

          orbitPointAngle

        )

      );

    }

    // Passa os pontos matemáticos calculados para uma geometria real e tracejada de Linha
    const orbitLineGeometry = new THREE.BufferGeometry().setFromPoints(orbitLinePoints);

    const orbitLineMaterial = new THREE.LineDashedMaterial({

      color: currentSatelliteData.satelliteColorCode || '#E8510A',

      transparent: true,

      opacity: 0.25, // Linha um pouco apagada para não poluir visualmente

      dashSize: 0.01,

      gapSize: 0.02,

    });

    const orbitLine = new THREE.Line(orbitLineGeometry, orbitLineMaterial);

    orbitLine.computeLineDistances(); // Essencial para o tracejado funcionar

    scene.add(orbitLine);

    // Salva na memória o modelo 3D recém gerado associado com a posição orbital dele atual (numa posição inicial randômica)
    satellitesList.push({

      mesh: satelliteMesh,

      data: currentSatelliteData,

      currentAngleInOrbit: Math.random() * Math.PI * 2, // Ele nasce em um local aleatório da sua própria trilha orbital

    });

  });

}

// --- INTERCEPTAÇÃO DE CLIQUES ---

// Adiciona evento de clique especificamente no canvas de WebGL (para detectarmos cliques nos satélites 3D)
document.getElementById(canvasId).addEventListener('click', function(clickEvent) {

  const canvasRectangle = renderer.domElement.getBoundingClientRect();

  // Converte a posição do clique (Pixeis do navegador) para o Sistema de Coordenadas Normalizadas (-1 até +1) que o 3D exige
  normalizedMousePosition.x = ((clickEvent.clientX - canvasRectangle.left) / canvasRectangle.width) * 2 - 1;

  normalizedMousePosition.y = -((clickEvent.clientY - canvasRectangle.top) / canvasRectangle.height) * 2 + 1;

  // Prepara o "Raio/Laser" partindo da câmera em direção ao ponto clicado no espaço 3D
  clickDetector.setFromCamera(normalizedMousePosition, camera);

  // Pega apenas a lista dos objetos 3D puros de satélite que estão em cena para otimizar o teste de intersecção
  const satelliteMeshesList = satellitesList.map(function(satellite) {

    return satellite.mesh;

  });

  // O Raycaster avalia em quais objetos da lista o laser imaginário colidiu
  const intersectedObjects = clickDetector.intersectObjects(satelliteMeshesList);

  // Se ele atingiu pelo menos 1 objeto...
  if (intersectedObjects.length > 0) {

    const clickedSatelliteMesh = intersectedObjects[0].object; // Pega o primeiro objeto atingido

    // Localiza a qual objeto e dados do banco esse "Mesh 3D" pertence
    satelliteWithOpenPopup = satellitesList.find(function(satellite) {

      return satellite.mesh === clickedSatelliteMesh;

    });

    // Dispara a função que desenha a janelinha do satélite com seus dados na tela do usuário
    displayPopupWithSatelliteData(satelliteWithOpenPopup.data);

  } else {

    // Se ele clicou no fundo do espaço estrelado vazio, desativa as marcações e esconde a janelinha (popup)
    satelliteWithOpenPopup = null;

    document.getElementById(popupId).style.display = 'none';

  }

});

// Evento que esconde o popup se o usuário clicar no texto ou em outro lugar fora do globo 3D
document.addEventListener('click', function(pageClickEvent) {

  const canvasElement = document.getElementById(canvasId);

  const popupElement  = document.getElementById(popupId);

  if (!canvasElement || !popupElement) return;

  const clickedInsideCanvas = canvasElement.contains(pageClickEvent.target);

  const clickedInsidePopup  = popupElement.contains(pageClickEvent.target);

  // Se não clicou dentro do globo nem dentro da janela já aberta, fecha a janela
  if (!clickedInsideCanvas && !clickedInsidePopup) {

    satelliteWithOpenPopup = null;

    popupElement.style.display = 'none';

  }

});

// --- MOTOR DE FÍSICA E ANIMAÇÃO ---

/**
 * Função de Loop Infinito do Javascript (Game Loop).
 * Executada dezenas de vezes por segundo (geralmente 60 FPS) para criar o movimento das coisas.
 */
function executeAnimationLoopFrame() {

  // Agenda a própria função para rodar no próximo frame liberado pelo navegador
  requestAnimationFrame(executeAnimationLoopFrame);

  // Mantém ativo os controles de arrastar da câmera e a inércia/fricção do Trackball
  orbitControls.update();

  // Rotaciona constantemente a textura da Terra em seu próprio eixo
  globe.rotation.y += GLOBE_ROTATION_SPEED;

  // Itera sobre todos os satélites em cena para movê-los um pouco para a frente em sua órbita
  satellitesList.forEach(function(currentSatellite) {

    // Soma a velocidade orbital do satélite à sua posição atual de ângulo na órbita dele
    currentSatellite.currentAngleInOrbit += SATELLITE_ORBITAL_SPEED;

    // Recalcula o novo lugar em X,Y,Z para onde ele viajou nesse frame
    const newSatellite3DPosition = calculateSatellite3DPosition(

      currentSatellite.data.inclinationInDegrees,

      currentSatellite.data.raanInDegrees,

      currentSatellite.data.altitudeInKilometers,

      currentSatellite.currentAngleInOrbit

    );

    // Substitui fisicamente o satélite para a nova posição calculada
    currentSatellite.mesh.position.copy(newSatellite3DPosition);

  });

  // Se o usuário selecionou um satélite e a janela estiver aberta...
  if (satelliteWithOpenPopup !== null) {

    // Mantém acessível em global (opcional)
    window.satelliteWithOpenPopup = satelliteWithOpenPopup;

    const currentOpenSatellitePosition = satelliteWithOpenPopup.mesh.position;

    // Mostra aquele anel branco ao redor dele
    selectionRing.visible = true;

    // Coloca o anel na exata coordenada do satélite que acabou de se mover
    selectionRing.position.copy(currentOpenSatellitePosition);

    // Gira o anel para que o usuário consiga visualizá-lo de frente
    selectionRing.lookAt(camera.position);

    // Garante que o painel flutuante de dados do satélite continua na tela
    const popupElement = document.getElementById(popupId);

    popupElement.style.display = 'block';

  } else {

    // Se nenhum satélite estiver selecionado, oculta o anel branco brilhante do mapa
    selectionRing.visible = false;

  }

  // Comanda o motor do Three.js a tirar uma "foto" desse frame já atualizado e jogar na tela HTML
  renderer.render(scene, camera);

}

// Dá o "Start" para que a cena comece a rodar pela primeira vez
executeAnimationLoopFrame();

};