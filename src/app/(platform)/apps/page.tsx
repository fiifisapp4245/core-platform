import { AppsBrowser } from "./apps-browser"

const tabs = ["mine", "discover", "all"]

export default async function AppsPage(props: PageProps<"/apps">) {
  const { tab } = await props.searchParams
  const defaultTab = typeof tab === "string" && tabs.includes(tab) ? tab : "mine"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Apps</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Open the apps you use every day, or add new modules to TroveSuite.
        </p>
      </div>
      <AppsBrowser key={defaultTab} defaultTab={defaultTab} />
    </div>
  )
}
