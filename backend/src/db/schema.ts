import { pgTable, serial, text, timestamp, integer, numeric, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const subscriptions = pgTable("subscriptions" , {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2, mode:"number" }).notNull(),
  frequency: text("frequency", { enum: ["monthly", "yearly"] }).notNull(),
  category: text("category").notNull(),
  nextBillingDate: date("next_billing_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
