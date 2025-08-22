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
import logo from "@/assets/logo.png";

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
    <Sidebar 
      className={`
        bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-out
        ${isCollapsed ? 'w-12' : 'w-64'}
        fixed top-0 left-0 h-screen z-50 overflow-hidden shadow-lg
      `} 
      collapsible="icon"
    >
      {/* Samsung Edge style header */}
      <SidebarHeader className="p-3 relative border-b border-sidebar-border/50">
        <div className="flex items-center justify-between">
          <div className={`
            transition-all duration-300 ease-out overflow-hidden flex items-center
            ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
          `}>
            <img 
              src={logo} 
              alt="Logo" 
              className="h-8 w-auto dark:invert transition-all duration-300"
            />
          </div>
          
          {/* Edge-style toggle button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={`
              h-6 w-6 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground
              hover:bg-sidebar-accent/50 rounded-full transition-all duration-200
              ${isCollapsed ? 'mx-auto' : 'flex-shrink-0'}
            `}
          >
            <div className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
              <ChevronLeft className="h-3 w-3" />
            </div>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
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
                        group relative w-full rounded-xl transition-all duration-300 ease-out
                        ${isCollapsed ? 'h-10 w-10 p-0 mx-auto' : 'h-10 px-3'}
                        ${itemIsActive 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground'
                        }
                      `}
                    >
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/"}
                        className="flex items-center justify-center w-full h-full"
                      >
                        <item.icon className={`
                          h-4 w-4 transition-all duration-200
                          ${isCollapsed ? 'mx-auto' : 'mr-3 flex-shrink-0'}
                        `} />
                        
                        <span className={`
                          text-sm font-medium transition-all duration-300 ease-out overflow-hidden whitespace-nowrap
                          ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                        `}>
                          {item.title}
                        </span>
                        
                        {/* Samsung-style active indicator */}
                        {itemIsActive && (
                          <div className={`
                            absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full
                            transition-all duration-300 ease-out
                            ${isCollapsed ? 'opacity-100' : 'opacity-0'}
                          `} />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              {/* Settings at the bottom with separator */}
              <div className="mt-6 pt-4 border-t border-sidebar-border/30">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      group relative w-full rounded-xl transition-all duration-300 ease-out
                      ${isCollapsed ? 'h-10 w-10 p-0 mx-auto' : 'h-10 px-3'}
                      ${isActive('/settings')
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground'
                      }
                    `}
                  >
                    <NavLink to="/settings" className="flex items-center justify-center w-full h-full">
                      <Settings className={`
                        h-4 w-4 transition-all duration-200
                        ${isCollapsed ? 'mx-auto' : 'mr-3 flex-shrink-0'}
                      `} />
                      
                      <span className={`
                        text-sm font-medium transition-all duration-300 ease-out overflow-hidden whitespace-nowrap
                        ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                      `}>
                        Settings
                      </span>
                      
                      {/* Samsung-style active indicator */}
                      {isActive('/settings') && (
                        <div className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full
                          transition-all duration-300 ease-out
                          ${isCollapsed ? 'opacity-100' : 'opacity-0'}
                        `} />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}