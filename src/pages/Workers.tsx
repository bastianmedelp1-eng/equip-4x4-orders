import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, FileText, History, Edit, UserPlus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Workers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    cargo: "",
    sueldo: "",
    tipoContrato: "",
    fechaInicio: "",
    fechaTermino: ""
  });

  const workers = [
    { id: 1, nombre: "Ismael Zambrano", rut: "26.976.902-1", cargo: "Distribuidor", sueldo: "850000.00", contrato: "2024-03-20", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 2, nombre: "Daniela Chinchilla", rut: "26.557.512-9", cargo: "Administracion", sueldo: "850000.00", contrato: "2024-03-21", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 3, nombre: "Salomon Garcia", rut: "28.795.085-8", cargo: "Administracion", sueldo: "520000.00", contrato: "2024-10-01", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 4, nombre: "Jose Salazar", rut: "33.608.281-9", cargo: "Almador Cup", sueldo: "520000.00", contrato: "2024-03-23", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 5, nombre: "Defran Escalona", rut: "23.742.574-3", cargo: "Fabricante Cup", sueldo: "520000.00", contrato: "2024-03-25", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 6, nombre: "Jerko Andradres", rut: "20.565.572-7", cargo: "Fabricante Cup", sueldo: "520000.00", contrato: "2024-03-26", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 7, nombre: "Sebastian Gallo", rut: "28.795.213-8", cargo: "Soldador", sueldo: "520000.00", contrato: "2024-03-28", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 8, nombre: "Dan Sanchez", rut: "28.701.670-0", cargo: "Soldador", sueldo: "520000.00", contrato: "2024-03-29", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 9, nombre: "Arnoldo Carmona", rut: "44.446.762-3", cargo: "Supervisor", sueldo: "520000.00", contrato: "2024-03-31", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] },
    { id: 10, nombre: "Miguel Barazearte", rut: "28.606.656-K", cargo: "Vendedor", sueldo: "520000.00", contrato: "2024-04-02", acciones: ["Docs", "Hist", "Editar", "Registrar Rostro", "Eliminar"] }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateWorker = () => {
    console.log("Creating worker:", formData);
    // Reset form
    setFormData({
      nombre: "",
      rut: "",
      cargo: "",
      sueldo: "",
      tipoContrato: "",
      fechaInicio: "",
      fechaTermino: ""
    });
  };

  const handleClearForm = () => {
    setFormData({
      nombre: "",
      rut: "",
      cargo: "",
      sueldo: "",
      tipoContrato: "",
      fechaInicio: "",
      fechaTermino: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Atrás
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">
              Gestión de Trabajadores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ingrese nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rut">RUT</Label>
                <Input
                  id="rut"
                  value={formData.rut}
                  onChange={(e) => handleInputChange("rut", e.target.value)}
                  placeholder="Ingrese RUT"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Select value={formData.cargo} onValueChange={(value) => handleInputChange("cargo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distribuidor">Distribuidor</SelectItem>
                    <SelectItem value="administracion">Administración</SelectItem>
                    <SelectItem value="almador-cup">Almador Cup</SelectItem>
                    <SelectItem value="fabricante-cup">Fabricante Cup</SelectItem>
                    <SelectItem value="soldador">Soldador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sueldo">Sueldo</Label>
                <Input
                  id="sueldo"
                  type="number"
                  value={formData.sueldo}
                  onChange={(e) => handleInputChange("sueldo", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoContrato">Tipo de contrato</Label>
                <Select value={formData.tipoContrato} onValueChange={(value) => handleInputChange("tipoContrato", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indefinido">Indefinido</SelectItem>
                    <SelectItem value="plazo-fijo">Plazo Fijo</SelectItem>
                    <SelectItem value="por-obra">Por Obra</SelectItem>
                    <SelectItem value="temporal">Temporal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Anexo 1</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Inicia</span>
                        <Input
                          type="date"
                          className="w-auto"
                          value="2024-03-26"
                          readOnly
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Termina</span>
                        <Input
                          type="date"
                          className="w-auto"
                          value="2024-03-28"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Anexo 2</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Inicia</span>
                        <Input
                          type="date"
                          className="w-auto"
                          value="2024-03-26"
                          readOnly
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Termina</span>
                        <Input
                          type="date"
                          className="w-auto"
                          value="2024-03-28"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleCreateWorker} className="bg-primary hover:bg-primary/90">
                Crear Trabajador
              </Button>
              <Button variant="outline" onClick={handleClearForm}>
                Limpiar formulario
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">
              Lista de Trabajadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>RUT</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Sueldo</TableHead>
                    <TableHead>Contrato</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell className="font-medium">{worker.nombre}</TableCell>
                      <TableCell>{worker.rut}</TableCell>
                      <TableCell>{worker.cargo}</TableCell>
                      <TableCell>${worker.sueldo}</TableCell>
                      <TableCell>{worker.contrato}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-center flex-wrap">
                          <Button size="sm" variant="outline" className="bg-blue-500 text-white hover:bg-blue-600 border-blue-500">
                            <FileText className="h-3 w-3 mr-1" />
                            Docs
                          </Button>
                          <Button size="sm" variant="outline" className="bg-orange-500 text-white hover:bg-orange-600 border-orange-500">
                            <History className="h-3 w-3 mr-1" />
                            Hist
                          </Button>
                          <Button size="sm" variant="outline" className="bg-gray-500 text-white hover:bg-gray-600 border-gray-500">
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" className="bg-green-500 text-white hover:bg-green-600 border-green-500">
                            <UserPlus className="h-3 w-3 mr-1" />
                            Registrar Rostro
                          </Button>
                          <Button size="sm" variant="outline" className="bg-red-500 text-white hover:bg-red-600 border-red-500">
                            <Trash2 className="h-3 w-3 mr-1" />
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

export default Workers;