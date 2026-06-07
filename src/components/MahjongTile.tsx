import { displayTile } from "../lib/mahjong/tile-display";

const toneClass = {
  green: "text-emerald",
  red: "text-red-700",
  blue: "text-blue-800",
  dark: "text-navy"
};

export function MahjongTile({ code, small = false }: { code: string; small?: boolean }) {
  const tile = displayTile(code);
  const suitMark = code[1] === "m" ? "wan" : code[1] === "p" ? "dot" : code[1] === "s" ? "bam" : tile.group.toLowerCase();

  return (
    <div className={`tile-face relative grid shrink-0 place-items-center rounded-lg border border-black/10 ${small ? "h-14 w-10" : "h-20 w-14"}`} title={`${tile.label} (${code})`}>
      <span className={`font-black leading-none ${toneClass[tile.tone]} ${small ? "text-xl" : "text-3xl"}`}>{tile.face}</span>
      <span className={`absolute bottom-1 left-0 right-0 text-center font-bold uppercase tracking-[0.08em] text-navy/55 ${small ? "text-[0.46rem]" : "text-[0.55rem]"}`}>{suitMark}</span>
    </div>
  );
}
