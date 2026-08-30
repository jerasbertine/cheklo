interface SubscriptionForTotals {
  price: number;
  frequency: "monthly" | "yearly";
}

export function calculateMonthlyTotal(subscriptions: SubscriptionForTotals[]): number {
  const total = subscriptions.reduce((total, sub) => {
    return total + (sub.frequency === "monthly" ? sub.price : sub.price / 12);
  }, 0);
  return Math.round(total * 100) / 100;
}

export function calculateAnnualTotal(subscriptions: SubscriptionForTotals[]): number {
  return Math.round(calculateMonthlyTotal(subscriptions) * 12 * 100) / 100;
}
