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

interface Accessory {
  id: number;
  name: string;
}

const Accessories = () => {
  const navigate = useNavigate();
  const [accessoryName, setAccessoryName] = useState("");
  const [accessories, setAccessories] = useState<Accessory[]>([
    { id: 1, name: "Rack de techo" },
    { id: 2, name: "Rack de pick up" },
    { id: 3, name: "Escalera" },
    { id: 4, name: "Cupula" },
    { id: 5, name: "Paneles" },
    { id: 6, name: "Parachoque" },
    { id: 7, name: "Pisadera" },
    { id: 8, name: "Toldo" },
    { id: 9, name: "Extención" },
  ]);

  const handleCreateAccessory = () => {
    if (accessoryName.trim()) {
      const newAccessory = {
        id: accessories.length + 1,
        name: accessoryName,
      };
      setAccessories([...accessories, newAccessory]);
      setAccessoryName("");
    }
  };

  const handleDeleteAccessory = (id: number) => {
    setAccessories(accessories.filter(accessory => accessory.id !== id));
  };

  const handleCancel = () => {
    setAccessoryName("");
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
        <h1 className="text-2xl font-bold text-foreground">Gestión de Accesorios</h1>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Create Accessory Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="accessoryName" className="text-sm font-medium text-foreground">
                  Nombre de la Accesorio
                </Label>
                <Input
                  id="accessoryName"
                  value={accessoryName}
                  onChange={(e) => setAccessoryName(e.target.value)}
                  className="mt-1"
                  placeholder="Ingrese el nombre del accesorio"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCreateAccessory}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Crear Accesorio
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

        {/* Accessories List */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Lista de Accesorios</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-foreground font-semibold">Nombre</TableHead>
                    <TableHead className="text-center text-foreground font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessories.map((accessory, index) => (
                    <TableRow 
                      key={accessory.id} 
                      className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}
                    >
                      <TableCell className="font-medium text-foreground">
                        {accessory.name}
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
                            onClick={() => handleDeleteAccessory(accessory.id)}
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

export default Accessories;