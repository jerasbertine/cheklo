CREATE TABLE "checkins" (
	"id" serial PRIMARY KEY NOT NULL,
	"subscription_id" integer NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"response" text NOT NULL,
	"answered_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "checkins_subscription_id_month_year_unique" UNIQUE("subscription_id","month","year")
);
--> statement-breakpoint
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;