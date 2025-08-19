import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import logo from "/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-card border-b border-border px-6 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="Equipers 4x4 Logo" 
          className="h-12 w-12 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold text-foreground">Equipers 4x4</h1>
          <p className="text-sm text-muted-foreground">Sistema de Pedidos</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">Usuario: PERFIL_ADMIN</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border-gray-200 hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};

export default Header;