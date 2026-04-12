<script setup lang="ts">
import { useUserStore } from '~/store/user.store'
import { useFavouritesStore } from '~/store/favourites'

const user = useUserStore()
const fav = useFavouritesStore()


const favouriteTeams = computed(() => {
  return fav.teams
})


const form = reactive({
  pseudo: user.pseudo ?? '',
  league: user.preferredLeague ?? ''   // devient un select
})


const errors = reactive({
  pseudo: '',
  league: ''
})

const validate = () => {
  errors.pseudo = form.pseudo.trim().length < 3
      ? 'Le pseudo doit contenir au moins 3 caractères.'
      : ''

  errors.league = form.league.trim().length < 1
      ? 'Vous devez choisir une équipe favorite.'
      : ''

  return !errors.pseudo && !errors.league
}


const submit = () => {
  if (!validate()) return
  user.updateProfile(form.pseudo, form.league)
}
</script>

<template>
  <div class="space-y-4 p-6 bg-white rounded-xl shadow">


    <div>
      <label class="block font-semibold mb-1">Pseudo</label>
      <input
          v-model="form.pseudo"
          type="text"
          class="w-full border p-2 rounded"
          placeholder="Votre pseudo"
      />
      <p v-if="errors.pseudo" class="text-red-500 text-sm mt-1">
        {{ errors.pseudo }}
      </p>
    </div>


    <div>
      <label class="block font-semibold mb-1">Équipe favorite</label>

      <select
          v-model="form.league"
          class="w-full border p-2 rounded"
      >
        <option disabled value="">Choisissez une équipe</option>

        <option
            v-for="team in favouriteTeams"
            :key="team.id"
            :value="team.name"
        >
          {{ team.name }}
        </option>
      </select>

      <p v-if="errors.league" class="text-red-500 text-sm mt-1">
        {{ errors.league }}
      </p>
    </div>


    <button
        @click="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
    >
      Enregistrer
    </button>
  </div>
</template>