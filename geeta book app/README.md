# Geeta Book App 📖

An interactive, youth-oriented mobile and web application for learning the Bhagavad Geeta through engaging activities, videos, and verses.

## ✨ Features

- 📚 All 18 chapters of Bhagavad Geeta
- 🎥 Video explanations for each verse
- 📝 Sanskrit verses with transliteration and translation
- 🎯 Interactive activities (quizzes, reflection notes, discussions)
- 📊 Progress tracking with completion badges
- 🌓 Dark/Light mode support
- 📱 Responsive design for mobile, tablet, and web
- 💾 Offline support with local caching
- 🔄 Real-time sync with backend server

## 🏗️ Architecture

This app follows **Clean Architecture** principles with feature-first organization:

```
lib/
├── core/                 # Core utilities, themes, constants
│   ├── config/          # App configuration
│   ├── theme/           # App themes (light/dark)
│   ├── constants/       # Constants and enums
│   ├── utils/           # Utility functions
│   └── widgets/         # Reusable widgets
├── features/            # Feature modules
│   ├── home/           # Home page with chapter grid
│   ├── chapter/        # Chapter details and activities
│   ├── verse/          # Verse detail with video player
│   └── profile/        # User profile and progress
└── shared/             # Shared across features
    ├── data/           # Data layer (repositories, APIs)
    ├── domain/         # Domain models
    └── providers/      # Riverpod providers
```

## 🚀 Getting Started

### Prerequisites

- Flutter SDK (>=3.0.0)
- Dart SDK (>=3.0.0)
- Node.js (for backend server)
- Android Studio / Xcode (for mobile development)

### Installation

1. Clone the repository
2. Install Flutter dependencies:
```bash
flutter pub get
```

3. Generate code (for freezed, json_serializable, riverpod):
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

4. Run the app:
```bash
# For mobile
flutter run

# For web
flutter run -d chrome

# For specific platform
flutter run -d android
flutter run -d ios
flutter run -d web
```

## 🎨 Design Principles

- **Youth-Friendly UI**: Modern, vibrant, and engaging design
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Performance**: Optimized animations and lazy loading
- **Responsive**: Adapts to all screen sizes and orientations

## 🧪 Testing

```bash
# Run unit tests
flutter test

# Run integration tests
flutter test integration_test

# Run with coverage
flutter test --coverage
```

## 📦 Build

```bash
# Android APK
flutter build apk --release

# iOS
flutter build ios --release

# Web
flutter build web --release
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 📄 License

This project is licensed under the MIT License.
