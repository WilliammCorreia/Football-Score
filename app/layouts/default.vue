<script setup lang="ts">
import { ref } from 'vue';
import { useIsDesktop } from '~/composables/useIsDesktop';

const useIsDesktopValue = useIsDesktop();
const IsDesktop = computed(() => useIsDesktopValue.value);
const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-background-app">
    <AppHeader @toggle-sidebar="toggleSidebar" />

    <!-- Layout principal : sidebar + content -->
    <div class="flex">
      <!-- Sidebar desktop : fixe à gauche -->
      <aside
        v-if="IsDesktop"
        class="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-60 border-r border-border bg-surface md:block"
      >
        <AppMenu />
      </aside>

      <!-- Sidebar mobile : drawer overlay -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-if="!IsDesktop && sidebarOpen"
          class="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r border-border bg-surface shadow-lg"
        >
          <AppMenu @navigate="closeSidebar" />
        </aside>
      </Transition>

      <!-- Backdrop mobile -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="!IsDesktop && sidebarOpen"
          class="fixed inset-0 top-16 z-40 bg-text-main/30 backdrop-blur-sm"
          @click="closeSidebar"
        />
      </Transition>

      <!-- Main content -->
      <main
        class="min-h-[calc(100vh-4rem)] w-full"
        :class="IsDesktop ? 'ml-60' : ''"
      >
        <slot />
      </main>
    </div>
  </div>
</template>