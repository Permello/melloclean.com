# Dashboard Feature — Brainstorm 2 (Revised After Codebase Review)

> Revised from brainstorm-1.md after reviewing existing components, pages, and core utilities.
> Key changes: removed duplicate components, marked existing pages as MODIFY not CREATE, adapted from existing patterns.

---

## Architecture Decisions

| Decision | Choice |
|----------|--------|
| Layout | Sidebar navigation |
| Routing | Nested routes under `/dashboard` with shared layout + `<Outlet>` |
| Component location | Dashboard-specific components co-located in `pages/dashboard/` |
| Phasing | 6 incremental phases |
| Scheduling | Full CRUD + recurring |
| Dummy auth | Any credentials work, pre-populated dummy data |
| Data persistence | Local storage (survives refresh) |
| Addresses | Separate service + billing, with "same as" toggle |

---

## Existing Components & Utilities (DO NOT recreate)

These already exist and should be **reused directly**:

| Existing Asset | Location | Reuse For |
|----------------|----------|-----------|
| **Select** | `components/ui/select/` | Service type dropdowns, frequency selectors |
| **Modal / ModalTrigger** | `components/ui/modal/` | Confirm dialogs (cancel appointment, delete card) |
| **ToggleButtonGroup** | `components/ui/toggle-button-group/` | Multi-option selections (e.g., priority areas) |
| **Input** | `components/ui/input/` | All text/email/password fields |
| **Textarea** | `components/ui/textarea/` | Notes fields |
| **Button** | `components/ui/button/` | All actions (destructive variant for delete/cancel) |
| **Heading** | `components/ui/heading/` | Section headings |
| **Text** | `components/ui/text/` | Body text, descriptions |
| **Slider** | `components/ui/slider/` | If needed for any range inputs |
| **Toast / ToastProvider** | `components/ui/toast/` | Success/error notifications |
| **Wizard** | `components/ui/wizard/` | Multi-step appointment booking form |
| **Login page** | `pages/auth/login/login.tsx` | Modify for dummy auth (don't recreate) |
| **Signup page** | `pages/auth/join/` | Modify for dummy auth (don't recreate) |
| **AuthLayout** | `pages/auth/components/auth-layout.tsx` | Keep wrapping auth pages |
| **PasswordInput** | `pages/auth/components/password-input.tsx` | Password fields in account settings |
| **AddressSection** | `pages/auth/join/components/address-section.tsx` | Reuse/adapt for account address forms |
| **AccountSection** | `pages/auth/join/components/account-section.tsx` | Reuse/adapt for account info forms |
| **validators + validateForm** | `core/util/validation.ts` | All form validation |
| **cn()** | `core/util/cn.ts` | Class merging |
| **mergeRefs** | `core/util/mergeRef.ts` | Ref merging |
| **companyConfig** | `core/config/config.ts` | Company info on invoices |

---

## New UI Components Needed

These are **genuinely new** generic components for `frontend/components/ui/`:

| Component | Purpose | React Aria Hook | Notes |
|-----------|---------|-----------------|-------|
| **Sidebar** | Persistent dashboard navigation | `useNavigation` / landmark roles | Collapsible on mobile, CVA variants |
| **Card** | Container for appointments, invoices, payment cards | — | CVA variants: `default`, `outlined`, `interactive` |
| **DataTable** | Sortable table for invoice listings | `useTable` | Column definitions, sort state |
| **Badge** | Status indicators (Upcoming, Completed, Cancelled, Paid, Pending) | — | CVA color variants per status |
| **DatePicker** | Appointment date/time selection | `useDatePicker` | Calendar popup with time selector |
| **Switch** | On/off toggle for "billing same as service address" | `useSwitch` | Different from ToggleButtonGroup (which is multi-select pills) |
| **EmptyState** | Placeholder when no data (no appointments, no invoices) | — | Icon + message + CTA Button |
| **Avatar** | User profile display in sidebar | — | Initials fallback, CVA size variants |
| **Pagination** | List pagination for invoices/appointments | — | Page numbers + prev/next |
| **Tabs** | Sub-navigation within sections (upcoming/past/recurring) | `useTabList` | Animated underline indicator |

Each follows the existing CVA file structure:
```
component-name/
├── component-name.tsx
├── index.ts
└── ts/
    ├── constants.ts
    ├── types.ts
    └── variants.ts
```

### What Changed from Brainstorm 1

- **Removed Select** — already exists in `components/ui/select/`
- **Removed ConfirmDialog** — reuses existing `Modal/ModalTrigger` with `Button` destructive variant
- **Removed CreditCardDisplay** — folded into dashboard-specific `PaymentCardItem` component
- **Renamed Toggle → Switch** — `ToggleButtonGroup` already exists for multi-select; `Switch` is specifically for on/off using React Aria `useSwitch`

---

## Dashboard-Specific Components (co-located in `pages/dashboard/`)

| Component | Purpose |
|-----------|---------|
| **DashboardLayout** | Sidebar + main content area + `<Outlet>` |
| **DashboardSidebar** | Sidebar instance with nav links, user avatar, logout |
| **AppointmentCard** | Single appointment display with reschedule/cancel actions |
| **AppointmentForm** | Book/edit appointment form (uses Wizard for multi-step) |
| **RecurringConfig** | Frequency selector + day/time picker for recurring bookings |
| **InvoiceRow** | Single invoice table row with download action |
| **InvoiceDetail** | Full invoice view (for PDF rendering) |
| **PaymentCardForm** | Add credit card form (card number, expiry, CVC) |
| **PaymentCardItem** | Single card display with set-default/delete actions |
| **AccountForm** | Account info edit form (sections: password, addresses, phone) |
| **AddressFields** | Reusable address field group — **adapted from** existing `address-section.tsx` |
| **BookingDataBanner** | Banner when pending booking data found in local storage on first login |

---

## Proposed File Structure

```
frontend/
├── pages/
│   ├── auth/
│   │   ├── login/
│   │   │   └── login.tsx              # MODIFY: add dummy auth logic
│   │   ├── join/
│   │   │   ├── join.tsx               # MODIFY: add dummy auth + local storage seeding
│   │   │   ├── join-form-content.tsx   # EXISTING
│   │   │   ├── ts/
│   │   │   │   ├── types.ts           # EXISTING
│   │   │   │   └── constants.ts       # EXISTING
│   │   │   └── components/
│   │   │       ├── account-section.tsx # EXISTING (reuse patterns from here)
│   │   │       └── address-section.tsx # EXISTING (reuse patterns from here)
│   │   ├── components/                # EXISTING shared auth components
│   │   └── index.tsx                  # EXISTING barrel exports
│   ├── dashboard/
│   │   ├── layout.tsx                 # NEW: DashboardLayout (sidebar + Outlet)
│   │   ├── index.tsx                  # NEW: Dashboard overview/home
│   │   ├── schedule.tsx               # NEW: Schedule page (loader + action)
│   │   ├── schedule-new.tsx           # NEW: New appointment (Wizard-based)
│   │   ├── schedule-edit.tsx          # NEW: Edit appointment
│   │   ├── invoices.tsx               # NEW: Invoice list page (loader)
│   │   ├── invoice-detail.tsx         # NEW: Single invoice view + PDF download
│   │   ├── payments.tsx               # NEW: Payment methods (loader + action)
│   │   ├── account.tsx                # NEW: Account settings (loader + action)
│   │   └── components/
│   │       ├── index.tsx              # Barrel exports
│   │       ├── DashboardSidebar.tsx
│   │       ├── AppointmentCard.tsx
│   │       ├── AppointmentForm.tsx
│   │       ├── RecurringConfig.tsx
│   │       ├── InvoiceRow.tsx
│   │       ├── InvoiceDetail.tsx
│   │       ├── PaymentCardForm.tsx
│   │       ├── PaymentCardItem.tsx
│   │       ├── AccountForm.tsx
│   │       ├── AddressFields.tsx
│   │       └── BookingDataBanner.tsx
│   └── ...existing pages
├── components/ui/
│   ├── sidebar/                       # NEW
│   │   ├── sidebar.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── card/                          # NEW
│   │   ├── card.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── data-table/                    # NEW
│   │   ├── data-table.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── badge/                         # NEW
│   │   ├── badge.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── date-picker/                   # NEW
│   │   ├── date-picker.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── switch/                        # NEW
│   │   ├── switch.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── empty-state/                   # NEW
│   │   ├── empty-state.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── avatar/                        # NEW
│   │   ├── avatar.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── pagination/                    # NEW
│   │   ├── pagination.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   ├── tabs/                          # NEW
│   │   ├── tabs.tsx
│   │   ├── index.ts
│   │   └── ts/
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── variants.ts
│   └── ...existing components
├── core/
│   ├── auth/                          # NEW
│   │   ├── auth.ts                    # Dummy login/signup/logout utilities
│   │   ├── auth.context.tsx           # AuthProvider + useAuth hook
│   │   ├── auth.guard.tsx             # ProtectedRoute loader guard
│   │   └── index.ts                   # Barrel exports
│   ├── storage/                       # NEW
│   │   ├── storage.ts                 # Generic local storage helpers (get/set/remove with JSON)
│   │   ├── storage.keys.ts            # All local storage key constants
│   │   ├── storage.mock-data.ts       # Seed data for dummy user, invoices, appointments
│   │   └── index.ts                   # Barrel exports
│   ├── pdf/                           # NEW
│   │   ├── invoice-pdf.ts             # PDF generation utility
│   │   └── index.ts                   # Barrel exports
│   └── ...existing core
```

---

## Route Configuration

```typescript
// frontend/routes.ts — additions to existing config
// Note: /login and /join routes already exist — no new entries needed for auth
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

Each route's loader/action calls local storage helpers now; swap to API calls later.

### Auth Routes (MODIFY existing)

| Route | Loader | Action |
|-------|--------|--------|
| `/login` (existing) | Add: redirect to `/dashboard` if already authenticated | Modify: accept any credentials, set auth token in local storage, check for `mello_pending_booking`, redirect to `/dashboard` |
| `/join` (existing) | Add: redirect to `/dashboard` if already authenticated | Modify: create user in local storage, set auth token, check for `mello_pending_booking`, redirect to `/dashboard` |

### Dashboard Routes (ALL NEW)

| Route | Loader | Action |
|-------|--------|--------|
| `/dashboard` (layout) | **Auth guard**: check auth token, redirect to `/login` if missing. Load user profile for sidebar. | — |
| `/dashboard` (index) | Load summary: upcoming appointments count, pending invoices, payment methods count | Process pending booking data (confirm/dismiss from banner) |
| `/dashboard/schedule` | Load all appointments (upcoming, past, recurring) with filtering | — |
| `/dashboard/schedule/new` | Load available service types | Create new appointment (single or recurring) |
| `/dashboard/schedule/:id/edit` | Load single appointment by ID | Update (reschedule) or cancel (status → cancelled) |
| `/dashboard/invoices` | Load all invoices with pagination, filter by status/date | — |
| `/dashboard/invoices/:id` | Load single invoice with full details | Generate + download PDF |
| `/dashboard/payments` | Load all payment methods (max 5), identify default | Add card, delete card, set default |
| `/dashboard/account` | Load user profile (name, email, phone, addresses) | Update password, service address, billing address, phone |

### Booking Data Flow (First Login)

```
1. User fills booking form on landing page → saved to localStorage["mello_pending_booking"]
2. User signs up or logs in → action checks for localStorage["mello_pending_booking"]
3. If found → redirect to /dashboard with ?pendingBooking=true
4. Dashboard index loader detects param → shows BookingDataBanner
5. User confirms → action sends booking data (future API), clears localStorage key
6. User dismisses → clears localStorage key
```

---

## Local Storage Schema

```typescript
// core/storage/storage.keys.ts
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
  serviceType: string;        // "standard", "deep", "move-in/out"
  date: string;                // ISO date
  time: string;                // "09:00"
  duration: number;            // minutes
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

## Dummy Auth Implementation

```
- Login: accept ANY email + password combination
- On login/signup, generate a dummy UserProfile with pre-populated data:
  - Name: "Test User"
  - Email: whatever they entered
  - Pre-seeded: 3-4 sample appointments (upcoming, completed, cancelled mix)
  - Pre-seeded: 3-4 sample invoices (paid, pending mix)
  - Pre-seeded: 1 sample credit card
- Auth token: simple UUID stored in localStorage
- Auth guard: dashboard layout loader checks token existence
- Logout: clear all mello_* keys from localStorage, redirect to /login
```

---

## PDF Invoice Generation

- Use a lightweight client-side library (e.g., `jspdf` or `@react-pdf/renderer`)
- Generate PDF from invoice data in the browser
- Include: company name (from `companyConfig`), invoice #, date, service details, line items, total, payment status
- Triggered via action on `/dashboard/invoices/:id`

---

## Phased Implementation Plan

### Phase 1: Auth + Dashboard Shell
**Goal**: Dummy auth on existing login/signup pages, protected dashboard layout with sidebar navigation, seed data.

1. Create `core/storage/` — local storage utility layer (`storage.ts`, `storage.keys.ts`, `storage.mock-data.ts`)
2. Create `core/auth/` — auth utilities, AuthProvider context, auth guard loader (`auth.ts`, `auth.context.tsx`, `auth.guard.tsx`)
3. **Modify** existing `pages/auth/login/login.tsx` — add dummy auth logic, pending booking check, redirect
4. **Modify** existing `pages/auth/join/join.tsx` — add dummy auth logic, local storage seeding, pending booking check
5. Build `pages/dashboard/layout.tsx` — DashboardLayout with sidebar + `<Outlet>`
6. Build `pages/dashboard/components/DashboardSidebar.tsx`
7. Build `pages/dashboard/index.tsx` — overview page with summary cards
8. Build `pages/dashboard/components/BookingDataBanner.tsx`
9. Add dashboard routes to `routes.ts`
10. New UI components: **Sidebar**, **Card**, **Avatar**, **EmptyState**

**TSDoc comments**: All exported interfaces in `core/auth/` and `core/storage/`, DashboardLayout, auth guard loader.

### Phase 2: Scheduling
**Goal**: Full CRUD for appointments including recurring.

1. Build `pages/dashboard/schedule.tsx` — appointment list with tabs (upcoming/past/recurring)
2. Build `pages/dashboard/components/AppointmentCard.tsx`
3. Build `pages/dashboard/schedule-new.tsx` — new appointment form (**reuses Wizard** component)
4. Build `pages/dashboard/components/AppointmentForm.tsx` — form content with **existing Select, Input, Textarea**
5. Build `pages/dashboard/components/RecurringConfig.tsx` — frequency **Select** + day/time picker
6. Build `pages/dashboard/schedule-edit.tsx` — reschedule/cancel flow (cancel uses **existing Modal** as confirm dialog)
7. Wire up loaders and actions for all schedule routes
8. Add validators to `core/util/validation.ts` if new ones needed (e.g., date validation)
9. New UI components: **DatePicker**, **Tabs**, **Badge**

**TSDoc comments**: Appointment interfaces, schedule actions/loaders, RecurringConfig props.

### Phase 3: Invoices
**Goal**: Invoice listing, detail view, PDF download.

1. Build `pages/dashboard/invoices.tsx` — invoice list with DataTable
2. Build `pages/dashboard/components/InvoiceRow.tsx` — uses **existing Button** for download action
3. Build `pages/dashboard/invoice-detail.tsx` — full invoice breakdown
4. Build `pages/dashboard/components/InvoiceDetail.tsx` — detail display component
5. Create `core/pdf/invoice-pdf.ts` — PDF generation utility (uses **companyConfig** for company info)
6. Wire up loaders for invoice routes
7. New UI components: **DataTable**, **Pagination**

**TSDoc comments**: Invoice interfaces, PDF generation utility, invoice loaders.

### Phase 4: Payment Methods
**Goal**: View, add (max 5), delete credit cards, set default.

1. Build `pages/dashboard/payments.tsx` — card list with add/delete/set-default
2. Build `pages/dashboard/components/PaymentCardItem.tsx` — card display
3. Build `pages/dashboard/components/PaymentCardForm.tsx` — add card form (uses **existing Input, Button, Modal**)
4. Implement max-5-cards validation in action
5. Delete + set-default actions (delete uses **existing Modal** as confirm)
6. New UI components: **Switch** (for "billing same as" in Phase 5, built here as a generic component)

**TSDoc comments**: PaymentMethod interface, max-cards validation, payment actions.

### Phase 5: Account Settings
**Goal**: Update password, addresses (with same-as toggle), phone.

1. Build `pages/dashboard/account.tsx` — sectioned form page
2. Build `pages/dashboard/components/AccountForm.tsx` — uses **existing Input, PasswordInput, Button**
3. Build `pages/dashboard/components/AddressFields.tsx` — **adapted from** existing `address-section.tsx` pattern
4. Implement "billing same as service" toggle using **new Switch** component
5. Password change validation (current + new + confirm) using **existing validators.confirmPassword**
6. Wire up loader and action

**TSDoc comments**: Account update interfaces, address field props, account action.

### Phase 6: Documentation & Cleanup
**Goal**: Update all project documentation.

1. Update `CLAUDE.md`:
   - Add dashboard section to project structure
   - Add new UI components list
   - Add `core/auth/`, `core/storage/`, `core/pdf/` to core description
   - Add dashboard route convention
2. Update `.claude/docs/components-directory.md` — add new UI component trees
3. Update `.claude/docs/pages-directory.md` — add dashboard page tree
4. Update `.claude/docs/core-directory.md` — add auth, storage, pdf module docs
5. Update `.claude/docs/ui-components.md` — add prop tables for new components
6. Create `.claude/docs/dashboard-patterns.md` — auth guard, local storage layer, action/loader conventions
7. Run `npm run typecheck`
8. Run `npm run dev` to verify
9. Run `npm run copyright` (final step, after all code is written)

---

## Comments Plan

- TSDoc on all exported interfaces following existing `tsdoc-conventions.md`
- TSDoc on all new utility functions in `core/auth/`, `core/storage/`, `core/pdf/`
- TSDoc on all dashboard actions and loaders
- TSDoc on all new UI component props
- `@module` tags on all barrel export files
- Phase-by-phase comment additions noted in each phase above

## CLAUDE.md Update Plan

- Add `pages/dashboard/` to project structure tree
- Add new UI components (Sidebar, Card, DataTable, Badge, DatePicker, Switch, EmptyState, Avatar, Pagination, Tabs) to component listing
- Add `core/auth/`, `core/storage/`, `core/pdf/` to core directory description
- Add dashboard route convention to page conventions
- Update all files in `.claude/docs/`:
  - `components-directory.md` — new component directory trees
  - `pages-directory.md` — dashboard page tree
  - `core-directory.md` — auth, storage, pdf modules
  - `ui-components.md` — prop tables for 10 new components
  - New: `dashboard-patterns.md` — auth guard pattern, local storage abstraction, action/loader conventions

---

## Verification

1. `npm run typecheck` — all types pass
2. `npm run dev` — dev server starts, no errors
3. Manual test flow:
   - Visit `/login`, enter any credentials → arrive at `/dashboard`
   - Navigate sidebar: Schedule, Invoices, Payments, Account
   - Create/edit/cancel appointment, including recurring
   - View invoice list, open detail, download PDF
   - Add credit card (up to 5), set default, delete
   - Update password, toggle billing address, update phone
   - Logout → redirect to `/login`
   - Fill booking form on landing → sign up → see BookingDataBanner → confirm
4. `npm run copyright` — copyright headers added
