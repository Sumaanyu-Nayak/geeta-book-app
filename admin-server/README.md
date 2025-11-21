# Geeta Book Admin Server

A Node.js/Express REST API server for managing the Bhagavad Geeta mobile application. This server provides admin authentication and CRUD operations for chapters, verses, activities, and analytics.

## Features

- 🔐 **JWT Authentication** - Secure admin login with token-based auth
- 📚 **Content Management** - Full CRUD for chapters, verses, and activities
- 📊 **Analytics API** - User stats, content metrics, and engagement data
- 🔒 **Protected Routes** - Middleware-based authentication
- 🗄️ **MongoDB Integration** - Mongoose ODM for data modeling
- ⚡ **Express.js** - Fast, unopinionated web framework
- 🔄 **CORS Enabled** - Cross-origin requests supported

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose 8.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv

## Prerequisites

- Node.js 18.x or higher
- MongoDB running locally or remotely
- npm or yarn

## Installation

### 1. Navigate to the admin server folder

```bash
cd admin-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/geeta-book
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 4. Seed the admin user

```bash
npm run seed
```

This creates a default admin user:
```
Email: admin@geeta.com
Password: admin123
```

### 5. Start the server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on [http://localhost:4000](http://localhost:4000)

## Project Structure

```
admin-server/
├── src/
│   ├── models/                 # Mongoose models
│   │   └── AdminUser.js        # Admin user model
│   ├── controllers/            # Route controllers
│   │   ├── authController.js   # Auth logic
│   │   ├── analyticsController.js
│   │   ├── chapterController.js
│   │   ├── verseController.js
│   │   └── activityController.js
│   ├── routes/                 # Express routes
│   │   ├── auth.js
│   │   ├── analytics.js
│   │   ├── chapters.js
│   │   ├── verses.js
│   │   └── activities.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js             # JWT verification
│   ├── scripts/                # Utility scripts
│   │   └── seedAdmin.js        # Seed admin user
│   └── server.js               # Main server file
├── .env                        # Environment variables
├── .env.example                # Example env file
├── package.json
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/login` | Admin login | ❌ |
| GET | `/api/admin/me` | Get current admin | ✅ |
| PUT | `/api/admin/profile` | Update admin profile | ✅ |
| PUT | `/api/admin/password` | Change password | ✅ |

### Analytics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/analytics` | Dashboard stats | ✅ |
| GET | `/api/admin/analytics/users` | User statistics | ✅ |
| GET | `/api/admin/analytics/content` | Content stats | ✅ |
| GET | `/api/admin/analytics/chapters` | Chapter stats | ✅ |

### Chapters

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/chapters` | Create chapter | ✅ |
| PUT | `/api/admin/chapters/:id` | Update chapter | ✅ |
| DELETE | `/api/admin/chapters/:id` | Delete chapter | ✅ |

### Verses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/verses` | Create verse | ✅ |
| PUT | `/api/admin/verses/:id` | Update verse | ✅ |
| DELETE | `/api/admin/verses/:id` | Delete verse | ✅ |

### Activities

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/activities` | Create activity | ✅ |
| PUT | `/api/admin/activities/:id` | Update activity | ✅ |
| DELETE | `/api/admin/activities/:id` | Delete activity | ✅ |

## Authentication Flow

### 1. Login Request

```bash
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@geeta.com","password":"admin123"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@geeta.com",
    "role": "super-admin"
  }
}
```

### 2. Authenticated Request

```bash
curl -X GET http://localhost:4000/api/admin/analytics \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Data Models

### AdminUser

```javascript
{
  name: String,           // Admin name
  email: String,          // Unique email
  password: String,       // Hashed password
  role: String,           // 'admin' or 'super-admin'
  isActive: Boolean,      // Account status
  lastLogin: Date,        // Last login timestamp
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## Security Features

### Password Hashing
- Passwords are hashed using bcrypt with salt rounds
- Plain text passwords never stored
- Automatic hashing on user creation

### JWT Tokens
- Tokens expire after 7 days (configurable)
- Includes user ID, email, and role
- Verified on every protected route

### Protected Routes
- Middleware checks for valid JWT token
- Verifies admin user exists and is active
- Returns 401 for unauthorized requests

## Error Handling

The server provides consistent error responses:

```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Database Connection

