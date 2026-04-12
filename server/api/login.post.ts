import { db, schema } from '@nuxthub/db'

export default defineEventHandler(async (event): Promise<string> => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    console.log(body);
    let users = await db.select().from(schema.users);
    if(users.find(value => value.email === body.email && value.password === body.password)){
    await setUserSession(event, {
      user: {
        name: 'John Doe',
      },
    })
    return "logged";
    }

    throw createError({
        statusCode: 500,
        statusMessage: 'Impossible de se connecter',
    });
});

