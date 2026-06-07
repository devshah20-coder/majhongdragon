import { PageShell } from "../../components/PageShell";
import { PlayModes } from "../../components/PlayModes";

export default function PlayPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-black">Play and train</h1>
        <p className="mt-3 max-w-2xl text-jade/85">Pick a mode. The buttons below actually switch the tool, and the solo trainer uses real tile faces.</p>
        <div className="mt-6">
          <PlayModes />
        </div>
      </main>
    </PageShell>
  );
}
