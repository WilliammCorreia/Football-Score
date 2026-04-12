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
    <button @click="favourites.addTeam(team)" class="rounded-xl p-2 hover:bg-primary-300">
        <Icon
        :name="isInFavourites ? 'ion:ios-heart' : 'ion:ios-heart-empty'"
        size="1.5rem"
        mode="svg"
        :class="isInFavourites ? 'text-red-500' : 'text-text-muted'"
        />
    </button> 
        
</template>