import { NextResponse } from "next/server";
import { getStripe } from "../../../../../lib/payments/stripe";

export async function POST() {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "DragonMind Premium" },
          recurring: { interval: "month" },
          unit_amount: 500
        },
        quantity: 1
      }
    ],
    subscription_data: {
      trial_period_days: 3
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4173"}/pricing?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4173"}/pricing?checkout=cancelled`
  });

  return NextResponse.json({ url: session.url });
}
