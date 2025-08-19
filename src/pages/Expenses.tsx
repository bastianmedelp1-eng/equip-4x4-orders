import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Home, CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Expenses = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    categoria: "",
    formaPago: "",
    empresaPago: "",
    fechaDesde: null as Date | null,
    fechaHasta: null as Date | null
  });

  const [expenseForm, setExpenseForm] = useState({
    categoria: "",
    monto: "0",
    fecha: null as Date | null,
    formaPago: "",
    empresaPago: "",
    descripcion: ""
  });

  const expenseData = [
    { name: "INSUMOS Y MATERIALES", value: 136847339 },
    { name: "NOMINAS Y ADELANTOS", value: 32238553 },
    { name: "SERVICIOS", value: 17823007 },
    { name: "VIATICOS", value: 154530 },
    { name: "ISMA Y DANI", value: 13746358 },
    { name: "IMPOSICIONES, IVA, ETC", value: 12615889 },
    { name: "MEJORAS TALLER", value: 18259137 },
    { name: "LUZ", value: 12990 },
    { name: "ARRIENDO", value: 2000000 },
    { name: "DEVOLUCIONES", value: 210180 }
  ];

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  const expensesList = [
    { id: 989, fecha: "2025-08-14", categoria: "NOMINAS Y ADELANTOS", monto: 5057125, descripcion: "NOMINA QUINCENA AGOSTO", tipoPago: "TRANSFERENCIA", empresaPago: "SCOTIABANK" },
    { id: 988, fecha: "2025-08-18", categoria: "INSUMOS Y MATERIALES", monto: 1156680, descripcion: "ACENOR PLANCHAS", tipoPago: "TRANSFERENCIA", empresaPago: "SANTANDER" },
    { id: 987, fecha: "2025-08-18", categoria: "INSUMOS Y MATERIALES", monto: 298452, descripcion: "FERRETOOLS CORRUGADO", tipoPago: "TRANSFERENCIA", empresaPago: "SANTANDER" },
    { id: 986, fecha: "2025-08-16", categoria: "SERVICIOS", monto: 247213, descripcion: "FACEBK", tipoPago: "TARJETA", empresaPago: "SANTANDER" },
    { id: 985, fecha: "2025-08-17", categoria: "SERVICIOS", monto: 31034, descripcion: "MOVI", tipoPago: "TARJETA", empresaPago: "SANTANDER" },
    { id: 984, fecha: "2025-08-16", categoria: "ISMA Y DANI", monto: 300000, descripcion: "ISMA Y DANI", tipoPago: "TRANSFERENCIA", empresaPago: "SANTANDER" },
    { id: 983, fecha: "2025-08-16", categoria: "INSUMOS Y MATERIALES", monto: 3086, descripcion: "ALIEXPRESS", tipoPago: "TRANSFERENCIA", empresaPago: "SANTANDER" },
    { id: 982, fecha: "2025-08-16", categoria: "SERVICIOS", monto: 234783, descripcion: "FACEBK", tipoPago: "TARJETA", empresaPago: "SANTANDER" },
    { id: 981, fecha: "2025-08-14", categoria: "INSUMOS Y MATERIALES", monto: 299063, descripcion: "ALIBABA", tipoPago: "TRANSFERENCIA", empresaPago: "SANTANDER" },
    { id: 980, fecha: "2025-08-14", categoria: "INSUMOS Y MATERIALES", monto: 860000, descripcion: "ORLEANS GOMAS", tipoPago: "TRANSFERENCIA", empresaPago: "SANTANDER" }
  ];

  const totalExpensesList = 976;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalExpensesList);
  const totalPages = Math.ceil(totalExpensesList / itemsPerPage);

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleExpenseFormChange = (field: string, value: any) => {
    setExpenseForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveExpense = () => {
    console.log("Saving expense:", expenseForm);
    // Reset form
    setExpenseForm({
      categoria: "",
      monto: "0",
      fecha: null,
      formaPago: "",
      empresaPago: "",
      descripcion: ""
    });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleEditExpense = (id: number) => {
    console.log("Editing expense:", id);
  };

  const handleDeleteExpense = (id: number) => {
    console.log("Deleting expense:", id);
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
        <div className="mb-6 flex justify-between items-center">
          <Button
            onClick={handleGoHome}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          >
            <Home className="h-4 w-4 mr-2" />
            INICIO
          </Button>
          <h1 className="text-2xl font-bold text-center flex-1">GASTOS</h1>
        </div>

        {/* Filters Section - Always Visible */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <Label>FILTRO CATEGORIA</Label>
                <Select value={filters.categoria} onValueChange={(value) => handleFilterChange("categoria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="insumos">Insumos y Materiales</SelectItem>
                    <SelectItem value="nominas">Nóminas y Adelantos</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                    <SelectItem value="viaticos">Viáticos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>FORMA DE PAGO</Label>
                <Select value={filters.formaPago} onValueChange={(value) => handleFilterChange("formaPago", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione forma" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="efectivo">Efectivo</SelectItem>
                    <SelectItem value="transferencia">Transferencia</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>EMPRESA DE PAGO</Label>
                <Select value={filters.empresaPago} onValueChange={(value) => handleFilterChange("empresaPago", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione empresa" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="banco-chile">Banco de Chile</SelectItem>
                    <SelectItem value="banco-estado">Banco Estado</SelectItem>
                    <SelectItem value="santander">Santander</SelectItem>
                    <SelectItem value="bci">BCI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fecha desde</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.fechaDesde && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.fechaDesde ? format(filters.fechaDesde, "dd-MM-yyyy") : "dd-mm-aaaa"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.fechaDesde}
                      onSelect={(date) => handleFilterChange("fechaDesde", date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Fecha hasta</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.fechaHasta && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.fechaHasta ? format(filters.fechaHasta, "dd-MM-yyyy") : "dd-mm-aaaa"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.fechaHasta}
                      onSelect={(date) => handleFilterChange("fechaHasta", date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                FILTRAR
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                MOSTRAR TODO
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chart Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Gastos por categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Gastos']}
                    labelStyle={{ color: 'black' }}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                  />
                  <Bar dataKey="value" fill="#87CEEB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total de gastos</span>
              <span className="text-2xl font-bold">${totalExpenses.toLocaleString()}.00</span>
            </div>
          </CardContent>
        </Card>

        {/* Expense Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="space-y-2">
                <Label>CATEGORIA</Label>
                <Select value={expenseForm.categoria} onValueChange={(value) => handleExpenseFormChange("categoria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="insumos">Insumos y Materiales</SelectItem>
                    <SelectItem value="nominas">Nóminas y Adelantos</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                    <SelectItem value="viaticos">Viáticos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>MONTO</Label>
                <Input
                  type="number"
                  value={expenseForm.monto}
                  onChange={(e) => handleExpenseFormChange("monto", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>FECHA</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expenseForm.fecha && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expenseForm.fecha ? format(expenseForm.fecha, "dd-MM-yyyy") : "dd-mm-aaaa"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={expenseForm.fecha}
                      onSelect={(date) => handleExpenseFormChange("fecha", date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>FORMA DE PAGO</Label>
                <Select value={expenseForm.formaPago} onValueChange={(value) => handleExpenseFormChange("formaPago", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione forma" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="efectivo">Efectivo</SelectItem>
                    <SelectItem value="transferencia">Transferencia</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>EMPRESA DE PAGO</Label>
                <Select value={expenseForm.empresaPago} onValueChange={(value) => handleExpenseFormChange("empresaPago", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione empresa" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="banco-chile">Banco de Chile</SelectItem>
                    <SelectItem value="banco-estado">Banco Estado</SelectItem>
                    <SelectItem value="santander">Santander</SelectItem>
                    <SelectItem value="bci">BCI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <Label>DESCRIPCION</Label>
              <Textarea
                value={expenseForm.descripcion}
                onChange={(e) => handleExpenseFormChange("descripcion", e.target.value)}
                placeholder="Ingrese una descripción del gasto..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSaveExpense}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              GUARDAR
            </Button>
          </CardContent>
        </Card>

        {/* Expenses Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-3 text-left font-medium">
                      ID ↓
                    </th>
                    <th className="p-3 text-left font-medium">
                      FECHA
                    </th>
                    <th className="p-3 text-left font-medium">
                      CATEGORIA ↓
                    </th>
                    <th className="p-3 text-left font-medium">
                      MONTO
                    </th>
                    <th className="p-3 text-left font-medium">
                      DESCRIPCION
                    </th>
                    <th className="p-3 text-left font-medium">
                      TIPO DE PAGO
                    </th>
                    <th className="p-3 text-left font-medium">
                      EMPRESA DE PAGO
                    </th>
                    <th className="p-3 text-center font-medium">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expensesList.map((expense, index) => (
                    <tr key={expense.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 border-b">{expense.id}</td>
                      <td className="p-3 border-b">{expense.fecha}</td>
                      <td className="p-3 border-b">{expense.categoria}</td>
                      <td className="p-3 border-b">{expense.monto.toLocaleString()}</td>
                      <td className="p-3 border-b">{expense.descripcion}</td>
                      <td className="p-3 border-b">{expense.tipoPago}</td>
                      <td className="p-3 border-b">{expense.empresaPago}</td>
                      <td className="p-3 border-b">
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            onClick={() => handleEditExpense(expense.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex items-center justify-between border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Items per page:</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {startIndex + 1} - {endIndex} of {totalExpensesList}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold text-primary">
                Lista de Categorías de Gasto
              </CardTitle>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                + Agregar Categoría
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium bg-gray-100">
                      Nombre
                    </th>
                    <th className="p-4 text-center font-medium bg-gray-100" colSpan={2}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
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
                  ].map((category, index) => (
                    <tr key={category} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4 border-b">{category}</td>
                      <td className="p-4 border-b text-center">
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2"
                        >
                          Editar
                        </Button>
                      </td>
                      <td className="p-4 border-b text-center">
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1"
                        >
                          Eliminar
                        </Button>
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

export default Expenses;