import { cn } from "@/lib/utils"

interface FormSectionProps {
  id?: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ id, title, description, children, className }: FormSectionProps) {
  return (
    <section id={id} className={cn("flex flex-col gap-5", className)}>
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
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
