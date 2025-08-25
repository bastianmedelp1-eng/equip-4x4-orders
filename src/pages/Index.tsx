import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardGrid from "@/components/DashboardGrid";
import AIChat from "@/components/AIChat";
import { useState } from "react";

const Index = () => {
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col ml-12 sidebar-open:ml-64 transition-all duration-300 bg-gradient-subtle">
          {/* Header with sidebar trigger */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card shadow-sm">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Gestiona tu negocio de equipamiento 4x4</p>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-5xl font-thin text-gray-900 dark:text-white tracking-tight">
                Equipers 4x4
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-light">
                Sistema de gestión profesional
              </p>
            </div>
            <DashboardGrid isCompact={!isChatMinimized} />
          </main>
          
          {/* AI Chat Component */}
          <AIChat 
            isMinimized={isChatMinimized}
            onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
          />
          
          <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border bg-card">
            © 2024 Equipers 4x4. Todos los derechos reservados.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
