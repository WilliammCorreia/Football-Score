<script setup lang="ts">
const credentials = reactive({
  name: '',
  email: '',
  password: '',
  avatar: '',
});

const loading = ref(false);
const errorMessage = ref('');

const avatarValid = computed(() => {
  if (!credentials.avatar) return false;
  return /^https?:\/\//.test(credentials.avatar);
});

async function register() {
  loading.value = true;
  errorMessage.value = '';
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: credentials,
    });
    await navigateTo('/login');
  }
  catch {
    errorMessage.value = 'Inscription impossible. Vérifiez vos informations et réessayez.';
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
    <div class="w-full max-w-md">
      <div class="mb-6 text-center">
        <p class="eyebrow mb-3">Rejoignez-nous</p>
        <h1 class="display text-5xl text-text-main md:text-6xl">
          Créer un compte
        </h1>
        <p class="mt-2 text-text-muted">
          Suivez vos équipes favorites en quelques secondes.
        </p>
      </div>

      <div class="card p-6 md:p-8">
        <form class="space-y-4" @submit.prevent="register">
          <!-- Avatar (URL) avec aperçu -->
          <div>
            <label for="avatar" class="mb-1.5 block text-sm font-semibold text-text-main">
              Avatar (URL)
              <span class="font-normal text-text-soft">— optionnel</span>
            </label>
            <div class="flex items-center gap-3">
              <div class="shrink-0">
                <img
                  v-if="avatarValid"
                  :src="credentials.avatar"
                  alt="Aperçu de l'avatar"
                  class="size-12 rounded-full border border-border object-cover"
                  @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
                >
                <div
                  v-else
                  class="flex size-12 items-center justify-center rounded-full border border-dashed border-border bg-surface-muted text-text-soft"
                >
                  <Icon name="lucide:user" size="1.25rem" />
                </div>
              </div>
              <input
                id="avatar"
                v-model="credentials.avatar"
                type="url"
                placeholder="https://…"
                class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main placeholder:text-text-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
            </div>
          </div>

          <!-- Nom -->
          <div>
            <label for="name" class="mb-1.5 block text-sm font-semibold text-text-main">
              Nom complet
            </label>
            <input
              id="name"
              v-model="credentials.name"
              type="text"
              placeholder="Jean Dupont"
              required
              class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main placeholder:text-text-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="mb-1.5 block text-sm font-semibold text-text-main">
              Email
            </label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              placeholder="vous@exemple.com"
              required
              class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main placeholder:text-text-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="mb-1.5 block text-sm font-semibold text-text-main">
              Mot de passe
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main placeholder:text-text-soft transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="flex items-start gap-2 rounded-lg bg-danger-bg p-3 text-sm text-danger"
          >
            <Icon name="lucide:alert-circle" size="1rem" class="mt-0.5 shrink-0" />
            <p>{{ errorMessage }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="mt-2 w-full rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? 'Création…' : "S'inscrire" }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-text-muted">
          Déjà un compte ?
          <NuxtLink to="/login" class="font-semibold text-primary-600 hover:text-primary-hover">
            Se connecter
          </NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>