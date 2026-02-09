# Feature: Cancellation Policy

> Backend-driven cancellation policy with fee warning. Mocked for development.

## Overview

When a client cancels an appointment that falls within the cancellation policy window, they see a warning about potential fees before confirming. The policy (minimum notice hours, fee amount) comes from the backend (mocked in localStorage).

## Decisions

| Decision | Choice |
|----------|--------|
| Policy source | Backend-driven (mocked in localStorage) |
| Warning | Modal with fee details when canceling within policy window |
| Enforcement | Warning only — actual fee charged by backend |
| Grace period | Configurable (mocked at 48 hours) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/CancellationWarning.tsx` | Warning modal content for late cancellations |

## Integration Points

- **Scheduling** (`brainstorm-scheduling.md`) — Cancel action on schedule-edit page
- **AppointmentCard** — Cancel button triggers policy check

## Flow

```
1. Client clicks "Cancel" on an upcoming appointment
2. Action checks: is appointment within cancellation policy window?
   - Calculate: appointmentDate - now < minNoticeHours?
3. If within window:
   - Return policy data to component
   - Show CancellationWarning modal with fee info
   - Client must confirm to proceed
4. If outside window:
   - Show simple confirmation modal ("Are you sure?")
   - No fee warning
5. On confirm: set appointment status to "cancelled"
```

## CancellationWarning Modal

```
┌─────────────────────────────────────────┐
│ ⚠ Late Cancellation                    │
│                                         │
│ This appointment is less than 48 hours  │
│ away. Canceling now may incur a fee of  │
│ $50.00.                                 │
│                                         │
│ Appointment: Deep Cleaning              │
│ Date: March 15, 2025 at 9:00 AM        │
│                                         │
│ Are you sure you want to cancel?        │
│                                         │
│ [Keep Appointment]  [Cancel Anyway]     │
└─────────────────────────────────────────┘
```

## Mock Policy Data

```typescript
const MOCK_CANCELLATION_POLICY: CancellationPolicy = {
  minNoticeHours: 48,
  lateFee: 50.00,
  description: "Cancellations made less than 48 hours before the appointment may incur a $50 fee.",
};
```

## Data Shape

```typescript
interface CancellationPolicy {
  minNoticeHours: number;
  lateFee: number;
  description: string;
}
```

## Storage Key

```typescript
CANCELLATION_POLICY: "mello_cancellation_policy"    // CancellationPolicy
```

## Reuses

- **Modal** (`components/ui/modal/`) — warning dialog
- **Button** (`components/ui/button/`) — keep (primary), cancel anyway (destructive)
- **Heading** (`components/ui/heading/`) — modal title
- **Text** (`components/ui/text/`) — policy description

## TSDoc Comments

- CancellationPolicy interface
- Policy check logic (isWithinPolicyWindow utility)
- CancellationWarning props
