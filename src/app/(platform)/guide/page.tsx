import Link from "next/link"
import { ArrowRight, BookOpen, ChevronRight, MessageCircle, Search } from "lucide-react"

import { guideArticles } from "@/lib/mock"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const apps = ["Core Platform", "MyStoreGuard", "LoanDrift"]

const categories = [
  { name: "Getting started", description: "Set up your organization and apps", icon: "🚀" },
  { name: "Users and access", description: "Invite teammates and manage roles", icon: "👥" },
  { name: "Billing and payments", description: "Subscriptions, invoices and MoMo", icon: "💳" },
  { name: "FAQs", description: "Common questions answered", icon: "❓" },
]

const quickLinks = [
  { label: "Create your organization", href: "/guide#create-org" },
  { label: "Invite users", href: "/guide#invite-users" },
  { label: "Create custom roles", href: "/guide#create-roles" },
  { label: "Pay with Mobile Money", href: "/guide#pay-momo" },
  { label: "Add a location", href: "/guide#add-locations" },
  { label: "Subscribe to an app", href: "/guide#subscribe-app" },
]

export default function GuidePage() {
  const coreArticles = guideArticles.filter((a) => a.app === "Core Platform")

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Guide"
        description="Learn how to get the most from TroveSuite."
      />

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={"How can we help? e.g. 'invite a user'"}
          className="h-11 bg-card pl-10 text-base"
          aria-label="Search guides"
        />
      </div>

      {/* App tabs (static, Core Platform active) */}
      <Tabs defaultValue={apps[0]}>
        <TabsList variant="line">
          {apps.map((app) => (
            <TabsTrigger key={app} value={app}>
              {app}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Categories */}
      <section>
        <h2 className="mb-4 text-base font-semibold">Browse by category</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const count = guideArticles.filter(
              (a) => a.category === cat.name
            ).length
            return (
              <Card
                key={cat.name}
                className="flex cursor-pointer flex-col gap-2 p-4 transition-colors hover:ring-primary/40"
              >
                <span className="text-2xl" aria-hidden>{cat.icon}</span>
                <div>
                  <p className="font-semibold">{cat.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <p className="mt-auto text-xs text-muted-foreground">
                  {count} article{count !== 1 && "s"}
                </p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 text-base font-semibold">Quick guides</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href as never}
              className="flex items-center gap-2 rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-foreground/10 transition-colors hover:bg-accent hover:ring-primary/40"
            >
              <BookOpen className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1">{link.label}</span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recent articles */}
      <section>
        <h2 className="mb-4 text-base font-semibold">Core Platform articles</h2>
        <div className="flex flex-col divide-y overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
          {coreArticles.map((article) => (
            <div key={article.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">{article.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{article.excerpt}</p>
                <span className="mt-1 inline-block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {article.category}
                </span>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact support */}
      <Card className="flex flex-col items-center gap-3 p-6 text-center">
        <MessageCircle className="size-8 text-muted-foreground" />
        <div>
          <p className="font-semibold">Still need help?</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Our support team is available Monday–Saturday, 8 am–6 pm GMT.
          </p>
        </div>
        <Button nativeButton={false} render={<a href="mailto:support@trovesuite.com" />}>
          Contact support
        </Button>
      </Card>
    </div>
  )
}
