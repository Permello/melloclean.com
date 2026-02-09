# Feature: Private Feedback / Ratings

> Optional private feedback after completed appointments with a nudge banner.

## Overview

After a cleaning is completed, clients can rate the service (1-5 stars) and leave a private comment. Feedback is sent only to the company (not displayed publicly). A nudge banner appears on the dashboard overview for appointments without feedback.

## Decisions

| Decision | Choice |
|----------|--------|
| Visibility | Private — feedback goes to company only |
| Required | Optional with nudge banner |
| Rating | 1-5 star rating |
| Nudge | Banner on dashboard overview for the most recent completed appointment without feedback |
| Access | From AppointmentCard ("Leave Feedback" button) or from nudge banner |
| Form | Modal-based (star rating + text comment) |

## Files to Create

| File | Purpose |
|------|---------|
| `pages/dashboard/components/FeedbackForm.tsx` | Star rating + comment modal form |
| `pages/dashboard/components/FeedbackNudge.tsx` | Nudge banner on dashboard overview |

## New UI Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **StarRating** | `components/ui/star-rating/` | Interactive 1-5 star rating input (generic, reusable) |

## Integration Points

- **AppointmentCard** (`brainstorm-scheduling.md`) — "Leave Feedback" button on completed appointments without feedback
- **Dashboard Overview** (`brainstorm-dashboard-overview.md`) — FeedbackNudge banner
- **Schedule page** — FeedbackForm modal triggered from AppointmentCard

## Actions

### Feedback submission (on `/dashboard/schedule` or `/dashboard`)
```
intent: "submit_feedback"
1. Extract: appointmentId, rating (1-5), comment (optional)
2. Validate: rating required (1-5), appointmentId exists, appointment is completed
3. Create Feedback object in localStorage
4. Link feedback to appointment (set appointment.feedbackId)
5. Toast: "Thank you for your feedback!"
```

### Dismiss nudge (on `/dashboard`)
```
intent: "dismiss_feedback_nudge"
1. Extract: appointmentId
2. Mark appointment as nudge-dismissed in localStorage (without requiring feedback)
3. Nudge won't show again for this appointment
```

## FeedbackForm (Modal)

```
┌─────────────────────────────────────────┐
│ How was your cleaning?                  │
│                                         │
│ Deep Cleaning · March 15, 2025          │
│ 123 Main St · Sarah M.                 │
│                                         │
│ Rating: ★ ★ ★ ★ ☆  (4/5)             │
│                                         │
│ Comments (optional):                    │
│ ┌─────────────────────────────────────┐ │
│ │ Great job on the kitchen!           │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancel]  [Submit Feedback]             │
└─────────────────────────────────────────┘
```

## FeedbackNudge Banner

```
┌─────────────────────────────────────────┐
│ ★ How was your last cleaning?           │
│ Your Deep Cleaning on March 15 — we'd   │
│ love to hear how it went!               │
│ [Leave Feedback]  [Dismiss]             │
└─────────────────────────────────────────┘
```

## Data Shape

```typescript
interface Feedback {
  id: string;
  appointmentId: string;
  rating: number;              // 1-5
  comment?: string;
  createdAt: string;
}
```

## Storage Key

```typescript
FEEDBACK: "mello_feedback"    // Feedback[]
```

## StarRating Component (new UI component)

```
components/ui/star-rating/
├── star-rating.tsx          # Interactive star rating with hover state
├── index.ts
└── ts/
    ├── constants.ts         # MAX_STARS = 5
    ├── types.ts             # StarRatingProps
    └── variants.ts          # Size variants (small, default, large)
```

Props:
| Prop | Type | Default |
|------|------|---------|
| `value` | `number` | `0` |
| `onChange` | `(rating: number) => void` | — |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` |
| `readOnly` | `boolean` | `false` |
| `label` | `string` | `'Rating'` |

## Reuses

- **Modal** (`components/ui/modal/`) — feedback form container
- **Textarea** (`components/ui/textarea/`) — comment field
- **Button** (`components/ui/button/`) — submit, cancel, dismiss
- **Card** (new) — nudge banner container
- **StarRating** (new) — star rating input
- **Heading** (`components/ui/heading/`) — modal title
- **Toast** (`components/ui/toast/`) — submission success

## TSDoc Comments

- Feedback interface
- StarRating component props and interaction
- FeedbackForm validation and submission
- FeedbackNudge display logic (most recent completed without feedback)
