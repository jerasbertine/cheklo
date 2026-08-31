import type { Response } from "express";
import { eq, and, inArray} from "drizzle-orm";
import { db } from "../db/index.js";
import { subscriptions, checkins } from "../db/schema.js";
import { createSubscriptionSchema, updateSubscriptionSchema } from "../validators/subscriptions.js";
import { calculateMonthlyTotal, calculateAnnualTotal } from "../utils/calculations.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import { calculateUsefulnessScore } from "../utils/score.js";
import { getSubscriptionsMissingCheckin } from "../utils/checkins.js";

export async function list(req: AuthenticatedRequest, res: Response) {
  const userSubscriptions = await db.query.subscriptions.findMany({
    where: eq(subscriptions.userId, req.userId!)
  });

  const subscriptionIds = userSubscriptions.map((sub) => sub.id);

  const allCheckins = subscriptionIds.length
    ? await db.query.checkins.findMany({
      where: inArray(checkins.subscriptionId, subscriptionIds),
      })
    : [];

  const subscriptionWithScore = userSubscriptions.map((sub) => {
    const subCheckins = allCheckins.filter((c) => c.subscriptionId === sub.id);
    return { ...sub, score: calculateUsefulnessScore(subCheckins)};
  });

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const pendingCheckins = getSubscriptionsMissingCheckin(
    userSubscriptions,
    allCheckins,
    currentMonth,
    currentYear
  );

  res.json({
    subscriptions: subscriptionWithScore,
    totals: {
      monthly: calculateMonthlyTotal(userSubscriptions),
      annual: calculateAnnualTotal(userSubscriptions),
    },
    pendingCheckins: pendingCheckins.map((sub) => ({ id: sub.id, name: sub.name})),
  });
}

export async function create(req: AuthenticatedRequest, res: Response) {
  const parsed = createSubscriptionSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues});
    return;
  }

  const [newSubscription] = await db
    .insert(subscriptions)
    .values({ ...parsed.data, userId: req.userId! })
    .returning();
  
  res.status(201).json({ subscription: newSubscription });
}

export async function update(req: AuthenticatedRequest, res:Response) {
  const id = Number(req.params.id);

  const parsed = updateSubscriptionSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues});
    return;
  }

  const [updatedSubscription] = await db
    .update(subscriptions)
    .set(parsed.data)
    .where(and(eq(subscriptions.id, id), eq(subscriptions.userId, req.userId!)))
    .returning();
  
  if (!updatedSubscription) {
    res.status(404).json({ error: "Subscription not found" });
    return;
  }

  res.json({ subscription: updatedSubscription});
}

export async function remove(req: AuthenticatedRequest, res:Response) {
  const id = Number(req.params.id);

  const [deleteSubscription] = await db
    .delete(subscriptions)
    .where(and(eq(subscriptions.id, id), eq(subscriptions.userId, req.userId!)))
    .returning();

  if (!deleteSubscription) {
    res.status(404).json({ error: "Subscription not found" });
    return;
  }

  res.status(204).send();
}