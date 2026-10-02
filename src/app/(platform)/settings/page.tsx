"use client"

import * as React from "react"
import {
  Check,
  Globe,
  Key,
  LogOut,
  Monitor,
  Moon,
  Smartphone,
  Sun,
  UserRound,
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

import { currentUser } from "@/lib/apps"
import { PageHeader } from "@/components/page-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ─── Profile tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [name, setName] = React.useState(currentUser.name)
  const [email] = React.useState(currentUser.email)
  const [dirty, setDirty] = React.useState(false)

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>
            Your name and email used across TroveSuite.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-secondary text-base font-medium text-secondary-foreground">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change avatar</Button>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Full name</label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setDirty(true)
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Email address</label>
            <Input value={email} readOnly className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              Contact support to change your email.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Role</label>
            <Input value={currentUser.role} readOnly className="bg-muted" />
          </div>
          <Button
            disabled={!dirty}
            onClick={() => {
              setDirty(false)
              toast.success("Profile updated")
            }}
          >
            <Check data-icon="inline-start" /> Save profile
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Security tab ─────────────────────────────────────────────────────────────

const activeSessions = [
  { id: "s1", device: "Chrome on macOS", location: "Accra, Ghana", lastSeen: "Now (this session)", current: true },
  { id: "s2", device: "Firefox on Windows", location: "Tema, Ghana", lastSeen: "2 hours ago", current: false },
  { id: "s3", device: "Safari on iPhone", location: "Accra, Ghana", lastSeen: "Yesterday", current: false },
]

function SecurityTab() {
  const [sessions, setSessions] = React.useState(activeSessions)
  const [currentPw, setCurrentPw] = React.useState("")
  const [newPw, setNewPw] = React.useState("")

  function revokeSession(id: string) {
    setSessions((ss) => ss.filter((s) => s.id !== id))
    toast.success("Session revoked")
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your account password.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Current password</label>
            <Input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">New password</label>
            <Input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">
              At least 12 characters. Mix letters, numbers and symbols.
            </p>
          </div>
          <Button
            disabled={!currentPw || !newPw}
            onClick={() => {
              setCurrentPw("")
              setNewPw("")
              toast.success("Password changed")
            }}
          >
            Update password
          </Button>
        </CardContent>
      </Card>

      {/* Active sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>
            Devices currently signed in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
            >
              <Smartphone className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1 text-sm">
                <div className="flex items-center gap-2 font-medium">
                  {s.device}
                  {s.current && (
                    <span className="rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
                      This device
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {s.location} · {s.lastSeen}
                </div>
              </div>
              {!s.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive shrink-0"
                  onClick={() => revokeSession(s.id)}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="self-start border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => {
              setSessions((ss) => ss.filter((s) => s.current))
              toast.success("All other sessions signed out")
            }}
          >
            <LogOut data-icon="inline-start" /> Sign out all other sessions
          </Button>
        </CardContent>
      </Card>

      {/* New device alert */}
      <Card>
        <CardHeader>
          <CardTitle>New device sign-in</CardTitle>
          <CardDescription>
            Get an email alert when a new device signs in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="h-5 w-9 rounded-full bg-input peer-checked:bg-primary transition-colors" />
              <div className="absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-sm font-medium">Email me when a new device signs in</span>
          </label>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Preferences tab ──────────────────────────────────────────────────────────

function PreferencesTab() {
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = React.useState("en-GH")
  const [tz, setTz] = React.useState("Africa/Accra")
  const [dateFormat, setDateFormat] = React.useState("d MMM yyyy")

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Language &amp; region</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <Globe className="size-4" /> Language
            </label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="en-GH">English (Ghana)</option>
              <option value="en-US">English (United States)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Timezone</label>
            <select
              value={tz}
              onChange={(e) => setTz(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="Africa/Accra">Africa/Accra (GMT+0)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Date format</label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="d MMM yyyy">1 Oct 2026</option>
              <option value="dd/MM/yyyy">01/10/2026</option>
              <option value="MM/dd/yyyy">10/01/2026</option>
              <option value="yyyy-MM-dd">2026-10-01</option>
            </select>
          </div>
          <Button onClick={() => toast.success("Preferences saved")} className="self-start">
            <Check data-icon="inline-start" /> Save preferences
          </Button>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how the platform looks to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {([
              { value: "light", label: "Light", Icon: Sun },
              { value: "dark", label: "Dark", Icon: Moon },
              { value: "system", label: "System", Icon: Monitor },
            ] as const).map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-sm transition-colors ${
                  theme === value
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:bg-muted/50"
                }`}
              >
                <Icon className="size-5" />
                {label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your personal profile, security and preferences."
      />

      <Tabs defaultValue="profile" className="gap-4">
        <TabsList>
          <TabsTrigger value="profile">
            <UserRound data-icon="inline-start" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Key data-icon="inline-start" /> Security
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Globe data-icon="inline-start" /> Preferences
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
        <TabsContent value="preferences"><PreferencesTab /></TabsContent>
      </Tabs>
    </div>
  )
}
