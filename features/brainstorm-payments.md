# Feature: Payment Methods

> View, add (max 5), delete credit cards, set default.

## Overview

Clients can manage up to 5 credit cards on their account. They can add new cards, delete existing ones (with confirmation), and set a default payment method. Only basic card details are displayed (brand, last 4, expiry). The actual card processing will be handled by the backend — we only store display-level info.

## Decisions

| Decision | Choice |
|----------|--------|
| Max cards | 5 |
| Display info | Card brand (Visa/MC/Amex/Discover), last 4 digits, expiry month/year |
| Default card | One card marked as default, used for new bookings |
| Delete | Confirmation via Modal dialog, cannot delete if it's the only card |
| Add form | Modal-based form (card number, expiry, CVC, nickname) |
| Nickname | Optional, for client's reference ("Personal Visa", "Business Amex") |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/payments.tsx` | Payment methods list page (loader + action) |
| `pages/dashboard/components/PaymentCardItem.tsx` | Single card display with actions |
| `pages/dashboard/components/PaymentCardForm.tsx` | Add card modal form |

## Routes

```typescript
{ path: "payments", file: "pages/dashboard/payments.tsx" },
```

## Loader

### `/dashboard/payments` Loader
```
1. Load all payment methods from localStorage
2. Sort: default card first, then by added date
3. Return { paymentMethods, canAddMore: paymentMethods.length < 5 }
```

## Actions

### `/dashboard/payments` Action
```
intent: "add_card"
1. Extract: card number (last 4 only — we don't store full number), brand, expiry, CVC (not stored), nickname
2. Validate: last4 is 4 digits, expiry is valid future date, brand is valid
3. Check count < 5 → error if at max
4. If no other cards → auto-set as default
5. Save to localStorage
6. Toast: "Card added successfully"

intent: "delete_card"
1. Extract cardId
2. Check it's not the only card → error if so
3. If deleting default → auto-promote next card to default
4. Remove from localStorage
5. Toast: "Card removed"

intent: "set_default"
1. Extract cardId
2. Unset current default, set new default
3. Save to localStorage
4. Toast: "Default payment method updated"
```

## PaymentCardItem Layout

```
┌─────────────────────────────────────────┐
│ [Visa Icon]  Visa ending in 4242        │
│              Expires 12/2027            │
│              "Personal Card"  ← nickname│
│              [Badge: Default]           │
│                                         │
│ [Set Default]  [Delete]                 │
└─────────────────────────────────────────┘
```

## PaymentCardForm (Modal)

```
┌─────────────────────────────────────────┐
│ Add Payment Method                      │
│                                         │
│ Card Number: [________________]         │
│ Expiry:      [MM/YY]                    │
│ CVC:         [___]                      │
│ Nickname:    [________________] optional │
│                                         │
│ [Cancel]  [Add Card]                    │
└─────────────────────────────────────────┘
```

Note: We only extract last 4 + brand from card number. In production, card processing is handled by a payment provider (Stripe, etc.). The form collects full details for UX realism but only persists brand + last4 + expiry.

## Data Shape

```typescript
interface PaymentMethod {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "discover";
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  nickname?: string;
  addedAt: string;           // ISO date
}
```

## Reuses

- **Input** (`components/ui/input/`) — card number, expiry, CVC, nickname fields
- **Button** (`components/ui/button/`) — add card, delete (destructive), set default
- **Modal / ModalTrigger** (`components/ui/modal/`) — add card form, delete confirmation
- **Card** (new) — payment card container
- **Badge** (new) — "Default" indicator
- **Heading** (`components/ui/heading/`) — page title
- **Text** (`components/ui/text/`) — card details
- **EmptyState** (new) — no cards yet
- **Toast** (`components/ui/toast/`) — success/error notifications

## TSDoc Comments

- PaymentMethod interface
- Max-cards validation logic
- Auto-promote default logic
- Add/delete/set-default actions
- PaymentCardForm validation
