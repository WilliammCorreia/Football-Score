<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
});

const { user } = useUserSession();
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
    <!-- Header avec avatar -->
    <header class="mb-10">
      <p class="eyebrow mb-3">Mon espace</p>
      <h1 class="display text-5xl text-text-main md:text-7xl">
        Profil
      </h1>
    </header>

    <!-- Carte identité -->
    <div class="card mb-8 p-6 md:p-8">
      <div class="flex flex-col items-center gap-5 text-center md:flex-row md:gap-6 md:text-left">
        <img
          v-if="user?.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="size-24 rounded-full border-2 border-border object-cover md:size-28"
        >
        <div v-else class="flex size-24 items-center justify-center rounded-full bg-primary-100 text-3xl font-bold text-primary-700 md:size-28">
          {{ user?.name?.charAt(0).toUpperCase() }}
        </div>
        <div class="flex-1">
          <h2 class="display text-3xl text-text-main md:text-4xl">
            {{ user?.name || 'Utilisateur' }}
          </h2>
          <p class="mt-1 text-text-muted">
            {{ user?.email }}
          </p>
          <div class="mt-3 flex justify-center md:justify-start">
            <PremiumBadge />
          </div>
        </div>
      </div>
    </div>

    <!-- Préférences -->
    <div class="card p-6 md:p-8">
      <div class="mb-5 flex items-baseline justify-between border-b border-border pb-4">
        <h2 class="display text-2xl text-text-main md:text-3xl">
          Préférences
        </h2>
        <p class="text-xs uppercase tracking-eyebrow text-text-soft">
          Personnalisation
        </p>
      </div>
      <ProfileForm />
    </div>
  </div>
</template>