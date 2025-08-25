import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Users, 
  Tag, 
  Car, 
  Package, 
  ShoppingCart, 
  List, 
  Star, 
  Calendar, 
  Search, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  UserCheck, 
  QrCode, 
  Clock, 
  Zap, 
  SearchCheck, 
  Wrench,
  ChevronDown,
  ChevronRight,
  Truck,
  Grid3x3
} from "lucide-react";

// Import custom icons
import iconUsuarios from "@/assets/icon-usuarios.png";
import iconMarcas from "@/assets/icon-marcas.png";
import iconPedido from "@/assets/icon-pedido.png";
import iconCalendario from "@/assets/icon-calendario.png";
import iconBuscador from "@/assets/icon-buscador.png";
import iconCotizacion from "@/assets/icon-cotizacion.png";
import iconProductos from "@/assets/icon-productos.png";
import iconHistorial from "@/assets/icon-historial.png";
import iconEstadisticas from "@/assets/icon-estadisticas.png";

interface DashboardItem {
  id: string;
  title: string;
  icon?: string;
  lucideIcon?: React.ComponentType<{ className?: string }>;
  subItems?: DashboardItem[];
}

interface DashboardSection {
  id: string;
  title: string;
  icon: string;
  items: DashboardItem[];
}

const dashboardSections: DashboardSection[] = [
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
      { id: "herramientas", title: "Herramientas", lucideIcon: Wrench },
      { id: "vista-herramientas", title: "Vista de Herramientas", lucideIcon: Wrench },
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

interface DashboardGridProps {
  isCompact?: boolean;
  isVertical?: boolean;
}

const DashboardGrid = ({ isCompact = false, isVertical = false }: DashboardGridProps) => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(prev => prev === sectionId ? null : sectionId);
  };

  const handleItemClick = (itemId: string, item?: DashboardItem) => {
    // Si el item tiene sub-items, expandir/contraer en lugar de navegar
    if (item?.subItems && item.subItems.length > 0) {
      setExpandedItem(prev => prev === itemId ? null : itemId);
      return;
    }

    switch (itemId) {
      case "usuarios":
        navigate("/usuarios");
        break;
      case "marcas":
        navigate("/marcas");
        break;
      case "modelos":
        navigate("/modelos");
        break;
      case "vendedores":
        navigate("/vendedores");
        break;
      case "accesorios":
        navigate("/accesorios");
        break;
      case "pedidos":
        navigate("/pedidos");
        break;
      case "lista-especiales":
        navigate("/lista-especiales");
        break;
      case "calendario":
        navigate("/calendario");
        break;
      case "buscador-precios":
        navigate("/buscador-precios");
        break;
      case "cotizacion":
        navigate("/cotizacion");
        break;
      case "historial":
        navigate("/historial-ventas");
        break;
      case "estadisticas":
        navigate("/estadisticas");
        break;
      case "categorias-gasto":
        navigate("/categorias-gasto");
        break;
      case "trabajadores":
        navigate("/trabajadores");
        break;
      case "qr":
        navigate("/escaner-qr");
        break;
      case "gastos":
        navigate("/gastos");
        break;
      case "corte":
        navigate("/corte-laser");
        break;
      case "herramientas":
        navigate("/herramientas");
        break;
      case "buscar-orden":
        navigate("/buscar-orden");
        break;
      case "vista-herramientas":
        navigate("/vista-herramientas");
        break;
      default:
        console.log(`Clicked on ${itemId}`);
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      {/* Main Dashboard Grid - Google Style */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 max-w-full">
        {dashboardSections.map((section, index) => {
          const isExpanded = expandedSection === section.id;
          
          return (
            <div
              key={section.id}
              className="group cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className={`
                relative flex flex-col items-center justify-center
                w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                rounded-2xl transition-all duration-300 ease-out
                ${isExpanded 
                  ? 'bg-primary/10 shadow-lg ring-2 ring-primary/20 scale-105' 
                  : 'bg-card hover:bg-accent/50 hover:shadow-md hover:scale-105'
                }
                border border-border/50 hover:border-border
              `}>
                <div className="text-3xl md:text-4xl mb-2 transition-transform duration-300 group-hover:scale-110">
                  {section.icon}
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground text-center leading-tight px-2">
                  {section.title}
                </span>
                
                {/* Active indicator */}
                {isExpanded && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-scale-in"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Section Content */}
      {expandedSection && (
        <div className="w-full animate-fade-in">
          {(() => {
            const section = dashboardSections.find(s => s.id === expandedSection);
            return section ? (
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-xl">
                {/* Section Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-4xl">{section.icon}</span>
                    <h3 className="text-2xl font-light text-foreground">{section.title}</h3>
                  </div>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
                </div>
                
                {/* Section Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="group">
                      <div 
                        className="cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => handleItemClick(item.id, item)}
                      >
                        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/80 border border-border/50 shadow-sm hover:bg-accent/50 hover:shadow-md hover:border-border transition-all duration-300">
                          <div className="mb-3">
                            {item.icon ? (
                              <img 
                                src={item.icon} 
                                alt={item.title}
                                className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                              />
                            ) : item.lucideIcon ? (
                              <item.lucideIcon className="h-10 w-10 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                            ) : null}
                          </div>
                          <p className="text-sm font-medium text-foreground text-center leading-tight">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      
                      {/* Sub-items */}
                      {expandedItem === item.id && item.subItems && (
                        <div className="mt-3 space-y-2 animate-fade-in">
                          {item.subItems.map((subItem) => (
                            <div 
                              key={subItem.id}
                              className="cursor-pointer transition-all duration-300 hover:scale-105"
                              onClick={() => handleItemClick(subItem.id)}
                            >
                              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/30 hover:bg-accent/30 hover:border-border/50 transition-all duration-300">
                                {subItem.lucideIcon && (
                                  <subItem.lucideIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                                <p className="text-sm font-medium text-foreground">
                                  {subItem.title}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default DashboardGrid;