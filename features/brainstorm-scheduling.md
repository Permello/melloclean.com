# Feature: Scheduling

> Full CRUD for appointments including recurring, with service add-ons, price estimates, and cancellation policy.

## Overview

Clients can book new appointments (single or recurring), view upcoming/past/recurring appointments in tabbed views, reschedule, cancel (with policy enforcement), and rebook from completed appointments. Appointments are tied to properties and can include service add-ons.

## Decisions

| Decision | Choice |
|----------|--------|
| CRUD scope | Full: create, read, update (reschedule), cancel |
| Recurring | Weekly, biweekly, monthly with optional end date |
| Booking form | Wizard-based multi-step (reuses existing Wizard component) |
| Cancellation | Backend-driven policy (mocked), show fee warning if within policy window |
| Add-ons | Backend-driven (mocked in localStorage), selectable during booking |
| Estimate | Show total + overtime hourly rate before confirmation |
| Rebook | Quick rebook button on completed appointments |
| Cleaner info | Name + photo displayed on upcoming/completed appointments |
| View | Tabbed: Upcoming, Past, Recurring |
| Property | Select from user's properties when booking |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/schedule.tsx` | Schedule list page with tabs (loader) |
| `pages/dashboard/schedule-new.tsx` | New appointment booking (Wizard, loader + action) |
| `pages/dashboard/schedule-edit.tsx` | Edit/reschedule appointment (loader + action) |
| `pages/dashboard/components/AppointmentCard.tsx` | Single appointment display with actions |
| `pages/dashboard/components/AppointmentForm.tsx` | Wizard form content (stages: property, service, add-ons, schedule, review) |
| `pages/dashboard/components/RecurringConfig.tsx` | Frequency selector + end date for recurring |
| `pages/dashboard/components/AddOnSelector.tsx` | Service add-on checklist/toggles |
| `pages/dashboard/components/EstimateDisplay.tsx` | Price estimate + overtime rate display |
| `pages/dashboard/components/CancellationWarning.tsx` | Fee warning modal content for late cancellations |
| `pages/dashboard/components/CleanerInfo.tsx` | Cleaner name + photo display |
| `pages/dashboard/components/RebookButton.tsx` | Quick rebook action from completed appointment |

## New UI Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **DatePicker** | `components/ui/date-picker/` | Date + time selection for appointment scheduling |
| **Tabs** | `components/ui/tabs/` | Upcoming / Past / Recurring tab navigation |
| **Badge** | `components/ui/badge/` | Status badges: Upcoming (emerald), Completed (teal), Cancelled (red) |

## Routes

```typescript
{ path: "schedule", file: "pages/dashboard/schedule.tsx" },
{ path: "schedule/new", file: "pages/dashboard/schedule-new.tsx" },
{ path: "schedule/:id/edit", file: "pages/dashboard/schedule-edit.tsx" },
```

## Loaders

### `/dashboard/schedule` Loader
```
1. Load all appointments from localStorage
2. Separate into: upcoming, past (completed + cancelled), recurring
3. Sort: upcoming by date ASC, past by date DESC
4. Return { upcoming, past, recurring }
```

### `/dashboard/schedule/new` Loader
```
1. Load user's properties from localStorage
2. Load available service types (mocked constants)
3. Load available add-ons from localStorage (mocked)
4. Load cancellation policy config (mocked)
5. Return { properties, serviceTypes, addOns, cancellationPolicy }
```

### `/dashboard/schedule/:id/edit` Loader
```
1. Load single appointment by ID from localStorage
2. If not found → throw 404
3. Load properties, service types, add-ons (same as /new)
4. Return { appointment, properties, serviceTypes, addOns }
```

## Actions

### `/dashboard/schedule/new` Action
```
intent: "create"
1. Extract form data (propertyId, serviceType, addOns[], date, time, notes, recurring?)
2. Validate: date in future, property exists, service type valid
3. Calculate estimate (mocked: base price + add-on prices)
4. If intent is "estimate" → return estimate data (no save)
5. If intent is "confirm" → create Appointment in localStorage, redirect to /dashboard/schedule
6. If recurring → create series of appointments based on frequency + end date
7. Show success toast
```

