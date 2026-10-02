import { cn } from "@/lib/utils"
import type { TroveApp } from "@/lib/apps"

export function TroveMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-navy text-white shadow-sm",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
        <path d="M5 6h14M12 6v13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="18" cy="17" r="2.2" fill="var(--brand-mint)" />
      </svg>
    </div>
  )
}

export function AppIcon({
  app,
  size = "md",
  className,
}: {
  app: Pick<TroveApp, "icon" | "tone" | "name">
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const Icon = app.icon
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center",
        size === "sm" && "size-6 rounded-md [&_svg]:size-3.5",
        size === "md" && "size-10 rounded-lg [&_svg]:size-5",
        size === "lg" && "size-12 rounded-xl [&_svg]:size-6",
        app.tone,
        className
      )}
    >
      <Icon />
    </div>
  )
}
