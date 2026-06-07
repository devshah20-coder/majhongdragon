import { PageShell } from "@/components/PageShell";

const tracks = [
  ["Beginner", "Tile recognition, hand building, winning conditions."],
  ["Intermediate", "Tile efficiency, opponent reading, defensive structure."],
  ["Advanced", "Tournament strategy, push/fold, EV and risk control."]
];

export default function LearnPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-black">Learn Mahjong</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tracks.map(([title, copy]) => (
            <article className="glass rounded-lg p-5" key={title}>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-gold">{title}</p>
              <p className="mt-3 text-jade/85">{copy}</p>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
