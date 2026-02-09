# Dashboard Feature — Brainstorm 1 (Initial Draft)

> First draft before reviewing existing codebase. See brainstorm-2.md for revised version.

## Context

Melloclean.com needs a client dashboard where authenticated users can manage their cleaning service relationship: schedule appointments, view/download invoices, manage payment methods, and update account information. There is no backend yet, so we'll use local storage for persistence and dummy auth, while structuring all data access through React Router 7 actions/loaders so the backend swap is seamless later.

---

## Architecture Decisions

| Decision | Choice |
|----------|--------|
| Layout | Sidebar navigation |
| Routing | Nested routes under `/dashboard` with shared layout + `<Outlet>` |
| Component location | Dashboard-specific components co-located in `pages/dashboard/` |
| Phasing | Incremental phases |
| Scheduling | Full CRUD + recurring |
| Dummy auth | Any credentials work, pre-populated dummy data |
| Data persistence | Local storage (survives refresh) |
| Addresses | Separate service + billing, with "same as" toggle |

---

## New UI Components (Initial Proposal)

These were proposed as generic reusable components for `frontend/components/ui/`:

| Component | Purpose | Notes |
|-----------|---------|-------|
| **Sidebar** | Persistent left-side dashboard navigation | Collapsible on mobile, React Aria landmark roles |
| **Card** | Container for appointment cards, invoice cards, payment cards | CVA variants: `default`, `outlined`, `interactive` |
| **DataTable** | Table for invoice listings | Sortable columns, React Aria `useTable` |
| **Badge** | Status indicators (Upcoming, Completed, Cancelled, Paid, Pending) | CVA color variants per status |
| **DatePicker** | Appointment date/time selection | React Aria `useDatePicker` |
| **Select** | Dropdown for service type, frequency | React Aria `useSelect`, CVA styled |
| **Toggle** | "Billing same as service address" switch | React Aria `useSwitch` |
| **EmptyState** | Placeholder when no data exists | Icon + message + CTA button |
| **Avatar** | User profile display in sidebar | Initials fallback |
| **Pagination** | List pagination for invoices/appointments | React Aria compliant |
| **Tabs** | Sub-navigation within dashboard sections | React Aria `useTabList` |
| **ConfirmDialog** | Extends Modal for destructive actions | Preset with destructive styling |
| **CreditCardDisplay** | Masked card display (brand + last 4 + expiry) | Read-only display |

---

## Dashboard-Specific Components (co-located in `pages/dashboard/`)

| Component | Purpose |
|-----------|---------|
| **DashboardLayout** | Sidebar + main content area + `<Outlet>` |
| **DashboardSidebar** | Sidebar instance with nav links, user avatar, logout |
| **AppointmentCard** | Single appointment display with actions (reschedule, cancel) |
| **AppointmentForm** | Book/edit appointment form (could use Wizard for multi-step) |
| **RecurringAppointmentConfig** | Frequency selector + day/time picker for recurring bookings |
| **InvoiceRow** | Single invoice table row with download action |
| **InvoiceDetail** | Full invoice view (for PDF rendering) |
| **PaymentCardForm** | Add/edit credit card form |
| **PaymentCardItem** | Single card display with set-default/delete actions |
| **AccountForm** | Account info edit form (password, addresses, phone) |
| **AddressFields** | Reusable address field group (street, city, state, zip) |
| **BookingDataBanner** | Banner shown when pending booking data found in local storage on first login |

---

## Proposed File Structure

