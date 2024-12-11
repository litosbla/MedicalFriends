import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
      <AppSidebar />
      <main className=" bg-white w-full text-gray-800">
        <SidebarTrigger  />
        <div className="p-10">
          {children}
        </div>
        
      </main>
      <Toaster />
    </SidebarProvider>
  )
}