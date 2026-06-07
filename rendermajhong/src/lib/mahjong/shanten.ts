import { allTileTypes, parseHand, removeOne, tileCounts, Tile } from "@/lib/mahjong/tiles";

type MeldResult = { melds: number; taatsu: number };

export function calculateStandardShanten(input: string | Tile[]) {
  const tiles = Array.isArray(input) ? input : parseHand(input);
  const counts = tileCounts(tiles);
  let best = 8;

  for (const pairCandidate of [null, ...allTileTypes()] as Array<Tile | null>) {
    const working = new Map(counts);
    let pair = 0;

    if (pairCandidate && (working.get(pairCandidate) ?? 0) >= 2) {
      working.set(pairCandidate, (working.get(pairCandidate) ?? 0) - 2);
      pair = 1;
    }

    const { melds, taatsu } = extractMeldsAndTaatsu(working);
    const cappedTaatsu = Math.min(taatsu, 4 - melds);
    best = Math.min(best, 8 - melds * 2 - cappedTaatsu - pair);
  }

  return Math.max(-1, best);
}

export function calculateUkeire(input: string | Tile[]) {
  const tiles = Array.isArray(input) ? input : parseHand(input);
  const current = calculateStandardShanten(tiles);
  const waits: Array<{ tile: Tile; remaining: number }> = [];

  for (const tile of allTileTypes()) {
    const used = tiles.filter((item) => item === tile).length;
    if (used >= 4) continue;
    const next = calculateStandardShanten([...tiles, tile]);
    if (next < current) waits.push({ tile, remaining: 4 - used });
  }

  return {
    current,
    waits,
    total: waits.reduce((sum, wait) => sum + wait.remaining, 0)
  };
}

export function rankDiscards(input: string | Tile[]) {
  const tiles = Array.isArray(input) ? input : parseHand(input);
  const unique = [...new Set(tiles)];

  return unique
    .map((discard) => {
      const handAfterDiscard = removeOne(tiles, discard);
      const ukeire = calculateUkeire(handAfterDiscard);
      const isolatedPenalty = isolationPenalty(discard, handAfterDiscard);
      return {
        discard,
        shanten: ukeire.current,
        ukeire: ukeire.total,
        expectedValue: Math.max(0, 10 - ukeire.current * 2 + ukeire.total / 8 - isolatedPenalty)
      };
    })
    .sort((a, b) => a.shanten - b.shanten || b.ukeire - a.ukeire || b.expectedValue - a.expectedValue);
}

function extractMeldsAndTaatsu(counts: Map<Tile, number>): MeldResult {
  const suited = ["m", "p", "s"] as const;
  let melds = 0;
  let taatsu = 0;

  for (const [tile, count] of counts) {
    const triples = Math.floor(count / 3);
    melds += triples;
    counts.set(tile, count - triples * 3);
  }

  for (const suit of suited) {
    for (let value = 1; value <= 7; value += 1) {
      const a = `${value}${suit}` as Tile;
      const b = `${value + 1}${suit}` as Tile;
      const c = `${value + 2}${suit}` as Tile;
      while ((counts.get(a) ?? 0) > 0 && (counts.get(b) ?? 0) > 0 && (counts.get(c) ?? 0) > 0) {
        counts.set(a, (counts.get(a) ?? 0) - 1);
        counts.set(b, (counts.get(b) ?? 0) - 1);
        counts.set(c, (counts.get(c) ?? 0) - 1);
        melds += 1;
      }
    }
  }

  for (const [tile, count] of counts) {
    if (count >= 2) {
      taatsu += 1;
      counts.set(tile, count - 2);
    }
  }

  for (const suit of suited) {
    for (let value = 1; value <= 8; value += 1) {
      const a = `${value}${suit}` as Tile;
      const b = `${value + 1}${suit}` as Tile;
      if ((counts.get(a) ?? 0) > 0 && (counts.get(b) ?? 0) > 0) {
        counts.set(a, (counts.get(a) ?? 0) - 1);
        counts.set(b, (counts.get(b) ?? 0) - 1);
        taatsu += 1;
      }
    }
  }

  return { melds, taatsu };
}

function isolationPenalty(tile: Tile, hand: Tile[]) {
  const suit = tile[1];
  if (suit === "z") return hand.includes(tile) ? 0 : 0.5;
  const value = Number(tile[0]);
  const neighbors = [value - 2, value - 1, value + 1, value + 2].filter((item) => item >= 1 && item <= 9).map((item) => `${item}${suit}` as Tile);
  return neighbors.some((neighbor) => hand.includes(neighbor)) ? 0 : 1;
}
