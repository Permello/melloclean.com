# Feature: Promotional Offers

> Dismissable promotional banner on the dashboard overview.

## Overview

Active promotions are displayed as a dismissable banner at the top of the dashboard overview page. Promotions come from the backend (mocked in localStorage). Once dismissed, a promotion won't show again for that user.

## Decisions

| Decision | Choice |
|----------|--------|
| Display | Dismissable banner on dashboard overview |
| Data source | Backend-driven (mocked in localStorage) |
| Dismiss behavior | Persists — dismissed promos don't return |
| Multiple promos | Show one at a time (most relevant/newest) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/PromoBanner.tsx` | Dismissable promotional banner |

## Integration Points

- **Dashboard Overview** (`brainstorm-dashboard-overview.md`) — PromoBanner at the top of the page
- **Booking flow** — future enhancement: auto-apply applicable discounts

## PromoBanner Layout

```
┌─────────────────────────────────────────────────┐
│ 🎉 Spring Special: 20% off your next Deep      │
│    Cleaning! Use code SPRING25 at checkout.     │
│                          [Book Now]  [Dismiss ×]│
└─────────────────────────────────────────────────┘
```

## Mock Data

```typescript
const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    title: "Spring Cleaning Special",
    description: "20% off your next Deep Cleaning!",
    code: "SPRING25",
    discountPercent: 20,
    validUntil: "2025-06-01",
    serviceType: "deep",
  },
  {
    id: "promo-2",
    title: "Refer & Save",
    description: "Refer a friend and both get $25 off!",
    code: "REFER25",
    discountAmount: 25,
    validUntil: "2025-12-31",
    serviceType: null,         // applies to all
  },
];
```

## Data Shape

```typescript
interface Promotion {
  id: string;
  title: string;
  description: string;
  code?: string;
  discountPercent?: number;
  discountAmount?: number;
  validUntil: string;
  serviceType: string | null;  // null = applies to all
}
```

## Storage Keys

```typescript
PROMOTIONS: "mello_promotions"                    // Promotion[]
DISMISSED_PROMOTIONS: "mello_dismissed_promos"    // string[] (dismissed promo IDs)
```

## Reuses

- **Button** (`components/ui/button/`) — "Book Now" CTA, dismiss
- **Card** (new) — banner container
- **Text** (`components/ui/text/`) — promo description

## TSDoc Comments

- Promotion interface
- PromoBanner display logic (filter dismissed, check valid dates)
- Dismiss action
