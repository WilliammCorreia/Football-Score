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
      // En conteneur, les migrations ne sont appliquées ni au build (la BDD n'est
      // pas prête) ni au dev. C'est le service `app-migrate` du docker-compose qui
      // les applique via `npx nuxt db migrate` avant le démarrage de `web`.
      applyMigrationsDuringBuild: false,
      applyMigrationsDuringDev: false,
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  runtimeConfig: {
    apiSportsKey: process.env.API_FOOTBALL_KEY || 'XxXxXxXxXxXxXxXxXxXxXxXx',
    public: {
      umamiWebsiteId: process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID || '',
      umamiHost: process.env.NUXT_PUBLIC_UMAMI_HOST || 'http://localhost:3001',
      glitchtipDsn: process.env.NUXT_PUBLIC_GLITCHTIP_DSN || '',
    },
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