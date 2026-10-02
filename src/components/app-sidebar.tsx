"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Building2,
  ChevronRight,
  ChevronsUpDown,
  ClipboardList,
  CreditCard,
  FileText,
  Globe,
  House,
  KeyRound,
  LayoutGrid,
  MapPin,
  Plus,
  Receipt,
  Settings,
  Shield,
  ShieldAlert,
  Timer,
  UserCog,
  Users,
  Wallet,
} from "lucide-react"

import { AppIcon, TroveMark } from "@/components/brand"
import { organization, subscribedApps } from "@/lib/apps"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// ─── Nav groups ──────────────────────────────────────────────────────────────

const workspaceNav = [
  { title: "Overview", href: "/", icon: House },
  { title: "Organization", href: "/organization", icon: Building2 },
  { title: "Locations", href: "/locations", icon: MapPin },
]

const accessNav = [
  { title: "Users", href: "/users", icon: Users },
  { title: "Groups", href: "/groups", icon: UserCog },
  { title: "Roles", href: "/roles", icon: KeyRound },
  { title: "Permissions", href: "/permissions", icon: Shield },
]

const appsNav = [{ title: "Apps", href: "/apps", icon: LayoutGrid }]

const billingNav = [
  { title: "Subscriptions", href: "/billing/subscriptions", icon: CreditCard },
  { title: "Invoices", href: "/billing/invoices", icon: Receipt },
  { title: "Payment methods", href: "/billing/payment-methods", icon: Wallet },
]

const securityNav = [
  { title: "Audit logs", href: "/audit-logs", icon: ClipboardList },
  { title: "Log retention", href: "/log-retention", icon: Timer },
]

const helpNav = [
  { title: "Notifications", href: "/notifications", icon: Bell },
  { title: "Guide", href: "/guide", icon: BookOpen },
  { title: "Settings", href: "/settings", icon: Settings },
]

// ─── Component ───────────────────────────────────────────────────────────────

type NavItem = { title: string; href: string; icon: React.ComponentType<{ className?: string }> }

function NavGroup({
  label,
  items,
  isActive,
}: {
  label: string
  items: NavItem[]
  isActive: (href: string) => boolean
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={isActive(item.href)}
                tooltip={item.title}
                render={<Link href={item.href as never} />}
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    // Billing sub-pages: exact match so /billing/subscriptions doesn't activate /billing
    if (href.startsWith("/billing/")) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <Sidebar collapsible="icon">
      {/* ─ Header: org switcher ─────────────────────────────────────── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-popup-open:bg-sidebar-accent"
                  />
                }
              >
                <TroveMark />
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold text-foreground">
                    TroveSuite
                  </span>
                  <span className="truncate text-xs">{organization.name}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-primary-foreground">
                      {organization.initials}
                    </span>
                    {organization.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="flex size-6 items-center justify-center rounded-md bg-brand-teal text-[10px] font-semibold text-white">
                      MC
                    </span>
                    Mensah Microcredit
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus /> Create organization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ─ Content: grouped nav ─────────────────────────────────────── */}
      <SidebarContent>
        <NavGroup label="Workspace" items={workspaceNav} isActive={isActive} />
        <NavGroup label="Access" items={accessNav} isActive={isActive} />
        <NavGroup label="Apps" items={appsNav} isActive={isActive} />
        <NavGroup label="Billing" items={billingNav} isActive={isActive} />
        <NavGroup label="Security" items={securityNav} isActive={isActive} />
        <NavGroup label="Help &amp; preferences" items={helpNav} isActive={isActive} />

        {/* My apps: subscribed external apps */}
        <SidebarGroup>
          <SidebarGroupLabel>My apps</SidebarGroupLabel>
          <SidebarGroupAction
            title="Add app"
            render={<Link href={"/apps" as never} />}
          >
            <Plus />
            <span className="sr-only">Add app</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {subscribedApps.map((app) => (
                <SidebarMenuItem key={app.id}>
                  <SidebarMenuButton
                    tooltip={app.name}
                    render={
                      <a href={app.href} target="_blank" rel="noreferrer" />
                    }
                  >
                    <AppIcon app={app} size="sm" className="-ml-1" />
                    <span>{app.name}</span>
                  </SidebarMenuButton>
                  {app.status === "trial" ? (
                    <SidebarMenuBadge className="text-[10px] text-primary">
                      Trial
                    </SidebarMenuBadge>
                  ) : (
                    <SidebarMenuAction
                      showOnHover
                      render={
                        <a
                          href={app.href}
                          target="_blank"
                          rel="noreferrer"
                        />
                      }
                    >
                      <ArrowUpRight />
                      <span className="sr-only">Open {app.name}</span>
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ─ Footer ───────────────────────────────────────────────────── */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              render={<Link href={"/settings" as never} />}
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
