<script setup lang="ts">
import type { Team } from '@/models/team';
import { useFavouritesStore } from '~/store/favourites';

const favourites = useFavouritesStore();

const props = defineProps<{
  team: Team;
  compact?: boolean;
}>();

const isInFavourites = computed(() => favourites.isInFavourites(props.team));
</script>

<template>
  <button
    class="group/fav inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors duration-150 hover:bg-surface"
    :class="isInFavourites ? 'text-danger' : 'text-text-muted'"
    :aria-label="isInFavourites ? 'Retirer des favoris' : 'Ajouter aux favoris'"
    @click="favourites.toggleTeam(team)"
  >
    <Icon
      :name="isInFavourites ? 'mdi:heart' : 'mdi:heart-outline'"
      class="transition-transform duration-200 group-hover/fav:scale-110"
      size="1.125rem"
    />
    <span v-if="!compact" class="hidden sm:inline">
      {{ isInFavourites ? 'Favori' : 'Ajouter' }}
    </span>
  </button>
</template>