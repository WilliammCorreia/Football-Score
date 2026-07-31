#!/usr/bin/env node
/**
 * Simulation de parcours utilisateurs pour peupler le dashboard Umami.
 *
 * Envoie des visites réalistes (pageviews + événements du tunnel d'achat)
 * directement à l'API de collecte d'Umami (/api/send), avec :
 *   - des visiteurs uniques (User-Agent + IP variés) ;
 *   - un taux d'abandon à chaque étape du tunnel ;
 *   - des rebonds sur la page d'accueil ;
 *   - des sources de trafic (utm_source / ref) pour l'analyse d'acquisition.
 *
 * Usage :
 *   node scripts/simulate-traffic.mjs [--visitors 40] [--host http://localhost:3001] [--website <uuid>]
 *
 * Sans argument, --host et --website sont lus dans .env
 * (NUXT_PUBLIC_UMAMI_HOST / NUXT_PUBLIC_UMAMI_WEBSITE_ID).
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// ---------- Configuration ----------

function readDotEnv() {
  try {
    const content = readFileSync(resolve(import.meta.dirname, '..', '.env'), 'utf-8');
    return Object.fromEntries(
      content
        .split('\n')
        .filter(line => line.includes('=') && !line.trim().startsWith('#'))
        .map((line) => {
          const idx = line.indexOf('=');
          return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
        }),
    );
  }
  catch {
    return {};
  }
}

function readArg(name, fallback) {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 && process.argv[idx + 1] ? process.argv[idx + 1] : fallback;
}

const dotEnv = readDotEnv();
const HOST = readArg('host', dotEnv.NUXT_PUBLIC_UMAMI_HOST || 'http://localhost:3001');
const WEBSITE_ID = readArg('website', dotEnv.NUXT_PUBLIC_UMAMI_WEBSITE_ID || '');
const VISITOR_COUNT = Number(readArg('visitors', '40'));

if (!WEBSITE_ID) {
  console.error('Website ID manquant : renseignez NUXT_PUBLIC_UMAMI_WEBSITE_ID dans .env ou passez --website <uuid>');
  process.exit(1);
}

// User-Agents de vrais navigateurs (Umami ignore les UA de bots)
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
];

const SCREENS = ['1920x1080', '1440x900', '2560x1440', '390x844', '412x915'];
const LANGUAGES = ['fr-FR', 'fr-FR', 'fr-FR', 'en-US', 'pt-PT'];

// Origines de trafic : [landing page, referrer]
const TRAFFIC_SOURCES = [
  ['/', ''], // accès direct
  ['/', ''],
  ['/', 'https://www.google.com/'],
  ['/?utm_source=newsletter', ''],
  ['/?utm_source=instagram_ads', ''],
  ['/?ref=partner-blog', ''],
];

// ---------- Helpers ----------

const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const chance = p => Math.random() < p;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const thinkTime = () => sleep(300 + Math.random() * 600);

function randomIp() {
  // IP publiques factices pour que chaque visiteur ait une session unique
  return `${2 + Math.floor(Math.random() * 220)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${1 + Math.floor(Math.random() * 254)}`;
}

class Visitor {
  constructor() {
    this.userAgent = rand(USER_AGENTS);
    this.ip = randomIp();
    this.screen = rand(SCREENS);
    this.language = rand(LANGUAGES);
    this.cacheToken = null;
  }

  async send(payload) {
    const response = await fetch(`${HOST}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': this.userAgent,
        'X-Forwarded-For': this.ip,
        ...(this.cacheToken ? { 'x-umami-cache': this.cacheToken } : {}),
      },
      body: JSON.stringify({
        type: 'event',
        payload: {
          website: WEBSITE_ID,
          hostname: 'localhost',
          screen: this.screen,
          language: this.language,
          ...payload,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`Umami a répondu ${response.status} : ${await response.text()}`);
    }
    const body = await response.text();
    // /api/send renvoie un token de session à réutiliser pour les hits suivants
    try {
      this.cacheToken = JSON.parse(body).cache ?? this.cacheToken;
    }
    catch {
      this.cacheToken = body || this.cacheToken;
    }
  }

  pageview(url, { title = 'Football Score', referrer = '' } = {}) {
    return this.send({ url, title, referrer });
  }

  event(name, url, data) {
    return this.send({ url, title: 'Football Score', name, data });
  }
}

// ---------- Parcours d'un visiteur ----------

async function runJourney(index) {
  const visitor = new Visitor();
  const [landing, referrer] = rand(TRAFFIC_SOURCES);
  const steps = [];

  await visitor.pageview(landing, { referrer });
  steps.push('accueil');

  // ~30 % de rebond : le visiteur repart après la page d'accueil
  if (chance(0.3)) {
    console.log(`  visiteur ${index} : ${steps.join(' → ')} (rebond)`);
    return;
  }

  await thinkTime();

  // Navigation d'engagement (hors tunnel)
  if (chance(0.5)) {
    await visitor.pageview('/search', { title: 'Recherche — Football Score' });
    steps.push('recherche');
    await thinkTime();
    if (chance(0.6)) {
      await visitor.pageview('/team?id=211', { title: 'Équipe — Football Score' });
      await visitor.event('view_team', '/team?id=211', { team_id: '211', team_name: 'Benfica' });
      steps.push('équipe');
      await thinkTime();
      if (chance(0.5)) {
        await visitor.event('add_favourite', '/team?id=211', { team_id: '211', team_name: 'Benfica' });
        steps.push('favori');
      }
    }
  }

  // --- Tunnel d'achat Premium ---

  // Étape 1 : view_product (~55 % des non-rebonds)
  if (!chance(0.55)) {
    // Un non-rebond doit voir au moins 2 pages, sinon Umami le compte en rebond
    if (steps.length === 1) {
      await visitor.pageview('/search', { title: 'Recherche — Football Score' });
      steps.push('recherche');
    }
    console.log(`  visiteur ${index} : ${steps.join(' → ')}`);
    return;
  }
  await visitor.pageview('/premium', { title: 'Premium — Football Score' });
  await visitor.event('view_product', '/premium', { product: 'premium_subscription', price_cents: 499 });
  steps.push('view_product');
  await thinkTime();

  // Étape 2 : add_to_cart (~60 % de l'étape précédente)
  if (!chance(0.6)) {
    console.log(`  visiteur ${index} : ${steps.join(' → ')} (abandon fiche produit)`);
    return;
  }
  await visitor.event('add_to_cart', '/premium', { product: 'premium_subscription', price_cents: 499 });
  steps.push('add_to_cart');
  await thinkTime();

  // Étape 3 : checkout_start (~80 % de l'étape précédente)
  if (!chance(0.8)) {
    console.log(`  visiteur ${index} : ${steps.join(' → ')} (abandon panier)`);
    return;
  }
  await visitor.pageview('/premium-checkout', { title: 'Récapitulatif — Football Score' });
  await visitor.event('checkout_start', '/premium-checkout', { product: 'premium_subscription', price_cents: 499 });
  steps.push('checkout_start');
  await thinkTime();

  // Étape 4 : checkout_success (~65 %) — sinon échec de paiement simulé
  if (chance(0.65)) {
    await visitor.event('checkout_success', '/premium-checkout', {
      product: 'premium_subscription',
      price_cents: 499,
      amount: 499,
    });
    steps.push('checkout_success');
    console.log(`  visiteur ${index} : ${steps.join(' → ')} ✔ conversion`);
  }
  else {
    await visitor.event('checkout_failed', '/premium-checkout', {
      product: 'premium_subscription',
      reason: 'payment_gateway_error',
    });
    steps.push('checkout_failed');
    console.log(`  visiteur ${index} : ${steps.join(' → ')} ✘ paiement refusé`);
  }
}

// ---------- Main ----------

console.log(`Simulation de ${VISITOR_COUNT} visiteurs vers ${HOST} (site ${WEBSITE_ID})\n`);

for (let i = 1; i <= VISITOR_COUNT; i++) {
  try {
    await runJourney(i);
  }
  catch (error) {
    console.error(`  visiteur ${i} : échec d'envoi —`, error.message);
  }
}

console.log('\nTerminé. Ouvrez le dashboard Umami pour voir le trafic et le tunnel.');
