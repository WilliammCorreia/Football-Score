import * as Sentry from '@sentry/vue';

export function useGlitchTip() {
  function captureException(err: unknown) {
    if (import.meta.server) return;
    Sentry.captureException(err);
  }

  /**
   * Mesure le temps de chargement d'un composant clé et l'envoie à GlitchTip
   * comme transaction de performance (onglet « Performance »). Le breadcrumb
   * garde aussi la mesure en contexte des erreurs éventuelles.
   */
  function measureLoadTime(componentName: string, startTime: number) {
    if (import.meta.server || startTime === 0) return;
    const durationMs = performance.now() - startTime;
    const endSec = Date.now() / 1000;

    const span = Sentry.startInactiveSpan({
      name: componentName,
      op: 'ui.load',
      forceTransaction: true,
      startTime: endSec - durationMs / 1000,
      attributes: { 'component.load_time_ms': Math.round(durationMs) },
    });
    span.end(endSec);

    Sentry.addBreadcrumb({
      category: 'performance',
      message: `${componentName} — chargé`,
      level: 'info',
      data: { duration_ms: Math.round(durationMs) },
    });
  }

  return { captureException, measureLoadTime };
}
