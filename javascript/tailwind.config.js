tailwind.config = {

  darkMode: 'class',

  safelist: [

    'dark:bg-gray-900', 'dark:bg-gray-800', 'dark:bg-gray-750', 'dark:bg-gray-700', 'dark:bg-white',

    'dark:border-gray-800', 'dark:border-gray-700', 'dark:border-gray-600',

    'dark:text-white', 'dark:text-black', 'dark:text-gray-200', 'dark:text-gray-400', 'dark:text-gray-500', 'dark:text-gray-600',

    'dark:hover:bg-gray-800', 'dark:hover:bg-gray-700', 'dark:hover:bg-gray-600', 'dark:hover:bg-gray-100',

    'dark:placeholder-gray-500',

    'dark:focus:border-gray-500',

    'dark:invert',

    'dark:divide-gray-800',

    'transition-colors', 'duration-300',

  ],

  theme: {

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

      fontFamily: {

        sans: ['"DM Sans"', 'Inter', 'sans-serif'],

      },

      letterSpacing: {

        heading: '-0.03em',

        caps: '0.06em',

      },

      maxWidth: {

        'container': '1536px',

      },

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