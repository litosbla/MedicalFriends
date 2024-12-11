import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { SignOutButton} from "@clerk/nextjs"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Empresas",
    url: "/empresas",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6 mt-2 "><Image src="assets/Logo-sidebar.svg" alt="logo" width={200} height={100}/></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="ml-4">
                  <SidebarMenuButton asChild className="text-base hover:font-bold">
                    <a href={item.url} >
                      <item.icon className="text-green-500"/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-5 " >
        <SignOutButton>
            <div className="flex items-center justify-center bg-gray-50 p-2 text-gray-600 font-bold rounded-xl shadow-[inset_0_2px_15px_rgba(0,255,0,0.3)]">
              Sign out
            </div>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  )
}
