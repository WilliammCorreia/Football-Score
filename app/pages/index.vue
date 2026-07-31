<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Fixture } from '~/models/fixture';

definePageMeta({
  middleware: ['authenticated'],
});

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

const today = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
    <header class="mb-8 md:mb-12">
      <p class="eyebrow mb-3">
        {{ today }}
      </p>
      <h1 class="display text-5xl text-text-main md:text-7xl">
        Matchs du jour
      </h1>
      <p
        v-if="!isLoading && fixtures.length > 0"
        class="tabular mt-2 font-mono text-sm text-text-muted"
      >
        {{ fixtures.length }} rencontre{{ fixtures.length > 1 ? 's' : '' }} au programme
      </p>
    </header>

    <AppLoader v-if="isLoading" />

    <div
      v-else-if="errors"
      class="card flex items-start gap-3 p-6"
    >
      <Icon
        name="lucide:alert-triangle"
        size="1.5rem"
        class="shrink-0 text-danger"
      />
      <div>
        <h2 class="font-semibold text-text-main">
          Impossible de charger les matchs
        </h2>
        <p class="text-sm text-text-muted">
          Une erreur est survenue lors de l'appel à l'API. Réessayez dans quelques instants.
        </p>
      </div>
    </div>

    <div
      v-else-if="fixtures.length === 0"
      class="card flex flex-col items-center gap-3 p-12 text-center"
    >
      <Icon
        name="lucide:calendar-off"
        size="2.5rem"
        class="text-text-soft"
      />
      <h2 class="text-lg font-semibold text-text-main">
        Aucun match aujourd'hui
      </h2>
      <p class="text-sm text-text-muted">
        Revenez demain pour de nouvelles rencontres.
      </p>
    </div>

    <ul
      v-else
      class="space-y-4 md:space-y-6"
    >
      <li
        v-for="res in fixtures"
        :key="res.fixture.id"
      >
        <MatchCard :fixture="res" />
      </li>
    </ul>
  </div>
</template>
