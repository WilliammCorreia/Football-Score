import { db, schema } from '@nuxthub/db'
import { and, eq } from 'drizzle-orm';
import { favourites } from 'hub:db:schema';

interface AddFavouriteBody {
  teamId: number;
  teamName: string;
  teamLogo: string;
}

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody<AddFavouriteBody>(event);

  if (!body?.teamId || !body?.teamName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'teamId et teamName sont requis',
    });
  }

  // Vérifie si déjà en favori (l'index unique aurait planté, mais on préfère un message clair)
  const existing = await db
    .select()
    .from(schema.favourites)
    .where(
      and(
        eq(favourites.userId, (user as { id: number }).id),
        eq(favourites.teamId, body.teamId),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const [newFav] = await db.insert(schema.favourites).values({
    userId: (user as { id: number }).id,
    teamId: body.teamId,
    teamName: body.teamName,
    teamLogo: body.teamLogo || '',
  }).returning();

  return newFav;
});