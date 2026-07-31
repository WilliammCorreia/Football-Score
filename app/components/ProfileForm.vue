<script setup lang="ts">
import { useUserStore } from '~/store/user.store';
import { useFavouritesStore } from '~/store/favourites';

const user = useUserStore();
const fav = useFavouritesStore();

const favouriteTeams = computed(() => fav.teams);

const form = reactive({
  pseudo: user.pseudo ?? '',
  league: user.preferredLeague ?? '',
});

const errors = reactive({
  pseudo: '',
  league: '',
});

const success = ref(false);

const validate = () => {
  errors.pseudo = form.pseudo.trim().length < 3
    ? 'Le pseudo doit contenir au moins 3 caractères.'
    : '';
  errors.league = form.league.trim().length < 1
    ? 'Vous devez choisir une équipe favorite.'
    : '';
  return !errors.pseudo && !errors.league;
};

const submit = () => {
  success.value = false;
  if (!validate()) return;
  user.updateProfile(form.pseudo, form.league);
  success.value = true;
  setTimeout(() => {
    success.value = false;
  }, 3000);
};
</script>

<template>
  <div class="space-y-5">
    <!-- Pseudo -->
    <div>
      <label
        for="pseudo"
        class="mb-1.5 block text-sm font-semibold text-text-main"
      >
        Pseudo
      </label>
      <input
        id="pseudo"
        v-model="form.pseudo"
        type="text"
        placeholder="Votre pseudo"
        class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main transition-colors placeholder:text-text-soft focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        :class="errors.pseudo ? 'border-danger' : ''"
      >
      <p
        v-if="errors.pseudo"
        class="mt-1.5 text-sm text-danger"
      >
        {{ errors.pseudo }}
      </p>
    </div>

    <!-- Équipe favorite -->
    <div>
      <label
        for="league"
        class="mb-1.5 block text-sm font-semibold text-text-main"
      >
        Équipe favorite
      </label>
      <select
        id="league"
        v-model="form.league"
        class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        :class="errors.league ? 'border-danger' : ''"
      >
        <option
          disabled
          value=""
        >
          Choisissez une équipe
        </option>
        <option
          v-for="team in favouriteTeams"
          :key="team.id"
          :value="team.name"
        >
          {{ team.name }}
        </option>
      </select>
      <p
        v-if="errors.league"
        class="mt-1.5 text-sm text-danger"
      >
        {{ errors.league }}
      </p>
      <p
        v-if="favouriteTeams.length === 0"
        class="mt-1.5 text-sm text-text-muted"
      >
        Aucune équipe favorite. Rendez-vous sur la
        <NuxtLink
          to="/search"
          class="font-semibold text-primary-600 underline hover:text-primary-700"
        >
          page de recherche
        </NuxtLink>
        pour en ajouter.
      </p>
    </div>

    <!-- Submit + feedback -->
    <div class="flex items-center gap-3 pt-2">
      <button
        class="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        @click="submit"
      >
        Enregistrer
      </button>
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
      >
        <p
          v-if="success"
          class="flex items-center gap-1.5 text-sm font-semibold text-primary-600"
        >
          <Icon
            name="lucide:check-circle"
            size="1rem"
          />
          Modifications enregistrées
        </p>
      </Transition>
    </div>
  </div>
</template>
