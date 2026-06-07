// js/tailwind.config.js
// Configuração customizada do Tailwind CSS para o projeto
// Depende: Nenhum

// Definição das configurações principais de design do site
tailwind.config = {
  theme: {
    extend: {
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
      // Paleta estrita contendo apenas as cores efetivamente usadas no projeto
      colors: {
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        red: {
          400: '#f87171',
          500: '#ef4444',
        },
        purple: {
          300: '#d8b4fe',
        }
      },
    },
  },
}