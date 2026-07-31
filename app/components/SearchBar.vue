<script setup lang="ts">
// v-model par défaut (sans argument). Côté parent : <SearchBar v-model="searchQuery" />
const model = defineModel<string>({ default: '' });
</script>

<template>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-text-soft">
      <Icon
        name="lucide:search"
        size="1.25rem"
      />
    </div>
    <input
      v-model="model"
      type="text"
      placeholder="Rechercher une équipe…"
      class="w-full rounded-xl border border-border bg-surface py-3.5 pl-12 pr-4 text-base text-text-main shadow-card transition-colors placeholder:text-text-soft focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
    >
    <button
      v-if="model"
      class="absolute inset-y-0 right-0 flex items-center pr-4 text-text-soft transition-colors hover:text-text-main"
      aria-label="Effacer la recherche"
      @click="model = ''"
    >
      <Icon
        name="lucide:x"
        size="1.125rem"
      />
    </button>
  </div>
</template>
