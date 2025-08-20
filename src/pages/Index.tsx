import DashboardGrid from "@/components/DashboardGrid";
import AIChat from "@/components/AIChat";
import { useState } from "react";

const Index = () => {
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <main>
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
  );
};

export default Index;
