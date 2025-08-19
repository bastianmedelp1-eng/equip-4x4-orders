import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

interface RackOrder {
  id: string;
  status: string;
  seller: string;
  salesChannel: string;
  deliveryDate: string;
  accessories: string;
  client: string;
  clientName: string;
  observations?: string;
}

const mockData: RackOrder[] = [
  {
    id: "481",
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
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "INSTALACION EN TALLER",
    deliveryDate: "26/08/2025",
    accessories: "Pack de barras DOBLE AUTO HIALUX 106 GENERACION TOYOTA 2020",
    client: "CLAUDIO TRONCOSO",
    clientName: "972104821",
    observations: ""
  },
  {
    id: "478",
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "INSTALACION EN TALLER",
    deliveryDate: "27/08/2025",
    accessories: "Pack de barras VOLKSWAGEN AMAROK PLATINUM 2027-2024",
    client: "LUCIANO FUENTEALBA",
    clientName: "979805433",
    observations: ""
  },
  {
    id: "477",
    status: "POR HACER",
    seller: "FRANYELIS",
    salesChannel: "Envío por Starken",
    deliveryDate: "22/08/2025",
    accessories: "Parrilla FARO JIMMY 5 PUERTAS SUZUKI 2019",
    client: "Antonio Carrizo Cortes",
    clientName: "+56966295437",
    observations: ""
  },
  {
    id: "476",
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "INSTALACION EN TALLER",
    deliveryDate: "26/08/2025",
    accessories: "Pack de barras DOBLE AUTO HIALUX URBANO TOYOTA 2024",
    client: "FRANCISCO HERRERA MOCATTA",
    clientName: "990259881",
    observations: "CON EXTENSION Y 4 GANCHOS PEQUEÑOS"
  },
  {
    id: "475",
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "ENVIO",
    deliveryDate: "25/08/2025",
    accessories: "Pack de barras JIMMY 5 PUERTAS ESTRADAS SUZUKI 2019",
    client: "TRUSTRU AUTOPARTES SPA",
    clientName: "958582824",
    observations: ""
  },
  {
    id: "474",
    status: "POR HACER",
    seller: "FRANYELIS",
    salesChannel: "Envío por Starken",
    deliveryDate: "22/08/2025",
    accessories: "Pack de barras TRIPLE AUTO HIALUX VARON/ORION 2017",
    client: "Lorenzo Lasagna",
    clientName: "+56933994765",
    observations: ""
  },
  {
    id: "473",
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "INSTALACION EN TALLER",
    deliveryDate: "16/08/2025",
    accessories: "Pack de barras FARO JIMMY 5 PUERTAS SUZUKI 2019",
    client: "LUIS MUÑOZ",
    clientName: "951413246",
    observations: ""
  },
  {
    id: "472",
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "ENVIO POR STARKEN",
    deliveryDate: "13/08/2025",
    accessories: "Pack de barras JIMMY 1 GENERACION con barras de techo SUZUKI 2008",
    client: "OS PERFORMANCE PART",
    clientName: "976212155",
    observations: ""
  },
  {
    id: "471",
    status: "POR HACER",
    seller: "FRANYELIS",
    salesChannel: "Instalación en el taller",
    deliveryDate: "18/08/2025",
    accessories: "Pack de barras HILUX REVO TOYOTA 2018",
    client: "Verónica Aranáia",
    clientName: "+54911603611113",
    observations: "Cliente viene de Argentina. Se instala con cúpula orden 211)"
  },
  {
    id: "470",
    status: "POR HACER",
    seller: "FRANYELIS",
    salesChannel: "Envío Por Starken",
    deliveryDate: "22/08/2025",
    accessories: "Pack de barras FARO JIMMY 5 PUERTAS SUZUKI 2019",
    client: "Guillermo Johnson Berella",
    clientName: "+56994412914",
    observations: ""
  },
  {
    id: "468",
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "ENVIO POR STARKEN",
    deliveryDate: "20/08/2025",
    accessories: "Pack de barras FARO JIMMY 5 PUERTAS SUZUKI 2019",
    client: "INVERSIONES NETERE LIMITADA",
    clientName: "934498212",
    observations: "ENVIO POR STARKEN"
  },
  {
    id: "467",
    status: "POR HACER",
    seller: "MIGUEL",
    salesChannel: "ENVIO",
    deliveryDate: "14/08/2025",
    accessories: "Pack de barras FARO JIMMY 5 PUERTAS SUZUKI 2019",
    client: "MIRIA YAÑEZ AMPUERO",
    clientName: "987400189",
    observations: ""
  },
  {
    id: "466",
    status: "POR HACER",
    seller: "FRANYELIS",
    salesChannel: "Instalación en el taller",
    deliveryDate: "18/08/2025",
    accessories: "Pack de barras HILUX VIGO GENERACION TOYOTA 2011",
    client: "María José Hernández",
    clientName: "+56974841368",
    observations: ""
  },
  {
    id: "465",
    status: "POR HACER",
    seller: "FRANYELIS",
    salesChannel: "Envío por Starken",
    deliveryDate: "19/08/2025",
    accessories: "Pack de barras FARO JIMMY 5 PUERTAS SUZUKI 2019",
    client: "Francisco Calderón",
    clientName: "+56949290622",
    observations: ""
  }
];

const RacksList = () => {
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const filteredData = mockData.filter((order) =>
    order.clientName.toLowerCase().includes(filterText.toLowerCase()) ||
    order.seller.toLowerCase().includes(filterText.toLowerCase()) ||
    order.accessories.toLowerCase().includes(filterText.toLowerCase()) ||
    order.client.toLowerCase().includes(filterText.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "por hacer":
        return "bg-yellow-500 hover:bg-yellow-500";
      case "en proceso":
        return "bg-blue-500 hover:bg-blue-500";
      case "completado":
        return "bg-green-500 hover:bg-green-500";
      case "cancelado":
        return "bg-red-500 hover:bg-red-500";
      default:
        return "bg-gray-500 hover:bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              INICIO
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Lista de Pedidos de Rack</h1>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Filtrar"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">ESTADO</TableHead>
                <TableHead className="font-semibold">VENDEDOR</TableHead>
                <TableHead className="font-semibold">CANAL DE VENTA</TableHead>
                <TableHead className="font-semibold">FECHA DE ENTREGA</TableHead>
                <TableHead className="font-semibold">ACCESORIOS</TableHead>
                <TableHead className="font-semibold">Cliente</TableHead>
                <TableHead className="font-semibold">CLIENTE</TableHead>
                <TableHead className="font-semibold">OBSERVACIONES</TableHead>
                <TableHead className="font-semibold">ACCION 1</TableHead>
                <TableHead className="font-semibold">ACCION 2</TableHead>
                <TableHead className="font-semibold">ACCION 3</TableHead>
                <TableHead className="font-semibold">ACCION 4</TableHead>
                <TableHead className="font-semibold">ACCION 5</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge className={`text-white ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.seller}</TableCell>
                  <TableCell className="max-w-[200px]">{order.salesChannel}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>
                    <div className="bg-cyan-400 text-white px-2 py-1 rounded text-xs max-w-[250px]">
                      {order.accessories}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px]">{order.client}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell className="max-w-[200px]">
                    {order.observations && (
                      <span className="text-sm text-muted-foreground">
                        {order.observations}
                      </span>
                    )}
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
                    <Button size="sm" className="bg-cyan-400 hover:bg-cyan-500 text-white text-xs px-2 py-1">
                      ORDEN DE TRABAJO QUILMES
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1">
                      EDITAR
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RacksList;