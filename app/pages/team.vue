<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Team } from '~/models/team';

const team = ref<Team>({id:0, name:"", country:"", logo:"", founded:0, code:"", player: []});
const isLoading = ref(true);
const errors = ref<Error | null>(null);
const route = useRoute();
const id = route.query.id

  const { data, pending, error } = await useFetch<Team>('/api/team?id=' + id);
    console.log(data.value)
  if (data.value) {
    team.value = data.value;
  }
  isLoading.value = pending.value;
  errors.value = error.value ?? null;

</script>

<template>
  <main>
    <AppLoader v-if="isLoading" />
    <div v-else>
      <h1 class="m-3 text-3xl font-bold text-text-muted md:m-6 md:text-5xl">
        Équipe 33
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
        <TeamCard :team="team" />
      </ul>
    </div>
  </main>
</template>
