<script setup lang="ts">
import type { Team } from '@/models/team';
import { computed } from 'vue';
import { useFavouritesStore } from '~/store/favourites';

const favourites = useFavouritesStore();
const { track } = useUmami();
const props = defineProps<{
  team: Team;
}>();
const isInFavourites = computed(() => favourites.isInFavourites(props.team));

function handleClick() {
  const wasInFavourites = isInFavourites.value;
  favourites.addTeam(props.team);
  if (!wasInFavourites) {
    track('add_to_cart', {
      team_id: props.team.id,
      team_name: props.team.name,
    });
  }
}
</script>

<template>
  <button
    class="rounded-xl p-2 hover:bg-primary-300"
    @click="handleClick"
  >
    <Icon
      :name="isInFavourites ? 'ion:ios-heart' : 'ion:ios-heart-empty'"
      size="1.5rem"
      mode="svg"
      :class="isInFavourites ? 'text-red-500' : 'text-text-muted'"
    />
  </button>
</template>
