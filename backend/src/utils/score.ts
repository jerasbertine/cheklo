interface CheckinForScore {
  month: number;
  year: number;
  response: "yes" | "no" | "mixed";
}

type ScoreCategory = "high" | "medium" | "low" | "not_rated";

interface UsefulnessScore {
  category: ScoreCategory;
  ratio: number | null;
}

const RESPONSE_WEIGHTS: Record<"yes" | "no" | "mixed", number> = {
  yes: 1,
  mixed: 0.5,
  no: 0,
};

export function calculateUsefulnessScore(checkins: CheckinForScore[]): UsefulnessScore {
  if (checkins.length === 0) {
    return { category: "not_rated", ratio: null};
  }

  const sorted = [...checkins].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const recent = sorted.slice(0, 3);

  const total = recent.reduce((sum, c) => sum + RESPONSE_WEIGHTS[c.response], 0);
  const ratio = Math.round((total / recent.length) * 100) / 100;
  
  let category: ScoreCategory;
  if (ratio >= 0.66) category = "high";
  else if (ratio >= 0.33) category = "medium";
  else category = "low";

  return {category, ratio};
}