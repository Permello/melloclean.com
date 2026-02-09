# Dashboard Feature — Brainstorm 3 (Full Experience)

> Complete plan incorporating all features from a business owner perspective.
> Each feature has its own detailed file. This is the master overview.

---

## Feature Files Index

| File | Feature |
|------|---------|
| [brainstorm-auth.md](brainstorm-auth.md) | Dummy authentication + data seeding |
| [brainstorm-dashboard-shell.md](brainstorm-dashboard-shell.md) | Layout, sidebar, routing |
| [brainstorm-dashboard-overview.md](brainstorm-dashboard-overview.md) | Overview page, hero card, lifetime stats |
| [brainstorm-scheduling.md](brainstorm-scheduling.md) | Full CRUD appointments + recurring |
| [brainstorm-invoices.md](brainstorm-invoices.md) | Invoice list, detail, PDF download |
| [brainstorm-payments.md](brainstorm-payments.md) | Credit card management (max 5) |
| [brainstorm-account.md](brainstorm-account.md) | Account settings (password, addresses, phone) |
| [brainstorm-properties.md](brainstorm-properties.md) | Multiple properties + special instructions |
| [brainstorm-feedback.md](brainstorm-feedback.md) | Private ratings/reviews with nudge |
| [brainstorm-service-addons.md](brainstorm-service-addons.md) | Backend-driven service add-ons |
| [brainstorm-estimates.md](brainstorm-estimates.md) | Price estimate + overtime rate |
| [brainstorm-cancellation.md](brainstorm-cancellation.md) | Cancellation policy with fee warning |
| [brainstorm-cleaner-visibility.md](brainstorm-cleaner-visibility.md) | Assigned cleaner name + photo |
| [brainstorm-promotions.md](brainstorm-promotions.md) | Promotional offer banner |
| [brainstorm-referrals.md](brainstorm-referrals.md) | Referral URL + code sharing |
| [brainstorm-notifications.md](brainstorm-notifications.md) | Email + SMS notification preferences |
| [brainstorm-contact-support.md](brainstorm-contact-support.md) | Support contact form |
| [brainstorm-terms-of-service.md](brainstorm-terms-of-service.md) | ToS on signup + first booking |

---

## Architecture Decisions (Carried from Brainstorm 2)

| Decision | Choice |
|----------|--------|
| Layout | Sidebar navigation |
| Routing | Nested routes under `/dashboard` with shared layout + `<Outlet>` |
| Component location | Dashboard-specific components co-located in `pages/dashboard/` |
| Scheduling | Full CRUD + recurring |
| Dummy auth | Any credentials work, pre-populated dummy data |
| Data persistence | Local storage (survives refresh) |
| Addresses | Separate service + billing, with "same as" toggle |

---

## Complete Route Map

```typescript
// Auth (existing — MODIFY)
{ path: "login", file: "pages/auth/login/login.tsx" },
{ path: "join",  file: "pages/auth/join/join.tsx" },

// Dashboard (ALL NEW)
{
  path: "dashboard",
  file: "pages/dashboard/layout.tsx",
  children: [
    { index: true, file: "pages/dashboard/index.tsx" },
    { path: "schedule", file: "pages/dashboard/schedule.tsx" },
    { path: "schedule/new", file: "pages/dashboard/schedule-new.tsx" },
    { path: "schedule/:id/edit", file: "pages/dashboard/schedule-edit.tsx" },
    { path: "invoices", file: "pages/dashboard/invoices.tsx" },
    { path: "invoices/:id", file: "pages/dashboard/invoice-detail.tsx" },
    { path: "payments", file: "pages/dashboard/payments.tsx" },
    { path: "account", file: "pages/dashboard/account.tsx" },
    { path: "support", file: "pages/dashboard/support.tsx" },
    { path: "referrals", file: "pages/dashboard/referrals.tsx" },
    { path: "notifications", file: "pages/dashboard/notifications.tsx" },
  ],
}
```

---

## Existing Assets to Reuse (DO NOT recreate)

