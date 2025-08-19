import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
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
  Wrench 
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
}

const dashboardItems: DashboardItem[] = [
  { id: "usuarios", title: "Usuarios", icon: iconUsuarios },
  { id: "marcas", title: "Marcas", icon: iconMarcas },
  { id: "modelos", title: "Modelos", lucideIcon: Car },
  { id: "vendedores", title: "Vendedores", lucideIcon: Users },
  { id: "accesorios", title: "Accesorios", lucideIcon: Package },
  { id: "pedido", title: "Pedido", icon: iconPedido },
  { id: "lista-cupulas", title: "Lista cúpulas", lucideIcon: List },
  { id: "lista-racks", title: "Lista racks", lucideIcon: List },
  { id: "lista-especiales", title: "Lista especiales", lucideIcon: Star },
  { id: "calendario", title: "Calendario", icon: iconCalendario },
  { id: "buscador-precios", title: "Buscador de precios", lucideIcon: Search },
  { id: "cotizacion", title: "Cotización", icon: iconCotizacion },
  { id: "productos", title: "Productos", icon: iconProductos },
  { id: "historial", title: "Historial de ventas", icon: iconHistorial },
  { id: "estadisticas", title: "Estadísticas", icon: iconEstadisticas },
  { id: "categorias-gasto", title: "Categorías de Gasto", lucideIcon: Tag },
  { id: "gastos", title: "Gastos", lucideIcon: DollarSign },
  { id: "trabajadores", title: "Trabajadores", lucideIcon: UserCheck },
  { id: "qr", title: "Escanear QR", lucideIcon: QrCode },
  { id: "asistencia", title: "Asistencia", lucideIcon: Clock },
  { id: "corte", title: "Corte Laser", lucideIcon: Zap },
  { id: "buscar-orden", title: "Buscar orden de trabajo", lucideIcon: SearchCheck },
  { id: "herramientas", title: "Herramientas", lucideIcon: Wrench },
  { id: "vista-herramientas", title: "Vista de Herramientas", lucideIcon: Wrench },
];

const DashboardGrid = () => {
  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
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
      case "pedido":
        navigate("/pedido");
        break;
      case "lista-cupulas":
        navigate("/lista-cupulas");
        break;
      case "lista-racks":
        navigate("/lista-racks");
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
      default:
        console.log(`Clicked on ${itemId}`);
        break;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {dashboardItems.map((item) => (
          <Card 
            key={item.id}
            className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-200 bg-card"
            onClick={() => handleItemClick(item.id)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="flex-shrink-0">
                {item.icon ? (
                  <img 
                    src={item.icon} 
                    alt={item.title}
                    className="h-12 w-12 object-contain"
                  />
                ) : item.lucideIcon ? (
                  <item.lucideIcon className="h-12 w-12 text-primary group-hover:text-accent transition-colors duration-200" />
                ) : null}
              </div>
              <p className="text-sm font-medium text-foreground leading-tight">
                {item.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardGrid;