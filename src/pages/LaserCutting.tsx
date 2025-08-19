import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Home, CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const LaserCutting = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("racks");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const racksData = [
    { 
      id: 411, 
      estado: "POR HACER", 
      cliente: "JUAN LABARCA", 
      fechaEntrega: "14/07/2025",
      accesorios: "1 Rack de techo | 4RUNNER RTA GENERACION TOYOTA 2023",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 423, 
      estado: "POR HACER", 
      cliente: "Cristian Bahamondes Arancibia", 
      fechaEntrega: "15/07/2025",
      accesorios: "1 Rack de techo | DMAX - CHEVROLET 2008",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 448, 
      estado: "POR HACER", 
      cliente: "Fernando Macaya Melo", 
      fechaEntrega: "25/07/2025",
      accesorios: "1 Plancha | WRANGLER JK 4 PUERTAS JEEP 2017",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 441, 
      estado: "POR HACER", 
      cliente: "Juan Carlos Marín Vargas", 
      fechaEntrega: "06/08/2025",
      accesorios: "1 Rack de pick up DOBLE ALTO MAX | L200 KATANA CR-MITSUBISHI 2021",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 446, 
      estado: "POR HACER", 
      cliente: "CRISTIAN URRA BUSTAMANTE", 
      fechaEntrega: "08/08/2025",
      accesorios: "1 Rack de pick up TRIPLE ALTO MAX | HILUX REVO TOYOTA 2021",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 449, 
      estado: "POR HACER", 
      cliente: "Manuel Errazuriz", 
      fechaEntrega: "08/08/2025",
      accesorios: "1 Rack de pick up | LANDTREK con barras de techo PEUGEOT 2023",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 472, 
      estado: "POR HACER", 
      cliente: "OS PERFORMANCE PART", 
      fechaEntrega: "13/08/2025",
      accesorios: "1 Rack de techo | JIMNY 1 GENERACION con barras de techo SUZUKI 2008",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 454, 
      estado: "POR HACER", 
      cliente: "Alonzo Andrés Narváez Peña", 
      fechaEntrega: "14/08/2025",
      accesorios: ["1 Rack de techo | NEW JIMNY 5 PUERTAS SUZUKI 2025", "1 Escalera | NEW JIMNY 5 PUERTAS SUZUKI 2025"],
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 456, 
      estado: "POR HACER", 
      cliente: "CLAUDIO RUBEN CONTRERAS", 
      fechaEntrega: "15/08/2025",
      accesorios: "1 Rack de techo | PRADO 150 4 PUERTAS TOYOTA 2012",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 463, 
      estado: "POR HACER", 
      cliente: "JUAN OLMOS", 
      fechaEntrega: "15/08/2025",
      accesorios: "1 Rack de techo | WRANGLER JK 4 PUERTAS JEEP 2013",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 464, 
      estado: "POR HACER", 
      cliente: "DECAR SA", 
      fechaEntrega: "15/08/2025",
      accesorios: [
        "1 Rack de techo | NEW JIMNY 5 PUERTAS SUZUKI 2025",
        "1 Rack de techo | NEW JIMNY 3 PUERTAS SUZUKI 2025",
        "1 Escalera | NEW JIMNY 5 PUERTAS SUZUKI 2025",
        "1 Escalera | NEW JIMNY 3 PUERTAS SUZUKI 2025"
      ],
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 461, 
      estado: "POR HACER", 
      cliente: "Daniel Salamanca", 
      fechaEntrega: "19/08/2025",
      accesorios: "1 Rack de pick up TRIPLE ALTO MAX | WINGLE 7 WINGLE 2025",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 468, 
      estado: "POR HACER", 
      cliente: "INVERSIONES NETBEE LIMITADA", 
      fechaEntrega: "20/08/2025",
      accesorios: [
        "1 Rack de techo | NEW JIMNY 3 PUERTAS SUZUKI 2025",
        "1 Escalera | NEW JIMNY 3 PUERTAS SUZUKI 2025"
      ],
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 470, 
      estado: "POR HACER", 
      cliente: "Guillermo Johnson Barella", 
      fechaEntrega: "22/08/2025",
      accesorios: "1 Rack de techo | NEW JIMNY 3 PUERTAS SUZUKI 2023",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 474, 
      estado: "POR HACER", 
      cliente: "Lorenzo Lasagna", 
      fechaEntrega: "22/08/2025",
      accesorios: "1 Rack de pick up TRIPLE ALTO MAX | NAVARA NISSAN 2011",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 477, 
      estado: "POR HACER", 
      cliente: "Antonio Carrizo Cortes", 
      fechaEntrega: "22/08/2025",
      accesorios: "1 Escalera | NEW JIMNY 3 PUERTAS SUZUKI 2024",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 475, 
      estado: "POR HACER", 
      cliente: "TRUSTRU AUTOPARTES SPA", 
      fechaEntrega: "25/08/2025",
      accesorios: "1 Rack de techo | NEW JIMNY 5 PUERTAS SUZUKI 2025",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 460, 
      estado: "POR HACER", 
      cliente: "Jorge Rusconi", 
      fechaEntrega: "26/08/2025",
      accesorios: "1 Rack de techo | HILUX REVO TOYOTA 2016",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 476, 
      estado: "POR HACER", 
      cliente: "FRANCISCO PEDRERO MOCAYA", 
      fechaEntrega: "26/08/2025",
      accesorios: "1 Rack de pick up DOBLE ALTO MAX | HILUX REVO TOYOTA 2023",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    },
    { 
      id: 479, 
      estado: "POR HACER", 
      cliente: "CLAUDIO TRONCOSO", 
      fechaEntrega: "26/08/2025",
      accesorios: "1 Rack de pick up DOBLE ALTO | HILUX 1RA GENERACION TOYOTA 2000",
      ordenTrabajo: "ORDEN DE TRABAJO TALLER"
    }
  ];

  const totalItems = racksData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = racksData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleMarkAsCut = (id: number) => {
    console.log("Marking as cut:", id);
  };

  const handleWorkOrder = (id: number) => {
    console.log("Opening work order:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const renderAccessories = (accesorios: string | string[]) => {
    if (Array.isArray(accesorios)) {
      return (
        <div className="space-y-1">
          {accesorios.map((acc, index) => (
            <Badge key={index} className="bg-blue-500 text-white mr-1 mb-1 text-xs">
              {acc}
            </Badge>
          ))}
        </div>
      );
    }
    return (
      <Badge className="bg-blue-500 text-white text-xs">
        {accesorios}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button
            onClick={handleGoHome}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 mb-6"
          >
            <Home className="h-4 w-4 mr-2" />
            INICIO
          </Button>

          {/* Header Stats and Filters */}
          <div className="border-2 border-dashed border-gray-300 p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-4">
                <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                  Racks cortados 0
                </Button>
                <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                  Cúpulas cortadas 0
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal bg-gray-200 text-gray-700",
                        !selectedMonth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Filtrar por mes
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedMonth}
                      onSelect={setSelectedMonth}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Button 
                  variant="outline" 
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => setSelectedMonth(null)}
                >
                  Resetear mes
                </Button>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-6">Corte Laser</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="racks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Racks
            </TabsTrigger>
            <TabsTrigger value="cupulas">Cúpulas</TabsTrigger>
            <TabsTrigger value="racks-cortados">Racks cortados</TabsTrigger>
            <TabsTrigger value="cupulas-cortadas">Cúpulas cortadas</TabsTrigger>
          </TabsList>

          <TabsContent value="racks">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Lista de Racks</CardTitle>
                  <Button variant="outline" className="bg-gray-200 text-gray-700">
                    Filtrar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">ESTADO</th>
                        <th className="p-3 text-left font-medium">Cliente</th>
                        <th className="p-3 text-left font-medium">Fecha de Entrega</th>
                        <th className="p-3 text-left font-medium">ACCESORIOS</th>
                        <th className="p-3 text-left font-medium">Orden de trabajo</th>
                        <th className="p-3 text-center font-medium">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((rack, index) => (
                        <tr key={rack.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-3 border-b font-semibold">{rack.id}</td>
                          <td className="p-3 border-b">
                            <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">
                              {rack.estado}
                            </Badge>
                          </td>
                          <td className="p-3 border-b">{rack.cliente}</td>
                          <td className="p-3 border-b">{rack.fechaEntrega}</td>
                          <td className="p-3 border-b">
                            {renderAccessories(rack.accesorios)}
                          </td>
                          <td className="p-3 border-b">
                            <Button
                              size="sm"
                              onClick={() => handleWorkOrder(rack.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                            >
                              {rack.ordenTrabajo}
                            </Button>
                          </td>
                          <td className="p-3 border-b text-center">
                            <Button
                              size="sm"
                              onClick={() => handleMarkAsCut(rack.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Marcar como cortado
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 flex items-center justify-between border-t bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Items per page:</span>
                    <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {startIndex + 1} - {endIndex} of {totalItems}
                    </span>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cupulas">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Lista de Cúpulas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No hay cúpulas pendientes de corte.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="racks-cortados">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Racks Cortados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No hay racks cortados.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cupulas-cortadas">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Cúpulas Cortadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No hay cúpulas cortadas.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LaserCutting;