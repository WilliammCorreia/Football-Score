import * as Sentry from '@sentry/vue';
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const dsn = config.public.glitchtipDsn as string;

  // Sans DSN configuré (NUXT_PUBLIC_GLITCHTIP_DSN), on désactive la télémétrie
  // plutôt que d'envoyer vers une cible invalide.
  if (!dsn) return;

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn,
    // Tunnel via l'API Nuxt pour éviter le blocage Firefox (ETP/extensions)
    tunnel: '/api/glitchtip-tunnel',
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    tracesSampleRate: 1.0,
    logErrors: true,
    trackComponents: true,
    beforeSend(event) {
      if (event.user) {
        delete event.user.email;
        delete event.user.ip_address;
      }
      return event;
    },
  });
});
