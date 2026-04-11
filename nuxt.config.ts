// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/icon'],
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  runtimeConfig: {
    apiSportsKey: process.env.API_FOOTBALL_KEY || 'XxXxXxXxXxXxXxXxXxXxXxXx',
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: 'single',
        indent: 2,
      },
    },
  },
});
