import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Globe,
  DollarSign,
  Briefcase,
  BarChart3,
  Clock,
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Stocks", url: "/productos", icon: TrendingUp },
  { title: "Markets", url: "/markets", icon: BarChart3 },
  { title: "Currencies", url: "/currencies", icon: DollarSign },
  { title: "Global", url: "/global", icon: Globe },
  { title: "Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Performance", url: "/performance", icon: BarChart3 },
  { title: "Analysis", url: "/analysis", icon: Clock },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="bg-sidebar-background border-r border-sidebar-border" collapsible="icon">
      <SidebarHeader className="p-4 relative">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-sidebar-foreground">MarketPulse</h1>
          )}
          
          {/* Collapse/Expand Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={`
              h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent
              ${isCollapsed ? 'absolute top-4 left-1/2 -translate-x-1/2' : ''}
            `}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const itemIsActive = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={`
                        w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors
                        ${itemIsActive 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }
                      `}
                    >
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/"}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              {/* Settings at the bottom */}
              <SidebarMenuItem className="mt-8">
                <SidebarMenuButton 
                  asChild
                  className={`
                    w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors
                    ${isActive('/settings')
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <NavLink to="/settings">
                    <Settings className="mr-3 h-4 w-4" />
                    {!isCollapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}