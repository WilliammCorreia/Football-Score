<script setup lang="ts">
import type { Team } from '@/models/team';
import FavouriteButton from './FavouriteButton.vue';

defineProps<{
  team: Team;
}>();
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <!-- Hero card -->
    <article class="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div class="bg-gradient-to-br from-primary-500 to-primary-700 px-6 py-12 md:px-12">
        <div class="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <div class="rounded-xl bg-white p-3 shadow-lg md:p-4">
            <TeamLogo
              :url="team.logo"
              :name="team.name"
              size="xl"
            />
          </div>
          <div class="flex-1 text-center md:text-left">
            <p class="eyebrow !text-primary-100 mb-2">
              {{ team.country || 'Équipe' }} · Fondée en {{ team.founded || 'N/A' }}
            </p>
            <h1 class="display text-5xl leading-none text-white md:text-7xl">
              {{ team.name }}
            </h1>
          </div>
          <FavouriteButton :team="team" class="!bg-white/10 !text-white hover:!bg-white/20" />
        </div>
      </div>

      <!-- Stats grid -->
      <dl class="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
        <div class="px-4 py-4 text-center md:py-6">
          <dt class="eyebrow mb-1">Pays</dt>
          <dd class="font-mono tabular text-lg font-semibold text-text-main md:text-xl">
            {{ team.country || '—' }}
          </dd>
        </div>
        <div class="px-4 py-4 text-center md:py-6">
          <dt class="eyebrow mb-1">Fondée</dt>
          <dd class="font-mono tabular text-lg font-semibold text-text-main md:text-xl">
            {{ team.founded || '—' }}
          </dd>
        </div>
        <div class="border-t border-border px-4 py-4 text-center md:border-t-0 md:py-6">
          <dt class="eyebrow mb-1">Code</dt>
          <dd class="font-mono tabular text-lg font-semibold text-text-main md:text-xl">
            {{ team.code || '—' }}
          </dd>
        </div>
        <div class="border-t border-border px-4 py-4 text-center md:border-t-0 md:py-6">
          <dt class="eyebrow mb-1">ID</dt>
          <dd class="font-mono tabular text-lg font-semibold text-text-main md:text-xl">
            #{{ team.id }}
          </dd>
        </div>
      </dl>
    </article>

    <PlayerList :players="team.player" />
  </div>
</template>