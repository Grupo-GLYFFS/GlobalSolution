window.init3DGlobe = function(canvasId = 'globe-canvas', popupId = 'sat-popup', basePath = '.') {

// =============================================================================
// SEÇÃO 1 — CONFIGURAÇÕES GERAIS
// =============================================================================

const LARGURA_DO_CANVAS = 700;
const ALTURA_DO_CANVAS  = 700;
const RAIO_DA_TERRA_EM_KM = 6371;
const VELOCIDADE_ROTACAO_DO_GLOBO = 0.001;
const VELOCIDADE_ORBITAL_DO_SATELITE = 0.003;
const DISTANCIA_DO_POPUP_ACIMA_DO_SATELITE = 90;

// =============================================================================
// SEÇÃO 2 — VARIÁVEIS DE ESTADO
// =============================================================================

const listaDeSatelites = [];
let sateliteComPopupAberto = null;

// =============================================================================
// SEÇÃO 3 — CONFIGURAÇÃO DO THREE.JS
// =============================================================================

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, LARGURA_DO_CANVAS / ALTURA_DO_CANVAS, 0.1, 1000);
camera.position.z = 3;

const renderizador = new THREE.WebGLRenderer({
  canvas: document.getElementById(canvasId),
  antialias: true,
  alpha: true,
});

renderizador.setSize(LARGURA_DO_CANVAS, ALTURA_DO_CANVAS);
renderizador.setPixelRatio(window.devicePixelRatio);

// =============================================================================
// SEÇÃO 4 — CRIAÇÃO DO GLOBO (TERRA)
// =============================================================================

const geometriaDaEsfera = new THREE.SphereGeometry(1, 64, 64);
// Caminho baseando-se no basePath ou na raiz se rodando em subpastas
const texturaDaTerra = new THREE.TextureLoader().load(basePath + '/assets/textures/earth-night.jpg');

const materialDaSuperficieDaTerra = new THREE.MeshPhongMaterial({
  map: texturaDaTerra,
  specular: new THREE.Color(0x111111),
  shininess: 5,
});

const globo = new THREE.Mesh(geometriaDaEsfera, materialDaSuperficieDaTerra);
cena.add(globo);

// =============================================================================
// SEÇÃO 5 — ILUMINAÇÃO
// =============================================================================

const luzDoSol = new THREE.DirectionalLight(0xffffff, 0.8);
luzDoSol.position.set(5, 3, 5);
cena.add(luzDoSol);

const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.4);
cena.add(luzAmbiente);

// =============================================================================
// SEÇÃO 6 — CONTROLES DE MOUSE
// =============================================================================

const controlesDeOrbita = new THREE.OrbitControls(camera, renderizador.domElement);
controlesDeOrbita.enableZoom = false;
controlesDeOrbita.enableDamping = true;
controlesDeOrbita.dampingFactor = 0.05;

// =============================================================================
// SEÇÃO 7 — DETECÇÃO DE CLIQUE (RAYCASTING)
// =============================================================================

const detectorDeClique = new THREE.Raycaster();
const posicaoDoMouseNormalizada = new THREE.Vector2();

// =============================================================================
// SEÇÃO 8 — FUNÇÕES AUXILIARES
// =============================================================================

function calcularPosicao3DDoSatelite(inclinacaoEmGraus, raanEmGraus, altitudeEmKm, anguloAtualNaOrbita) {
  const raioDaOrbita = 1 + (altitudeEmKm / RAIO_DA_TERRA_EM_KM);
  const posicaoBaseX = raioDaOrbita * Math.cos(anguloAtualNaOrbita);
  const posicaoBaseY = raioDaOrbita * Math.sin(anguloAtualNaOrbita);
  const posicaoBaseZ = 0;

  const inclinacaoEmRadianos = THREE.MathUtils.degToRad(inclinacaoEmGraus);
  const posicaoInclinadaX = posicaoBaseX;
  const posicaoInclinadaY = posicaoBaseY * Math.cos(inclinacaoEmRadianos) - posicaoBaseZ * Math.sin(inclinacaoEmRadianos);
  const posicaoInclinadaZ = posicaoBaseY * Math.sin(inclinacaoEmRadianos) + posicaoBaseZ * Math.cos(inclinacaoEmRadianos);

  const raanEmRadianos = THREE.MathUtils.degToRad(raanEmGraus);
  const posicaoFinalX = posicaoInclinadaX * Math.cos(raanEmRadianos) - posicaoInclinadaY * Math.sin(raanEmRadianos);
  const posicaoFinalY = posicaoInclinadaX * Math.sin(raanEmRadianos) + posicaoInclinadaY * Math.cos(raanEmRadianos);
  const posicaoFinalZ = posicaoInclinadaZ;

  return new THREE.Vector3(posicaoFinalX, posicaoFinalY, posicaoFinalZ);
}

