/**
 * Composable de tracking pour le tunnel d'achat.
 *
 * Aujourd'hui : il logge juste dans la console (stub).
 * Quand Umami sera installé par le collègue, il suffira de remplacer le corps
 * de track() par un appel à window.umami.track(name, data).
 *
 * Events suivis (tunnel d'achat demandé par le sujet) :
 *   - view_product       : utilisateur consulte la fiche Premium
 *   - add_to_cart        : utilisateur clique "Je m'abonne"
 *   - checkout_start     : utilisateur arrive sur la page récap/paiement
 *   - checkout_success   : paiement réussi, Premium activé
 */
export function useTracking() {
  function track(eventName: string, data?: Record<string, unknown>) {
    if (import.meta.client) {
      console.log('[Tracking]', eventName, data || '');

      // Quand Umami sera prêt, décommenter :
      // const umami = (window as any).umami;
      // if (umami && typeof umami.track === 'function') {
      //   umami.track(eventName, data);
      // }
    }
  }

  return { track };
}