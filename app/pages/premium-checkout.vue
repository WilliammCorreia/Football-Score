<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

const { status, refresh, subscribe } = useSubscription()
const { track } = useTracking()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

await refresh()

// Si déjà Premium, on renvoie vers /premium
if (status.value.isPremium) {
  await navigateTo('/premium')
}

onMounted(() => {
  // ETAPE 3 du tunnel : checkout_start
  track('checkout_start', { product: 'premium_subscription', price_cents: 499 })
})

async function handleConfirm() {
  loading.value = true
  errorMessage.value = ''
  try {
    const result = await subscribe()
    // ETAPE 4 du tunnel : checkout_success
    track('checkout_success', {
      product: 'premium_subscription',
      price_cents: 499,
      amount: result.amount,
      subscription_id: result.subscriptionId,
    })
    successMessage.value = 'Votre abonnement Premium est maintenant actif !'
    setTimeout(() => navigateTo('/premium'), 2000)
  }
  catch (error: unknown) {
    const err = error as { statusMessage?: string }
    errorMessage.value = err?.statusMessage || 'Une erreur est survenue lors de l\'abonnement'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex justify-center p-4 pt-16 md:pt-24">
    <div class="w-full max-w-xl rounded-xl border-2 border-border bg-surface p-8 md:p-10">
      <h1 class="mb-2 text-center text-3xl font-bold text-text-main md:text-4xl">
        Récapitulatif
      </h1>
      <p class="mb-8 text-center text-sm text-text-muted md:text-base">
        Vérifiez les détails avant de confirmer.
      </p>

      <div class="mb-6 rounded-xl border-2 border-border bg-background-app p-6">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="mdi:star" size="2rem" class="text-primary-500" />
            <div>
              <p class="font-semibold text-text-main">Abonnement Premium</p>
              <p class="text-xs text-text-muted">30 jours d'accès complet</p>
            </div>
          </div>
          <span class="text-xl font-bold text-text-main">4,99 €</span>
        </div>

        <div class="border-t-2 border-border pt-4 flex items-center justify-between">
          <span class="text-text-muted">Total à payer</span>
          <span class="text-2xl font-bold text-primary-500">4,99 €</span>
        </div>
      </div>

      <div v-if="successMessage" class="mb-4 rounded-xl border-2 border-success bg-surface p-4 text-center">
        <Icon name="mdi:check-circle" size="2rem" class="mx-auto mb-2 text-success" />
        <p class="font-semibold text-text-main">{{ successMessage }}</p>
      </div>

      <button
        v-if="!successMessage"
        :disabled="loading"
        data-umami-event="checkout_success"
        class="w-full rounded-xl bg-primary-500 p-4 text-lg font-semibold text-white transition-all hover:bg-primary-hover hover:scale-105 active:bg-primary-700 disabled:opacity-50 disabled:hover:scale-100 md:p-5 md:text-xl"
        @click="handleConfirm"
      >
        <span v-if="loading">Traitement en cours…</span>
        <span v-else>Confirmer et payer</span>
      </button>

      <p v-if="errorMessage" class="mt-4 text-center text-base text-danger">
        {{ errorMessage }}
      </p>

      <div class="mt-6 text-center">
        <NuxtLink to="/premium" class="text-sm text-text-muted underline hover:text-primary-500">
          Annuler
        </NuxtLink>
      </div>
    </div>
  </main>
</template>