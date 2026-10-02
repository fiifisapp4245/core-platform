import { cn } from "@/lib/utils"

interface FormSectionProps {
  id?: string
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * White section container used on settings-style pages.
 * Header is separated from the body by a divider; no shadow — just a hairline ring.
 */
export function FormSection({ id, title, description, action, children, className }: FormSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10",
        className
      )}
    >
      <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold">{title}</h3>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      <div className="flex flex-col gap-5 p-5">{children}</div>
    </section>
  )
}

interface FieldProps {
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function Field({ label, hint, error, required, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
