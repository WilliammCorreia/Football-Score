// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxthub/core',
    'nuxt-auth-utils',
  ],
  hub: {
    db: {
      dialect: 'postgresql',
      driver: 'postgres-js',
      // En conteneur, on évite d'appliquer les migrations au build (la BDD n'est pas
      // encore prête à ce moment) et au dev (on lance manuellement avec npx).
      applyMigrationsDuringBuild: false,
      applyMigrationsDuringDev: false,
    },
  },
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