| Asset | Location |
|-------|----------|
| Select | `components/ui/select/` |
| Modal / ModalTrigger | `components/ui/modal/` |
| ToggleButtonGroup | `components/ui/toggle-button-group/` |
| Input | `components/ui/input/` |
| Textarea | `components/ui/textarea/` |
| Button | `components/ui/button/` |
| Heading | `components/ui/heading/` |
| Text | `components/ui/text/` |
| Slider | `components/ui/slider/` |
| Toast / ToastProvider | `components/ui/toast/` |
| Wizard | `components/ui/wizard/` |
| Login page | `pages/auth/login/login.tsx` |
| Signup page | `pages/auth/join/` |
| AuthLayout | `pages/auth/components/auth-layout.tsx` |
| PasswordInput | `pages/auth/components/password-input.tsx` |
| AddressSection | `pages/auth/join/components/address-section.tsx` |
| AccountSection | `pages/auth/join/components/account-section.tsx` |
| validators + validateForm | `core/util/validation.ts` |
| cn() | `core/util/cn.ts` |
| mergeRefs | `core/util/mergeRef.ts` |
| companyConfig | `core/config/config.ts` |

---

## New UI Components (11 total)

All follow the existing CVA file structure: `component-name.tsx`, `index.ts`, `ts/{constants,types,variants}.ts`

| Component | React Aria | Feature Files |
|-----------|-----------|---------------|
| **Sidebar** | landmark roles | dashboard-shell |
| **Card** | — | dashboard-overview, scheduling, invoices, payments, properties |
| **DataTable** | `useTable` | invoices |
| **Badge** | — | scheduling, invoices, payments |
| **DatePicker** | `useDatePicker` | scheduling |
| **Switch** | `useSwitch` | account, notifications |
| **EmptyState** | — | dashboard-overview, scheduling, payments |
| **Avatar** | — | dashboard-shell, cleaner-visibility |
| **Pagination** | — | invoices |
| **Tabs** | `useTabList` | scheduling |
| **StarRating** | — | feedback |

---

## Dashboard-Specific Components (25 total)

All in `pages/dashboard/components/`:

| Component | Feature File |
|-----------|-------------|
| DashboardSidebar | dashboard-shell |
| NextAppointmentHero | dashboard-overview |
| LifetimeStats | dashboard-overview |
| BookingDataBanner | dashboard-overview |
| PromoBanner | promotions |
| FeedbackNudge | feedback |
| AppointmentCard | scheduling |
| AppointmentForm | scheduling |
| RecurringConfig | scheduling |
| AddOnSelector | service-addons |
| EstimateDisplay | estimates |
| CancellationWarning | cancellation |
| CleanerInfo | cleaner-visibility |
| RebookButton | scheduling |
| InvoiceRow | invoices |
| InvoiceDetail | invoices |
| PaymentCardItem | payments |
| PaymentCardForm | payments |
| AccountForm | account |
| AddressFields | account |
| PropertyManager | properties |
| PropertyForm | properties |
| SpecialInstructions | properties |
| FeedbackForm | feedback |
| ContactForm | contact-support |
| ReferralCard | referrals |
| NotificationPrefs | notifications |
| TermsModal | terms-of-service |

---

## Complete Local Storage Schema

```typescript
export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: "mello_auth_token",
  USER_PROFILE: "mello_user_profile",
  TOS_ACCEPTED: "mello_tos_accepted",
  TOS_FIRST_BOOKING: "mello_tos_first_booking",

  // Core data
  APPOINTMENTS: "mello_appointments",
  INVOICES: "mello_invoices",
  PAYMENT_METHODS: "mello_payment_methods",
  PROPERTIES: "mello_properties",
  PENDING_BOOKING: "mello_pending_booking",

  // Feedback & support
  FEEDBACK: "mello_feedback",
  SUPPORT_MESSAGES: "mello_support_messages",

  // Referrals & promos
  REFERRAL: "mello_referral",
  PROMOTIONS: "mello_promotions",
  DISMISSED_PROMOTIONS: "mello_dismissed_promos",

  // Preferences
  NOTIFICATION_PREFS: "mello_notification_prefs",

  // Config (backend-driven, mocked)
  SERVICE_ADDONS: "mello_service_addons",
  CANCELLATION_POLICY: "mello_cancellation_policy",
} as const;
```

