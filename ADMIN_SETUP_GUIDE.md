# Geeta Book Admin - Complete Setup Guide

This guide will walk you through setting up both the admin dashboard (Next.js) and admin server (Node.js) from scratch.

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18.x or higher installed
- ✅ MongoDB installed and running (or MongoDB Atlas account)
- ✅ Git installed
- ✅ Terminal/Command line access
- ✅ Code editor (VS Code recommended)

## Quick Start (5 Minutes)

### Step 1: Set up the Admin Server

```bash
# Navigate to admin server folder
cd admin-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file (use your favorite editor)
# Set MONGODB_URI to your MongoDB connection string
# Set JWT_SECRET to a secure random string

# Seed the admin user
npm run seed

# Start the server
npm run dev
```

Server should now be running at `http://localhost:4000` ✅

### Step 2: Set up the Admin Dashboard

```bash
# Open a new terminal
# Navigate to admin dashboard folder
cd geeta-book-admin

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local

# Start the development server
npm run dev
```

Dashboard should now be running at `http://localhost:3000` ✅

### Step 3: Login

Open your browser and go to `http://localhost:3000`

Use these credentials:
- **Email**: admin@geeta.com
- **Password**: admin123

You're all set! 🎉

---

## Detailed Setup Instructions

### 1. Admin Server Setup (Backend)

#### 1.1 Install Dependencies

```bash
cd admin-server
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- cors (cross-origin requests)
- dotenv (environment variables)

#### 1.2 Configure MongoDB

**Option A: Local MongoDB**

1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # Start MongoDB service from Services
   ```

3. Verify connection:
   ```bash
   mongosh
   ```

**Option B: MongoDB Atlas (Cloud)**

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string (looks like `mongodb+srv://...`)
4. Whitelist your IP address

#### 1.3 Configure Environment Variables

Create `.env` file:

```bash
cd admin-server
cp .env.example .env
```

Edit `.env`:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/geeta-book  # Or your Atlas URI
JWT_SECRET=generate-a-random-64-character-string-here
JWT_EXPIRE=7d
NODE_ENV=development
```

**Generate a secure JWT secret:**

```bash
# On macOS/Linux
openssl rand -base64 64

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

#### 1.4 Seed Admin User

```bash
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
✅ Admin user created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    admin@geeta.com
Password: admin123
Role:     super-admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 1.5 Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Expected output:
```
✅ MongoDB connected successfully

🚀 Admin Server running on port 4000
📍 API URL: http://localhost:4000
🔐 Login endpoint: http://localhost:4000/api/admin/login
📊 Analytics endpoint: http://localhost:4000/api/admin/analytics
```

#### 1.6 Test the Server

```bash
# Test root endpoint
curl http://localhost:4000

# Test login
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@geeta.com","password":"admin123"}'
```

You should get a token in response ✅

---

### 2. Admin Dashboard Setup (Frontend)

#### 2.1 Install Dependencies

```bash
cd geeta-book-admin
npm install
```

This installs:
- next (React framework)
- react & react-dom
- typescript
- tailwindcss (styling)
- axios (HTTP client)
- react-hook-form (forms)
- recharts (charts)
- lucide-react (icons)
- react-hot-toast (notifications)

#### 2.2 Configure Environment

Create `.env.local`:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
```

Or create manually:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

#### 2.3 Start Development Server

```bash
npm run dev
```

Expected output:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

#### 2.4 Access the Dashboard

Open browser: http://localhost:3000

You'll be redirected to the login page.

---

## First Login

### Login Credentials

```
Email:    admin@geeta.com
Password: admin123
```

### After Login

You'll see the main dashboard with:

- 📊 Statistics cards (Chapters, Verses, Activities, Users)
- 📈 Quick action links
- 🔔 Recent activity feed
- 📱 Sidebar navigation

### Change Password (Recommended)

1. Click on your profile in the top-right
2. Go to Settings
3. Change password
4. Use a strong password for production

---

## Dashboard Features

### 1. Dashboard Home (`/dashboard`)
- Overview statistics
- Quick links to management pages
- Recent activity

### 2. Chapters Management (`/dashboard/chapters`)
- View all chapters in grid
- Add new chapter
- Edit chapter details
- Delete chapter (with confirmation)

