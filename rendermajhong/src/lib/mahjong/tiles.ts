export type Suit = "m" | "p" | "s" | "z";
export type Tile = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${Suit}`;

const suitOrder: Suit[] = ["m", "p", "s", "z"];

export function allTileTypes(): Tile[] {
  const tiles: Tile[] = [];
  for (const suit of suitOrder) {
    const max = suit === "z" ? 7 : 9;
    for (let value = 1; value <= max; value += 1) tiles.push(`${value as 1}${suit}` as Tile);
  }
  return tiles;
}

export function parseHand(input: string): Tile[] {
  const compact = input.toLowerCase().replace(/[^0-9mpsz]/g, "");
  const tiles: Tile[] = [];
  let pending = "";

  for (const char of compact) {
    if (/\d/.test(char)) {
      pending += char;
      continue;
    }

    if (!["m", "p", "s", "z"].includes(char)) continue;
    const suit = char as Suit;
    for (const digit of pending) {
      const value = Number(digit);
      if (value >= 1 && value <= (suit === "z" ? 7 : 9)) {
        tiles.push(`${value}${suit}` as Tile);
      }
    }
    pending = "";
  }

  return tiles.slice(0, 18);
}

export function tileCounts(tiles: Tile[]) {
  const counts = new Map<Tile, number>();
  for (const tile of allTileTypes()) counts.set(tile, 0);
  for (const tile of tiles) counts.set(tile, (counts.get(tile) ?? 0) + 1);
  return counts;
}

export function sortTiles(tiles: Tile[]) {
  return [...tiles].sort((a, b) => {
    const suitDelta = suitOrder.indexOf(a[1] as Suit) - suitOrder.indexOf(b[1] as Suit);
    return suitDelta || Number(a[0]) - Number(b[0]);
  });
}

export function removeOne(tiles: Tile[], tile: Tile) {
  const copy = [...tiles];
  const index = copy.indexOf(tile);
  if (index >= 0) copy.splice(index, 1);
  return copy;
}
