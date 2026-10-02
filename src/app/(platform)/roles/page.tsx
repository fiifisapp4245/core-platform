"use client"

import * as React from "react"
import Link from "next/link"
import { Copy, KeyRound, Lock, MoreHorizontal, Plus } from "lucide-react"
import { toast } from "sonner"

import { roles } from "@/lib/mock"
import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
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

export default function RolesPage() {
  const systemRoles = roles.filter((r) => r.type === "System")
  const customRoles = roles.filter((r) => r.type === "Custom")

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Roles"
        description="Control what each user can see and do across your apps."
        action={
          <Button>
            <Plus data-icon="inline-start" /> Create role
          </Button>
        }
      />

      <Tabs defaultValue="system" className="gap-4">
        <TabsList>
          <TabsTrigger value="system">
            System{" "}
            <span className="ml-1 text-xs text-muted-foreground">
              {systemRoles.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="custom">
            Custom{" "}
            <span className="ml-1 text-xs text-muted-foreground">
              {customRoles.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system">
          <Card className="gap-0 p-0">
            {systemRoles.map((role, i) => (
              <div
                key={role.id}
                className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 ${i > 0 ? "border-t" : ""}`}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Lock className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{role.name}</span>
                    <Badge variant="outline">System</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{role.userCount} user{role.userCount !== 1 && "s"}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={`/roles/${role.id}` as never} />}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          {customRoles.length === 0 ? (
            <EmptyState
              icon={KeyRound}
              title="No custom roles"
              description="Create a role to define exactly what your team can see and do."
              action={{ label: "Create role" }}
            />
          ) : (
            <Card className="gap-0 p-0">
              {customRoles.map((role, i) => (
                <div
                  key={role.id}
                  className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 ${i > 0 ? "border-t" : ""}`}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <KeyRound className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{role.name}</span>
                      <Badge variant="secondary">Custom</Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {role.userCount} user{role.userCount !== 1 && "s"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<Link href={`/roles/${role.id}` as never} />}
                    >
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`More actions for ${role.name}`}
                          />
                        }
                      >
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() =>
                            toast.success(`${role.name} duplicated`)
                          }
                        >
                          <Copy data-icon="inline-start" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
