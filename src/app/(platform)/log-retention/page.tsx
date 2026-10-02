"use client"

import * as React from "react"
import { AlertTriangle, Check } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDialog } from "@/components/confirm-dialog"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const options = [
  { value: 30, label: "30 days" },
  { value: 90, label: "90 days", recommended: true },
  { value: 180, label: "180 days" },
  { value: 365, label: "1 year" },
]

export default function LogRetentionPage() {
  const [current, setCurrent] = React.useState(90)
  const [selected, setSelected] = React.useState(90)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const dirty = selected !== current
  const shortening = selected < current

  async function handleSave() {
    if (shortening) {
      setConfirmOpen(true)
      return
    }
    await save()
  }

  async function save() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setCurrent(selected)
    setSaving(false)
    toast.success(`Log retention set to ${options.find((o) => o.value === selected)?.label}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Log retention"
        description="Control how long audit logs are kept. Logs older than the retention period are permanently deleted."
      />

      <Card className="max-w-xl">
        <CardHeader className="border-b">
          <CardTitle>Retention period</CardTitle>
          <CardDescription>
            Currently set to {options.find((o) => o.value === current)?.label}.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setSelected(o.value)}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-sm transition-colors ${
                  selected === o.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:bg-muted/50"
                }`}
              >
                <span className="font-semibold">{o.label}</span>
                {o.recommended && (
                  <span className="text-[10px] text-muted-foreground">
                    Recommended
                  </span>
                )}
              </button>
            ))}
          </div>

          {shortening && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>
                Shortening the retention period will permanently delete logs
                older than{" "}
                {options.find((o) => o.value === selected)?.label}. This cannot
                be undone.
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={!dirty || saving}>
              {saving ? "Saving…" : <><Check data-icon="inline-start" /> Save</>}
            </Button>
            {dirty && (
              <Button
                variant="outline"
                onClick={() => setSelected(current)}
                disabled={saving}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Shorten retention period?"
        description={`Logs older than ${options.find((o) => o.value === selected)?.label} will be permanently deleted. This cannot be undone.`}
        confirmLabel="Yes, shorten retention"
        onConfirm={() => {
          setConfirmOpen(false)
          void save()
        }}
        variant="destructive"
      />
    </div>
  )
}
