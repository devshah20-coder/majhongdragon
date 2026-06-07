# Free Apple Developer Account Path

With a free Apple developer account, you cannot publish to the App Store or TestFlight.

The best Windows-friendly path is:

1. Deploy DragonMind Mahjong to Render.
2. Open the Render URL in Safari on iPhone.
3. Tap Share.
4. Tap Add to Home Screen.
5. Launch DragonMind Mahjong from the iPhone home screen.

This gives users the app-like PWA experience without App Store distribution.

## What Free Apple Account Can Do

- Access Apple developer tools and documentation.
- Test locally with Xcode if you have access to a Mac.
- Install development builds onto your own device from Xcode.

## What Free Apple Account Cannot Do

- Submit to App Store.
- Use TestFlight.
- Create App Store distribution certificates.
- Use Codemagic/GitHub Actions to upload a real App Store `.ipa`.

## Best Recommendation

Use the PWA route first. It works from Windows and does not require paid Apple membership.

When you are ready for App Store/TestFlight, upgrade to the paid Apple Developer Program.
