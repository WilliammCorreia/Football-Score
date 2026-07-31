import { db, schema } from '@nuxthub/db';
import { and, eq } from 'drizzle-orm';
import { favourites } from 'hub:db:schema';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const teamIdParam = getRouterParam(event, 'teamId');
  const teamId = Number(teamIdParam);

  if (!teamId || Number.isNaN(teamId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'teamId invalide',
    });
  }

  await db
    .delete(schema.favourites)
    .where(
      and(
        eq(favourites.userId, (user as { id: number }).id),
        eq(favourites.teamId, teamId),
      ),
    );

  return { deleted: true, teamId };
});
