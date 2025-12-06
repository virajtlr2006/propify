import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const PropertyTable = pgTable("property", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar().notNull(),
  pname: varchar().notNull(),
  paddress: varchar().notNull(),
  ptype: varchar().notNull().default("Bungalow"),
  pdesc: varchar(),
  image: varchar().notNull(),
  city: varchar().notNull(),
  sqft: integer().default(500),
  bhk: integer().notNull(),
  price: integer().notNull().default(0),
})

export type property = typeof PropertyTable.$inferSelect;
export type newProperty = typeof PropertyTable.$inferInsert;