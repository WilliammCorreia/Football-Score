<script setup lang="ts">
import type { Player } from '~/models/player';

defineProps<{
  player: Player;
}>();
</script>

<template>
  <main class="rounded-xl border-blue-300 p-3 md:border-2 md:bg-white">
    {{ player.name }}
  </main>
</template>
