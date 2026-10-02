import Link from "next/link"

import { apps, subscribedApps } from "@/lib/apps"
import { orgData } from "@/lib/mock"
import { formatCurrency } from "@/lib/format"
import { AppIcon } from "@/components/brand"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const pricing: Record<string, number> = {
  mystoreguard: 1450,
  loandrift: 0,
}

const totalMo = subscribedApps.reduce((n, a) => n + (pricing[a.id] ?? 0), 0)

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Plan overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{orgData.plan}</CardTitle>
            <CardDescription>
              Billed monthly · next payment Oct 15, 2026
            </CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">
                Change plan
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {subscribedApps.map((a) => (
              <div
                key={a.id}
                className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <AppIcon app={a} />
                <div className="min-w-40 flex-1">
                  <div className="flex items-center gap-2 font-medium">
                    {a.name}{" "}
                    <StatusBadge status={a.status === "trial" ? "Trial" : "Active"} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {a.plan} ·{" "}
                    {a.status === "trial" ? "trial ends" : "renews"}{" "}
                    {a.renewsOn}
                  </div>
                </div>
                <div className="w-36">
                  <div className="mb-1 text-xs text-muted-foreground">
                    {a.seats?.used} of {a.seats?.total} seats
                  </div>
                  <Progress
                    value={((a.seats?.used ?? 0) / (a.seats?.total ?? 1)) * 100}
                  />
                </div>
                <div className="flex w-36 flex-col items-end gap-1">
                  <span className="text-sm font-medium tabular-nums">
                    {pricing[a.id]
                      ? formatCurrency(pricing[a.id])
                      : "Free during trial"}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                    {a.status === "trial" && (
                      <Button size="sm">Upgrade</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Organization</span>
                <span className="font-medium">{orgData.legalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ID</span>
                <span className="font-medium">{orgData.taxId}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-muted-foreground">Monthly total</span>
                <span className="text-base font-semibold tabular-nums">
                  {formatCurrency(totalMo)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Available apps */}
          <Card>
            <CardHeader>
              <CardTitle>Available apps</CardTitle>
              <CardDescription>Add more modules as you grow</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {apps
                .filter((a) => a.status === "available")
                .slice(0, 3)
                .map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-2"
                  >
                    <AppIcon app={a} size="sm" />
                    <span className="flex-1 text-sm">{a.name}</span>
                    <Button variant="outline" size="sm">
                      Add
                    </Button>
                  </div>
                ))}
              <Button
                variant="ghost"
                size="sm"
                className="mt-1"
                nativeButton={false}
                render={<Link href={"/apps" as never} />}
              >
                Browse all apps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
