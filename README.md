# 📸 Professional Photography Website

A modern, full-featured photography website built with Next.js, TypeScript, and Drizzle ORM.

## ✨ Features

### 🎨 Frontend
- **Modern UI/UX** with responsive design
- **Portfolio Gallery** with dynamic filtering and lightbox
- **Service Listings** with detailed descriptions
- **Booking System** with form validation
- **Blog System** with dynamic content
- **Contact Forms** with message handling
- **Admin Dashboard** for content management
- **Dark/Light Theme** support

### 🛠️ Backend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **PostgreSQL** database (Neon)
- **RESTful API** endpoints
- **Server-side rendering** and static generation

### 🔧 Technical Stack
- **Framework**: Next.js 14.2.30
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd photography-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure environment variables**
```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

5. **Run database migrations**
```bash
npm run db:push
```

6. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── (pages)/           # Public pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
│   ├── database/          # Database schema and config
│   └── utils.ts           # Helper functions
├── public/                # Static assets
└── drizzle/              # Database migrations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Drizzle Studio

## 📊 Code Quality

- ✅ **Zero ESLint warnings/errors**
- ✅ **TypeScript strict mode**
- ✅ **Professional code standards**
- ✅ **Type-safe database operations**
- ✅ **Comprehensive error handling**

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
2. **Set environment variables**
3. **Deploy automatically**

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

## 📝 API Endpoints

- `GET /api/portfolio` - Portfolio items
- `GET /api/services` - Service listings
- `GET /api/bookings` - Booking management
- `GET /api/reviews` - Customer reviews
- `GET /api/messages` - Contact messages
- `GET /api/blog` - Blog posts
- `GET /api/faqs` - FAQ items

## 🎯 Features Overview

### Portfolio Management
- Dynamic image galleries
- Category filtering
- Featured items
- Search functionality

### Booking System
- Service selection
- Date/time scheduling
- Client information capture
- Status tracking

### Content Management
- Blog post creation
- FAQ management
- Service updates
- Review moderation

### Admin Dashboard
- Complete CRUD operations
- Analytics and statistics
- User management
- Content moderation

## 🔒 Security

- Input validation on all forms
- SQL injection protection
- XSS prevention
- CSRF protection
- Environment variable security

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Cross-browser compatibility

## 🎨 UI/UX Features

- Modern design system
- Smooth animations
- Loading states
- Error handling
- Accessibility compliance

## 📈 Performance

- Server-side rendering
- Static site generation
- Image optimization
- Code splitting
- Lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using Next.js and TypeScript**
