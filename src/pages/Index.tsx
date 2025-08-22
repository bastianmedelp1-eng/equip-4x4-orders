import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Gestiona tu negocio de equipamiento 4x4</p>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Equipers 4x4 - Sistema de Pedidos
              </h2>
              <p className="text-muted-foreground">
                Gestiona tu negocio de equipamiento 4x4 de manera profesional
              </p>
            </div>
            <DashboardGrid isCompact={!isChatMinimized} />
          </main>
          
          {/* AI Chat Component */}
          <AIChat 
            isMinimized={isChatMinimized}
            onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
          />
          
          <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
            © 2024 Equipers 4x4. Todos los derechos reservados.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
