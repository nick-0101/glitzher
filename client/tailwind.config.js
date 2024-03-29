const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      default: '#FC0f42',
      indigo: colors.indigo,
      gray: colors.coolGray,
      white: colors.white,
      red: colors.red,
      yellow: colors.yellow,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        gilroy: 'Gilroy-ExtraBold',
      },
      height: (theme) => ({
        'screen/1': '80vh',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      }),
      backgroundImage: (theme) => ({
        desktop:
          "url('./components/ComparisonSearch/images/frontpage-desktop.webp')",
        mobile:
          "url('./components/ComparisonSearch/images/frontpage-mobile.webp')",
      }),
    },
  },
  variants: {
    extend: {
      justifyContent: ['hover', 'focus'],
      backgroundColor: ['odd', 'even'],
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '600px',
          },
          '@screen md': {
            maxWidth: '700px',
          },
          '@screen lg': {
            maxWidth: '800px',
          },
          '@screen xl': {
            maxWidth: '900px',
          },
        },
      });
    },
    require('@tailwindcss/line-clamp'),
  ],
};
