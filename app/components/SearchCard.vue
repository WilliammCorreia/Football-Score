<script setup lang="ts">
import type { TeamVenue } from '@/models/team';
import FavouriteButton from './FavouriteButton.vue';

defineProps<{
  team: TeamVenue;
}>();
</script>

<template>
  <article class="group flex items-start gap-4 rounded-xl border border-border bg-surface p-4 shadow-card transition-all duration-200 ease-snappy hover:border-border-strong hover:shadow-md md:p-6">
    <TeamLogo
      :url="team.team.logo"
      :name="team.team.name"
      size="md"
    />

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <NuxtLink
          :to="{ path: '/team', query: { id: team.team.id } }"
          class="block min-w-0 flex-1"
        >
          <h3 class="truncate text-lg font-bold text-text-main transition-colors group-hover:text-primary-600 md:text-xl">
            {{ team.team.name }}
          </h3>
        </NuxtLink>
        <FavouriteButton :team="team.team" />
      </div>

      <dl class="mt-2 space-y-1">
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon
            name="lucide:map-pin"
            size="0.875rem"
            class="shrink-0"
          />
          <dd class="truncate">
            {{ team.venue.city }}, {{ team.team.country }}
          </dd>
        </div>
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon
            name="lucide:building"
            size="0.875rem"
            class="shrink-0"
          />
          <dd class="truncate">
            {{ team.venue.name }}
          </dd>
        </div>
      </dl>
    </div>
  </article>
</template>
