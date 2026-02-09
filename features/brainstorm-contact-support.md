# Feature: Contact Support

> In-dashboard contact form for client support requests.

## Overview

Clients can submit support requests from the dashboard via a contact form with subject and body fields. Messages are submitted via a React Router action (future backend sends as email/ticket). Displays a success confirmation after submission.

## Decisions

| Decision | Choice |
|----------|--------|
| Channel | Contact form (subject + body) |
| Submission | React Router action → future API/email |
| History | No message history for now (future feature) |
| Urgency | No priority levels — just a simple form |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/support.tsx` | Support contact form page (action) |
| `pages/dashboard/components/ContactForm.tsx` | Contact form component |

## Routes

```typescript
{ path: "support", file: "pages/dashboard/support.tsx" },
```

## Action

### `/dashboard/support` Action
```
intent: "send_message"
1. Extract: subject, body
2. Validate: subject required, body required (minLength 10)
3. Save to localStorage as SupportMessage (for mock persistence)
4. In production: POST to backend API
5. Toast: "Message sent! We'll get back to you within 24 hours."
6. Reset form
```

## Page Layout

```
┌─────────────────────────────────────────┐
│ Contact Support                         │
│                                         │
│ Need help? Send us a message and we'll  │
│ get back to you within 24 hours.        │
│                                         │
│ Subject: [________________________]     │
│                                         │
│ Message:                                │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │                                     │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│                    [Send Message]        │
│                                         │
│ ─────────────────────────────────────── │
│ You can also reach us at:               │
│ 📞 (555) 123-4567                      │
│ 📧 company@email.com                   │
│ 🕐 Mon-Sat: 7AM - 8PM                 │
└─────────────────────────────────────────┘
```

## Data Shape

```typescript
interface SupportMessage {
  id: string;
  subject: string;
  body: string;
  userEmail: string;
  createdAt: string;
}
```

## Storage Key

```typescript
SUPPORT_MESSAGES: "mello_support_messages"    // SupportMessage[]
```

## Reuses

- **Input** (`components/ui/input/`) — subject field
- **Textarea** (`components/ui/textarea/`) — message body
- **Button** (`components/ui/button/`) — send button
- **Heading** (`components/ui/heading/`) — page title
- **Text** (`components/ui/text/`) — description, contact info
- **Card** (new) — form container
- **companyConfig** (`core/config/config.ts`) — phone, email, hours display
- **validators + validateForm** (`core/util/validation.ts`) — required, minLength
- **Toast** (`components/ui/toast/`) — success notification

## TSDoc Comments

- SupportMessage interface
- Submit action with future API notes
