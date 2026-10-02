import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CreditCard,
  LayoutGrid,
  LifeBuoy,
  MapPin,
  ShieldCheck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react"

import { AddAppCard, SubscribedAppCard } from "@/components/app-cards"
import { AppIcon, TroveMark } from "@/components/brand"
import {
  activity,
  apps,
  currentUser,
  organization,
  subscribedApps,
} from "@/lib/apps"
import { formatCurrency } from "@/lib/format"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const totalSeats = subscribedApps.reduce((n, a) => n + (a.seats?.total ?? 0), 0)
const usedSeats = subscribedApps.reduce((n, a) => n + (a.seats?.used ?? 0), 0)

const stats = [
  {
    label: "Active apps",
    value: `${subscribedApps.length}`,
    hint: `of ${apps.length} in TroveSuite`,
    icon: LayoutGrid,
  },
  {
    label: "Team members",
    value: "18",
    hint: `${usedSeats} of ${totalSeats} seats assigned`,
    icon: Users,
  },
  {
    label: "Next invoice",
    value: formatCurrency(1450),
    hint: "Due Oct 15, 2026",
    icon: Wallet,
  },
  {
    label: "Security",
    value: "Healthy",
    hint: "2FA on for 16 of 18 users",
    icon: ShieldCheck,
  },
]

const quickActions = [
  { label: "Invite a teammate", icon: UserPlus, href: "/users" },
  { label: "Add location", icon: MapPin, href: "/locations" },
  { label: "Manage billing", icon: CreditCard, href: "/billing/subscriptions" },
  { label: "Browse apps", icon: LayoutGrid, href: "/apps" },
  { label: "Organization", icon: Building2, href: "/organization" },
  { label: "Contact support", icon: LifeBuoy, href: "/guide" },
]

const checklist = [
  { id: "org", label: "Create organization", done: true, href: "/organization" },
  { id: "loc", label: "Add a location", done: true, href: "/locations" },
  { id: "users", label: "Invite users", done: true, href: "/users" },
  { id: "roles", label: "Assign roles", done: false, href: "/roles" },
  { id: "app", label: "Subscribe to an app", done: true, href: "/billing/subscriptions" },
]

const appById = Object.fromEntries(apps.map((a) => [a.id, a]))

