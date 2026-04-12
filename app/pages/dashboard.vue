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
        Dashboard
      </h1>

      <p v-if="errors" class="text-lg text-danger">
        Une erreur est survenue lors de l'appel API.
      </p>

      <div v-else-if="fixtures.length === 0" class="mt-8 text-center text-text-muted">
        <p>Aucune équipe favorite pour le moment</p>
      </div>

      <div v-else class="mt-8 flex w-full flex-col gap-8">
        <div 
          v-for="item in fixtures" 
          :key="item.team"
          class="rounded-xl border-2 border-border bg-surface p-4 md:p-6"
        >
          <!-- En-tête de l'équipe -->
          <div class="mb-4 flex items-center gap-3 border-b border-border pb-4">
            <img 
              :src="favourites.getTeam(item.team)?.logo" 
              :name="favourites.getTeam(item.team)?.name" 
              class="h-8 w-8 md:h-12 md:w-12"
            />
            <h2 class="text-xl font-bold text-text md:text-2xl">
              {{ favourites.getTeam(item.team)?.name }}
            </h2>
            <span class="rounded-full bg-primary-100 px-2 py-1 text-xs text-text-muted">
              {{ item.matches.length }} matchs
            </span>
          </div>

          <!-- Liste des matchs -->
          <div v-if="item.matches.length === 0" class="py-4 text-center text-text-muted">
            Aucun match récent pour cette équipe
          </div>
          
          <ul v-else class="flex w-full flex-col items-center justify-center gap-3">
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
    </div>
  </main>
</template>