<script setup lang="ts">
import { useIsDesktop } from '~/composables/useIsDesktop';

const emit = defineEmits(['toggle-sidebar']);
const clicked = () => {
  emit('toggle-sidebar');
};

const useIsDesktopValue = useIsDesktop();
const IsDesktop = computed(() => useIsDesktopValue.value);
</script>

<template>
  <header class="flex items-center justify-between bg-primary-500 p-4 shadow-md">
    <button
      v-if="!IsDesktop"
      class="rounded-md p-2 active:bg-primary-hover"
      @click="clicked"
    >
      <Icon
        name="stash:burger-classic"
        size="2rem"
        mode="svg"
      />
    </button>
    <h1 class="text-2xl font-bold text-text-main md:text-4xl">
      Football Score
    </h1>
    <div>
      <!-- Sert uniquement pour l'alignement -->
    </div>
  </header>
</template>
