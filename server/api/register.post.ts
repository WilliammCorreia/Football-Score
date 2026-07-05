import { db, schema } from '@nuxthub/db';
import { users } from 'hub:db:schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { name, email, password, avatar } = await readBody(event);

  // Validation minimale côté serveur : on ne fait jamais confiance au client.
  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nom, email et mot de passe sont requis',
    });
  }

  // Email déjà pris → 409 explicite, plutôt qu'une 500 opaque déclenchée par la
  // contrainte d'unicité de la base.
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Un compte existe déjà avec cet email',
    });
  }

  const [created] = await db
    .insert(schema.users)
    .values({
      name,
      email,
      // L'avatar est optionnel dans le formulaire : fallback sur une chaîne vide
      // (la colonne est NOT NULL, l'UI gère l'absence d'avatar).
      avatar: avatar ?? '',
      password: await hashPassword(password),
      createdAt: new Date(),
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      avatar: users.avatar,
    });

  // On ne renvoie jamais le hash du mot de passe au client.
  return created;
});
