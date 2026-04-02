<script setup lang="ts">
import type { Fixture } from '~/models/fixture';

const { data, pending, error } = await useFetch<Fixture[]>('/api/fixtures');
</script>

<template>
  <main>
    <h1 class="m-6 text-center text-5xl font-bold">
      Matchs du jour :
    </h1>

    <p
      v-if="pending"
      class="text-lg text-gray-500"
    >
      Chargement...
    </p>

    <p
      v-else-if="error"
      class="text-lg text-red-500"
    >
      Une erreur est survenue lors de l'appel API.
    </p>

    <ul
      v-else
      class="mt-8 flex w-full flex-col items-center justify-center"
    >
      <li
        v-for="res in data"
        :key="res.fixture.id"
        class="my-4 w-3/4 p-4"
      >
        <MatchCard
          :fixture="res"
        />
      </li>
    </ul>
  </main>
</template>
