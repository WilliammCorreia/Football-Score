<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
});
</script>

<template>
  <main class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="card p-8 text-center md:p-10">
        <div class="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-accent-50">
          <Icon
            name="lucide:lock"
            size="2rem"
            class="text-accent-500"
          />
        </div>

        <p class="eyebrow mb-3">
          Accès réservé
        </p>
        <h1 class="display text-5xl text-text-main md:text-6xl">
          Premium uniquement
        </h1>

        <p class="mx-auto mt-3 max-w-sm text-text-muted">
          Cette fonctionnalité est réservée aux abonnés Premium. Passez Premium pour en profiter.
        </p>

        <NuxtLink
          to="/premium"
          class="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Découvrir Premium
          <Icon
            name="lucide:arrow-right"
            size="1.125rem"
          />
        </NuxtLink>

        <div class="mt-6">
          <NuxtLink
            to="/dashboard"
            class="text-sm font-medium text-text-muted underline hover:text-text-main"
          >
            Retour au tableau de bord
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
