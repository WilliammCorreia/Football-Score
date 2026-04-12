<script setup lang="ts">
const searchQuery = defineModel('searchQuery', {
  type: String,
  default: '',
});
</script>

<template>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Rechercher par nom"
    class="w-full rounded-lg border-border px-4 py-2 text-xl ring-2 ring-primary-500 focus:outline-none md:text-2xl"
  >
</template>
