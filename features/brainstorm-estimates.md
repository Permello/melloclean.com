# Feature: Price Estimate + Overtime

> Show estimated total and overtime hourly rate before booking confirmation.

## Overview

During the booking flow (Wizard Stage 4: Review), clients see a price estimate before confirming. The estimate shows the total cost (base price + add-ons) and the overtime hourly rate that applies if the cleaning exceeds the estimated duration. In production, the backend calculates the estimate — we mock it for now.

## Decisions

| Decision | Choice |
|----------|--------|
| Detail level | Total + overtime hourly rate |
| Format | "Estimated: $150 \| Overtime rate: $45/hr if exceeding estimated duration" |
| Source | Backend-driven (mocked with simple calculation) |
| Confirmation step | Estimate shown in Wizard review stage, client confirms before creation |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/EstimateDisplay.tsx` | Price estimate + overtime display component |

## Integration Points

- **Scheduling** (`brainstorm-scheduling.md`) — Wizard Stage 4 (Review & Estimate)
- **Invoices** (`brainstorm-invoices.md`) — Final invoice may differ if overtime occurred

## EstimateDisplay Layout

```
┌─────────────────────────────────────────┐
│ Price Estimate                          │
│                                         │
│ Service: Deep Cleaning         $120.00  │
│ Add-ons:                                │
│   Inside Oven                   $25.00  │
│   Window Cleaning               $30.00  │
│                          ──────────── │
│ Estimated Total:               $175.00  │
│                                         │
│ ⓘ Overtime rate: $45/hr if the         │
│   cleaning exceeds the estimated        │
│   2-hour duration.                      │
└─────────────────────────────────────────┘
```

## Mock Pricing Logic

```typescript
// Mocked base prices by service type
const SERVICE_PRICES: Record<string, number> = {
  standard: 90,
  deep: 120,
  "move-in/out": 180,
};

// Mocked overtime rate
const OVERTIME_RATE = 45; // per hour

// Mocked duration by service type (hours)
const SERVICE_DURATION: Record<string, number> = {
  standard: 1.5,
  deep: 2,
  "move-in/out": 3,
};

function calculateEstimate(serviceType: string, addOns: ServiceAddOn[]): Estimate {
  const basePrice = SERVICE_PRICES[serviceType];
  const addOnTotal = addOns.reduce((sum, a) => sum + a.price, 0);
  return {
    basePrice,
    addOnTotal,
    total: basePrice + addOnTotal,
    overtimeRate: OVERTIME_RATE,
    estimatedDuration: SERVICE_DURATION[serviceType],
  };
}
```

## Data Shape

```typescript
interface Estimate {
  basePrice: number;
  addOnTotal: number;
  total: number;
  overtimeRate: number;          // per hour
  estimatedDuration: number;     // hours
}
```

## Reuses

- **Card** (new) — estimate container
- **Text** (`components/ui/text/`) — line items, total, overtime note
- **Heading** (`components/ui/heading/`) — section title

## TSDoc Comments

- Estimate interface
- calculateEstimate utility function
- EstimateDisplay props
- Mock pricing constants
