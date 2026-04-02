<script setup lang="ts">
import type { Fixture } from '@/models/fixture';

defineProps<{
  fixture: Fixture;
}>();
</script>

<template>
  <div class="flex w-full justify-between gap-8 rounded-xl border-4 border-blue-500 bg-slate-100 p-8">
    <TeamLogo
      :url="fixture.teams.home.logo"
      :name="fixture.teams.home.name"
      :size="48"
    />
    <main class="flex flex-1 flex-col items-center justify-between">
      <div class="flex w-full justify-between">
        <h3 class="text-xl font-bold">
          {{ fixture.teams.home.name }}
        </h3>
        <h2 class="text-xl font-bold">
          {{ fixture.teams.away.name }}
        </h2>
      </div>
      <h2
        v-if="fixture.fixture.status.short !== 'NS'"
        class="text-5xl font-bold"
      >
        {{ fixture.goals.home }} - {{ fixture.goals.away }}
      </h2>
      <h2
        v-else
        class="text-5xl font-bold"
      >
        {{ fixture.fixture.date.split('T')[1]?.slice(0, 5) ?? 'N/A' }}
      </h2>

      <span
        v-if="fixture.fixture.status.elapsed && fixture.fixture.status.short !== 'FT'"
        class="flex h-8 w-12 items-center justify-center rounded-full border-2 border-red-500 text-sm font-bold"
      >{{ fixture.fixture.status.elapsed }}'</span>
      <span class="text-lg">{{ fixture.fixture.venue.name }}</span>
    </main>
    <TeamLogo
      :url="fixture.teams.away.logo"
      :name="fixture.teams.away.name"
      :size="48"
    />
  </div>
</template>
