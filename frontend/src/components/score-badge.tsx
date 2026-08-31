import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  category: "high" | "medium" | "low" | "not_rated";
}

const SCORE_CONFIG: Record<
  ScoreBadgeProps["category"], { label: string; dotClassName: string; textClassName: string }
> = {
  high: { label: "Utile", dotClassName: "bg-chart-1", textClassName: "text-chart-1" },
  medium: { label: "Moyen", dotClassName: "bg-chart-2", textClassName: "text-chart-2" },
  low: { label: "Peu utilisé", dotClassName: "bg-chart-3", textClassName: "text-chart-3" },
  not_rated: {
    label: "Pas encore évalué",
    dotClassName: "bg-muted-foreground",
    textClassName: "text-muted-foreground",
  },
};

export function ScoreBadge({ category }: ScoreBadgeProps) {
  const config = SCORE_CONFIG[category];

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium", config.textClassName)}>
      <span className={cn("size-1.5 rounded-full", config.dotClassName)} />
      { config.label }
    </span>
  );
}