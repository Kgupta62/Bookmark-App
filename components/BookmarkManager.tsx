"use client";

import { createClient } from "@/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { AddBookmarkForm } from "./AddBookmarkForm";
import { BookmarkList } from "./BookmarkList";
import { BookmarkListSkeleton } from "./BookmarkListSkeleton";
import { SignOut } from "./SignOut";

export type BookmarkRow = {
  id: string;
  url: string;
  title: string;
  created_at: string;
};

export function BookmarkManager({ user }: { user: User }) {
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function load() {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("id, url, title, created_at")
      .order("created_at", { ascending: false });
    if (!error) setBookmarks(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const ch = supabase
      .channel("bookmarks")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookmarks", filter: `user_id=eq.${user.id}` }, load)
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user.id]);

  async function remove(id: string) {
    await supabase.from("bookmarks").delete().eq("id", id);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Smart Bookmark</h1>
            <p className="text-slate-500 text-sm truncate max-w-[200px] sm:max-w-none">{user.email}</p>
          </div>
        </div>
        <SignOut />
      </header>

      <div className="mb-8 p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">Add bookmark</p>
        <AddBookmarkForm userId={user.id} onAdded={load} />
      </div>

      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">Your links</p>
        {loading ? <BookmarkListSkeleton /> : <BookmarkList bookmarks={bookmarks} onDelete={remove} />}
      </div>
    </div>
  );
}