```
frontend/
├── pages/
│   ├── dashboard/
│   │   ├── layout.tsx              # DashboardLayout (sidebar + Outlet)
│   │   ├── index.tsx               # Dashboard overview/home page
│   │   ├── schedule.tsx            # Schedule page (loader + action)
│   │   ├── schedule-new.tsx        # New appointment page/modal
│   │   ├── schedule-edit.tsx       # Edit appointment page/modal
│   │   ├── invoices.tsx            # Invoice list page (loader)
│   │   ├── invoice-detail.tsx      # Single invoice view (loader)
│   │   ├── payments.tsx            # Payment methods page (loader + action)
│   │   ├── account.tsx             # Account settings page (loader + action)
│   │   └── components/
│   │       ├── DashboardSidebar.tsx
│   │       ├── AppointmentCard.tsx
│   │       ├── AppointmentForm.tsx
│   │       ├── RecurringAppointmentConfig.tsx
│   │       ├── InvoiceRow.tsx
│   │       ├── InvoiceDetail.tsx
│   │       ├── PaymentCardForm.tsx
│   │       ├── PaymentCardItem.tsx
│   │       ├── AccountForm.tsx
│   │       ├── AddressFields.tsx
│   │       └── BookingDataBanner.tsx
│   ├── auth/
│   │   ├── login.tsx               # Login page (action)
│   │   └── signup.tsx              # Signup page (action)
├── components/ui/
│   ├── Sidebar/
│   ├── Card/
│   ├── DataTable/
│   ├── Badge/
│   ├── DatePicker/
│   ├── Select/
│   ├── Toggle/
│   ├── EmptyState/
│   ├── Avatar/
│   ├── Pagination/
│   ├── Tabs/
│   ├── ConfirmDialog/
│   └── CreditCardDisplay/
├── core/
│   ├── auth/
│   │   ├── auth.ts                 # Auth utilities (dummy login/signup/logout)
│   │   ├── auth.context.tsx        # AuthProvider + useAuth hook
│   │   └── auth.guard.tsx          # ProtectedRoute component/loader guard
│   ├── storage/
│   │   ├── storage.ts              # Generic local storage helpers
│   │   ├── storage.keys.ts         # All local storage key constants
│   │   └── storage.mock-data.ts    # Seed data for dummy user, invoices, appointments
│   └── pdf/
│       └── invoice-pdf.ts          # PDF generation utility for invoices
```

---

## Route Configuration

```typescript
// frontend/routes.ts additions
{
  path: "login",
  file: "pages/auth/login.tsx",
},
{
  path: "signup",
  file: "pages/auth/signup.tsx",
},
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
  ],
}
```

---

## Actions & Loaders (React Router 7)

### Auth Routes

| Route | Loader | Action |
|-------|--------|--------|
| `/login` | Redirect to `/dashboard` if already authenticated | Validate credentials (dummy: always pass), set auth token in local storage, check for pending booking data, redirect to `/dashboard` |
| `/signup` | Redirect to `/dashboard` if already authenticated | Create user in local storage, set auth token, check for pending booking data, redirect to `/dashboard` |

### Dashboard Routes

| Route | Loader | Action |
|-------|--------|--------|
| `/dashboard` (layout) | **Auth guard**: check auth token, redirect to `/login` if missing. Load user profile for sidebar display. | — |
| `/dashboard` (index) | Load summary data: upcoming appointments count, pending invoices count, payment methods count | Process pending booking data action (from local storage booking form) |
| `/dashboard/schedule` | Load all appointments (upcoming, past, recurring) with filtering/sorting | — |
| `/dashboard/schedule/new` | Load available service types, time slots | Create new appointment (single or recurring) |
| `/dashboard/schedule/:id/edit` | Load single appointment by ID | Update appointment (reschedule) or cancel (soft delete with status change) |
| `/dashboard/invoices` | Load all invoices with pagination, filtering by status/date | — |
| `/dashboard/invoices/:id` | Load single invoice with full details | Generate + download PDF |
| `/dashboard/payments` | Load all payment methods (max 5), identify default | Add new card, delete card, set default card |
| `/dashboard/account` | Load user profile (name, email, phone, addresses, billing) | Update password, update service address, update billing address, update phone |

### Booking Data Flow (First Login)

```
1. User fills booking form on landing page → data saved to localStorage["mello_pending_booking"]
2. User signs up or logs in → login/signup action checks for localStorage["mello_pending_booking"]
3. If found → redirect to /dashboard with ?pendingBooking=true search param
4. Dashboard index loader detects param → shows BookingDataBanner
5. User confirms → action sends booking data (to future API), clears localStorage key
6. User dismisses → clears localStorage key
```