### `/dashboard/schedule/:id/edit` Action
```
intent: "reschedule"
1. Extract new date, time
2. Validate: date in future
3. Update appointment in localStorage
4. Show success toast, redirect to /dashboard/schedule

intent: "cancel"
1. Check cancellation policy (is appointment within 24/48hr window?)
2. If within window → return warning data (CancellationWarning shown)
3. If user confirms → set status to "cancelled", save
4. Show success toast, redirect to /dashboard/schedule

intent: "rebook"
1. Clone the appointment data (new ID, new date/time, status: upcoming)
2. Create new appointment in localStorage
3. Redirect to /dashboard/schedule/new with pre-filled data
```

## Wizard Stages (New Appointment)

```
Stage 1: Property Selection
  - Select from user's properties (Select dropdown)
  - Shows property type + address

Stage 2: Service & Add-ons
  - Service type: Standard, Deep, Move-in/Out (Select)
  - Add-ons: checklist of available add-ons (AddOnSelector using ToggleButtonGroup)

Stage 3: Date & Time
  - DatePicker for date
  - Time slot selection (Select)
  - Recurring toggle (Switch) → shows RecurringConfig if enabled

Stage 4: Review & Estimate
  - Summary of selections
  - EstimateDisplay: total price + overtime rate
  - Special instructions from property (read-only display)
  - Notes field (Textarea)
  - Confirm button
```

## AppointmentCard Layout

```
┌─────────────────────────────────────────┐
│ [Badge: Upcoming]          Sat, Mar 15  │
│ Deep Cleaning · 9:00 AM - 12:00 PM     │
│ 📍 123 Main St (Home)                  │
│ 👤 Sarah M. [photo]  ← CleanerInfo     │
│ Add-ons: Inside Oven, Windows           │
│                                         │
│ [Reschedule] [Cancel]  ← upcoming only  │
│ [Book Again]           ← completed only │
│ [Leave Feedback]       ← if no feedback │
└─────────────────────────────────────────┘
```

## Data Shapes

```typescript
interface Appointment {
  id: string;
  propertyId: string;
  serviceType: string;
  addOns: string[];             // add-on IDs
  date: string;                 // ISO date
  time: string;                 // "09:00"
  duration: number;             // minutes
  status: "upcoming" | "completed" | "cancelled";
  address: Address;
  notes?: string;
  recurring?: {
    frequency: "weekly" | "biweekly" | "monthly";
    endDate?: string;
    seriesId: string;           // groups recurring appointments
  };
  cleaner?: {
    firstName: string;
    photoUrl?: string;
  };
  estimate?: {
    basePrice: number;
    addOnTotal: number;
    total: number;
    overtimeRate: number;       // per hour
  };
  cancellationPolicy?: {
    minNoticeHours: number;
    lateFee: number;
  };
  feedbackId?: string;          // links to Feedback if submitted
  createdAt: string;
}

interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}
```

## Reuses

- **Wizard** (`components/ui/wizard/`) — multi-step booking form
- **Select** (`components/ui/select/`) — service type, property, time slot, frequency
- **Input** (`components/ui/input/`) — notes, search
- **Textarea** (`components/ui/textarea/`) — appointment notes
- **Button** (`components/ui/button/`) — reschedule, cancel (destructive), rebook, confirm
- **Modal** (`components/ui/modal/`) — cancellation confirmation dialog
- **ToggleButtonGroup** (`components/ui/toggle-button-group/`) — add-on selection
- **Card** (new) — appointment card container
- **Badge** (new) — status indicators
- **DatePicker** (new) — date/time selection
- **Tabs** (new) — upcoming/past/recurring navigation
- **Switch** (new) — recurring toggle
- **Toast** (`components/ui/toast/`) — success/error notifications

## TSDoc Comments

- Appointment interface and all sub-types
- ServiceAddOn interface
- All schedule loaders and actions
- AppointmentForm wizard stage configs
- RecurringConfig props
- EstimateDisplay calculation logic
- CancellationWarning policy check
