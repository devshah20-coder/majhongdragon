import { PageShell } from "@/components/PageShell";

const posts = ["How shanten guides every discard", "Riichi push/fold basics", "American Mahjong card updates explained"];

export default function BlogPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-black">Strategy Blog</h1>
        <div className="mt-6 grid gap-3">
          {posts.map((post) => (
            <article className="rounded-lg border border-jade/15 bg-jade/5 p-4" key={post}>
              <h2 className="font-black">{post}</h2>
              <p className="mt-2 text-sm text-jade/80">CMS-backed article placeholder ready for Supabase content publishing.</p>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
