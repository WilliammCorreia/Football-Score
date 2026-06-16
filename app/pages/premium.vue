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
  { icon: 'lucide:bell-ring', title: 'Alertes match', desc: 'Recevez un rappel avant chaque match de vos équipes favorites.' },
  { icon: 'lucide:trophy', title: 'Toutes les ligues', desc: 'Accès illimité à toutes les compétitions disponibles.' },
  { icon: 'lucide:star', title: 'Favoris illimités', desc: 'Suivez autant d\'équipes que vous voulez, sans limite.' },
  { icon: 'lucide:bar-chart-3', title: 'Statistiques avancées', desc: 'Stats détaillées des joueurs et classements complets.' },
]

function handleSubscribeClick() {
  track('add_to_cart', { product: 'premium_subscription', price_cents: 499 })
  navigateTo('/premium-checkout')
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-16">
    <!-- Header -->
    <header class="mb-12 text-center md:mb-16">
      <p class="eyebrow mb-3">Football Score Premium</p>
      <h1 class="display text-6xl text-text-main md:text-8xl">
        Le foot,<br>sans <span class="text-primary-600">limites</span>.
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-base text-text-muted md:text-lg">
        Toutes les fonctionnalités, toutes les ligues, autant d'équipes favorites que vous voulez.
      </p>
    </header>

    <!-- Status Premium si déjà abonné -->
    <div
      v-if="status.isPremium"
      class="mb-12 overflow-hidden rounded-2xl border border-accent-300 bg-gradient-to-br from-accent-50 to-accent-100 p-8 md:p-10"
    >
      <div class="flex flex-col items-center gap-3 text-center md:flex-row md:gap-6 md:text-left">
        <div class="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-md">
          <Icon name="lucide:crown" size="1.75rem" />
        </div>
        <div class="flex-1">
          <h2 class="display text-3xl text-text-main md:text-4xl">
            Vous êtes Premium
          </h2>
          <p class="mt-1 text-text-muted">
            Votre abonnement est actif jusqu'au
            <strong class="font-mono tabular text-text-main">{{ formattedExpiry }}</strong>.
          </p>
        </div>
      </div>
    </div>

    <!-- Grille d'avantages -->
    <div class="mb-12 grid gap-4 md:grid-cols-2 md:gap-6">
      <div
        v-for="advantage in advantages"
        :key="advantage.title"
        class="card flex items-start gap-4 p-6 transition-colors hover:border-primary-300"
      >
        <div class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          <Icon :name="advantage.icon" size="1.5rem" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-text-main">
            {{ advantage.title }}
          </h3>
          <p class="mt-1 text-sm text-text-muted">
            {{ advantage.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pricing card -->
    <div
      v-if="!status.isPremium"
      class="overflow-hidden rounded-2xl border-2 border-primary-500 bg-surface shadow-lg"
    >
      <div class="grid md:grid-cols-2">
        <!-- Left : prix + features -->
        <div class="border-b border-border p-8 md:border-b-0 md:border-r md:p-10">
          <p class="eyebrow mb-4">Sans engagement</p>
          <div class="mb-4 flex items-baseline gap-1.5">
            <span class="display font-mono tabular text-7xl text-text-main md:text-8xl">
              4,99 €
            </span>
            <span class="text-lg text-text-muted">/ mois</span>
          </div>
          <ul class="space-y-2.5 text-sm text-text-muted">
            <li class="flex items-center gap-2">
              <Icon name="lucide:check" size="1rem" class="text-primary-600" />
              Résiliable à tout moment
            </li>
            <li class="flex items-center gap-2">
              <Icon name="lucide:check" size="1rem" class="text-primary-600" />
              Accès immédiat après paiement
            </li>
            <li class="flex items-center gap-2">
              <Icon name="lucide:check" size="1rem" class="text-primary-600" />
              Toutes les fonctionnalités incluses
            </li>
          </ul>
        </div>

        <!-- Right : CTA -->
        <div class="flex flex-col justify-center bg-surface-muted p-8 md:p-10">
          <button
            data-umami-event="add_to_cart"
            class="w-full rounded-xl bg-primary-500 px-6 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="handleSubscribeClick"
          >
            Je m'abonne
          </button>
          <p class="mt-4 text-center text-xs text-text-soft">
            Paiement simulé pour la démonstration. Aucun débit ne sera effectué.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>