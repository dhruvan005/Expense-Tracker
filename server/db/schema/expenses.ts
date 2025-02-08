import { serial, text, pgTable, numeric, index, timestamp } from "drizzle-orm/pg-core";

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  method: text('method').notNull(), // You were missing this field
  createdAt : timestamp('created_at').defaultNow()
}, (expenses) => ({
  userIdIndex: index('userId_idx').on(expenses.userId), // Fixed index name to be more descriptive
}));