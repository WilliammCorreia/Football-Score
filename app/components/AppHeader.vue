<script setup lang="ts">
import { useIsDesktop } from '~/composables/useIsDesktop';

const emit = defineEmits<{
  'toggle-sidebar': [];
}>();

const useIsDesktopValue = useIsDesktop();
const IsDesktop = computed(() => useIsDesktopValue.value);
</script>

<template>
  <header class="sticky top-0 z-40 h-16 border-b border-border bg-surface/95 backdrop-blur-md">
    <div class="flex h-full items-center justify-between px-4 md:px-6">
      <!-- Left : burger menu (mobile) + logo -->
      <div class="flex items-center gap-3">
        <button
          v-if="!IsDesktop"
          class="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-text-main"
          aria-label="Ouvrir le menu"
          @click="emit('toggle-sidebar')"
        >
          <Icon
            name="lucide:menu"
            size="1.5rem"
          />
        </button>

        <NuxtLink
          to="/"
          class="flex items-center gap-2.5"
        >
          <!-- Logo : ballon stylisé en SVG -->
          <div class="flex size-9 items-center justify-center rounded-lg bg-primary-500 text-white">
            <Icon
              name="mdi:soccer"
              size="1.5rem"
            />
          </div>
          <div class="display text-2xl leading-none text-text-main md:text-3xl">
            Football<span class="text-primary-500">Score</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Right : PremiumBadge -->
      <div class="flex items-center gap-3">
        <PremiumBadge />
      </div>
    </div>
  </header>
</template>
