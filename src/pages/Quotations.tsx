import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface QuotationData {
  id: number;
  clientName: string;
  rut: string;
  date: string;
  items: string;
  characteristics: string;
  subtotal: string;
  iva: string;
  total: string;
}

const mockQuotationData: QuotationData[] = [
  {
    id: 1,
    clientName: "nombre cliente",
    rut: "rut cliente",
    date: "2025-03-28",
    items: "item 1, 20.00, item 2, 234.00",
    characteristics: "SOPORTE 300 KG DE PESO, MATERIAL ALUMINIO ESPESOR 2MM, descripción test",
    subtotal: "254",
    iva: "48.26",
    total: "302.26"
  },
  {
    id: 2,
    clientName: "EQUIPERS 4X4",
    rut: "77.303.887-2",
    date: "2025-05-06",
    items: "CUPULA 1800000.00",
    characteristics: "",
    subtotal: "1800000",
    iva: "342000",
    total: "2142000"
  },
  {
    id: 3,
    clientName: "TRUSTUS AUTOPARTES",
    rut: "76.830.712-1",
    date: "2025-07-04",
    items: "CUPULA 1800000.00",
    characteristics: "",
    subtotal: "1800000",
    iva: "342000",
    total: "2142000"
  }
];

const Quotations = () => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState("5");

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleNewQuotation = () => {
    // Handle new quotation logic
    console.log("Nueva cotización");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={handleBackToHome}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            INICIO
          </Button>
          <Button 
            onClick={handleNewQuotation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            NUEVA COTIZACIÓN
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Lista de Cotizaciones
        </h1>

        <div className="mb-6">
          <Button variant="outline" className="px-8">
            Filtrar
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-500">
                <TableHead className="text-white font-semibold">Nombre Cliente</TableHead>
                <TableHead className="text-white font-semibold">Rut</TableHead>
                <TableHead className="text-white font-semibold">Fecha</TableHead>
                <TableHead className="text-white font-semibold">Items</TableHead>
                <TableHead className="text-white font-semibold">Característica</TableHead>
                <TableHead className="text-white font-semibold">SubTotal</TableHead>
                <TableHead className="text-white font-semibold">IVA</TableHead>
                <TableHead className="text-white font-semibold">Total</TableHead>
                <TableHead className="text-white font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockQuotationData.map((quotation) => (
                <TableRow key={quotation.id} className="border-b">
                  <TableCell className="font-medium">{quotation.clientName}</TableCell>
                  <TableCell>{quotation.rut}</TableCell>
                  <TableCell>{quotation.date}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={quotation.items}>
                      {quotation.items}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={quotation.characteristics}>
                      {quotation.characteristics}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{quotation.subtotal}</TableCell>
                  <TableCell className="text-right">{quotation.iva}</TableCell>
                  <TableCell className="text-right font-medium">{quotation.total}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs"
                      >
                        Eliminar
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs"
                      >
                        Generar PDF
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">1 - 3 of 3</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotations;