# AfroLuxe Marketplace - Premium UI/UX

A top-tier diaspora marketplace app with premium UI/UX polish, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Design System

### AfroLuxe Theme (Dark Premium)

- **Background**: `#0B1220` - Deep navy for the main background
- **Surface**: `#111827` - Elevated surfaces and cards
- **Primary**: `#0F172A` - Primary buttons and elements
- **Accent**: `#F59E0B` - Gold accent for CTAs and highlights
- **Secondary Accent**: `#22C55E` - Green for success states
- **Text**: `#E5E7EB` - High contrast readable text
- **Muted**: `#94A3B8` - Secondary text and labels
- **Border**: `#1F2937` - Subtle borders

## ✨ Features Implemented

### 1. Layout & Spacing
- ✅ Consistent max-width containers on desktop (1280px)
- ✅ Sticky top search bar on /search
- ✅ Sticky bottom action bar on vendor profile (mobile)
- ✅ Premium typography scale with Inter font
- ✅ Responsive spacing system

### 2. Interaction Patterns
- ✅ Skeleton loaders for all major pages (search, vendor, chat)
- ✅ Empty states with helpful CTAs
- ✅ Toast notifications for user actions
- ✅ Loading states on buttons
- ✅ Smooth page transitions

### 3. Visual Components
- ✅ Premium vendor cards with hover effects
- ✅ Filter chips with active states
- ✅ Segmented control for map/list toggle
- ✅ Reusable badges (Verified, Available Today, Home Service)
- ✅ Gradient accents (subtle gold)
- ✅ Professional card components

### 4. Motion & Micro-animations
- ✅ Page fade/slide transitions with Framer Motion
- ✅ Card hover lift on desktop
- ✅ Filter panel slide-in animation
- ✅ Tap feedback on buttons
- ✅ Stagger animations for lists
- ✅ **Reduced-motion preference respected** via CSS

### 5. Map/List Toggle UI
- ✅ Premium segmented control design
- ✅ Polished "Map view coming soon" placeholder
- ✅ Smooth animated background transition

### 6. Accessibility
- ✅ Contrast-safe text colors (WCAG AA compliant)
- ✅ Keyboard navigation support
- ✅ Proper focus rings on all interactive elements
- ✅ ARIA labels on buttons and controls
- ✅ Semantic HTML structure
- ✅ Screen reader friendly

## 📁 Project Structure

```
├── app/
│   ├── chat/
│   │   ├── [id]/
│   │   │   └── page.tsx          # Individual chat conversation
│   │   └── page.tsx               # Chat list
│   ├── search/
│   │   └── page.tsx               # Search page with filters
│   ├── vendor/
│   │   └── [id]/
│   │       └── page.tsx           # Vendor profile page
│   ├── layout.tsx                 # Root layout with ToastProvider
│   ├── page.tsx                   # Homepage with hero section
│   └── globals.css                # Global styles & utilities
│
├── components/
│   ├── ui/
│   │   ├── Badge.tsx              # Reusable badge component
│   │   ├── Button.tsx             # Button with variants
│   │   ├── Card.tsx               # Animated card component
│   │   ├── EmptyState.tsx         # Empty state with CTAs
│   │   ├── SegmentedControl.tsx   # Premium toggle control
│   │   ├── Skeleton.tsx           # Skeleton loaders
│   │   └── Toast.tsx              # Toast notification system
│   ├── FilterChip.tsx             # Filter chip with animation
│   └── VendorCard.tsx             # Premium vendor card
│
├── lib/
│   ├── mock-data.ts               # Mock vendor & chat data
│   ├── types.ts                   # TypeScript interfaces
│   └── utils.ts                   # Utility functions
│
└── Configuration Files
    ├── tailwind.config.ts         # Tailwind with custom theme
    ├── tsconfig.json              # TypeScript config
    ├── next.config.js             # Next.js config
    └── package.json               # Dependencies
```

## 🎯 Key Components Created

### UI Components
1. **Badge** - Variant-based badge system (verified, available, home service)
2. **Button** - Multiple variants with loading states
3. **Card** - Animated cards with hover effects
4. **Skeleton** - Loading skeletons for different layouts
5. **Toast** - Notification system with auto-dismiss
6. **EmptyState** - Consistent empty states with CTAs
7. **SegmentedControl** - Premium toggle with animated background

### Feature Components
1. **VendorCard** - Premium card with image, badges, rating
2. **FilterChip** - Animated filter chips with selection state
3. **FilterPanel** - Slide-in filter panel for mobile

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

### Development Server

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📱 Pages

1. **Home** (`/`) - Hero section with features and CTAs
2. **Search** (`/search`) - Vendor search with filters and map toggle
3. **Vendor Profile** (`/vendor/[id]`) - Detailed vendor page with sticky actions
4. **Chat List** (`/chat`) - List of conversations
5. **Chat Conversation** (`/chat/[id]`) - Individual chat interface

## 🎭 Motion Philosophy

- **Subtle by default** - Animations enhance, not distract
- **Performance first** - Hardware-accelerated transforms
- **Accessible** - Respects `prefers-reduced-motion`
- **Purposeful** - Each animation has a reason

## 🎨 Design Principles

1. **Premium Feel** - High-quality visuals and smooth interactions
2. **Mobile-First** - Optimized for phone, tablet, desktop
3. **Consistency** - Unified design language throughout
4. **Accessibility** - Inclusive design for all users
5. **Performance** - Fast loading and smooth animations

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to customize the theme colors.

### Typography
The app uses Inter font. Modify `app/layout.tsx` to change the font.

### Animations
Framer Motion animations can be adjusted in individual components.

## 📊 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## ✅ No Breaking Changes

All functionality is intact. The upgrade focuses purely on:
- Visual polish
- Interaction improvements
- Better UX patterns
- Accessibility enhancements

## 📝 Notes

- All mock data is in `lib/mock-data.ts`
- Toast notifications integrated globally
- Skeleton loaders show for 800ms-1s (configurable)
- Map view placeholder ready for integration
- All components are fully typed with TypeScript
- No console errors or type errors

---

Built with ❤️ for the diaspora community
