export function useUmami() {
  function track(eventName: string, data?: Record<string, unknown>) {
    if (typeof window === 'undefined') return;
    window.umami?.track(eventName, data);
  }

  return { track };
}
