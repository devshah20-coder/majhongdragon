import { PageShell } from "@/components/PageShell";

const cards = ["User management", "Subscriptions", "Bans", "Analytics", "Lessons and blog", "American yearly cards", "Variant rules", "Announcements", "Contact CMS", "About CMS"];

export default function AdminPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="rounded-lg border border-gold/35 bg-gold/10 p-4">
          <p className="font-black text-gold">Seed admin: admin</p>
          <p className="mt-1 text-sm text-jade/85">Initial password is configured in the Supabase seed plan as Devshah@11 and must be changed on first login.</p>
        </div>
        <h1 className="mt-6 text-4xl font-black">Admin Dashboard</h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <section className="glass rounded-lg p-4" key={card}>
              <h2 className="font-black">{card}</h2>
              <p className="mt-2 text-sm leading-6 text-jade/80">Ready for Supabase-backed CRUD and role-protected server actions.</p>
            </section>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
