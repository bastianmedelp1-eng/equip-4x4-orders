import DashboardGrid from "@/components/DashboardGrid";
import AIChat from "@/components/AIChat";
import { useState } from "react";

const Index = () => {
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      {/* Header */}
      <header className="h-20 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-light text-foreground tracking-tight">
            Equipers 4x4
          </h1>
          <p className="text-muted-foreground text-sm font-light mt-1">
            Sistema de gestión profesional
          </p>
        </div>
      </header>

      {/* Main content area - Centered dashboard */}
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <DashboardGrid />
        </div>
      </main>
      
      {/* AI Chat Component */}
      <AIChat 
        isMinimized={isChatMinimized}
        onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
      />
      
      <footer className="text-center py-6 text-sm text-muted-foreground">
        © 2024 Equipers 4x4. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Index;
