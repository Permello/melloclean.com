# Feature: Service Add-ons

> Backend-driven service add-ons selectable during booking. Mocked in localStorage.

## Overview

During the booking flow, clients can select optional add-on services (inside oven cleaning, window cleaning, etc.). Add-ons are loaded from the backend (mocked in localStorage). Each add-on has a name, description, and price that gets added to the appointment estimate.

## Decisions

| Decision | Choice |
|----------|--------|
| Data source | Backend-driven (mocked in localStorage seed data) |
| Selection UI | Checklist during booking wizard (Stage 2) |
| Pricing | Each add-on has a fixed price, added to estimate total |
| Integration | Part of the booking flow, not a standalone page |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/AddOnSelector.tsx` | Add-on checklist component for booking wizard |

## Integration Points

- **Scheduling** (`brainstorm-scheduling.md`) — Wizard Stage 2 (Service & Add-ons)
- **Invoices** (`brainstorm-invoices.md`) — Add-ons appear as line items
- **Estimates** (`brainstorm-estimates.md`) — Add-on prices included in total

## Mock Data (seeded on first login)

```typescript
const MOCK_ADDONS: ServiceAddOn[] = [
  { id: "addon-1", name: "Inside Oven", description: "Deep clean inside oven and racks", price: 25 },
  { id: "addon-2", name: "Inside Fridge", description: "Clean and sanitize refrigerator interior", price: 25 },
  { id: "addon-3", name: "Window Cleaning", description: "Interior window cleaning (up to 10 windows)", price: 30 },
  { id: "addon-4", name: "Laundry", description: "Wash, dry, and fold one load of laundry", price: 20 },
  { id: "addon-5", name: "Organizing", description: "Light organizing of one room or closet", price: 35 },
  { id: "addon-6", name: "Garage Sweep", description: "Sweep and tidy garage floor", price: 15 },
  { id: "addon-7", name: "Baseboards", description: "Detail cleaning of all baseboards", price: 20 },
  { id: "addon-8", name: "Cabinet Exterior", description: "Wipe down all cabinet exteriors", price: 15 },
];
```

## AddOnSelector Layout

```
┌─────────────────────────────────────────┐
│ Add-on Services (optional)              │
│                                         │
│ ☐ Inside Oven · $25                    │
│   Deep clean inside oven and racks      │
│                                         │
│ ☐ Inside Fridge · $25                  │
│   Clean and sanitize refrigerator       │
│                                         │
│ ☑ Window Cleaning · $30               │
│   Interior window cleaning (up to 10)   │
│                                         │
│ ☐ Laundry · $20                        │
│   Wash, dry, and fold one load          │
│                                         │
│ ... more add-ons                        │
│                                         │
│ Selected add-ons total: $30             │
└─────────────────────────────────────────┘
```

## Data Shape

```typescript
interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}
```

## Storage Key

```typescript
SERVICE_ADDONS: "mello_service_addons"    // ServiceAddOn[]
```

## Reuses

- **ToggleButtonGroup** (`components/ui/toggle-button-group/`) — or individual checkboxes for add-on selection
- **Text** (`components/ui/text/`) — descriptions, prices
- **Card** (new) — add-on item cards

## TSDoc Comments

- ServiceAddOn interface
- AddOnSelector props (selectedAddOns, onSelectionChange, available addOns)
- Price calculation helper
