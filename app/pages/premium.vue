<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

const { status, refresh } = useSubscription()
const { track } = useTracking()

await refresh()

onMounted(() => {
  track('view_product', { product: 'premium_subscription', price_cents: 499 })
})

const formattedExpiry = computed(() => {
  if (!status.value.expiresAt) return ''
  return new Date(status.value.expiresAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const advantages = [
  { icon: 'mdi:bell-ring', title: 'Alertes match', desc: 'Recevez un rappel avant chaque match de vos équipes favorites' },
  { icon: 'mdi:trophy', title: 'Toutes les ligues', desc: 'Accès illimité à toutes les compétitions disponibles' },
  { icon: 'mdi:star', title: 'Favoris illimités', desc: 'Suivez autant d\'équipes que vous voulez, sans aucune limite' },
  { icon: 'mdi:chart-line', title: 'Statistiques avancées', desc: 'Stats détaillées des joueurs et classements complets' },
]

function handleSubscribeClick() {
  // ETAPE 2 du tunnel : add_to_cart
  track('add_to_cart', { product: 'premium_subscription', price_cents: 499 })
  navigateTo('/premium-checkout')
}
</script>

<template>
  <main class="p-4 pt-8 md:pt-16">
    <div class="mx-auto max-w-4xl">
      <div class="mb-10 text-center md:mb-16">
        <h1 class="mb-4 text-4xl font-bold text-text-main md:text-6xl">
          Football Score
          <span class="text-primary-500">Premium</span>
        </h1>
        <p class="text-base text-text-muted md:text-xl">
          Profitez de toutes les fonctionnalités sans limite.
        </p>
      </div>

      <div
        v-if="status.isPremium"
        class="mb-10 rounded-xl border-2 border-primary-400 bg-surface p-8 text-center"
      >
        <Icon
          name="mdi:check-circle"
          size="3rem"
          class="mx-auto mb-4 text-primary-500"
        />
        <h2 class="mb-2 text-2xl font-bold text-text-main md:text-3xl">
          Vous êtes abonné Premium 🎉
        </h2>
        <p class="text-base text-text-muted md:text-lg">
          Votre abonnement est actif jusqu'au <strong>{{ formattedExpiry }}</strong>.
        </p>
      </div>

      <div class="mb-10 grid gap-4 md:grid-cols-2 md:gap-6">
        <div
          v-for="advantage in advantages"
          :key="advantage.title"
          class="flex items-start gap-4 rounded-xl border-2 border-border bg-surface p-6"
        >
          <div class="flex-shrink-0 rounded-lg bg-primary-200 p-3">
            <Icon
              :name="advantage.icon"
              size="2rem"
              class="text-primary-600"
            />
          </div>
          <div>
            <h3 class="mb-1 text-lg font-bold text-text-main md:text-xl">
              {{ advantage.title }}
            </h3>
            <p class="text-sm text-text-muted md:text-base">
              {{ advantage.desc }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="!status.isPremium"
        class="rounded-xl border-2 border-primary-400 bg-surface p-8 text-center md:p-10"
      >
        <p class="mb-2 text-base text-text-muted md:text-lg">
          Sans engagement, résiliable à tout moment.
        </p>
        <div class="mb-6 flex items-baseline justify-center gap-2">
          <span class="text-5xl font-bold text-primary-500 md:text-6xl">4,99 €</span>
          <span class="text-lg text-text-muted md:text-xl">/ mois</span>
        </div>

        <button
          data-umami-event="add_to_cart"
          class="w-full max-w-md rounded-xl bg-primary-500 p-4 text-lg font-semibold text-white transition-all hover:bg-primary-hover hover:scale-105 active:bg-primary-700 md:p-5 md:text-xl"
          @click="handleSubscribeClick"
        >
          Je m'abonne
        </button>

        <p class="mt-6 text-xs text-text-muted">
          Paiement simulé pour la démonstration. Aucun débit ne sera effectué.
        </p>
      </div>
    </div>
  </main>
</template>