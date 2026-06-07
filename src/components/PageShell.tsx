import Link from "next/link";
import type { Route } from "next";
import { BrandMark } from "@/components/BrandMark";

const nav: Array<[string, Route]> = [
  ["Learn", "/learn"],
  ["Play", "/play"],
  ["Analyze", "/analyze"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Admin", "/admin"]
];

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map(([label, href]) => (
            <Link className="text-sm font-bold text-jade/85 transition hover:text-gold" href={href} key={href}>
              {label}
            </Link>
          ))}
          <Link className="rounded-lg bg-gold px-4 py-2 text-sm font-black text-navy" href="/pricing">
            Start premium
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
