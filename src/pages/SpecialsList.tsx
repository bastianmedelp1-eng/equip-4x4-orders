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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const SpecialsList = () => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState("20");

  const handleBackToHome = () => {
    navigate("/");
  };

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
          Lista de Pedidos Especiales
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
                <TableHead className="text-white font-semibold">ID</TableHead>
                <TableHead className="text-white font-semibold">Estado</TableHead>
                <TableHead className="text-white font-semibold">Vendedor</TableHead>
                <TableHead className="text-white font-semibold">Fecha de entrega</TableHead>
                <TableHead className="text-white font-semibold">Actividad</TableHead>
                <TableHead className="text-white font-semibold">Observaciones</TableHead>
                <TableHead className="text-white font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Empty table body for now */}
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
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">0 of 3</span>
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

export default SpecialsList;