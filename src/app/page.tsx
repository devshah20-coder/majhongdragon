import Image from "next/image";
import Link from "next/link";
import { AnalyzePanel } from "@/components/AnalyzePanel";
import { PageShell } from "@/components/PageShell";
import { SoloTrainer } from "@/components/SoloTrainer";
import { variants } from "@/lib/mahjong/variants";

const features = [
  "Variant-aware AI recommendations",
  "Shanten, ukeire, wait and scoring analysis",
  "Solo trainer, puzzles, replay review and board editor",
  "Stripe, Razorpay, Supabase Auth and admin CMS foundation"
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
              DragonMind Mahjong trains your next discard before the hand slips away.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-jade/85">
              A mobile-first Mahjong platform with a dedicated rules engine, explainable recommendations, replay analysis architecture, subscriptions, and an admin dashboard for content and annual American Mahjong cards.
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
                <div className="rounded-lg border border-jade/15 bg-jade/5 p-4 text-sm font-bold text-jade" key={feature}>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <aside className="glass overflow-hidden rounded-lg p-4">
            <Image className="mx-auto rounded-lg object-cover" src="/brand/dragonmind-logo-reference.png" alt="DragonMind Mahjong logo reference with emerald dragon and red dragon tile" width={760} height={760} priority />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Metric label="Variants" value="15+" />
              <Metric label="Trial" value="3d" />
              <Metric label="Premium" value="$5" />
            </div>
          </aside>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.85fr]">
          <AnalyzePanel />
          <SoloTrainer />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="text-3xl font-black">Supported variants</h2>
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-pearl p-3 text-navy">
      <strong className="block text-xl">{value}</strong>
      <span className="text-xs font-black uppercase tracking-[0.18em] text-emerald">{label}</span>
    </div>
  );
}
