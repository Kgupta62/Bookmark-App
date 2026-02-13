# Smart Bookmark

**Version 1.0** · Save links in one place. Private, synced in real time.

---

## What is this?

Smart Bookmark is a small app to save and manage your bookmarks. You sign in with Google, add URLs (with optional titles), and your list stays private and syncs live across tabs—no refresh needed. This is **v1**: one user, one list, add/delete only.

- Sign in with **Google only** (no email/password)
- **Add** bookmark (URL + optional title)
- **Delete** your bookmarks
- **Private** — you only see your own links
- **Real-time** — open two tabs, add in one, it shows in the other

---

## Tech

- **Next.js 14** (App Router)
- **Supabase** — Auth (Google), Database, Realtime
- **Tailwind CSS**

---

## Run locally

**1. Install**

```bash
git clone <repo-url>
cd "bookmatrk app"
npm install
```

**2. Supabase**

- Create a project at [supabase.com](https://supabase.com)
- **Auth → Providers** → enable Google, add Client ID + Secret from [Google Cloud Console](https://console.cloud.google.com/)  
  Redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
- **SQL Editor** → run everything from `supabase/migrations/001_bookmarks.sql`
- **Database → Replication** → enable for `public.bookmarks`

**3. Env**

```bash
cp .env.example .env.local
```

Add your Supabase **Project URL** and **anon key** (from Supabase → Settings → API).

**4. Start**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), sign in with Google, add a bookmark.

---

## Deploy (Vercel)

1. Push to GitHub, import repo in [Vercel](https://vercel.com), deploy.
2. **Project Settings → Environment Variables** → add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. In Google Cloud Console, add your Vercel URL to **Authorized JavaScript origins** if needed. Redirect URI stays as the Supabase callback URL above.
4. Redeploy after adding env vars.

---

## Problems & fixes (v1)

- **Realtime not updating** — Add `bookmarks` to the Realtime publication (Database → Replication) or run the migration that adds it to `supabase_realtime`.
- **Google “redirect_uri_mismatch”** — In Google Console, use exactly `https://<project-ref>.supabase.co/auth/v1/callback`, not your app URL.
- **Session gone on refresh** — Using `@supabase/ssr` with cookie-based auth in middleware and server/client keeps the session across refresh.
- **Insert failed / RLS** — RLS needs `user_id` on the row. The form sends `user_id` from the logged-in user on every insert.

---

**Smart Bookmark · v1.0**
