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

const Expenses = () => {
  const navigate = useNavigate();
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

        {/* Filters Section */}
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
        <Card>
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
      </div>
    </div>
  );
};

export default Expenses;