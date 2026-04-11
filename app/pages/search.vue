<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue';
import type { TeamVenue } from '@/models/team';

const team = ref<TeamVenue | null>(null);
const isLoading = ref(true);
const errors = ref<Error | null>(null);

onMounted(async () => {
  const { data, pending, error } = await useFetch<TeamVenue>('/api/team?name=benfica');
  if (data.value) {
    team.value = data.value;
  }
  isLoading.value = pending.value;
  errors.value = error.value ?? null;
});
</script>

<template>
  <div>
    <AppLoader v-if="isLoading" />
    <SearchCard
      v-else
      :team="team!"
      class="my-6"
    />
  </div>
</template>
