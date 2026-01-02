import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  UserCheck, 
  Bell 
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const allMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "AI Chatbot", url: "/chatbot", icon: MessageSquare },
  { title: "Advisor", url: "/advisor", icon: UserCheck, adminOnly: true },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

export function AppSidebar() {
  const { isAdmin } = useAuth();

  const menuItems = allMenuItems.filter(item => {
    if (isAdmin) {
      // Admins only see Advisor
      return item.adminOnly === true;
    } else {
      // Students see everything except Advisor
      return !item.adminOnly;
    }
  });

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src="/src/assets/university-logo.png" 
            alt="University of Jordan Logo" 
            className="h-12 w-12 object-contain"
          />
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">AI Advisor</h2>
            <p className="text-xs text-sidebar-foreground/70">Academic Planning</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
