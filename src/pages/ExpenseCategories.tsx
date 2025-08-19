import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const ExpenseCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([
    "VIATICOS",
    "ARRIENDO", 
    "LUZ",
    "INSUMOS Y MATERIALES",
    "NOMINAS Y ADELANTOS",
    "SERVICIOS",
    "ISMA Y DANI",
    "IMPOSICIONES, IVA, ETC",
    "MEJORAS TALLER",
    "DEVOLUCIONES"
  ]);

  const handleCreateCategory = () => {
    if (categoryName.trim()) {
      setCategories([...categories, categoryName.trim().toUpperCase()]);
      setCategoryName("");
      toast.success("Categoría creada exitosamente");
    } else {
      toast.error("Por favor ingrese un nombre para la categoría");
    }
  };

  const handleEditCategory = (index: number, currentName: string) => {
    const newName = prompt("Editar categoría:", currentName);
    if (newName && newName.trim() !== currentName) {
      const updatedCategories = [...categories];
      updatedCategories[index] = newName.trim().toUpperCase();
      setCategories(updatedCategories);
      toast.success("Categoría actualizada exitosamente");
    }
  };

  const handleDeleteCategory = (index: number, categoryName: string) => {
    if (confirm(`¿Está seguro de eliminar la categoría "${categoryName}"?`)) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
      toast.success("Categoría eliminada exitosamente");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="default" 
            className="mb-4 bg-green-600 hover:bg-green-700 text-white"
          >
            🏠 INICIO
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Gestión de Categorías de Gasto
          </h1>
        </div>

        {/* Create Category Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Nombre de la Categoría
                </label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ingrese el nombre de la categoría"
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateCategory}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Crear Categoría
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCategoryName("")}
                  className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Lista de Categorías de Gasto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-foreground">Nombre</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">
                      {category}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEditCategory(index, category)}
                          className="bg-cyan-500 hover:bg-cyan-600 text-white"
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteCategory(index, category)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseCategories;