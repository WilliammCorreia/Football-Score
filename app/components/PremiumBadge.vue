<script setup lang="ts">
const { status, refresh } = useSubscription()
const { loggedIn } = useUserSession()

if (loggedIn.value && status.value.subscriptionId === null) {
  await refresh()
}
</script>

<template>
  <NuxtLink
    v-if="status.isPremium"
    to="/premium"
    class="inline-flex items-center gap-1 rounded-full bg-warning px-3 py-1 text-xs font-bold text-white transition-all hover:scale-105"
  >
    <Icon name="mdi:star" size="1rem" />
    Premium
  </NuxtLink>

  <NuxtLink
    v-else-if="loggedIn"
    to="/premium"
    class="inline-flex items-center gap-1 rounded-full border-2 border-warning bg-transparent px-3 py-1 text-xs font-bold text-warning transition-all hover:bg-warning hover:text-white hover:scale-105"
  >
    <Icon name="mdi:star-outline" size="1rem" />
    Passer Premium
  </NuxtLink>
</template>