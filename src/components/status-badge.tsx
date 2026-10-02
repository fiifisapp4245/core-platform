import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Variant = {
  label: string
  className: string
  dot?: boolean
}

const variants: Record<string, Variant> = {
  // User statuses
  Active: { label: "Active", className: "bg-success/10 text-success", dot: true },
  Invited: { label: "Invited", className: "bg-primary/10 text-primary" },
  Suspended: { label: "Suspended", className: "bg-muted text-muted-foreground" },
  // Location statuses
  Inactive: { label: "Inactive", className: "bg-muted text-muted-foreground" },
  // Invoice statuses
  Paid: { label: "Paid", className: "bg-success/10 text-success", dot: true },
  Upcoming: { label: "Upcoming", className: "bg-primary/10 text-primary" },
  Failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
  Refunded: { label: "Refunded", className: "bg-muted text-muted-foreground" },
  // Subscription statuses
  Trial: { label: "Trial", className: "bg-primary/10 text-primary" },
  "Past due": { label: "Past due", className: "bg-destructive/10 text-destructive" },
  Cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground" },
  // Generic
  Default: { label: "Default", className: "bg-secondary text-secondary-foreground" },
}

export function StatusBadge({ status }: { status: string }) {
  const v = variants[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  }
  return (
    <Badge variant="secondary" className={cn("gap-1 font-medium", v.className)}>
      {v.dot && <span className="size-1.5 rounded-full bg-current" />}
      {v.label}
    </Badge>
  )
}
