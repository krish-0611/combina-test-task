# KK Demo - Dashboard Application

A modern, responsive dashboard application built with React, TypeScript, and the latest web technologies. This project demonstrates a comprehensive partner management dashboard with real-time metrics, analytics, and approval workflows.

## 🚀 Technologies

### Core Framework
- **React 19.2.0** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.2.4** - Fast build tool and dev server

### Routing & State Management
- **TanStack Router 1.147.3** - Type-safe file-based routing
- **TanStack Query 5.90.16** - Powerful data synchronization and caching
- **TanStack Router Devtools** - Development tools for routing

### UI & Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Avatar, Dialog, Dropdown Menu, Label, Popover, Progress, Scroll Area, Select, Separator, Tabs, Tooltip
- **Shadcn UI** - High-quality React components built on Radix UI
- **Lucide React** - Beautiful icon library
- **Framer Motion 12.26.1** - Animation library

### Utilities
- **date-fns 4.1.0** - Date utility library
- **react-day-picker 9.13.0** - Date picker component
- **Zod 4.3.5** - TypeScript-first schema validation
- **clsx & tailwind-merge** - Conditional class name utilities
- **class-variance-authority** - Component variant management

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

## 🛠️ Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### 3. Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### 4. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### 5. Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
KK-demo/
├── public/
│   └── images/          # Static image assets
├── src/
│   ├── assets/         # Application assets
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.tsx      # Main dashboard page
│   │   │   ├── layout/
│   │   │   │   └── Header.tsx         # Dashboard header component
│   │   │   └── sections/
│   │   │       ├── NeedsApproval.tsx      # Approval requests section
│   │   │       ├── StatsCards.tsx          # Statistics cards
│   │   │       ├── ProgramGrowth.tsx       # Program growth metrics
│   │   │       ├── PayoutsLastQuarter.tsx  # Payouts chart
│   │   │       ├── PartnerFunnel.tsx       # Partner funnel visualization
│   │   │       ├── UserAvatars.tsx         # User avatars sidebar
│   │   │       ├── LatestUpdates.tsx        # Latest updates section
│   │   │       └── PerformanceMetrics.tsx  # Performance metrics
│   │   └── ui/         # Reusable UI components (Shadcn UI)
│   ├── hooks/
│   │   └── useDashboardData.ts  # Custom React Query hooks
│   ├── lib/
│   │   ├── api/
│   │   │   └── mock-data.ts      # Mock API data and types
│   │   ├── constants.ts         # Application constants
│   │   ├── query-client.ts      # TanStack Query configuration
│   │   └── utils.ts             # Utility functions
│   ├── routes/
│   │   ├── __root.tsx           # Root route layout
│   │   ├── index.tsx            # Home route (redirects to dashboard)
│   │   └── dashboard.tsx        # Dashboard route
│   ├── routeTree.gen.ts         # Auto-generated route tree
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── dist/                        # Production build output
├── node_modules/               # Dependencies
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # TypeScript app configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

## 🗺️ Routes

The application uses **TanStack Router** for type-safe, file-based routing:

### Available Routes

1. **`/` (Root)**
   - **File**: `src/routes/index.tsx`
   - **Description**: Redirects to `/dashboard`
   - **Component**: Redirect component

2. **`/dashboard`**
   - **File**: `src/routes/dashboard.tsx`
   - **Description**: Main dashboard page
   - **Component**: `DashboardPage`
   - **Features**:
     - Latest updates feed
     - Partner metrics overview
     - Needs approval section
     - Payouts visualization
     - Partner funnel chart
     - Statistics cards
     - Program growth metrics
     - User avatars sidebar

### Route Layout

All routes are wrapped in the root layout (`__root.tsx`) which includes:
- Global header component
- Main content area
- TanStack Router Devtools (development only)

## 🎨 Key Features

### Dashboard Sections

1. **Latest Updates**
   - Horizontal scrolling feed of recent updates
   - Real-time notifications
   - Source-based categorization

