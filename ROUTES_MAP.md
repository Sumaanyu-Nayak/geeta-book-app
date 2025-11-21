# Admin Dashboard Routes Map

## 🗺️ Complete Route Structure

```
Admin Dashboard (Next.js - Port 3001)
├── /login
│   └── JWT Authentication Form
│
└── /dashboard
    ├── / (Main Dashboard)
    │   ├── Analytics Cards (Chapters, Verses, Activities, Users)
    │   ├── Recent Activity Chart
    │   └── Quick Stats
    │
    ├── /chapters
    │   ├── / (List View)
    │   │   ├── Grid of all 18 chapters
    │   │   ├── Edit button → /chapters/[id]/edit
    │   │   ├── Delete button (with confirmation)
    │   │   └── Add button → /chapters/new
    │   │
    │   ├── /new (Create Form)
    │   │   ├── Chapter number (1-18)
    │   │   ├── Titles (Sanskrit, English, Hindi)
    │   │   ├── Description
    │   │   ├── Verse count
    │   │   ├── Key themes (tags)
    │   │   ├── Image/Video URLs
    │   │   └── Total activities
    │   │
    │   └── /[id]/edit (Edit Form)
    │       └── Same fields as create (number disabled)
    │
    ├── /verses
    │   ├── / (List View)
    │   │   ├── Filterable by chapter
    │   │   ├── Shows Sanskrit text, transliteration, translation
    │   │   ├── Edit button → /verses/[id]/edit
    │   │   ├── Delete button
    │   │   └── Add button → /verses/new
    │   │
    │   ├── /new (Create Form)
    │   │   ├── Chapter dropdown
    │   │   ├── Verse number
    │   │   ├── Sanskrit text
    │   │   ├── Transliteration
    │   │   ├── English translation
    │   │   ├── Hindi translation
    │   │   ├── Explanation
    │   │   └── Video/Audio URLs
    │   │
    │   └── /[id]/edit (Edit Form)
    │       └── Same fields as create
    │
    └── /activities
        ├── / (List View)
        │   ├── Filter by chapter
        │   ├── Filter by type (8 types)
        │   ├── Type badges with colors
        │   ├── Edit button → /activities/[id]/edit
        │   ├── Delete button
        │   └── Add button → /activities/new
        │
        ├── /new (Create Form)
        │   ├── Chapter dropdown
        │   ├── Activity type dropdown
        │   ├── Title
        │   ├── Description
        │   └── Icon URL
        │
        └── /[id]/edit (Edit Form)
            └── Same fields as create
```

## 🔌 API Endpoints Structure

```
Admin Server (Express - Port 4000)
│
├── PUBLIC ROUTES (No Auth)
│   ├── GET  /api/chapters              → List all chapters
│   ├── GET  /api/chapters/:id          → Get single chapter
│   ├── GET  /api/verses                → List verses (optional: ?chapterId=1)
│   ├── GET  /api/verses/:id            → Get single verse
│   ├── GET  /api/activities            → List activities (optional: ?chapterId=1)
│   └── GET  /api/activities/:id        → Get single activity
│
└── PROTECTED ROUTES (JWT Required)
    ├── AUTH
    │   └── POST /api/admin/login       → Admin login
    │
    ├── ANALYTICS
    │   └── GET  /api/admin/analytics   → Dashboard stats
    │
    ├── CHAPTERS
    │   ├── POST   /api/admin/chapters      → Create chapter
    │   ├── PUT    /api/admin/chapters/:id  → Update chapter
    │   └── DELETE /api/admin/chapters/:id  → Delete chapter (+ verses)
    │
    ├── VERSES
    │   ├── POST   /api/admin/verses        → Create verse
    │   ├── PUT    /api/admin/verses/:id    → Update verse
    │   └── DELETE /api/admin/verses/:id    → Delete verse
    │
    └── ACTIVITIES
        ├── POST   /api/admin/activities        → Create activity
        ├── PUT    /api/admin/activities/:id    → Update activity
        └── DELETE /api/admin/activities/:id    → Delete activity
```

## 🎨 Component Flow

