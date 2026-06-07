# Account And Env Checklist

I cannot create these accounts or generate real private keys for you. Create the accounts, copy the values, then paste them into Render/Codemagic.

## 1. Render

Create a Render account and deploy the GitHub repo with `render.yaml`.

Set:

```text
NEXT_PUBLIC_APP_URL=https://your-render-service.onrender.com
```

## 2. Supabase

Create a Supabase project.

Project Settings > API:

```text
NEXT_PUBLIC_SUPABASE_URL=Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon public key
SUPABASE_SERVICE_ROLE_KEY=service_role secret key
```

Run:

```text
supabase/migrations/001_dragonmind_schema.sql
```

Create the admin auth user:

```text
username/email: admin
password: Devshah@11
```

Then set that profile to:

```text
role=admin
force_password_change=true
```

## 3. Stripe

Stripe Dashboard > Developers > API keys:

```text
STRIPE_SECRET_KEY=sk_test_or_live...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_or_live...
```

Stripe Dashboard > Webhooks:

```text
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 4. Razorpay

Razorpay Dashboard > Account & Settings > API Keys:

```text
RAZORPAY_KEY_ID=rzp_test_or_live...
RAZORPAY_KEY_SECRET=secret...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_or_live...
```

## 5. Google Login

Google Cloud Console > OAuth consent screen + OAuth client:

```text
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Add callback URL from Supabase Auth providers.

## 6. Apple Login

Paid Apple Developer membership is needed for production Sign in with Apple.

```text
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
APPLE_PRIVATE_KEY=
```

## 7. Resend

Resend Dashboard > API Keys:

```text
RESEND_API_KEY=re_...
```

## 8. OpenAI

Optional. The app has a deterministic Mahjong engine already. Use OpenAI only for richer natural-language explanations.

```text
OPENAI_API_KEY=
```

## Render Env Paste List

```text
NODE_ENV=production
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
APPLE_PRIVATE_KEY=
RESEND_API_KEY=
OPENAI_API_KEY=
```

## Codemagic Env Paste List

With a free Apple account, skip Codemagic App Store upload. Use PWA install instead.

With paid Apple:

```text
NEXT_PUBLIC_APP_URL=
APPLE_TEAM_ID=
```

## iPhone Install Popup

The app now shows an install modal.

- Chrome/Android/desktop PWA: users tap Install and approve the browser popup.
- iPhone Safari: Apple does not allow automatic install. The popup tells users to tap Share > Add to Home Screen > Add.
