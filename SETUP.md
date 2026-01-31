# Setup Instructions

## Quick Start

Follow these steps to get the app running:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- And all utilities

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

## Type Errors Note

The TypeScript errors shown in the IDE are expected until dependencies are installed. 
Run `npm install` to resolve them.

## CSS Linting

The `@tailwind` and `@apply` directives may show as errors in some editors. 
This is normal - they are valid Tailwind CSS directives.

To suppress these warnings in VS Code, add to `.vscode/settings.json`:

```json
{
  "css.lint.unknownAtRules": "ignore"
}
```

## Verification Checklist

After running `npm install` and `npm run dev`:

- [ ] No TypeScript compile errors
- [ ] Development server starts successfully
- [ ] Home page loads at http://localhost:3000
- [ ] Search page accessible at /search
- [ ] Vendor profiles work at /vendor/[id]
- [ ] Chat interface loads at /chat
- [ ] All animations are smooth
- [ ] Toast notifications appear
- [ ] Responsive on mobile/tablet/desktop

## Troubleshooting

### Port already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Type errors persist
```bash
# Type check
npm run type-check
```

## Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open browser: http://localhost:3000
4. Explore the app:
   - Homepage with hero section
   - Search page with filters
   - Click any vendor card
   - Try the chat interface
   - Test toast notifications

Enjoy your premium diaspora marketplace! 🎉
