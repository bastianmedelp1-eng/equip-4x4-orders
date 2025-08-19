import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Home, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: ""
  });

  const tools = [
    { codigo: "003", nombre: "PERCUTOR ROJO" },
    { codigo: "002", nombre: "PERCUTOR" },
    { codigo: "001", nombre: "TALADRO" },
    { codigo: "004", nombre: "CORTA CABLES" },
    { codigo: "005", nombre: "CORTA FRIO" },
    { codigo: "006", nombre: "LLAVE 13" },
    { codigo: "007", nombre: "LLAVE 10" },
    { codigo: "008", nombre: "LLAVE 12" },
    { codigo: "009", nombre: "LLAVE 11" },
    { codigo: "010", nombre: "LLAVE 14" },
    { codigo: "011", nombre: "TIJERAS" },
    { codigo: "012", nombre: "PISTOLA DE SILICON" },
    { codigo: "013", nombre: "REMACHADORA" },
    { codigo: "014", nombre: "SARGENTOS" },
    { codigo: "015", nombre: "MARTILLO DE GOMA" },
    { codigo: "016", nombre: "DADO T30 ALLEN" },
    { codigo: "017", nombre: "DESTORNILLADORES" },
    { codigo: "018", nombre: "ALICATES" },
    { codigo: "019", nombre: "BROCA 5" },
    { codigo: "020", nombre: "BROCA 6" }
  ];

  const workers = [
    // This will be populated when workers data is available
  ];

  const totalTools = 63; // As shown in pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalTools);
  const currentTools = tools.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalTools / itemsPerPage);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTool = () => {
    console.log("Adding tool:", formData);
    // Reset form
    setFormData({
      codigo: "",
      nombre: ""
    });
  };

  const handleEditTool = (codigo: string) => {
    console.log("Editing tool:", codigo);
  };

  const handleDeleteTool = (codigo: string) => {
    console.log("Deleting tool:", codigo);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button
            onClick={handleGoHome}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 mb-6"
          >
            <Home className="h-4 w-4 mr-2" />
            INICIO
          </Button>

          <h1 className="text-3xl font-bold text-foreground mb-8">Herramientas</h1>
        </div>

        {/* Add Tool Form */}
        <div className="mb-8">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="codigo">Código*</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => handleInputChange("codigo", e.target.value)}
                placeholder="Ingrese código"
                className="max-w-sm"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="nombre">Nombre*</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ingrese nombre"
                className="max-w-sm"
              />
            </div>
            <Button 
              onClick={handleAddTool}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Agregar
            </Button>
          </div>
        </div>

        {/* Tools Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="p-4 text-left font-medium text-gray-700">Código</th>
                <th className="p-4 text-left font-medium text-gray-700">Nombre</th>
                <th className="p-4 text-right font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentTools.map((tool, index) => (
                <tr key={tool.codigo} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-gray-900">{tool.codigo}</td>
                  <td className="p-4 text-gray-900">{tool.nombre}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTool(tool.codigo)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTool(tool.codigo)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Items per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {startIndex + 1} - {endIndex} of {totalTools}
              </span>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Workers Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Trabajadores</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="p-4 text-left font-medium text-gray-700">Nombre</th>
                  <th className="p-4 text-left font-medium text-gray-700">Cargo</th>
                  <th className="p-4 text-left font-medium text-gray-700">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {workers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      No hay trabajadores registrados
                    </td>
                  </tr>
                ) : (
                  workers.map((worker, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-gray-900">{worker.nombre}</td>
                      <td className="p-4 text-gray-900">{worker.cargo}</td>
                      <td className="p-4 text-gray-900">{worker.detalle}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;