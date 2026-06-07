import { NextResponse } from "next/server";
import { getRazorpayConfig } from "../../../../../lib/payments/razorpay";

export async function POST() {
  const { keyId, keySecret } = getRazorpayConfig();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: 20000,
      currency: "INR",
      receipt: `dragonmind-${Date.now()}`,
      notes: { plan: "premium_monthly_inr" }
    })
  });

  if (!response.ok) return NextResponse.json({ error: "Razorpay order failed" }, { status: 500 });
  return NextResponse.json(await response.json());
}
