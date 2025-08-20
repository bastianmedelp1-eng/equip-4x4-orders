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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User, Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import SettingsDialog from "./SettingsDialog";
import logo from "/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1"></div>
        
        <div className="flex flex-col items-center">
          <img 
            src={logo} 
            alt="Equipers 4x4 Logo" 
            className="h-20 w-20 object-contain mb-2"
          />
          <SidebarTrigger className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105" />
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
      </div>
      
      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
      />
    </header>
  );
};

export default Header;