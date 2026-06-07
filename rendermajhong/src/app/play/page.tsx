import { PageShell } from "@/components/PageShell";
import { SoloTrainer } from "@/components/SoloTrainer";

const modes = ["Solo Trainer", "AI Practice", "Board Editor", "Replay States", "Daily Puzzle", "Camera Scanner"];

export default function PlayPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-black">Play and train</h1>
        <p className="mt-3 max-w-2xl text-jade/85">Start with manual draws and discards. The architecture includes slots for AI practice difficulty, puzzle feeds, board editor saves, and replay state storage.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((mode) => (
            <div className="rounded-lg border border-jade/15 bg-jade/5 p-4 font-black" key={mode}>
              {mode}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <SoloTrainer />
        </div>
      </main>
    </PageShell>
  );
}
