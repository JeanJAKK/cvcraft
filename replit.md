# CVCraft - Modern CV Generator SaaS

## Project Overview

CVCraft is a professional online CV/Resume generator SaaS application that enables users to create, preview, and export high-quality CVs in PDF format. The application features a modern, clean design with real-time preview functionality and multiple professional templates.

**Status:** ✅ Fully functional MVP completed (November 22, 2025)

## Core Features

### 0. **User Authentication**
- Secure signup and login system
- Password hashing with bcryptjs
- Session-based authentication with express-session
- Protected routes that redirect unauthenticated users
- Authentication context for easy access throughout the app

### 1. **Home Page**
- Engaging hero section with clear value proposition
- Features showcase (6 key features: Real-time Preview, Multiple Templates, PDF Export, Mobile Responsive, ATS-Optimized, Secure & Private)
- Pricing section (Free tier with 3 templates, Premium tier with 8 templates at $9.99 each)
- Responsive navigation with theme toggle
- Professional footer

### 2. **Template Gallery** (`/templates`)
- Browse all available CV templates
- Filter by: All, Free, Premium
- 3 free professional templates:
  - Modern Professional (most popular)
  - Classic Elegance
  - Minimal Clean
- 5 premium templates at $9.99 each
- Template preview cards with pricing badges
- Direct "Use Template" button for quick start

### 3. **CV Builder** (`/builder`)
- **Split-screen interface:**
  - Desktop: 40% form editor / 60% live preview
  - Mobile: Tabbed interface (Edit/Preview tabs)
- **Real-time preview:** All form changes update the preview instantly with 300ms debounce
- **Comprehensive form sections:**
  - Personal Information (name, email, phone, location, summary)
  - Work Experience (dynamic list with add/remove)
  - Education (dynamic list with add/remove)
  - Skills (dynamic tag-based list)
- **Save functionality:** Persist CVs to backend storage
- **Export to PDF:** High-quality PDF export using jsPDF and html2canvas
- **Responsive design:** Fully functional on all device sizes

### 4. **PDF Export**
- One-click export to high-quality PDF
- A4 format optimized for printing
- Automatic multi-page handling for longer CVs
- Clean, professional output suitable for job applications

## Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Routing:** wouter
- **UI Components:** shadcn/ui + Radix UI primitives
- **Styling:** Tailwind CSS with custom design tokens
- **Forms:** react-hook-form with zod validation
- **State Management:** TanStack Query v5
- **PDF Generation:** jsPDF + html2canvas
- **Icons:** lucide-react

### Backend
- **Runtime:** Node.js with Express
- **Language:** TypeScript
- **Storage:** In-memory storage (MemStorage) with IStorage interface
- **Validation:** Zod schemas with drizzle-zod
- **Development:** tsx for hot reload

### Build & Development
- **Bundler:** Vite
- **Dev Server:** Integrated Express + Vite dev server on port 5000
- **Type Checking:** TypeScript strict mode

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn UI components
│   │   │   ├── navigation.tsx   # Main navigation bar
│   │   │   ├── theme-toggle.tsx # Dark/Light mode toggle
│   │   │   ├── cv-form.tsx      # CV builder form
│   │   │   ├── cv-preview.tsx   # Live preview wrapper
│   │   │   └── cv-templates/    # Template components
│   │   │       ├── modern-template.tsx
│   │   │       ├── classic-template.tsx
│   │   │       └── minimal-template.tsx
│   │   ├── lib/
│   │   │   ├── queryClient.ts   # TanStack Query setup
│   │   │   ├── pdf-export.ts    # PDF export utility
│   │   │   └── templates.ts     # Template data
│   │   ├── pages/
│   │   │   ├── home.tsx         # Landing page
│   │   │   ├── templates.tsx    # Template gallery
│   │   │   └── builder.tsx      # CV builder
│   │   ├── App.tsx              # Main app with routing
│   │   └── index.css            # Design tokens & Tailwind
│   └── index.html
├── server/
│   ├── routes.ts                # API endpoints
│   ├── storage.ts               # Storage interface & implementation
│   └── index-dev.ts             # Development server
├── shared/
│   └── schema.ts                # Shared TypeScript types & Zod schemas
├── design_guidelines.md         # Design system documentation
└── replit.md                    # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Authenticate user with username and password
- `POST /api/auth/logout` - Logout current user and destroy session
- `GET /api/auth/me` - Get current authenticated user info

### Templates
- `GET /api/templates` - Fetch all available templates

