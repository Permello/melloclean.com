# Feature: Dashboard Overview

> The main dashboard landing page after login. Shows at-a-glance summary of the client's account.

## Overview

The dashboard index page (`/dashboard`) serves as the client's home base. It prominently displays the next upcoming appointment as a hero card, lifetime stats, a pending booking banner (if applicable), a promotional offer banner, and a feedback nudge for recently completed appointments.

## Decisions

| Decision | Choice |
|----------|--------|
| Hero element | Next upcoming appointment as a prominent card |
| Stats | Lifetime total spent + total cleanings completed |
| Promo display | Dismissable banner (see brainstorm-promotions.md) |
| Feedback nudge | Banner for recent completed appointments without feedback (see brainstorm-feedback.md) |
| Pending booking | BookingDataBanner when landing page booking data exists (see brainstorm-auth.md) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/index.tsx` | Dashboard overview page with loader + action |
| `pages/dashboard/components/NextAppointmentHero.tsx` | Hero card showing next upcoming appointment with date, time, service type, cleaner info, countdown |
| `pages/dashboard/components/LifetimeStats.tsx` | Stats display: total spent, total cleanings, member since date |
| `pages/dashboard/components/BookingDataBanner.tsx` | Banner when pending booking data found in localStorage on first login |
| `pages/dashboard/components/PromoBanner.tsx` | Dismissable promotional offer banner (see brainstorm-promotions.md) |
| `pages/dashboard/components/FeedbackNudge.tsx` | Nudge for uncompleted feedback (see brainstorm-feedback.md) |

## Loader

```
/dashboard (index) loader:
1. Load user profile from localStorage
2. Load appointments → find next upcoming
3. Calculate lifetime stats:
   - Count completed appointments
   - Sum paid invoice amounts
   - Get account createdAt date
4. Check for pending booking data (localStorage["mello_pending_booking"])
5. Check for active promotions (localStorage["mello_promotions"])
6. Check for completed appointments without feedback → feedback nudge
7. Return all data
```

## Action

```
/dashboard (index) action:
- intent: "confirm_booking" → create appointment from pending booking data, clear localStorage key
- intent: "dismiss_booking" → clear localStorage["mello_pending_booking"]
- intent: "dismiss_promo" → mark promo as dismissed in localStorage
```

## Component Details

### NextAppointmentHero
- Uses **Card** component (interactive variant)
- Shows: date/time, service type, property address, assigned cleaner (name + photo)
- "View Details" link → `/dashboard/schedule`
- If no upcoming → shows **EmptyState** with "Book your first cleaning" CTA

### LifetimeStats
- Three stat cards in a row:
  - Total cleanings completed (number)
  - Total spent (formatted currency)
  - Member since (formatted date)
- Uses **Card** component (outlined variant)

### BookingDataBanner
- Appears when `?pendingBooking=true` or pending data exists
- Shows summary of the booking form data from landing page
- "Confirm Booking" button (submits action with intent: confirm_booking)
- "Dismiss" button (submits action with intent: dismiss_booking)
- Uses **Card** + **Button** components

## Layout

```
┌─────────────────────────────────────────┐
│ [PromoBanner - dismissable]             │
├─────────────────────────────────────────┤
│ [BookingDataBanner - if pending]        │
├─────────────────────────────────────────┤
│ [FeedbackNudge - if uncompleted]        │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  NEXT APPOINTMENT (Hero Card)    │   │
│  │  Sat, Mar 15 at 9:00 AM         │   │
│  │  Deep Cleaning · 123 Main St    │   │
│  │  Cleaner: Sarah M. [photo]      │   │
│  │  [View Details]                  │   │
│  └──────────────────────────────────┘   │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │ 12       │ │ $1,840   │ │ Since    ││
│  │ Cleanings│ │ Total    │ │ Jan 2025 ││
│  └──────────┘ └──────────┘ └──────────┘│
│                                         │
│  Quick Actions:                         │
│  [Book Appointment] [View Invoices]     │
└─────────────────────────────────────────┘
```

## Reuses

- **Card** (new `components/ui/card/`) — hero card, stat cards
- **Button** (`components/ui/button/`) — CTAs, confirm/dismiss
- **Heading** (`components/ui/heading/`) — page title
- **Text** (`components/ui/text/`) — descriptions
- **EmptyState** (new `components/ui/empty-state/`) — no upcoming appointment fallback
- **Avatar** (new `components/ui/avatar/`) — cleaner photo in hero card

## TSDoc Comments

- NextAppointmentHero props and display logic
- LifetimeStats calculation
- BookingDataBanner confirm/dismiss actions
- Dashboard index loader and action
