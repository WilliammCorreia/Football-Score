import { db, schema } from '@nuxthub/db'
import { eq, desc } from 'drizzle-orm';
import { favourites } from 'hub:db:schema';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session.user as { id: number } | undefined;

  if (!user?.id) {
    return [];
  }

  const rows = await db
    .select()
    .from(schema.favourites)
    .where(eq(favourites.userId, user.id))
    .orderBy(desc(favourites.createdAt));

  return rows;
});