import { z } from "zod";

export const createSubscriptionSchema = z.object ({
  name: z.string().min(1),
  price: z.number().positive(),
  frequency: z.enum(["monthly", "yearly"]),
  category: z.string().min(1),
  nextBillingDate: z.iso.date(),
});

export const updateSubscriptionSchema = createSubscriptionSchema.partial();

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;