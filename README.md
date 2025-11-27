# CVCraft - Modern CV/Resume Generator SaaS

A modern, full-featured CV/Resume generator built with React and Express. Create, customize, and export professional CVs in PDF format with multiple templates.
## https://cvcraft-production.up.railway.app

![CVCraft](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![React](https://img.shields.io/badge/React-18+-61dafb)

## Features

### Core Features
- 🔐 **User Authentication** - Secure signup, login, and session management
- 📝 **CV Builder** - Intuitive interface for creating and editing CVs
- 👁️ **Real-time Preview** - See changes instantly as you type
- 📄 **PDF Export** - Download your CV as a professional PDF
- 🎨 **8 Templates** - Choose from 3 free templates or 5 premium designs
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌓 **Dark Mode** - Comfortable viewing in any lighting

### Template Categories
**Free Templates:**
- Modern Professional
- Classic Elegance
- Minimal Clean

**Premium Templates:**
- Creative Bold
- Executive Pro
- Tech Modern
- Designer Portfolio
- Academic Scholar

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Component library
- **Wouter** - Client-side routing
- **React Hook Form** - Form management
- **TanStack Query** - Data fetching
- **html2canvas & jsPDF** - PDF generation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Passport.js** - Authentication
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Database

### Infrastructure
- **Neon** - Serverless PostgreSQL
- **Replit** - Hosting & deployment

## Getting Started

### Quick Start (Replit)
The easiest way to get started is to fork this project on Replit - PostgreSQL is automatically provisioned!

### Installation (Local PC)

For detailed setup instructions on your local machine, see [LOCAL_SETUP.md](./LOCAL_SETUP.md) for:
- PostgreSQL installation (local or cloud)
- Environment configuration
- Database initialization
- Troubleshooting common issues

**Quick steps:**

1. **Clone the repository**
```bash
git clone https://github.com/JeanJAKK/cvcraft.git
cd cvcraft
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
Create a `.env` file:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/cvcraft
SESSION_SECRET=your_random_secret_key_32_chars_minimum
```

4. **Setup Database**
```bash
npm run db:push
```

5. **Start Development Server**
```bash
npm run dev
```

The application will start on `http://localhost:5000`

## Usage

### Creating a CV

1. **Sign up** - Create a new account with username and password
2. **Login** - Access your dashboard
3. **Create CV** - Click "New CV" and fill in your information
4. **Choose Template** - Select from 3 free or 5 premium templates
5. **Customize** - Edit content and see real-time preview
6. **Export** - Download as PDF when ready

### Available Routes

**Authentication**
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account
- `POST /api/auth/logout` - Logout

**CVs**
- `GET /api/cvs` - Get all user's CVs
- `GET /api/cvs/:id` - Get specific CV
- `POST /api/cvs` - Create new CV
- `PUT /api/cvs/:id` - Update CV
- `DELETE /api/cvs/:id` - Delete CV

**Templates**
- `GET /api/templates` - Get all available templates

## Project Structure

```
cvcraft/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities and hooks
│   │   └── App.tsx        # Main app component
│   └── vite.config.ts
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   ├── db.ts              # Database configuration
│   └── index-dev.ts       # Development entry point
├── shared/                # Shared code
│   └── schema.ts          # Data models & Zod schemas
├── package.json
└── tsconfig.json
```

## Database Schema

### Users Table
- `id` - UUID primary key
- `username` - Unique username
- `password` - Hashed password

### CVs Table
- `id` - UUID primary key
- `userId` - Foreign key to users
- `title` - CV title
- `content` - CV data (JSON)
- `templateId` - Selected template
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Templates Table
- `id` - Template identifier
- `name` - Template display name
- `category` - Template category
- `isPremium` - Premium flag
- `price` - Price in cents (null for free)

## Available Scripts

```bash
# Development
npm run dev           # Start dev server (Express + Vite)

# Database
npm run db:push      # Sync schema to database
npm run db:pull      # Pull schema from database

# Building
npm run build        # Build for production

# Production
npm run start        # Start production server
```

## Environment Variables

### Development (Replit)
All variables are managed automatically via Replit's secret management:
- `DATABASE_URL` - PostgreSQL connection string

### Deployment
When deploying, ensure these variables are configured:
- `DATABASE_URL` - Production database URL
- `NODE_ENV` - Set to "production"

## Features Coming Soon

- 💳 Payment integration (Flutterwave/PayPal)
- 🤖 AI-powered content suggestions
- 📊 Multiple CV versions per user
- 📈 User analytics and tracking
- 🎨 Custom branding options
- 🌐 Multi-language support
- 📧 Invoice generation and email delivery

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Standards

- TypeScript for type safety
- Prettier for code formatting
- ESLint for code quality
- Shadcn/ui components for UI
- Tailwind CSS for styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: apotrekokoujean06@gmail.com

## Deployment

### Deploy on Replit
This project is ready to deploy on Replit:

1. Click "Publish" button in Replit
2. Choose "Autoscale Deployments"
3. Configure deployment settings
4. Click "Publish"

Your app will be live at: `https://cvcraft-[unique-id].replit.dev`

### Deploy Elsewhere
The application can be deployed to any Node.js hosting:
- Heroku
- Vercel
- AWS
- DigitalOcean
- Render

### Production Checklist
- [ ] Database URL configured
- [ ] Environment variables set
- [ ] Build command: `npm run build`
- [ ] Start command: `npm run start`
- [ ] HTTPS enabled
- [ ] Database backups configured

## Security

- Passwords are hashed with bcryptjs
- Session-based authentication with express-session
- PostgreSQL for secure data storage
- Environment variables for sensitive data
- CORS protection (when needed)

## Performance

- Real-time preview with optimized re-renders
- Efficient PDF generation
- Database queries optimized with Drizzle ORM
- Frontend code splitting with Vite
- Serverless PostgreSQL with Neon for scalability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Author

**JeanJAKK**
- GitHub: [@JeanJAKK](https://github.com/JeanJAKK)
- Email: apotrekokoujean06@gmail.com

## Acknowledgments

- React community for amazing tools
- Shadcn/ui for beautiful components
- Drizzle ORM for excellent database toolkit
- Neon for serverless PostgreSQL
- Replit for hosting and deployment

---

**Made with ❤️ by JeanJAKK**

⭐ If you like this project, please star it on GitHub!