2. **Partner Metrics**
   - 8 key performance indicators
   - Interactive metric selection
   - Tab-based navigation (Overview, Database, Rebate Journey, Contracts, Retailers)

3. **Needs Approval**
   - Pending approval requests
   - Partner information display
   - Bulk approval functionality
   - Time-based sorting

4. **Payouts Last Quarter**
   - Bar chart visualization
   - Growth percentage display
   - Monthly breakdown
   - Active/inactive status indicators

5. **Partner Funnel**
   - Sales funnel visualization
   - Multiple view modes (Last Quarter, Influenced, Forecast)
   - Growth metrics
   - Stage-based breakdown

6. **Statistics Cards**
   - Outreached partners count
   - Onboarded partners
   - Awaiting deliverables
   - Growth indicators

7. **Program Growth**
   - Partner acquisition breakdown
   - Source-based analytics
   - Progress bars visualization
   - Tab filtering (Application, Product, Campaign)

8. **User Avatars**
   - Team member display
   - Badge notifications
   - Vertical scrolling sidebar

### Data Management

- **Mock API**: All data is currently served from mock API functions in `src/lib/api/mock-data.ts`
- **React Query**: Data fetching, caching, and synchronization handled by TanStack Query
- **Loading States**: Skeleton loaders for all data sections
- **Error Handling**: Graceful error states with user-friendly messages

## 🎯 Code Quality Standards

This project follows strict coding standards:

- ✅ **No console.log statements** in production code
- ✅ **TypeScript strict mode** enabled
- ✅ **Consistent code formatting** and spacing
- ✅ **Accessibility attributes** (aria-labels, roles)
- ✅ **Proper error handling** with user feedback
- ✅ **Reusable components** and utilities
- ✅ **Constants extraction** for magic numbers and strings
- ✅ **JSDoc comments** for components and functions
- ✅ **ESLint** configuration for code quality

## 🔧 Configuration

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/` maps to `src/`)
- Modern ES2022 target
- React JSX transform

### Vite

- React plugin enabled
- TanStack Router Vite plugin for route generation
- Path alias resolution configured

### Tailwind CSS

- Custom color palette
- Responsive breakpoints
- Utility-first approach

### React Query

- 5-minute stale time
- Window focus refetch disabled
- Optimistic updates support

## 📦 Adding New Components

### Shadcn UI Components

To add new Shadcn UI components:

```bash
npx shadcn@latest add [component-name]
```

### Creating New Routes

1. Create a new file in `src/routes/`
2. Export a route using `createFileRoute`
3. The route will be automatically added to the route tree

Example:
```typescript
import { createFileRoute } from '@tanstack/react-router'
import MyComponent from '@/components/MyComponent'

export const Route = createFileRoute('/my-route')({
  component: MyComponent,
})
```

## 🧪 Development Guidelines

### Component Structure

- Use functional components with TypeScript
- Extract reusable logic into custom hooks
- Keep components focused and single-purpose
- Use proper prop typing

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS variables for theme colors
- Maintain consistent spacing and typography

### Data Fetching

- Use React Query hooks from `useDashboardData.ts`
- Handle loading and error states
- Use skeleton loaders for better UX

### Accessibility

- Include aria-labels for interactive elements
- Use semantic HTML
- Ensure keyboard navigation
- Maintain proper color contrast

## 🐛 Troubleshooting

### Build Issues

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version compatibility

### Route Issues

- Ensure route files follow naming convention
- Check `routeTree.gen.ts` for route registration
- Restart dev server after route changes

### Type Errors

- Run `npm run build` to check for TypeScript errors
- Ensure all imports use correct paths
- Check `tsconfig.json` for path alias configuration

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔮 Future Enhancements

Potential improvements for the project:

- [ ] Real API integration
- [ ] Authentication and authorization
- [ ] Real-time data updates (WebSockets)
- [ ] Advanced filtering and search
- [ ] Export functionality (CSV, PDF)
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] Unit and integration tests
- [ ] E2E testing with Playwright/Cypress
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a demo project. For questions or issues, please contact the development team.

---

**Built with ❤️ using modern web technologies**