---

## Local Storage Schema

```typescript
export const STORAGE_KEYS = {
  AUTH_TOKEN: "mello_auth_token",
  USER_PROFILE: "mello_user_profile",
  APPOINTMENTS: "mello_appointments",
  INVOICES: "mello_invoices",
  PAYMENT_METHODS: "mello_payment_methods",
  PENDING_BOOKING: "mello_pending_booking",
} as const;
```

### Data Shapes

```typescript
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceAddress: Address;
  billingAddress: Address;
  billingSameAsService: boolean;
  createdAt: string;
}

interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
}

interface Appointment {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "completed" | "cancelled";
  address: Address;
  notes?: string;
  recurring?: {
    frequency: "weekly" | "biweekly" | "monthly";
    endDate?: string;
  };
  createdAt: string;
}

interface Invoice {
  id: string;
  appointmentId: string;
  date: string;
  serviceType: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  paymentMethodLast4?: string;
  items: InvoiceLineItem[];
}

interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PaymentMethod {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "discover";
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  nickname?: string;
}
```

---

## Dummy Auth

```
- Login: Accept ANY email + password combination
- On login/signup, generate a dummy user profile with pre-populated data
- Pre-seeded with 3-4 sample appointments, 3-4 sample invoices, 1 sample credit card
- Auth token: simple UUID stored in localStorage
- Auth guard: dashboard layout loader checks for token existence
- Logout: clear all mello_* keys from localStorage, redirect to /login
```

---

## PDF Invoice Generation

- Use a lightweight library (e.g., `jspdf` or `@react-pdf/renderer`)
- Generate PDF client-side from invoice data
- Include: company logo/name, invoice #, date, service details, line items, total, payment status
- Triggered via action on `/dashboard/invoices/:id`

---

## Phased Implementation Plan

### Phase 1: Auth + Dashboard Shell
1. Create local storage utility layer
2. Create auth utilities and context
3. Build login and signup pages with actions
4. Build DashboardLayout with DashboardSidebar
5. Add auth guard loader to dashboard layout
6. Add route configuration
7. Implement dummy data seeding on first login
8. Implement pending booking data detection + BookingDataBanner
9. Build dashboard index page with summary cards
10. New UI components: Sidebar, Card, Avatar, EmptyState

### Phase 2: Scheduling
1. Build schedule page with appointment list (upcoming/past/recurring tabs)
2. Build AppointmentCard component
3. Build AppointmentForm for creating new appointments
4. Build RecurringAppointmentConfig
5. Build schedule-edit page for rescheduling
6. Implement cancel appointment flow with ConfirmDialog
7. Add loaders and actions for all schedule routes
8. New UI components: DatePicker, Select, Tabs, Badge, ConfirmDialog

### Phase 3: Invoices
1. Build invoices page with DataTable listing
2. Build InvoiceRow component
3. Build invoice detail page
4. Implement PDF generation utility
5. Wire up PDF download action
6. New UI components: DataTable, Pagination

### Phase 4: Payment Methods
1. Build payments page with card list
2. Build PaymentCardItem display
3. Build PaymentCardForm for adding new cards
4. Implement max-5-cards validation
5. Implement set-default and delete actions

### Phase 5: Account Settings
1. Build account page with sectioned form
2. Build AccountForm with sections
3. Build AddressFields reusable component
4. Implement "billing same as service" toggle
5. Add password change validation

### Phase 6: Documentation & Cleanup
1. Update CLAUDE.md
2. Update .claude/docs/ files
3. Create dashboard-patterns.md
4. Run typecheck, dev, and copyright

---

## Comments Plan

- TSDoc on all exported interfaces, auth utilities, storage helpers, and layout components per phase
- Follow existing tsdoc-conventions.md patterns

## CLAUDE.md Update Plan

- Add dashboard routes to project structure
- Add new UI components to component listing
- Add auth/storage/pdf to core directory docs
- Add dashboard-specific patterns
- Update all .claude/docs/ files
