<script setup lang="ts">
import type { Team } from '@/models/team';
import FavouriteButton from './FavouriteButton.vue';

defineProps<{
  team: Team;
}>();
</script>
<template>
  <div class="flex w-full flex-col gap-6">
    <div class="flex min-h-32 w-full flex-col items-center gap-4 rounded-xl border-2 border-border bg-surface p-4 md:p-8">
      
      <div class="flex items-center gap-4">
        <FavouriteButton :team="team" />
        <TeamLogo :url="team.logo" :name="team.name" size="lg" />
      </div>

      <div class="text-center">
        <h2 class="text-2xl font-bold md:text-3xl">{{ team.name }}</h2>
        <p class="text-text-muted">Code: {{ team.code }}</p>
      </div>

      <div class="grid w-full grid-cols-2 gap-4 text-center md:grid-cols-4">
        <div class="rounded-lg bg-primary-100 p-3">
          <p class="text-sm text-text-muted">Country</p>
          <p class="font-semibold">{{ team.country }}</p>
        </div>
        <div class="rounded-lg bg-primary-100 p-3">
          <p class="text-sm text-text-muted">Founded</p>
          <p class="font-semibold">{{ team.founded }}</p>
        </div>
        <div class="rounded-lg bg-primary-100 p-3">
          <p class="text-sm text-text-muted">Code</p>
          <p class="font-semibold">{{ team.code }}</p>
        </div>
        <div class="rounded-lg bg-primary-100 p-3">
          <p class="text-sm text-text-muted">ID</p>
          <p class="font-semibold">{{ team.id }}</p>
        </div>
      </div>
    </div>
    <PlayerList :players="team.player" />
  </div>
</template>