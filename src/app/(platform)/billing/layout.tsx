"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const tabs = [
  { label: "Subscriptions", href: "/billing/subscriptions" },
  { label: "Invoices", href: "/billing/invoices" },
  { label: "Payment methods", href: "/billing/payment-methods" },
]

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Billing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscriptions, invoices, and how you pay.
        </p>
      </div>

      {/* Tab nav */}
      <nav
        aria-label="Billing sections"
        className="flex gap-1 border-b"
      >
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href as never}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              pathname === t.href
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  )
}
