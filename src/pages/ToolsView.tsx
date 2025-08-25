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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header title="Vista de Herramientas" />
      
      <div className="container mx-auto px-8 py-12 space-y-10">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Buscar herramientas..." 
              className="pl-12 h-12 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-muted/30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 focus:bg-white dark:focus:bg-card"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-3 h-12 px-6 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-muted/30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300" 
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4" />
            <span className="font-medium">{selectedFilter === "all" ? "Todos" : selectedFilter}</span>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="group relative overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-sm border-muted/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative z-10">
              <div className="text-3xl font-light text-emerald-600 mb-2">
                {tools.filter(t => t.status === "Disponible").length}
              </div>
              <p className="text-sm text-muted-foreground font-medium">Disponibles</p>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-sm border-muted/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative z-10">
              <div className="text-3xl font-light text-blue-600 mb-2">
                {tools.filter(t => t.status === "En Uso").length}
              </div>
              <p className="text-sm text-muted-foreground font-medium">En Uso</p>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-sm border-muted/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative z-10">
              <div className="text-3xl font-light text-amber-600 mb-2">
                {tools.filter(t => t.status === "Mantenimiento").length}
              </div>
              <p className="text-sm text-muted-foreground font-medium">Mantenimiento</p>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-sm border-muted/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative z-10">
              <div className="text-3xl font-light text-primary mb-2">
                {tools.length}
              </div>
              <p className="text-sm text-muted-foreground font-medium">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="group relative overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-sm border-muted/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="pb-4 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {tool.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">ID: {tool.id}</p>
                  </div>
                  <Badge className={`${getStatusColor(tool.status)} px-3 py-1 rounded-full font-medium shadow-sm`}>
                    {tool.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 relative z-10">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground font-medium">Categoría</span>
                    <span className="text-sm font-semibold text-foreground bg-muted/50 px-3 py-1 rounded-lg">
                      {tool.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground font-medium">Ubicación</span>
                    <span className="text-sm font-semibold text-foreground bg-muted/50 px-3 py-1 rounded-lg">
                      {tool.location}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full h-12 flex items-center justify-center gap-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-primary/20 rounded-2xl font-medium transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg" 
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