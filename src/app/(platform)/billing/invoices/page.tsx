"use client"

import * as React from "react"
import { Download, FileText, Search } from "lucide-react"

import { invoices, paymentMethods } from "@/lib/mock"
import { formatCurrency, formatDate } from "@/lib/format"
import { EmptyState } from "@/components/empty-state"
import { StatusBadge } from "@/components/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const pmById = Object.fromEntries(paymentMethods.map((p) => [p.id, p]))

const allStatuses = ["Upcoming", "Paid", "Failed", "Refunded"] as const
type InvStatus = (typeof allStatuses)[number]

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = React.useState<InvStatus | "All">("All")
  const [query, setQuery] = React.useState("")

  const filtered = invoices.filter((inv) => {
    if (statusFilter !== "All" && inv.status !== statusFilter) return false
    if (query && !inv.id.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1">
          {(["All", ...allStatuses] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative sm:w-56">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search invoices…"
            className="bg-card pl-8"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices found"
          description="Adjust your filters to see results."
        />
      ) : (
        <Card className="gap-0 overflow-x-auto p-0">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Invoice</th>
                <th className="px-4 py-2.5 font-medium">Date</th>
                <th className="px-4 py-2.5 font-medium">Amount</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Payment method</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((inv) => {
                const pm = pmById[inv.paymentMethodId]
                return (
                  <tr key={inv.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium tabular-nums">
                      {inv.id}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(inv.date)}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {formatCurrency(inv.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {pm?.type === "card"
                        ? `${pm.brand} ···${pm.last4}`
                        : pm?.type === "momo"
                          ? `${pm.provider} ···${pm.phone?.slice(-4)}`
                          : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {inv.downloadUrl && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Download ${inv.id}`}
                        >
                          <Download />
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
