# DragonMind Mahjong Deployment

## Frontend

Deploy the Next.js app to Cloudflare Pages. Configure the environment variables from `.env.example`.

## Backend

Create a Supabase project and run `supabase/migrations/001_dragonmind_schema.sql`.

Create the first Supabase Auth user manually or from a secure seed script:

- Username/email alias: `admin`
- Initial password: `Devshah@11`
- Set `profiles.role = 'admin'`
- Set `profiles.force_password_change = true`

The plaintext bootstrap password exists only as deployment metadata and must be removed or rotated after the first admin account is created.

## Mobile Apps

Capacitor is configured for iOS and Android:

```powershell
npm run build
npm run ios:init
npm run android:init
npm run mobile:sync
```

Xcode is required for iOS signing and App Store submission. Android Studio is required for Play Store builds.

## Payments

Stripe checkout is implemented for USD subscriptions. Razorpay order creation is implemented for INR subscriptions and should be completed with client-side Razorpay Checkout plus webhook verification before launch.

## AI Engine

The deterministic engine lives in `src/lib/mahjong`. It should be extended variant by variant with exact scoring tables, American Mahjong card matching, replay parsers, and opponent model calibration.
