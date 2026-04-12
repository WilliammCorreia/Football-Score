<script setup lang="ts">
import type { Team } from '@/models/team';

defineProps<{
  team: Team;
}>();
</script>
<template>
    {{ team.code }} {{ team.id }} {{ team.country }} {{ team.name }} {{ team.founded }} <TeamLogo :url="team.logo" :name="team.name" />
    <PlayerList :players="team.player" />
</template>