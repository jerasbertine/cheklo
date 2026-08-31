import type { PendingCheckin } from "@/lib/subscriptions";
import { CheckinPrompt } from "@/components/checkin-prompt";

interface PendingCheckinsBannerProps {
  pendingCheckins: PendingCheckin[];
}

export function PendingCheckinsBanner({ pendingCheckins }: PendingCheckinsBannerProps) {
  if (pendingCheckins.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 rounded-md border border-primary/40 p-4">
      <p className="text-sm font-medium">
        {pendingCheckins.length} check-in{pendingCheckins.length > 1 ? "s" : ""} en attente
      </p>
      <div className="space-y-2">
        {pendingCheckins.map((sub) => (
          <CheckinPrompt key={sub.id} subscriptionId={sub.id} name={sub.name} />
        ))}
      </div>
    </div>
  );
}
