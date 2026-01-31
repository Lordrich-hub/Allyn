# Local Setup Guide

Complete guide to set up AfroLuxe Marketplace locally for development.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Git**
- **Supabase Account** - [Sign up](https://supabase.com)
- **Expo Account** (for mobile) - [Sign up](https://expo.dev)

### Optional but Recommended
- **Supabase CLI** - For database management
- **VS Code** - With recommended extensions
- **Xcode** (macOS only) - For iOS development
- **Android Studio** - For Android development

## Step-by-Step Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd afroluxe-marketplace

# Install root dependencies
npm install

# Install workspace dependencies
npm install --workspaces
```

This will install dependencies for:
- Root monorepo
- Web app (`apps/web`)
- Mobile app (`apps/mobile`)
- Shared packages (`packages/ui`, `packages/lib`)

### 2. Supabase Project Setup

#### A. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: `afroluxe-marketplace`
   - Database Password: (save this securely)
   - Region: Choose closest to UK
4. Wait for project to be created

#### B. Get API Credentials

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

#### C. Enable PostGIS Extension

1. Go to Database → Extensions
2. Search for `postgis`
3. Enable it

#### D. Run Migrations

Option 1: Using Supabase Dashboard
```bash
# Copy the contents of supabase/migrations/001_initial_schema.sql
# Go to SQL Editor in Supabase Dashboard
# Paste and run the migration
```

Option 2: Using Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref <your-project-ref>

# Push migrations
supabase db push
```

#### E. Seed Demo Data

```bash
# In Supabase Dashboard SQL Editor, run:
# Copy and paste contents of supabase/seed.sql
# Execute the script
```

#### F. Create Demo Users

Since seed data uses specific UUIDs, create these users in Supabase Auth:

1. Go to Authentication → Users
2. Add users manually:

**Customer Account:**
- Email: `customer@example.com`
- Password: `Demo123!`
- Confirm email immediately

**Vendor Account:**
- Email: `grace@afrobraids.com`
- Password: `Demo123!`
- Confirm email immediately

**Admin Account:**
- Email: `admin@afroluxe.com`
- Password: `Demo123!`
- Confirm email immediately

3. After creating each user, update the `profiles` table with the correct UUID from auth.users

### 3. Environment Variables

#### Web App (.env.local)

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Mobile App (.env)

Create `apps/mobile/.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Servers

#### Web App

```bash
# From root directory
npm run web

# Or from web directory
cd apps/web
npm run dev
```

The web app will be available at: http://localhost:3000

#### Mobile App

```bash
# From root directory (in a new terminal)
npm run mobile

# Or from mobile directory
cd apps/mobile
npm start
```

This will start Expo. You'll see a QR code and options:

- Press `i` - Open iOS Simulator (macOS only)
- Press `a` - Open Android Emulator
- Scan QR code with Expo Go app on your phone

### 5. Verify Setup

#### Web App Checklist
- [ ] http://localhost:3000 loads
- [ ] Can navigate to /auth/signin
- [ ] Can sign in with demo customer account
- [ ] Can view vendor search page
- [ ] Can view vendor profile
- [ ] No console errors

#### Mobile App Checklist
- [ ] App opens in simulator/device
- [ ] Can navigate between screens
- [ ] Can sign in with demo account
- [ ] Can view vendor list
- [ ] Can view vendor details

## Common Setup Issues

### Issue: "Module not found" errors

**Solution:**
```bash
# Clean install
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install --workspaces
```

### Issue: Supabase connection fails

**Solution:**
- Verify environment variables are correct
- Check if Supabase project is active
- Ensure anon key (not service role key) is used
- Check if URL includes https://

### Issue: Mobile app won't start

**Solution:**
```bash
cd apps/mobile
rm -rf node_modules
npm install
npx expo start --clear
```

### Issue: PostGIS not available

**Solution:**
- Enable PostGIS extension in Supabase Dashboard
- Re-run the migration
- Check Supabase logs for errors

### Issue: Demo users can't be created

**Solution:**
- Create users through Supabase Auth UI first
- Then update profile UUIDs in seed data
- Or create fresh seed data with actual UUIDs

## Development Workflow

### Making Changes

```bash
# Make changes to code
# Web changes auto-reload
# Mobile uses Fast Refresh

# Type check all
npm run type-check

# Lint all
npm run lint

# Build all (to verify)
npm run build
```

### Database Changes

```bash
# Create new migration
supabase migration new your_migration_name

# Edit migration file in supabase/migrations/

# Apply migration
supabase db push
```

### Adding Dependencies

```bash
# Add to specific workspace
npm install <package> --workspace=apps/web

# Add to shared package
npm install <package> --workspace=packages/lib
```

## Next Steps

Once setup is complete:

1. ✅ Explore the web app
2. ✅ Test mobile app on simulator
3. ✅ Try creating bookings
4. ✅ Test real-time chat
5. ✅ Review vendor dashboard
6. 📖 Read the [Deployment Guide](./DEPLOYMENT.md)
7. 📖 Review [API Documentation](./API_DOCS.md)

## Getting Help

- Check [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Review [FAQ](./FAQ.md)
- Open an issue on GitHub

---

**Setup Time:** ~30 minutes
**Difficulty:** Intermediate

Happy coding! 🚀
