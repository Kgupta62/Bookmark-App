import { createClient } from "@/supabase/server";
import { BookmarkManager } from "@/components/BookmarkManager";
import { SignInWithErrorHint } from "@/components/SignInWithErrorHint";

export default async function Home(props: {
  searchParams?: Promise<{ error?: string; msg?: string }> | { error?: string; msg?: string };
}) {
  const searchParams = await Promise.resolve(props.searchParams ?? {});
  const hasAuthError = searchParams && "error" in searchParams && searchParams.error === "auth";
  const authErrorMsg = searchParams && "msg" in searchParams && searchParams.msg ? String(searchParams.msg) : null;
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md p-6 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <p className="font-semibold text-amber-800">Setup required</p>
          <p className="text-amber-700 text-sm mt-2">
            Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart.
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Smart Bookmark</h1>
          <p className="text-slate-500 text-sm mb-6">Save links. Private, synced in real time.</p>
          <SignInWithErrorHint hasAuthError={hasAuthError} authErrorMsg={authErrorMsg} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <BookmarkManager user={user} />
    </main>
  );
}
