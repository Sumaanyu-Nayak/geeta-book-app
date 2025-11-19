# Camera Permissions Setup for QR Scanner

## Overview
The QR code scanner feature requires camera permissions to work on real devices. Follow these steps to enable camera access for both Android and iOS.

## Android Setup

### 1. Update AndroidManifest.xml
Add camera permission to `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- Add this line before the <application> tag -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
    
    <application
        ...>
        ...
    </application>
</manifest>
```

### 2. Update build.gradle (if needed)
Ensure `minSdkVersion` is at least 21 in `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        minSdkVersion 21  // Required for mobile_scanner
        ...
    }
}
```

## iOS Setup

### 1. Update Info.plist
Add camera usage description to `ios/Runner/Info.plist`:

```xml
<dict>
    ...
    <!-- Add these keys -->
    <key>NSCameraUsageDescription</key>
    <string>This app needs camera access to scan QR codes for verses and chapters.</string>
    
    <!-- Optional: If you want to use the photo library -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>This app needs photo library access to scan QR codes from images.</string>
    ...
</dict>
```

### 2. Update Podfile (if needed)
Ensure iOS deployment target is at least 12.0 in `ios/Podfile`:

```ruby
platform :ios, '12.0'
```

## Testing

### Simulator/Emulator
- **Android Emulator**: Camera may not work properly. Test on a real device.
- **iOS Simulator**: Camera will not work. Must test on a real device.

### Real Device
1. Build and install the app on your device
2. Open the app and tap the QR scanner icon (top-left of home page)
3. Grant camera permission when prompted
4. Point the camera at a QR code to scan

## QR Code Features

### Current Implementation
- Scans any QR code and displays the content in a dialog
- Torch toggle for low-light scanning
- Camera flip to switch between front/back cameras
- Vibration feedback on successful scan
- Instruction overlay for user guidance

### Future Enhancements
You can extend the scanner to handle specific QR code formats:
- Deep links to specific verses: `geetaapp://chapter/1/verse/1`
- Chapter links: `geetaapp://chapter/2`
- Activity links: `geetaapp://activity/1-1-0`

To implement this, update the `_handleBarcode` method in `qr_scanner_page.dart` to parse the QR code content and navigate accordingly.

## Troubleshooting

### Android
- **Permission denied**: Check if camera permission is added to AndroidManifest.xml
- **Camera not working**: Ensure minSdkVersion is at least 21
- **Build errors**: Run `flutter clean` and rebuild

### iOS
- **Permission dialog not showing**: Check if NSCameraUsageDescription is in Info.plist
- **Camera black screen**: Ensure iOS deployment target is at least 12.0
- **Build errors**: Run `pod install` in ios/ directory

## Package Information
- Package: `mobile_scanner: ^5.2.3`
- Documentation: https://pub.dev/packages/mobile_scanner
- Minimum SDK: Android 21+, iOS 12.0+
