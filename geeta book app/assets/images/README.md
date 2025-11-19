# App Logo Setup

## Required Action

**Please save the attached app logo image as:**
```
app_logo.png
```
in this directory (`assets/images/`).

The logo should be the orange book icon with Geeta symbols that was provided.

## After Adding the Logo

Run these commands from the Flutter app root:

```bash
# Install dependencies (including launcher icon generator)
flutter pub get

# Generate native launcher icons for Android & iOS
dart run flutter_launcher_icons

# Clean and rebuild
flutter clean
flutter pub get

# Run the app
flutter run
```

## What This Does

- **In-App Logo**: The logo appears in the home page header
- **Launcher Icons**: Generates Android and iOS app icons from your logo
- **Adaptive Icons**: Creates Android adaptive icons with an orange background

## Current Configuration

- Icon background color: `#FFA726` (orange, matching your app theme)
- Platforms: Android + iOS
- Min SDK: Android 21+

## Troubleshooting

If you see "asset not found" errors:
1. Verify `app_logo.png` exists in `assets/images/`
2. Run `flutter pub get` again
3. Hot restart the app (not just hot reload)

---

**Note**: This directory was created automatically. The actual logo file needs to be added manually by you.
