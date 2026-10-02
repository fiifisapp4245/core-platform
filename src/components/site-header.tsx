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
  "/": "Home",
  "/apps": "Apps",
  "/users": "Users & roles",
  "/billing": "Billing",
}

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex h-14 min-w-0 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/70">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
      <h1 className="text-sm font-medium">{titles[pathname] ?? "TroveSuite"}</h1>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          className="hidden h-8 w-72 items-center gap-2 rounded-lg border bg-card px-2.5 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted md:flex"
        >
          <Search className="size-4" />
          Search apps, people, settings…
          <kbd className="ml-auto rounded border bg-muted px-1.5 font-mono text-[10px]">⌘K</kbd>
        </button>

        {/* App launcher — the Zoho-style waffle */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" aria-label="Switch app" />}
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
                    render={<a href={app.href} target="_blank" rel="noreferrer" />}
                  >
                    <AppIcon app={app} />
                    <span className="truncate">{app.name}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/apps" />} className="justify-center text-primary">
              Browse all apps
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-mint ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" className="ml-1 rounded-full" aria-label="Account" />}
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
                <div className="text-sm font-medium text-foreground">{currentUser.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser.email}</div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserRound /> My profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light"><Sun /> Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark"><Moon /> Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system"><Monitor /> System</DropdownMenuRadioItem>
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
