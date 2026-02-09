# Feature: Referral Program

> Share unique referral URL and code. Reward tracking handled by backend.

## Overview

Clients get a unique referral URL and code they can share with friends. When a new client signs up using the referral, the reward is tracked by the backend. The dashboard shows the referral link/code with copy-to-clipboard functionality and a count of successful referrals (mocked).

## Decisions

| Decision | Choice |
|----------|--------|
| Referral format | Both: shareable URL + text code |
| URL format | `melloclean.com/ref/ABC123` |
| Code format | `REF-ABC123` |
| Rewards | Backend-handled — we just display the link/code |
| Tracking | Show referral count (mocked) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/referrals.tsx` | Referral page (loader) |
| `pages/dashboard/components/ReferralCard.tsx` | Referral link/code display with copy buttons |

## Routes

```typescript
{ path: "referrals", file: "pages/dashboard/referrals.tsx" },
```

## Loader

### `/dashboard/referrals` Loader
```
1. Load referral data from localStorage
2. If no referral exists → generate one (code from user ID hash)
3. Return { referralCode, referralUrl, referralCount }
```

## Page Layout

```
┌─────────────────────────────────────────┐
│ Refer a Friend                          │
│                                         │
│ Share your referral link and earn        │
│ rewards when friends sign up!           │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Your Referral Link                  │ │
│ │ melloclean.com/ref/ABC123  [Copy]   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Your Referral Code                  │ │
│ │ REF-ABC123                 [Copy]   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Referrals: 3 friends signed up      │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Data Shape

```typescript
interface Referral {
  code: string;                // "REF-ABC123"
  url: string;                 // "melloclean.com/ref/ABC123"
  referralCount: number;       // mocked count
  createdAt: string;
}
```

## Storage Key

```typescript
REFERRAL: "mello_referral"    // Referral object
```

## Reuses

- **Input** (`components/ui/input/`) — read-only referral fields with copy buttons
- **Button** (`components/ui/button/`) — copy to clipboard
- **Card** (new) — referral link/code containers, stats card
- **Heading** (`components/ui/heading/`) — page title
- **Text** (`components/ui/text/`) — description
- **Toast** (`components/ui/toast/`) — "Copied to clipboard!"

## TSDoc Comments

- Referral interface
- Code generation logic
- Copy-to-clipboard utility
