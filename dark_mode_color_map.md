# 🌙 Dark Mode — Mapeamento de Cores: Light vs Dark

Documento de referência do sistema de cores aplicado no dark mode da **home page do DataOrbit**.  
Estratégia: `darkMode: 'class'` (Tailwind) — a classe `dark` é adicionada ao elemento `<html>` pelo `ThemeManager`.

---

## Paleta de Cores Disponível

Definida em [`tailwind.config.js`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/javascript/tailwind.config.js):

| Token | Hex | Uso |
|---|---|---|
| `white` | `#ffffff` | Fundo corpo (light), botão Sign up (dark) |
| `gray-100` | `#f5f5f5` | Fundo seções alternadas (light) |
| `gray-200` | `#e5e5e5` | Bordas (light) |
| `gray-400` | `#a3a3a3` | Bordas de inputs, texto secundário (light) |
| `gray-500` | `#737373` | Texto terciário, placeholder |
| `gray-600` | `#525252` | Bordas (dark), texto decorativo |
| `gray-700` | `#404040` | **Cards** (dark) |
| `gray-800` | `#262626` | **Seções alternadas** (dark) |
| `gray-900` | `#171717` | **Fundo base / navbar** (dark) |
| `black` | `#000000` | Fundo corpo (dark), botão Search (light), CTAs |

---

## Princípio de Hierarquia de Profundidade

O dark mode **espelha a hierarquia** do light mode invertendo a escala de cinza:

```
LIGHT MODE                        DARK MODE
─────────────────────────────     ─────────────────────────────
Body         white  #ffffff   →   gray-900  #171717  (mais escuro)
Seção alt.   gray-100 #f5f5f5 →   gray-800  #262626  (um nível acima)
Cards        white  #ffffff   →   gray-700  #404040  (dois níveis acima)
Bordas       gray-200 #e5e5e5 →   gray-600  #525252  (bordas sutis)
```

> **Regra geral:** cada nível da hierarquia sobe ~1 step na escala de cinza escura.

---

## Navbar

**Arquivo:** [`navbar.js`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/javascript/components/navbar.js)

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Container** | `bg-white` | `dark:bg-gray-900` | Base mais escura |
| **Borda inferior** | `border-gray-200` | `dark:border-gray-800` | Sutil, quase invisível |
| **Logo** | original | `dark:invert` | Filtro CSS inverte o SVG preto para branco |
| **Botão Categories** | `bg-white border-gray-400 text-gray-800` | `dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200` | Fundo navbar, borda visível |
| **Ícone chevron** | `text-black` | `dark:text-gray-200` | Texto legível |
| **Dropdown menu** | `bg-white border-gray-200` | `dark:bg-gray-900 dark:border-gray-800` | Mesmo nível do navbar |
| **Input de busca** | `bg-white border-gray-400 text-black placeholder-gray-400` | `dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500` | Um tom acima do navbar |
| **Botão Search (🔍)** | `bg-black text-white` | `dark:bg-gray-700` | ⚠️ Preto é invisível em gray-900 — sobe para gray-700 |
| **Botão Log in** | `bg-white border-gray-400 text-gray-800` | `dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200` | Fundo navbar, borda mais visível |
| **Botão Sign up** | `bg-black text-white` | `dark:bg-white dark:text-black` | ⚠️ Inversão total — preto em fundo escuro tem contraste ruim |
| **Menu mobile** | `bg-white border-gray-200` | `dark:bg-gray-900 dark:border-gray-800` | Consistente com navbar |

> **Por que Sign up ficou branco no dark mode?**  
> Em light mode, `bg-black` contrasta com o fundo branco — é o elemento mais destacado.  
> Em dark mode, `bg-black` se mistura com o fundo `gray-900`. A inversão para `bg-white` mantém o mesmo nível de destaque.

---

## Hero (Seção Principal)

**Arquivo:** [`index.html`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/index.html) — seção `#hero`

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Fundo** | `bg-black` | *(já é preto — inalterado)* | Hero sempre foi preto em ambos os modos |
| **Título** | `text-white` | *(inalterado)* | Branco em preto = OK em ambos |
| **Subtítulo** | `text-gray-400` | *(inalterado)* | Funciona em ambos |
| **Botão CTA** | `bg-white text-black border-gray-200` | *(inalterado)* | Branco em preto = OK em ambos |