---

## Complete File Structure

```
frontend/
├── pages/
│   ├── auth/
│   │   ├── login/login.tsx              # MODIFY
│   │   ├── join/join.tsx                # MODIFY
│   │   ├── join/join-form-content.tsx   # MODIFY (ToS checkbox)
│   │   └── ...existing files
│   ├── dashboard/
│   │   ├── layout.tsx                   # NEW
│   │   ├── index.tsx                    # NEW
│   │   ├── schedule.tsx                 # NEW
│   │   ├── schedule-new.tsx             # NEW
│   │   ├── schedule-edit.tsx            # NEW
│   │   ├── invoices.tsx                 # NEW
│   │   ├── invoice-detail.tsx           # NEW
│   │   ├── payments.tsx                 # NEW
│   │   ├── account.tsx                  # NEW
│   │   ├── support.tsx                  # NEW
│   │   ├── referrals.tsx                # NEW
│   │   ├── notifications.tsx            # NEW
│   │   └── components/
│   │       ├── index.tsx
│   │       ├── DashboardSidebar.tsx
│   │       ├── NextAppointmentHero.tsx
│   │       ├── LifetimeStats.tsx
│   │       ├── BookingDataBanner.tsx
│   │       ├── PromoBanner.tsx
│   │       ├── FeedbackNudge.tsx
│   │       ├── FeedbackForm.tsx
│   │       ├── AppointmentCard.tsx
│   │       ├── AppointmentForm.tsx
│   │       ├── RecurringConfig.tsx
│   │       ├── AddOnSelector.tsx
│   │       ├── EstimateDisplay.tsx
│   │       ├── CancellationWarning.tsx
│   │       ├── CleanerInfo.tsx
│   │       ├── RebookButton.tsx
│   │       ├── InvoiceRow.tsx
│   │       ├── InvoiceDetail.tsx
│   │       ├── PaymentCardItem.tsx
│   │       ├── PaymentCardForm.tsx
│   │       ├── AccountForm.tsx
│   │       ├── AddressFields.tsx
│   │       ├── PropertyManager.tsx
│   │       ├── PropertyForm.tsx
│   │       ├── SpecialInstructions.tsx
│   │       ├── ContactForm.tsx
│   │       ├── ReferralCard.tsx
│   │       ├── NotificationPrefs.tsx
│   │       └── TermsModal.tsx
│   └── ...existing pages
├── components/ui/
│   ├── sidebar/                         # NEW
│   ├── card/                            # NEW
│   ├── data-table/                      # NEW
│   ├── badge/                           # NEW
│   ├── date-picker/                     # NEW
│   ├── switch/                          # NEW
│   ├── empty-state/                     # NEW
│   ├── avatar/                          # NEW
│   ├── pagination/                      # NEW
│   ├── tabs/                            # NEW
│   ├── star-rating/                     # NEW
│   └── ...existing components
├── core/
│   ├── auth/                            # NEW
│   │   ├── auth.ts
│   │   ├── auth.context.tsx
│   │   ├── auth.guard.tsx
│   │   └── index.ts
│   ├── storage/                         # NEW
│   │   ├── storage.ts
│   │   ├── storage.keys.ts
│   │   ├── storage.mock-data.ts
│   │   └── index.ts
│   ├── pdf/                             # NEW
│   │   ├── invoice-pdf.ts
│   │   └── index.ts
│   └── ...existing core
```

---

## Phased Implementation Plan

### Phase 1: Foundation (Auth + Storage + Dashboard Shell)
**Features**: brainstorm-auth, brainstorm-dashboard-shell
**New UI**: Sidebar, Card, Avatar, EmptyState

1. Create `core/storage/` layer
2. Create `core/auth/` layer
3. Modify existing login + join pages for dummy auth
4. Add ToS checkbox to signup form
5. Build DashboardLayout + DashboardSidebar
6. Build dashboard overview page (placeholder)
7. Add all dashboard routes to `routes.ts`
8. Seed mock data on first login

