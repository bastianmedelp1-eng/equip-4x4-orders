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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, User, Settings, Moon, Sun, Menu, TrendingUp, Shield, Wrench, 
         Package, ShoppingCart, DollarSign, Users, Wrench as WrenchIcon, 
         Calendar as CalendarIcon, Car, Star, Search, Tag, UserCheck, 
         SearchCheck, Zap, QrCode, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";
import SettingsDialog from "./SettingsDialog";
import PermissionsDialog from "./PermissionsDialog";
import CommissionDialog from "./CommissionDialog";
import logo from "/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png";

// Import custom icons
import iconProductos from "@/assets/icon-productos.png";
import iconMarcas from "@/assets/icon-marcas.png";
import iconPedido from "@/assets/icon-pedido.png";
import iconCotizacion from "@/assets/icon-cotizacion.png";
import iconHistorial from "@/assets/icon-historial.png";
import iconEstadisticas from "@/assets/icon-estadisticas.png";
import iconUsuarios from "@/assets/icon-usuarios.png";
import iconCalendario from "@/assets/icon-calendario.png";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleItemClick = (itemId: string) => {
    setSideMenuOpen(false);
    
    switch (itemId) {
      case "productos":
        navigate("/productos");
        break;
      case "marcas":
        navigate("/marcas");
        break;
      case "modelos":
        navigate("/modelos");
        break;
      case "accesorios":
        navigate("/accesorios");
        break;
      case "lista-especiales":
        navigate("/lista-especiales");
        break;
      case "pedidos":
        navigate("/pedidos");
        break;
      case "cotizacion":
        navigate("/cotizacion");
        break;
      case "buscador-precios":
        navigate("/buscador-precios");
        break;
      case "historial":
        navigate("/historial-ventas");
        break;
      case "gastos":
        navigate("/gastos");
        break;
      case "categorias-gasto":
        navigate("/categorias-gasto");
        break;
      case "estadisticas":
        navigate("/estadisticas");
        break;
      case "usuarios":
        navigate("/usuarios");
        break;
      case "vendedores":
        navigate("/vendedores");
        break;
      case "trabajadores":
        navigate("/trabajadores");
        break;
      case "buscar-orden":
        navigate("/buscar-orden");
        break;
      case "corte":
        navigate("/corte-laser");
        break;
      case "qr":
        navigate("/escaner-qr");
        break;
      case "herramientas":
        navigate("/herramientas");
        break;
      case "vista-herramientas":
        navigate("/vista-herramientas");
        break;
      case "calendario":
        navigate("/calendario");
        break;
      default:
        console.log(`Clicked on ${itemId}`);
        break;
    }
  };

  const dashboardSections = [
    {
      id: "productos",
      title: "Productos",
      icon: "📦",
      items: [
        { id: "productos", title: "Productos", icon: iconProductos },
        { id: "marcas", title: "Marcas", icon: iconMarcas },
        { id: "modelos", title: "Modelos", lucideIcon: Car },
        { id: "accesorios", title: "Accesorios", lucideIcon: Package },
        { id: "lista-especiales", title: "Especiales", lucideIcon: Star },
      ]
    },
    {
      id: "pedidos-ventas",
      title: "Pedidos y Ventas",
      icon: "🛒",
      items: [
        { id: "pedidos", title: "Pedidos", icon: iconPedido },
        { id: "cotizacion", title: "Cotización", icon: iconCotizacion },
        { id: "buscador-precios", title: "Buscador de precios", lucideIcon: Search },
        { id: "historial", title: "Historial de ventas", icon: iconHistorial },
      ]
    },
    {
      id: "finanzas",
      title: "Finanzas",
      icon: "💰",
      items: [
        { id: "gastos", title: "Gastos", lucideIcon: DollarSign },
        { id: "categorias-gasto", title: "Categorías de gasto", lucideIcon: Tag },
        { id: "estadisticas", title: "Estadísticas", icon: iconEstadisticas },
      ]
    },
    {
      id: "personas",
      title: "Personas",
      icon: "👥",
      items: [
        { id: "usuarios", title: "Usuarios", icon: iconUsuarios },
        { id: "vendedores", title: "Vendedores", lucideIcon: Users },
        { id: "trabajadores", title: "Trabajadores", lucideIcon: UserCheck },
      ]
    },
    {
      id: "operaciones",
      title: "Operaciones",
      icon: "⚙️",
      items: [
        { id: "buscar-orden", title: "Buscar orden de trabajo", lucideIcon: SearchCheck },
        { id: "corte", title: "Corte Láser", lucideIcon: Zap },
        { id: "qr", title: "Escanear QR", lucideIcon: QrCode },
      ]
    },
    {
      id: "herramientas",
      title: "Herramientas",
      icon: "🔧",
      items: [
        { id: "herramientas", title: "Herramientas", lucideIcon: WrenchIcon },
        { id: "vista-herramientas", title: "Vista de Herramientas", lucideIcon: WrenchIcon },
      ]
    },
    {
      id: "agenda",
      title: "Agenda", 
      icon: "📅",
      items: [
        { id: "calendario", title: "Calendario", icon: iconCalendario },
      ]
    }
  ];

  return (
    <header className="flex items-center justify-between bg-card border-b border-border px-6 py-4 shadow-sm relative">
      <div className="flex items-center">
        <Sheet open={sideMenuOpen} onOpenChange={setSideMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-96 bg-background overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menú de Navegación</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              
              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground">ACCIONES RÁPIDAS</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-11 text-left"
                    onClick={() => {
                      setCommissionOpen(true);
                      setSideMenuOpen(false);
                    }}
                  >
                    <TrendingUp className="mr-3 h-4 w-4" />
                    <span>MI COMISIÓN</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-11 text-left"
                    onClick={() => {
                      setPermissionsOpen(true);
                      setSideMenuOpen(false);
                    }}
                  >
                    <Shield className="mr-3 h-4 w-4" />
                    <span>PERMISOS</span>
                  </Button>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground">CATEGORÍAS</h3>
                {dashboardSections.map((section) => {
                  const isExpanded = expandedSection === section.id;
                  
                  return (
                    <div key={section.id} className="space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() => toggleSection(section.id)}
                        className="w-full justify-between h-11 text-left hover:bg-accent"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{section.icon}</span>
                          <span className="font-medium">{section.title}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      
                      {isExpanded && (
                        <div className="ml-6 space-y-1">
                          {section.items.map((item) => (
                            <Button
                              key={item.id}
                              variant="ghost"
                              onClick={() => handleItemClick(item.id)}
                              className="w-full justify-start h-9 text-left text-sm hover:bg-accent/50"
                            >
                              {item.icon ? (
                                <img 
                                  src={item.icon as string} 
                                  alt={item.title}
                                  className="mr-3 h-4 w-4 object-contain"
                                />
                              ) : item.lucideIcon ? (
                                <item.lucideIcon className="mr-3 h-4 w-4" />
                              ) : null}
                              <span>{item.title}</span>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
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
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => toast.info("Función de editar perfil disponible próximamente")}
            >
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
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              onClick={() => toast.info("Función de cerrar sesión disponible próximamente")}
            >
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