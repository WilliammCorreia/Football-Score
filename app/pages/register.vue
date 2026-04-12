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
  <form @submit.prevent="login">
        <input
      v-model="credentials.avatar"
      type="text"
      placeholder="avatar"
    >
     
    <input
      v-model="credentials.email"
      type="email"
      placeholder="Email"
    >
       <input
      v-model="credentials.password"
      type="password"
      placeholder="Password"
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