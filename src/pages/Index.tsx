import Header from "@/components/Header";
import DashboardGrid from "@/components/DashboardGrid";
import AIChat from "@/components/AIChat";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Users, Tag, Car, Package, ShoppingCart, List, Star, Calendar, Search, FileText, BarChart3, DollarSign, UserCheck, QrCode, Zap, SearchCheck, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import custom icons
import iconUsuarios from "@/assets/icon-usuarios.png";
import iconMarcas from "@/assets/icon-marcas.png";
import iconPedido from "@/assets/icon-pedido.png";
import iconCalendario from "@/assets/icon-calendario.png";
import iconCotizacion from "@/assets/icon-cotizacion.png";
import iconProductos from "@/assets/icon-productos.png";
import iconHistorial from "@/assets/icon-historial.png";
import iconEstadisticas from "@/assets/icon-estadisticas.png";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { title: "Usuarios", url: "/usuarios", icon: iconUsuarios, isCustomIcon: true },
    { title: "Marcas", url: "/marcas", icon: iconMarcas, isCustomIcon: true },
    { title: "Modelos", url: "/modelos", icon: Car },
    { title: "Vendedores", url: "/vendedores", icon: Users },
    { title: "Accesorios", url: "/accesorios", icon: Package },
    { title: "Pedido", url: "/pedido", icon: iconPedido, isCustomIcon: true },
    { title: "Lista cúpulas", url: "/lista-cupulas", icon: List },
    { title: "Lista racks", url: "/lista-racks", icon: List },
    { title: "Lista especiales", url: "/lista-especiales", icon: Star },
    { title: "Calendario", url: "/calendario", icon: iconCalendario, isCustomIcon: true },
    { title: "Buscador de precios", url: "/buscador-precios", icon: Search },
    { title: "Cotización", url: "/cotizacion", icon: iconCotizacion, isCustomIcon: true },
    { title: "Productos", url: "/productos", icon: iconProductos, isCustomIcon: true },
    { title: "Historial de ventas", url: "/historial-ventas", icon: iconHistorial, isCustomIcon: true },
    { title: "Estadísticas", url: "/estadisticas", icon: iconEstadisticas, isCustomIcon: true },
    { title: "Categorías de Gasto", url: "/categorias-gasto", icon: Tag },
    { title: "Gastos", url: "/gastos", icon: DollarSign },
    { title: "Trabajadores", url: "/trabajadores", icon: UserCheck },
    { title: "Escanear QR", url: "/escaner-qr", icon: QrCode },
    { title: "Corte Laser", url: "/corte-laser", icon: Zap },
    { title: "Buscar orden de trabajo", url: "/buscar-orden", icon: SearchCheck },
    { title: "Herramientas", url: "/herramientas", icon: Wrench },
    { title: "Vista de Herramientas", url: "/vista-herramientas", icon: Wrench },
  ];

  const handleMenuItemClick = (url: string) => {
    navigate(url);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between bg-card border-b border-border px-6 py-4 shadow-sm">
        {/* Hamburger Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <img 
                    src="/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png" 
                    alt="Logo" 
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Equipers 4x4</h2>
                    <p className="text-sm text-muted-foreground">Sistema de Pedidos</p>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-left"
                      onClick={() => handleMenuItemClick(item.url)}
                    >
                      {item.isCustomIcon ? (
                        <img 
                          src={item.icon as string} 
                          alt={item.title}
                          className="h-5 w-5 object-contain"
                        />
                      ) : (
                        <item.icon className="h-5 w-5" />
                      )}
                      <span className="text-sm">{item.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Header Content */}
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png" 
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
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Usuario: PERFIL_ADMIN</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 border-gray-200 hover:bg-gray-50"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
      
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
      
      {/* Fixed AI Chat - Bottom Center */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <AIChat 
          isMinimized={isChatMinimized}
          onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
        />
      </div>
      
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        © 2024 Equipers 4x4. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Index;
