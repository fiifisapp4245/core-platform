"use client"

import * as React from "react"
import { Bell, BellOff, Check } from "lucide-react"
import { toast } from "sonner"

import { notifications, notificationPreferences, type AppNotification } from "@/lib/mock"
import { formatRelative } from "@/lib/format"
import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ─── Notification center ──────────────────────────────────────────────────────

function NotificationCenter() {
  const [items, setItems] = React.useState(notifications)
  const unread = items.filter((n) => !n.read)

  function markAllRead() {
    setItems((ns) => ns.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  function markRead(id: string) {
    setItems((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unread.length > 0
            ? `${unread.length} unread`
            : "All caught up"}
        </p>
        {unread.length > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            <Check data-icon="inline-start" /> Mark all as read
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up. New notifications will appear here."
        />
      ) : (
        <Card className="gap-0 divide-y p-0">
          {items.map((n) => (
            <NotificationItem key={n.id} notification={n} onRead={markRead} />
          ))}
        </Card>
      )}
    </div>
  )
}

function NotificationItem({
  notification: n,
  onRead,
}: {
  notification: AppNotification
  onRead: (id: string) => void
}) {
  const typeColors: Record<string, string> = {
    info: "bg-primary/10 text-primary",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    success: "bg-success/10 text-success",
    error: "bg-destructive/10 text-destructive",
  }

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3 transition-colors",
        !n.read && "bg-primary/5"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-2 shrink-0 rounded-full",
          !n.read ? "bg-primary" : "bg-transparent"
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium">{n.title}</p>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatRelative(n.timestamp)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{n.message}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
              typeColors[n.type]
            )}
          >
            {n.app}
          </span>
          {!n.read && (
            <button
              type="button"
              onClick={() => onRead(n.id)}
              className="text-xs text-primary hover:underline"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Preferences matrix ───────────────────────────────────────────────────────

function Preferences() {
  const [prefs, setPrefs] = React.useState(notificationPreferences)
  const [dirty, setDirty] = React.useState(false)

  function toggle(
    eventType: string,
    channel: "inApp" | "email"
  ) {
    setPrefs((ps) =>
      ps.map((p) =>
        p.eventType === eventType
          ? { ...p, [channel]: !p[channel] }
          : p
      )
    )
    setDirty(true)
  }

  async function handleSave() {
    await new Promise((r) => setTimeout(r, 500))
    setDirty(false)
    toast.success("Preferences saved")
  }

  // Group by app
  const byApp = prefs.reduce<Record<string, typeof prefs>>((acc, p) => {
    acc[p.app] = [...(acc[p.app] ?? []), p]
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      {dirty && (
        <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-2.5">
          <span className="text-sm text-muted-foreground">
            Unsaved changes
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPrefs(notificationPreferences)
                setDirty(false)
              }}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}

      {Object.entries(byApp).map(([app, items]) => (
        <section key={app}>
          <Card className="gap-0 p-0 overflow-x-auto">
            <div className="border-b px-4 py-3">
              <h3 className="text-base font-semibold">{app}</h3>
            </div>
            <table className="w-full min-w-[420px] text-sm">
              <thead className="border-b bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">
                    Event
                  </th>
                  <th className="px-4 py-2.5 text-center font-medium">
                    In-app
                  </th>
                  <th className="px-4 py-2.5 text-center font-medium">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((p) => (
                  <tr key={p.eventType} className="hover:bg-muted/20">
                    <td className="px-4 py-3">{p.eventType}</td>
                    <td className="px-4 py-3 text-center">
                      <Toggle
                        checked={p.inApp}
                        onChange={() => toggle(p.eventType, "inApp")}
                        label={`${p.eventType} in-app notifications`}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Toggle
                        checked={p.email}
                        onChange={() => toggle(p.eventType, "email")}
                        label={`${p.eventType} email notifications`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      ))}
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={() => onChange()}
      aria-label={label}
    />
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Notifications"
        description="Your notification center and preferences for alerts across all apps."
      />

      <Tabs defaultValue="center" className="gap-4">
        <TabsList>
          <TabsTrigger value="center">
            Notification center
            {unread > 0 && (
              <span className="ml-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {unread}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="center">
          <NotificationCenter />
        </TabsContent>
        <TabsContent value="preferences">
          <Preferences />
        </TabsContent>
      </Tabs>
    </div>
  )
}
