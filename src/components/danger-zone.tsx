import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DangerAction {
  label: string
  description: string
  buttonLabel?: string
  onClick: () => void
  ownerOnly?: boolean
}

interface DangerZoneProps {
  id?: string
  description?: string
  actions: DangerAction[]
  className?: string
}

export function DangerZone({ id, description, actions, className }: DangerZoneProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-destructive/30",
        className
      )}
    >
      <header className="border-b border-destructive/20 bg-destructive/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-destructive" />
          <h3 className="text-base font-semibold text-destructive">Danger zone</h3>
        </div>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </header>
      <div className="flex flex-col divide-y">
        {actions.map((action) => (
          <div
            key={action.label}
            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
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
              variant="destructive"
              className="shrink-0"
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
