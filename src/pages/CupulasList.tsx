import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Home, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CupulaOrder {
  id: number;
  clientName: string;
  status: string;
  seller: string;
  deliveryDate: string;
  brand: string;
  model: string;
  year: number;
  doorType: string;
  cupulaColor: string;
  doorColor: string;
  roofRack: string;
  observations: string;
}

const mockData: CupulaOrder[] = [
  {
    id: 240,
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
    id: 239,
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
    id: 238,
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
  },
  {
    id: 237,
    clientName: "CUERPO DE BOMBEROS CHANCO",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "03/09/2025",
    brand: "SSANGYOUNG",
    model: "GRAND MUSSO",
    year: 2022,
    doorType: "GRANDE",
    cupulaColor: "BLANCA",
    doorColor: "BLANCA",
    roofRack: "LARGO",
    observations: "COLOCAR RODILLO EN LA PRIMERA Y ULTIMA BARRA DEL RACK"
  },
  {
    id: 236,
    clientName: "Ruben Pardo Salas",
    status: "POR HACER",
    seller: "FRANYELIS",
    deliveryDate: "28/08/2025",
    brand: "TOYOTA",
    model: "HILUX REVO",
    year: 2025,
    doorType: "GRANDE",
    cupulaColor: "Negro",
    doorColor: "Negro",
    roofRack: "LARGO",
    observations: ""
  },
  {
    id: 235,
    clientName: "CUERPOS DE BOMBERO CHANCO",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "03/09/2025",
    brand: "JIM",
    model: "REMAX 4X4",
    year: 2025,
    doorType: "GRANDE",
    cupulaColor: "NEGRO",
    doorColor: "ROJO",
    roofRack: "LARGO",
    observations: "COLOCAR RODILLO EN LA PRIMERA Y ULTIMA BARRA DEL RACK BODEGA TRASERA CON 1 METRO DE LARGO"
  },
  {
    id: 234,
    clientName: "Luis Héctor Monsalve",
    status: "POR HACER",
    seller: "FRANYELIS",
    deliveryDate: "08/09/2025",
    brand: "CHEVROLET",
    model: "COLORADO SIN BARRAS DE TECHO",
    year: 2025,
    doorType: "GRANDE",
    cupulaColor: "Negro",
    doorColor: "Negro",
    roofRack: "CORTO",
    observations: "Cliente viene de Argentina"
  },
  {
    id: 233,
    clientName: "Cuerpo de Bomberos Riachelo",
    status: "POR HACER",
    seller: "FRANYELIS",
    deliveryDate: "29/08/2025",
    brand: "JIM",
    model: "REMAX 4X4",
    year: 2025,
    doorType: "GRANDE",
    cupulaColor: "Rojo",
    doorColor: "Rojo",
    roofRack: "LARGO",
    observations: ""
  },
  {
    id: 232,
    clientName: "ALBERTO LUIS GUIDOBONO",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "15/09/2025",
    brand: "NISSAN",
    model: "NAVARA / NP300 CON BARRAS DE TECHO",
    year: 2016,
    doorType: "GRANDE",
    cupulaColor: "NEGRO",
    doorColor: "NEGRO",
    roofRack: "LARGO",
    observations: "CLIENTE VIENE DE ARGENTINA"
  },
  {
    id: 231,
    clientName: "LUIS JOSÉ RECART BOJORQUE",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "30/08/2025",
    brand: "FORD",
    model: "F150",
    year: 2018,
    doorType: "GRANDE",
    cupulaColor: "NEGRO",
    doorColor: "NEGRO",
    roofRack: "LARGO",
    observations: ""
  },
  {
    id: 230,
    clientName: "CUERPO DE BOMBEROS DE PETORCA",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "29/08/2025",
    brand: "MITSUBISHI",
    model: "L200 KATANA CR",
    year: 2023,
    doorType: "GRANDE",
    cupulaColor: "ROJO",
    doorColor: "ROJO",
    roofRack: "CORTO",
    observations: "COLOCAR LOGO 'CUERPO DE BOMBEROS DE PETORCA' O 'BOMBEROS DE PETORCA'"
  },
  {
    id: 229,
    clientName: "IGNACIO ALDAO",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "18/08/2025",
    brand: "FORD",
    model: "RANGER RAPTOR",
    year: 2022,
    doorType: "GRANDE",
    cupulaColor: "NEGRO",
    doorColor: "NEGRO",
    roofRack: "CORTO",
    observations: "CLIENTE VIENE DE ARGENTINA"
  },
  {
    id: 228,
    clientName: "SOCIEDAD SERVICIOS",
    status: "POR HACER",
    seller: "MIGUEL",
    deliveryDate: "20/08/2025",
    brand: "NISSAN",
    model: "NAVARA",
    year: 2022,
    doorType: "PEQUEÑA",
    cupulaColor: "BLANCO",
    doorColor: "BLANCO",
    roofRack: "PORTA ESCALA",
    observations: ""
  }
];

const CupulasList = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");

  const filteredData = mockData.filter(order =>
    order.clientName.toLowerCase().includes(filterText.toLowerCase()) ||
    order.seller.toLowerCase().includes(filterText.toLowerCase()) ||
    order.brand.toLowerCase().includes(filterText.toLowerCase()) ||
    order.model.toLowerCase().includes(filterText.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "POR HACER":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
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
        <h1 className="text-xl font-semibold text-foreground">Lista de Pedidos de Cúpula</h1>
      </div>

      <div className="p-6">
        {/* Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="max-w-xs">
              <Input
                placeholder="Filtrar"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="bg-gray-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <div className="border rounded overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="min-w-[60px]">ID</TableHead>
                <TableHead className="min-w-[150px]">NOMBRE CLIENTE</TableHead>
                <TableHead className="min-w-[100px]">ESTADO</TableHead>
                <TableHead className="min-w-[100px]">VENDEDOR</TableHead>
                <TableHead className="min-w-[120px]">FECHA DE ENTREGA</TableHead>
                <TableHead className="min-w-[80px]">MARCA</TableHead>
                <TableHead className="min-w-[150px]">MODELO</TableHead>
                <TableHead className="min-w-[60px]">AÑO</TableHead>
                <TableHead className="min-w-[100px]">TIPO DE PUERTA</TableHead>
                <TableHead className="min-w-[120px]">COLOR DE LA CUPULA</TableHead>
                <TableHead className="min-w-[120px]">COLOR DE LA PUERTA</TableHead>
                <TableHead className="min-w-[100px]">RACK DE TECHO</TableHead>
                <TableHead className="min-w-[200px]">OBSERVACIONES</TableHead>
                <TableHead className="min-w-[120px]">ACCION 1</TableHead>
                <TableHead className="min-w-[120px]">ACCION 2</TableHead>
                <TableHead className="min-w-[120px]">ACCION 3</TableHead>
                <TableHead className="min-w-[80px]">ACCION 4</TableHead>
                <TableHead className="min-w-[80px]">ACCION 5</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-xs`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.seller}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>{order.brand}</TableCell>
                  <TableCell>{order.model}</TableCell>
                  <TableCell>{order.year}</TableCell>
                  <TableCell>{order.doorType}</TableCell>
                  <TableCell>{order.cupulaColor}</TableCell>
                  <TableCell>{order.doorColor}</TableCell>
                  <TableCell>{order.roofRack}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{order.observations}</TableCell>
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
                      <Edit className="h-3 w-3 mr-1" />
                      EDITAR
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="destructive" className="text-xs px-2 py-1">
                      <Trash2 className="h-3 w-3 mr-1" />
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

export default CupulasList;