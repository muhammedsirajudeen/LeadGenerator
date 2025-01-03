import { Home, LogInIcon, LogOut, LogsIcon, } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Login",
        url: "/login",
        icon: LogInIcon,
    },
    {
        title: "Signup",
        url: "/signup",
        icon: LogsIcon,
    },
    {
        title: "Logout",
        url: "/logout",
        icon: LogOut,
    },
    //   {
    //     title: "Calendar",
    //     url: "#",
    //     icon: Calendar,
    //   },
    //   {
    //     title: "Search",
    //     url: "#",
    //     icon: Search,
    //   },
    //   {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings,
    //   },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Leads Viewer</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
