# Feature: Terms of Service

> ToS checkbox on signup + reminder modal on first booking.

## Overview

Clients must accept the Terms of Service at two points: (1) a required checkbox during signup, and (2) a reminder modal with service-specific terms before their first booking. The ToS acceptance timestamp is stored in localStorage.

## Decisions

| Decision | Choice |
|----------|--------|
| Signup | Required checkbox: "I agree to the Terms of Service" |
| First booking | Modal with service-specific terms before confirming |
| ToS content | Placeholder text (future: loaded from CMS/backend) |
| Acceptance | Timestamp stored in localStorage |

## Files to Modify (Existing)

| File | Change |
|------|--------|
| `pages/auth/join/join-form-content.tsx` | Add ToS checkbox to the signup wizard (last stage or before submit) |
| `pages/auth/join/ts/types.ts` | Add `tosAccepted: boolean` to SignupFormData |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/TermsModal.tsx` | First-booking terms reminder modal |

## Integration Points

- **Auth (Signup)** (`brainstorm-auth.md`) — ToS checkbox on join form
- **Scheduling (New Appointment)** (`brainstorm-scheduling.md`) — TermsModal before first booking confirmation

## Signup Checkbox

Added to the signup wizard (last stage before submit):

```
☑ I agree to the [Terms of Service] and [Privacy Policy]
```

- Required field — blocks form submission if unchecked
- "Terms of Service" and "Privacy Policy" are links (placeholder hrefs for now)
- Validation: `tosAccepted` must be true

## First Booking Modal

Triggered when the client confirms their first-ever appointment:

```
┌─────────────────────────────────────────┐
│ Service Terms                           │
│                                         │
│ Before your first booking, please       │
│ review our service terms:               │
│                                         │
│ • Access: Ensure the cleaner can access │
│   your property at the scheduled time.  │
│ • Pets: Secure pets during the service. │
│ • Valuables: We recommend securing      │
│   valuables before the appointment.     │
│ • Cancellation: See our cancellation    │
│   policy for fee details.               │
│                                         │
│ ☑ I understand and agree               │
│                                         │
│ [Cancel]  [Continue Booking]            │
└─────────────────────────────────────────┘
```

## Flow

```
First Booking:
1. Client fills booking wizard and hits "Confirm"
2. Check: has the client seen the first-booking terms?
   - Check localStorage["mello_tos_first_booking"]
3. If not → show TermsModal
4. Client checks "I understand" and clicks "Continue Booking"
5. Save timestamp to localStorage
6. Proceed with appointment creation
7. Subsequent bookings skip the modal
```

## Data Shape

No separate interface — just two localStorage flags:

```typescript
TOS_ACCEPTED: "mello_tos_accepted"              // ISO date (signup acceptance)
TOS_FIRST_BOOKING: "mello_tos_first_booking"    // ISO date (first booking acceptance)
```

## Reuses

- **Modal** (`components/ui/modal/`) — terms modal
- **Button** (`components/ui/button/`) — cancel, continue
- **Heading** (`components/ui/heading/`) — modal title
- **Text** (`components/ui/text/`) — terms content

## TSDoc Comments

- TermsModal props and display logic
- ToS acceptance check utility
- Signup form modification notes
