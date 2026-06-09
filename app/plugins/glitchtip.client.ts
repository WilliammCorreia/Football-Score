import * as Sentry from '@sentry/vue';
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const dsn = (config.public.glitchtipDsn as string) || 'http://edcf6cc0572749c9a8d15606a61ea86e@localhost/1';

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
