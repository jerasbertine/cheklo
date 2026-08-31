"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CheckinPromptProps {
  subscriptionId: number;
  name: string;
}

const RESPONSES: { value: "yes" | "no" | "mixed"; label: string }[] = [
  { value: "yes", label: "Oui, souvent" },
  { value: "no", label: "Pas du tout" },
  { value: "mixed", label: "Bof" },
];

export function CheckinPrompt({ subscriptionId, name }: CheckinPromptProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  async function handleAnswer(response: "yes" | "no" | "mixed") {
    setIsSubmitting(true);
    await fetch(`/api/subscriptions/${subscriptionId}/checkins`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response }),
    });
    setIsSubmitting(false);
    router.refresh();
  }
  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <p className="text-sm">
        As-tu utilisé <span className="font-medium">{name}</span> ce mois-ci ?
      </p>
      <div className="flex gap-2">
        {RESPONSES.map((r) => (
          <Button
            key={r.value}
            variant="secondary"
            size="sm"
            disabled={isSubmitting}
            onClick={() => handleAnswer(r.value)}
          >
            {r.label}
          </Button>
        ))}
      </div>
    </div>
  );
}