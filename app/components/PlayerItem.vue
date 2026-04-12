<script setup lang="ts">
import type { Player } from '~/models/player';

defineProps<{
  player: Player;
}>();
</script>

<template>
  <div class="flex items-center gap-4 rounded-xl border-2 border-border bg-surface p-4 transition-all hover:border-primary-300 md:p-6">
    <div class="relative">
      <img
        :src="player.photo"
        :alt="player.name"
        class="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
      />
    </div>
    <div class="flex-1">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="font-bold text-text md:text-xl">
            {{ player.name }}
          </h3>
          <p class="text-sm text-text-muted">
            {{ player.firstname }} {{ player.lastname }}
          </p>
        </div>
        <div class="mt-2 flex flex-wrap gap-2 text-xs md:mt-0">
          <span class="rounded-full bg-primary-100 px-2 py-1">
            {{ player.age }} ans
          </span>
          <span class="rounded-full bg-primary-100 px-2 py-1">
            {{ player.nationality }}
          </span>
          <span class="rounded-full bg-primary-100 px-2 py-1">
            {{ player.height }} cm
          </span>
          <span class="rounded-full bg-primary-100 px-2 py-1">
            {{ player.weight }} kg
          </span>
        </div>
      </div>
    </div>
  </div>
</template>