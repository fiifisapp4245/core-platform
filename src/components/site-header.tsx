"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Bell,
  Grip,
  LogOut,
  Monitor,
  Moon,
  Search,
  Sun,
  UserRound,
} from "lucide-react"

import { AppIcon } from "@/components/brand"
import { currentUser, subscribedApps } from "@/lib/apps"
import { notifications } from "@/lib/mock"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const titles: Record<string, string> = {
  "/": "Overview",
  "/organization": "Organization",
  "/locations": "Locations",
  "/users": "Users",
  "/groups": "Groups",
  "/roles": "Roles",
  "/permissions": "Permissions",
  "/apps": "Apps",
  "/billing/subscriptions": "Subscriptions",
  "/billing/invoices": "Invoices",
  "/billing/payment-methods": "Payment methods",
  "/audit-logs": "Audit logs",
  "/log-retention": "Log retention",
  "/notifications": "Notifications",
  "/guide": "Guide",
  "/settings": "Settings",
}

function getTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname]
  if (pathname.startsWith("/roles/")) return "Role details"
  if (pathname.startsWith("/guide/")) return "Guide"
  return "TroveSuite"
}

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const unread = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-20 flex h-14 min-w-0 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/70">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-1 data-[orientation=vertical]:h-4"
      />
      <h1 className="text-sm font-medium">{getTitle(pathname)}</h1>

      <div className="ml-auto flex items-center gap-1">
        {/* Search */}
        <button
          type="button"
          className="hidden h-8 w-72 items-center gap-2 rounded-lg border bg-card px-2.5 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted md:flex"
          aria-label="Search (Cmd K)"
        >
          <Search className="size-4" />
          Search…
          <kbd className="ml-auto rounded border bg-muted px-1.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>

        {/* App launcher */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Switch app" />
            }
          >
            <Grip />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Your apps</DropdownMenuLabel>
              <div className="grid grid-cols-3 gap-1">
                {subscribedApps.map((app) => (
                  <DropdownMenuItem
                    key={app.id}
                    className="flex-col gap-1.5 py-3 text-xs"
                    render={
                      <a href={app.href} target="_blank" rel="noreferrer" />
                    }
                  >
                    <AppIcon app={app} />
                    <span className="truncate">{app.name}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={<Link href={"/apps" as never} />}
              className="justify-center text-primary"
            >
              Browse all apps
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ""}`}
          className="relative"
          nativeButton={false}
          render={<Link href={"/notifications" as never} />}
        >
          <Bell />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 flex size-2 items-center justify-center rounded-full bg-brand-mint ring-2 ring-background" />
          )}
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 rounded-full"
                aria-label="Account"
              />
            }
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-secondary text-xs font-medium text-secondary-foreground">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="text-sm font-medium text-foreground">
                  {currentUser.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentUser.email}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {currentUser.role}
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={<Link href={"/settings" as never} />}
            >
              <UserRound /> My profile &amp; settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <Sun /> Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon /> Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <Monitor /> System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
