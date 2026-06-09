import * as Sentry from '@sentry/vue';

export function useGlitchTip() {
  function captureException(err: unknown) {
    if (import.meta.server) return;
    Sentry.captureException(err);
  }

  function measureLoadTime(componentName: string, startTime: number) {
    if (import.meta.server || startTime === 0) return;
    const duration = performance.now() - startTime;
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `${componentName} — chargé`,
      level: 'info',
      data: { duration_ms: Math.round(duration) },
    });
  }

  return { captureException, measureLoadTime };
}
