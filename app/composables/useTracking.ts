/**
 * Composable de tracking : point d'entrée unique vers Umami.
 *
 * Plan de marquage du tunnel d'achat (abonnement Premium) :
 *   - view_product     : l'utilisateur consulte la fiche Premium (/premium)
 *   - add_to_cart      : l'utilisateur clique sur « Je m'abonne »
 *   - checkout_start   : l'utilisateur arrive sur le récapitulatif (/premium-checkout)
 *   - checkout_success : paiement réussi (propriété `amount` = montant du panier)
 *
 * Événements hors tunnel (engagement) :
 *   - view_team        : consultation d'une fiche équipe
 *   - add_favourite    : ajout d'une équipe aux favoris
 *   - checkout_failed  : paiement refusé par la passerelle simulée
 *
 * RGPD : ne jamais passer de PII (email, nom, IP…) dans `data`.
 */
export function useTracking() {
  // Le script Umami est chargé en `defer` : au premier rendu, window.umami
  // peut ne pas encore exister. On retente quelques secondes avant d'abandonner
  // pour ne pas perdre les événements tirés au montage de la page.
  function send(eventName: string, data: Record<string, unknown> | undefined, retriesLeft: number) {
    if (window.umami) {
      window.umami.track(eventName, data);
      return;
    }
    if (retriesLeft > 0) {
      setTimeout(() => send(eventName, data, retriesLeft - 1), 300);
    }
  }

  function track(eventName: string, data?: Record<string, unknown>) {
    if (!import.meta.client) return;

    send(eventName, data, 10);

    if (import.meta.dev) {
      console.log('[Tracking]', eventName, data ?? '');
    }
  }

  return { track };
}
