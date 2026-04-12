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
  <main class="rounded-xl border-blue-300 p-3 md:border-2 md:bg-white">
            <ul

        class="mt-8 flex w-full flex-col items-center justify-center"
      >
        <li
          v-for="res in players"
          :key="res.id"
          class="my-2 w-full p-1 md:my-4 md:w-3/4 md:p-4"
        >
          <PlayerItem :player="res" />
        </li>
      </ul>
  </main>
</template>