function converterPosicao3DParaPixelsDaTela(posicao3D) {
  const posicaoClonada = posicao3D.clone();
  posicaoClonada.project(camera);

  const retanguloDoCanvas = renderizador.domElement.getBoundingClientRect();
  const xEmPixels = (posicaoClonada.x * 0.5 + 0.5) * retanguloDoCanvas.width + retanguloDoCanvas.left;
  const yEmPixels = (-posicaoClonada.y * 0.5 + 0.5) * retanguloDoCanvas.height + retanguloDoCanvas.top;

  return { x: xEmPixels, y: yEmPixels };
}

function verificarSeSateliteEstaVisivelParaCamera(posicaoDoSatelite) {
  const direcaoDaCameraNormalizada = camera.position.clone().normalize();
  const direcaoDoSateliteNormalizada = posicaoDoSatelite.clone().normalize();
  return direcaoDaCameraNormalizada.dot(direcaoDoSateliteNormalizada) > 0;
}

function exibirPopupComDadosDoSatelite(dadosDoSatelite) {
  const elementoDoPopup = document.getElementById(popupId);

  // Mapeamos para o padrão de propriedades do nosso arquivo satellites.js
  elementoDoPopup.innerHTML = `
    <span class="popup-type">${dadosDoSatelite.category || "Imagery"}</span>
    <h3>${dadosDoSatelite.name}</h3>
    <p>${dadosDoSatelite.provider}</p>
    <div class="popup-data">
      <span>${dadosDoSatelite.altitude_em_km} km</span>
    </div>
    <a href="${basePath}/pages/satellite.html?id=${dadosDoSatelite.id}">Ver detalhes →</a>
  `;

  elementoDoPopup.style.display = 'block';
}

// =============================================================================
// SEÇÃO 9 — CARREGAMENTO DOS SATÉLITES DO ARRAY GLOBAL
// =============================================================================

if (window.satellites) {
  window.satellites.forEach(function(dadosDoSateliteAtual) {
    // Apenas renderiza se o satélite possuir os dados orbitais
    if(!dadosDoSateliteAtual.altitude_em_km) return;

    const geometriaDoSatelite = new THREE.SphereGeometry(0.02, 8, 8);
    const materialDoSatelite = new THREE.MeshBasicMaterial({
      color: dadosDoSateliteAtual.cor || '#E8510A'
    });

    const meshDoSatelite = new THREE.Mesh(geometriaDoSatelite, materialDoSatelite);
    cena.add(meshDoSatelite);

    const pontosDaLinhaDeOrbita = [];
    for (let indiceDoPonto = 0; indiceDoPonto <= 64; indiceDoPonto++) {
      const anguloDopontoDaOrbita = (indiceDoPonto / 64) * Math.PI * 2;
      pontosDaLinhaDeOrbita.push(
        calcularPosicao3DDoSatelite(
          dadosDoSateliteAtual.inclinacao_em_graus,
          dadosDoSateliteAtual.raan_em_graus,
          dadosDoSateliteAtual.altitude_em_km,
          anguloDopontoDaOrbita
        )
      );
    }

    const geometriaLinhaDeOrbita = new THREE.BufferGeometry().setFromPoints(pontosDaLinhaDeOrbita);
    const materialLinhaDeOrbita = new THREE.LineDashedMaterial({
      color: dadosDoSateliteAtual.cor || '#E8510A',
      transparent: true,
      opacity: 0.25,
      dashSize: 0.01,
      gapSize: 0.02,
    });

    const linhaDeOrbita = new THREE.Line(geometriaLinhaDeOrbita, materialLinhaDeOrbita);
    linhaDeOrbita.computeLineDistances();
    cena.add(linhaDeOrbita);

    listaDeSatelites.push({
      mesh: meshDoSatelite,
      data: dadosDoSateliteAtual,
      anguloAtualNaOrbita: Math.random() * Math.PI * 2,
    });
  });
}

