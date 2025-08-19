import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Model {
  id: number;
  codigo: string;
  marca: string;
  modelo: string;
  anoDesde: number;
  anoHasta: number;
}

const Models = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigo: "",
    marca: "",
    nombre: "",
    anoDesde: 0,
    anoHasta: 0,
    rackTecho: false,
    cupula: false,
    observaciones: "",
    stock: 0,
    linkCatalogoPDF: "",
    linkImagen: ""
  });

  const [filterText, setFilterText] = useState("");

  const [models] = useState<Model[]>([
    { id: 1, codigo: "", marca: "TOYOTA", modelo: "4RUNNER STA GENERACION", anoDesde: 2010, anoHasta: 2025 },
    { id: 2, codigo: "", marca: "TOYOTA", modelo: "4RUNNER 4TA GENERACION", anoDesde: 2003, anoHasta: 2009 },
    { id: 3, codigo: "", marca: "TOYOTA", modelo: "FJ CRUISER", anoDesde: 2006, anoHasta: 2014 },
    { id: 4, codigo: "", marca: "TOYOTA", modelo: "PRADO 150 4 PUERTAS", anoDesde: 2010, anoHasta: 2022 },
    { id: 5, codigo: "", marca: "TOYOTA", modelo: "PRADO 150 3 PUERTAS", anoDesde: 2010, anoHasta: 2022 }
  ]);

  const brands = ["TOYOTA", "SUZUKI", "MITSUBISHI", "MAXUS", "MAZDA", "NISSAN", "JEEP", "GREAT WALL", "RAM", "CHEVROLET", "VOLKSWAGEN"];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateModel = () => {
    console.log("Creating model:", formData);
  };

  const handleClearForm = () => {
    setFormData({
      codigo: "",
      marca: "",
      nombre: "",
      anoDesde: 0,
      anoHasta: 0,
      rackTecho: false,
      cupula: false,
      observaciones: "",
      stock: 0,
      linkCatalogoPDF: "",
      linkImagen: ""
    });
  };

  const filteredModels = models.filter(model => 
    model.modelo.toLowerCase().includes(filterText.toLowerCase()) ||
    model.marca.toLowerCase().includes(filterText.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-foreground">Gestión de Modelos</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6 space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Código</label>
                <Input
                  value={formData.codigo}
                  onChange={(e) => handleInputChange("codigo", e.target.value)}
                  placeholder="Código"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Marca</label>
                <Select value={formData.marca} onValueChange={(value) => handleInputChange("marca", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre</label>
                <Input
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Nombre del modelo"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Año Desde</label>
                <Input
                  type="number"
                  value={formData.anoDesde || ""}
                  onChange={(e) => handleInputChange("anoDesde", parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Año Hasta</label>
                <Input
                  type="number"
                  value={formData.anoHasta || ""}
                  onChange={(e) => handleInputChange("anoHasta", parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="rackTecho"
                    checked={formData.rackTecho}
                    onCheckedChange={(checked) => handleInputChange("rackTecho", checked)}
                  />
                  <label htmlFor="rackTecho" className="text-sm font-medium text-foreground">
                    Rack de Techo
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="cupula"
                    checked={formData.cupula}
                    onCheckedChange={(checked) => handleInputChange("cupula", checked)}
                  />
                  <label htmlFor="cupula" className="text-sm font-medium text-foreground">
                    Cúpula
                  </label>
                </div>
              </div>
            </div>

            {/* Observations */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Observaciones</label>
              <Textarea
                value={formData.observaciones}
                onChange={(e) => handleInputChange("observaciones", e.target.value)}
                placeholder="Observaciones"
                className="min-h-[80px]"
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Stock</label>
              <Input
                type="number"
                value={formData.stock || ""}
                onChange={(e) => handleInputChange("stock", parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-32"
              />
            </div>

            {/* File Links */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Link URL Catálogo PDF</label>
                <div className="flex gap-2">
                  <Input
                    value={formData.linkCatalogoPDF}
                    onChange={(e) => handleInputChange("linkCatalogoPDF", e.target.value)}
                    placeholder="URL del catálogo PDF"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    Elegir archivo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">No se eligió ningún archivo</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Link URL Imagen</label>
                <div className="flex gap-2">
                  <Input
                    value={formData.linkImagen}
                    onChange={(e) => handleInputChange("linkImagen", e.target.value)}
                    placeholder="URL de la imagen"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    Elegir archivo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">No se eligió ningún archivo</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleCreateModel}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Crear Modelo
              </Button>
              <Button
                onClick={handleClearForm}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Limpiar formulario
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Models List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Lista de Modelos</CardTitle>
            <div className="pt-4">
              <Input
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filtrar modelos"
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Año Desde</TableHead>
                    <TableHead>Año Hasta</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell>{model.codigo}</TableCell>
                      <TableCell>{model.marca}</TableCell>
                      <TableCell>{model.modelo}</TableCell>
                      <TableCell>{model.anoDesde}</TableCell>
                      <TableCell>{model.anoHasta}</TableCell>
                      <TableCell>
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

export default Models;