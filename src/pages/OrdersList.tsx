import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BaseOrder {
  id: string;
  type: 'cupula' | 'rack';
  clientName: string;
  status: string;
  seller: string;
  deliveryDate: string;
  observations?: string;
}

interface CupulaOrder extends BaseOrder {
  type: 'cupula';
  brand: string;
  model: string;
  year: number;
  doorType: string;
  cupulaColor: string;
  doorColor: string;
  roofRack: string;
}

interface RackOrder extends BaseOrder {
  type: 'rack';
  salesChannel: string;
  accessories: string;
  client: string;
}

type Order = CupulaOrder | RackOrder;

// Datos mock de cúpulas (tomados de CupulasList)
const cupulasData: CupulaOrder[] = [
  {
    id: "240",
    type: 'cupula',
    clientName: "JUAN BENETTI",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "02/09/2025",
    brand: "TOYOTA",
    model: "HILUX REVO",
    year: 2016,
    doorType: "GRANDE",
    cupulaColor: "NEGRO",
    doorColor: "NEGRO",
    roofRack: "LARGO",
    observations: ""
  },
  {
    id: "239",
    type: 'cupula',
    clientName: "MICHEL ACUÑA TAMBELAY",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "01/09/2025",
    brand: "FORD",
    model: "F150",
    year: 2019,
    doorType: "GRANDE",
    cupulaColor: "NEGRO",
    doorColor: "NEGRO",
    roofRack: "LARGO",
    observations: "VIDRIO ADELANTE Y ATRAS DE LA CUPULA"
  },
  {
    id: "238",
    type: 'cupula',
    clientName: "Cuerpo de Bomberos de Pailaco",
    status: "POR HACER",
    seller: "FRANYELIS",
    deliveryDate: "28/08/2025",
    brand: "NISSAN",
    model: "NAVARA / NP300 SIN BARRAS DE TECHO",
    year: 2018,
    doorType: "GRANDE",
    cupulaColor: "Negro",
    doorColor: "Rojo",
    roofRack: "LARGO",
    observations: ""
  }
];

// Datos mock de racks (tomados de RacksList)
const racksData: RackOrder[] = [
  {
    id: "481",
    type: 'rack',
    status: "POR HACER",
    seller: "FRANYELIS",
    salesChannel: "Instalación en el taller",
    deliveryDate: "27/08/2025",
    accessories: "Pack de barras PORTAEQUIPAJE TOYOTA 2018",
    client: "Cristian Díaz Vargas",
    clientName: "+56013848933",
    observations: ""
  },
  {
    id: "480",
    type: 'rack',
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "INSTALACION EN TALLER",
    deliveryDate: "02/09/2025",
    accessories: "Pack de barras PORTAEQUIPAJE TOYOTA 2018",
    client: "MARCELO SALMORE",
    clientName: "926177939359",
    observations: "FRONTAL CON EL HOYO DE LA BARRA LED"
  },
  {
    id: "479",
    type: 'rack',
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "INSTALACION EN TALLER",
    deliveryDate: "26/08/2025",
    accessories: "Pack de barras DOBLE AUTO HIALUX 106 GENERACION TOYOTA 2020",
    client: "CLAUDIO TRONCOSO",
    clientName: "972104821",
    observations: ""
  }
];

const OrdersList = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState<'todos' | 'cupulas' | 'racks'>('todos');

  // Combinar todos los datos
  const allOrders: Order[] = [...cupulasData, ...racksData];

  // Filtrar por texto y tipo
  const filteredOrders = allOrders.filter(order => {
    const matchesText = order.clientName.toLowerCase().includes(filterText.toLowerCase()) ||
                       order.seller.toLowerCase().includes(filterText.toLowerCase()) ||
                       order.id.toLowerCase().includes(filterText.toLowerCase());
    
    const matchesType = orderTypeFilter === 'todos' || 
                       (orderTypeFilter === 'cupulas' && order.type === 'cupula') ||
                       (orderTypeFilter === 'racks' && order.type === 'rack');
    
    return matchesText && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "POR HACER":
        return "bg-yellow-500 text-white";
      case "EN PROCESO":
        return "bg-blue-500 text-white";
      case "COMPLETADO":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTypeColor = (type: 'cupula' | 'rack') => {
    return type === 'cupula' ? "bg-purple-500 text-white" : "bg-orange-500 text-white";
  };

  const getTypeLabel = (type: 'cupula' | 'rack') => {
    return type === 'cupula' ? "CÚPULA" : "RACK";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white mb-4"
        >
          <Home className="h-4 w-4 mr-2" />
          INICIO
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Lista de Pedidos</h1>
      </div>

      <div className="p-6">
        {/* Filtros superiores */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Filtros de tipo */}
              <div className="flex gap-2">
                <Button
                  variant={orderTypeFilter === 'todos' ? 'default' : 'outline'}
                  onClick={() => setOrderTypeFilter('todos')}
                  className="text-sm"
                >
                  Todos ({allOrders.length})
                </Button>
                <Button
                  variant={orderTypeFilter === 'cupulas' ? 'default' : 'outline'}
                  onClick={() => setOrderTypeFilter('cupulas')}
                  className="text-sm"
                >
                  Cúpulas ({cupulasData.length})
                </Button>
                <Button
                  variant={orderTypeFilter === 'racks' ? 'default' : 'outline'}
                  onClick={() => setOrderTypeFilter('racks')}
                  className="text-sm"
                >
                  Racks ({racksData.length})
                </Button>
              </div>
              
              {/* Filtro de búsqueda */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por cliente, vendedor o ID..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de pedidos */}
        <div className="border rounded overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="min-w-[60px]">ID</TableHead>
                <TableHead className="min-w-[80px]">TIPO</TableHead>
                <TableHead className="min-w-[150px]">CLIENTE</TableHead>
                <TableHead className="min-w-[100px]">ESTADO</TableHead>
                <TableHead className="min-w-[100px]">VENDEDOR</TableHead>
                <TableHead className="min-w-[120px]">FECHA DE ENTREGA</TableHead>
                <TableHead className="min-w-[200px]">DETALLES</TableHead>
                <TableHead className="min-w-[200px]">OBSERVACIONES</TableHead>
                <TableHead className="min-w-[120px]">ACCION 1</TableHead>
                <TableHead className="min-w-[120px]">ACCION 2</TableHead>
                <TableHead className="min-w-[120px]">ACCION 3</TableHead>
                <TableHead className="min-w-[80px]">EDITAR</TableHead>
                <TableHead className="min-w-[80px]">ELIMINAR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={`${order.type}_${order.id}`} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge className={`${getTypeColor(order.type)} text-xs`}>
                      {getTypeLabel(order.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-xs`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.seller}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell className="max-w-[200px]">
                    {order.type === 'cupula' ? (
                      <div className="text-xs space-y-1">
                        <div><strong>Marca:</strong> {order.brand}</div>
                        <div><strong>Modelo:</strong> {order.model}</div>
                        <div><strong>Año:</strong> {order.year}</div>
                        <div><strong>Color:</strong> {order.cupulaColor}</div>
                      </div>
                    ) : (
                      <div className="text-xs space-y-1">
                        <div><strong>Canal:</strong> {order.salesChannel}</div>
                        <div><strong>Accesorios:</strong> {order.accessories}</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {order.observations}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1">
                      POCKET DE ENVIOS
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-2 py-1">
                      ORDEN DE TRABAJO TALLERES
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-2 py-1">
                      ORDEN DE TRABAJO QUILMES
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                      EDITAR
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="destructive" className="text-xs px-2 py-1">
                      ELIMINAR
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No se encontraron pedidos que coincidan con los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;