import { PageShell } from "../../components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-4 py-6 text-jade/85 sm:px-6">
        <h1 className="text-4xl font-black text-pearl">About DragonMind Mahjong</h1>
        <p className="mt-4 leading-8">DragonMind Mahjong is designed as a serious training platform for global Mahjong players, combining deterministic game algorithms with clear human coaching.</p>
      </main>
    </PageShell>
  );
}
