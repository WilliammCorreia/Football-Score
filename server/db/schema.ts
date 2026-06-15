import { pgTable, text, serial, timestamp, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// =========================
// USERS
// =========================
export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatar: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})

// =========================
// SUBSCRIPTIONS
// status: 'active' | 'cancelled' | 'expired'
// =========================
export const subscriptions = pgTable('subscriptions', {
  id: serial().primaryKey(),
  userId: integer().notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text().notNull().default('active'),
  startedAt: timestamp().notNull().defaultNow(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})

// =========================
// PAYMENTS (paiement simulé pour abonnement Premium)
// amount: en centimes (ex: 499 = 4.99€)
// status: 'succeeded' | 'failed'
// =========================
export const payments = pgTable('payments', {
  id: serial().primaryKey(),
  userId: integer().notNull().references(() => users.id, { onDelete: 'cascade' }),
  subscriptionId: integer().references(() => subscriptions.id, { onDelete: 'set null' }),
  amount: integer().notNull(),
  status: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})

// =========================
// FAVOURITES (équipes favorites de l'utilisateur)
// =========================
export const favourites = pgTable('favourites', {
  id: serial().primaryKey(),
  userId: integer().notNull().references(() => users.id, { onDelete: 'cascade' }),
  teamId: integer().notNull(),
  teamName: text().notNull(),
  teamLogo: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})

// =========================
// NOTIFICATIONS (alertes avant match - Premium)
// sentAt: null = pas encore envoyée
// =========================
export const notifications = pgTable('notifications', {
  id: serial().primaryKey(),
  userId: integer().notNull().references(() => users.id, { onDelete: 'cascade' }),
  fixtureId: integer().notNull(),
  matchDate: timestamp().notNull(),
  sentAt: timestamp(),
  createdAt: timestamp().notNull().defaultNow(),
})

// =========================
// RELATIONS
// =========================
export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  payments: many(payments),
  favourites: many(favourites),
  notifications: many(notifications),
}))

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
  payments: many(payments),
}))

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, { fields: [payments.userId], references: [users.id] }),
  subscription: one(subscriptions, { fields: [payments.subscriptionId], references: [subscriptions.id] }),
}))

export const favouritesRelations = relations(favourites, ({ one }) => ({
  user: one(users, { fields: [favourites.userId], references: [users.id] }),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}))