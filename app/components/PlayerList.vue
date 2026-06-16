<script setup lang="ts">
import type { Player } from '~/models/player';

defineProps({
  players: {
    type: Array<Player>,
    required: true,
  },
});
</script>

<template>
  <section class="rounded-2xl border border-border bg-surface shadow-card">
    <header class="flex items-baseline justify-between border-b border-border px-6 py-4">
      <h2 class="display text-3xl text-text-main">
        Effectif
      </h2>
      <span class="font-mono tabular text-sm font-semibold text-text-muted">
        {{ players?.length || 0 }} joueurs
      </span>
    </header>

    <div class="max-h-[32rem] overflow-y-auto p-3 md:p-4">
      <ul class="space-y-2">
        <li v-for="player in players" :key="player.id">
          <PlayerItem :player="player" />
        </li>
      </ul>
    </div>
  </section>
</template>