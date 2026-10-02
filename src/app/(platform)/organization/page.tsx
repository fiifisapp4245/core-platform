"use client"

import * as React from "react"
import { Check, Upload } from "lucide-react"
import { toast } from "sonner"

import { orgData } from "@/lib/mock"
import { DangerZone } from "@/components/danger-zone"
import { Field, FormSection } from "@/components/form-section"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectNative } from "@/components/ui/select-native"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ─── Section nav (visible ≥ lg) ──────────────────────────────────────────────

const sections = [
  { id: "company", label: "Company details" },
  { id: "address", label: "Address & legal" },
  { id: "branding", label: "Branding" },
  { id: "danger", label: "Danger zone" },
]

function SectionNav() {
  const [active, setActive] = React.useState(sections[0].id)

  // Highlight the section currently in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -60% 0px" }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="hidden lg:sticky lg:top-20 lg:block lg:w-56 lg:shrink-0 lg:self-start"
    >
      <ul className="flex flex-col gap-0.5 rounded-xl bg-card p-2 ring-1 ring-foreground/10">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={() => setActive(s.id)}
              aria-current={active === s.id ? "location" : undefined}
              className={cn(
                "relative block rounded-lg px-3 py-2 text-sm transition-colors",
                active === s.id
                  ? "bg-primary/10 font-medium text-primary before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:bg-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ─── Sticky save bar ─────────────────────────────────────────────────────────

function SaveBar({
  dirty,
  saving,
  onSave,
  onCancel,
}: {
  dirty: boolean
  saving: boolean
  onSave: () => void
  onCancel: () => void
}) {
  if (!dirty) return null
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 flex items-center justify-between border-t bg-background/95 px-6 py-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:left-[var(--sidebar-width,0px)]">
      <p className="text-sm text-muted-foreground">You have unsaved changes.</p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button size="sm" onClick={onSave} disabled={saving}>
          {saving ? (
            "Saving…"
          ) : (
            <>
              <Check data-icon="inline-start" /> Save changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const industryOptions = [
  "Retail & Financial Services",
  "Retail",
  "Financial Services",
  "Food & Beverage",
  "Healthcare",
  "Manufacturing",
  "Technology",
  "Education",
  "Other",
]

const employeeOptions = ["1–10", "11–50", "51–200", "201–1000", "1000+"]

export default function OrganizationPage() {
  const [form, setForm] = React.useState({
    name: orgData.name,
    legalName: orgData.legalName,
    description: orgData.description,
    industry: orgData.industry,
    employeeCount: orgData.employeeCount,
    phone: orgData.phone,
    email: orgData.email,
    website: orgData.website,
    taxId: orgData.taxId,
    street: orgData.address.street,
    city: orgData.address.city,
    region: orgData.address.region,
    country: orgData.address.country,
    postalCode: orgData.address.postalCode,
  })

  const [dirty, setDirty] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setDirty(true)
  }

  function handleCancel() {
    setForm({
      name: orgData.name,
      legalName: orgData.legalName,
      description: orgData.description,
      industry: orgData.industry,
      employeeCount: orgData.employeeCount,
      phone: orgData.phone,
      email: orgData.email,
      website: orgData.website,
      taxId: orgData.taxId,
      street: orgData.address.street,
      city: orgData.address.city,
      region: orgData.address.region,
      country: orgData.address.country,
      postalCode: orgData.address.postalCode,
    })
    setDirty(false)
  }

  async function handleSave() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setDirty(false)
    toast.success("Organization saved")
  }

  return (
    <>
      {/* Bug fix: no fixed height here — natural document flow with bottom padding from layout */}
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Organization"
          description="Manage your organization profile, legal details and branding."
        />

        <div className="flex items-start gap-8">
          <SectionNav />

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* ─── Company details ───────────────────────────────────── */}
            <FormSection
              id="company"
              title="Company details"
              description="Basic information shown to your team and on invoices."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Organization name" required>
                  <Input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Mensah Retail Group"
                  />
                </Field>
                <Field label="Industry">
                  <SelectNative
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                  >
                    {industryOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </SelectNative>
                </Field>
              </div>

              <Field
                label="Description"
                hint={`${form.description.length}/500 characters`}
              >
                <Textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="A short description of your business…"
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Number of employees">
                  <SelectNative
                    value={form.employeeCount}
                    onChange={(e) => update("employeeCount", e.target.value)}
                  >
                    {employeeOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </SelectNative>
                </Field>
                <Field label="Phone">
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+233 30 000 0000"
                  />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="admin@company.com"
                  />
                </Field>
                <Field label="Website">
                  <Input
                    type="url"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    placeholder="https://company.com"
                  />
                </Field>
              </div>
            </FormSection>


            {/* ─── Address & legal ───────────────────────────────────── */}
            <FormSection
              id="address"
              title="Address & legal entity"
              description="Used on tax documents and invoices. Stored securely."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Legal name" className="sm:col-span-2">
                  <Input
                    value={form.legalName}
                    onChange={(e) => update("legalName", e.target.value)}
                    placeholder="Registered legal name"
                  />
                </Field>
                <Field label="Tax ID (TIN)">
                  <Input
                    value={form.taxId}
                    onChange={(e) => update("taxId", e.target.value)}
                    placeholder="C0012345678"
                  />
                </Field>
                <Field label="Street address" className="sm:col-span-2">
                  <Input
                    value={form.street}
                    onChange={(e) => update("street", e.target.value)}
                    placeholder="14 Independence Avenue"
                  />
                </Field>
                <Field label="City">
                  <Input
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="Accra"
                  />
                </Field>
                <Field label="Region / State">
                  <Input
                    value={form.region}
                    onChange={(e) => update("region", e.target.value)}
                    placeholder="Greater Accra"
                  />
                </Field>
                <Field label="Country">
                  <Input
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder="Ghana"
                  />
                </Field>
                <Field label="Postal / GhanaPost code">
                  <Input
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    placeholder="GA-123-4567"
                  />
                </Field>
              </div>
            </FormSection>


            {/* ─── Branding ──────────────────────────────────────────── */}
            <FormSection
              id="branding"
              title="Branding"
              description="Logo shown in the platform header and on exported documents."
            >
              <div className="flex items-center gap-4">
                {/* Logo placeholder */}
                <div className="flex size-16 items-center justify-center rounded-xl border bg-muted text-xl font-semibold text-muted-foreground">
                  {orgData.initials}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button variant="outline" size="sm">
                    <Upload data-icon="inline-start" /> Upload logo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    PNG or SVG, max 2 MB, min 200×200 px
                  </p>
                </div>
              </div>
            </FormSection>


            {/* ─── Danger zone ───────────────────────────────────────── */}
            <DangerZone
              id="danger"
              description="Irreversible actions that affect your entire organization."
              actions={[
                {
                  label: "Delete organization",
                  description:
                    "Permanently delete this organization, all its data, and cancel all subscriptions. This cannot be undone.",
                  buttonLabel: "Delete organization",
                  ownerOnly: true,
                  onClick: () => setDeleteOpen(true),
                },
              ]}
            />

            <p className="text-xs text-muted-foreground">
              Last updated by {orgData.updatedBy} on{" "}
              {new Date(orgData.updatedAt).toLocaleDateString("en-GH", {
                dateStyle: "medium",
              })}
              .
            </p>

            {/* Extra bottom space accounts for the save bar when dirty */}
            {dirty && <div className="h-16" />}
          </div>
        </div>
      </div>

      {/* Sticky save bar */}
      <SaveBar
        dirty={dirty}
        saving={saving}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete organization"
        description="This will permanently delete Mensah Retail Group and all associated data. All subscriptions will be cancelled immediately."
        confirmLabel="Delete organization"
        confirmText={orgData.name}
        onConfirm={() => {
          setDeleteOpen(false)
          toast.error("Organization deleted")
        }}
        variant="destructive"
      />
    </>
  )
}
