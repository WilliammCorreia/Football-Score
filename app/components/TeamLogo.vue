<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  size: {
    type: Number,
    default: 48,
  },
});
</script>

<template>
  <main class="rounded-xl border-2 border-blue-300 bg-white p-3">
    <img
      :src="url"
      :alt="`Logo de ${name || 'l\'équipe'}`"
      :class="`size-${size}`"
    >
  </main>
</template>
