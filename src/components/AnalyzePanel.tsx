"use client";

import { useMemo, useState } from "react";
import { MahjongTile } from "@/components/MahjongTile";
import { analyzeHand } from "@/lib/mahjong/analyzer";
import { VariantId, variants } from "@/lib/mahjong/variants";

const sampleHand = "123m456p789s11z22z";

export function AnalyzePanel() {
  const [variant, setVariant] = useState<VariantId>("riichi");
  const [hand, setHand] = useState(sampleHand);
  const analysis = useMemo(() => analyzeHand({ variant, hand }), [variant, hand]);

  return (
    <section className="glass rounded-lg p-4 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <label className="block">
          <span className="text-sm font-bold text-jade">Hand notation</span>
          <input className="mt-2 w-full rounded-lg border border-jade/20 bg-navy/80 px-4 py-3 text-pearl outline-none focus:border-gold" value={hand} onChange={(event) => setHand(event.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-jade">Variant</span>
          <select className="mt-2 w-full rounded-lg border border-jade/20 bg-navy/80 px-4 py-3 text-pearl outline-none focus:border-gold" value={variant} onChange={(event) => setVariant(event.target.value as VariantId)}>
            {variants.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 rounded-lg border border-jade/15 bg-navy/55 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-black text-pearl">Your tiles</p>
          <p className="text-xs font-bold text-jade/75">{analysis.tiles.length} tiles read</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {analysis.tiles.length > 0 ? (
            analysis.tiles.map((tile, index) => <MahjongTile code={tile} key={`${tile}-${index}`} small />)
          ) : (
            <p className="text-sm text-jade/75">Type a hand like 123m456p789s11z22z.</p>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric label="Shanten" value={String(analysis.shanten)} />
        <Metric label="Ukeire" value={String(analysis.ukeire.total)} />
        <Metric label="Best discard" value={analysis.bestDiscard ?? "None"} />
      </div>

      <div className="mt-5 rounded-lg bg-emerald/10 p-4">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Coach explanation</p>
        <p className="mt-2 leading-7 text-pearl">{analysis.explanation}</p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {analysis.alternatives.map((move) => (
          <div className="rounded-lg border border-jade/15 bg-navy/55 p-4" key={move.discard}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-black">Discard {move.discard}</p>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-black text-gold">EV {move.expectedValue.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-jade/85">{move.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-pearl p-4 text-navy">
      <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald">{label}</span>
      <strong className="mt-2 block text-2xl">{value}</strong>
    </div>
  );
}
