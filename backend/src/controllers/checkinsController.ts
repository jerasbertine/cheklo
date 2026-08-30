import type { Response } from "express";
import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { subscriptions, checkins } from "../db/schema.js";
import { submitCheckinSchema } from "../validators/checkins.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export async function submitCheckin(req: AuthenticatedRequest, res: Response) {
  const subscriptionId = Number(req.params.id);

  const subscription = await db.query.subscriptions.findFirst({
    where: and(eq(subscriptions.id, subscriptionId), eq(subscriptions.userId, req.userId!)),
  });

  if (!subscription) {
    res.status(404).json({ error: "Subscription not found"});
    return;
  }

  const parsed = submitCheckinSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  try {
    const [newCheckin] = await db
      .insert(checkins)
      .values({ subscriptionId, month, year, response: parsed.data.response })
      .returning();
    
    res.status(201).json({ checkin: newCheckin});
  } catch (error) {
    const cause = error instanceof Error ? error.cause : undefined;
    const isUniqueViolation =
      cause && typeof cause === "object" && "code" in cause && cause.code === "23505";

    if (isUniqueViolation) {
      res.status(409).json({ error: "Check-in already submitted for this month" });
      return;
    }
    throw error;
  }
}