"use client";

import { createClient } from "@/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [done, setDone] = useState(false);
  const runOnce = useRef(false);

  useEffect(() => {
    if (runOnce.current) return;
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    async function run() {
      if (!code) {
        router.replace("/?error=auth");
        return;
      }
      runOnce.current = true;
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      setDone(true);
      if (error) {
        console.error("[Auth callback] exchangeCodeForSession failed:", error.message, error);
        router.replace("/?error=auth");
        return;
      }
      router.replace(next);
    }

    run();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-600">Signing you in…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <p className="text-slate-600">Signing you in…</p>
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
