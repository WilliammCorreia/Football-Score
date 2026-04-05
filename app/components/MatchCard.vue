<script setup lang="ts">
import type { Fixture } from '@/models/fixture';

defineProps<{
  fixture: Fixture;
}>();
</script>

<template>
  <div class="flex min-h-32 w-full items-center justify-between gap-2 rounded-xl border-2 border-blue-500 bg-slate-100 py-2 md:gap-8 md:border-4 md:p-8">
    <TeamLogo
      :url="fixture.teams.home.logo"
      :name="fixture.teams.home.name"
    />
    <main class="flex flex-1 flex-col items-center justify-between gap-1">
      <div class="flex w-full justify-between gap-8">
        <h3 class="text-sm font-bold md:text-xl">
          {{ fixture.teams.home.name }}
        </h3>
        <h2 class="text-right text-sm font-bold md:text-xl">
          {{ fixture.teams.away.name }}
        </h2>
      </div>
      <h2
        v-if="fixture.fixture.status.short !== 'NS'"
        class="text-3xl font-bold md:text-5xl"
      >
        {{ fixture.goals.home }} - {{ fixture.goals.away }}
      </h2>
      <h2
        v-else
        class="text-3xl font-bold md:text-5xl"
      >
        {{ fixture.fixture.date.split('T')[1]?.slice(0, 5) ?? 'N/A' }}
      </h2>

      <span
        v-if="fixture.fixture.status.elapsed && fixture.fixture.status.short !== 'FT'"
        class="flex h-5 w-8  items-center justify-center rounded-full border border-red-500 text-xs font-bold md:h-8 md:w-12 md:border-2 md:text-sm"
      >{{ fixture.fixture.status.elapsed }}'</span>
      <span class="text-center text-xs md:text-lg">{{ fixture.fixture.venue.name }}</span>
    </main>
    <TeamLogo
      :url="fixture.teams.away.logo"
      :name="fixture.teams.away.name"
    />
  </div>
</template>
