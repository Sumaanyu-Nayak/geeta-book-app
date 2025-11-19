# 🕉️ Complete Geeta Book App - Setup Guide

A comprehensive, youth-oriented Flutter application for learning the Bhagavad Geeta with video explanations, interactive activities, and progress tracking. Built with clean architecture and best practices for Android, iOS, and Web platforms.

## 📋 Project Overview

This project consists of two main components:
1. **Flutter Mobile/Web App** - Cross-platform frontend application
2. **Node.js Backend Server** - RESTful API with MongoDB database

## 🎯 Features

### Flutter App Features
- ✨ Modern, youth-friendly UI with gradient themes
- 📱 Responsive design for mobile, tablet, and web
- 🎥 Video player for verse explanations
- 📖 Sanskrit verses with transliteration and translation
- 🎯 Interactive activities (read, watch, listen, quiz, reflection, discussion)
- 📊 Progress tracking with local caching and server sync
- 🌓 Dark/Light mode support
- 🎨 Smooth animations and transitions
- 💾 Offline support with Hive local storage
- 🔄 State management with Riverpod

### Backend Features
- 🚀 RESTful API with Express.js
- 🗄️ MongoDB database with Mongoose ODM
- 📚 Complete data for all 18 chapters
- 🔒 Security with Helmet.js
- 📈 Request logging and compression
- 🌐 CORS enabled
- ♻️ Data seeding scripts

## 🚀 Getting Started

### Prerequisites

- **Flutter SDK** (>= 3.0.0) - [Install Flutter](https://flutter.dev/docs/get-started/install)
- **Dart SDK** (>= 3.0.0) - Comes with Flutter
- **Node.js** (>= 16.0.0) - [Install Node.js](https://nodejs.org/)
- **MongoDB** - [Install MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Android Studio** / **Xcode** (for mobile development)
- **VS Code** or **Android Studio** (recommended IDEs)

## 📦 Installation

### 1. Clone the Repository

```bash
cd "/Users/sumaanyu/Programming/Geeta-book-work/fluttter-app"
```

### 2. Setup Backend Server

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/geeta-book
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/geeta-book

# Start MongoDB (if using local installation)
# On macOS with Homebrew:
brew services start mongodb-community

# Seed the database with initial data
npm run seed

# Start the development server
npm run dev
```

The server will start on `http://localhost:3000`

### 3. Setup Flutter App

```bash
cd "geeta book app"

# Install dependencies
flutter pub get

# Generate code for models and providers
flutter pub run build_runner build --delete-conflicting-outputs

# Update the API base URL in lib/core/config/app_config.dart if needed
# Default is http://localhost:3000/api
```

### 4. Run the Flutter App

#### For Android
```bash
flutter run -d android
```

#### For iOS
```bash
flutter run -d ios
```

#### For Web
```bash
flutter run -d chrome
```

#### For specific device
```bash
# List available devices
flutter devices

# Run on specific device
flutter run -d <device-id>
```

## 🏗️ Project Structure

### Flutter App Structure
```
geeta book app/
├── lib/
│   ├── core/
│   │   ├── config/          # App configuration
│   │   ├── theme/           # Themes and styling
│   │   ├── router/          # Navigation setup
│   │   └── widgets/         # Reusable widgets
│   ├── features/
│   │   ├── home/            # Home page with chapter grid
│   │   ├── chapter/         # Chapter detail page
│   │   └── verse/           # Verse detail with video
│   ├── shared/
│   │   ├── domain/
│   │   │   └── models/      # Data models
│   │   ├── data/
│   │   │   └── repositories/ # Data layer
│   │   └── providers/       # Riverpod providers
│   └── main.dart            # App entry point
├── assets/                   # Images, fonts, etc.
├── pubspec.yaml             # Dependencies
└── README.md

```

### Server Structure
```
server/
├── src/
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── scripts/             # Seed scripts
│   └── server.js            # Server entry point
├── .env.example             # Environment template
├── package.json
└── README.md
```

## 🧪 Running Tests

### Flutter Tests
```bash
cd "geeta book app"

# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Run integration tests
flutter test integration_test
```

### Server Tests
```bash
cd server
# Add tests as needed
npm test
```

## 📱 Building for Production

### Android APK
```bash
cd "geeta book app"
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk
```

### Android App Bundle (for Play Store)
```bash
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

### iOS
```bash
flutter build ios --release
# Then open in Xcode and archive
```

### Web
```bash
flutter build web --release
# Output: build/web/
```

## 🎨 Customization

### Changing Theme Colors
Edit `lib/core/theme/app_theme.dart`:
```dart
static const Color primaryOrange = Color(0xFFFF6B35);
static const Color accentPurple = Color(0xFF7209B7);
// Modify colors as needed
```

### Changing API Base URL
Edit `lib/core/config/app_config.dart`:
```dart
static const String apiBaseUrl = 'https://your-api-url.com/api';
```

### Adding More Languages
Extend the models in `lib/shared/domain/models/` to include additional language fields.

## 🔧 Troubleshooting

### Common Flutter Issues

**Issue**: Dependencies not installing
```bash
flutter pub get --verbose
flutter pub cache repair
```

**Issue**: Build errors after adding dependencies
```bash
flutter clean
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
```

**Issue**: iOS build fails
```bash
cd ios
pod install
pod update
cd ..
flutter clean
flutter run
```

### Common Server Issues

**Issue**: MongoDB connection error
- Ensure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Linux)
- Check connection string in `.env` file
- For MongoDB Atlas, ensure IP whitelist is configured

**Issue**: Port 3000 already in use
```bash
# Change PORT in .env file or kill the process
lsof -ti:3000 | xargs kill -9
```

## 📚 API Documentation

Server API is available at `http://localhost:3000` when running. Visit the root endpoint for available routes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Code Quality

### Flutter
```bash
# Format code
flutter format .

# Analyze code
flutter analyze

# Fix common issues
dart fix --apply
```

### Server
```bash
# Use ESLint (add to project as needed)
npm install --save-dev eslint
npx eslint src/
```

## 🚀 Deployment

### Frontend (Flutter Web)
Deploy to Firebase Hosting, Netlify, or Vercel:
```bash
flutter build web --release
# Upload build/web/ to hosting service
```

### Backend (Node.js Server)
Deploy to Heroku, AWS, DigitalOcean, or Railway:
```bash
# Ensure .env is configured for production
# Set NODE_ENV=production
# Use MongoDB Atlas for production database
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Bhagavad Geeta translations and explanations
- Flutter and Dart communities
- Node.js and Express.js communities
- Open source contributors

## 📧 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review Flutter and Node.js documentation

---

Made with ❤️ for spreading the wisdom of the Bhagavad Geeta to the youth
