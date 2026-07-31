<script setup lang="ts">
import type { Fixture } from '@/models/fixture';

defineProps<{
  fixture: Fixture;
}>();

const statusLabel = (short: string): string => {
  const map: Record<string, string> = {
    'NS': 'À venir',
    'FT': 'Terminé',
    'HT': 'Mi-temps',
    '1H': '1ère mi-temps',
    '2H': '2ème mi-temps',
    'ET': 'Prolongation',
    'P': 'Tirs au but',
    'PST': 'Reporté',
    'CANC': 'Annulé',
    'SUSP': 'Suspendu',
  };
  return map[short] || short;
};
</script>

<template>
  <article class="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-all duration-200 ease-snappy hover:border-border-strong hover:shadow-md">
    <!-- Top bar : status + venue -->
    <header class="flex items-center justify-between border-b border-border bg-surface-muted px-4 py-2.5">
      <div class="flex items-center gap-2">
        <span
          v-if="fixture.fixture.status.elapsed && fixture.fixture.status.short !== 'FT'"
          class="flex items-center gap-1.5 rounded-full bg-danger px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white"
        >
          <span class="size-1.5 animate-pulse rounded-full bg-white" />
          Live · {{ fixture.fixture.status.elapsed }}'
        </span>
        <span
          v-else
          class="text-xs font-semibold uppercase tracking-wider text-text-muted"
        >
          {{ statusLabel(fixture.fixture.status.short) }}
        </span>
      </div>
      <p class="hidden truncate text-xs text-text-soft sm:block">
        {{ fixture.fixture.venue.name }}
      </p>
    </header>

    <!-- Main : équipes + score -->
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-4 md:p-6">
      <!-- Home team -->
      <NuxtLink
        :to="{ path: '/team', query: { id: fixture.teams.home.id } }"
        class="flex flex-col items-center gap-2 text-center md:flex-row md:gap-4 md:text-left"
      >
        <img
          :src="fixture.teams.home.logo"
          :alt="fixture.teams.home.name"
          class="size-12 object-contain transition-transform group-hover:scale-105 md:size-16"
        >
        <div class="min-w-0 flex-1">
          <p class="line-clamp-2 text-sm font-semibold text-text-main md:text-base">
            {{ fixture.teams.home.name }}
          </p>
        </div>
      </NuxtLink>

      <!-- Score (signature element) -->
      <div class="flex flex-col items-center justify-center gap-1">
        <div
          v-if="fixture.fixture.status.short !== 'NS'"
          class="tabular flex items-baseline gap-2 font-mono"
        >
          <span class="text-4xl font-bold text-text-main md:text-6xl">
            {{ fixture.goals.home ?? 0 }}
          </span>
          <span class="text-2xl text-text-soft md:text-4xl">·</span>
          <span class="text-4xl font-bold text-text-main md:text-6xl">
            {{ fixture.goals.away ?? 0 }}
          </span>
        </div>
        <div
          v-else
          class="tabular font-mono text-2xl font-semibold text-text-muted md:text-3xl"
        >
          {{ fixture.fixture.date.split('T')[1]?.slice(0, 5) ?? '--:--' }}
        </div>
      </div>

      <!-- Away team -->
      <NuxtLink
        :to="{ path: '/team', query: { id: fixture.teams.away.id } }"
        class="flex flex-col items-center gap-2 text-center md:flex-row-reverse md:gap-4 md:text-right"
      >
        <img
          :src="fixture.teams.away.logo"
          :alt="fixture.teams.away.name"
          class="size-12 object-contain transition-transform group-hover:scale-105 md:size-16"
        >
        <div class="min-w-0 flex-1">
          <p class="line-clamp-2 text-sm font-semibold text-text-main md:text-base">
            {{ fixture.teams.away.name }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <!-- Footer : favorites actions -->
    <footer class="flex items-center justify-between border-t border-border bg-surface-muted px-4 py-2">
      <FavouriteButton
        :team="fixture.teams.home"
        :compact="true"
      />
      <p class="block truncate text-xs text-text-soft sm:hidden">
        {{ fixture.fixture.venue.name }}
      </p>
      <FavouriteButton
        :team="fixture.teams.away"
        :compact="true"
      />
    </footer>
  </article>
</template>
