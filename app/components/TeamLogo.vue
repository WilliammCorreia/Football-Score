<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});
</script>

<template>
  <main class="rounded-xl border-blue-300 p-3 md:border-2 md:bg-white">
    <img
      :src="url"
      :alt="`Logo de ${name || 'l\'équipe'}`"
      class="size-12 md:size-40"
    >
  </main>
</template>