---

## Seção Metrics (números grandes)

**Arquivo:** [`index.html`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/index.html) — seção `#metrics`

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Fundo** | `bg-white` | `dark:bg-gray-900` | Fundo base |
| **Número** | `text-black` | `dark:text-white` | Inversão direta |
| **Label** | `text-gray-400` | `dark:text-gray-500` | Tom de gris levemente mais escuro |
| **Separador** | `divide-gray-200` | `dark:divide-gray-800` | Borda sutil |

---

## Seção Marketplace — "Explore what's in orbit"

**Arquivo:** [`index.html`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/index.html) — seção `#marketplace-preview`

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Fundo da seção** | `bg-gray-100` `#f5f5f5` | `dark:bg-gray-800` `#262626` | Seção alternada (nível 2) |
| **Título** | `text-black` | `dark:text-white` | Inversão direta |
| **Subtítulo** | `text-gray-500` | `dark:text-gray-400` | Levemente mais claro no dark |
| **Tag "Marketplace"** | `text-gray-400` | `dark:text-gray-500` | Levemente mais escuro |
| **Botão filtro ativo** | `bg-black text-white` | *(inalterado)* | Preto em gray-800 tem contraste OK |
| **Botões filtro inativos** | `bg-white border-gray-200 text-gray-800` | `dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200` | Fundo da seção + borda |
| **Dropdown Sort** | `bg-white border-gray-400 text-black` | `dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200` | Consistente com filtros |

### Satellite Cards

**Arquivo:** [`satellite-card.js`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/javascript/components/satellite-card.js)

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Card container** | `bg-white border-gray-200` | `dark:bg-gray-700 dark:border-gray-600` | ⚠️ Nível 3 — acima da seção gray-800 |
| **Thumbnail** | `bg-black` | *(inalterado)* | Preto funciona em ambos |
| **Categoria (tag)** | `text-gray-400` | `dark:text-gray-500` | Sutil em ambos |
| **Nome do satélite** | `text-black` | `dark:text-white` | Inversão direta |
| **Provedor** | `text-gray-500` | `dark:text-gray-400` | Tom médio |
| **Estrelas ativas** | `text-black` | `dark:text-white` | Inversão direta |
| **Estrelas inativas** | `text-gray-400` | `dark:text-gray-600` | Tom mais escuro no dark |
| **Separador interno** | `border-gray-200` | `dark:border-gray-700` | ⚠️ Aqui usa 700 (vs. container 600) — mantém sutileza |
| **Preço** | `text-black` (bold) | `dark:text-white` | Inversão direta |
| **Unidade de preço** | `text-gray-400` | `dark:text-gray-500` | Tom sutil |
| **Botão "Get access"** | `bg-black text-white` | *(inalterado)* | Preto funciona em gray-700 |

---

## Seção Benefits — "Why DataOrbit"

**Arquivo:** [`index.html`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/index.html) — seção `#benefits`

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Fundo da seção** | `bg-gray-100` `#f5f5f5` | `dark:bg-gray-800` `#262626` | Seção alternada (nível 2) |
| **Título** | `text-black` | `dark:text-white` | Inversão direta |
| **Subtítulo** | `text-gray-500` | `dark:text-gray-400` | Tom médio |

### Cards 01–05 (brancos/claros)

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Card container** | `bg-white border-gray-200` | `dark:bg-gray-700 dark:border-gray-600` | Nível 3 — acima da seção |
| **Ícone de fundo** | `bg-black` | *(inalterado)* | Funciona em ambos |
| **Número decorativo (01–05)** | `text-gray-100` | `dark:text-gray-700` | Precisa de contraste sutil; em dark, usa o mesmo valor numérico mas mais escuro que o card |
| **Título do card** | `text-black` | `dark:text-white` | Inversão direta |
| **Descrição** | `text-gray-500` | `dark:text-gray-400` | Tom médio |
| **Snippet de código** | `bg-gray-100 text-gray-500` | `dark:bg-gray-700 dark:text-gray-400` | ⚠️ Nota: snippet usa gray-700 igual ao card — intencionalmente sutil |
| **Tags SDK (Python etc.)** | `bg-gray-100 border-gray-200 text-gray-500` | `dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400` | Mesma lógica do card |
| **Número bold (120+, 99.99%)** | `text-black` | `dark:text-white` | Inversão direta |

