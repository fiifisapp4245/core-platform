"use client"

import * as React from "react"
import { MapPin, MoreHorizontal, Plus, Search, Users } from "lucide-react"
import { toast } from "sonner"

import {
  locations as initialLocations,
  type Location,
  type LocationType,
} from "@/lib/mock"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { EmptyState } from "@/components/empty-state"
import { Field } from "@/components/form-section"
import { PageHeader } from "@/components/page-header"
import { PlanLimitMeter } from "@/components/plan-limit-meter"
import { StatusBadge } from "@/components/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SelectNative } from "@/components/ui/select-native"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const locationLimit = 10
const locationTypes: LocationType[] = ["Branch", "Warehouse", "Office", "Restaurant"]

type StatusTab = "all" | "active" | "inactive"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LocationsPage() {
  const [items, setItems] = React.useState<Location[]>(initialLocations)
  const [tab, setTab] = React.useState<StatusTab>("all")
  const [query, setQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<"All" | LocationType>("All")

  // Dialog state
  const [editing, setEditing] = React.useState<Location | null>(null)
  const [formOpen, setFormOpen] = React.useState(false)
  const [deactivating, setDeactivating] = React.useState<Location | null>(null)
  const [deleting, setDeleting] = React.useState<Location | null>(null)

  const atLimit = items.length >= locationLimit
  const counts = {
    all: items.length,
    active: items.filter((l) => l.status === "Active").length,
    inactive: items.filter((l) => l.status === "Inactive").length,
  }

  const q = query.trim().toLowerCase()
  const displayed = items.filter((l) => {
    if (tab === "active" && l.status !== "Active") return false
    if (tab === "inactive" && l.status !== "Inactive") return false
    if (typeFilter !== "All" && l.type !== typeFilter) return false
    if (!q) return true
    return [l.name, l.address, l.city, l.region, l.contactPerson]
      .join(" ")
      .toLowerCase()
      .includes(q)
  })
  const isFiltered = q !== "" || typeFilter !== "All" || tab !== "all"

  function openCreate() {
    if (atLimit) {
      toast.error(`Your plan allows ${locationLimit} locations. Upgrade to add more.`)
      return
    }
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(loc: Location) {
    setEditing(loc)
    setFormOpen(true)
  }

  function handleSave(values: LocationFormValues) {
    setItems((prev) => {
      let next = editing
        ? prev.map((l) => (l.id === editing.id ? { ...l, ...values } : l))
        : [
            ...prev,
            {
              ...values,
              id: `loc_${Date.now()}`,
              status: "Active" as const,
              timezone: "Africa/Accra",
              userCount: 0,
              legalEntity: prev[0]?.legalEntity ?? "",
            },
          ]
      // Only one default location at a time
      if (values.isDefault) {
        const targetId = editing?.id ?? next[next.length - 1].id
        next = next.map((l) => ({ ...l, isDefault: l.id === targetId }))
      }
      return next
    })
    setFormOpen(false)
    toast.success(editing ? `${values.name} updated` : `${values.name} added`)
  }

  function setDefault(loc: Location) {
    setItems((prev) => prev.map((l) => ({ ...l, isDefault: l.id === loc.id })))
    toast.success(`${loc.name} is now the default location`)
  }

  function setStatus(loc: Location, status: Location["status"]) {
    setItems((prev) => prev.map((l) => (l.id === loc.id ? { ...l, status } : l)))
    toast.success(`${loc.name} ${status === "Active" ? "activated" : "deactivated"}`)
  }

  function remove(loc: Location) {
    setItems((prev) => prev.filter((l) => l.id !== loc.id))
    toast.success(`${loc.name} deleted`)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Locations"
        description="Manage branches, warehouses, and offices. Each app uses locations to organize data."
        action={
          <Button onClick={openCreate} disabled={atLimit}>
            <Plus data-icon="inline-start" /> Add location
          </Button>
        }
      />

      {/* Limit meter */}
      <Card className="px-4 py-3">
        <PlanLimitMeter label="Locations" used={items.length} total={locationLimit} />
      </Card>

      {/* Toolbar: status tabs + search + type filter */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Tabs value={tab} onValueChange={(v) => setTab(v as StatusTab)}>
          <TabsList>
            <TabsTrigger value="all">
              All <Badge variant="secondary">{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active <Badge variant="secondary">{counts.active}</Badge>
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive <Badge variant="secondary">{counts.inactive}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search locations…"
              aria-label="Search locations"
              className="bg-card pl-8"
            />
          </div>
          <SelectNative
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "All" | LocationType)}
            aria-label="Filter by type"
            className="bg-card"
            containerClassName="sm:w-40"
          >
            <option value="All">All types</option>
            {locationTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </SelectNative>
        </div>
      </div>

      {/* List */}
      {displayed.length === 0 ? (
        isFiltered ? (
          <EmptyState
            icon={Search}
            title="No matching locations"
            description="Try a different search, type, or status."
            action={{
              label: "Clear filters",
              onClick: () => {
                setQuery("")
                setTypeFilter("All")
                setTab("all")
              },
            }}
            className="bg-card"
          />
        ) : (
          <EmptyState
            icon={MapPin}
            title="No locations yet"
            description="Add your first branch, warehouse, or office to get started."
            action={{ label: "Add location", onClick: openCreate }}
            className="bg-card"
          />
        )
      ) : (
        <Card className="gap-0 overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Name</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">Address</th>
                <th className="px-4 py-2.5 font-medium">Contact</th>
                <th className="px-4 py-2.5 font-medium">Users</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="w-12 px-4 py-2.5">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {displayed.map((loc) => (
                <tr key={loc.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => openEdit(loc)}
                      className="flex items-center gap-3 text-left"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="size-4 text-primary" />
                      </span>
                      <span className="flex items-center gap-2 font-medium hover:underline">
                        {loc.name}
                        {loc.isDefault && <Badge variant="outline">Default</Badge>}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{loc.type}</td>
                  <td className="px-4 py-3">
                    <div>{loc.address}</div>
                    <div className="text-xs text-muted-foreground">
                      {loc.city}, {loc.region}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{loc.contactPerson}</div>
                    <div className="text-xs text-muted-foreground">{loc.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-muted-foreground tabular-nums">
                      <Users className="size-3.5" />
                      {loc.userCount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={loc.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <LocationRowActions
                      location={loc}
                      onEdit={() => openEdit(loc)}
                      onSetDefault={() => setDefault(loc)}
                      onActivate={() => setStatus(loc, "Active")}
                      onDeactivate={() => setDeactivating(loc)}
                      onDelete={() => setDeleting(loc)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <LocationFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        location={editing}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deactivating !== null}
        onOpenChange={(o) => !o && setDeactivating(null)}
        title={`Deactivate ${deactivating?.name ?? "location"}?`}
        description={`Apps will stop using this location for new records. ${
          deactivating?.userCount
            ? `${deactivating.userCount} assigned user${deactivating.userCount === 1 ? "" : "s"} will keep access to existing data.`
            : ""
        } You can reactivate it at any time.`}
        confirmLabel="Deactivate"
        onConfirm={() => {
          if (deactivating) setStatus(deactivating, "Inactive")
          setDeactivating(null)
        }}
      />

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(o) => !o && setDeleting(null)}
        title={`Delete ${deleting?.name ?? "location"}?`}
        description="This permanently removes the location and unassigns its users. This cannot be undone."
        confirmLabel="Delete location"
        confirmText={deleting?.name}
        onConfirm={() => {
          if (deleting) remove(deleting)
          setDeleting(null)
        }}
      />
    </div>
  )
}

// ─── Row actions ──────────────────────────────────────────────────────────────

function LocationRowActions({
  location,
  onEdit,
  onSetDefault,
  onActivate,
  onDeactivate,
  onDelete,
}: {
  location: Location
  onEdit: () => void
  onSetDefault: () => void
  onActivate: () => void
  onDeactivate: () => void
  onDelete: () => void
}) {
  const isActive = location.status === "Active"
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
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onEdit}>Edit location</DropdownMenuItem>
        <DropdownMenuItem
          onClick={onSetDefault}
          disabled={location.isDefault || !isActive}
        >
          Set as default
        </DropdownMenuItem>
        {isActive ? (
          // The default location must stay active
          <DropdownMenuItem onClick={onDeactivate} disabled={location.isDefault}>
            Deactivate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={onActivate}>Activate</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={onDelete}
          disabled={location.isDefault}
        >
          Delete location
        </DropdownMenuItem>
        {location.isDefault && (
          <p className="px-2 py-1.5 text-xs text-muted-foreground">
            Set another default to deactivate or delete this location.
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Add / edit dialog ────────────────────────────────────────────────────────

type LocationFormValues = Pick<
  Location,
  | "name"
  | "type"
  | "address"
  | "city"
  | "region"
  | "contactPerson"
  | "phone"
  | "email"
  | "operatingHours"
  | "isDefault"
>

const emptyForm: LocationFormValues = {
  name: "",
  type: "Branch",
  address: "",
  city: "",
  region: "",
  contactPerson: "",
  phone: "",
  email: "",
  operatingHours: "",
  isDefault: false,
}

function LocationFormDialog({
  open,
  onOpenChange,
  location,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  location: Location | null
  onSave: (values: LocationFormValues) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg">
        {/* Keyed so the form resets each time the dialog opens for a different location */}
        {open && (
          <LocationForm
            key={location?.id ?? "new"}
            location={location}
            onCancel={() => onOpenChange(false)}
            onSave={onSave}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function LocationForm({
  location,
  onCancel,
  onSave,
}: {
  location: Location | null
  onCancel: () => void
  onSave: (values: LocationFormValues) => void
}) {
  const [values, setValues] = React.useState<LocationFormValues>(() =>
    location
      ? {
          name: location.name,
          type: location.type,
          address: location.address,
          city: location.city,
          region: location.region,
          contactPerson: location.contactPerson,
          phone: location.phone,
          email: location.email,
          operatingHours: location.operatingHours,
          isDefault: location.isDefault,
        }
      : emptyForm
  )
  const [submitted, setSubmitted] = React.useState(false)

  function set<K extends keyof LocationFormValues>(key: K, value: LocationFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  const errors = {
    name: !values.name.trim() ? "Enter a location name" : undefined,
    address: !values.address.trim() ? "Enter a street address" : undefined,
    city: !values.city.trim() ? "Enter a city" : undefined,
  }
  const show = (k: keyof typeof errors) => (submitted ? errors[k] : undefined)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.values(errors).some(Boolean)) return
    onSave(values)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <DialogHeader>
        <DialogTitle>{location ? "Edit location" : "Add location"}</DialogTitle>
        <DialogDescription>
          {location
            ? "Update the details your apps use for this location."
            : "Add a branch, warehouse, or office your apps can use."}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Location name" required error={show("name")} className="sm:col-span-2">
          <Input
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Osu Oxford Street"
            aria-invalid={!!show("name")}
            autoFocus
          />
        </Field>
        <Field label="Type">
          <SelectNative
            value={values.type}
            onChange={(e) => set("type", e.target.value as LocationType)}
          >
            {locationTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </SelectNative>
        </Field>
        <Field label="Operating hours">
          <Input
            value={values.operatingHours}
            onChange={(e) => set("operatingHours", e.target.value)}
            placeholder="Mon–Sat 8:00–20:00"
          />
        </Field>
        <Field label="Street address" required error={show("address")} className="sm:col-span-2">
          <Input
            value={values.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="34 Oxford Street"
            aria-invalid={!!show("address")}
          />
        </Field>
        <Field label="City" required error={show("city")}>
          <Input
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Accra"
            aria-invalid={!!show("city")}
          />
        </Field>
        <Field label="Region">
          <Input
            value={values.region}
            onChange={(e) => set("region", e.target.value)}
            placeholder="Greater Accra"
          />
        </Field>
        <Field label="Contact person">
          <Input
            value={values.contactPerson}
            onChange={(e) => set("contactPerson", e.target.value)}
            placeholder="Full name"
          />
        </Field>
        <Field label="Phone">
          <Input
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+233 30 000 0000"
          />
        </Field>
        <Field label="Email" className="sm:col-span-2">
          <Input
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="branch@company.com"
          />
        </Field>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
        <Switch
          checked={values.isDefault}
          onCheckedChange={(c) => set("isDefault", c)}
          disabled={location?.isDefault}
          className="mt-0.5"
        />
        <span className="text-sm">
          <span className="block font-medium">Set as default location</span>
          <span className="text-muted-foreground">
            New records in your apps use this location unless another is chosen.
          </span>
        </span>
      </label>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{location ? "Save changes" : "Add location"}</Button>
      </DialogFooter>
    </form>
  )
}
