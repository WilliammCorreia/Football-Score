<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue';
import type { TeamVenue } from '@/models/team';

const searchQuery = ref('');
const debouncedQuery = ref('');
let timeoutId: ReturnType<typeof setTimeout> | null = null;

watch(searchQuery, (newValue) => {
  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    debouncedQuery.value = newValue;
  }, 1000);
});

const {
  data: team,
  pending: isLoading,
  error,
} = await useFetch<TeamVenue>('/api/team', {
  query: { name: debouncedQuery },
});
</script>

<template>
  <div>
    <SearchBar
      v-model="searchQuery"
      class="my-4 md:my-6"
    />
    <AppLoader v-if="isLoading" />
    <div v-else-if="!searchQuery">
      <p class="my-6 text-center text-gray-500">
        Recherchez une équipe pour voir ses détails et ses joueurs.
      </p>
    </div>
    <div
      v-else-if="error"
      class="my-6 text-center text-gray-500"
    >
      Aucune équipe trouvée. Essayez de rechercher une autre équipe.
    </div>
    <SearchCard
      v-else
      :team="team!"
      class="my-6"
    />
  </div>
</template>
