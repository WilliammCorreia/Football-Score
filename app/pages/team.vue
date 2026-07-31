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
const { track } = useTracking();

const { data, pending, error } = await useFetch<TeamVenue>('/api/team?id=' + id);
if (data.value) {
  team.value = data.value;
  // Event d'engagement, hors tunnel d'achat (le tunnel suit l'abonnement Premium)
  track('view_team', {
    team_id: id,
    team_name: data.value.team?.name,
  });
}
isLoading.value = pending.value;
errors.value = error.value ?? null;
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
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
          Équipe introuvable
        </h2>
        <p class="text-sm text-text-muted">
          Une erreur est survenue lors du chargement. Vérifiez l'identifiant et réessayez.
        </p>
      </div>
    </div>

    <TeamCard
      v-else-if="team"
      :team="team.team"
    />
  </div>
</template>
