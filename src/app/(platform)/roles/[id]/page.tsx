"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Check, ChevronDown, ChevronRight, Lock } from "lucide-react"
import { toast } from "sonner"

import { roles, allPermissions } from "@/lib/mock"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { use } from "react"

export default function RoleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const role = roles.find((r) => r.id === id)

  if (!role) {
    return (
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-1 w-fit"
          nativeButton={false}
          render={<Link href="/roles" />}
        >
          <ArrowLeft data-icon="inline-start" /> Back to roles
        </Button>
        <p className="text-sm text-muted-foreground">Role not found.</p>
      </div>
    )
  }

  return <RoleDetail role={role} />
}

type Role = (typeof roles)[0]

function RoleDetail({ role }: { role: Role }) {
  const [permissions, setPermissions] = React.useState(role.permissions)
  const [dirty, setDirty] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  function toggle(app: string, perm: string) {
    if (role.isReadOnly) return
    setPermissions((prev) => ({
      ...prev,
      [app]: { ...prev[app], [perm]: !prev[app]?.[perm] },
    }))
    setDirty(true)
  }

  async function handleSave() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setSaving(false)
    setDirty(false)
    toast.success(`${role.name} updated — affects ${role.userCount} user${role.userCount !== 1 ? "s" : ""}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-1 w-fit"
        nativeButton={false}
        render={<Link href="/roles" />}
      >
        <ArrowLeft data-icon="inline-start" /> Back to roles
      </Button>

      <PageHeader
        title={role.name}
        description={role.description}
        action={
          !role.isReadOnly && dirty ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPermissions(role.permissions)
                  setDirty(false)
                }}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : <><Check data-icon="inline-start" /> Save changes</>}
              </Button>
            </div>
          ) : undefined
        }
      />

      {role.isReadOnly && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
          <Lock className="size-4 shrink-0" />
          System roles are read-only. Duplicate this role to create a custom version.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {Object.entries(allPermissions).map(([app, perms]) => (
          <AppPermissionGroup
            key={app}
            app={app}
            perms={perms}
            values={permissions[app] ?? {}}
            readOnly={role.isReadOnly}
            onToggle={(perm) => toggle(app, perm)}
          />
        ))}
      </div>
    </div>
  )
}

function AppPermissionGroup({
  app,
  perms,
  values,
  readOnly,
  onToggle,
}: {
  app: string
  perms: string[]
  values: Record<string, boolean>
  readOnly: boolean
  onToggle: (perm: string) => void
}) {
  const [open, setOpen] = React.useState(true)
  const enabled = perms.filter((p) => values[p]).length

  return (
    <Card className="gap-0 p-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold">{app}</span>
          <span className="text-xs text-muted-foreground">
            {enabled} / {perms.length} enabled
          </span>
        </div>
        {open ? (
          <ChevronDown className="size-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="border-t">
          {perms.map((perm, i) => (
            <div
              key={perm}
              className={`flex items-center justify-between gap-3 px-4 py-3 ${i > 0 ? "border-t" : ""}`}
            >
              <div>
                <p className="text-sm font-medium">{perm}</p>
              </div>
              <Switch
                checked={values[perm] ?? false}
                onCheckedChange={() => onToggle(perm)}
                disabled={readOnly}
                aria-label={perm}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
