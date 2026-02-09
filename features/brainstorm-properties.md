# Feature: Multiple Properties

> Manage multiple service properties with types, addresses, and special instructions.

## Overview

Clients can manage multiple properties (Home, Rental, Vacation Home, Office). Each property has its own address and persistent special instructions (alarm codes, pet info, parking, spare key location). Appointments are booked at the account level with a property dropdown — not per-property. No hard limit on the number of properties.

## Decisions

| Decision | Choice |
|----------|--------|
| Property types | Home, Rental, Vacation, Office (4 fixed types) |
| Limit | No hard limit |
| Relationship | Account-level — appointments have a `propertyId` dropdown |
| Special instructions | Per-property, auto-applied to appointments at that property |
| Instructions | Alarm codes, pet info, parking instructions, spare key location |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/PropertyManager.tsx` | Property list with add/edit/delete |
| `pages/dashboard/components/PropertyForm.tsx` | Add/edit property modal (type, address, instructions) |
| `pages/dashboard/components/SpecialInstructions.tsx` | Special instructions display/edit for a property |

## Integration Points

- **Account page** (`brainstorm-account.md`) — PropertyManager section added to account settings
- **Scheduling** (`brainstorm-scheduling.md`) — Property Select dropdown in booking wizard (Stage 1)
- **Appointment cards** — Show property name/type alongside address
- **Dashboard Overview** — Next appointment hero shows property info
- **Invoices** — Invoice shows which property the service was at

## Actions (on `/dashboard/account`)

```
intent: "add_property"
1. Extract: type (Home/Rental/Vacation/Office), address fields, specialInstructions fields
2. Validate: type required, address fields required (street, city, state, zip)
3. Create Property in localStorage
4. Toast: "Property added"

intent: "update_property"
1. Extract: propertyId, updated fields
2. Validate same as add
3. Update in localStorage
4. Toast: "Property updated"

intent: "delete_property"
1. Extract: propertyId
2. Check: cannot delete if it's the only property
3. Check: warn if appointments exist at this property
4. Remove from localStorage
5. Toast: "Property removed"

intent: "update_instructions"
1. Extract: propertyId, alarmCode, petInfo, parkingInstructions, keyLocation
2. Update special instructions for property
3. Save to localStorage
4. Toast: "Instructions updated"
```

## PropertyManager Layout

```
┌─────────────────────────────────────────┐
│ Your Properties              [+ Add]    │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 🏠 Home                            │ │
│ │ 123 Main St, Austin TX 78701       │ │
│ │ Instructions: Alarm code, 2 dogs   │ │
│ │ [Edit] [Delete]                    │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🏢 Office                          │ │
│ │ 456 Commerce Blvd, Austin TX 78702 │ │
│ │ Instructions: None set             │ │
│ │ [Edit] [Delete]                    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## PropertyForm (Modal)

```
┌─────────────────────────────────────────┐
│ Add Property                            │
│                                         │
│ Type: [Home ▼]                          │
│                                         │
│ Address:                                │
│ Street: [________________________]      │
│ Unit:   [________] (optional)           │
│ City:   [__________]                    │
│ State:  [____]  Zip: [_____]           │
│                                         │
│ Special Instructions:                   │
│ Alarm Code:   [____________]            │
│ Pet Info:     [________________________]│
│ Parking:      [________________________]│
│ Key Location: [________________________]│
│                                         │
│ [Cancel]  [Save Property]              │
└─────────────────────────────────────────┘
```

## Data Shapes

```typescript
type PropertyType = "home" | "rental" | "vacation" | "office";

interface Property {
  id: string;
  type: PropertyType;
  label: string;               // auto-generated: "Home", "Rental", etc.
  address: Address;
  specialInstructions: SpecialInstructions;
  createdAt: string;
}

interface SpecialInstructions {
  alarmCode?: string;
  petInfo?: string;
  parkingInstructions?: string;
  keyLocation?: string;
}
```

## Storage Key

```typescript
PROPERTIES: "mello_properties"    // Property[]
```

## Reuses

- **Input** (`components/ui/input/`) — all text fields
- **Select** (`components/ui/select/`) — property type dropdown
- **Button** (`components/ui/button/`) — add, edit, delete (destructive)
- **Modal** (`components/ui/modal/`) — add/edit property form, delete confirmation
- **Card** (new) — property card container
- **Heading** (`components/ui/heading/`) — section title
- **EmptyState** (new) — no properties yet
- **validators + validateForm** (`core/util/validation.ts`) — required, zipCode
- **Toast** (`components/ui/toast/`) — success/error

## TSDoc Comments

- Property and SpecialInstructions interfaces
- PropertyType enum
- Add/update/delete actions
- Special instructions auto-apply logic (referenced in scheduling)
