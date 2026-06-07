import Link from "next/link";
import { MahjongTile } from "../../components/MahjongTile";
import { PageShell } from "../../components/PageShell";
import { tileGroups } from "../../lib/mahjong/tile-display";

const lessons = [
  {
    title: "1. Learn the suits",
    copy: "Most hands use numbered tiles from the three suits: characters, dots and bamboo. You make sequences like 1-2-3 or sets like 7-7-7."
  },
  {
    title: "2. Learn honors",
    copy: "Winds and dragons do not make sequences. They are usually used as pairs or triplets."
  },
  {
    title: "3. Build a hand",
    copy: "A normal winning hand is four groups plus one pair. Example: 123 characters, 456 dots, 789 bamboo, East-East-East, Red-Red."
  },
  {
    title: "4. Pick discards",
    copy: "Discard isolated tiles first. Keep tiles that connect, like 3-4, 6-7, or a pair that can become your eyes."
  }
];

export default function LearnPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-gold">Beginner lesson</p>
            <h1 className="mt-2 text-4xl font-black">Know the tiles first</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-jade/85">
              Mahjong gets easier once the tile faces stop looking random. Start here, then open the trainer and practice discarding.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-gold px-5 py-3 text-center font-black text-navy" href="/play">
                Practice with these tiles
              </Link>
              <Link className="rounded-lg border border-jade/30 px-5 py-3 text-center font-black text-pearl" href="/analyze">
                Analyze a sample hand
              </Link>
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <p className="font-black text-pearl">Winning hand example</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["1m", "2m", "3m", "4p", "5p", "6p", "7s", "8s", "9s", "1z", "1z", "1z", "7z", "7z"].map((tile, index) => (
                <MahjongTile code={tile} key={`${tile}-${index}`} />
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-jade/85">This is four groups and a pair: three sequences, one wind triplet, and a red dragon pair.</p>
          </div>
        </section>

        <section className="mt-8 grid gap-4">
          {tileGroups.map((group) => (
            <article className="rounded-lg border border-jade/15 bg-navy/70 p-4" key={group.title}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black">{group.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-jade/80">{group.copy}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.tiles.map((tile) => (
                    <MahjongTile code={tile} key={tile} small />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <article className="glass rounded-lg p-5" key={lesson.title}>
              <h2 className="text-xl font-black text-gold">{lesson.title}</h2>
              <p className="mt-3 leading-7 text-jade/85">{lesson.copy}</p>
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
