# 🚀 Quick Start Guide - Geeta Book Admin System

## What You Need to Do

Follow these steps to get your admin system up and running:

## Step 1: Install Dependencies (Both Projects)

### Admin Server
```bash
cd admin-server
npm install
```

### Admin Dashboard
```bash
cd geeta-book-admin
npm install
```

## Step 2: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services app

# Verify it's running
mongosh
```

## Step 3: Seed Admin User

```bash
cd admin-server
npm run seed
```

Expected output:
```
✅ Admin user created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    admin@geeta.com
Password: admin123
Role:     super-admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4: Start Both Servers

### Terminal 1 - Admin Server
```bash
cd admin-server
npm run dev
```

Should see:
```
✅ MongoDB connected successfully
🚀 Admin Server running on port 4000
```

### Terminal 2 - Admin Dashboard
```bash
cd geeta-book-admin
npm run dev
```

Should see:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

## Step 5: Login

1. Open browser: http://localhost:3000
2. You'll be redirected to login
3. Use credentials:
   - **Email**: admin@geeta.com
   - **Password**: admin123
4. Click "Sign In"

## Step 6: Explore the Dashboard

After login, you'll see:
- 📊 Dashboard with statistics
- 📚 Chapters management
- 📖 Verses management
- ⚡ Activities management
- 📈 Analytics

## 🎯 What Was Created

### Admin Dashboard (`geeta-book-admin/`)
- Next.js 14 application
- Modern, responsive UI
- Complete content management
- Analytics dashboard
- JWT authentication

### Admin Server (`admin-server/`)
- Express.js REST API
- MongoDB integration
- JWT authentication
- CRUD endpoints
- Analytics APIs

## 📁 Project Structure

```
fluttter-app/
├── geeta-book-admin/          # ✅ New: Admin Dashboard
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── admin-server/              # ✅ New: Admin API Server
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── server/                    # ⚠️ Not Modified: Original App Server
├── geeta book app/            # ⚠️ Not Modified: Original Flutter App
│
├── ADMIN_SETUP_GUIDE.md      # ✅ New: Detailed setup guide
├── ADMIN_OVERVIEW.md         # ✅ New: System overview
└── QUICK_START.md            # ✅ This file
```

## 🔐 Default Credentials

```
Email:    admin@geeta.com
Password: admin123
```

⚠️ **Important**: Change this password after first login!

## 🌐 URLs

- **Admin Dashboard**: http://localhost:3000
- **Admin API**: http://localhost:4000
- **Main App API**: http://localhost:3000 (original server)

## 📚 Features

### Dashboard
- Real-time statistics
- Quick action links
- Recent activity

### Chapters Management
- View all chapters
- Add/Edit/Delete chapters
- Chapter statistics

### Verses Management
- Browse verses by chapter
- Add/Edit/Delete verses
- Full content editing

### Activities Management
- View all activities
- Create new activities
- Edit activity details

### Analytics
- User engagement
- Popular content
- Activity completion rates

## 🛠️ Commands Reference

### Admin Server Commands
```bash
npm start      # Production
npm run dev    # Development (auto-reload)
npm run seed   # Seed admin user
```

### Admin Dashboard Commands
```bash
npm run dev    # Development
npm run build  # Build for production
npm start      # Production server
npm run lint   # Check code quality
```

## 🐛 Troubleshooting

### Cannot connect to MongoDB
```bash
# Check if MongoDB is running
mongosh

# If not, start it
brew services start mongodb-community  # macOS
```

### Port already in use
```bash
# Find and kill process
lsof -i :4000      # Check port 4000
kill -9 <PID>      # Kill the process
```

### Cannot connect to API
1. Check admin server is running on port 4000
2. Verify `.env.local` has correct API URL
3. Check browser console for errors

### Login fails
```bash
# Reseed admin user
cd admin-server
npm run seed
```

## 📖 Documentation

For detailed information, see:

1. **ADMIN_SETUP_GUIDE.md** - Step-by-step setup (comprehensive)
2. **ADMIN_OVERVIEW.md** - System architecture and features
3. **geeta-book-admin/README.md** - Dashboard documentation
4. **admin-server/README.md** - API server documentation

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB is running
- [ ] Admin server starts on port 4000
- [ ] Dashboard starts on port 3000
- [ ] Can access login page
- [ ] Can login with credentials
- [ ] See dashboard statistics
- [ ] Can navigate all pages
- [ ] API calls work (check browser network tab)

## 🔄 What to Do Next

1. **Change Password**
   - Login to dashboard
   - Go to profile settings
   - Change password

2. **Add Content**
   - Go to Chapters page
   - Add chapters
   - Add verses
   - Add activities

3. **Explore Analytics**
   - View dashboard statistics
   - Check user engagement
   - Analyze popular content

4. **Customize**
   - Update branding
   - Modify colors
   - Add new features

## 🚨 Important Notes

1. **Do NOT modify these folders:**
   - `server/` (original app server)
   - `geeta book app/` (Flutter app)

2. **Both projects are independent:**
   - Admin dashboard: `geeta-book-admin/`
   - Admin server: `admin-server/`

3. **Shared database:**
   - Both servers use same MongoDB
   - Database name: `geeta-book`

4. **Environment files:**
   - `.env` files are already created
   - Modify if needed for your setup

## 💡 Pro Tips

1. Use `npm run dev` during development for auto-reload
2. Check server logs if something doesn't work
3. Use browser DevTools to debug frontend issues
4. Keep both terminals open to see logs
5. MongoDB must be running before starting servers

## 🎉 Success!

If you can:
- ✅ Login to dashboard
- ✅ See statistics
- ✅ Navigate pages
- ✅ API calls work

**You're all set! The admin system is ready to use.**

---

## Need Help?

1. Check error messages in terminal
2. Review documentation files
3. Verify all prerequisites are met
4. Ensure MongoDB is running
5. Check environment variables

---

**Happy Managing! 🚀**

Built with ❤️ for Bhagavad Geeta app content management.
