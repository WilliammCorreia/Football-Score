export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  const { status, refresh } = useSubscription()

  if (status.value.subscriptionId === null) {
    await refresh()
  }

  if (!status.value.isPremium) {
    return navigateTo('/access-denied')
  }
})