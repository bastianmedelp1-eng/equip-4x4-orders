import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ToolsView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const tools = [
    { id: "T001", name: "Taladro Bosch", category: "Perforación", status: "Disponible", location: "Almacén A" },
    { id: "T002", name: "Sierra Circular", category: "Corte", status: "En Uso", location: "Taller 1" },
    { id: "T003", name: "Soldadora MIG", category: "Soldadura", status: "Mantenimiento", location: "Taller 2" },
    { id: "T004", name: "Llave Inglesa 12mm", category: "Llaves", status: "Disponible", location: "Almacén B" },
    { id: "T005", name: "Multímetro Digital", category: "Medición", status: "Disponible", location: "Laboratorio" },
    { id: "T006", name: "Compresor de Aire", category: "Neumática", status: "En Uso", location: "Taller 3" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible": return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "En Uso": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Mantenimiento": return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default: return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || tool.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilter = () => {
    const filters = ["all", "Disponible", "En Uso", "Mantenimiento"];
    const currentIndex = filters.indexOf(selectedFilter);
    const nextIndex = (currentIndex + 1) % filters.length;
    setSelectedFilter(filters[nextIndex]);
  };

  const handleViewDetails = (toolId: string) => {
    toast.success(`Abriendo detalles de la herramienta ${toolId}`);
    // Here you could navigate to a detail page or open a modal
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Vista de Herramientas" />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar herramientas..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleFilter}>
            <Filter className="h-4 w-4" />
            {selectedFilter === "all" ? "Todos" : selectedFilter}
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600">
                {tools.filter(t => t.status === "Disponible").length}
              </div>
              <p className="text-sm text-muted-foreground">Disponibles</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {tools.filter(t => t.status === "En Uso").length}
              </div>
              <p className="text-sm text-muted-foreground">En Uso</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-amber-600">
                {tools.filter(t => t.status === "Mantenimiento").length}
              </div>
              <p className="text-sm text-muted-foreground">Mantenimiento</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">
                {tools.length}
              </div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="group cursor-pointer transition-all duration-200 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">ID: {tool.id}</p>
                  </div>
                  <Badge className={getStatusColor(tool.status)}>
                    {tool.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Categoría:</span>
                    <span className="text-sm font-medium">{tool.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Ubicación:</span>
                    <span className="text-sm font-medium">{tool.location}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 flex items-center gap-2" 
                  variant="outline"
                  onClick={() => handleViewDetails(tool.id)}
                >
                  <Eye className="h-4 w-4" />
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsView;