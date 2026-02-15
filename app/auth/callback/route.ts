import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    const msg = encodeURIComponent(error.message || "Exchange failed");
    return NextResponse.redirect(`${origin}/?error=auth&msg=${msg}`);
  }

  return NextResponse.redirect(`${origin}/?error=auth`);
}
