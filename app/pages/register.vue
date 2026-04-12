<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  name: '',
  password: '',
  avatar: '',
  email: '',
})
async function login () {
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: credentials,
    })

    await navigateTo('/login')
  } catch {
    alert('Register failed')
  }
}
</script>

<template>
  <main class="flex justify-center p-4 pt-16 md:pt-6">
    <div class="w-full max-w-lg rounded-xl border-2 border-border bg-surface p-8 md:p-10">
      <h1 class="mb-8 text-center text-4xl font-bold text-text-muted md:mb-10 md:text-5xl">
        Inscription
      </h1>

      <form @submit.prevent="login" class="flex flex-col gap-6">
        <div>
          <label for="avatar" class="mb-2 block text-base font-semibold text-text-muted">
            Avatar (URL)
          </label>
          <input
            id="avatar"
            v-model="credentials.avatar"
            type="text"
            placeholder="https://..."
            class="w-full rounded-xl border-2 border-border bg-primary-100 p-4 text-lg text-text outline-none transition-all focus:border-primary-400 focus:bg-primary-50 md:p-5"
          />
        </div>

        <div>
          <label for="name" class="mb-2 block text-base font-semibold text-text-muted">
            Nom complet
          </label>
          <input
            id="name"
            v-model="credentials.name"
            type="text"
            placeholder="Jean Dupont"
            class="w-full rounded-xl border-2 border-border bg-primary-100 p-4 text-lg text-text outline-none transition-all focus:border-primary-400 focus:bg-primary-50 md:p-5"
            required
          />
        </div>

        <div>
          <label for="email" class="mb-2 block text-base font-semibold text-text-muted">
            Email
          </label>
          <input
            id="email"
            v-model="credentials.email"
            type="email"
            placeholder="exemple@email.com"
            class="w-full rounded-xl border-2 border-border bg-primary-100 p-4 text-lg text-text outline-none transition-all focus:border-primary-400 focus:bg-primary-50 md:p-5"
            required
          />
        </div>

        <div>
          <label for="password" class="mb-2 block text-base font-semibold text-text-muted">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-xl border-2 border-border bg-primary-100 p-4 text-lg text-text outline-none transition-all focus:border-primary-400 focus:bg-primary-50 md:p-5"
            required
          />
        </div>

        <button
          type="submit"
          class="mt-6 rounded-xl bg-primary-500 p-4 text-lg font-semibold text-white transition-all hover:bg-primary-600 hover:scale-105 active:bg-primary-700 disabled:opacity-50 disabled:hover:scale-100 md:p-5 md:text-xl"
        >
          S'inscrire
        </button>

        <p class="mt-4 text-center text-sm text-text-muted">
          Déjà un compte ?
          <NuxtLink to="/login" class="text-primary-500 hover:underline">
            Connecte-toi
          </NuxtLink>
        </p>
      </form>
    </div>
  </main>
</template>