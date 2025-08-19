import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const WorkOrderSearch = () => {
  const navigate = useNavigate();

  const workOrders = [
    {
      id: "WO-2024-001",
      client: "Empresa ABC",
      product: "Rack Industrial",
      status: "En Proceso",
      priority: "Alta",
      createdDate: "2024-01-15",
      dueDate: "2024-02-15",
      assignedTo: "Juan Pérez"
    },
    {
      id: "WO-2024-002",
      client: "Corporativo XYZ",
      product: "Cúpula Especial",
      status: "Completado",
      priority: "Media",
      createdDate: "2024-01-10",
      dueDate: "2024-01-30",
      assignedTo: "María García"
    },
    {
      id: "WO-2024-003",
      client: "Industrias 123",
      product: "Estructura Metálica",
      status: "Pendiente",
      priority: "Baja",
      createdDate: "2024-01-20",
      dueDate: "2024-03-01",
      assignedTo: "Carlos López"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "En Proceso": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Pendiente": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Media": return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "Baja": return "bg-green-100 text-green-800 hover:bg-green-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Buscar Orden de Trabajo" />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Órdenes de Trabajo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Número de orden..." 
                  className="pl-10"
                />
              </div>
              <Input placeholder="Cliente..." />
              <Input placeholder="Producto..." />
            </div>
            <div className="flex gap-4">
              <Button className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </Button>
              <Button variant="outline">Limpiar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Resultados de Búsqueda</h3>
          
          <div className="grid gap-6">
            {workOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{order.id}</CardTitle>
                      <p className="text-muted-foreground mt-1">{order.client}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Producto</p>
                        <p className="font-medium">{order.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Asignado a</p>
                        <p className="font-medium">{order.assignedTo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Fecha Creación</p>
                        <p className="font-medium">{order.createdDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Fecha Entrega</p>
                        <p className="font-medium">{order.dueDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm">Ver Detalles</Button>
                    <Button size="sm" variant="outline">Editar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderSearch;