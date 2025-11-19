# 🕉️ Geeta Book App - Logo Setup Guide

## 📋 Quick Start

### Step 1: Add the Logo Image

Save the provided orange book logo image as:
```
/Users/sumaanyu/Programming/Geeta-book-work/fluttter-app/geeta book app/assets/images/app_logo.png
```

### Step 2: Install Dependencies & Generate Icons

```bash
cd "/Users/sumaanyu/Programming/Geeta-book-work/fluttter-app/geeta book app"

# Install all dependencies including flutter_launcher_icons
flutter pub get

# Generate native Android & iOS launcher icons
dart run flutter_launcher_icons

# Clean build cache
flutter clean

# Get dependencies again (ensures clean state)
flutter pub get
```

### Step 3: Run the App

```bash
# For development
flutter run

# Or for web
flutter run -d chrome

# Or for a specific device
flutter devices  # List available devices
flutter run -d <device-id>
```

---

## ✨ What Was Configured

### 1. **In-App Logo Display**
- **Location**: Home page header (SliverAppBar)
- **File Modified**: `lib/features/home/presentation/pages/home_page.dart`
- **Display**: 80x80 image instead of icon
- **Animation**: FadeInDown entrance animation

### 2. **Native Launcher Icons**
- **Platforms**: Android + iOS
- **Package**: `flutter_launcher_icons: ^0.13.1`
- **Configuration**: Added to `pubspec.yaml`
- **Android**: Adaptive icons with orange background (#FFA726)
- **iOS**: Standard app icon
- **Min SDK**: Android 21+

### 3. **Asset Configuration**
- **Enabled Paths**:
  - `assets/images/` - For logo and images
  - `assets/icons/` - For custom icons
  - `assets/videos/` - For video files
  - `assets/data/` - For JSON/data files
- **Directories Created**: All asset folders are now in place

### 4. **App Metadata**
- **App Title**: "Geeta Book - Bhagavad Geeta for Youth"
- **Package**: `geeta_book_app`
- **Version**: 1.0.0+1

---

## 🎨 Logo Specifications

### Current Usage
- **Home Page**: 80x80 px display
- **Launcher Icon**: 1024x1024 recommended source (will be resized)
- **Format**: PNG with transparency
- **Colors**: Orange theme (#FFA726 background for adaptive icons)

### Design Details
The logo features:
- Open book with flames and Geeta symbols
- Orange/cream color scheme
- Lotus, conch shell, chakra, and DNA helix motifs
- Represents knowledge, spirituality, and modern relevance

---

## 📂 Project Structure

```
geeta book app/
├── assets/
│   ├── images/
│   │   ├── app_logo.png        ← ADD THIS FILE
│   │   └── README.md           ← Setup instructions
│   ├── icons/
│   ├── videos/
│   └── data/
├── lib/
│   ├── main.dart               ✓ Updated app title
│   └── features/
│       └── home/
│           └── presentation/
│               └── pages/
│                   └── home_page.dart  ✓ Using logo
└── pubspec.yaml                ✓ Assets + launcher icons configured
```

---

## 🔧 Troubleshooting

### Issue: "Unable to load asset: assets/images/app_logo.png"
**Solution**:
1. Verify the file exists at the exact path
2. Check file name is `app_logo.png` (case-sensitive)
3. Run `flutter pub get` again
4. **Hot restart** (not hot reload) - stop and re-run `flutter run`

### Issue: Launcher icons not updating
**Solution**:
```bash
# Re-generate icons
dart run flutter_launcher_icons

# For Android, uninstall old app first
flutter clean
flutter pub get
flutter run
```

### Issue: Build errors after adding logo
**Solution**:
```bash
flutter clean
rm -rf build/
flutter pub get
flutter run
```

---

## 🚀 Next Steps (Optional)

### Add Splash Screen
Consider adding `flutter_native_splash` to show the logo on app startup:

```yaml
dev_dependencies:
  flutter_native_splash: ^2.3.8

flutter_native_splash:
  color: "#FFA726"
  image: assets/images/app_logo.png
  android: true
  ios: true
```

Then run: `dart run flutter_native_splash:create`

### Add Logo to Other Pages
The logo is currently on the home page. You can add it to:
- About/Settings page
- App drawer
- Empty states
- Error pages

---

## 📝 Summary

**What you need to do NOW:**
1. Save the attached orange book logo as `app_logo.png` in `assets/images/`
2. Run the commands in Step 2 above
3. Run the app with `flutter run`

**What's already done:**
- ✅ Asset folders created
- ✅ `pubspec.yaml` configured
- ✅ Home page updated to use logo
- ✅ Launcher icon generator installed
- ✅ App title updated

---

**Questions?** Check the troubleshooting section or refer to:
- [Flutter Assets Documentation](https://docs.flutter.dev/development/ui/assets-and-images)
- [flutter_launcher_icons Package](https://pub.dev/packages/flutter_launcher_icons)
