<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue';
import type { TeamVenue } from '@/models/team';

definePageMeta({
  middleware: ['authenticated'],
});

const searchQuery = ref('');
const debouncedQuery = ref('');
const team = ref<TeamVenue | null>(null);
const isLoading = ref(false);
const hasError = ref(false);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let abortController: AbortController | null = null;

// Étape 1 : debounce de la query utilisateur
watch(searchQuery, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = newValue.trim();
  }, 500);
});

// Étape 2 : lance la recherche dès que la query débouncée change
watch(debouncedQuery, async (newQuery) => {
  // Annule la requête précédente si encore en vol
  if (abortController) abortController.abort();

  // Si la query est vide, on reset tout
  if (!newQuery) {
    team.value = null;
    isLoading.value = false;
    hasError.value = false;
    return;
  }

  isLoading.value = true;
  hasError.value = false;
  abortController = new AbortController();

  try {
    const result = await $fetch<TeamVenue>('/api/team', {
      query: { name: newQuery },
      signal: abortController.signal,
    });
    team.value = result;
  }
  catch (error: unknown) {
    // On ignore l'erreur si elle vient d'un abort (recherche obsolète)
    const err = error as { name?: string };
    if (err?.name !== 'AbortError') {
      team.value = null;
      hasError.value = true;
    }
  }
  finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
    <header class="mb-8">
      <p class="eyebrow mb-3">Annuaire des clubs</p>
      <h1 class="display text-5xl text-text-main md:text-7xl">
        Recherche
      </h1>
      <p class="mt-2 text-text-muted">
        Trouvez un club par son nom (ex: <em>Paris Saint Germain</em>).
      </p>
    </header>

    <SearchBar v-model="searchQuery" class="mb-8" />

    <!-- État 1 : pas encore de query -->
    <div
      v-if="!debouncedQuery"
      class="card flex flex-col items-center gap-3 p-12 text-center"
    >
      <Icon name="lucide:search" size="2.5rem" class="text-text-soft" />
      <h2 class="text-lg font-semibold text-text-main">Commencez à taper</h2>
      <p class="text-sm text-text-muted">
        Entrez le nom d'une équipe pour voir ses détails et l'ajouter à vos favoris.
      </p>
    </div>

    <!-- État 2 : recherche en cours -->
    <AppLoader v-else-if="isLoading" label="Recherche…" />

    <!-- État 3 : aucun résultat / erreur -->
    <div
      v-else-if="hasError || !team"
      class="card flex flex-col items-center gap-3 p-12 text-center"
    >
      <Icon name="lucide:circle-x" size="2.5rem" class="text-text-soft" />
      <h2 class="text-lg font-semibold text-text-main">Aucune équipe trouvée</h2>
      <p class="text-sm text-text-muted">
        Vérifiez l'orthographe ou essayez un autre nom d'équipe.
      </p>
    </div>

    <!-- État 4 : résultat trouvé -->
    <SearchCard
      v-else
      :team="team"
    />
  </div>
</template>