import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface PlanLimitMeterProps {
  label: string
  used: number
  total: number
  className?: string
  warnAt?: number // fraction 0–1
}

export function PlanLimitMeter({
  label,
  used,
  total,
  className,
  warnAt = 0.8,
}: PlanLimitMeterProps) {
  const pct = total > 0 ? (used / total) * 100 : 0
  const isWarn = pct / 100 >= warnAt
  const isMax = used >= total

  return (
    <div className={cn("flex items-center gap-3 text-sm", className)}>
      <span className="text-muted-foreground">{label}</span>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Progress
          value={pct}
          className={cn(
            "h-1.5",
            isMax && "[&>div]:bg-destructive",
            isWarn && !isMax && "[&>div]:bg-amber-500"
          )}
        />
        <span
          className={cn(
            "shrink-0 tabular-nums",
            isMax ? "text-destructive" : isWarn ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
          )}
        >
          {used} / {total}
        </span>
      </div>
    </div>
  )
}
