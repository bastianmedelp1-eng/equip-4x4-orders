import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SalesRecord {
  id: number;
  type: string;
  status: string;
  statusColor: string;
  clientName: string;
  accessory: string;
  payment1: string;
  payment2: string;
  payment3: string;
  remainingAmount: number;
  date: string;
}

const mockSalesData: SalesRecord[] = [
  {
    id: 469,
    type: "rack",
    status: "ENVIADO RECIBIDO",
    statusColor: "bg-green-600",
    clientName: "Sergio Escobar",
    accessory: "Rack de techo $800,000.00 PESOS CHILENOS",
    payment1: "$800,000.00 2025-07-31 TRANSFERENCIA",
    payment2: "",
    payment3: "",
    remainingAmount: 0,
    date: "04/08/2025"
  },
  {
    id: 462,
    type: "rack",
    status: "ENVIADO NO RECIBIDO",
    statusColor: "bg-yellow-600",
    clientName: "TRUSTRU AUTOPARTES SPA",
    accessory: "Rack de techo $180,000.00 PESOS CHILENOS",
    payment1: "$0.00 2025-07-29 TRANSFERENCIA",
    payment2: "",
    payment3: "",
    remainingAmount: 180000,
    date: "07/08/2025"
  },
  {
    id: 457,
    type: "rack",
    status: "ENVIADO RECIBIDO",
    statusColor: "bg-green-600",
    clientName: "SAMUEL VAJOVIC",
    accessory: "Rack de pick up $290,000.00 PESOS CHILENOS",
    payment1: "$145,000.00 2025-07-28 DÉBITO",
    payment2: "$145,000.00 2025-08-07 DÉBITO",
    payment3: "",
    remainingAmount: 0,
    date: "07/08/2025"
  },
  {
    id: 453,
    type: "rack",
    status: "ENVIADO RECIBIDO",
    statusColor: "bg-green-600",
    clientName: "LUIS GABRIEL BARBOZA",
    accessory: "Rack de techo $400.00 PESOS",
    payment1: "$400.00 2025-08-12 EFECTIVO",
    payment2: "",
    payment3: "",
    remainingAmount: 0,
    date: "12/08/2025"
  },
  {
    id: 452,
    type: "rack",
    status: "ENVIADO RECIBIDO",
    statusColor: "bg-green-600",
    clientName: "Zúñiga y Vázquez LTDA",
    accessory: "Rack de techo $790,000.00 PESOS CHILENOS",
    payment1: "$350,000.00 2025-07-25 TRANSFERENCIA",
    payment2: "$350,000.02",
    payment3: "",
    remainingAmount: 0,
    date: "08/08/2025"
  }
];

const SalesHistory = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [orderType, setOrderType] = useState("");

  const handleBackToHome = () => {
    navigate("/");
  };

  const totalSales = "$404,071,591.40";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={handleBackToHome}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            INICIO
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Historial de ventas
        </h1>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Fecha Desde</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd-MM-yyyy") : "dd-mm-aaaa"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Fecha Hasta</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd-MM-yyyy") : "dd-mm-aaaa"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Tipo de pedido</label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rack">Rack</SelectItem>
                <SelectItem value="cupula">Cúpula</SelectItem>
                <SelectItem value="especial">Especial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 mt-6">
            <Button className="bg-cyan-500 hover:bg-cyan-600">Filtrar</Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600">Mostrar Todo</Button>
          </div>

          <div className="ml-auto mt-6">
            <Button className="bg-red-600 hover:bg-red-700">Reporte</Button>
          </div>
        </div>

        {/* Total Sales */}
        <div className="mb-6">
          <div className="text-lg font-semibold">
            Total de ventas: <span className="text-2xl">{totalSales}</span>
          </div>
        </div>

        <div className="mb-6">
          <Button variant="outline" className="px-8">
            Filtrar
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">TIPO</TableHead>
                <TableHead className="font-semibold">ESTADO</TableHead>
                <TableHead className="font-semibold">NOMBRE CLIENTE</TableHead>
                <TableHead className="font-semibold">ACCESORIO</TableHead>
                <TableHead className="font-semibold">ABONO 1</TableHead>
                <TableHead className="font-semibold">ABONO 2</TableHead>
                <TableHead className="font-semibold">ABONO 3</TableHead>
                <TableHead className="font-semibold">RESTA CANTIDAD</TableHead>
                <TableHead className="font-semibold">ELIMINAR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSalesData.map((record) => (
                <TableRow key={record.id} className="border-b">
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>
                    <span className={`${record.statusColor} text-white px-2 py-1 rounded text-xs font-medium`}>
                      {record.status}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {record.date}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{record.clientName}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm">{record.accessory}</div>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="mb-2">{record.payment1}</div>
                    <div className="flex gap-1">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs">
                        VERIFICADO
                      </Button>
                      <Button size="sm" variant="outline" className="px-2 py-1 text-xs">
                        VERIFICAR
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {record.payment2 && (
                      <>
                        <div className="mb-2">{record.payment2}</div>
                        <div className="flex gap-1">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs">
                            VERIFICADO
                          </Button>
                          <Button size="sm" variant="outline" className="px-2 py-1 text-xs">
                            VERIFICAR
                          </Button>
                        </div>
                      </>
                    )}
                    {!record.payment2 && (
                      <Button size="sm" variant="outline" className="px-2 py-1 text-xs">
                        VERIFICAR
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {record.payment3 && (
                      <>
                        <div className="mb-2">{record.payment3}</div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs">
                          VERIFICADO
                        </Button>
                      </>
                    )}
                    {!record.payment3 && (
                      <Button size="sm" variant="outline" className="px-2 py-1 text-xs">
                        VERIFICAR
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {record.remainingAmount}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs">
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

export default SalesHistory;