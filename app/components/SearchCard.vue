<script setup lang="ts">
import type { TeamVenue } from '@/models/team';
import FavouriteButton from './FavouriteButton.vue';

defineProps<{
  team: TeamVenue;
}>();
</script>

<template>
  <div class="flex min-h-32 w-full items-center gap-2 rounded-xl border-2 border-border bg-surface py-2 md:gap-8 md:border-4 md:p-8">
    <TeamLogo
      :url="team.team.logo"
      :name="team.team.name"
    />
    <div class="flex flex-1 flex-col items-start justify-between gap-1">
      <h2 class="text-lg font-bold text-text-main md:text-xl">
        {{ team.team.name }}
      </h2>
      <section class="flex items-center gap-1 text-text-muted">
        <Icon
          name="ion:ios-location"
          mode="svg"
        />
        <h3 class="font-medium md:text-lg">
          {{ team.venue.city }} - {{ team.team.country }}
        </h3>
      </section>
      <section class="flex items-center gap-1 text-text-muted">
        <Icon
          name="ion:ios-home"
          mode="svg"
        />
        <h3 class="font-medium md:text-lg">
          {{ team.venue.name }}
        </h3>
      </section>
    </div>
    <FavouriteButton
      :team="team.team"
      class="self-start"
    />
  </div>
</template>
