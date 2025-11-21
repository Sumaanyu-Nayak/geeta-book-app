# Geeta Book Admin Dashboard

A modern, responsive admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS for managing the Bhagavad Geeta mobile application content.

## Features

- 🔐 **Secure Authentication** - JWT-based admin login system
- 📊 **Analytics Dashboard** - Real-time statistics and insights
- 📚 **Content Management** - Manage chapters, verses, and activities
- 🎨 **Modern UI** - Beautiful, responsive interface with Tailwind CSS
- 🚀 **Fast Performance** - Built with Next.js 14 App Router
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Admin server running (see `/admin-server` folder)

## Installation

### 1. Navigate to the admin dashboard folder

```bash
cd geeta-book-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 4. Run the development server

```bash
npm run dev
```

The dashboard will be available at [http://localhost:3000](http://localhost:3000)

## Default Login Credentials

```
Email: admin@geeta.com
Password: admin123
```

> ⚠️ **Important**: Change these credentials after first login in production!

## Project Structure

```
geeta-book-admin/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── page.tsx        # Main dashboard
│   │   │   ├── chapters/       # Chapters management
│   │   │   ├── verses/         # Verses management
│   │   │   ├── activities/     # Activities management
│   │   │   └── analytics/      # Analytics pages
│   │   ├── login/              # Login page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   ├── DashboardLayout.tsx # Main dashboard layout
│   │   └── ...                 # Other components
│   └── lib/                    # Utility functions
│       └── api.ts              # API client
├── public/                     # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### 1. Dashboard Home
- Quick statistics overview
- Total chapters, verses, activities, and users
- Quick action links
- Recent activity feed

### 2. Chapters Management
- View all chapters in a grid layout
- Add new chapters
- Edit existing chapters
- Delete chapters (with confirmation)
- Chapter statistics

### 3. Verses Management
- Browse verses by chapter
- Add new verses
- Edit verse content (Sanskrit, transliteration, translation, explanation)
- Delete verses
- Verse search and filtering

### 4. Activities Management
- View all chapter activities
- Create new activities
- Edit activity details
- Manage activity types (Video, Audio, Meditation, Reflection, Practice)
- Activity status tracking

### 5. Analytics
- User engagement metrics
- Popular chapters analytics
- Activity completion rates
- Content statistics
- Visual charts and graphs

## API Integration

The dashboard communicates with the admin server running on port 4000. All API calls are handled through the `src/lib/api.ts` file.

### API Endpoints Used

- `POST /api/admin/login` - Admin login
- `GET /api/admin/analytics` - Dashboard analytics
- `GET /api/chapters` - List chapters
- `POST /api/admin/chapters` - Create chapter
- `PUT /api/admin/chapters/:id` - Update chapter
- `DELETE /api/admin/chapters/:id` - Delete chapter
- Similar endpoints for verses and activities

## Authentication

The dashboard uses JWT tokens for authentication:

1. Login credentials are sent to `/api/admin/login`
2. Server returns a JWT token
3. Token is stored in localStorage
4. Token is included in all subsequent API requests
5. Middleware protects all dashboard routes

## Styling

The project uses Tailwind CSS with a custom configuration:

- **Primary Colors**: Orange gradient (#FF6B35 to #F7931E)
- **Secondary**: Pink (#F7931E)
- **Design System**: Consistent spacing, typography, and components
- **Dark Mode**: Prepared for dark mode support

## Building for Production

```bash
npm run build
npm start
```

The optimized build will be created in the `.next` folder.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting

1. Build the project: `npm run build`
2. Copy the `.next` folder and `package.json` to server
3. Run `npm install --production`
4. Start with `npm start` or process manager (PM2)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Admin API base URL | `http://localhost:4000/api` |

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Never commit `.env.local`
3. **CORS**: Configure proper CORS settings on the server
4. **Token Expiry**: JWT tokens expire after 7 days
5. **Password Policy**: Enforce strong passwords
6. **Rate Limiting**: Implement on the API server

## Troubleshooting

### "Cannot connect to API"
- Ensure admin server is running on port 4000
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify CORS settings on the server

### "Authentication failed"
- Clear localStorage and try again
- Check admin user exists in database
- Verify JWT_SECRET matches on server

### Build errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Check Node.js version (18+)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions:
- Check the `/admin-server/README.md` for backend setup
- Review the main app documentation
- Contact the development team

## License

This project is part of the Bhagavad Geeta app ecosystem.

---

**Built with ❤️ for managing Bhagavad Geeta content**
