import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const year = Number(body.year);
  const hands = Array.isArray(body.hands) ? body.hands : [];

  if (!year || hands.length === 0) {
    return NextResponse.json({ error: "year and hands are required" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("american_mahjong_cards")
    .upsert({ year, hands, status: "published", uploaded_by: body.uploadedBy ?? null }, { onConflict: "year" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ card: data });
}