```
┌─────────────────────────────────────────┐
│         Login Page (/login)             │
│  ┌───────────────────────────────────┐  │
│  │   Email: admin@geeta.com          │  │
│  │   Password: ••••••••••            │  │
│  │   [Login Button]                  │  │
│  └───────────────────────────────────┘  │
│                  │                       │
│                  │ JWT Token             │
│                  ▼                       │
└─────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│      DashboardLayout Component          │
│  ┌──────────┬───────────────────────┐   │
│  │ Sidebar  │   Main Content Area   │   │
│  │          │                       │   │
│  │ ├─ 📊    │  ┌─────────────────┐  │   │
│  │ ├─ 📚    │  │   Page Content  │  │   │
│  │ ├─ 📖    │  │                 │  │   │
│  │ ├─ 🎯    │  │   - List Views  │  │   │
│  │ └─ 📈    │  │   - Forms       │  │   │
│  │          │  │   - Cards       │  │   │
│  │ [Logout] │  └─────────────────┘  │   │
│  └──────────┴───────────────────────┘   │
└─────────────────────────────────────────┘
```

## 📊 Data Flow

```
User Action (Create/Edit/Delete)
         │
         ▼
┌─────────────────┐
│  Next.js Form   │
│  Component      │
└────────┬────────┘
         │ Form Data
         ▼
┌─────────────────┐
│   API Client    │
│   (lib/api.ts)  │
│                 │
│  - Add JWT      │
│  - Axios Call   │
└────────┬────────┘
         │ HTTP Request
         ▼
┌─────────────────┐
│  Express Server │
│  (admin-server) │
│                 │
│  1. Verify JWT  │
│  2. Validate    │
│  3. Process     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MongoDB       │
│   (Atlas)       │
│                 │
│  - chapters     │
│  - verses       │
│  - activities   │
└────────┬────────┘
         │ Response
         ▼
┌─────────────────┐
│  User Interface │
│  Updates        │
│                 │
│  - Toast        │
│  - Redirect     │
│  - Refresh      │
└─────────────────┘
```

## 🎯 Activity Types with Colors

```
┌──────────────┬──────────────┬────────────────────┐
│ Type         │ Label        │ Color Badge        │
├──────────────┼──────────────┼────────────────────┤
│ read         │ Read         │ 🔵 Blue            │
│ watch        │ Watch        │ 🟣 Purple          │
│ experiments  │ Experiments  │ 🟢 Green           │
│ listen       │ Listen       │ 🟡 Yellow          │
│ quiz         │ Quiz         │ 🔴 Red             │
│ reflection   │ Reflection   │ 🟤 Indigo          │
│ discussion   │ Discussion   │ 🩷 Pink            │
│ dailyVerse   │ Daily Verse  │ 🟠 Orange          │
└──────────────┴──────────────┴────────────────────┘
```

## 🔐 Authentication Flow

```
1. User visits admin dashboard
        ↓
2. Check localStorage for token
        ↓
   ┌─────────────────┐
   │ Token exists?   │
   └────┬────────┬───┘
        │        │
    YES │        │ NO
        ↓        ↓
   Dashboard   Login Page
        │            │
        │            ↓
        │      POST /api/admin/login
        │            │
        │            ↓
        │      Get JWT Token
        │            │
        │            ↓
        │      Save to localStorage
        │            │
        └────────────┘
                ↓
        All API Calls include:
        Authorization: Bearer <token>
                ↓
        Server verifies JWT
                ↓
           Allow/Deny
```

## 📱 Responsive Design

```
Desktop (md+)                Mobile (<md)
┌─────────┬────────┐        ┌──────────┐
│ Sidebar │ Content│        │ ☰  Header│
│         │        │        ├──────────┤
│ Fixed   │ Scroll │        │          │
│ Left    │ Area   │        │ Content  │
│         │        │        │ Area     │
│ Logout  │        │        │          │
└─────────┴────────┘        └──────────┘
                            Sidebar slides
                            in from left
```

## ✅ Feature Checklist

### Completed ✅
- [x] JWT Authentication
- [x] Dashboard with analytics
- [x] Chapter CRUD (Create, Read, Update, Delete)
- [x] Verse CRUD with filtering
- [x] Activity CRUD with dual filtering
- [x] Responsive design
- [x] Form validation
- [x] Error handling
- [x] Toast notifications
- [x] Loading states
- [x] Protected routes
- [x] Public API endpoints
- [x] MongoDB integration
- [x] Local model definitions (no conflicts)

### Ready for Production 🚀
- All routes implemented
- All forms functional
- API fully integrated
- Database models synced
- Authentication secure
- Error handling complete
