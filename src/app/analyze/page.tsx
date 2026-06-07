import { AnalyzePanel } from "@/components/AnalyzePanel";
import { PageShell } from "@/components/PageShell";

export default function AnalyzePage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-gold">AI Analysis</p>
        <h1 className="mt-2 text-4xl font-black">Hand analyzer</h1>
        <p className="mt-3 max-w-2xl text-jade/85">Enter compact tile notation and DragonMind returns shanten, ukeire, waits, discard rankings, and a coach explanation.</p>
        <div className="mt-6">
          <AnalyzePanel />
        </div>
      </main>
    </PageShell>
  );
}
