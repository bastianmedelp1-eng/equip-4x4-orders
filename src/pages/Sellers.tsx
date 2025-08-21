import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nanoid } from "nanoid";

interface Seller {
  id: string;
  name: string;
}

const Sellers = () => {
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([
    { id: "1", name: "MIGUEL" },
    { id: "2", name: "DANIELA" },
    { id: "3", name: "ISMAEL" },
    { id: "4", name: "SALOMON" },
    { id: "5", name: "FRANYELIS" },
    { id: "6", name: "EDUARDO" },
  ]);

  const handleCreateSeller = () => {
    if (sellerName.trim()) {
      const newSeller = {
        id: nanoid(),
        name: sellerName.toUpperCase(),
      };
      setSellers([...sellers, newSeller]);
      setSellerName("");
    }
  };

  const handleDeleteSeller = (id: string) => {
    setSellers(sellers.filter(seller => seller.id !== id));
  };

  const handleCancel = () => {
    setSellerName("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="bg-card border-b border-border p-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Atrás
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Gestión de Vendedores</h1>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Create Seller Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sellerName" className="text-sm font-medium text-foreground">
                  Nombre del Vendedor
                </Label>
                <Input
                  id="sellerName"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="mt-1"
                  placeholder="Ingrese el nombre del vendedor"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCreateSeller}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Crear Vendedor
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sellers List */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Lista de Vendedores</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-foreground font-semibold">Nombre</TableHead>
                    <TableHead className="text-center text-foreground font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellers.map((seller, index) => (
                    <TableRow 
                      key={seller.id} 
                      className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}
                    >
                      <TableCell className="font-medium text-foreground">
                        {seller.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteSeller(seller.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sellers;