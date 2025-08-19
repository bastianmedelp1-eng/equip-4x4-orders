import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header title="Productos" />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Search and Add Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar productos..." 
              className="pl-10"
            />
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Agregar Producto
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Sample Product Cards */}
          {Array.from({ length: 12 }, (_, i) => (
            <Card key={i} className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center mb-3">
                  <span className="text-4xl text-muted-foreground">📦</span>
                </div>
                <CardTitle className="text-lg">Producto {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-2">Categoría: Accesorios</p>
                <p className="text-sm text-muted-foreground mb-4">Stock: {Math.floor(Math.random() * 100)} unidades</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">${(Math.random() * 1000).toFixed(2)}</span>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;