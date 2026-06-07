"use client";

import Link from "next/link";
import type { Route } from "next";
import { BarChart3, BookOpen, Brain, Crown, LayoutDashboard } from "lucide-react";

const items: Array<{ href: Route; label: string; icon: typeof LayoutDashboard }> = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/play", label: "Play", icon: Crown },
  { href: "/analyze", label: "Analyze", icon: Brain },
  { href: "/admin", label: "Admin", icon: BarChart3 }
];

export function MobileNav() {
  return (
    <nav className="mobile-safe fixed inset-x-0 bottom-0 z-40 border-t border-jade/15 bg-navy/95 px-2 pt-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-[0.68rem] font-bold text-jade" href={item.href} key={item.href}>
              <Icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
