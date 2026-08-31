import { cookies } from "next/headers";

export interface Subscription {
  id: number;
  name: string;
  price: number;
  frequency: "monthly" | "yearly";
  category: string;
  nextBillingDate: string;
  score: {
    category: "high" | "medium" | "low" | "not_rated";
    ratio: number | null;
  };
}

export interface PendingCheckin {
  id: number;
  name: string;
}

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
  totals: {
    monthly: number;
    annual: number;
  };
  pendingCheckins: PendingCheckin[];
}

export async function getSubscriptions(): Promise<SubscriptionsResponse> {
  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/subscriptions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
}
