"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { DiscoverAppCard, SubscribedAppCard } from "@/components/app-cards"
import { apps, discoverApps, subscribedApps, type TroveApp } from "@/lib/apps"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function matches(app: TroveApp, q: string) {
  const s = q.trim().toLowerCase()
  if (!s) return true
  return [app.name, app.category, app.description].some((v) => v.toLowerCase().includes(s))
}

function Empty({ query }: { query: string }) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
      No apps match “{query}”.
    </div>
  )
}

export function AppsBrowser({ defaultTab }: { defaultTab: string }) {
  const [query, setQuery] = React.useState("")

  const mine = subscribedApps.filter((a) => matches(a, query))
  const discover = discoverApps.filter((a) => matches(a, query))

  return (
    <Tabs defaultValue={defaultTab} className="gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TabsList>
          <TabsTrigger value="mine">
            My apps <span className="ml-1 text-xs text-muted-foreground">{subscribedApps.length}</span>
          </TabsTrigger>
          <TabsTrigger value="discover">
            Discover <span className="ml-1 text-xs text-muted-foreground">{discoverApps.length}</span>
          </TabsTrigger>
          <TabsTrigger value="all">
            All <span className="ml-1 text-xs text-muted-foreground">{apps.length}</span>
          </TabsTrigger>
        </TabsList>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps"
            className="bg-card pl-8"
            aria-label="Search apps"
          />
        </div>
      </div>

      <TabsContent value="mine">
        {mine.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mine.map((a) => <SubscribedAppCard key={a.id} id={a.id} />)}
          </div>
        ) : <Empty query={query} />}
      </TabsContent>

      <TabsContent value="discover">
        {discover.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {discover.map((a) => <DiscoverAppCard key={a.id} id={a.id} />)}
          </div>
        ) : <Empty query={query} />}
      </TabsContent>

      <TabsContent value="all" className="flex flex-col gap-8">
        {mine.length + discover.length === 0 && <Empty query={query} />}
        {mine.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">Subscribed</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {mine.map((a) => <SubscribedAppCard key={a.id} id={a.id} />)}
            </div>
          </section>
        )}
        {discover.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">Available to add</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {discover.map((a) => <DiscoverAppCard key={a.id} id={a.id} />)}
            </div>
          </section>
        )}
      </TabsContent>
    </Tabs>
  )
}