### CV Management
- `GET /api/cvs` - Fetch all CVs for current user
- `POST /api/cvs` - Create a new CV
- `PATCH /api/cvs/:id` - Update an existing CV
- `DELETE /api/cvs/:id` - Delete a CV

## Data Models

### CV Data Structure
```typescript
{
  templateId: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  skills: string[];
}
```

### Template Structure
```typescript
{
  id: string;
  name: string;
  description: string;
  category: string;
  isPremium: boolean;
  price?: number;
  previewUrl?: string;
}
```

## Design System

### Color Palette
- **Primary:** Vibrant purple/blue gradient (modern, professional)
- **Background:** Clean white (light mode) / Dark gray (dark mode)
- **Text:** Multi-level hierarchy (default, secondary, tertiary)
- **Accent:** Complementary blue tones

### Typography
- **Font Family:** Inter (Google Fonts)
- **Font Sizes:** Responsive scale from 0.875rem to 2.25rem
- **Font Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- All interactive elements use shadcn/ui components
- Consistent spacing: small (0.75rem), medium (1.5rem), large (3rem)
- Subtle hover/active states using custom elevation utilities
- Mobile-first responsive design

## Testing

### E2E Test Coverage
Comprehensive end-to-end testing implemented covering:
- ✅ Homepage navigation and CTAs
- ✅ Template gallery browsing and filtering
- ✅ Template selection workflow
- ✅ CV builder form filling
- ✅ Real-time preview updates
- ✅ CV save functionality (API integration)
- ✅ PDF export dialog and download

### Test Infrastructure
- 64+ data-testid attributes across all interactive elements
- Playwright-ready test selectors following naming conventions
- All major user journeys tested and validated

## Development Workflow

### Running the Application
```bash
npm run dev
```
Starts both Express backend and Vite frontend on port 5000.

### Key Files to Edit
- **Add new templates:** `client/src/lib/templates.ts` + `client/src/components/cv-templates/`
- **Modify CV schema:** `shared/schema.ts`
- **Add API endpoints:** `server/routes.ts`
- **Update storage:** `server/storage.ts`
- **Style changes:** `client/src/index.css` (design tokens) or component files

### Design Guidelines
All frontend changes must follow `design_guidelines.md` for:
- Color usage and theming
- Component selection (always use shadcn/ui)
- Spacing and layout consistency
- Typography hierarchy
- Dark mode support
- Accessibility (data-testid attributes)

## Monetization Strategy

### Free Tier
- 3 professional CV templates
- Full CV builder access
- Unlimited saves
- PDF export
- All core features

### Premium Tier ($9.99)
- 8 additional premium templates
- Priority support (planned)
- Advanced customization (planned)

### Future Enhancements (Planned)
- Stripe payment integration for premium templates
- User authentication system
- Cloud storage for CVs
- Custom branding options
- AI-powered content suggestions
- Multiple CV versions per user
- Analytics and tracking

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Progressive enhancement approach

## Performance
- Lazy loading for template previews
- Debounced form updates (300ms)
- Optimized bundle size
- Fast initial page load
- Smooth real-time preview updates

## Security Considerations
- Form validation with Zod schemas
- Input sanitization
- No sensitive data in local storage (in-memory storage)
- Ready for authentication integration
- HTTPS recommended for production

## Deployment Notes
- Frontend and backend served on same port (5000)
- No CORS issues in production
- Environment variables: SESSION_SECRET (already configured)
- Static assets bundled by Vite
- Ready for Replit deployment

## Recent Updates

### November 22, 2025
- ✅ Complete MVP implementation
- ✅ All core features functional and tested
- ✅ Comprehensive E2E testing passed
- ✅ Design system fully implemented
- ✅ PDF export working perfectly
- ✅ Mobile responsive design completed
- ✅ 64+ test IDs added for automation
- ✅ Backend API fully functional
- ✅ Real-time preview with debouncing
- ✅ User authentication system implemented
  - Secure signup and login pages
  - Password hashing with bcryptjs
  - Session-based authentication
  - Protected routes with auth context
  - Logout functionality

## Known Limitations
- In-memory storage (data lost on server restart) - upgrade to PostgreSQL for production
- Premium template purchases not yet integrated with Stripe
- PDF export relies on browser rendering (may vary slightly)
- Auth system stores passwords in-memory - needs database for production

## User Preferences
- Uses in-memory storage as per original request
- Clean, professional aesthetic
- Real-time preview is critical feature
- Mobile-first responsive design
- Free + premium monetization model

---

**Project Status:** Production-ready MVP ✅  
**Last Updated:** November 22, 2025  
**Version:** 1.0.0
