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
  <header class="flex items-center justify-between bg-gray-100 p-4 shadow-md">
    <button
      v-if="!IsDesktop"
      class="rounded-md border-gray-500 p-2 active:bg-gray-100 "
      @click="clicked"
    >
      <Icon
        name="stash:burger-classic"
        size="2rem"
        mode="svg"
        class="hover:text-gray-500"
      />
    </button>
    <h1 class="text-2xl font-bold md:text-4xl">
      Football Score
    </h1>
    <div>
      <!-- Sert uniquement pour l'alignement -->
    </div>
  </header>
</template>
