import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Tag, 
  Car, 
  Package, 
  ShoppingCart, 
  Star, 
  Search, 
  DollarSign, 
  UserCheck, 
  QrCode, 
  SearchCheck, 
  Zap, 
  Wrench,
  Calendar
} from "lucide-react";

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Category {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    id: string;
    title: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const categories: Category[] = [
  {
    id: "productos",
    title: "Productos",
    icon: Package,
    items: [
      { id: "productos", title: "Productos" },
      { id: "marcas", title: "Marcas" },
      { id: "modelos", title: "Modelos", icon: Car },
      { id: "accesorios", title: "Accesorios", icon: Package },
      { id: "lista-especiales", title: "Especiales", icon: Star },
    ]
  },
  {
    id: "pedidos-ventas",
    title: "Pedidos y Ventas",
    icon: ShoppingCart,
    items: [
      { id: "pedidos", title: "Pedidos" },
      { id: "cotizacion", title: "Cotización" },
      { id: "buscador-precios", title: "Buscador de precios", icon: Search },
      { id: "historial", title: "Historial de ventas" },
    ]
  },
  {
    id: "finanzas",
    title: "Finanzas",
    icon: DollarSign,
    items: [
      { id: "gastos", title: "Gastos", icon: DollarSign },
      { id: "categorias-gasto", title: "Categorías de gasto", icon: Tag },
      { id: "estadisticas", title: "Estadísticas" },
    ]
  },
  {
    id: "personas",
    title: "Personas",
    icon: Users,
    items: [
      { id: "usuarios", title: "Usuarios" },
      { id: "vendedores", title: "Vendedores", icon: Users },
      { id: "trabajadores", title: "Trabajadores", icon: UserCheck },
    ]
  },
  {
    id: "operaciones",
    title: "Operaciones",
    icon: SearchCheck,
    items: [
      { id: "buscar-orden", title: "Buscar orden de trabajo", icon: SearchCheck },
      { id: "corte", title: "Corte Láser", icon: Zap },
      { id: "qr", title: "Escanear QR", icon: QrCode },
    ]
  },
  {
    id: "herramientas",
    title: "Herramientas",
    icon: Wrench,
    items: [
      { id: "herramientas", title: "Herramientas", icon: Wrench },
      { id: "vista-herramientas", title: "Vista de Herramientas", icon: Wrench },
    ]
  },
  {
    id: "agenda",
    title: "Agenda",
    icon: Calendar,
    items: [
      { id: "calendario", title: "Calendario", icon: Calendar },
    ]
  }
];

const userRoles = [
  { id: "vendedores", name: "Vendedores", color: "bg-blue-500" },
  { id: "operarios", name: "Operarios", color: "bg-green-500" },
  { id: "disenador", name: "Diseñador", color: "bg-purple-500" },
];

const PermissionsDialog = ({ open, onOpenChange }: PermissionsDialogProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    if (!selectedRole) return;
    
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [categoryId]: checked,
        // Si se desmarca la categoría, desmarcar todos los subcategorías
        ...Object.fromEntries(
          categories.find(c => c.id === categoryId)?.items.map(item => [item.id, checked]) || []
        )
      }
    }));
  };

  const handleSubcategoryToggle = (categoryId: string, subcategoryId: string, checked: boolean) => {
    if (!selectedRole) return;
    
    setPermissions(prev => {
      const newPermissions = {
        ...prev,
        [selectedRole]: {
          ...prev[selectedRole],
          [subcategoryId]: checked
        }
      };
      
      // Si todas las subcategorías están marcadas, marcar la categoría principal
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        const allSubcategoriesChecked = category.items.every(item => 
          newPermissions[selectedRole][item.id] === true
        );
        newPermissions[selectedRole][categoryId] = allSubcategoriesChecked;
      }
      
      return newPermissions;
    });
  };

  const isCategoryChecked = (categoryId: string): boolean => {
    if (!selectedRole) return false;
    return permissions[selectedRole]?.[categoryId] === true;
  };

  const isSubcategoryChecked = (subcategoryId: string): boolean => {
    if (!selectedRole) return false;
    return permissions[selectedRole]?.[subcategoryId] === true;
  };

  const handleSave = () => {
    // Aquí guardarías los permisos
    console.log("Permisos guardados:", permissions);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            Gestión de Permisos
          </DialogTitle>
          <DialogDescription>
            Configura los permisos de acceso para cada rol de usuario
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selector de Rol */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Seleccionar Rol</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un rol de usuario" />
              </SelectTrigger>
              <SelectContent>
                {userRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${role.color}`} />
                      {role.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRole && (
            <>
              <Separator />
              
              {/* Rol Seleccionado */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Configurando permisos para:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${userRoles.find(r => r.id === selectedRole)?.color}`} />
                    {userRoles.find(r => r.id === selectedRole)?.name}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" size="sm">
                      Editar
                    </Button>
                  ) : (
                    <Button onClick={handleSave} size="sm">
                      Guardar
                    </Button>
                  )}
                </div>
              </div>

              {/* Categorías y Permisos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.title}
                        </div>
                        <Checkbox
                          checked={isCategoryChecked(category.id)}
                          onCheckedChange={(checked) => 
                            handleCategoryToggle(category.id, checked as boolean)
                          }
                          disabled={!isEditing}
                          className="data-[state=checked]:bg-primary"
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 ml-4">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-3 w-3 text-muted-foreground" />}
                              <span className="text-sm text-muted-foreground">
                                {item.title}
                              </span>
                            </div>
                            <Checkbox
                              checked={isSubcategoryChecked(item.id)}
                              onCheckedChange={(checked) => 
                                handleSubcategoryToggle(category.id, item.id, checked as boolean)
                              }
                              disabled={!isEditing}
                              className="data-[state=checked]:bg-primary"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;