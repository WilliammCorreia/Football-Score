<script setup lang="ts">
import type { Team } from '@/models/team';
import FavouriteButton from './FavouriteButton.vue';

defineProps<{
  team: Team;
}>();
</script>
<template>
    <FavouriteButton :team="team" />
    {{ team.code }} {{ team.id }} {{ team.country }} {{ team.name }} {{ team.founded }} <TeamLogo :url="team.logo" :name="team.name" />
    <PlayerList :players="team.player" />
    
</template>