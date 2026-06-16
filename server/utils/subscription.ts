import { db, schema } from '@nuxthub/db'
import { and, eq, gt, desc } from 'drizzle-orm';
import { subscriptions } from 'hub:db:schema';

export interface SubscriptionStatus {
  isPremium: boolean;
  expiresAt: Date | null;
  subscriptionId: number | null;
}

export async function getUserSubscription(userId: number): Promise<SubscriptionStatus> {
  const now = new Date();

  const active = await db
    .select()
    .from(schema.subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, 'active'),
        gt(subscriptions.expiresAt, now),
      ),
    )
    .orderBy(desc(subscriptions.expiresAt))
    .limit(1);

  if (active.length === 0) {
    return { isPremium: false, expiresAt: null, subscriptionId: null };
  }

  const sub = active[0]!;
  return {
    isPremium: true,
    expiresAt: sub.expiresAt,
    subscriptionId: sub.id,
  };
}
