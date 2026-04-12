import { db, schema } from '@nuxthub/db'

export default defineEventHandler(async (event): Promise<Object> => {
  const config = useRuntimeConfig();
const { name, email, password, avatar } = await readBody(event);
  console.log(name, email);
    return await db
    .insert(schema.users)
    .values({
      name: name,
      email: email,
      avatar: avatar,
      password: await hashPassword(password),     
      createdAt: new Date()
    })
    .returning()
});

