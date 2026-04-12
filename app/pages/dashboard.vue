<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Fixture } from '~/models/fixture';
import { useFavouritesStore } from '~/store/favourites';

const favourites = useFavouritesStore();
const fixtures = ref<{team: number, matches: Fixture[]}[]>([]);
const isLoading = ref(true);
const errors = ref<Error | null>(null);

  console.log("Lancement du onMounted", favourites.listIds())
  const { data, pending, error } = await useFetch<{team: number, matches: Fixture[]}[]>('/api/favourites', { method: 'POST', body : 
    {teams: favourites.listIds()}
  });
  console.log(data.value)
  if (data.value) {
    fixtures.value = data.value;
  }
  isLoading.value = pending.value;
  errors.value = error.value ?? null;

</script>

<template>
  <main>
    <AppLoader v-if="isLoading" />
    <div v-else>
      <h1 class="m-3 text-3xl font-bold text-text-muted md:m-6 md:text-5xl">
        Dashboard :
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
      <div v-for="res in fixtures">
        {{ favourites.getTeam(res.team)?.name }}
        <li
          v-for="res2 in res.matches"
          :key="res2.fixture.id"
          class="my-2 w-full p-1 md:my-4 md:w-3/4 md:p-4"
        >
          <MatchCard
            :fixture="res2"
          />
        </li>
        </div>
      </ul>
    </div>
  </main>
</template>