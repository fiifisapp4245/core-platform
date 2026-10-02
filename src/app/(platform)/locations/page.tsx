"use client"

import * as React from "react"
import { MapPin, MoreHorizontal, Plus, Users } from "lucide-react"
import { toast } from "sonner"

import { locations } from "@/lib/mock"
import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { PlanLimitMeter } from "@/components/plan-limit-meter"
import { StatusBadge } from "@/components/status-badge"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const locationLimit = 10

export default function LocationsPage() {
  const [activeTab, setActiveTab] = React.useState("all")

  const activeLocations = locations.filter((l) => l.status === "Active")
  const inactiveLocations = locations.filter((l) => l.status === "Inactive")
  const displayed =
    activeTab === "all"
      ? locations
      : activeTab === "active"
        ? activeLocations
        : inactiveLocations

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Locations"
        description="Manage branches, warehouses, and offices. Each app uses locations to organize data."
        action={
          <Button>
            <Plus data-icon="inline-start" /> Add location
          </Button>
        }
      />

      {/* Limit meter */}
      <Card className="px-4 py-3">
        <PlanLimitMeter
          label="Locations"
          used={locations.length}
          total={locationLimit}
        />
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-4">
        <TabsList>
          <TabsTrigger value="all">
            All{" "}
            <span className="ml-1 text-xs text-muted-foreground">
              {locations.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active{" "}
            <span className="ml-1 text-xs text-muted-foreground">
              {activeLocations.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive{" "}
            <span className="ml-1 text-xs text-muted-foreground">
              {inactiveLocations.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {displayed.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="No locations"
              description="Add your first location to get started."
              action={{ label: "Add location" }}
            />
          ) : (
            <Card className="gap-0 overflow-x-auto p-0">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">Type</th>
                    <th className="px-4 py-2.5 font-medium">Address</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                    <th className="px-4 py-2.5 font-medium">Users</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {displayed.map((loc) => (
                    <tr key={loc.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <MapPin className="size-4 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 font-medium">
                              {loc.name}
                              {loc.isDefault && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px]"
                                >
                                  Default
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {loc.contactPerson}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {loc.type}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {loc.address}, {loc.city}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={loc.status} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="size-3.5" />
                          {loc.userCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <LocationRowActions location={loc} />
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

function LocationRowActions({ location }: { location: (typeof locations)[0] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Actions for ${location.name}`}
          />
        }
      >
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem>Edit location</DropdownMenuItem>
        {!location.isDefault && (
          <DropdownMenuItem
            onClick={() =>
              toast.success(`${location.name} is now the default location`)
            }
          >
            Set as default
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          {location.status === "Active" ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            if (location.isDefault) {
              toast.error("Cannot delete the default location. Set another location as default first.")
            } else {
              toast.error(`${location.name} deleted`)
            }
          }}
        >
          Delete location
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
