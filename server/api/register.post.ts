import { db, schema } from '@nuxthub/db'

export default defineEventHandler(async (event): Promise<Object> => {
  const config = useRuntimeConfig();
const { name, email } = await readBody(event);
  console.log(name, email);
    return await db
    .insert(schema.users)
    .values({
      name: name,
      email: email,
      avatar: "avatar",
      password: "password",     
      createdAt: new Date()
    })
    .returning()

 
  
    console.log('Bad pwd');
    throw createError({
        statusCode: 500,
        statusMessage: 'Impossible de récupérer les matchs',
});
});

