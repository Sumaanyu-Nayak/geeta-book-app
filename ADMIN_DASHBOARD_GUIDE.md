# Geeta Book Admin Dashboard - Complete Guide

## 🎉 Overview

A complete Next.js 14 admin dashboard for managing the Bhagavad Geeta book app content, with full CRUD operations for chapters, verses, and activities.

## 📁 Project Structure

```
geeta-book-admin/
├── src/
│   ├── app/
│   │   ├── login/page.tsx                    # Login page
│   │   ├── dashboard/
│   │   │   ├── page.tsx                      # Main dashboard with analytics
│   │   │   ├── chapters/
│   │   │   │   ├── page.tsx                  # List all chapters
│   │   │   │   ├── new/page.tsx              # Create new chapter
│   │   │   │   └── [id]/edit/page.tsx        # Edit existing chapter
│   │   │   ├── verses/
│   │   │   │   ├── page.tsx                  # List all verses (with filter)
│   │   │   │   ├── new/page.tsx              # Create new verse
│   │   │   │   └── [id]/edit/page.tsx        # Edit existing verse
│   │   │   └── activities/
│   │   │       ├── page.tsx                  # List all activities (with filters)
│   │   │       ├── new/page.tsx              # Create new activity
│   │   │       └── [id]/edit/page.tsx        # Edit existing activity
│   │   └── layout.tsx
│   ├── components/
│   │   └── DashboardLayout.tsx               # Main layout with sidebar
│   └── lib/
│       └── api.ts                            # API client functions
└── package.json

admin-server/
├── src/
│   ├── server.js                             # Main Express server with public routes
│   ├── models/
│   │   ├── AdminUser.js                      # Admin user model
│   │   ├── Chapter.js                        # Chapter model (local copy)
│   │   ├── Verse.js                          # Verse model (local copy)
│   │   ├── Activity.js                       # Activity model (local copy)
│   │   ├── VerseActivity.js                  # Verse activity model (local copy)
│   │   ├── UserProgress.js                   # User progress model (local copy)
│   │   └── index.js                          # Model exports
│   ├── controllers/
│   │   ├── authController.js                 # Login/authentication
│   │   ├── analyticsController.js            # Dashboard analytics
│   │   ├── chapterController.js              # Chapter CRUD
│   │   ├── verseController.js                # Verse CRUD
│   │   └── activityController.js             # Activity CRUD
│   ├── routes/
│   │   ├── auth.js                           # Auth routes
│   │   ├── analytics.js                      # Analytics routes
│   │   ├── chapters.js                       # Chapter routes
│   │   ├── verses.js                         # Verse routes
│   │   └── activities.js                     # Activity routes
│   └── middleware/
│       └── auth.js                           # JWT authentication
└── package.json
```

## ✨ Features

### 🔐 Authentication
- Secure JWT-based authentication
- Bcrypt password hashing
- Protected routes with middleware
- Persistent login state

### 📊 Dashboard
- Total chapters, verses, activities count
- User statistics
- Interactive charts with Recharts
- Real-time analytics

### 📚 Chapter Management
- **List View**: Grid cards with chapter info
- **Create**: Form with all chapter fields (Sanskrit, English, Hindi titles, description, themes)
- **Edit**: Update chapter details, manage key themes
- **Delete**: Remove chapter and associated verses
- **Fields**: 
  - Chapter number (1-18)
  - Titles in 3 languages
  - Description
  - Verse count
  - Key themes (tags)
  - Image/Video URLs
  - Total activities

### 📖 Verse Management
- **List View**: Detailed cards with Sanskrit text, transliteration, and translations
- **Filter**: By chapter dropdown
- **Create**: Multi-language verse form
- **Edit**: Update all verse fields
- **Delete**: Remove individual verses
- **Fields**:
  - Chapter ID & verse number
  - Sanskrit text
  - Transliteration
  - English & Hindi translations
  - Detailed explanation
  - Video/Audio URLs
  - Image gallery

### 🎯 Activity Management
- **List View**: Grid cards with activity type badges
- **Filter**: By chapter and activity type
- **Create**: Activity creation form
- **Edit**: Update activity details
- **Delete**: Remove activities
- **Activity Types**:
  - Read, Watch, Experiments, Listen
  - Quiz, Reflection, Discussion, Daily Verse
