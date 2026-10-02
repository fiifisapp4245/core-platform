import { UserPlus } from "lucide-react"

import { AppIcon } from "@/components/brand"
import { apps, members } from "@/lib/apps"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const appById = Object.fromEntries(apps.map((a) => [a.id, a]))
const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2)

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Users & roles</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            One account per person. Choose which apps each teammate can open.
          </p>
        </div>
        <Button>
          <UserPlus data-icon="inline-start" /> Invite teammate
        </Button>
      </div>

      <Card className="gap-0 overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">Name</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium">App access</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((m) => (
              <tr key={m.email} className="hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                        {initials(m.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.role}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {m.apps.map((id) => (
                      <span key={id} className="inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-xs">
                        <AppIcon app={appById[id]} size="sm" className="size-4 rounded [&_svg]:size-2.5" />
                        {appById[id].name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="secondary"
                    className={m.status === "Active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}
                  >
                    {m.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
