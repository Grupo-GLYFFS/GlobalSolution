# DataOrbit 🌍🛰️

**Projeto Publicado:** [https://grupo-glyffs.github.io/GlobalSolution/](https://grupo-glyffs.github.io/GlobalSolution/)

> **DataOrbit** é uma plataforma B2B que atua como um *marketplace* de dados de satélite. Seu objetivo é permitir que empresas e desenvolvedores aluguem a capacidade de leitura de satélites reais no espaço sem precisar de infraestrutura própria. Os usuários podem selecionar o satélite, a resolução dos dados, o tempo de acesso e integrar tudo isso via API, webhooks ou download direto.

Este projeto foi desenvolvido como o MVP (Mínimo Produto Viável) para a entrega acadêmica da **Global Solution 2026/1** da **FIAP** (Engenharia de Software), com foco no tema de *Space Economy* (Economia Espacial).

---

## Como o Projeto Funciona

Diferente de projetos pesados construídos com React ou Angular, o **DataOrbit** foi construído utilizando puramente **HTML, CSS e Javascript (Vanilla)**. Para manter o código limpo, organizado e reutilizável, desenvolvemos um sistema próprio de **componentização dinâmica via JavaScript**, inspirado nos grandes frameworks modernos, mas sem a necessidade de etapas de compilação (build).

### O Sistema de Componentes (`javascript/utils/componentLoader.js`)
Para evitar a repetição de código (DRY) como copiar e colar o mesmo cabeçalho (`navbar`) ou rodapé (`footer`) em todas as páginas, criamos um carregador de componentes.
O `componentLoader.js` é executado sempre que a página termina de carregar. Ele procura no HTML por marcações vazias, como `<div id="navbar-placeholder"></div>`, e automaticamente injeta o HTML correspondente gerado por arquivos isolados (ex: `navbar.js` e `footer.js`). 
Isso significa que, se alterarmos um link do menu, ele será atualizado em todo o site instantaneamente!

### O Sistema de Estilização (`Tailwind CSS`)
Utilizamos o **Tailwind CSS** injetado via CDN para garantir uma estilização rápida e responsiva. As configurações base do design (cores primárias, fontes, arredondamentos) ficam armazenadas e centralizadas no arquivo `javascript/tailwind.config.js`. 
Todo o layout foi planejado seguindo o modo claro (*Light*) e o modo noturno (*Dark*).

### O Sistema Multi-idiomas (`javascript/utils/language.js`)
A plataforma foi construída com suporte à internacionalização desde o dia 1.
O script `language.js` atua como um gerenciador de traduções. Ele cria e lê um banco de palavras interno e as substitui em tempo real nas páginas sempre que o usuário seleciona um novo idioma (Inglês, Português ou Espanhol) no rodapé. Essa preferência é salva no *LocalStorage* do navegador para que todas as páginas subsequentes já carreguem no idioma correto.

### O Sistema de Interação Visual (`javascript/utils/ui-components.js`)
Em vez de depender de pesadas bibliotecas externas para menus, *dropdowns*, galerias rotativas (*carousels*) e botões, escrevemos um núcleo focado apenas nas nossas necessidades de UI (`ui-components.js`). 
Ele utiliza o padrão de **Event Delegation** para escutar cliques na tela de forma otimizada e gerenciar dinamicamente aberturas de menus flutuantes, *drawers* e alternâncias visuais.

---

## Arquitetura de Arquivos e Pastas

*   **`/` (Raiz)**
    *   `index.html`: A *Landing Page* principal. Contém animações e chamadas para ação.
    *   `README.md`: Este documento que você está lendo.
*   **`/pages` (Páginas Internas)**
    *   `marketplace.html`: A página de catálogo onde o usuário encontra e filtra os satélites por resolução e provedor.
    *   `satellite.html`: Página de detalhes de um satélite específico (contém galeria, especificações e planos de assinatura).
    *   `checkout.html`: Fluxo simulado de finalização de aluguel e pagamento (dividido em etapas dinâmicas simuladas por JavaScript).
    *   `login.html`: Tela de acesso à conta.
*   **`/javascript` (Cérebro do Projeto)**
    *   `/components`: Funções JavaScript que retornam "Pedaços de HTML" (ex: `navbar.js`, `footer.js`, `satellite-card.js`, `carousel.js`).
    *   `/data`: Base de dados simulada (mocks) que abastecem a página de marketplace com conteúdo realístico sem necessitar de um backend real no momento.
    *   `/pages`: Scripts focados em apenas rodar lógicas exclusivas de uma página (ex: validações do *checkout* ou animações da *home*).
    *   `/utils`: As bibliotecas que criamos (`componentLoader.js`, `language.js`, `themeManager.js`, `ui-components.js`).
*   **`/css`**
    *   `styles.css`: Contém modificações puras, limpezas, fontes globais (`DM Sans`) e algumas classes de transições e remoção de scrollbars nativas.
*   **`/assets`**
    *   Imagens, logos, backgrounds de estrelas e ícones SVG.

---

## Tecnologias Utilizadas

*   **HTML5 & CSS3** (Nativo / Vanilla)
*   **JavaScript ES6+** (Orientado a objetos, manipulação síncrona do DOM, Singleton Pattern)
*   **Tailwind CSS** (Via CDN para geração *Just In Time* e padronização do UI)
*   **Material Symbols** (Ícones base do projeto fornecidos pela Google)
*   **Google Fonts** (Fonte tipográfica principal: DM Sans)

