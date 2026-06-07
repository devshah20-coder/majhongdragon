# iOS Build Files

Capacitor is already configured in `capacitor.config.ts`.

## Important

Server secrets must stay on Render or Supabase. The iOS app should only receive public values from `.env.ios.template`.

If you only have Windows, use `docs/windows-ios-cloud.md`. It explains the GitHub Actions and Codemagic macOS cloud build paths.

## Generate iOS Project

Run these on a Mac with Xcode:

```bash
npm install
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

Then in Xcode:

1. Set your Apple Team.
2. Set bundle id: `com.dragonmind.mahjong`.
3. Add signing.
4. Test on iPhone.
5. Archive and submit to App Store Connect.

## Android

```bash
npx cap add android
npx cap sync android
npx cap open android
```

Android Studio is required for Play Store builds.
