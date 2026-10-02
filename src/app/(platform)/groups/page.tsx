"use client"

import * as React from "react"
import { MapPin, MoreHorizontal, Plus, Users } from "lucide-react"
import { toast } from "sonner"

import { groups } from "@/lib/mock"
import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function GroupsPage() {
  const [showCreate, setShowCreate] = React.useState(false)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Groups"
        description="Organize users into groups for easier role and location assignment."
        action={
          <Button onClick={() => setShowCreate(true)}>
            <Plus data-icon="inline-start" /> Create group
          </Button>
        }
      />

      {groups.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No groups yet"
          description="Groups let you assign roles and locations to multiple users at once."
          action={{ label: "Create group", onClick: () => setShowCreate(true) }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((g) => (
            <Card key={g.id} className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="truncate font-semibold">{g.name}</h3>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {g.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="-mt-1 -mr-1 shrink-0"
                        aria-label={`Actions for ${g.name}`}
                      />
                    }
                  >
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>Edit group</DropdownMenuItem>
                    <DropdownMenuItem>Manage members</DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => toast.success(`${g.name} deleted`)}
                    >
                      Delete group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {g.roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 border-t pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  {g.memberCount} member{g.memberCount !== 1 && "s"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {g.locationIds.length} location{g.locationIds.length !== 1 && "s"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowCreate(false)}
        >
          <Card
            className="w-full max-w-md gap-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">Create group</h2>
            <p className="text-sm text-muted-foreground">
              Groups are available — this panel would open a full create form.
            </p>
            <Button onClick={() => setShowCreate(false)}>Close</Button>
          </Card>
        </div>
      )}
    </div>
  )
}
