<script setup lang="ts">
import type { Team } from '@/models/team';
import { useFavouritesStore } from '~/store/favourites';

const favourites = useFavouritesStore();
const props = defineProps<{
  team: Team;
}>();
const isInFavourites = computed(() => favourites.isInFavourites(props.team))
</script>
<template>
    <button @click="favourites.addTeam(team)">Ajouter au favori</button> 
    <span v-if="isInFavourites">Dedans</span>
    <span v-else>Dehors</span>
</template>