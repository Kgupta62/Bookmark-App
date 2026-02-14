"use client";

import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <button
      type="button"
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
      className="px-3 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
    >
      Sign out
    </button>
  );
}
