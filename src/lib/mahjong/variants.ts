export const variants = [
  { id: "riichi", name: "Japanese Riichi Mahjong", players: 4, description: "Riichi, dora, furiten, yaku and defensive discard reading." },
  { id: "sanma", name: "Sanma", players: 3, description: "Three-player Riichi with north tile handling and faster value swings." },
  { id: "hong_kong", name: "Hong Kong Mahjong", players: 4, description: "Fan-based scoring with classic Chinese hand patterns." },
  { id: "mcr", name: "Chinese Official Mahjong", players: 4, description: "MCR tournament scoring with official fan combinations." },
  { id: "taiwanese", name: "Taiwanese Mahjong", players: 4, description: "Sixteen-tile hand structure and Taiwanese scoring." },
  { id: "american", name: "American Mahjong", players: 4, description: "Annual card-driven legal hands managed from admin uploads." },
  { id: "singapore", name: "Singapore Mahjong", players: 4, description: "Animal tiles, flowers and regional limit patterns." },
  { id: "malaysian", name: "Malaysian Mahjong", players: 4, description: "Regional scoring and bonus-tile focused play." },
  { id: "filipino", name: "Filipino Mahjong", players: 4, description: "Local table rules with flexible custom rule extensions." },
  { id: "korean", name: "Korean Mahjong", players: 4, description: "No bamboo suit in common rule sets and Korean scoring patterns." },
  { id: "sichuan", name: "Sichuan Mahjong", players: 4, description: "Exchange-three and missing-one-suit strategy." },
  { id: "classical_chinese", name: "Classical Chinese Mahjong", players: 4, description: "Classic sets, pairs and traditional scoring." },
  { id: "british", name: "British Mahjong", players: 4, description: "British Mahjong Association style scoring support." },
  { id: "australian", name: "Australian Mahjong", players: 4, description: "Australian club and tournament rules." },
  { id: "tournament_custom", name: "Tournament / Custom Rule Sets", players: 4, description: "Admin-managed scoring, tile, yaku and fan tables." }
] as const;

export type VariantId = (typeof variants)[number]["id"];

export function getVariant(id: VariantId) {
  return variants.find((variant) => variant.id === id) ?? variants[0];
}
