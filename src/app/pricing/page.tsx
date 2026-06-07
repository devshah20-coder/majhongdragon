import { PageShell } from "../../components/PageShell";

export default function PricingPage() {
  return (
    <PageShell>
      <main className="mx-auto grid max-w-5xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-2">
        <Plan name="Free" price="$0" items={["Learn mode", "Limited AI analysis", "Limited puzzles"]} />
        <Plan name="Premium" price="$5/month or ₹200/month" highlighted items={["3-day free trial", "Unlimited analysis", "Replay analyzer", "Advanced statistics", "Camera scanner", "All premium AI tools"]} />
      </main>
    </PageShell>
  );
}

function Plan({ name, price, items, highlighted = false }: { name: string; price: string; items: string[]; highlighted?: boolean }) {
  return (
    <section className={`rounded-lg p-5 ${highlighted ? "bg-gold text-navy" : "glass"}`}>
      <h1 className="text-3xl font-black">{name}</h1>
      <p className="mt-2 text-xl font-black">{price}</p>
      <ul className="mt-5 space-y-3 text-sm font-bold">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
