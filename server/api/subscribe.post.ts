import { db, schema } from '@nuxthub/db';
import { getUserSubscription } from '~~/server/utils/subscription';

const PREMIUM_PRICE_CENTS = 499;
const PREMIUM_DURATION_DAYS = 30;

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session.user as { id: number } | undefined;

  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Vous devez être connecté pour vous abonner',
    });
  }

  const current = await getUserSubscription(user.id);
  if (current.isPremium) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Vous êtes déjà abonné Premium',
    });
  }

  const paymentSucceeded = true;

  if (!paymentSucceeded) {
    await db.insert(schema.payments).values({
      userId: user.id,
      subscriptionId: null,
      amount: PREMIUM_PRICE_CENTS,
      status: 'failed',
    });

    throw createError({
      statusCode: 402,
      statusMessage: 'Le paiement a échoué',
    });
  }

  const startedAt = new Date();
  const expiresAt = new Date(startedAt.getTime() + PREMIUM_DURATION_DAYS * 24 * 60 * 60 * 1000);

  const [newSub] = await db.insert(schema.subscriptions).values({
    userId: user.id,
    status: 'active',
    startedAt,
    expiresAt,
  }).returning();

  await db.insert(schema.payments).values({
    userId: user.id,
    subscriptionId: newSub!.id,
    amount: PREMIUM_PRICE_CENTS,
    status: 'succeeded',
  });

  return {
    isPremium: true,
    subscriptionId: newSub!.id,
    expiresAt: newSub!.expiresAt,
    amount: PREMIUM_PRICE_CENTS,
  };
});
