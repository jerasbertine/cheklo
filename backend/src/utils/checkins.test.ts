import { describe, it, expect } from "vitest";
import { getSubscriptionsMissingCheckin } from "./checkins.js";

describe("getSubscriptionsMissingCheckin", () => {
  it("returns all subscriptions when no check-in exists yet", () => {
    const subscriptions = [{ id: 1 }, { id: 2 }];
    const result = getSubscriptionsMissingCheckin(subscriptions, [], 9, 2026);
    expect(result).toEqual(subscriptions);
  });

  it("excludes subscriptions that already have a check-in for this month", () => {
    const subscriptions = [{ id: 1 }, { id: 2 }];
    const checkins = [{ subscriptionId: 1, month: 9, year: 2026 }];
    const result = getSubscriptionsMissingCheckin(subscriptions, checkins, 9, 2026);
    expect(result).toEqual([{ id: 2 }]);
  });

  it("ignores check-ins from a different month or year", () => {
    const subscriptions = [{ id: 1 }];
    const checkins = [{ subscriptionId: 1, month: 8, year: 2026 }];
    const result = getSubscriptionsMissingCheckin(subscriptions, checkins, 9, 2026);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("returns an empty array when every subscription already answered", () => {
    const subscriptions = [{ id: 1 }, { id: 2 }];
    const checkins = [
      { subscriptionId: 1, month: 9, year: 2026 },
      { subscriptionId: 2, month: 9, year: 2026 },
    ];
    const result = getSubscriptionsMissingCheckin(subscriptions, checkins, 9, 2026);
    expect(result).toEqual([]);
  });
});
