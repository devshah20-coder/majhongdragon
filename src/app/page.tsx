import Image from "next/image";
import Link from "next/link";
import { AnalyzePanel } from "../components/AnalyzePanel";
import { MahjongTile } from "../components/MahjongTile";
import { PageShell } from "../components/PageShell";
import { SoloTrainer } from "../components/SoloTrainer";
import { variants } from "../lib/mahjong/variants";

const features = [
  { label: "Learn the tiles", href: "/learn", copy: "See suits, winds, dragons and basic hands." },
  { label: "Practice a hand", href: "/play", copy: "Draw, discard, undo and ask for the best move." },
  { label: "Analyze discard", href: "/analyze", copy: "Check shanten, waits and safer alternatives." },
  { label: "View pricing", href: "/pricing", copy: "Free training first, premium tools later." }
];

export default function HomePage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_410px] lg:py-10">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-black text-gold">
              Learn. Analyze. Master Every Mahjong Variant.
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] text-pearl sm:text-6xl">
              Learn Mahjong by touching the tiles, not reading a wall of text.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-jade/85">
              Open a hand, see what each tile means, and get a plain answer for what to discard next. Built for phones first.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-gold px-5 py-3 text-center font-black text-navy" href="/analyze">
                Analyze a hand
              </Link>
              <Link className="rounded-lg border border-jade/30 px-5 py-3 text-center font-black text-pearl" href="/play">
                Open trainer
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <Link className="rounded-lg border border-jade/15 bg-jade/5 p-4 transition hover:border-gold/60 hover:bg-gold/10" href={feature.href} key={feature.label}>
                  <span className="font-black text-pearl">{feature.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-jade/80">{feature.copy}</span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="glass overflow-hidden rounded-lg p-4">
            <Image className="mx-auto max-h-52 rounded-lg object-cover" src="/brand/dragonmind-logo-reference.png" alt="DragonMind Mahjong logo reference with emerald dragon and red dragon tile" width={760} height={760} priority />
            <div className="mt-4 rounded-lg bg-pearl/95 p-4">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald">Tile preview</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["1m", "5m", "9m", "2p", "6p", "3s", "8s", "1z", "5z", "6z", "7z"].map((tile) => (
                  <MahjongTile code={tile} key={tile} small />
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.85fr]">
          <AnalyzePanel />
          <SoloTrainer />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="text-3xl font-black">Rules you can grow into</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {variants.map((variant) => (
              <div className="rounded-lg border border-jade/15 bg-navy/65 p-4" key={variant.id}>
                <p className="font-black text-pearl">{variant.name}</p>
                <p className="mt-2 text-sm leading-6 text-jade/75">{variant.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
