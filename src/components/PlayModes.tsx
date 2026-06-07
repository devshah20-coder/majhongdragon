"use client";

import { useState } from "react";
import { AnalyzePanel } from "@/components/AnalyzePanel";
import { SoloTrainer } from "@/components/SoloTrainer";

const modes = [
  {
    id: "solo",
    label: "Solo Trainer",
    copy: "Draw tiles, discard tiles and ask what to play."
  },
  {
    id: "puzzle",
    label: "Puzzle",
    copy: "Try a best-discard puzzle with the analyzer."
  },
  {
    id: "replay",
    label: "Replay Notes",
    copy: "Replay upload is scaffolded. Use analysis for now."
  }
] as const;

type ModeId = (typeof modes)[number]["id"];

export function PlayModes() {
  const [active, setActive] = useState<ModeId>("solo");

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {modes.map((mode) => (
          <button
            className={`rounded-lg border p-4 text-left transition ${active === mode.id ? "border-gold bg-gold text-navy" : "border-jade/15 bg-jade/5 text-pearl hover:border-gold/60"}`}
            key={mode.id}
            onClick={() => setActive(mode.id)}
            type="button"
          >
            <span className="block font-black">{mode.label}</span>
            <span className={`mt-2 block text-sm leading-6 ${active === mode.id ? "text-navy/75" : "text-jade/80"}`}>{mode.copy}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        {active === "solo" && <SoloTrainer />}
        {active === "puzzle" && <AnalyzePanel />}
        {active === "replay" && (
          <section className="glass rounded-lg p-5">
            <h2 className="text-2xl font-black">Replay analysis</h2>
            <p className="mt-3 leading-7 text-jade/85">
              Upload support is ready in the product plan, but the working tool today is the hand analyzer. Paste a hand from your replay and DragonMind will explain the discard.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
