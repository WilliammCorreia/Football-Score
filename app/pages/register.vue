<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  name: '',
  email: '',
})
async function login () {
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: credentials,
    })

    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/')
  } catch {
    alert('Bad credentials')
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <input
      v-model="credentials.email"
      type="email"
      placeholder="Email"
    >
    <input
      v-model="credentials.name"
      type="text"
      placeholder="Name"
    >
    <button type="submit">
      Login
    </button>
  </form>
</template>