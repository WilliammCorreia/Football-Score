export default defineEventHandler(async (event) => {
  const body = await readRawBody(event, 'utf-8');

  if (!body) {
    throw createError({ statusCode: 400 });
  }

  // L'enveloppe Sentry est du NDJSON : la 1re ligne est le header
  // qui contient le DSN avec le projet ID et la clé publique
  const envelopeHeader = JSON.parse(body.split('\n')[0]);
  const dsn = new URL(envelopeHeader.dsn as string);
  const projectId = dsn.pathname.replace(/^\//, '');
  const sentryKey = dsn.username;

  const upstream = `http://glitchtip:8000/api/${projectId}/envelope/?sentry_version=7&sentry_key=${sentryKey}&sentry_client=sentry.javascript.vue/10.56.0`;

  const response = await fetch(upstream, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
  });

  return response.json();
});
