# Maxalena L. — official author site

Production domain: https://maxalena.com

This rebuild keeps the existing Supabase project as the CMS:

- Project: `jbkxmvpcqgpjprkhppve`
- Tables: `books`, `characters`, `site_settings`, `newsletter_subscribers`, `contact_messages`
- Public newsletter and contact forms are disconnected. Historical rows are retained.

## Local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Required environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional)

## Deploy (Vercel)

1. Import this repository.
2. Set the environment variables.
3. Add custom domain `maxalena.com` and `www.maxalena.com`.
4. Point DNS at Vercel.

Admin: `/admin/login` (not linked in the public footer).
