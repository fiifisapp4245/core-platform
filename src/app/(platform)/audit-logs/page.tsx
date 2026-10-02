"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Download, RefreshCw, Search } from "lucide-react"

import { auditLogs } from "@/lib/mock"
import { formatDateTime } from "@/lib/format"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const allApps = [...new Set(auditLogs.map((l) => l.app))]
const allActions = [...new Set(auditLogs.map((l) => l.action))]

export default function AuditLogsPage() {
  const [query, setQuery] = React.useState("")
  const [appFilter, setAppFilter] = React.useState("All")
  const [expandedId, setExpandedId] = React.useState<string | null>(null)
  const [lastUpdated] = React.useState(new Date().toISOString())

  const filtered = auditLogs.filter((l) => {
    if (appFilter !== "All" && l.app !== appFilter) return false
    if (
      query &&
      ![l.user, l.action, l.resource, l.app].some((v) =>
        v.toLowerCase().includes(query.toLowerCase())
      )
    )
      return false
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Audit logs"
        description="A record of every action taken in your organization. Logs are retained for 90 days."
        action={
          <Button variant="outline" size="sm">
            <Download data-icon="inline-start" /> Export CSV
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search logs…"
              className="bg-card pl-8 w-56"
            />
          </div>
          <select
            value={appFilter}
            onChange={(e) => setAppFilter(e.target.value)}
            className="flex h-9 rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="All">All apps</option>
            {allApps.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="size-3.5" />
          Last updated {formatDateTime(lastUpdated)}
        </div>
      </div>

      <Card className="gap-0 overflow-x-auto p-0">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th className="w-8 px-2 py-2.5" />
              <th className="px-4 py-2.5 font-medium">Time</th>
              <th className="px-4 py-2.5 font-medium">User</th>
              <th className="px-4 py-2.5 font-medium">Action</th>
              <th className="px-4 py-2.5 font-medium">Resource</th>
              <th className="px-4 py-2.5 font-medium">App</th>
              <th className="px-4 py-2.5 font-medium">IP / Device</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                  No log entries match your search.
                </td>
              </tr>
            )}
            {filtered.map((log) => (
              <React.Fragment key={log.id}>
                <tr
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() =>
                    setExpandedId((id) => (id === log.id ? null : log.id))
                  }
                >
                  <td className="px-2 py-3 text-center text-muted-foreground">
                    {expandedId === log.id ? (
                      <ChevronDown className="size-4 mx-auto" />
                    ) : (
                      <ChevronRight className="size-4 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="px-4 py-3 font-medium">{log.user}</td>
                  <td className="px-4 py-3">{log.action}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {log.resource}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-xs">
                      {log.app}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div>{log.ip}</div>
                    <div className="text-muted-foreground/70">{log.device}</div>
                  </td>
                </tr>
                {expandedId === log.id && (log.before || log.after) && (
                  <tr className="bg-muted/20">
                    <td colSpan={7} className="px-8 py-3">
                      <div className="grid gap-4 text-xs sm:grid-cols-2">
                        {log.before && (
                          <div>
                            <p className="mb-1.5 font-medium text-muted-foreground uppercase tracking-wide text-[10px]">Before</p>
                            <pre className="rounded-md bg-muted p-2 text-xs overflow-auto">
                              {JSON.stringify(log.before, null, 2)}
                            </pre>
                          </div>
                        )}
                        {log.after && (
                          <div>
                            <p className="mb-1.5 font-medium text-muted-foreground uppercase tracking-wide text-[10px]">After</p>
                            <pre className="rounded-md bg-muted p-2 text-xs overflow-auto">
                              {JSON.stringify(log.after, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