The server connects to MongoDB on startup:

```
✅ MongoDB connected successfully
```

If connection fails:
```
❌ MongoDB connection error: [error details]
```

The process will exit with code 1 on connection failure.

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run seed` - Seed admin user

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port | No | 4000 |
| MONGODB_URI | MongoDB connection string | Yes | - |
| JWT_SECRET | Secret for JWT signing | Yes | - |
| JWT_EXPIRE | Token expiration time | No | 7d |
| NODE_ENV | Environment (development/production) | No | development |

## CORS Configuration

CORS is enabled for all origins in development. For production, configure specific origins:

```javascript
app.use(cors({
  origin: ['https://your-admin-dashboard.com'],
  credentials: true
}));
```

## Logging

The server logs all requests:

```
2024-11-20T10:30:15.123Z - GET /api/admin/analytics
2024-11-20T10:30:20.456Z - POST /api/admin/chapters
```

## Database Integration

This server uses the same MongoDB database as the main Geeta Book server (`/server`). It references the same models:

- `Chapter` from `/server/src/models/Chapter.js`
- `Verse` from `/server/src/models/Verse.js`
- `Activity` from `/server/src/models/Activity.js`
- `VerseActivity` from `/server/src/models/VerseActivity.js`
- `UserProgress` from `/server/src/models/UserProgress.js`

## Testing Endpoints

### Test Analytics

```bash
# Login first
TOKEN=$(curl -s -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@geeta.com","password":"admin123"}' \
  | jq -r '.token')

# Get analytics
curl http://localhost:4000/api/admin/analytics \
  -H "Authorization: Bearer $TOKEN"
```

### Create Chapter

```bash
curl -X POST http://localhost:4000/api/admin/chapters \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "chapterNumber": 19,
    "name": "Test Chapter",
    "nameTransliterated": "Test Chapter",
    "nameMeaning": "Meaning",
    "chapterSummary": "Summary",
    "chapterSummaryHindi": "सारांश",
    "versesCount": 10
  }'
```

## Troubleshooting

### Cannot connect to MongoDB

**Error:** `MongoDB connection error: connect ECONNREFUSED`

**Solution:**
1. Ensure MongoDB is running: `mongod --dbpath /path/to/data`
2. Check MONGODB_URI in `.env`
3. Verify MongoDB port (default: 27017)

### Invalid token error

**Error:** `Invalid token`

**Solution:**
1. Check token is included in Authorization header
2. Verify JWT_SECRET matches in `.env`
3. Token may be expired (login again)

### Admin user not found

**Error:** `Admin user not found`

**Solution:**
1. Run seed script: `npm run seed`
2. Check MongoDB connection
3. Verify database name in MONGODB_URI

## Production Deployment

### Using PM2

```bash
npm install -g pm2
pm2 start src/server.js --name geeta-admin-server
pm2 save
pm2 startup
```

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t geeta-admin-server .
docker run -p 4000:4000 --env-file .env geeta-admin-server
```

### Environment Setup

For production:
1. Use strong JWT_SECRET (random 64+ character string)
2. Set NODE_ENV=production
3. Use MongoDB Atlas or secure MongoDB instance
4. Enable HTTPS
5. Configure firewall rules
6. Set up rate limiting
7. Enable request logging
8. Monitor server health

## Monitoring

Recommended monitoring:
- Server uptime
- API response times
- Database connection status
- Error rates
- Authentication failures

## Support

For issues or questions:
- Check the `/geeta-book-admin/README.md` for frontend setup
- Review main server documentation at `/server`
- Verify MongoDB connection and data

## License

This project is part of the Bhagavad Geeta app ecosystem.

---

**Built with ❤️ for managing Bhagavad Geeta content**
