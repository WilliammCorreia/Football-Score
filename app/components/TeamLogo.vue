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
  <div class="rounded-xl border-blue-300 p-2 md:border-2 md:bg-white md:p-3">
    <img
      :src="url"
      :alt="`Logo de ${name || 'l\'équipe'}`"
      class="size-12 md:size-40"
    >
  </div>
</template>
