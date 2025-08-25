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
}

const DashboardGrid = ({ isCompact = false }: DashboardGridProps) => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Category Buttons Grid */}
      <div className="space-y-6">
        {/* First row - 4 buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardSections.slice(0, 4).map((section) => {
            const isExpanded = expandedSection === section.id;
            
            return (
              <Card
                key={section.id}
                className={`group cursor-pointer transition-all duration-200 hover:shadow-lg border-0 shadow-card bg-card ${
                  isExpanded ? 'ring-2 ring-accent shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <CardContent className={`${isCompact ? 'p-4' : 'p-6'} flex flex-col items-center justify-center text-center space-y-3`}>
                  <div className="flex items-center gap-3">
                    <span className={`${isCompact ? 'text-xl' : 'text-2xl'}`}>{section.icon}</span>
                    <span className={`${isCompact ? 'text-sm' : 'text-base'} font-medium text-foreground`}>{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Second row - 3 buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {dashboardSections.slice(4, 7).map((section) => {
            const isExpanded = expandedSection === section.id;
            
            return (
              <Card
                key={section.id}
                className={`group cursor-pointer transition-all duration-200 hover:shadow-lg border-0 shadow-card bg-card ${
                  isExpanded ? 'ring-2 ring-accent shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <CardContent className={`${isCompact ? 'p-4' : 'p-6'} flex flex-col items-center justify-center text-center space-y-3`}>
                  <div className="flex items-center gap-3">
                    <span className={`${isCompact ? 'text-xl' : 'text-2xl'}`}>{section.icon}</span>
                    <span className={`${isCompact ? 'text-sm' : 'text-base'} font-medium text-foreground`}>{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Expanded Section Content */}
      {expandedSection && (
        <div className="space-y-6 mt-8">
          {(() => {
            const section = dashboardSections.find(s => s.id === expandedSection);
            return section ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
                </div>
                
                 {/* Section Items Grid */}
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                   {section.items.map((item) => (
                     <div key={item.id} className="space-y-4">
                       <Card 
                         className="group cursor-pointer transition-all duration-200 hover:shadow-lg border-0 shadow-card bg-card hover:shadow-md"
                         onClick={() => handleItemClick(item.id, item)}
                       >
                         <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                           <div className="flex-shrink-0 relative">
                             {item.icon ? (
                               <img 
                                 src={item.icon} 
                                 alt={item.title}
                                 className="h-12 w-12 object-contain"
                               />
                             ) : item.lucideIcon ? (
                               <item.lucideIcon className="h-12 w-12 text-neutral-600 group-hover:text-accent transition-colors duration-200" />
                             ) : null}
                             {item.subItems && item.subItems.length > 0 && (
                               <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
                                 {expandedItem === item.id ? (
                                   <ChevronDown className="h-3 w-3 text-accent-foreground" />
                                 ) : (
                                   <ChevronRight className="h-3 w-3 text-accent-foreground" />
                                 )}
                               </div>
                             )}
                           </div>
                           <p className="text-sm font-medium text-foreground leading-tight">
                             {item.title}
                           </p>
                         </CardContent>
                       </Card>
                       
                       {/* Sub-items */}
                       {expandedItem === item.id && item.subItems && (
                         <div className="ml-4 space-y-3">
                           {item.subItems.map((subItem) => (
                             <Card 
                               key={subItem.id}
                               className="group cursor-pointer transition-all duration-200 hover:shadow-md border-0 shadow-sm bg-secondary"
                               onClick={() => handleItemClick(subItem.id)}
                             >
                               <CardContent className="p-4 flex items-center gap-3">
                                 <div className="flex-shrink-0">
                                   {subItem.lucideIcon && (
                                     <subItem.lucideIcon className="h-6 w-6 text-neutral-600 group-hover:text-accent transition-colors duration-200" />
                                   )}
                                 </div>
                                 <p className="text-sm font-medium text-foreground">
                                   {subItem.title}
                                 </p>
                               </CardContent>
                             </Card>
                           ))}
                         </div>
                       )}
                     </div>
                   ))}
                 </div>
              </>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default DashboardGrid;