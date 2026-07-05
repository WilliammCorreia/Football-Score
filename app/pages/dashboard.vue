<script setup lang="ts">
import { ref } from 'vue';
import type { Fixture } from '~/models/fixture';
import { useFavouritesStore } from '~/store/favourites';

definePageMeta({
  middleware: ['authenticated'],
});

const favourites = useFavouritesStore();
const fixtures = ref<{ team: number; matches: Fixture[] }[]>([]);
const isLoading = ref(true);
const errors = ref<Error | null>(null);
const paymentStatus = ref<'idle' | 'processing' | 'success' | 'error'>('idle');

const { track } = useUmami();
const { captureException, measureLoadTime } = useGlitchTip();

track('checkout_start', {
  favourite_count: favourites.listIds().length,
});

// Mesure de performance : heure de début de chargement
const loadStart = import.meta.client ? performance.now() : 0;

const { data, pending, error } = await useFetch<{ team: number; matches: Fixture[] }[]>('/api/favourites', { method: 'POST', body:
    { teams: favourites.listIds() },
});

if (data.value) {
  fixtures.value = data.value;
  // Performance tracking : envoie le temps de chargement à GlitchTip
  measureLoadTime('Dashboard — validation commande', loadStart);
  track('checkout_success', {
    favourite_count: favourites.listIds().length,
    match_count: data.value.reduce((acc, item) => acc + item.matches.length, 0),
  });
}
isLoading.value = pending.value;
errors.value = error.value ?? null;

// Simulation de paiement défaillant — échoue 1 fois sur 3 (TypeError)
async function simulerPaiement() {
  paymentStatus.value = 'processing';

  try {
    if (Math.random() < 1 / 3) {
      // TypeError volontaire : accès à une propriété sur null
      const gateway = null as unknown as { process: (amount: number) => void };
      gateway.process(49.99);
    }

    // Simule un délai de traitement réseau
    await new Promise<void>(resolve => setTimeout(resolve, 600));

    paymentStatus.value = 'success';
    track('checkout_success', { amount: 49.99, currency: 'EUR' });
  } catch (err) {
    // Capture manuelle de l'exception vers GlitchTip
    captureException(err);
    paymentStatus.value = 'error';
  }
}
</script>

<template>
  <main>
    <AppLoader v-if="isLoading" />
    <div v-else>
      <h1 class="m-3 text-3xl font-bold text-text-muted md:m-6 md:text-5xl">
        Dashboard
      </h1>

      <p
        v-if="errors"
        class="text-lg text-danger"
      >
        Une erreur est survenue lors de l'appel API.
      </p>

      <div
        v-else-if="fixtures.length === 0"
        class="mt-8 text-center text-text-muted"
      >
        <p>Aucune équipe favorite pour le moment !</p>
      </div>

      <div
        v-else
        class="mt-8 flex w-full flex-col gap-8"
      >
        <div
          v-for="item in fixtures"
          :key="item.team"
          class="rounded-xl border-2 border-border bg-surface p-4 md:p-6"
        >
          <div class="mb-4 flex items-center gap-3 border-b border-border pb-4">
            <img
              :src="favourites.getTeam(item.team)?.logo"
              :name="favourites.getTeam(item.team)?.name"
              class="size-8 md:size-12"
            >
            <h2 class="text-text text-xl font-bold md:text-2xl">
              {{ favourites.getTeam(item.team)?.name }}
            </h2>
            <span class="bg-primary-100 rounded-full px-2 py-1 text-xs text-text-muted">
              {{ item.matches.length }} matchs
            </span>
          </div>

          <div
            v-if="item.matches.length === 0"
            class="py-4 text-center text-text-muted"
          >
            Aucun match récent pour cette équipe
          </div>
          <ul
            v-else
            class="flex w-full flex-col items-center justify-center gap-3"
          >
            <li
              v-for="match in item.matches"
              :key="match.fixture.id"
              class="w-full"
            >
              <MatchCard :fixture="match" />
            </li>
          </ul>
        </div>
      </div>

      <!-- Simulation de paiement défaillant — validation GlitchTip (Partie 2) -->
      <div
        class="mt-8 rounded-xl border-2 border-dashed border-border p-4 md:p-6"
      >
        <h2 class="mb-1 text-lg font-semibold text-text-muted">
          Simulation de paiement
        </h2>
        <p class="mb-4 text-sm text-text-muted">
          Échoue volontairement 1 fois sur 3 avec un TypeError — erreurs remontées dans GlitchTip.
        </p>

        <button
          class="rounded-lg bg-primary-300 px-5 py-2 font-medium hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="paymentStatus === 'processing'"
          @click="simulerPaiement"
        >
          {{ paymentStatus === 'processing' ? 'Traitement en cours…' : 'Payer 49,99 €' }}
        </button>

        <p
          v-if="paymentStatus === 'success'"
          class="mt-3 font-medium text-green-600"
        >
          Paiement accepté
        </p>
        <p
          v-else-if="paymentStatus === 'error'"
          class="mt-3 font-medium text-red-500"
        >
          Paiement refusé — erreur capturée dans GlitchTip
        </p>
      </div>
    </div>
  </main>
</template>
