import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, User, Settings, Moon, Sun, Menu, TrendingUp, Shield, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState } from "react";
import SettingsDialog from "./SettingsDialog";
import PermissionsDialog from "./PermissionsDialog";
import CommissionDialog from "./CommissionDialog";
import logo from "/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [commissionOpen, setCommissionOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between bg-card border-b border-border px-6 py-4 shadow-sm relative">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-background border border-border shadow-lg z-50" align="start" sideOffset={4}>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setCommissionOpen(true)}
            >
              <TrendingUp className="mr-3 h-4 w-4" />
              <span>MI COMISIÓN</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setPermissionsOpen(true)}
            >
              <Shield className="mr-3 h-4 w-4" />
              <span>PERMISOS</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => navigate('/herramientas')}
            >
              <Wrench className="mr-3 h-4 w-4" />
              <span>HERRAMIENTAS</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <img 
          src={logo} 
          alt="Equipers 4x4 Logo" 
          className="h-24 w-24 object-contain"
        />
        <div className="w-screen h-px bg-border mt-2"></div>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent">
              <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <AvatarImage src="" alt="Usuario" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  A
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-background border border-border shadow-lg z-50" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt="Usuario" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-foreground">PERFIL_ADMIN</p>
                    <p className="text-xs text-muted-foreground">admin@equipers4x4.com</p>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-accent transition-colors">
              <User className="mr-3 h-4 w-4" />
              <span>Editar perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="mr-3 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            
            {/* Theme Toggle */}
            <div className="px-2 py-2">
              <div className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-accent transition-colors">
                <div className="flex items-center">
                  {theme === "dark" ? (
                    <Moon className="mr-3 h-4 w-4" />
                  ) : (
                    <Sun className="mr-3 h-4 w-4" />
                  )}
                  <span className="text-sm">Tema oscuro</span>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
      />
      
      <PermissionsDialog 
        open={permissionsOpen} 
        onOpenChange={setPermissionsOpen} 
      />
      
      <CommissionDialog 
        open={commissionOpen} 
        onOpenChange={setCommissionOpen} 
      />
    </header>
  );
};

export default Header;