# Design Guidelines: Modern CV Generator SaaS

## Design Approach
**Hybrid System + Reference Approach**: Combining Material Design's clarity for forms/inputs with inspiration from professional SaaS tools like Notion (clean forms), Canva (template galleries), and Resume.io (preview layouts). Focus on professional credibility with modern, clean aesthetics.

## Core Design Principles
1. **Professional Trust**: Design conveys credibility and polish
2. **Clarity Over Decoration**: Every element serves user understanding
3. **Seamless Flow**: Form-to-preview transition feels effortless
4. **Template Showcase**: Premium templates look distinctly valuable

## Typography System
- **Primary Font**: Inter or Work Sans (Google Fonts) - clean, professional sans-serif
- **Hierarchy**:
  - Page titles: text-3xl to text-4xl, font-semibold
  - Section headers: text-xl to text-2xl, font-medium
  - Form labels: text-sm, font-medium, uppercase tracking
  - Body/inputs: text-base
  - Helper text: text-sm, muted

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Consistent padding: p-4, p-6, p-8 for cards/sections
- Section gaps: gap-6, gap-8 for component spacing
- Form field spacing: space-y-4, space-y-6

**Container Strategy**:
- Max width: max-w-7xl for main content
- Two-column desktop layout for form + preview
- Single column mobile with tabbed navigation

## Component Library

### Navigation Header
- Sticky header with logo left, navigation center, "Upgrade" CTA right
- Include: Templates, My CVs, Pricing navigation items
- Clean separation with subtle border-bottom

### CV Builder Main Interface
**Desktop Layout**:
- Split screen: Form editor (40%) | Live preview (60%)
- Form side: Scrollable sections (Personal Info, Experience, Education, Skills, etc.)
- Preview side: Fixed position showing real-time CV render
- Floating save/export toolbar at bottom

**Mobile Layout**:
- Tab switcher: "Edit" and "Preview" tabs
- Full-width form or preview based on active tab

### Form Components
- Grouped sections with expand/collapse capability
- Input fields: Full-width with clear labels above
- Multi-item sections (Experience, Education): Add/remove with (+) and (×) buttons
- Date pickers: Month/Year dropdowns
- Rich text areas for descriptions (simple formatting: bold, italic, bullets)

### Template Gallery
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Each template card shows:
  - Full CV preview thumbnail
  - Template name
  - "Free" badge or "Premium - $X" pricing
  - "Use Template" button
- Hover state: Subtle lift shadow, preview enlarges slightly
- Filter bar: All, Free, Premium, by Style (Modern, Classic, Creative)

### PDF Export Modal
- Center modal with preview thumbnail
- Export options: File format (PDF), paper size (A4/Letter)
- Download progress indicator
- Success state with "Download" and "Share" options

### Pricing Section (for premium templates)
- Simple card comparison: Free vs Premium
- Free tier: Access to 3 templates, basic exports
- Premium tier: All templates, priority support, custom branding removal
- Clear "Upgrade Now" CTA with Stripe integration

## Images
**Hero Section** (Landing/Homepage):
- Use professional stock image: Person working on laptop in modern office, or diverse professionals in clean workspace
- Overlay with blur backdrop for headline and CTA
- Headline: "Create Your Professional CV in Minutes"
- Subheading + "Get Started Free" button with blur background

**Template Preview Images**:
- High-fidelity mockups of each CV template
- Show realistic dummy content to demonstrate layout
- Consistent aspect ratio for all preview thumbnails

## Responsive Behavior
**Breakpoints**:
- Mobile: < 768px - Single column, tabbed interface
- Tablet: 768px-1024px - Compressed two-column or adaptive layout
- Desktop: > 1024px - Full split-screen experience

**Mobile Optimizations**:
- Sticky "Preview" button at bottom to toggle view
- Simplified form with one section visible at a time
- Template gallery: Single column with larger cards

## Interaction Patterns
- **Real-time Updates**: Preview updates as user types (debounced 300ms)
- **Autosave**: Subtle indicator showing "Saved" status
- **Template Switching**: Smooth transition when changing templates
- **Form Validation**: Inline error messages, non-intrusive
- **Minimal Animations**: Smooth transitions for modal open/close, tab switches (200-300ms)

## Trust & Conversion Elements
- Social proof: "Join 50,000+ professionals" counter on homepage
- Template gallery: "Most Popular" badge on top templates
- Pricing: "30-day money-back guarantee" for premium
- Footer: Privacy policy, terms, contact support links

## Accessibility
- All form inputs with proper labels and aria-attributes
- Keyboard navigation through entire form and template gallery
- Focus states on all interactive elements
- Color contrast meeting WCAG AA standards
- Screen reader announcements for live preview updates

This design balances professional utility with modern SaaS polish, creating an intuitive CV building experience that drives conversion to premium templates.