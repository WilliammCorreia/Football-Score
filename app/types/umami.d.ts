interface Umami {
  track: (eventName: string, data?: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    umami?: Umami;
  }
}

export {};
