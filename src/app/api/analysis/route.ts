import { NextRequest, NextResponse } from "next/server";
import { analyzeHand } from "@/lib/mahjong/analyzer";
import { VariantId, variants } from "@/lib/mahjong/variants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const variantIds = new Set(variants.map((variant) => variant.id));
  const variant = variantIds.has(body.variant) ? body.variant as VariantId : "riichi";
  const hand = typeof body.hand === "string" ? body.hand : "";

  return NextResponse.json(analyzeHand({ variant, hand }));
}
