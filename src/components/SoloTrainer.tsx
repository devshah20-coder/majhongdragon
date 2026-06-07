"use client";

import { useMemo, useState } from "react";
import { MahjongTile } from "./MahjongTile";
import { analyzeHand } from "../lib/mahjong/analyzer";

const tiles = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"];

export function SoloTrainer() {
  const [hand, setHand] = useState<string[]>(["1m", "2m", "3m", "4p", "5p", "6p", "7s", "8s", "9s", "1z", "1z", "2z", "2z"]);
  const analysis = useMemo(() => analyzeHand({ variant: "riichi", hand: hand.join("") }), [hand]);

  function draw(tile: string) {
    if (hand.length < 14) setHand([...hand, tile]);
  }

  function discard(index: number) {
    setHand(hand.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <section className="glass rounded-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Solo Trainer</p>
          <h2 className="text-2xl font-black">Manual draw and discard</h2>
        </div>
        <button className="rounded-lg border border-jade/25 px-3 py-2 text-sm font-bold text-jade" onClick={() => setHand([])} type="button">
          Clear
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {hand.map((tile, index) => (
          <button className="rounded-lg transition active:scale-95" key={`${tile}-${index}`} onClick={() => discard(index)} title={`Discard ${tile}`} type="button">
            <MahjongTile code={tile} small />
          </button>
        ))}
      </div>

      <p className="mt-4 rounded-lg bg-emerald/10 p-3 text-sm leading-6 text-jade">
        Best current discard: <strong className="text-gold">{analysis.bestDiscard ?? "draw one more tile"}</strong>. {analysis.explanation}
      </p>

      <div className="mt-4 grid grid-cols-7 gap-2">
        {tiles.map((tile) => (
          <button className="grid place-items-center rounded-lg border border-jade/20 bg-navy/70 p-1 transition hover:border-gold/60 disabled:opacity-40" disabled={hand.length >= 14} key={tile} onClick={() => draw(tile)} type="button">
            <MahjongTile code={tile} small />
          </button>
        ))}
      </div>
    </section>
  );
}
