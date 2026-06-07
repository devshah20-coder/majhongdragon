import { PageShell } from "@/components/PageShell";

export default function ContactPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-black">Contact</h1>
        <form className="glass mt-6 grid gap-3 rounded-lg p-5">
          <input className="rounded-lg border border-jade/20 bg-navy/80 px-4 py-3" placeholder="Name" />
          <input className="rounded-lg border border-jade/20 bg-navy/80 px-4 py-3" placeholder="Email" type="email" />
          <textarea className="min-h-32 rounded-lg border border-jade/20 bg-navy/80 px-4 py-3" placeholder="Message" />
          <button className="rounded-lg bg-gold px-4 py-3 font-black text-navy" type="button">Send message</button>
        </form>
      </main>
    </PageShell>
  );
}