// =============================================================================
// SEÇÃO 10 — EVENTO DE CLIQUE NO CANVAS
// =============================================================================

document.getElementById(canvasId).addEventListener('click', function(eventoDeClique) {
  const retanguloDoCanvas = renderizador.domElement.getBoundingClientRect();
  posicaoDoMouseNormalizada.x = ((eventoDeClique.clientX - retanguloDoCanvas.left) / retanguloDoCanvas.width) * 2 - 1;
  posicaoDoMouseNormalizada.y = -((eventoDeClique.clientY - retanguloDoCanvas.top) / retanguloDoCanvas.height) * 2 + 1;

  detectorDeClique.setFromCamera(posicaoDoMouseNormalizada, camera);

  const listaDeMeshesDosSatelites = listaDeSatelites.map(function(satelite) {
    return satelite.mesh;
  });

  const objetosQueOCliquePegou = detectorDeClique.intersectObjects(listaDeMeshesDosSatelites);

  if (objetosQueOCliquePegou.length > 0) {
    const meshDoSateliteClicado = objetosQueOCliquePegou[0].object;
    sateliteComPopupAberto = listaDeSatelites.find(function(satelite) {
      return satelite.mesh === meshDoSateliteClicado;
    });
    exibirPopupComDadosDoSatelite(sateliteComPopupAberto.data);
  } else {
    sateliteComPopupAberto = null;
    document.getElementById(popupId).style.display = 'none';
  }
});

document.addEventListener('click', function(eventoDeCliqueNaPagina) {
  const elementoCanvas = document.getElementById(canvasId);
  const elementoPopup  = document.getElementById(popupId);

  if (!elementoCanvas || !elementoPopup) return;

  const clicouDentroDoCanvas = elementoCanvas.contains(eventoDeCliqueNaPagina.target);
  const clicouDentroDoPopup  = elementoPopup.contains(eventoDeCliqueNaPagina.target);

  if (!clicouDentroDoCanvas && !clicouDentroDoPopup) {
    sateliteComPopupAberto = null;
    elementoPopup.style.display = 'none';
  }
});

// =============================================================================
// SEÇÃO 11 — LOOP DE ANIMAÇÃO
// =============================================================================

function executarFrameDeAnimacao() {
  requestAnimationFrame(executarFrameDeAnimacao);
  controlesDeOrbita.update();
  globo.rotation.y += VELOCIDADE_ROTACAO_DO_GLOBO;

  listaDeSatelites.forEach(function(sateliteAtual) {
    sateliteAtual.anguloAtualNaOrbita += VELOCIDADE_ORBITAL_DO_SATELITE;
    const novaPosicao3DDoSatelite = calcularPosicao3DDoSatelite(
      sateliteAtual.data.inclinacao_em_graus,
      sateliteAtual.data.raan_em_graus,
      sateliteAtual.data.altitude_em_km,
      sateliteAtual.anguloAtualNaOrbita
    );
    sateliteAtual.mesh.position.copy(novaPosicao3DDoSatelite);
  });

  if (sateliteComPopupAberto !== null) {
    const posicaoAtualDoSateliteAberto = sateliteComPopupAberto.mesh.position;
    const elementoDoPopup = document.getElementById(popupId);

    if (verificarSeSateliteEstaVisivelParaCamera(posicaoAtualDoSateliteAberto)) {
      const posicaoDoPopupNaTela = converterPosicao3DParaPixelsDaTela(posicaoAtualDoSateliteAberto);
      elementoDoPopup.style.display = 'block';
      elementoDoPopup.style.left = posicaoDoPopupNaTela.x + 'px';
      elementoDoPopup.style.top  = (posicaoDoPopupNaTela.y - DISTANCIA_DO_POPUP_ACIMA_DO_SATELITE) + 'px';
    } else {
      elementoDoPopup.style.display = 'none';
      sateliteComPopupAberto = null;
    }
  }

  renderizador.render(cena, camera);
}

executarFrameDeAnimacao();

};
