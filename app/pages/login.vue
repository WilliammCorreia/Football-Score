<script setup lang="ts">
const { fetch: refreshSession } = useUserSession();

const credentials = reactive({
  email: '',
  password: '',
});

const loading = ref(false);
const errorMessage = ref('');

async function login() {
  loading.value = true;
  errorMessage.value = '';
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: credentials,
    });
    await refreshSession();
    await navigateTo('/');
  }
  catch {
    errorMessage.value = 'Email ou mot de passe incorrect. Réessayez.';
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <p class="eyebrow mb-3">
          Bienvenue
        </p>
        <h1 class="display text-6xl text-text-main md:text-7xl">
          Connexion
        </h1>
        <p class="mt-2 text-text-muted">
          Heureux de vous revoir.
        </p>
      </div>

      <div class="card p-6 md:p-8">
        <form
          class="space-y-5"
          @submit.prevent="login"
        >
          <!-- Email -->
          <div>
            <label
              for="email"
              class="mb-1.5 block text-sm font-semibold text-text-main"
            >
              Email
            </label>
            <input
              id="email"
              v-model="credentials.email"
              type="email"
              placeholder="vous@exemple.com"
              required
              class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main transition-colors placeholder:text-text-soft focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="mb-1.5 block text-sm font-semibold text-text-main"
            >
              Mot de passe
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text-main transition-colors placeholder:text-text-soft focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="flex items-start gap-2 rounded-lg bg-danger-bg p-3 text-sm text-danger"
          >
            <Icon
              name="lucide:alert-circle"
              size="1rem"
              class="mt-0.5 shrink-0"
            />
            <p>{{ errorMessage }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? 'Connexion…' : 'Se connecter' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-text-muted">
          Pas encore de compte ?
          <NuxtLink
            to="/register"
            class="font-semibold text-primary-600 hover:text-primary-hover"
          >
            Créer un compte
          </NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>
