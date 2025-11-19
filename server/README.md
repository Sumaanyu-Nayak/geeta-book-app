# Geeta Book Server 🚀

Backend API server for the Geeta Book application built with Node.js, Express, and MongoDB.

## Features

- RESTful API for chapters, verses, activities, and user progress
- MongoDB database with Mongoose ODM
- CORS enabled for cross-origin requests
- Security headers with Helmet
- Request logging with Morgan
- Compression middleware for performance
- Environment-based configuration

## Prerequisites

- Node.js (>= 16.0.0)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/geeta-book
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Seeding the Database

To populate the database with initial data (18 chapters and activities):

```bash
npm run seed
```

## API Endpoints

### Chapters
- `GET /api/chapters` - Get all chapters
- `GET /api/chapters/:id` - Get chapter by ID
- `POST /api/chapters` - Create new chapter
- `PUT /api/chapters/:id` - Update chapter
- `DELETE /api/chapters/:id` - Delete chapter

### Verses
- `GET /api/verses` - Get all verses
- `GET /api/verses/chapter/:chapterId` - Get verses by chapter
- `GET /api/verses/:verseId` - Get single verse
- `POST /api/verses` - Create new verse
- `PUT /api/verses/:verseId` - Update verse
- `DELETE /api/verses/:verseId` - Delete verse

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/chapter/:chapterId` - Get activities by chapter
- `GET /api/activities/:activityId` - Get single activity
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:activityId` - Update activity
- `DELETE /api/activities/:activityId` - Delete activity

### User Progress
- `GET /api/progress?userId=default` - Get user progress
- `POST /api/progress/verse/:verseId/complete` - Mark verse as complete
- `POST /api/progress/activity/:activityId/complete` - Mark activity as complete
- `POST /api/progress/chapter/:chapterId/complete` - Mark chapter as complete
- `DELETE /api/progress/reset` - Reset progress

### Health Check
- `GET /health` - Server health status

## Project Structure

```
server/
├── src/
│   ├── models/          # Mongoose models
│   │   ├── Chapter.js
│   │   ├── Verse.js
│   │   ├── Activity.js
│   │   └── UserProgress.js
│   ├── routes/          # API routes
│   │   ├── chapters.js
│   │   ├── verses.js
│   │   ├── activities.js
│   │   └── progress.js
│   ├── scripts/         # Utility scripts
│   │   └── seedData.js
│   └── server.js        # Main server file
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

## Data Models

### Chapter Schema
```javascript
{
  number: Number,
  titleSanskrit: String,
  titleEnglish: String,
  titleHindi: String,
  description: String,
  verseCount: Number,
  imageUrl: String,
  videoUrl: String,
  keyThemes: [String],
  totalActivities: Number
}
```

### Verse Schema
```javascript
{
  chapterId: String,
  verseNumber: Number,
  textSanskrit: String,
  textTransliteration: String,
  translationEnglish: String,
  translationHindi: String,
  explanation: String,
  videoUrl: String,
  audioUrl: String,
  images: [String]
}
```

### Activity Schema
```javascript
{
  chapterId: String,
  title: String,
  description: String,
  type: enum['read', 'watch', 'listen', 'quiz', 'reflection', 'discussion', 'dailyVerse'],
  iconUrl: String
}
```

### UserProgress Schema
```javascript
{
  userId: String,
  totalChaptersCompleted: Number,
  totalVersesCompleted: Number,
  totalActivitiesCompleted: Number,
  chapterProgress: Map,
  completedVerses: [{ verseId, completedAt }],
  completedActivities: [{ activityId, completedAt }]
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment (development/production) | development |
| PORT | Server port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/geeta-book |
| JWT_SECRET | JWT secret for authentication | - |
| CORS_ORIGINS | Allowed CORS origins (comma-separated) | * |

## Security

- Helmet.js for security headers
- CORS configured for specific origins
- Input validation on all endpoints
- MongoDB injection prevention through Mongoose

## Performance

- Response compression enabled
- Database indexes on frequently queried fields
- Efficient query patterns with Mongoose

## Future Enhancements

- [ ] User authentication with JWT
- [ ] Rate limiting
- [ ] Caching with Redis
- [ ] File upload for images/videos
- [ ] Search functionality
- [ ] Analytics and statistics
- [ ] WebSocket support for real-time features

## License

MIT
