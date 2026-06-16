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

if (status.value.isPremium) {
  await navigateTo('/premium')
}

onMounted(() => {
  track('checkout_start', { product: 'premium_subscription', price_cents: 499 })
})

async function handleConfirm() {
  loading.value = true
  errorMessage.value = ''
  try {
    const result = await subscribe()
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
    errorMessage.value = err?.statusMessage || "Une erreur est survenue lors de l'abonnement."
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
    <div class="w-full max-w-xl">
      <div class="mb-8 text-center">
        <p class="eyebrow mb-3">Étape finale</p>
        <h1 class="display text-5xl text-text-main md:text-6xl">
          Récapitulatif
        </h1>
        <p class="mt-2 text-text-muted">
          Vérifiez votre commande avant de confirmer.
        </p>
      </div>

      <div class="card overflow-hidden">
        <!-- Ligne article -->
        <div class="flex items-center justify-between gap-3 p-6">
          <div class="flex items-center gap-4">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-sm">
              <Icon name="lucide:crown" size="1.5rem" />
            </div>
            <div>
              <p class="font-semibold text-text-main">Abonnement Premium</p>
              <p class="text-sm text-text-muted">30 jours d'accès complet</p>
            </div>
          </div>
          <span class="font-mono tabular text-xl font-semibold text-text-main">
            4,99 €
          </span>
        </div>

        <!-- Total -->
        <div class="flex items-center justify-between border-t border-border bg-surface-muted px-6 py-4">
          <span class="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Total à payer
          </span>
          <span class="display font-mono tabular text-3xl text-primary-600">
            4,99 €
          </span>
        </div>
      </div>

      <!-- Success -->
      <div
        v-if="successMessage"
        class="mt-6 flex items-start gap-3 rounded-xl border border-primary-300 bg-primary-50 p-4"
      >
        <Icon name="lucide:check-circle-2" size="1.25rem" class="mt-0.5 shrink-0 text-primary-600" />
        <div>
          <p class="font-semibold text-primary-700">Paiement réussi !</p>
          <p class="text-sm text-primary-600">{{ successMessage }}</p>
        </div>
      </div>

      <!-- Error -->
      <div
        v-if="errorMessage"
        class="mt-6 flex items-start gap-2 rounded-lg bg-danger-bg p-3 text-sm text-danger"
      >
        <Icon name="lucide:alert-circle" size="1rem" class="mt-0.5 shrink-0" />
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Actions -->
      <div v-if="!successMessage" class="mt-6 flex flex-col-reverse gap-3 md:flex-row">
        <NuxtLink
          to="/premium"
          class="flex-1 rounded-xl border border-border bg-surface px-6 py-3.5 text-center text-base font-semibold text-text-main transition-colors hover:bg-surface-muted"
        >
          Annuler
        </NuxtLink>
        <button
          :disabled="loading"
          data-umami-event="checkout_success"
          class="flex-1 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          @click="handleConfirm"
        >
          {{ loading ? 'Traitement…' : 'Confirmer et payer' }}
        </button>
      </div>

      <p class="mt-6 text-center text-xs text-text-soft">
        Paiement simulé pour la démonstration. Aucun débit ne sera effectué.
      </p>
    </div>
  </main>
</template>