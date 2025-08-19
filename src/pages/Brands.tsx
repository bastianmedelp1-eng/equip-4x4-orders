import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Brand {
  id: number;
  nombre: string;
}

const Brands = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: ""
  });

  const [brands] = useState<Brand[]>([
    { id: 1, nombre: "TOYOTA" },
    { id: 2, nombre: "SUZUKI" },
    { id: 3, nombre: "MITSUBISHI" },
    { id: 4, nombre: "MAXUS" },
    { id: 5, nombre: "MAZDA" },
    { id: 6, nombre: "NISSAN" },
    { id: 7, nombre: "JEEP" },
    { id: 8, nombre: "GREAT WALL" },
    { id: 9, nombre: "RAM" },
    { id: 10, nombre: "CHEVROLET" },
    { id: 11, nombre: "VOLKSWAGEN" }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateBrand = () => {
    console.log("Creating brand:", formData);
  };

  const handleClearForm = () => {
    setFormData({ nombre: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Marcas</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6 space-y-6">
            {/* Form Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre de la Marca</label>
              <Input
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ingrese el nombre de la marca"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleCreateBrand}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Crear Marca
              </Button>
              <Button
                onClick={handleClearForm}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Limpiar formulario
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Brands List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Lista de Marcas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">Nombre</th>
                    <th className="text-right p-4 font-medium text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((brand, index) => (
                    <tr key={brand.id} className={index % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                      <td className="p-4 text-foreground">{brand.nombre}</td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Brands;