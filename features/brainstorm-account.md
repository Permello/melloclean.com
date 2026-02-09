# Feature: Account Settings

> Update password, addresses (with "same as" toggle), phone numbers.

## Overview

Clients can manage their account profile from a sectioned settings page. Sections include: password change, service address, billing address (with "billing same as service" toggle), and phone number. Addresses are tied to the primary account, not individual properties.

## Decisions

| Decision | Choice |
|----------|--------|
| Address toggle | "Billing same as service address" Switch — when on, billing mirrors service address |
| Password change | Current password + new password + confirm new password |
| Phone | Single phone number field |
| Sections | Collapsible or stacked sections on one page |
| Save | Per-section save buttons (not one global save) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/account.tsx` | Account settings page (loader + action) |
| `pages/dashboard/components/AccountForm.tsx` | Full account form with sections |
| `pages/dashboard/components/AddressFields.tsx` | Reusable address field group (adapted from existing `address-section.tsx`) |

## New UI Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **Switch** | `components/ui/switch/` | On/off toggle for "billing same as service" |

## Routes

```typescript
{ path: "account", file: "pages/dashboard/account.tsx" },
```

## Loader

### `/dashboard/account` Loader
```
1. Load user profile from localStorage
2. Return { profile } (name, email, phone, serviceAddress, billingAddress, billingSameAsService)
```

## Actions

### `/dashboard/account` Action
```
intent: "update_password"
1. Extract: currentPassword, newPassword, confirmPassword
2. Validate:
   - currentPassword required (dummy: always passes)
   - newPassword: minLength(8)
   - confirmPassword: must match newPassword (validators.confirmPassword)
3. In production: send to backend. Dummy: just show success toast.

intent: "update_service_address"
1. Extract: street, unit, city, state, zip
2. Validate: required fields, zip code format (validators.zipCode)
3. Update serviceAddress in UserProfile
4. If billingSameAsService → also update billingAddress
5. Save to localStorage, toast success

intent: "update_billing_address"
1. Extract: street, unit, city, state, zip
2. Validate: required fields, zip code format
3. Update billingAddress in UserProfile
4. Save to localStorage, toast success

intent: "toggle_billing_same"
1. Extract: billingSameAsService (boolean)
2. If toggling ON → copy serviceAddress to billingAddress
3. Update billingSameAsService flag
4. Save to localStorage

intent: "update_phone"
1. Extract: phone
2. Validate: required, basic phone format
3. Update phone in UserProfile
4. Save to localStorage, toast success
```

## Page Layout

```
┌─────────────────────────────────────────┐
│ Account Settings                        │
├─────────────────────────────────────────┤
│ Password                                │
│ ┌─────────────────────────────────────┐ │
│ │ Current Password: [____________]    │ │
│ │ New Password:     [____________]    │ │
│ │ Confirm Password: [____________]    │ │
│ │                        [Update]     │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Service Address                         │
│ ┌─────────────────────────────────────┐ │
│ │ Street: [________________________]  │ │
│ │ Unit:   [________] (optional)       │ │
│ │ City:   [__________]               │ │
│ │ State:  [____]  Zip: [_____]       │ │
│ │                        [Update]     │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Billing Address                         │
│ [Switch: Same as service address]       │
│ ┌─────────────────────────────────────┐ │
│ │ (fields disabled if toggle is ON)   │ │
│ │ Street: [________________________]  │ │
│ │ Unit:   [________] (optional)       │ │
│ │ City:   [__________]               │ │
│ │ State:  [____]  Zip: [_____]       │ │
│ │                        [Update]     │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Phone Number                            │
│ ┌─────────────────────────────────────┐ │
│ │ Phone: [_______________]            │ │
│ │                        [Update]     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Reuses

- **Input** (`components/ui/input/`) — all text fields
- **PasswordInput** (`pages/auth/components/password-input.tsx`) — password fields
- **Button** (`components/ui/button/`) — section save buttons
- **Switch** (new) — billing toggle
- **Heading** (`components/ui/heading/`) — section headings
- **Card** (new) — section containers
- **validators + validateForm** (`core/util/validation.ts`) — zipCode, required, minLength, confirmPassword
- **AddressSection pattern** (`pages/auth/join/components/address-section.tsx`) — field layout reference
- **Toast** (`components/ui/toast/`) — success/error notifications

## TSDoc Comments

- AddressFields props (adapted from address-section.tsx)
- Per-section action intents
- billingSameAsService sync logic
- Password validation rules
