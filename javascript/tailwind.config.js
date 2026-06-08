// js/tailwind.config.js
// Configuração customizada do Tailwind CSS para o projeto
// Depende: Nenhum

// Definição das configurações principais de design do site
tailwind.config = {
  darkMode: 'class',
  // Safelist: classes usadas em componentes JS (navbar.js, satellite-card.js, footer.js)
  // que o Tailwind CDN não consegue detectar automaticamente por estarem em templates dinâmicos.
  safelist: [
    // Navbar dark
    'dark:bg-gray-900', 'dark:bg-gray-800', 'dark:bg-gray-750', 'dark:bg-gray-700', 'dark:bg-white',
    'dark:border-gray-800', 'dark:border-gray-700', 'dark:border-gray-600',
    'dark:text-white', 'dark:text-black', 'dark:text-gray-200', 'dark:text-gray-400', 'dark:text-gray-500', 'dark:text-gray-600',
    'dark:hover:bg-gray-800', 'dark:hover:bg-gray-700', 'dark:hover:bg-gray-600', 'dark:hover:bg-gray-100',
    'dark:placeholder-gray-500',
    'dark:focus:border-gray-500',
    'dark:invert',
    // Satellite card / benefit cards dark
    'dark:divide-gray-800',
    // Transitions
    'transition-colors', 'duration-300',
  ],
  theme: {
    // Definindo cores FORA do extend para forçar o projeto a usar APENAS estas.
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray: {
        100: '#f5f5f5',
        200: '#e5e5e5',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        750: '#333333',
        800: '#262626',
        900: '#171717',
      }
    },
    extend: {
      colors: {
        accent: {
          orange: '#E8510A',
          blue: '#3B7BF5',
          'blue-light': '#93C5FD',
          green: '#22C55E',
          'green-dark': '#15803D',
          'green-tint': '#F0FDF4',
          'green-light': '#86EFAC',
          red: '#EF4444',
          'red-dark': '#DC2626',
          'red-tint': '#FEF2F2',
          purple: '#C084FC',
        }
      },
      // Fontes padrão
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'sans-serif'],
      },
      // Espaçamento de letras customizado
      letterSpacing: {
        heading: '-0.03em',
        caps: '0.06em',
      },
      // Largura máxima de containers principais
      maxWidth: {
        'container': '1536px',
      },
      // Sobrescrita do border-radius global para consistência com o estilo exigido (4px)
      borderRadius: {
        'none': '0px',
        'sm': '0.25rem',
        DEFAULT: '0.25rem',
        'md': '0.25rem',
        'lg': '0.25rem',
        'xl': '0.25rem',
        '2xl': '0.25rem',
        '3xl': '0.25rem',
        'full': '9999px',
      },
    },
  },
}

