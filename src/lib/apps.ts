import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CalendarClock,
  Coins,
  HandCoins,
  Landmark,
  ShoppingCart,
  Store,
  Truck,
  UserRoundCog,
  Users,
} from "lucide-react"

export type AppStatus = "active" | "trial" | "available" | "coming-soon"

export type AppMetric = { label: string; value: string }

export type TroveApp = {
  id: string
  name: string
  category: string
  description: string
  icon: LucideIcon
  /** Tailwind classes for the icon tile */
  tone: string
  status: AppStatus
  href?: string
  plan?: string
  renewsOn?: string
  seats?: { used: number; total: number }
  metrics?: AppMetric[]
  lastOpened?: string
}

export const apps: TroveApp[] = [
  {
    id: "mystoreguard",
    name: "MyStoreGuard",
    category: "Retail",
    description:
      "Inventory & POS system: stock tracking, warehouses, purchase orders and point of sale.",
    icon: Store,
    tone: "bg-brand-teal text-white",
    status: "active",
    href: "https://mystoreguard.trovesuite.com",
    plan: "Business",
    renewsOn: "Jan 30, 2027",
    seats: { used: 12, total: 15 },
    metrics: [
      { label: "Sales today", value: "GH₵ 18,240" },
      { label: "Low-stock items", value: "7" },
    ],
    lastOpened: "12 min ago",
  },
  {
    id: "loandrift",
    name: "LoanDrift",
    category: "Financial services",
    description:
      "Loan management: application to disbursement, repayment tracking and portfolio health.",
    icon: HandCoins,
    tone: "bg-brand-blue text-white",
    status: "trial",
    href: "https://loandrift.trovesuite.com",
    plan: "Growth trial",
    renewsOn: "Oct 14, 2026",
    seats: { used: 6, total: 10 },
    metrics: [
      { label: "Active loans", value: "342" },
      { label: "Due this week", value: "28" },
    ],
    lastOpened: "Yesterday",
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    category: "Finance",
    description:
      "General ledger, payables and receivables, financial reporting and real-time cash flow.",
    icon: Landmark,
    tone: "bg-brand-navy/10 text-brand-navy dark:bg-brand-navy/30 dark:text-blue-200",
    status: "available",
  },
  {
    id: "procurement",
    name: "Procurement",
    category: "Operations",
    description:
      "Purchase order management, supplier onboarding and vendor performance tracking.",
    icon: ShoppingCart,
    tone: "bg-brand-teal/10 text-brand-teal dark:bg-brand-teal/20 dark:text-teal-300",
    status: "available",
  },
  {
    id: "hr",
    name: "Human Resources",
    category: "People",
    description:
      "Employee records, attendance and organisational structure in one place.",
    icon: Users,
    tone: "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-blue-300",
    status: "coming-soon",
  },
  {
    id: "payroll",
    name: "Payroll",
    category: "People",
    description:
      "Automated payroll runs, tax calculations, payslips and statutory compliance.",
    icon: Coins,
    tone: "bg-brand-mint/10 text-emerald-700 dark:bg-brand-mint/20 dark:text-emerald-300",
    status: "coming-soon",
  },
  {
    id: "crm",
    name: "Sales & CRM",
    category: "Sales",
    description:
      "Customer relationships, sales pipelines and customer analytics.",
    icon: UserRoundCog,
    tone: "bg-brand-navy/10 text-brand-navy dark:bg-brand-navy/30 dark:text-blue-200",
    status: "coming-soon",
  },
  {
    id: "logistics",
    name: "Delivery & Logistics",
    category: "Operations",
    description:
      "Dispatch tracking, route optimisation and delivery coordination.",
    icon: Truck,
    tone: "bg-brand-teal/10 text-brand-teal dark:bg-brand-teal/20 dark:text-teal-300",
    status: "coming-soon",
  },
  {
    id: "scheduling",
    name: "Appointments",
    category: "Operations",
    description:
      "Calendars, appointment scheduling and resource allocation.",
    icon: CalendarClock,
    tone: "bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-blue-300",
    status: "coming-soon",
  },
  {
    id: "analytics",
    name: "Reporting & Analytics",
    category: "Insights",
    description:
      "Cross-app dashboards, custom reports and business intelligence.",
    icon: BarChart3,
    tone: "bg-brand-mint/10 text-emerald-700 dark:bg-brand-mint/20 dark:text-emerald-300",
    status: "coming-soon",
  },
]

export function getApp(id: string) {
  const app = apps.find((a) => a.id === id)
  if (!app) throw new Error(`Unknown app: ${id}`)
  return app
}

export const subscribedApps = apps.filter(
  (a) => a.status === "active" || a.status === "trial"
)
export const discoverApps = apps.filter(
  (a) => a.status === "available" || a.status === "coming-soon"
)

export const organization = {
  name: "Mensah Retail Group",
  plan: "TroveSuite Business",
  initials: "MR",
}

export const currentUser = {
  name: "Kwame Mensah",
  firstName: "Kwame",
  email: "kwame@mensahretail.com",
  role: "Owner",
  initials: "KM",
}

export type Activity = {
  id: string
  appId: string
  actor: string
  action: string
  time: string
}

export const activity: Activity[] = [
  { id: "1", appId: "mystoreguard", actor: "Efua Asante", action: "closed the till at Osu branch · GH₵ 6,410", time: "8 min ago" },
  { id: "2", appId: "loandrift", actor: "Yaw Boateng", action: "approved loan application #LN-2291", time: "34 min ago" },
  { id: "3", appId: "mystoreguard", actor: "System", action: "flagged 7 products below reorder point", time: "1 hr ago" },
  { id: "4", appId: "core", actor: "Kwame Mensah", action: "invited akua@mensahretail.com to LoanDrift", time: "3 hr ago" },
  { id: "5", appId: "loandrift", actor: "System", action: "sent 28 repayment reminders", time: "Today, 7:00" },
]

export const members = [
  { name: "Kwame Mensah", email: "kwame@mensahretail.com", role: "Owner", apps: ["mystoreguard", "loandrift"], status: "Active" },
  { name: "Efua Asante", email: "efua@mensahretail.com", role: "Admin", apps: ["mystoreguard"], status: "Active" },
  { name: "Yaw Boateng", email: "yaw@mensahretail.com", role: "Loan officer", apps: ["loandrift"], status: "Active" },
  { name: "Abena Owusu", email: "abena@mensahretail.com", role: "Cashier", apps: ["mystoreguard"], status: "Active" },
  { name: "Kofi Darko", email: "kofi@mensahretail.com", role: "Store manager", apps: ["mystoreguard"], status: "Active" },
  { name: "Akua Sarpong", email: "akua@mensahretail.com", role: "Loan officer", apps: ["loandrift"], status: "Invited" },
]

export const invoices = [
  { id: "INV-2026-009", date: "Sep 15, 2026", amount: "GH₵ 1,450.00", status: "Paid" },
  { id: "INV-2026-008", date: "Aug 15, 2026", amount: "GH₵ 1,450.00", status: "Paid" },
  { id: "INV-2026-007", date: "Jul 15, 2026", amount: "GH₵ 1,200.00", status: "Paid" },
  { id: "INV-2026-006", date: "Jun 15, 2026", amount: "GH₵ 1,200.00", status: "Paid" },
]
