# Feature: Cleaner Visibility

> Display assigned cleaner's name and photo on appointments.

## Overview

Clients can see who is assigned to clean their property. The cleaner's first name and profile photo are displayed on appointment cards and the dashboard overview hero card. This builds trust and personalizes the service.

## Decisions

| Decision | Choice |
|----------|--------|
| Info shown | First name + profile photo |
| Photo fallback | Avatar component with initials |
| Where displayed | AppointmentCard, NextAppointmentHero, InvoiceDetail |
| Data source | Part of appointment data (assigned by backend, mocked) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/CleanerInfo.tsx` | Cleaner name + photo display component |

## Integration Points

- **AppointmentCard** (`brainstorm-scheduling.md`) — shows CleanerInfo for upcoming/completed appointments
- **NextAppointmentHero** (`brainstorm-dashboard-overview.md`) — shows cleaner in the hero card
- **FeedbackForm** (`brainstorm-feedback.md`) — shows cleaner name in the feedback context

## CleanerInfo Layout

```
┌──────────────────────────┐
│ [Photo/Avatar]  Sarah M. │
│   Your cleaner           │
└──────────────────────────┘
```

Compact variant (for cards):
```
👤 Sarah M.
```

## Data Shape

```typescript
// Embedded in Appointment
interface CleanerAssignment {
  firstName: string;
  photoUrl?: string;         // optional, falls back to Avatar with initials
}
```

No separate storage — cleaner data is part of the Appointment object.

## Mock Data

```typescript
const MOCK_CLEANERS: CleanerAssignment[] = [
  { firstName: "Sarah", photoUrl: undefined },
  { firstName: "Maria", photoUrl: undefined },
  { firstName: "James", photoUrl: undefined },
];
// Randomly assigned to mock appointments during seeding
```

## Reuses

- **Avatar** (new `components/ui/avatar/`) — photo display with initials fallback
- **Text** (`components/ui/text/`) — name display

## TSDoc Comments

- CleanerAssignment interface
- CleanerInfo component props (compact vs full variant)
