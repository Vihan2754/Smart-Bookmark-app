# Smart Bookmark Manager

Production-ready portfolio project built with Next.js App Router, Supabase, Tailwind CSS, and JavaScript.

## Features

- Google OAuth authentication (Supabase Auth only)
- Protected routes using middleware
- Private bookmarks per user (enforced by Supabase RLS)
- Add and delete bookmarks with URL validation
- Realtime sync across tabs with Supabase Realtime
- Responsive modern UI (glassmorphism, dark mode, skeletons, modals, toasts)

## Tech Stack

- Next.js (App Router)
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- Tailwind CSS
- Sonner (toast notifications)
- next-themes (dark mode)

## Project Structure

```bash
src/
	app/
		auth/callback/route.js
		dashboard/dashboard-client.js
		dashboard/loading.js
		dashboard/page.js
		login/page.js
		layout.js
		page.js
	components/
		dashboard/
			add-bookmark-modal.js
			bookmark-card.js
			delete-confirm-dialog.js
			empty-state.js
			navbar.js
		theme-provider.js
		theme-toggle.js
	lib/
		supabase/
			client.js
			middleware.js
			server.js
		validators.js
middleware.js
supabase/schema.sql
```

## Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup Guide

1. Create a new Supabase project.
2. Go to SQL Editor and run `supabase/schema.sql`.
3. In **Authentication > Providers**, enable **Google**.
4. Add your Google OAuth credentials in Supabase.
5. In **Authentication > URL Configuration**, add:
	 - Site URL: `http://localhost:3000`
	 - Redirect URL: `http://localhost:3000/auth/callback`

## Privacy Guarantee (Important)

Bookmarks are private per user. One user must never see another user bookmarks.

If you see cross-user data, run `supabase/privacy_rls_fix.sql` in Supabase SQL Editor.

Then verify:

1. Login with Google account A and add bookmark A.
2. Login with Google account B in another browser/incognito.
3. Account B must not see bookmark A.

Also ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is a publishable/anon key, not a service-role key.

## Google OAuth Setup Steps

1. Open Google Cloud Console.
2. Create OAuth credentials (Web Application).
3. Add authorized redirect URI:
	 - `https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret into Supabase Google provider settings.

## Run Locally

```bash
npm install
npm run dev
```

If you see webpack/hydration/cache issues in development, use:

```bash
npm run dev:clean
```

For clean production builds:

```bash
npm run build:clean
```

Open `http://localhost:3000` (or `http://localhost:3001` if 3000 is busy).

## Realtime Logic

Realtime subscription is implemented in:

- `src/app/dashboard/dashboard-client.js`

It listens to Postgres changes on `public.bookmarks` filtered by current `user_id`, then refetches and updates UI instantly.

## Deploy to Vercel

1. Push code to GitHub.
2. Import repository into Vercel.
3. Add environment variables in Vercel project settings:
	 - `NEXT_PUBLIC_SUPABASE_URL`
	 - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. In Supabase URL config, set production values:
	 - Site URL: `https://your-vercel-domain.vercel.app`
	 - Redirect URL: `https://your-vercel-domain.vercel.app/auth/callback`
5. Deploy.

## Production Safety Notes

- Uses `@supabase/ssr` for safe server/client Supabase usage.
- Middleware refreshes auth session and protects non-login routes.
- RLS policies enforce privacy at database level.
- Client can only access data allowed by authenticated user policies.

## Troubleshooting

### 1) `__webpack_modules__[moduleId] is not a function` or hydration crashes

Cause: stale `.next` / hot-update cache.

Fix:

```bash
npm run dev:clean
```

Then hard refresh browser (`Ctrl+Shift+R`).

### 2) `ENOENT ... .next/static/.../_ssgManifest.js` during build

Cause: interrupted/corrupted build cache.

Fix:

```bash
npm run build:clean
```

### 3) `Cannot find module ... next/dist/server/lib/start-server.js`

Cause: dependency installation mismatch after restart/reload.

Fix:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev:clean
```

### 4) `403 Forbidden` on `POST /rest/v1/bookmarks`

Cause: Supabase RLS policy/grant issue.

Fix: run `supabase/privacy_rls_fix.sql` in Supabase SQL Editor.
