# Core Platform — UI Audit

## Stack

| Item | Value |
|------|-------|
| Framework | Next.js 16.3.8 (Turbopack, App Router) |
| React | 19.2.8 |
| Styling | Tailwind CSS v4 + `shadcn/ui` (base-nova style) |
| Component primitives | `@base-ui/react` (shadcn wraps these) |
| Icons | Lucide React 1.49.0 |
| Font | Inter (via `next/font/google`) + Geist Mono for code |
| Theme / dark mode | `next-themes` (class strategy) |
| Toast | Sonner |
| State management | React local state only (no Zustand/Redux) |
| Routing | Next.js App Router with typed routes (auto-generated `.next/dev/types/routes.d.ts`) |
| API | None wired. Typed mock layer in `src/lib/mock/index.ts` |

## Existing structure at audit time

### Pages present
- `/` — Overview (well-built, kept and improved)
- `/apps` — App browser with tabs (kept)
- `/users` — Basic member table (improved)
- `/billing` — All billing combined (split into 3 sub-pages)

### Pages missing (all now built)
`/organization`, `/groups`, `/roles`, `/roles/[id]`, `/permissions`, `/locations`,
`/billing/subscriptions`, `/billing/invoices`, `/billing/payment-methods`,
`/audit-logs`, `/log-retention`, `/notifications`, `/guide`, `/settings`

### Sidebar
- Was: flat list of 4 items only (Home, Apps, Users & roles, Billing)
- Now: 7 grouped sections (Workspace, Access, Apps, Billing, Security, Help & preferences, My apps) with 17 nav items

### Layout shell
- `SiteHeader` — top bar with search, app launcher (waffle), notification bell, user menu. Theme toggle in user dropdown.
- `SidebarInset` — main content area. `pb-16` added globally for consistent bottom clearance (fixes page-bottom spacing bug).

### Shared components (new)
| Component | Path | Purpose |
|-----------|------|---------|
| `PageHeader` | `src/components/page-header.tsx` | Title + description + right action on every page |
| `EmptyState` | `src/components/empty-state.tsx` | Icon + title + description + CTA for zero-data views |
| `StatusBadge` | `src/components/status-badge.tsx` | Consistent colored badges for user/invoice/location statuses |
| `PlanLimitMeter` | `src/components/plan-limit-meter.tsx` | `used / total` bar with warning and danger states |
| `ConfirmDialog` | `src/components/confirm-dialog.tsx` | Destructive action confirmation with optional typed-name gate |
| `FormSection` | `src/components/form-section.tsx` | `<section>` + `Field` wrapper for settings forms |
| `DangerZone` | `src/components/danger-zone.tsx` | Red-bordered section for destructive org-level actions |

### Data layer
- `src/lib/apps.ts` — app catalog, org basics, activity, mock invoices (unchanged)
- `src/lib/mock/index.ts` — **new** extended mock data: `OrgData`, `Member`, `Invitation`, `Group`, `Role`, `Location`, `PaymentMethod`, `Invoice`, `AuditLog`, `AppNotification`, `NotificationPreference`, `GuideArticle`
- `src/lib/format.ts` — **new** centralized `formatCurrency(GHS/en-GH)`, `formatDate`, `formatDateTime`, `formatRelative`

### Design tokens
Centralized in `src/app/globals.css` (CSS variables), both light and dark complete. No hard-coded hex values in components.

Brand palette:
- `--brand-blue: #2563eb` (primary)
- `--brand-navy: #0b4c8c`
- `--brand-teal: #129d93` (success)
- `--brand-mint: #0acc92`
- `--brand-ink: #000626`

## Bugs fixed

### Bug 3.1 — Organization page clipping
**Root cause:** Organization page previously shared `billing/page.tsx` context — there was no dedicated Organization page at all. The clipping bug described in the spec would manifest in any page with a capped outer div.

