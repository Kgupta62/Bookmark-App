import { createBrowserClient } from "@supabase/ssr";
import { parse, serialize } from "cookie";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document === "undefined") return [];
          const parsed = parse(document.cookie);
          return Object.entries(parsed).map(([name, value]) => ({ name, value }));
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          if (typeof document === "undefined") return;
          cookiesToSet.forEach(({ name, value, options }) => {
            document.cookie = serialize(name, value, { path: "/", ...(options as object) });
          });
        },
      },
      cookieOptions: { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 400 },
    }
  );
}
