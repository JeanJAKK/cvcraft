# CVCraft - Professional CV Generator SaaS

## Overview

CVCraft is a modern web-based CV/resume builder that allows users to create professional resumes using customizable templates. The application provides a real-time preview interface where users can edit their CV information and instantly see the formatted output. Users can export their finished CVs as PDFs. The platform offers both free and premium templates, positioning itself as a SaaS product with potential upgrade paths.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (pages: Home, Templates, Builder, NotFound)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library based on Radix UI primitives (New York style variant)
- Tailwind CSS for utility-first styling with custom design tokens
- Design system follows Material Design principles mixed with modern SaaS aesthetics (inspired by Notion, Canva)
- Custom theme system supporting light/dark modes with CSS variables
- Typography: Inter font family from Google Fonts
- Component aliases configured for clean imports (@/components, @/lib, @/hooks)

**State Management Strategy**
- Form state managed by React Hook Form with Zod schema validation
- Server state managed by TanStack Query with optimistic updates
- Local UI state (theme, mobile menu) managed by React hooks
- Real-time CV preview updates through form watching

**Layout System**
- Responsive design with mobile-first approach
- Desktop: Split-screen layout (40% form editor, 60% live preview)
- Mobile: Tabbed interface switching between "Edit" and "Preview" views
- Sticky navigation header with logo, main nav, and CTA button

### Backend Architecture

**Server Framework**
- Express.js application with TypeScript
- Dual-mode setup: development (with Vite middleware) and production (static file serving)
- RESTful API design pattern
- Request/response logging middleware for debugging

**API Structure**
- `/api/templates` - GET all templates, GET template by ID
- `/api/cvs` - CRUD operations for CV documents
- Template and CV data served as JSON
- Error handling with appropriate HTTP status codes (404, 500)

**Development vs Production**
- Development: Vite dev server integrated as Express middleware with HMR support
- Production: Static asset serving from dist/public directory
- HTML template injection in development for cache busting

### Data Storage & Schema

**Database Strategy**
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Schema-first approach with TypeScript types generated from Drizzle schemas
- Zod schemas for runtime validation matching database schema

**Data Models**
- **CVs Table**: Stores CV documents with JSONB columns for flexible nested data
  - Personal info (name, email, phone, location, summary)
  - Experience entries (company, position, dates, description)
  - Education entries (school, degree, dates, description)
  - Skills array
  - Template ID reference

- **Templates Table**: Catalog of available CV templates
  - Template metadata (name, category)
  - Premium flag and pricing information

**Current Implementation**
- In-memory storage implementation (MemStorage) for development/demo
- Designed to be swapped with database-backed storage implementing IStorage interface
- Initial templates seeded in memory on startup

**Schema Validation**
- Drizzle-Zod integration for creating Zod schemas from database tables
- Insert schemas for type-safe data creation
- Runtime validation before database operations

### External Dependencies

**UI & Styling**
- Radix UI primitives (accordion, dialog, dropdown, select, tabs, toast, etc.) for accessible components
- Tailwind CSS with PostCSS for processing
- Class Variance Authority (CVA) for component variant management
- Lucide React for icon library

**Form Management**
- React Hook Form for performant form handling
- @hookform/resolvers for Zod schema integration
- Date-fns for date formatting in templates

**PDF Generation**
- jsPDF for PDF document creation
- html2canvas for rendering HTML elements to canvas before PDF conversion
- Export process captures the live preview element

**Database & ORM**
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection
- Drizzle Kit for schema migrations and pushing

**Build & Development Tools**
- esbuild for server-side code bundling in production
- tsx for TypeScript execution in development
- Vite plugins: React, runtime error overlay, Replit-specific tooling (cartographer, dev banner)

**Routing & Navigation**
- Wouter for client-side routing (lightweight alternative to React Router)

**Type Safety & Validation**
- Zod for schema validation throughout the application
- TypeScript with strict mode enabled
- Path aliases for clean imports