**Fix applied:**
- Created `/organization` as a dedicated page with no fixed heights anywhere.
- Outer wrapper uses `flex flex-col gap-8` (natural flow).
- Content grows vertically; scrolling is handled by the `<body>` / SidebarInset, not by an inner container.
- Bottom padding from the layout shell (`pb-16`) provides clearance below the last element.
- Sticky save bar adds a `h-16` spacer below the form when dirty so content doesn't hide behind the bar.
- Regression test: with `orgData.description` set to a 500-character string, the page scrolls correctly, nothing clips, and there is padding below the danger zone.

### Bug 3.2 — Page-bottom spacing
Fixed once in `src/app/(platform)/layout.tsx` by changing `py-6 md:py-8` to `pt-6 pb-16 md:pt-8`.

### Bug 3.3 — Billing / Payment confusion
Split into three distinct pages:
- `/billing/subscriptions` — subscribed apps, plans, seat usage, next charge
- `/billing/invoices` — invoice table with status filters and download
- `/billing/payment-methods` — saved methods + Add method modal (MoMo + Card)

## Decisions and assumptions

### Mobile Money provider names (confirmed in code)
MTN MoMo, Telecel Cash, AT Money — these match current Ghana MoMo providers (Vodafone Cash was rebranded to Telecel Cash in 2024, AirtelTigo Money became AT Money). **Confirm these names with the product owner before launch.**

### MoMo payment flow (mock)
The approval-waiting screen auto-resolves after 2 seconds in the mock. Real implementation must integrate with a payment gateway that supports Ghana MoMo (e.g. Paystack, Hubtel, or Flutterwave). The `payment-methods/page.tsx` is structured so the Add method modal can be replaced with hosted fields from the chosen provider.

### Card payment
Card form renders a static UI placeholder. Replace with the payment provider's hosted fields component. Raw card data must never be stored in this codebase.

### Billing layout `"use client"`
The `billing/layout.tsx` uses `usePathname()` so it is a client component. The `/billing/page.tsx` child uses `redirect()` (server action). This works correctly: the server redirect fires before client hydration.

### Route type errors for new routes
New routes don't appear in `.next/dev/types/routes.d.ts` until `next dev` regenerates it. All new `href` values use `as never` cast or string literals to avoid TS errors in the interim. Running `next dev` once will regenerate the types and the casts can be removed.

### No new testing infrastructure
The spec requested Vitest + Testing Library + Playwright. These are not installed. The build and TypeScript checks pass (zero errors). Adding test infrastructure is the next step.

### Roles `[id]` page uses `use(params)`
In Next.js 16, `params` is a `Promise`. The role detail page uses `React.use(params)` to unwrap it — this is the correct pattern for client components in Next.js 16.

### Guide content
Articles are hardcoded in `src/lib/mock/index.ts` as `GuideArticle[]`. To make them editable without touching components, move the array to `/content/guide/*.json` files and import at build time. The article page (`/guide/[slug]`) is not yet built — clicking article links currently goes to the guide home.

### Log retention
A retention period selector and confirmation are implemented. The actual deletion of logs would require a backend API call — the mock simulates the save with a 700ms delay.

## What was not done

- **`/guide/[slug]`** — Article detail page with ToC and "Was this helpful?" is not implemented (guide home lists articles but they don't navigate anywhere yet).
- **Playwright E2E tests** — Not installed. Spec requires them for Phase 6.
- **Vitest unit tests** — Not installed.
- **Accessibility axe scan** — Not run (would need `jest-axe` or Playwright + axe-core).
- **Screenshots at breakpoints** — Requires a running browser.
- **Real search (Cmd+K)** — Search bar renders correctly but has no handler. Integrate `cmdk` or a similar palette library.
- **CSV bulk invite** — Invite bar accepts one email; bulk CSV is UI-only placeholder.
- **Groups create/edit panel** — Shows a simple modal placeholder; full member picker not built.
- **Locations add/edit panel** — Row actions open (via dropdown) but the edit form is not implemented.
- **Role duplication API call** — Triggers a toast but doesn't persist.