### Card 06 — Global Coverage (destaque preto)

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Card container** | `bg-black border-gray-700` | *(inalterado)* | Card de destaque — preto em ambos |
| **Número decorativo (06)** | `text-gray-800` | `dark:text-gray-600` | Visível mas sutil em ambos |
| **Ícone** | `bg-white/10 text-white` | *(inalterado)* | Funciona em ambos |
| **Título / texto** | `text-white` | *(inalterado)* | Branco em preto = OK |
| **Número bold (100%)** | `text-white` | *(inalterado)* | Branco em preto = OK |

---

## Seção "How it Works"

**Arquivo:** [`index.html`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/index.html) — seção `#how-it-works`

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Fundo da seção** | `bg-white` | `dark:bg-gray-900` | Fundo base (nível 1) |
| **Título** | `text-black` | `dark:text-white` | Inversão direta |
| **Cards** | `bg-black` | *(inalterado)* | Cards já são pretos em ambos os modos |

---

## CTA Final ("Ready to access satellite data?")

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Fundo** | `bg-black` | *(inalterado)* | Seção sempre preta |
| **Título/texto** | `text-white` | *(inalterado)* | Branco em preto = OK |
| **Botão Create account** | `bg-white text-black` | *(inalterado)* | Funciona em ambos |
| **Botão Explore catalog** | `bg-transparent border-white text-white` | *(inalterado)* | Funciona em ambos |

---

## Footer

| Elemento | Light Mode | Dark Mode | Lógica |
|---|---|---|---|
| **Fundo** | `bg-black` | *(inalterado)* | Footer sempre preto |
| **Logo** | invertido via `dark:invert` no navbar | *(footer usa imagem própria)* | — |
| **Texto** | `text-gray-400` / `text-white` | *(inalterado)* | Funciona em ambos |
| **Bordas** | `border-gray-800` | *(inalterado)* | Já escuro, funciona em ambos |

---

## Resumo: Padrões de Tradução

| Padrão | Light | Dark |
|---|---|---|
| Fundo base | `white` | `gray-900` |
| Fundo alternado | `gray-100` | `gray-800` |
| Card / superfície elevada | `white` | `gray-700` |
| Borda principal | `gray-200` | `gray-700` |
| Borda de card | `gray-200` | `gray-600` |
| Texto principal | `black` | `white` |
| Texto secundário | `gray-500` | `gray-400` |
| Texto terciário | `gray-400` | `gray-500` |
| Texto decorativo | `gray-100` | `gray-700` |
| CTA primário (bg) | `black` | `white` |
| CTA primário (texto) | `white` | `black` |
| Seção sempre escura | `black` | *(inalterado)* |

---

## Arquivos Modificados

| Arquivo | Tipo de mudança |
|---|---|
| [`tailwind.config.js`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/javascript/tailwind.config.js) | `darkMode: 'class'` + `safelist` com classes dinâmicas dos `.js` |
| [`css/styles.css`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/css/styles.css) | Transições globais (`0.3s`) + overrides CSS (scrollbar, `satellite-popup`) |
| [`javascript/components/navbar.js`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/javascript/components/navbar.js) | Classes `dark:` em todos os elementos injetados via template literal |
| [`javascript/components/satellite-card.js`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/javascript/components/satellite-card.js) | Classes `dark:` no card container e elementos internos |
| [`index.html`](file:///c:/Users/Pianist/OneDrive/1.%20Computer/Documents/2.%20Engenharia%20de%20Software/1.%20Projetos/Global%20Solution/.%20Global%20Solution%20-%20Git/index.html) | Classes `dark:` em todas as seções (metrics, marketplace, benefits, how-it-works) |
