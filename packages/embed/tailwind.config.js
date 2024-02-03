const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const theme = require('./src/constants/theme');

module.exports = {
  content: [
    './src/pages/**/*.js',
    './src/components/**/*.js',
    './src/layouts/*.js',
    '../shared/components/**/*.js',
  ],
  safelist: ['reveal'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      backgroundImage: {
        sky: `url('${theme.sky}')`,
        'gradient-1': `url('${theme.gradient1}')`,
        'gradient-2': `url('${theme.gradient2}')`,
      },
      transitionProperty: {
        width: 'width',
        border: 'border-color',
      },
      keyframes: {
        shimmer: {
          '40%, 100%': { transform: 'translateX(calc(300%))' },
        },
        'slide-l': {
          from: { transform: 'translate(-20%)' },
          to: { transform: 'translate(0%)' },
        },
        'slide-r': {
          from: { transform: 'translate(20%)' },
          to: { transform: 'translate(0%)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: 0.25 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0.25 },
        },
      },
      animation: {
        shimmer: 'shimmer 4s ease-out infinite',
        'slide-l': 'slide-l 0.5s ease-out',
        'slide-r': 'slide-r 0.5s ease-out',
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-out': 'fadeOut 1s ease-in-out',
      },
      fontFamily: {
        soehne: ['Soehne', 'Helvetica', 'sans-serif'],
      },
      listStyleType: {
        initial: 'initial',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addVariant }) => {
      addVariant('input-group', ':merge(.input-group) &');
    }),
  ],
};
