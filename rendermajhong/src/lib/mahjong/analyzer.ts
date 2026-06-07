import { estimateDanger } from "@/lib/mahjong/defense";
import { estimateScore } from "@/lib/mahjong/scoring";
import { calculateStandardShanten, calculateUkeire, rankDiscards } from "@/lib/mahjong/shanten";
import { parseHand, sortTiles } from "@/lib/mahjong/tiles";
import { getVariant, VariantId } from "@/lib/mahjong/variants";

export type AnalysisRequest = {
  variant: VariantId;
  hand: string;
  seatWind?: string;
  roundWind?: string;
  dora?: string[];
  visibleDiscards?: string[];
};

export function analyzeHand(request: AnalysisRequest) {
  const variant = getVariant(request.variant);
  const tiles = sortTiles(parseHand(request.hand));
  const shanten = calculateStandardShanten(tiles);
  const ukeire = calculateUkeire(tiles);
  const ranked = rankDiscards(tiles).slice(0, 5);
  const best = ranked[0];
  const score = estimateScore(request.variant, shanten);

  return {
    variant,
    tiles,
    shanten,
    ukeire,
    bestDiscard: best?.discard ?? null,
    waits: ukeire.waits,
    score,
    defense: best ? estimateDanger(best.discard) : null,
    alternatives: ranked.map((move, index) => ({
      ...move,
      danger: estimateDanger(move.discard),
      reason: index === 0
        ? `Best tile-efficiency option: it leaves ${move.ukeire} improving tiles at shanten ${move.shanten}.`
        : `Alternative line: shanten ${move.shanten}, ukeire ${move.ukeire}, with ${estimateDanger(move.discard).danger} discard danger.`
    })),
    explanation: best
      ? `For ${variant.name}, discard ${best.discard}. It gives the best current mix of shanten, ukeire and safety: ${best.ukeire} improving tiles, estimated danger ${estimateDanger(best.discard).danger}.`
      : "Add a valid hand in compact notation, for example 123m456p789s11z22z."
  };
}