export default function HomePage() {
  const trial = subscribedApps.find((a) => a.status === "trial")
  const checklistDone = checklist.filter((c) => c.done).length
  const checklistTotal = checklist.length

  return (
    <div className="flex flex-col gap-8">

      {/* ── Welcome banner ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-[#0d3f7a] to-brand-blue p-6 text-white md:p-8">
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand-teal/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-brand-mint/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm text-blue-100/80">{organization.name}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              Welcome back, {currentUser.firstName}
            </h2>
            <p className="mt-2 text-sm text-blue-100/90">
              All your business apps in one place. Open an app, manage who has
              access, and keep track of your subscription.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                nativeButton={false}
                render={
                  <a href={subscribedApps[0].href} target="_blank" rel="noreferrer" />
                }
                className="bg-white text-brand-navy hover:bg-blue-50"
              >
                Open {subscribedApps[0].name} <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/apps" />}
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white dark:border-white/25 dark:bg-white/10"
              >
                Explore apps
              </Button>
            </div>
          </div>
          <div className="hidden items-center md:flex">
            <TroveMark className="size-14 rounded-2xl ring-4 ring-white/15 [&_svg]:size-7" />
            {subscribedApps.map((a) => (
              <AppIcon
                key={a.id}
                app={a}
                size="lg"
                className="-ml-3 size-14 rounded-2xl ring-4 ring-[#0d3f7a] [&_svg]:size-7"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trial banner ─────────────────────────────────────────────────── */}
      {trial && (
        <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-accent px-4 py-3 text-sm sm:flex-row sm:items-center">
          <AppIcon app={trial} size="sm" />
          <p className="flex-1 text-accent-foreground">
            Your <span className="font-medium">{trial.name}</span> trial ends on{" "}
            {trial.renewsOn}. Upgrade to keep your loan records and team access.
          </p>
          <Button size="sm" nativeButton={false} render={<Link href="/billing/subscriptions" />}>
            Upgrade plan
          </Button>
        </div>
      )}

      {/* ── KPI stats ────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm" className="px-1">
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <s.icon className="size-4" /> {s.label}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums group-data-[size=sm]/card:text-2xl">
                {s.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-2 text-xs text-muted-foreground">
              {s.hint}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* ── Your apps — FULL WIDTH ───────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Your apps</h2>
            <p className="text-sm text-muted-foreground">
              Apps your organization currently subscribes to
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/apps" />}
          >
            Manage all apps <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subscribedApps.map((app) => (
            <SubscribedAppCard key={app.id} id={app.id} />
          ))}
          <AddAppCard />
        </div>
      </section>

      {/* ── Bottom split: main content + right rail ──────────────────────── */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left — checklist + activity */}
        <div className="flex min-w-0 flex-col gap-8 lg:col-span-2">

          {/* Setup checklist */}
          {checklistDone < checklistTotal && (
            <section>
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Get set up</CardTitle>
                  <CardDescription>
                    {checklistDone} / {checklistTotal} complete
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Progress value={(checklistDone / checklistTotal) * 100} className="h-1.5" />
                  <div className="flex flex-col gap-1">
                    {checklist.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href as never}
                        className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted/50"
                      >
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            item.done
                              ? "border-success bg-success text-white"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {item.done && <Check className="size-3" />}
                        </span>
                        <span className={item.done ? "text-muted-foreground line-through" : "font-medium"}>
                          {item.label}
                        </span>
                        {!item.done && (
                          <ArrowRight className="ml-auto size-4 text-muted-foreground" />
                        )}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Recent activity */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Across all your apps</CardDescription>
              <CardAction>
                <Button
                  variant="ghost"
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/audit-logs" />}
                  className="text-xs"
                >
                  View all
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <ol className="relative flex flex-col gap-4 before:absolute before:top-2 before:bottom-2 before:left-3 before:w-px before:bg-border">
                {activity.map((item) => {
                  const app = appById[item.appId]
                  return (
                    <li key={item.id} className="relative flex gap-3">
                      {app ? (
                        <AppIcon app={app} size="sm" className="ring-4 ring-card" />
                      ) : (
                        <TroveMark className="size-6 rounded-md ring-4 ring-card [&_svg]:size-3" />
                      )}
                      <div className="min-w-0 flex-1 text-xs">
                        <p className="leading-relaxed">
                          <span className="font-medium">{item.actor}</span>{" "}
                          <span className="text-muted-foreground">{item.action}</span>
                        </p>
                        <p className="mt-0.5 text-muted-foreground/80">{item.time}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Right rail — subscription + quick actions */}
        <aside className="flex min-w-0 flex-col gap-4">

          {/* Subscription summary */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Subscription</CardTitle>
              <CardDescription>{organization.plan} · monthly</CardDescription>
              <CardAction>
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/billing/subscriptions" />}
                >
                  Manage
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-muted-foreground">Seats used</span>
                  <span className="font-medium tabular-nums">{usedSeats} / {totalSeats}</span>
                </div>
                <Progress value={(usedSeats / totalSeats) * 100} />
              </div>
              <div className="flex flex-col gap-2 rounded-lg border bg-muted/40 p-3 text-xs">
                {subscribedApps.map((a) => (
                  <div key={a.id} className="flex items-center gap-2">
                    <AppIcon app={a} size="sm" />
                    <span className="flex-1 font-medium">{a.name}</span>
                    <span className="text-muted-foreground">{a.plan}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Next payment · Oct 15</span>
                <span className="text-lg font-semibold tabular-nums">{formatCurrency(1450)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {quickActions.map((q) => (
                <Link
                  key={q.label}
                  href={q.href as never}
                  className="flex flex-col gap-2 rounded-lg border p-3 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                >
                  <q.icon className="size-4 text-primary" />
                  {q.label}
                </Link>
              ))}
            </CardContent>
          </Card>

        </aside>
      </div>
    </div>
  )
}
