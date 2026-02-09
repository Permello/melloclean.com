# Feature: Notification Preferences

> Configure email and SMS notification settings.

## Overview

Clients can toggle notification preferences for email and SMS channels. Each notification type (appointment reminders, payment receipts, promotions) can be independently enabled/disabled per channel.

## Decisions

| Decision | Choice |
|----------|--------|
| Channels | Email + SMS |
| Granularity | Per notification type, per channel |
| Default | Email: all on. SMS: all off. |
| Persistence | localStorage (future: backend API) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/notifications.tsx` | Notification preferences page (loader + action) |
| `pages/dashboard/components/NotificationPrefs.tsx` | Preference toggles grid |

## Routes

```typescript
{ path: "notifications", file: "pages/dashboard/notifications.tsx" },
```

## Loader

### `/dashboard/notifications` Loader
```
1. Load notification preferences from localStorage
2. If none exist → return defaults (email all on, SMS all off)
3. Return { preferences }
```

## Action

### `/dashboard/notifications` Action
```
intent: "update_preferences"
1. Extract all toggle values from form data
2. Build NotificationPreferences object
3. Save to localStorage
4. Toast: "Notification preferences updated"
```

## Page Layout

```
┌─────────────────────────────────────────┐
│ Notification Preferences                │
│                                         │
│ Choose how you'd like to be notified.   │
│                                         │
│                        Email    SMS     │
│ ────────────────────────────────────── │
│ Appointment Reminders  [on]    [off]   │
│ Appointment Updates    [on]    [off]   │
│ Payment Receipts       [on]    [off]   │
│ Payment Due Reminders  [on]    [off]   │
│ Promotional Offers     [on]    [off]   │
│ Referral Updates       [on]    [off]   │
│                                         │
│                [Save Preferences]       │
└─────────────────────────────────────────┘
```

## Data Shape

```typescript
interface NotificationPreferences {
  appointmentReminders: ChannelPrefs;
  appointmentUpdates: ChannelPrefs;
  paymentReceipts: ChannelPrefs;
  paymentDueReminders: ChannelPrefs;
  promotionalOffers: ChannelPrefs;
  referralUpdates: ChannelPrefs;
}

interface ChannelPrefs {
  email: boolean;
  sms: boolean;
}
```

## Defaults

```typescript
const DEFAULT_PREFS: NotificationPreferences = {
  appointmentReminders: { email: true, sms: false },
  appointmentUpdates: { email: true, sms: false },
  paymentReceipts: { email: true, sms: false },
  paymentDueReminders: { email: true, sms: false },
  promotionalOffers: { email: true, sms: false },
  referralUpdates: { email: true, sms: false },
};
```

## Storage Key

```typescript
NOTIFICATION_PREFS: "mello_notification_prefs"    // NotificationPreferences
```

## Reuses

- **Switch** (new `components/ui/switch/`) — per-channel toggles
- **Button** (`components/ui/button/`) — save button
- **Heading** (`components/ui/heading/`) — page title
- **Text** (`components/ui/text/`) — description
- **Card** (new) — preferences container
- **Toast** (`components/ui/toast/`) — save success

## TSDoc Comments

- NotificationPreferences and ChannelPrefs interfaces
- Default preferences constant
- Update action
