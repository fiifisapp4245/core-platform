"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowUpRight,
  ChevronsUpDown,
  CreditCard,
  House,
  LayoutGrid,
  LifeBuoy,
  Plus,
  Settings,
  Users,
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

const platformNav = [
  { title: "Home", href: "/", icon: House },
  { title: "Apps", href: "/apps", icon: LayoutGrid },
  { title: "Users & roles", href: "/users", icon: Users },
  { title: "Billing", href: "/billing", icon: CreditCard },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <Sidebar collapsible="icon">
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>My apps</SidebarGroupLabel>
          <SidebarGroupAction
            title="Add app"
            render={<Link href="/apps?tab=discover" />}
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
                    render={<a href={app.href} target="_blank" rel="noreferrer" />}
                  >
                    <AppIcon app={app} size="sm" className="-ml-1" />
                    <span>{app.name}</span>
                  </SidebarMenuButton>
                  {app.status === "trial" ? (
                    <SidebarMenuBadge className="text-[10px] text-primary">Trial</SidebarMenuBadge>
                  ) : (
                    <SidebarMenuAction showOnHover render={<a href={app.href} target="_blank" rel="noreferrer" />}>
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Organization settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help & support">
              <LifeBuoy />
              <span>Help & support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