### 3. Verses Management (`/dashboard/verses`)
- Browse verses by chapter
- Add new verse
- Edit verse content
- Delete verse

### 4. Activities Management (`/dashboard/activities`)
- View all activities
- Create new activity
- Edit activity details
- Manage activity types

### 5. Analytics (`/dashboard/analytics`)
- User statistics
- Content metrics
- Popular chapters
- Engagement data

---

## Folder Structure

```
fluttter-app/
├── geeta-book-admin/           # Next.js Admin Dashboard
│   ├── src/
│   │   ├── app/                # Pages (App Router)
│   │   ├── components/         # Reusable components
│   │   └── lib/                # Utilities & API
│   ├── public/                 # Static files
│   ├── package.json
│   └── README.md
│
├── admin-server/               # Node.js API Server
│   ├── src/
│   │   ├── models/             # Database models
│   │   ├── controllers/        # Business logic
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth & validation
│   │   ├── scripts/            # Utility scripts
│   │   └── server.js           # Main server
│   ├── .env                    # Environment config
│   ├── package.json
│   └── README.md
│
├── server/                     # Main App Server (existing)
└── geeta book app/             # Flutter App (existing)
```

---

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB service
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

### Issue: "EADDRINUSE: Port already in use"

**Solution:**
```bash
# Find process using port 4000
lsof -i :4000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=4001
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Cannot connect to API"

**Solution:**
1. Check admin server is running on port 4000
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for CORS errors
4. Ensure both servers are running

### Issue: "Invalid credentials" on login

**Solution:**
```bash
# Reseed admin user
cd admin-server
npm run seed
```

---

## Production Deployment

### Admin Server (Backend)

#### Option 1: Traditional VPS

```bash
# On server
cd admin-server
npm install --production
npm start

# Use PM2 for process management
npm install -g pm2
pm2 start src/server.js --name geeta-admin-api
pm2 save
pm2 startup
```

#### Option 2: Docker

```bash
cd admin-server
docker build -t geeta-admin-server .
docker run -d -p 4000:4000 --env-file .env geeta-admin-server
```

### Admin Dashboard (Frontend)

#### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

#### Option 2: Traditional Hosting

```bash
cd geeta-book-admin
npm run build
npm start

# Use PM2
pm2 start npm --name geeta-admin-dashboard -- start
```

---

## Security Checklist for Production

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (64+ characters)
- [ ] Enable HTTPS for both frontend and backend
- [ ] Configure CORS to allow only your domain
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas with IP whitelist
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Regular backups of MongoDB
- [ ] Keep dependencies updated

---

## Development Workflow

### Making Changes to Admin Dashboard

1. Edit files in `geeta-book-admin/src/`
2. Changes auto-reload in browser
3. Test thoroughly
4. Commit to Git

### Making Changes to Admin Server

1. Edit files in `admin-server/src/`
2. Server auto-reloads with nodemon
3. Test endpoints with curl or Postman
4. Commit to Git

### Adding New API Endpoint

1. Create controller in `admin-server/src/controllers/`
2. Create route in `admin-server/src/routes/`
3. Register route in `server.js`
4. Add API function in `geeta-book-admin/src/lib/api.ts`
5. Use in components

---

## Testing

### Test Admin Server Endpoints

```bash
# Login and get token
TOKEN=$(curl -s -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@geeta.com","password":"admin123"}' \
  | jq -r '.token')

# Test analytics
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/admin/analytics

# Test chapters
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/chapters
```

### Test Admin Dashboard

1. Login with credentials
2. Navigate to each page
3. Try CRUD operations
4. Check browser console for errors
5. Test on mobile view

---

## Next Steps

1. ✅ Complete setup following this guide
2. 📝 Customize branding (logo, colors)
3. 🎨 Add more features as needed
4. 📊 Set up analytics tracking
5. 🔒 Implement additional security
6. 🚀 Deploy to production
7. 📱 Test on different devices

---

## Getting Help

If you encounter issues:

1. Check the README files in each folder
2. Review the troubleshooting section
3. Check server logs for errors
4. Verify all environment variables
5. Ensure both servers are running

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Express.js**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **JWT**: https://jwt.io/

---

**Happy coding! 🚀**

If you have questions or need help, refer to the individual README files in each folder for more detailed information.
