import { VariantId } from "./variants";

export type ScoreEstimate = {
  label: string;
  hanOrFan: number;
  pointsText: string;
  notes: string[];
};

export function estimateScore(variant: VariantId, shanten: number): ScoreEstimate {
  if (variant === "american") {
    return {
      label: "Card-defined hand",
      hanOrFan: 0,
      pointsText: "Depends on uploaded yearly card",
      notes: ["American Mahjong legal hands are read from the admin-managed annual card table."]
    };
  }

  const value = shanten <= 0 ? 3 : shanten === 1 ? 2 : 1;
  return {
    label: variant === "riichi" || variant === "sanma" ? "Riichi estimate" : "Variant estimate",
    hanOrFan: value,
    pointsText: shanten <= 0 ? "Winning / tenpai-level value" : "Developing hand",
    notes: ["Exact scoring requires win context, seat wind, round wind, calls, dora and rule options."]
  };
}
