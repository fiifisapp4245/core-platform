"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, BellRing, Check, MoreHorizontal, Plus, Users } from "lucide-react"
import { toast } from "sonner"

import { AppIcon } from "@/components/brand"
import { getApp, type TroveApp } from "@/lib/apps"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function StatusBadge({ status }: { status: TroveApp["status"] }) {
  const map = {
    active: { label: "Active", className: "bg-success/10 text-success" },
    trial: { label: "Trial", className: "bg-primary/10 text-primary" },
    available: { label: "Available", className: "bg-muted text-muted-foreground" },
    "coming-soon": { label: "Coming soon", className: "bg-brand-navy/10 text-brand-navy dark:bg-brand-navy/30 dark:text-blue-200" },
  } as const
  const s = map[status]
  return (
    <Badge variant="secondary" className={cn("gap-1 font-medium", s.className)}>
      {status === "active" && <span className="size-1.5 rounded-full bg-current" />}
      {s.label}
    </Badge>
  )
}

export function SubscribedAppCard({ id }: { id: string }) {
  const app = getApp(id)
  return (
    <Card className="group/app relative gap-0 p-0 transition-shadow hover:shadow-md hover:ring-primary/30">
      <div className="flex items-start gap-3 p-5 pb-4">
        <AppIcon app={app} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold">{app.name}</h3>
            <StatusBadge status={app.status} />
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{app.description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-sm" className="-mt-1 -mr-2 text-muted-foreground" aria-label={`${app.name} options`} />}
          >
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem render={<Link href="/users" />}>Manage access</DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/billing" />}>Subscription details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Pin to launcher</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {app.metrics && (
        <div className="mx-5 grid grid-cols-2 divide-x rounded-lg border bg-muted/40">
          {app.metrics.map((m) => (
            <div key={m.label} className="px-3 py-2.5">
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="mt-0.5 text-sm font-semibold tabular-nums">{m.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3 border-t px-5 py-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" />
            {app.seats?.used}/{app.seats?.total} seats
          </span>
          <span>
            {app.status === "trial" ? "Trial ends" : "Renews"} {app.renewsOn}
          </span>
        </div>
        <Button size="sm" nativeButton={false} render={<a href={app.href} target="_blank" rel="noreferrer" />}>
          Open <ArrowUpRight data-icon="inline-end" />
        </Button>
      </div>
    </Card>
  )
}

export function AddAppCard() {
  return (
    <Link
      href="/apps?tab=discover"
      className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-card/50 p-6 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground"
    >
      <span className="flex size-10 items-center justify-center rounded-full border bg-background">
        <Plus className="size-5" />
      </span>
      <span className="font-medium text-foreground">Add another app</span>
      <span className="max-w-56 text-xs">Connect a new module to your organization. Your data is shared automatically.</span>
    </Link>
  )
}

export function DiscoverAppCard({ id, compact = false }: { id: string; compact?: boolean }) {
  const app = getApp(id)
  const [requested, setRequested] = React.useState(false)
  const soon = app.status === "coming-soon"

  function handleClick() {
    setRequested(true)
    toast.success(
      soon ? `We'll let you know when ${app.name} launches` : `${app.name} trial requested`,
      { description: soon ? "You're on the early-access list." : "An admin will activate it within one business day." }
    )
  }

  return (
    <Card className={cn("gap-3 transition-shadow hover:shadow-sm", compact ? "p-4" : "p-5")}>
      <div className="flex items-start justify-between gap-3">
        <AppIcon app={app} />
        <StatusBadge status={app.status} />
      </div>
      <div>
        <h3 className="text-sm font-semibold">{app.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{app.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground">{app.category}</span>
        <Button
          size="sm"
          variant={requested ? "secondary" : "outline"}
          onClick={handleClick}
          disabled={requested}
        >
          {requested ? (
            <><Check data-icon="inline-start" /> {soon ? "On the list" : "Requested"}</>
          ) : soon ? (
            <><BellRing data-icon="inline-start" /> Notify me</>
          ) : (
            <>Start free trial</>
          )}
        </Button>
      </div>
    </Card>
  )
}
