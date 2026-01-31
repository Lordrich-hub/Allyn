# AfroLuxe Marketplace - Full Stack Cross-Platform App

A production-ready marketplace connecting African service providers with customers in the UK.

## 🏗 Architecture

**Monorepo Structure:**
- `apps/web` - Next.js 14 web application
- `apps/mobile` - React Native (Expo) iOS/Android app
- `packages/ui` - Shared UI components and theme tokens
- `packages/lib` - Shared types, validators, API helpers
- `supabase` - Database migrations, RLS policies, seed data
- `docs` - Product documentation

**Tech Stack:**
- **Frontend:** Next.js 14 (Web), Expo 50+ (Mobile)
- **Backend:** Supabase (Auth, Postgres, Storage, Realtime)
- **Language:** TypeScript
- **Styling:** NativeWind (Mobile), Tailwind CSS (Web)
- **Monorepo:** Turborepo
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Expo account (for mobile builds)

### 1. Clone and Install

```bash
# Install dependencies
npm install

# Install mobile dependencies
cd apps/mobile && npm install
cd ../..
```

### 2. Setup Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Seed demo data
npm run seed
```

### 3. Environment Variables

Create `.env.local` files in both apps:

**apps/web/.env.local:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**apps/mobile/.env:**
```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development

```bash
# Run web app (http://localhost:3000)
npm run web

# Run mobile app (in another terminal)
npm run mobile
```

## 📱 Mobile Development

### Run on Simulator/Emulator

```bash
cd apps/mobile

# iOS (requires macOS)
npm run ios

# Android
npm run android
```

### Build for App Stores

```bash
cd apps/mobile

# iOS production build
eas build --platform ios --profile production

# Android production build
eas build --platform android --profile production
```

## 🌐 Web Deployment

### Deploy to Vercel

```bash
cd apps/web

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel dashboard.

## 📚 Documentation

- [Local Setup Guide](./docs/LOCAL_SETUP.md)
- [Supabase Setup](./docs/SUPABASE_SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [App Store Submission](./docs/APP_STORE_SUBMISSION.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

## 🎯 Core Features

**Customer Features:**
- Sign up/login with email
- Search vendors by location/postcode
- Filter by category, radius, home service
- View vendor profiles with portfolio
- Real-time chat with vendors
- Request and manage bookings
- Leave reviews after completed bookings
- Save favorite vendors

**Vendor Features:**
- Create business profile
- Add services with pricing
- Upload portfolio images
- Set service area and home service option
- Chat with customers
- Accept/decline booking requests
- Mark bookings as completed
- View customer reviews

**Admin Features:**
- Approve/suspend vendors
- View and resolve reports
- Monitor platform activity

## 🗄 Database Schema

Key tables:
- `profiles` - User profiles (customer/vendor/admin)
- `vendors` - Vendor business information
- `services` - Services offered by vendors
- `portfolio` - Vendor portfolio images
- `conversations` & `messages` - Real-time chat
- `bookings` - Service bookings
- `reviews` - Customer reviews
- `favorites` - Saved vendors
- `reports` - User reports

Full schema in `supabase/migrations/`

## 🔐 Security

- Row Level Security (RLS) on all tables
- Users can only access their own data
- Vendors can only edit their profiles
- Reviews only by booking customers
- Admin-only access to reports

## 🎨 Design System (AfroLuxe Theme)

Consistent across web and mobile:
- Background: `#0B1220`
- Surface: `#111827`
- Accent Gold: `#F59E0B`
- Accent Green: `#22C55E`
- Text: `#E5E7EB`
- Muted: `#94A3B8`

## 📦 Project Structure

```
afroluxe-marketplace/
├── apps/
│   ├── web/                    # Next.js web app
│   │   ├── app/                # App router
│   │   ├── components/         # Web-specific components
│   │   └── lib/                # Web utilities
│   └── mobile/                 # Expo mobile app
│       ├── app/                # Expo router
│       ├── components/         # Mobile-specific components
│       └── lib/                # Mobile utilities
├── packages/
│   ├── ui/                     # Shared UI components
│   │   ├── components/         # Cross-platform components
│   │   └── theme/              # Theme tokens
│   └── lib/                    # Shared utilities
│       ├── types/              # TypeScript types
│       ├── validators/         # Zod schemas
│       └── api/                # API helpers
├── supabase/
│   ├── migrations/             # SQL migrations
│   ├── seed.sql                # Demo seed data
│   └── config.toml             # Supabase config
└── docs/                       # Documentation
```

## 🧪 Testing

```bash
# Type check all packages
npm run type-check

# Lint all packages
npm run lint

# Build all packages
npm run build
```

## 📝 License

MIT

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Built with ❤️ for the African diaspora community in the UK**