### Phase 2: Properties + Dashboard Overview
**Features**: brainstorm-properties, brainstorm-dashboard-overview, brainstorm-promotions
**New UI**: (none — uses Card, Avatar, EmptyState from Phase 1)

1. Build PropertyManager + PropertyForm + SpecialInstructions
2. Integrate properties into account page
3. Build NextAppointmentHero + LifetimeStats
4. Build BookingDataBanner
5. Build PromoBanner
6. Wire up dashboard overview loader + action

### Phase 3: Scheduling
**Features**: brainstorm-scheduling, brainstorm-service-addons, brainstorm-estimates, brainstorm-cancellation, brainstorm-cleaner-visibility, brainstorm-terms-of-service
**New UI**: DatePicker, Tabs, Badge, Switch

1. Build schedule list page with tabs
2. Build AppointmentCard + CleanerInfo + RebookButton
3. Build AppointmentForm (Wizard) with AddOnSelector + EstimateDisplay
4. Build RecurringConfig
5. Build schedule-edit page with CancellationWarning
6. Build TermsModal for first booking
7. Wire up all schedule loaders + actions

### Phase 4: Invoices
**Features**: brainstorm-invoices
**New UI**: DataTable, Pagination

1. Build invoices list page with DataTable
2. Build InvoiceRow + InvoiceDetail
3. Build PDF generation utility (`core/pdf/`)
4. Wire up loaders + PDF download action

### Phase 5: Payments + Feedback
**Features**: brainstorm-payments, brainstorm-feedback
**New UI**: StarRating

1. Build payments page with PaymentCardItem + PaymentCardForm
2. Build FeedbackForm + FeedbackNudge
3. Integrate feedback nudge into dashboard overview
4. Integrate feedback button into AppointmentCard

### Phase 6: Account + Support + Referrals + Notifications
**Features**: brainstorm-account, brainstorm-contact-support, brainstorm-referrals, brainstorm-notifications

1. Build account settings page with AccountForm + AddressFields
2. Integrate PropertyManager into account page
3. Build support contact form page
4. Build referrals page with ReferralCard
5. Build notifications preferences page

### Phase 7: Documentation & Cleanup
1. Update `CLAUDE.md`
2. Update all `.claude/docs/` files
3. Create `.claude/docs/dashboard-patterns.md`
4. Run `npm run typecheck`
5. Run `npm run dev` to verify
6. Run `npm run copyright` (final step)

---

## Comments Plan

- TSDoc on all new exported interfaces (per feature file)
- TSDoc on all new utility functions (auth, storage, pdf, validation)
- TSDoc on all loaders and actions
- TSDoc on all new UI component props
- `@module` tags on all barrel export files
- Follow existing `tsdoc-conventions.md`

## CLAUDE.md Update Plan

- Add `pages/dashboard/` tree to project structure
- Add 11 new UI components to component listing
- Add `core/auth/`, `core/storage/`, `core/pdf/` to core description
- Add dashboard route convention to page conventions
- Update all `.claude/docs/` files
- Create new `.claude/docs/dashboard-patterns.md`

---

## Verification

1. `npm run typecheck` — all types pass
2. `npm run dev` — dev server starts, no errors
3. Manual test flow:
   - Login with any credentials → dashboard overview
   - See next appointment hero card + lifetime stats
   - Navigate all sidebar links
   - Add a property with special instructions
   - Book appointment (select property, service, add-ons, review estimate, confirm)
   - See ToS modal on first booking
   - View/reschedule/cancel appointments
   - Try late cancellation → see fee warning
   - See cleaner info on appointments
   - Rebook from completed appointment
   - Leave feedback via nudge banner
   - View invoices, open detail, download PDF
   - Add credit card (up to 5), set default, delete
   - Update password, toggle billing address, update phone
   - Submit support message
   - View and copy referral link/code
   - Toggle notification preferences
   - Dismiss promo banner
   - Logout → redirect to /login
   - Fill landing page booking form → signup → see BookingDataBanner → confirm
4. `npm run copyright` — copyright headers added
