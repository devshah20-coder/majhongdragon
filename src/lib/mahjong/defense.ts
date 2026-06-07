import { Tile } from "./tiles";

export type DangerReport = {
  tile: Tile;
  danger: "low" | "medium" | "high";
  reason: string;
};

export function estimateDanger(discard: Tile): DangerReport {
  const value = Number(discard[0]);
  const suit = discard[1];

  if (suit === "z") {
    return { tile: discard, danger: value >= 5 ? "medium" : "low", reason: "Honor tiles are safer when visibly exhausted, but live dragons can be valuable." };
  }

  if (value === 1 || value === 9) {
    return { tile: discard, danger: "low", reason: "Terminal tiles usually complete fewer sequences than middle tiles." };
  }

  if (value >= 4 && value <= 6) {
    return { tile: discard, danger: "high", reason: "Middle tiles feed the most two-sided waits and are dangerous against advanced opponents." };
  }

  return { tile: discard, danger: "medium", reason: "This tile has some sequence risk but less than central tiles." };
}
