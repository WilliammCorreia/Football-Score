-- Rollback du système d'achat d'équipes (panier + colonne type sur payments).
-- On supprime les tables dans l'ordre inverse des dépendances :
-- team_purchases a une FK vers payments, donc on la drop en premier.

DROP TABLE IF EXISTS "team_purchases";
--> statement-breakpoint
DROP TABLE IF EXISTS "cart_items";
--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN IF EXISTS "type";