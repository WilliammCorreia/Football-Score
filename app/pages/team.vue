<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Team } from '~/models/team'
import { useUserStore } from '~/store/user.store'

const user = useUserStore()

const team = ref<Team>({
  id: 0,
  name: "",
  country: "",
  logo: "",
  founded: 0,
  code: "",
  player: []
})

const isLoading = ref(true)
const errors = ref<Error | null>(null)

const route = useRoute()
const id = route.query.id

// 🔥 Récupération de l'équipe
const { data, pending, error } = await useFetch<Team>('/api/team?id=' + id)

if (data.value) {
  team.value = data.value
}

isLoading.value = pending.value
errors.value = error.value ?? null

// 🔥 Toggle favoris via UserStore
function toggleFavourite() {
  if (!team.value) return
  user.toggleFavouriteTeam(team.value)
}

// 🔥 Vérifier si l'équipe est en favoris
const isFavourite = computed(() => {
  if (!team.value) return false
  return user.isTeamFavourite(team.value)
})
</script>
<template>
  <main>
    <AppLoader v-if="isLoading" />

    <div v-else>
      <div class="flex items-center justify-between m-3 md:m-6">
        <h1 class="text-3xl font-bold text-text-muted md:text-5xl">
          {{ team.name }}
        </h1>

        <!-- ❤️ Bouton favoris -->
        <button
            @click="toggleFavourite"
            class="text-4xl transition transform hover:scale-110"
        >
          <span v-if="isFavourite">❤️</span>
          <span v-else>🤍</span>
        </button>
      </div>

      <p v-if="errors" class="text-lg text-danger">
        Une erreur est survenue lors de l'appel API.
      </p>

      <ul v-else class="mt-8 flex w-full flex-col items-center justify-center">
        <TeamCard :team="team" />
      </ul>
    </div>
  </main>
</template>
