import { defineNuxtPlugin, useHead, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const websiteId = config.public.umamiWebsiteId;
  const host = config.public.umamiHost;

  if (!websiteId) return;

  useHead({
    script: [
      {
        src: `${host}/script.js`,
        defer: true,
        'data-website-id': websiteId,
      },
    ],
  });
});
