import DashboardGrid from "@/components/DashboardGrid";
import AIChat from "@/components/AIChat";
import { useState } from "react";

const Index = () => {
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  return (
    <div className="min-h-screen flex w-full">
      {/* Vertical Dock - Left Side */}
      <div className="w-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700">
        <DashboardGrid isVertical={true} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="h-16 flex items-center justify-center px-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="text-center">
            <h1 className="text-2xl font-thin text-gray-900 dark:text-white tracking-tight">
              Equipers 4x4
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-light">
              Sistema de gestión profesional
            </p>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 flex items-center justify-center p-6">
          <DashboardGrid isCompact={!isChatMinimized} />
        </main>
        
        {/* AI Chat Component */}
        <AIChat 
          isMinimized={isChatMinimized}
          onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
        />
        
        <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          © 2024 Equipers 4x4. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Index;
