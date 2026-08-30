import { pgTable, serial, text, timestamp, integer, numeric, date, unique } from "drizzle-orm/pg-core";

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

export const checkins = pgTable(
  "checkins",
  {
    id: serial("id").primaryKey(),
    subscriptionId: integer("subscription_id")
      .notNull()
      .references(() => subscriptions.id, { onDelete: "cascade" }),
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    response: text("response", { enum: ["yes", "no", "mixed"] }).notNull(),
    answeredAt: timestamp("answered_at").notNull().defaultNow(),  
  },
  (table) => [unique().on(table.subscriptionId, table.month, table.year)]
)
