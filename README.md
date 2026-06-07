# DragonMind Mahjong

**Learn. Analyze. Master Every Mahjong Variant.**

DragonMind Mahjong is a mobile-first Mahjong training platform scaffold built with Next.js, TypeScript, Tailwind CSS, Supabase, Stripe, Razorpay, PWA support, and Capacitor mobile packaging.

## What Is Included

- Mobile-first responsive product UI
- PWA manifest and install prompt
- Capacitor config for iOS and Android wrapping
- Variant registry for Riichi, Sanma, Hong Kong, MCR, Taiwanese, American, Singapore, Malaysian, Filipino, Korean, Sichuan, Classical Chinese, British, Australian, tournament and custom rules
- Dedicated deterministic Mahjong engine modules
- Shanten, ukeire, discard ranking, scoring estimate and danger estimate foundation
- Analyze API route
- Admin American Mahjong yearly card upload API route
- Stripe and Razorpay checkout route foundations
- Supabase PostgreSQL schema and RLS policies
- Admin dashboard UI scaffold
- CMS tables for contact info, about pages, announcements, lessons and blog posts

## Run Locally

```powershell
npm install
npm run dev
```

Open `http://localhost:4173`.

## Environment

Copy `.env.example` to `.env.local` and fill in Supabase, Stripe, Razorpay, auth provider and Resend keys.

For hosting/mobile templates:

- Render: `.env.render.template`
- iOS public envs only: `.env.ios.template`
- Render deployment guide: `docs/render.md`
- iOS guide: `docs/ios.md`
- Free Apple account path: `docs/free-apple-account.md`
- Account/env checklist: `docs/account-env-checklist.md`

## Database

Run:

```text
supabase/migrations/001_dragonmind_schema.sql
```

Then create the initial admin Supabase Auth user:

- Username: `admin`
- Password: `Devshah@11`
- Force password change on first login

See `docs/deployment.md` for production notes.

## Important Status

This is a production-grade foundation, not a completed commercial Mahjong AI across every ruleset yet. The Riichi-style hand analysis engine is implemented first and the architecture is ready for exact variant-by-variant scoring tables, replay parsers, American Mahjong annual card matching and calibrated opponent modeling.
