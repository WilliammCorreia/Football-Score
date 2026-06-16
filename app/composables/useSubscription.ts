interface SubscriptionStatus {
  isPremium: boolean;
  expiresAt: string | Date | null;
  subscriptionId: number | null;
}

export function useSubscription() {
  const status = useState<SubscriptionStatus>('subscription', () => ({
    isPremium: false,
    expiresAt: null,
    subscriptionId: null,
  }));

  async function refresh() {
    try {
      const data = await $fetch<SubscriptionStatus>('/api/subscription');
      status.value = data;
    }
    catch (error) {
      console.error('Erreur lors de la récupération de l\'abonnement', error);
      status.value = { isPremium: false, expiresAt: null, subscriptionId: null };
    }
  }

  async function subscribe() {
    const data = await $fetch<SubscriptionStatus & { amount: number }>('/api/subscribe', {
      method: 'POST',
    });
    status.value = {
      isPremium: data.isPremium,
      expiresAt: data.expiresAt,
      subscriptionId: data.subscriptionId,
    };
    return data;
  }

  return { status, refresh, subscribe };
}