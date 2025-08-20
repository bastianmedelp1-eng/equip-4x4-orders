import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data based on the image provided
  const products = [
    {
      id: 1,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "4RUNNER 5TA GENERACION",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
      stock: "1",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 2,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "4RUNNER 4TA GENERACION",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
      stock: "1",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 3,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "FJ CRUISER",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "https://drive.google.com/file/d/1P1iwPR47CRHcRkmMpSFVLoz1naEWikl/view?usp=drive_link",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 4,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "PRADO 150 4 PUERTAS",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 5,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "PRADO 150 3 PUERTAS",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 6,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "PRADO J20 4 PUERTAS",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 7,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "RAV4 5TA GENERACION",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se perforan el techo de la camioneta se instala tuercas remachables",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 8,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "RAV4 4TA GENERACION",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se instala en las bases originales que trae la camioneta sin perforar ni modificar el vehículo",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 9,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "HILUX 1RA GENERACION",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se instala perforando el canal de techo e instalando tuercas remachables 0.50 ESTO ES IDEAL QUE NOSOTROS LO HAGAMOS EN EL TALLER",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    },
    {
      id: 10,
      image: "🚗",
      marca: "TOYOTA",
      modelo: "HILUX VIGO",
      anos: "",
      precios: "Accesorios Pedidos Realizados",
      rackTecho: "❌",
      cupula: "❌",
      observaciones: "se fija con ganchos al borde donde cierran las puertas",
      stock: "0",
      linkPdf: "",
      acciones: "Contactar Stock"
    }
  ];

  const filteredProducts = products.filter(product => 
    product.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.observaciones.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleAddProduct = () => {
    toast.success("Formulario de nuevo producto se abrirá próximamente");
    // Navigate to add product page or open modal
  };

  const handleContactStock = (productId: number) => {
    toast.success(`Contactando proveedor para producto ID: ${productId}`);
    // Open WhatsApp, email, or contact modal
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

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
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button className="flex items-center gap-2" onClick={handleAddProduct}>
            <Plus className="h-4 w-4" />
            Agregar Producto
          </Button>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Catálogo de Vehículos Toyota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Imagen</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Años</TableHead>
                    <TableHead>Precios</TableHead>
                    <TableHead className="text-center">Rack de techo</TableHead>
                    <TableHead className="text-center">Cúpula</TableHead>
                    <TableHead className="min-w-[300px]">Observaciones</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Link PDF</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                          <span className="text-2xl">{product.image}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-blue-600">
                        {product.marca}
                      </TableCell>
                      <TableCell>{product.modelo}</TableCell>
                      <TableCell>{product.anos}</TableCell>
                      <TableCell className="text-sm">
                        {product.precios}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-red-500 text-lg">{product.rackTecho}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-red-500 text-lg">{product.cupula}</span>
                      </TableCell>
                      <TableCell className="text-sm">
                        {product.observaciones.includes('http') ? (
                          <a 
                            href={product.observaciones} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            Ver enlace
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          product.observaciones
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.stock}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.linkPdf && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          size="sm" 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          onClick={() => handleContactStock(product.id)}
                        >
                          Contactar Stock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)} de {filteredProducts.length}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                >
                  ‹
                </Button>
                <span className="text-sm px-2">
                  {currentPage} de {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  ›
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={handleLastPage}
                >
                  ››
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;