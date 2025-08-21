import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  usuario: string;
  email: string;
  nombre: string;
  apellido: string;
  perfil: string;
}

const Users = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    perfil: "",
    usuario: "",
    email: "",
    clave: "",
    nombre: "",
    apellido: ""
  });

  const [users] = useState<User[]>([
    { id: 1, usuario: "alejandro", email: "alejandro.pedrique@gmail.com", nombre: "", apellido: "", perfil: "admin" },
    { id: 2, usuario: "ismael", email: "ismael@test.com", nombre: "Ismael", apellido: "Zambrano", perfil: "admin" },
    { id: 3, usuario: "supervisor", email: "supervisor@test.com", nombre: "supervisor", apellido: "supervisor", perfil: "supervisor" },
    { id: 4, usuario: "oficina", email: "oficina@test.com", nombre: "oficina", apellido: "oficina", perfil: "admin" },
    { id: 6, usuario: "carolina-test", email: "carolina@test.com", nombre: "Carolina", apellido: "Pineda", perfil: "admin" },
    { id: 7, usuario: "user", email: "matrixuf@hotmail.com", nombre: "JORGE", apellido: "BUCHANAN", perfil: "user" },
    { id: 8, usuario: "CORTELASER", email: "cortelaserequippers@test.com", nombre: "CORTE", apellido: "LASER", perfil: "user" },
    { id: 9, usuario: "Eduardo", email: "canaleddmeneses1@gmail.com", nombre: "Eduardo", apellido: "Meneses", perfil: "user" }
  ]);

  const allowedScreens = [
    "Usuarios", "Marcas", "Modelos", "Vendedores", "Accesorios", "Pedidos", "Lista especiales", "Calendario",
    "Buscador de precios", "Cotización", "Productos", "Historial de ventas", "Estadísticas", "Categorías de Gasto", "Gastos", "Trabajadores", "Escanear QR",
    "Asistencia", "Corte Laser", "Buscador de ordenes de trabajo", "Herramientas"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = () => {
    console.log("Creating user:", formData);
  };

  const handleClearForm = () => {
    setFormData({
      perfil: "",
      usuario: "",
      email: "",
      clave: "",
      nombre: "",
      apellido: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <Home className="h-4 w-4" />
            INICIO
          </Button>
          <h1 className="text-2xl font-bold text-foreground">USUARIOS</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Gestión de Usuarios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">PERFIL</label>
                <Select value={formData.perfil} onValueChange={(value) => handleInputChange("perfil", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">USUARIO</label>
                <Input
                  value={formData.usuario}
                  onChange={(e) => handleInputChange("usuario", e.target.value)}
                  placeholder="Nombre de usuario"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">EMAIL</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">CLAVE</label>
                <Input
                  type="password"
                  value={formData.clave}
                  onChange={(e) => handleInputChange("clave", e.target.value)}
                  placeholder="••••"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">NOMBRE</label>
                <Input
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Nombre"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">APELLIDO</label>
                <Input
                  value={formData.apellido}
                  onChange={(e) => handleInputChange("apellido", e.target.value)}
                  placeholder="Apellido"
                />
              </div>
            </div>

            {/* Allowed Screens */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Pantallas permitidas:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {allowedScreens.map((screen) => (
                  <div key={screen} className="flex items-center space-x-2">
                    <Checkbox id={screen} />
                    <label 
                      htmlFor={screen} 
                      className="text-xs text-muted-foreground cursor-pointer"
                    >
                      {screen}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleCreateUser}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Crear Usuario
              </Button>
              <Button
                onClick={handleClearForm}
                variant="outline"
                className="bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500"
              >
                Limpiar formulario
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">ID</th>
                    <th className="text-left p-4 font-medium text-foreground">USUARIO</th>
                    <th className="text-left p-4 font-medium text-foreground">EMAIL</th>
                    <th className="text-left p-4 font-medium text-foreground">NOMBRE</th>
                    <th className="text-left p-4 font-medium text-foreground">APELLIDO</th>
                    <th className="text-left p-4 font-medium text-foreground">PERFIL</th>
                    <th className="text-left p-4 font-medium text-foreground">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                      <td className="p-4 text-foreground">{user.id}</td>
                      <td className="p-4 text-foreground">{user.usuario}</td>
                      <td className="p-4 text-foreground">{user.email}</td>
                      <td className="p-4 text-foreground">{user.nombre}</td>
                      <td className="p-4 text-foreground">{user.apellido}</td>
                      <td className="p-4 text-foreground">{user.perfil}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;