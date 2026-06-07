# Build iOS From Windows

You cannot compile or upload an iOS App Store binary directly on Windows because iOS archives require Apple's macOS/Xcode toolchain. The Windows-friendly way is:

1. Build and host the web app on Render.
2. Push this repo to GitHub.
3. Use a cloud macOS builder to create and upload the iOS `.ipa`.

This repo includes two cloud options:

- GitHub Actions: `.github/workflows/ios-cloud-build.yml`
- Codemagic: `codemagic.yaml`

## Recommended For You

Use Codemagic if you want the least pain. It has a web dashboard for Apple signing and TestFlight upload.

Use GitHub Actions if you are comfortable creating Apple certificates and provisioning profiles yourself.

## Required Apple Account Items

You need an Apple Developer account.

Create these in Apple Developer / App Store Connect:

- Bundle ID: `com.dragonmind.mahjong`
- App Store Connect app record
- iOS Distribution certificate
- App Store provisioning profile
- App Store Connect API key

## GitHub Actions Secrets

Add these in GitHub repo settings:

```text
APPLE_TEAM_ID=
IOS_CERTIFICATE_P12_BASE64=
IOS_CERTIFICATE_PASSWORD=
IOS_PROVISIONING_PROFILE_BASE64=
KEYCHAIN_PASSWORD=
APP_STORE_CONNECT_API_KEY_ID=
APP_STORE_CONNECT_ISSUER_ID=
APP_STORE_CONNECT_API_KEY_BASE64=
```

How to make the base64 values on Windows PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("certificate.p12")) | Set-Clipboard
[Convert]::ToBase64String([IO.File]::ReadAllBytes("profile.mobileprovision")) | Set-Clipboard
[Convert]::ToBase64String([IO.File]::ReadAllBytes("AuthKey_XXXXXX.p8")) | Set-Clipboard
```

Run the workflow manually from GitHub Actions and enter your Render URL.

## Codemagic Variables

In Codemagic, connect the GitHub repo and add:

```text
NEXT_PUBLIC_APP_URL=https://your-render-service.onrender.com
APPLE_TEAM_ID=
```

Then configure iOS code signing in Codemagic's UI using App Store Connect integration.

## Render Envs

Render keeps all server secrets:

```text
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-render-service.onrender.com
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

## iOS Public Envs Only

Do not put secrets in the iOS bundle.

```text
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```
