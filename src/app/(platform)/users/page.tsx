"use client"

import * as React from "react"
import { MoreHorizontal, RefreshCw, Search, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { members, invitations } from "@/lib/mock"
import { apps } from "@/lib/apps"
import { formatRelative } from "@/lib/format"
import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { PlanLimitMeter } from "@/components/plan-limit-meter"
import { StatusBadge } from "@/components/status-badge"
import { AppIcon } from "@/components/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Input } from "@/components/ui/input"
import { SelectNative } from "@/components/ui/select-native"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const appById = Object.fromEntries(apps.map((a) => [a.id, a]))
const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()

const totalSeats = 20
const usedSeats = members.filter((m) => m.status !== "Suspended").length

export default function UsersPage() {
  const [query, setQuery] = React.useState("")
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState("cashier")
  const [sending, setSending] = React.useState(false)

  const filtered = members.filter((m) => {
    const q = query.toLowerCase()
    return (
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q)
    )
  })

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!inviteEmail) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 600))
    setSending(false)
    setInviteEmail("")
    toast.success(`Invitation sent to ${inviteEmail}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Users"
        description="Manage who has access to your organization and its apps."
        action={
          <Button>
            <UserPlus data-icon="inline-start" /> Invite user
          </Button>
        }
      />

      {/* Seat meter */}
      <Card className="px-4 py-3">
        <PlanLimitMeter label="Seats" used={usedSeats} total={totalSeats} />
      </Card>

      {/* Quick invite bar */}
      <form
        onSubmit={handleInvite}
        className="flex flex-col gap-2 rounded-xl bg-card p-4 ring-1 ring-foreground/10 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium">
            Invite by email
          </label>
          <Input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@company.com"
            required
          />
        </div>
        <div className="w-44">
          <label className="mb-1.5 block text-sm font-medium">Role</label>
          <SelectNative
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="store-manager">Store Manager</option>
            <option value="cashier">Cashier</option>
            <option value="loan-officer">Loan Officer</option>
          </SelectNative>
        </div>
        <Button type="submit" disabled={sending || !inviteEmail}>
          {sending ? "Sending…" : "Send invite"}
        </Button>
      </form>

      {/* Tabs */}
      <Tabs defaultValue="members" className="gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="members">
              Members{" "}
              <span className="ml-1 text-xs text-muted-foreground">
                {members.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="invitations">
              Invitations{" "}
              <span className="ml-1 text-xs text-muted-foreground">
                {invitations.length}
              </span>
            </TabsTrigger>
          </TabsList>
          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search members…"
              className="bg-card pl-8"
            />
          </div>
        </div>

        {/* Members table */}
        <TabsContent value="members">
          <Card className="gap-0 overflow-x-auto p-0">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Name</th>
                  <th className="px-4 py-2.5 font-medium">Role</th>
                  <th className="px-4 py-2.5 font-medium">App access</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Last sign-in</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No members match your search.
                    </td>
                  </tr>
                )}
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 shrink-0">
                          <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                            {initials(m.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="truncate font-medium">{m.name}</div>
                          <div className="truncate text-xs text-muted-foreground">
                            {m.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {m.role}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {m.apps.map((id) =>
                          appById[id] ? (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs"
                            >
                              <AppIcon
                                app={appById[id]}
                                size="sm"
                                className="size-4 rounded [&_svg]:size-2.5"
                              />
                              {appById[id].name}
                            </span>
                          ) : null
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {m.lastSignIn
                        ? formatRelative(m.lastSignIn)
                        : "Never"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <RowActions member={m} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        {/* Invitations table */}
        <TabsContent value="invitations">
          {invitations.length === 0 ? (
            <EmptyState
              icon={UserPlus}
              title="No pending invitations"
              description="Invite a teammate using the form above."
            />
          ) : (
            <Card className="gap-0 overflow-x-auto p-0">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Email</th>
                    <th className="px-4 py-2.5 font-medium">Role</th>
                    <th className="px-4 py-2.5 font-medium">Sent</th>
                    <th className="px-4 py-2.5 font-medium">Expires</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invitations.map((inv) => (
                    <tr key={inv.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{inv.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {inv.role}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {formatRelative(inv.sentAt)}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(inv.expiresAt).toLocaleDateString("en-GH")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              toast.success(`Invitation resent to ${inv.email}`)
                            }
                          >
                            <RefreshCw data-icon="inline-start" /> Resend
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              toast.success(`Invitation revoked`)
                            }
                          >
                            Revoke
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RowActions({ member }: { member: (typeof members)[0] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Actions for ${member.name}`}
          />
        }
      >
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem>Edit user</DropdownMenuItem>
        <DropdownMenuItem>Change role</DropdownMenuItem>
        <DropdownMenuSeparator />
        {member.status === "Suspended" ? (
          <DropdownMenuItem
            onClick={() => toast.success(`${member.name} reactivated`)}
          >
            Reactivate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => toast.success(`${member.name} suspended`)}
          >
            Suspend
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => toast.error(`${member.name} removed`)}
        >
          Remove from org
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
