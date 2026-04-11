<script setup lang="ts">
import type { Fixture } from '~/models/fixture';

const { data, pending, error } = await useFetch<Fixture[]>('/api/fixtures');
</script>

<template>
  <main>
    <h1 class="m-3 text-3xl font-bold text-text-muted md:m-6 md:text-5xl">
      Matchs du jour :
    </h1>

    <p
      v-if="pending"
      class="text-lg text-text-muted"
    >
      Chargement...
    </p>

    <p
      v-else-if="error"
      class="text-lg text-danger"
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
        class="my-2 w-full p-1 md:my-4 md:w-3/4 md:p-4"
      >
        <MatchCard
          :fixture="res"
        />
      </li>
    </ul>
  </main>
</template>
