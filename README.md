# Khlan

Khlan is a fictitious SaaS analytics dashboard built as a frontend portfolio project. It simulates a production-grade platform for team management, project tracking, and data visualization. The application is not connected to any real backend or database — all data is mocked on the client side.

This project was designed and developed by **Gustavo J.**

---

## Overview

The application consists of two main areas:

- **Landing Page** — A public-facing marketing page with a hero section, feature grid, pricing plans, call-to-action, and footer. Inspired by modern SaaS landing pages with a dark aesthetic, floating navigation, and scroll-driven animations.

- **Dashboard** — A fully interactive admin panel featuring multiple pages: overview with configurable widgets, analytics with charts and tables, project management, team directory, billing, profile, and settings.

The dashboard includes authentication simulation (login persisted via localStorage), an onboarding tour for first-time users, a command palette accessible via Ctrl+K, and toast notifications across all interactive actions.

---

## Tech Stack

| Category         | Technology                                                |
|------------------|-----------------------------------------------------------|
| Framework        | Next.js 15 (App Router)                                   |
| Language         | TypeScript                                                |
| Styling          | Tailwind CSS v4                                           |
| UI Components    | shadcn/ui                                                 |
| Animations       | Framer Motion                                             |
| Drag and Drop    | @dnd-kit                                                  |
| Theming          | next-themes (light/dark mode)                             |
| State Management | React Context API                                         |
| Persistence      | localStorage (auth, widget layout, onboarding state)      |
| Icons            | Lucide React                                              |
| Font             | Inter (Google Fonts)                                      |

---

## Features

### Landing Page
- Floating pill-style navbar with glassmorphism and scroll detection
- Hero section with grid background, geometric prism, and conic gradient effect
- Parallax scrolling on the hero content
- Feature grid with hover states
- Pricing section with three tiers
- Final call-to-action section
- Responsive footer with social links

### Dashboard
- Drag-and-drop widget reordering on the overview page
- Widget visibility toggles with layout persistence
- Real-time animated area chart with live data updates
- KPI cards with formatted numbers and change indicators
- Activity table with recent events
- Analytics page with bar charts, traffic sources, and top pages
- Project cards with status badges, progress bars, and detail modals
- Team directory with sortable columns and search
- Profile page with tabs for overview, activity, and security
- Billing page with usage bars, plan comparison, and invoice history
- Settings page with toggleable preferences
- Skeleton loading states on all pages
- Toast notification system (success, error, info)
- Guided onboarding tour with spotlight mask
- Command palette with keyboard navigation
- Light and dark theme support
- Responsive sidebar with collapse and mobile hamburger menu
- Client-side authentication with login/logout flow

---

## Getting Started

```bash
npm install
npm run dev
```

The application runs on `http://localhost:3000`. The landing page is the default route. Navigate to `/login` to access the dashboard with any credentials.

---

## Project Structure

```
src/
  app/
    page.tsx                  Landing page
    login/page.tsx            Login page
    dashboard/
      page.tsx                Overview (configurable widgets)
      layout.tsx              Dashboard shell (sidebar, navbar, providers)
      analytics/page.tsx      Analytics page
      projects/page.tsx       Projects page
      team/page.tsx           Team directory
      profile/page.tsx        User profile
      billing/page.tsx        Billing and plans
      settings/page.tsx       Workspace settings
  components/
    dashboard/                All dashboard-specific components
    ui/                       shadcn/ui primitives
  context/
    user-context.tsx          Authentication context
  lib/
    mock-data.ts              All mock data and type definitions
```

---

## Disclaimer

This is a portfolio project. Khlan is not a real product or company. All data displayed in the dashboard is hardcoded or randomly generated on the client. No real authentication, payment processing, or backend services are involved.

---

## License

MIT