- **Fields**:
  - Chapter ID
  - Title & description
  - Type (8 options)
  - Icon URL

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   # Install admin dashboard dependencies
   cd geeta-book-admin
   npm install
   
   # Install admin server dependencies
   cd ../admin-server
   npm install
   ```

2. **Configure Environment**
   
   Create `admin-server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://your-connection-string/geeta-book
   JWT_SECRET=your-secure-jwt-secret-key
   PORT=4000
   NODE_ENV=development
   ```

3. **Seed Admin User**
   ```bash
   cd admin-server
   npm run seed
   ```
   
   Default credentials:
   - Email: `admin@geeta.com`
   - Password: `admin123`

4. **Start Servers**
   
   Terminal 1 - Admin Server:
   ```bash
   cd admin-server
   npm run dev
   ```
   
   Terminal 2 - Admin Dashboard:
   ```bash
   cd geeta-book-admin
   npm run dev
   ```

5. **Access Dashboard**
   - Open http://localhost:3001
   - Login with admin credentials
   - Start managing content!

## 🔌 API Endpoints

### Public Endpoints (No Auth Required)
```
GET    /api/chapters              # List all chapters
GET    /api/chapters/:id          # Get chapter by number
GET    /api/verses                # List all verses (optional: ?chapterId=1)
GET    /api/verses/:id            # Get verse by ID
GET    /api/activities            # List all activities (optional: ?chapterId=1)
GET    /api/activities/:id        # Get activity by ID
```

### Protected Endpoints (Auth Required)
```
POST   /api/admin/login           # Admin login

GET    /api/admin/analytics       # Dashboard stats
POST   /api/admin/chapters        # Create chapter
PUT    /api/admin/chapters/:id    # Update chapter
DELETE /api/admin/chapters/:id    # Delete chapter

POST   /api/admin/verses          # Create verse
PUT    /api/admin/verses/:id      # Update verse
DELETE /api/admin/verses/:id      # Delete verse

POST   /api/admin/activities      # Create activity
PUT    /api/admin/activities/:id  # Update activity
DELETE /api/admin/activities/:id  # Delete activity
```

## 🎨 Tech Stack

### Frontend (Admin Dashboard)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Notifications**: React Hot Toast

### Backend (Admin Server)
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose 8.0
- **Authentication**: JWT + bcryptjs
- **Environment**: dotenv
- **CORS**: Enabled for cross-origin requests

## 🔧 Configuration

### MongoDB Connection
The admin server uses its own mongoose connection and local model definitions to avoid conflicts with the main server. All models are duplicated in `/admin-server/src/models/` with identical schemas.

### JWT Authentication
- Tokens expire in 30 days
- Stored in localStorage on client
- Verified via middleware on protected routes
- Automatic token refresh on API calls

### CORS Settings
Configured to accept requests from:
- http://localhost:3001 (Admin Dashboard)
- http://localhost:3000 (Main App)

## 📝 Data Models

### Chapter Schema
```javascript
{
  number: Number (1-18, unique),
  titleSanskrit: String,
  titleEnglish: String,
  titleHindi: String,
  description: String,
  verseCount: Number,
  imageUrl: String,
  videoUrl: String,
  keyThemes: [String],
  totalActivities: Number (default: 7),
  timestamps: true
}
```

### Verse Schema
```javascript
{
  chapterId: Number (1-18),
  verseNumber: Number,
  textSanskrit: String,
  textTransliteration: String,
  translationEnglish: String,
  translationHindi: String,
  explanation: String,
  videoUrl: String,
  audioUrl: String,
  images: [String],
  timestamps: true
}
```

### Activity Schema
```javascript
{
  chapterId: Number (1-18),
  title: String,
  description: String,
  type: Enum ['read', 'watch', 'experiments', 'listen', 
              'quiz', 'reflection', 'discussion', 'dailyVerse'],
  iconUrl: String,
  timestamps: true
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check connection string includes database name: `/geeta-book`
- Verify credentials are correct

### Model Buffering Timeout
✅ **FIXED**: Admin server now uses local model definitions with its own mongoose connection. No more cross-instance conflicts!

### Authentication Errors
- Clear localStorage and login again
- Check JWT_SECRET matches in .env
- Verify token hasn't expired

### CORS Errors
- Ensure admin server is running on port 4000
- Check CORS middleware is properly configured
- Verify API_URL in Next.js matches server URL

## 🎯 Best Practices

1. **Always validate input data** on both client and server
2. **Use transactions** for operations affecting multiple collections
3. **Implement proper error handling** with try-catch blocks
4. **Keep models synchronized** between main server and admin server
5. **Regular backups** of MongoDB data
6. **Use environment variables** for sensitive configuration
7. **Test API endpoints** before deploying changes

## 📦 Available Scripts

### Admin Dashboard
```bash
npm run dev      # Start development server (port 3001)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Admin Server
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run seed     # Seed admin user
```

## 🔐 Security Notes

- Admin passwords are hashed with bcrypt (10 rounds)
- JWT tokens are signed with HS256 algorithm
- All admin routes protected with authentication middleware
- Never commit .env file to version control
- Use strong JWT_SECRET in production
- Implement rate limiting for production deployments

## 🚀 Deployment Checklist

- [ ] Update MongoDB URI for production
- [ ] Generate strong JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for production domains
- [ ] Enable HTTPS
- [ ] Set up proper logging
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Set up monitoring
- [ ] Create database backups

## 📧 Support

For issues or questions:
1. Check this documentation first
2. Review error logs in terminal
3. Verify all environment variables are set
4. Test API endpoints with tools like Postman

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Status**: ✅ Production Ready
