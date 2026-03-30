<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/leagues');
</script>

<template>
  <main>
    <h1 class="text-3xl">
      Matchs du jour
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

    <p
      v-for="res in data?.response"
      v-else
      :key="res.league.id"
      class="text-lg"
    >
      {{ res.league.name }}
    </p>
  </main>
</template>
