<script setup lang="ts">
import { ref } from 'vue';
import type { TeamVenue } from '~/models/team';

definePageMeta({
  middleware: ['authenticated'],
});

const team = ref<TeamVenue | null>(null);
const isLoading = ref(true);
const errors = ref<Error | null>(null);
const route = useRoute();
const id = route.query.id;

const { data, pending, error } = await useFetch<TeamVenue>('/api/team?id=' + id);
console.log(data.value);
if (data.value) {
  team.value = data.value;
}
isLoading.value = pending.value;
errors.value = error.value ?? null;
</script>

<template>
  <main>
    <AppLoader v-if="isLoading" />
    <div v-else>
      <h1 class="m-3 text-3xl font-bold text-text-muted md:m-6 md:text-5xl">
        {{ team?.team.name }}
      </h1>

      <p
        v-if="errors"
        class="text-lg text-danger"
      >
        Une erreur est survenue lors de l'appel API.
      </p>

      <ul
        v-else
        class="mt-8 flex w-full flex-col items-center justify-center"
      >
        <TeamCard :team="team?.team" />
      </ul>
    </div>
  </main>
</template>
