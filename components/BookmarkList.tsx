"use client";

import type { BookmarkRow } from "./BookmarkManager";

export function BookmarkList({ bookmarks, onDelete }: { bookmarks: BookmarkRow[]; onDelete: (id: string) => void }) {
  if (!bookmarks.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
        <p className="text-slate-500">No bookmarks yet. Add one above.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {bookmarks.map((item) => (
        <li key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow">
          <div className="min-w-0 flex-1">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-800 hover:text-slate-600 block truncate">
              {item.title}
            </a>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 truncate block">
              {item.url}
            </a>
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button type="button" onClick={() => onDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" aria-label="Delete">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
