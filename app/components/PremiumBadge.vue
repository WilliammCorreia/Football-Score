<script setup lang="ts">
const { status, refresh } = useSubscription();
const { loggedIn } = useUserSession();

if (loggedIn.value && status.value.subscriptionId === null) {
  await refresh();
}
</script>

<template>
  <NuxtLink
    v-if="status.isPremium"
    to="/premium"
    class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-transform hover:scale-105"
  >
    <Icon
      name="lucide:crown"
      size="0.875rem"
    />
    Premium
  </NuxtLink>

  <NuxtLink
    v-else-if="loggedIn"
    to="/premium"
    class="inline-flex items-center gap-1.5 rounded-full border border-accent-300 bg-transparent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-600 transition-colors hover:bg-accent-50"
  >
    <Icon
      name="lucide:sparkles"
      size="0.875rem"
    />
    Passer Premium
  </NuxtLink>
</template>
