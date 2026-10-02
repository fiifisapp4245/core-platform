import { CreditCard, Download } from "lucide-react"

import { AppIcon } from "@/components/brand"
import { invoices, organization, subscribedApps } from "@/lib/apps"
import { StatusBadge } from "@/components/app-cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const pricing: Record<string, string> = {
  mystoreguard: "GH₵ 1,450 / mo",
  loandrift: "Free during trial",
}

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Billing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          One invoice for every TroveSuite app your organization uses.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{organization.plan}</CardTitle>
            <CardDescription>Billed monthly · next payment Oct 15, 2026</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">Change plan</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {subscribedApps.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                <AppIcon app={a} />
                <div className="min-w-40 flex-1">
                  <div className="flex items-center gap-2 font-medium">
                    {a.name} <StatusBadge status={a.status} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {a.plan} · {a.status === "trial" ? "trial ends" : "renews"} {a.renewsOn}
                  </div>
                </div>
                <div className="w-36">
                  <div className="mb-1 text-xs text-muted-foreground">
                    {a.seats?.used} of {a.seats?.total} seats
                  </div>
                  <Progress value={((a.seats?.used ?? 0) / (a.seats?.total ?? 1)) * 100} />
                </div>
                <div className="w-32 text-right text-sm font-medium tabular-nums">{pricing[a.id]}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment method</CardTitle>
            <CardDescription>Charged automatically on the 15th</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <CreditCard className="size-4" />
              </span>
              <div className="flex-1 text-sm">
                <div className="font-medium">Visa ending 4242</div>
                <div className="text-xs text-muted-foreground">Expires 08/28</div>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
            <Button variant="outline" size="sm">Add Mobile Money</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="gap-0 overflow-x-auto p-0">
        <div className="border-b px-4 py-3 text-sm font-medium">Invoices</div>
        <table className="w-full min-w-[520px] text-sm">
          <tbody className="divide-y">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{inv.id}</td>
                <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                <td className="px-4 py-3 tabular-nums">{inv.amount}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="bg-success/10 text-success">{inv.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon-sm" aria-label={`Download ${inv.id}`}>
                    <Download />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
