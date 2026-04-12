<script setup lang="ts">
import { useUserStore } from '~~/stores/user.store'

const userStore = useUserStore()

// Formulaire local
const form = reactive({
  username: userStore.username,
  email: userStore.email,
  favoriteTeam: userStore.favoriteTeam
})

const teams = [
  'PSG', 'OM', 'OL', 'AS Monaco',
  'Real Madrid', 'FC Barcelone',
  'Manchester City', 'Liverpool',
  'Bayern Munich', 'Juventus'
]

const save = () => {
  userStore.updateUser({ ...form })
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto space-y-6">

    <h1 class="text-2xl font-bold">Paramètres du profil</h1>

    <div class="space-y-4">

      <div>
        <label class="block text-sm font-medium mb-1">Nom d'utilisateur</label>
        <input
            v-model="form.username"
            type="text"
            class="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Équipe favorite</label>
        <select
            v-model="form.favoriteTeam"
            class="w-full px-3 py-2 border rounded"
        >
          <option disabled value="">Choisir une équipe</option>
          <option v-for="team in teams" :key="team" :value="team">
            {{ team }}
          </option>
        </select>
      </div>

    </div>

    <button
        @click="save"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Enregistrer
    </button>

  </div>
</template>
