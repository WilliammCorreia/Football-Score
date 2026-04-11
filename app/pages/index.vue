<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Fixture } from '~/models/fixture';

const fixtures = ref<Fixture[]>([]);
const isLoading = ref(true);
const errors = ref<Error | null>(null);

onMounted(async () => {
  const { data, pending, error } = await useFetch<Fixture[]>('/api/fixtures');
  if (data.value) {
    fixtures.value = data.value;
  }
  isLoading.value = pending.value;
  errors.value = error.value ?? null;
});
</script>

<template>
  <main>
    <AppLoader v-if="isLoading" />
    <div v-else>
      <h1 class="m-3 text-3xl font-bold text-text-muted md:m-6 md:text-5xl">
        Matchs du jour :
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
        <li
          v-for="res in fixtures"
          :key="res.fixture.id"
          class="my-2 w-full p-1 md:my-4 md:w-3/4 md:p-4"
        >
          <MatchCard
            :fixture="res"
          />
        </li>
      </ul>
    </div>
  </main>
</template>
