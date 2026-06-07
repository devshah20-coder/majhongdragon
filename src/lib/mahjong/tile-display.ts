export type DisplayTile = {
  code: string;
  face: string;
  label: string;
  group: "Bamboo" | "Characters" | "Dots" | "Winds" | "Dragons";
  tone: "green" | "red" | "blue" | "dark";
};

const windNames: Record<string, string> = {
  "1z": "East Wind",
  "2z": "South Wind",
  "3z": "West Wind",
  "4z": "North Wind"
};

const dragonNames: Record<string, string> = {
  "5z": "White Dragon",
  "6z": "Green Dragon",
  "7z": "Red Dragon"
};

const dragonFaces: Record<string, string> = {
  "5z": "P",
  "6z": "F",
  "7z": "C"
};

export function displayTile(code: string): DisplayTile {
  const value = code[0];
  const suit = code[1];

  if (suit === "m") {
    return { code, face: value, label: `${value} Character`, group: "Characters", tone: "red" };
  }

  if (suit === "p") {
    return { code, face: value, label: `${value} Dot`, group: "Dots", tone: "blue" };
  }

  if (suit === "s") {
    return { code, face: value, label: `${value} Bamboo`, group: "Bamboo", tone: "green" };
  }

  if (dragonNames[code]) {
    return { code, face: dragonFaces[code], label: dragonNames[code], group: "Dragons", tone: code === "6z" ? "green" : "red" };
  }

  return { code, face: value, label: windNames[code] ?? `${value} Honor`, group: "Winds", tone: "dark" };
}

export const tileGroups = [
  {
    title: "Characters",
    copy: "Numbered 1 to 9. Often written as m in hand notation.",
    tiles: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"]
  },
  {
    title: "Dots",
    copy: "Circle tiles, numbered 1 to 9. Written as p.",
    tiles: ["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p"]
  },
  {
    title: "Bamboo",
    copy: "Bamboo tiles, numbered 1 to 9. Written as s.",
    tiles: ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s"]
  },
  {
    title: "Winds",
    copy: "East, South, West, North. Written as 1z to 4z.",
    tiles: ["1z", "2z", "3z", "4z"]
  },
  {
    title: "Dragons",
    copy: "White, Green, Red. Written as 5z to 7z.",
    tiles: ["5z", "6z", "7z"]
  }
];
