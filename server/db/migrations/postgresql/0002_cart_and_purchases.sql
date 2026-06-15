-- Ajout de la colonne 'type' à payments (existante = subscription par défaut)
ALTER TABLE "payments" ADD COLUMN "type" text DEFAULT 'subscription' NOT NULL;
--> statement-breakpoint

-- Création de la table cart_items (panier)
CREATE TABLE "cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"teamId" integer NOT NULL,
	"teamName" text NOT NULL,
	"teamLogo" text NOT NULL,
	"price" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

-- Création de la table team_purchases (historique d'achats d'équipes)
CREATE TABLE "team_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"paymentId" integer,
	"teamId" integer NOT NULL,
	"teamName" text NOT NULL,
	"teamLogo" text NOT NULL,
	"pricePaid" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

-- Foreign keys
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "team_purchases" ADD CONSTRAINT "team_purchases_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "team_purchases" ADD CONSTRAINT "team_purchases_paymentId_payments_id_fk" FOREIGN KEY ("paymentId") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint

-- Index unique : un user ne peut avoir une équipe qu'une fois dans son panier
CREATE UNIQUE INDEX "cart_items_user_team_unique" ON "cart_items" ("userId","teamId");
--> statement-breakpoint
-- Index unique : un user ne peut acheter une équipe qu'une seule fois
CREATE UNIQUE INDEX "team_purchases_user_team_unique" ON "team_purchases" ("userId","teamId");