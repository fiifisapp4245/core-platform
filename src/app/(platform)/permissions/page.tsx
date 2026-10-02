import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"

import { allPermissions, roles } from "@/lib/mock"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function PermissionsPage() {
  // Build a map: permission → roles that have it
  const permissionRoles: Record<string, string[]> = {}
  for (const role of roles) {
    for (const [app, perms] of Object.entries(role.permissions)) {
      for (const [perm, enabled] of Object.entries(perms)) {
        const key = `${app}::${perm}`
        if (enabled) {
          permissionRoles[key] = [...(permissionRoles[key] ?? []), role.name]
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Permissions"
        description="A read-only catalog of every permission. Edit permissions in Roles."
        action={
          <Link
            href="/roles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Go to Roles <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="flex flex-col gap-6">
        {Object.entries(allPermissions).map(([app, perms]) => (
          <section key={app}>
            <div className="mb-3 flex items-center gap-2">
              <Shield className="size-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">{app}</h2>
            </div>
            <Card className="gap-0 p-0">
              {perms.map((perm, i) => {
                const key = `${app}::${perm}`
                const holdingRoles = permissionRoles[key] ?? []
                return (
                  <div
                    key={perm}
                    className={`flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${i > 0 ? "border-t" : ""}`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{perm}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {holdingRoles.length > 0 ? (
                        holdingRoles.map((r) => (
                          <Badge key={r} variant="secondary" className="text-xs">
                            {r}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No roles assigned
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </Card>
          </section>
        ))}
      </div>
    </div>
  )
}
