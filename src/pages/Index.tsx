import Header from "@/components/Header";
import DashboardGrid from "@/components/DashboardGrid";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png" 
                  alt="Logo" 
                  className="h-8 w-8 object-contain"
                />
                <div>
                  <h1 className="text-lg font-bold text-foreground">Equipers 4x4</h1>
                  <p className="text-xs text-muted-foreground">Sistema de Pedidos</p>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Equipers 4x4 - Sistema de Pedidos
              </h2>
              <p className="text-muted-foreground">
                Gestiona tu negocio de equipamiento 4x4 de manera profesional
              </p>
            </div>
            <DashboardGrid />
          </main>
          
          <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border mt-12">
            © 2024 Equipers 4x4. Todos los derechos reservados.
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
