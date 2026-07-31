# Football-Score — Observabilité & Tunnel d'Achat

Application de football en Nuxt 4 (API [api-football.com](https://api-football.com)) instrumentée avec une stack d'observabilité **100 % open source et auto-hébergée** :

- **[GlitchTip](https://glitchtip.com)** — centralisation des erreurs applicatives et suivi de performance (compatible SDK Sentry) ;
- **[Umami](https://umami.is)** — analytique produit sans cookies + tunnel de conversion (abonnement Premium).

## Architecture

```
                        ┌─────────────┐
        :80  ──────────▶│    nginx    │──────▶  web (Nuxt 4, :3000)
                        └─────────────┘             │
                                                    ▼
                                             app-db (PostgreSQL 16)
                                             (+ app-migrate, one-shot)

        :8000 ─────────▶ glitchtip ──────▶ glitchtip-db (PostgreSQL 15)
                             │       └───▶ glitchtip-redis (Redis 7)
                             └─ glitchtip-worker (Celery) / glitchtip-migrate

        :3001 ─────────▶ umami ──────────▶ umami-db (PostgreSQL 15)
```

Chaque brique a sa **base de données dédiée** et un **volume persistant** (`app_db_data`, `glitchtip_pg_data`, `glitchtip_redis_data`, `umami_pg_data`).

## Lancer toute la stack en une commande

```bash
git clone https://github.com/WilliammCorreia/Football-Score
cd Football-Score
cp .env.example .env       # puis renseigner au minimum API_FOOTBALL_KEY
docker compose up -d --build
```

| Service | URL |
|---|---|
| Application web | http://localhost |
| GlitchTip | http://localhost:8000 |
| Umami | http://localhost:3001 |

### Configuration après le premier lancement

**GlitchTip** (http://localhost:8000) :
1. Créer un compte (l'inscription est ouverte via `GLITCHTIP_ENABLE_USER_REGISTRATION=True`).
2. Créer une organisation, puis un projet de type *Vue*.
3. Copier le **DSN** du projet dans `.env` → `NUXT_PUBLIC_GLITCHTIP_DSN`.

**Umami** (http://localhost:3001) :
1. Se connecter avec le compte par défaut `admin` / `umami` (à changer ensuite).
2. *Settings → Websites → Add website* (nom libre, domaine `localhost`).
3. Copier le **Website ID** dans `.env` → `NUXT_PUBLIC_UMAMI_WEBSITE_ID`.

Puis relancer la stack pour prendre en compte le `.env` (recrée uniquement les services impactés et démarre ceux qui manquent) :

```bash
docker compose up -d
```

## Télémétrie — GlitchTip (Partie 2 du sujet)

- **Capture automatique des exceptions JS non gérées** : SDK `@sentry/vue` initialisé dans [app/plugins/glitchtip.client.ts](app/plugins/glitchtip.client.ts). Les événements passent par un tunnel same-origin ([server/api/glitchtip-tunnel.post.ts](server/api/glitchtip-tunnel.post.ts)) pour ne pas être bloqués par les protections navigateur.
- **Simulation de panne** : sur la page de paiement `/premium-checkout`, le bouton « Confirmer et payer » échoue volontairement **1 fois sur 3** avec un `TypeError` (appel d'une méthode sur `null`), capturé et remonté à GlitchTip avec stacktrace, OS et navigateur.
- **Suivi de performance** : `measureLoadTime()` ([app/composables/useGlitchTip.ts](app/composables/useGlitchTip.ts)) envoie le temps de chargement des composants clés (dashboard, page de validation de commande) sous forme de transactions visibles dans l'onglet *Performance* de GlitchTip.

## Analytique — Umami (Partie 3 du sujet)

Métriques standards gérées nativement : visites, pages vues, durée de session, taux de rebond, sources de trafic (`utm_source`, `ref`, referrer).

### Plan de marquage du tunnel d'achat

Le « produit » du site est l'**abonnement Premium (4,99 €/mois)**. Les 4 étapes du tunnel :

| # | Événement | Déclencheur | Propriétés |
|---|---|---|---|
| 1 | `view_product` | Arrivée sur la fiche produit `/premium` | `product`, `price_cents` |
| 2 | `add_to_cart` | Clic sur « Je m'abonne » | `product`, `price_cents` |
| 3 | `checkout_start` | Arrivée sur le récapitulatif `/premium-checkout` | `product`, `price_cents` |
| 4 | `checkout_success` | Paiement accepté | `product`, `price_cents`, **`amount`** (panier moyen), `subscription_id` |

Événements complémentaires (hors tunnel) : `checkout_failed` (paiement refusé par la passerelle simulée), `view_team` et `add_favourite` (engagement).

Tous les événements passent par le composable unique [app/composables/useTracking.ts](app/composables/useTracking.ts).

### Simuler des parcours utilisateurs

Pour peupler le dashboard Umami (tunnel complet, rebonds, sources utm) sans cliquer à la main :

```bash
node scripts/simulate-traffic.mjs --visitors 40
```

Le script lit `NUXT_PUBLIC_UMAMI_HOST` et `NUXT_PUBLIC_UMAMI_WEBSITE_ID` dans `.env` et simule des visiteurs uniques avec un taux d'abandon réaliste à chaque étape.

## RGPD

- Umami est **sans cookie** et n'enregistre aucune donnée personnelle (IP hashées côté serveur).
- Le SDK GlitchTip supprime `email` et `ip_address` des événements avant envoi (`beforeSend`).
- Aucune PII (email, mot de passe, nom) n'est passée dans les événements de tracking ni écrite dans les logs.

## Rapport d'observabilité

Voir [RAPPORT-OBSERVABILITE.md](RAPPORT-OBSERVABILITE.md) : captures du tunnel dans Umami, analyse des taux de rebond/conversion et stacktrace GlitchTip du paiement défaillant.

## Développement

- Extensions VS Code recommandées : **Vue (Official)**, **Tailwind CSS IntelliSense**, **ESLint** (`npm install` requis à la racine pour l'extension).
- Lint : `npm run lint` (ou `npm run lint:fix`).
