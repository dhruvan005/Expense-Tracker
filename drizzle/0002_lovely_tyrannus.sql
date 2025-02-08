DROP INDEX "name_idx";--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "method" text NOT NULL;--> statement-breakpoint
CREATE INDEX "userId_idx" ON "expenses" USING btree ("userId");