interface SubscriptionForCheckin {
  id: number;
}

interface CheckinRecord {
  subscriptionId: number;
  month: number;
  year: number;
}

export function getSubscriptionsMissingCheckin<T extends SubscriptionForCheckin> (
  subscriptions: T[],
  checkins: CheckinRecord[],
  month: number,
  year: number
): T[] {
  const answeredIds = new Set(
    checkins
      .filter((c) => c.month === month && c.year === year)
      .map((c) => c.subscriptionId)
  );

  return subscriptions.filter((sub) => !answeredIds.has(sub.id));
}