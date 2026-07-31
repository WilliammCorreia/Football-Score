import { getUserSubscription, type SubscriptionStatus } from '~~/server/utils/subscription';

export default defineEventHandler(async (event): Promise<SubscriptionStatus> => {
  const session = await getUserSession(event);
  const user = session.user as { id: number } | undefined;

  if (!user?.id) {
    return { isPremium: false, expiresAt: null, subscriptionId: null };
  }

  return await getUserSubscription(user.id);
});
