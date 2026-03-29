// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import tailwind from 'eslint-plugin-tailwindcss';

export default withNuxt(
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/classnames-order': 'warn',
    },
  },
);
