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
  <div class="mt-8 rounded-xl border-2 border-border bg-surface p-4 md:p-6">
    <h2 class="mb-4 text-2xl font-bold text-text-muted md:mb-6 md:text-3xl">
      Joueurs
    </h2>
    
    <div class="max-h-96 overflow-y-auto">
      <ul class="flex w-full flex-col items-center justify-center gap-3">
        <li
          v-for="player in players"
          :key="player.id"
          class="w-full"
        >
          <PlayerItem :player="player" />
        </li>
      </ul>
    </div>
    
  </div>
</template>