<script setup lang="ts">
import { ref } from 'vue';
import type { Fixture } from '~/models/fixture';
import { useFavouritesStore } from '~/store/favourites';

definePageMeta({
  middleware: ['authenticated'],
});

const favourites = useFavouritesStore();

if (!favourites.loaded) {
  await favourites.fetchFromServer();
}

const fixtures = ref<{ team: number; matches: Fixture[] }[]>([]);
const isLoading = ref(true);
const errors = ref<Error | null>(null);

const { data, pending, error } = await useFetch<{ team: number; matches: Fixture[] }[]>('/api/dashboard-matches', {
  method: 'POST',
  body: { teams: favourites.listIds() },
});

if (data.value) {
  fixtures.value = data.value;
}
isLoading.value = pending.value;
errors.value = error.value ?? null;
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
    <header class="mb-8 md:mb-12">
      <p class="eyebrow mb-3">Tableau de bord</p>
      <h1 class="display text-5xl text-text-main md:text-7xl">
        Vos équipes
      </h1>
      <p v-if="!isLoading && favourites.teams.length > 0" class="mt-2 font-mono tabular text-sm text-text-muted">
        {{ favourites.teams.length }} équipe{{ favourites.teams.length > 1 ? 's' : '' }} suivie{{ favourites.teams.length > 1 ? 's' : '' }}
      </p>
    </header>

    <AppLoader v-if="isLoading" />

    <div
      v-else-if="errors"
      class="card flex items-start gap-3 p-6"
    >
      <Icon name="lucide:alert-triangle" size="1.5rem" class="shrink-0 text-danger" />
      <div>
        <h2 class="font-semibold text-text-main">Impossible de charger vos matchs</h2>
        <p class="text-sm text-text-muted">
          Une erreur est survenue lors de l'appel API. Réessayez dans quelques instants.
        </p>
      </div>
    </div>

    <div
      v-else-if="fixtures.length === 0"
      class="card flex flex-col items-center gap-3 p-12 text-center"
    >
      <Icon name="lucide:heart-off" size="2.5rem" class="text-text-soft" />
      <h2 class="text-lg font-semibold text-text-main">Aucune équipe favorite</h2>
      <p class="max-w-md text-sm text-text-muted">
        Ajoutez des équipes à vos favoris depuis la
        <NuxtLink to="/search" class="font-semibold text-primary-600 underline hover:text-primary-hover">
          page Recherche
        </NuxtLink>
        pour suivre leurs matchs ici.
      </p>
    </div>

    <div v-else class="space-y-10">
      <section
        v-for="item in fixtures"
        :key="item.team"
      >
        <div class="mb-4 flex items-baseline justify-between border-b border-border pb-3">
          <div class="flex items-center gap-3">
            <img
              :src="favourites.getTeam(item.team)?.logo"
              :alt="favourites.getTeam(item.team)?.name"
              class="size-10 object-contain"
            >
            <h2 class="display text-3xl text-text-main md:text-4xl">
              {{ favourites.getTeam(item.team)?.name }}
            </h2>
          </div>
          <span class="font-mono tabular text-sm text-text-muted">
            {{ item.matches.length }} match{{ item.matches.length > 1 ? 's' : '' }}
          </span>
        </div>

        <div
          v-if="item.matches.length === 0"
          class="card p-6 text-center text-sm text-text-muted"
        >
          Aucun match récent pour cette équipe.
        </div>
        <ul v-else class="space-y-4">
          <li v-for="match in item.matches" :key="match.fixture.id">
            <MatchCard :fixture="match" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>