"use client";

import { createClient } from "@/supabase/client";
import { useState } from "react";

const inputClass =
  "flex-1 min-w-[160px] px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none";

export function AddBookmarkForm({ userId, onAdded }: { userId: string; onAdded: () => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    let link = url.trim();
    if (!link) {
      setError("Enter a URL");
      return;
    }
    if (!/^https?:\/\//i.test(link)) link = "https://" + link;
    try {
      new URL(link);
    } catch {
      setError("Invalid URL");
      return;
    }
    const titleText = title.trim() || new URL(link).hostname;

    setBusy(true);
    const { error: err } = await supabase.from("bookmarks").insert({ user_id: userId, url: link, title: titleText });
    if (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    setUrl("");
    setTitle("");
    setBusy(false);
    onAdded();
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 flex-wrap">
      <input type="url" placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} className={inputClass} disabled={busy} />
      <input type="text" placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} disabled={busy} />
      <button type="submit" disabled={busy} className="px-4 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 disabled:opacity-50">
        {busy ? "Adding…" : "Add"}
      </button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
    </form>
  );
}
