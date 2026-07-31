<script setup lang="ts">
import type { Player } from '~/models/player';

defineProps<{
  player: Player;
}>();
</script>

<template>
  <div class="flex items-center gap-4 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong md:p-4">
    <img
      :src="player.photo"
      :alt="player.name"
      class="size-12 shrink-0 rounded-full border border-border object-cover md:size-14"
    >

    <div class="min-w-0 flex-1">
      <h4 class="truncate text-sm font-semibold text-text-main md:text-base">
        {{ player.name }}
      </h4>
      <p class="truncate text-xs text-text-muted md:text-sm">
        {{ player.firstname }} {{ player.lastname }}
      </p>
    </div>

    <div class="hidden shrink-0 items-center gap-2 text-xs md:flex">
      <span class="tabular rounded-md bg-surface-muted px-2 py-1 font-mono font-semibold text-text-main">
        {{ player.age }} ans
      </span>
      <span class="tabular rounded-md bg-surface-muted px-2 py-1 font-mono font-semibold text-text-main">
        {{ player.nationality }}
      </span>
    </div>
  </div>
</template>
