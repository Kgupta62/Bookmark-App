"use client";

export function BookmarkListSkeleton() {
  return (
    <ul className="space-y-2">
      {[1, 2, 3].map((i) => (
        <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-slate-100 animate-pulse" />
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 animate-pulse" />
          <div className="w-9 h-9 rounded-lg bg-slate-100 animate-pulse" />
        </li>
      ))}
    </ul>
  );
}
