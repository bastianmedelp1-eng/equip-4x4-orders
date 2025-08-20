import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    codigo: "",
    marca: "",
    nombre: "",
    anoDesde: 0,
    anoHasta: 0,
    tipoAccesorio: "", // "rack" o "cupula"
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
    setIsDialogOpen(false);
  };

  const handleClearForm = () => {
    setFormData({
      codigo: "",
      marca: "",
      nombre: "",
      anoDesde: 0,
      anoHasta: 0,
      tipoAccesorio: "",
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
        {/* Models List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Lista de Modelos</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    Crear Modelo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Modelo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Código</Label>
                        <Input
                          value={formData.codigo}
                          onChange={(e) => handleInputChange("codigo", e.target.value)}
                          placeholder="Código"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Marca</Label>
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
                        <Label className="text-sm font-medium">Nombre</Label>
                        <Input
                          value={formData.nombre}
                          onChange={(e) => handleInputChange("nombre", e.target.value)}
                          placeholder="Nombre del modelo"
                        />
                      </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Año Desde</Label>
                        <Input
                          type="number"
                          value={formData.anoDesde || ""}
                          onChange={(e) => handleInputChange("anoDesde", parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Año Hasta</Label>
                        <Input
                          type="number"
                          value={formData.anoHasta || ""}
                          onChange={(e) => handleInputChange("anoHasta", parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Radio Buttons */}
                    <div className="space-y-3">
                      <RadioGroup
                        value={formData.tipoAccesorio}
                        onValueChange={(value) => handleInputChange("tipoAccesorio", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rack" id="rack" />
                          <Label htmlFor="rack">Rack de Techo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cupula" id="cupula" />
                          <Label htmlFor="cupula">Cúpula</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Observations */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Observaciones</Label>
                      <Textarea
                        value={formData.observaciones}
                        onChange={(e) => handleInputChange("observaciones", e.target.value)}
                        placeholder="Observaciones"
                        className="min-h-[80px]"
                      />
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Stock</Label>
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
                        <Label className="text-sm font-medium">Link URL Catálogo PDF</Label>
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
                        <Label className="text-sm font-medium">Link URL Imagen</Label>
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
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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