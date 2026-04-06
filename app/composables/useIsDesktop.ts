import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Composable pour détecter si l'écran dépasse un certain seuil.
 */
export const useIsDesktop = (width: number = 1536): Ref<boolean> => {
  const isDesktop = ref(false);

  let mediaQueryList: MediaQueryList | null = null;

  const updateTarget = (event: MediaQueryListEvent | MediaQueryList) => {
    isDesktop.value = event.matches;
  };

  onMounted(() => {
    mediaQueryList = window.matchMedia(`(min-width: ${width}px)`);

    updateTarget(mediaQueryList);
    mediaQueryList.addEventListener('change', updateTarget);
  });

  onUnmounted(() => {
    mediaQueryList?.removeEventListener('change', updateTarget);
  });

  return isDesktop;
};
