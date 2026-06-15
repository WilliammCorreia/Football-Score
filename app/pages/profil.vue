<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
});

const { user } = useUserSession();
</script>

<template>
  <main class="min-h-screen bg-background-app py-8 px-4 md:py-12">
    <div class="mx-auto max-w-4xl space-y-8">

      <!-- ============ Header avec avatar ============ -->
      <div class="rounded-xl border-2 border-border bg-surface p-6 md:p-8">
        <div class="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <img
            v-if="user?.avatar"
            :src="user.avatar"
            :alt="user.name"
            class="size-24 rounded-full border-4 border-primary-500 object-cover md:size-32"
          >
          <div class="text-center md:text-left">
            <h1 class="text-3xl font-bold text-text-main md:text-4xl">
              {{ user?.name || 'Mon profil' }}
            </h1>
            <p class="mt-1 text-text-muted">
              {{ user?.email }}
            </p>
            <PremiumBadge class="mt-3" />
          </div>
        </div>
      </div>

      <!-- ============ Informations du profil ============ -->
      <div class="rounded-xl border-2 border-border bg-surface p-6 md:p-8">
        <h2 class="mb-4 text-xl font-bold text-text-main md:text-2xl">
          Informations du profil
        </h2>
        <ProfileForm />
      </div>

    </div>
  </main>
</template>