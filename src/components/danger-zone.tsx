import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DangerAction {
  label: string
  description: string
  buttonLabel?: string
  onClick: () => void
  ownerOnly?: boolean
}

interface DangerZoneProps {
  actions: DangerAction[]
}

export function DangerZone({ actions }: DangerZoneProps) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-destructive" />
        <h3 className="text-base font-semibold text-destructive">Danger zone</h3>
      </div>
      <div className="flex flex-col gap-4">
        {actions.map((action) => (
          <div
            key={action.label}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium">{action.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {action.description}
                {action.ownerOnly && (
                  <span className="ml-1 text-amber-600 dark:text-amber-400">
                    Owner only.
                  </span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={action.onClick}
            >
              {action.buttonLabel ?? action.label}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
