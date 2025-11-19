# 🚀 Quick Start Guide

## Start Backend Server

```bash
# Navigate to server folder
cd server

# Install dependencies (first time only)
npm install

# Create .env file (first time only)
cp .env.example .env

# Make sure MongoDB is running
brew services start mongodb-community  # macOS
# OR
sudo systemctl start mongod  # Linux

# Seed database (first time only)
npm run seed

# Start server
npm run dev
```

Server will run on: **http://localhost:3000**

---

## Start Flutter App

```bash
# Navigate to Flutter app folder
cd "geeta book app"

# Install dependencies (first time only)
flutter pub get

# Generate code (first time only and after model changes)
flutter pub run build_runner build --delete-conflicting-outputs

# Run on your preferred platform
flutter run  # Will prompt to select device

# OR run on specific platform
flutter run -d chrome      # Web
flutter run -d android     # Android
flutter run -d ios         # iOS
```

---

## First Time Setup Checklist

- [ ] Flutter SDK installed
- [ ] Node.js installed
- [ ] MongoDB installed (or MongoDB Atlas URI ready)
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] Backend `.env` file created and configured
- [ ] Database seeded (`npm run seed`)
- [ ] Backend server running (`npm run dev`)
- [ ] Flutter dependencies installed (`cd "geeta book app" && flutter pub get`)
- [ ] Code generated (`flutter pub run build_runner build --delete-conflicting-outputs`)
- [ ] Flutter app running (`flutter run`)

---

## Common Commands

### Backend
```bash
npm start          # Production mode
npm run dev        # Development mode with auto-reload
npm run seed       # Seed database with initial data
```

### Flutter
```bash
flutter pub get                                           # Install dependencies
flutter run                                               # Run app
flutter build apk --release                               # Build Android APK
flutter build web --release                               # Build for web
flutter clean                                             # Clean build files
flutter pub run build_runner build --delete-conflicting-outputs  # Generate code
```

---

## Default Access

- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/health
- **API Docs**: http://localhost:3000

---

## Troubleshooting

### Backend won't start
1. Check if MongoDB is running
2. Verify `.env` configuration
3. Check if port 3000 is available

### Flutter build errors
1. Run `flutter clean`
2. Run `flutter pub get`
3. Run `flutter pub run build_runner build --delete-conflicting-outputs`
4. Try running again

### MongoDB connection error
1. Start MongoDB: `brew services start mongodb-community`
2. Check connection string in `.env`
3. For Atlas, verify network access settings

---

## Next Steps

1. ✅ Complete the setup above
2. 📱 Explore the app features
3. 🔧 Customize theme in `lib/core/theme/app_theme.dart`
4. 📚 Add more verse content through the API
5. 🎨 Implement additional activity types (quiz, audio player, etc.)
6. 🧪 Add tests for your features
7. 🚀 Deploy to production

---

**Need Help?** Check `SETUP_GUIDE.md` for detailed instructions.
