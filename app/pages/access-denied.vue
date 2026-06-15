<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})
</script>

<template>
  <main class="flex justify-center p-4 pt-16 md:pt-36">
    <div class="w-full max-w-lg rounded-xl border-2 border-border bg-surface p-8 md:p-10 text-center">
      <div class="mb-6 flex justify-center">
        <Icon
          name="mdi:lock"
          size="4rem"
          class="text-primary-500"
        />
      </div>

      <h1 class="mb-4 text-3xl font-bold text-text-main md:text-4xl">
        Accès réservé
      </h1>

      <p class="mb-8 text-base text-text-muted md:text-lg">
        Cette fonctionnalité est réservée aux abonnés Premium.
        Passez Premium pour en profiter pleinement.
      </p>

      <NuxtLink
        to="/premium"
        class="inline-block rounded-xl bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-hover hover:scale-105 active:bg-primary-700 md:text-xl"
      >
        Découvrir Premium
      </NuxtLink>

      <div class="mt-6">
        <NuxtLink
          to="/dashboard"
          class="text-sm text-text-muted underline hover:text-primary-500"
        >
          Retour au tableau de bord
        </NuxtLink>
      </div>
    </div>
  </main>
</template>