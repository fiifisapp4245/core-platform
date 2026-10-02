import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function PlatformLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-canvas">
        <SiteHeader />
        {/* pb-16 ensures consistent bottom clearance on every page */}
        <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 px-4 pt-6 pb-16 md:px-8 md:pt-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
