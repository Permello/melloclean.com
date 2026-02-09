# Feature: Dashboard Shell (Layout + Sidebar + Routing)

> Shared layout with sidebar navigation, Outlet for nested routes, and route configuration.

## Overview

The dashboard shell is the shared layout component wrapping all dashboard pages. It includes a persistent sidebar navigation, user profile display, and a main content area with `<Outlet>` for nested routes. The layout loader acts as the auth guard.

## Decisions

| Decision | Choice |
|----------|--------|
| Layout | Sidebar (left) + main content (right) |
| Sidebar | Persistent on desktop, collapsible on mobile |
| Auth guard | Layout loader checks auth token |
| User display | Avatar + name in sidebar |
| Logout | Button in sidebar footer |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/layout.tsx` | DashboardLayout with sidebar + `<Outlet>`, auth guard loader |
| `pages/dashboard/components/DashboardSidebar.tsx` | Sidebar with nav links, user info, logout |
| `pages/dashboard/components/index.tsx` | Barrel exports for all dashboard components |

## New UI Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **Sidebar** | `components/ui/sidebar/` | Generic sidebar container with nav, header, footer slots |
| **Avatar** | `components/ui/avatar/` | User profile photo/initials display |

## Route Configuration

```typescript
// frontend/routes.ts — add to existing config
{
  path: "dashboard",
  file: "pages/dashboard/layout.tsx",
  children: [
    { index: true, file: "pages/dashboard/index.tsx" },
    { path: "schedule", file: "pages/dashboard/schedule.tsx" },
    { path: "schedule/new", file: "pages/dashboard/schedule-new.tsx" },
    { path: "schedule/:id/edit", file: "pages/dashboard/schedule-edit.tsx" },
    { path: "invoices", file: "pages/dashboard/invoices.tsx" },
    { path: "invoices/:id", file: "pages/dashboard/invoice-detail.tsx" },
    { path: "payments", file: "pages/dashboard/payments.tsx" },
    { path: "account", file: "pages/dashboard/account.tsx" },
    { path: "support", file: "pages/dashboard/support.tsx" },
    { path: "referrals", file: "pages/dashboard/referrals.tsx" },
    { path: "notifications", file: "pages/dashboard/notifications.tsx" },
  ],
}
```

## Layout Loader (Auth Guard)

```
/dashboard (layout) loader:
1. Call authGuard() from core/auth
2. If no auth token → redirect("/login")
3. If token exists → load UserProfile from localStorage
4. Return { user } for sidebar display
```

## Sidebar Navigation Links

| Link | Path | Icon |
|------|------|------|
| Overview | `/dashboard` | Home |
| Schedule | `/dashboard/schedule` | Calendar |
| Invoices | `/dashboard/invoices` | Receipt |
| Payments | `/dashboard/payments` | CreditCard |
| Account | `/dashboard/account` | User |
| Support | `/dashboard/support` | HelpCircle |
| Referrals | `/dashboard/referrals` | Share |
| Notifications | `/dashboard/notifications` | Bell |

## Layout Structure

```
┌──────────┬──────────────────────────────┐
│ SIDEBAR  │  MAIN CONTENT                │
│          │                              │
│ [Avatar] │  <Outlet />                  │
│ Test User│                              │
│          │  (renders nested route page) │
│ ──────── │                              │
│ Overview │                              │
│ Schedule │                              │
│ Invoices │                              │
│ Payments │                              │
│ Account  │                              │
│ ──────── │                              │
│ Support  │                              │
│ Referrals│                              │
│ Notifs   │                              │
│ ──────── │                              │
│ [Logout] │                              │
└──────────┴──────────────────────────────┘
```

## Mobile Behavior

- Sidebar collapses to a hamburger menu
- Content takes full width
- Sidebar slides in as an overlay when hamburger is clicked

## Reuses

- **Sidebar** (new) — generic sidebar component
- **Avatar** (new) — user photo/initials
- **Button** (`components/ui/button/`) — logout button, hamburger toggle
- **Heading** (`components/ui/heading/`) — sidebar title
- **Text** (`components/ui/text/`) — user name display

## TSDoc Comments

- DashboardLayout component
- Auth guard loader
- DashboardSidebar nav structure
- Mobile responsive behavior notes
