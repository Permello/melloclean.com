# Feature: Authentication (Dummy Auth)

> No backend yet. Dummy auth with local storage for development.

## Overview

Temporary authentication system that accepts any credentials, seeds dummy data on first login, and protects dashboard routes with an auth guard. Structured with React Router 7 actions/loaders so it swaps to a real backend seamlessly.

## Decisions

| Decision | Choice |
|----------|--------|
| Auth method | Any email + password combo works |
| Token storage | UUID in localStorage |
| Data seeding | On first login/signup, seed appointments, invoices, 1 credit card |
| Auth guard | Dashboard layout loader checks token, redirects to /login if missing |
| Logout | Clears all `mello_*` localStorage keys, redirects to /login |
| Terms of service | Checkbox on signup (required) — see brainstorm-terms-of-service.md |

## Files to Modify (Existing)

| File | Change |
|------|--------|
| `pages/auth/login/login.tsx` | Add dummy auth action: accept any credentials, set auth token, check pending booking, redirect to /dashboard |
| `pages/auth/join/join.tsx` | Add dummy auth action: create user in localStorage, seed data, set token, check pending booking, redirect to /dashboard |
| `pages/auth/join/join-form-content.tsx` | Add ToS checkbox to signup wizard |

## Files to Create (New)

| File | Purpose |
|------|---------|
| `core/auth/auth.ts` | `login()`, `signup()`, `logout()`, `isAuthenticated()`, `getAuthToken()` utilities |
| `core/auth/auth.context.tsx` | `AuthProvider` + `useAuth()` hook (exposes user, login, logout, isAuthenticated) |
| `core/auth/auth.guard.tsx` | `authGuard()` loader function — checks token, returns redirect or user data |
| `core/auth/index.ts` | Barrel exports |

## Actions & Loaders

### `/login` Action (modify existing)
```
1. Extract email + password from FormData
2. Run existing validation (required, email format, min length)
3. If valid: call login(email) from core/auth
   - Generate UUID token → localStorage["mello_auth_token"]
   - Create/load UserProfile → localStorage["mello_user_profile"]
   - Seed mock data if first login (appointments, invoices, card)
   - Check localStorage["mello_pending_booking"]
4. Redirect to /dashboard (with ?pendingBooking=true if booking data found)
```

### `/login` Loader (add new)
```
1. Check isAuthenticated()
2. If true → redirect to /dashboard
3. If false → return null (show login page)
```

### `/join` Action (modify existing)
```
1. Extract form data (name, email, password, address, ToS acceptance)
2. Validate (existing validators + ToS required)
3. If valid: call signup(formData) from core/auth
   - Same as login but also saves full profile data from signup form
   - Set ToS accepted timestamp
4. Redirect to /dashboard
```

### `/join` Loader (add new)
```
1. Check isAuthenticated()
2. If true → redirect to /dashboard
3. If false → return null
```

### Dashboard Layout Loader (new)
```
1. Call authGuard()
2. If no token → redirect("/login")
3. If token → load and return UserProfile for sidebar
```

## Dummy Data Seeding

On first login/signup, `core/storage/storage.mock-data.ts` creates:

- **UserProfile**: Name from form (or "Test User"), email from form, dummy addresses, phone
- **3-4 Appointments**: Mix of upcoming, completed, cancelled. Various service types.
- **3-4 Invoices**: Mix of paid, pending. Linked to completed appointments.
- **1 Credit Card**: Visa ending in 4242, default card
- **1 Property**: Home type with the user's service address
- **Notification prefs**: Email on, SMS off (defaults)

## Local Storage Keys

```typescript
AUTH_TOKEN: "mello_auth_token"        // UUID string
USER_PROFILE: "mello_user_profile"    // UserProfile object
TOS_ACCEPTED: "mello_tos_accepted"    // ISO date string
```

## TSDoc Comments

- All exported functions in `core/auth/auth.ts`
- AuthProvider and useAuth hook
- authGuard loader function
- Modified action functions in login.tsx and join.tsx

## Reuses

- **Input** (`components/ui/input/`) — email, password fields
- **Button** (`components/ui/button/`) — submit buttons
- **AuthLayout** (`pages/auth/components/auth-layout.tsx`) — page wrapper
- **PasswordInput** (`pages/auth/components/password-input.tsx`) — password field
- **validators + validateForm** (`core/util/validation.ts`) — form validation
- **Toast** (`components/ui/toast/`) — login/signup success/error notifications
