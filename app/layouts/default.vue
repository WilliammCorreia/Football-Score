<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import AppMenu from '~/components/AppMenu.vue';

const isToggled = ref(false);

function toggleSidebar() {
  isToggled.value = !isToggled.value;
}
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-background-app">
    <AppHeader
      @toggle-sidebar="toggleSidebar()"
    />
    <div class="relative flex flex-1 overflow-hidden">
      <AppMenu
        class="absolute z-20 h-full w-3/4 transition-transform duration-300 ease-in-out 2xl:relative 2xl:w-1/5 2xl:translate-x-0"
        :class="isToggled ? 'translate-x-0' : '-translate-x-full'"
      />
      <main class="flex-1 overflow-y-auto p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
