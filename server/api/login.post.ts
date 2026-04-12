import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm';
import { users } from 'hub:db:schema';

export default defineEventHandler(async (event): Promise<string> => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    let toCheck = await db.selectDistinct().from(schema.users).where(eq(users.email, body.email));
    let hash = await verifyPassword(toCheck[0]!.password, body.password);
    if(toCheck.find(value => value.email === body.email && hash)){
        await setUserSession(event, {
        user: toCheck[0]
        })
        return "logged";
    }

    throw createError({
        statusCode: 500,
        statusMessage: 'Impossible de se connecter',
    });
});