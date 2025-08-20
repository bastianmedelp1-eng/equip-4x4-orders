import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, TrendingUp, TrendingDown, DollarSign, Users, BarChart3, PieChart } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ExchangeRate {
  from: string;
  to: string;
  rate: string;
}

const Statistics = () => {
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState<Date>();
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { from: "ARS", to: "CLP", rate: "0,757575" },
    { from: "CLP", to: "ARS", rate: "1,320000" },
    { from: "CLP", to: "USD", rate: "0,001000" },
    { from: "USD", to: "CLP", rate: "1000,000000" }
  ]);

  // Data for Racks y Cupulas chart
  const monthlyData = [
    { month: 'ENE', RACKS: 1082262.32, CUPULAS: 0 },
    { month: 'FEB', RACKS: 0, CUPULAS: 0 },
    { month: 'MAR', RACKS: 0, CUPULAS: 0 },
    { month: 'ABR', RACKS: 0, CUPULAS: 0 },
    { month: 'MAY', RACKS: 28638696.75, CUPULAS: 17882262.32 },
    { month: 'JUN', RACKS: 25432671.27, CUPULAS: 36304725.64 },
    { month: 'JUL', RACKS: 21334316.92, CUPULAS: 71645715.66 },
    { month: 'AGO', RACKS: 15582827.26, CUPULAS: 41724439.58 },
    { month: 'SEP', RACKS: 0, CUPULAS: 0 },
    { month: 'OCT', RACKS: 0, CUPULAS: 0 },
    { month: 'NOV', RACKS: 0, CUPULAS: 0 },
    { month: 'DIC', RACKS: 0, CUPULAS: 0 },
  ];

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleSaveRate = (index: number) => {
    console.log(`Saving exchange rate: ${exchangeRates[index].from} to ${exchangeRates[index].to}`);
    // Here you would save to backend/localStorage
    toast.success(`Tasa ${exchangeRates[index].from} → ${exchangeRates[index].to} guardada: ${exchangeRates[index].rate}`);
  };

  const handleReload = () => {
    console.log("Reloading statistics");
    // Here you would fetch fresh data from API
    toast.info("Actualizando estadísticas...");
    setTimeout(() => {
      toast.success("Estadísticas actualizadas correctamente");
    }, 1500);
  };

  const handleRateChange = (index: number, newRate: string) => {
    const updatedRates = [...exchangeRates];
    updatedRates[index].rate = newRate;
    setExchangeRates(updatedRates);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
        {/* Simplified Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Button 
                onClick={handleBackToHome}
                variant="outline"
                className="text-muted-foreground border-border hover:bg-accent"
              >
                ← Volver
              </Button>
              <h1 className="text-2xl font-light text-foreground tracking-tight">
                Análisis Financiero
              </h1>
              <div className="w-20"></div>
            </div>
          </div>
        </div>

      <div className="container mx-auto px-6 py-8 space-y-12">
        
        {/* Compact Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Exchange Rates */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                Tasas de Cambio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span className="w-16 text-muted-foreground font-medium">
                    {rate.from}→{rate.to}
                  </span>
                  <Input
                    value={rate.rate}
                    onChange={(e) => handleRateChange(index, e.target.value)}
                    className="flex-1 h-8 text-sm border-border"
                  />
                  <Button 
                    onClick={() => handleSaveRate(index)}
                    size="sm"
                    className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    OK
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                Período de Análisis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal border-border hover:bg-accent",
                        !filterDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDate ? format(filterDate, "PPP") : "Seleccionar período"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDate}
                      onSelect={setFilterDate}
                      initialFocus
                      className="rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
                <Button 
                  onClick={handleReload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Actualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executive Summary */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-foreground mb-2">Resumen Ejecutivo</h2>
            <p className="text-muted-foreground text-sm">Vista general del rendimiento financiero consolidado (CLP + conversiones)</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingDown className="h-8 w-8 text-red-500" />
                  <div className="text-right">
                    <p className="text-2xl font-light text-red-700">$70.9M</p>
                    <p className="text-xs text-red-600 font-medium">Sin verificar</p>
                  </div>
                </div>
                <div className="text-xs text-red-600">Ventas pendientes</div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-emerald-500" />
                  <div className="text-right">
                    <p className="text-2xl font-light text-emerald-700">$17.6M</p>
                    <p className="text-xs text-emerald-600 font-medium">Verificadas</p>
                  </div>
                </div>
                <div className="text-xs text-emerald-600">Ventas confirmadas</div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                  <div className="text-right">
                    <p className="text-2xl font-light text-blue-700">$51.1M</p>
                    <p className="text-xs text-blue-600 font-medium">Gastos</p>
                  </div>
                </div>
                <div className="text-xs text-blue-600">Egresos totales</div>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <div className="text-right">
                    <p className="text-2xl font-light text-foreground">-$35.6M</p>
                    <p className="text-xs text-muted-foreground font-medium">Balance</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Resultado neto</div>
              </CardContent>
            </Card>
          </div>

          {/* Products Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Racks</h3>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Facturación</span>
                    <span className="font-medium">$9.5M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Unidades</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Cúpulas</h3>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Facturación</span>
                    <span className="font-medium">$8.1M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Unidades</span>
                    <span className="font-medium">20</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Performance Analytics */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-foreground mb-2">Análisis de Rendimiento</h2>
            <p className="text-muted-foreground text-sm">Evolución mensual de ventas por categoría de producto</p>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="p-8">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barCategoryGap="30%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      fontSize={12}
                      stroke="#64748b"
                    />
                    <YAxis 
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                      domain={[0, 80000000]}
                      axisLine={false}
                      tickLine={false}
                      fontSize={12}
                      stroke="#64748b"
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        new Intl.NumberFormat('es-ES', {
                          style: 'currency',
                          currency: 'CLP',
                          minimumFractionDigits: 0
                        }).format(Number(value)),
                        name
                      ]}
                      labelFormatter={(label) => `${label}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ 
                        paddingTop: '20px',
                        fontSize: '14px'
                      }}
                    />
                    <Bar 
                      dataKey="RACKS" 
                      fill="#10b981" 
                      name="Racks"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar 
                      dataKey="CUPULAS" 
                      fill="#3b82f6" 
                      name="Cúpulas"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sales Analysis by Seller */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-foreground mb-2">Análisis por Vendedor</h2>
            <p className="text-muted-foreground text-sm">Desglose detallado de ventas verificadas y pendientes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Verified Sales */}
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-emerald-800 text-center">
                  Ventas Verificadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">MIGUEL</p>
                      <p className="text-sm text-muted-foreground">Cliente Común + Argentino</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-700">$11,121,000</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">FRANYELIS</p>
                      <p className="text-sm text-muted-foreground">Todos los clientes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-700">$6,462,000</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unverified Sales */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-red-800 text-center">
                  Ventas Pendientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">MIGUEL</p>
                      <p className="text-sm text-muted-foreground">Por verificar</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-700">$22,638,500</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">FRANYELIS</p>
                      <p className="text-sm text-muted-foreground">Por verificar</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-700">$32,969,000</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Currency Breakdown */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-foreground mb-2">Desglose por Moneda</h2>
            <p className="text-muted-foreground text-sm">Análisis detallado por tipo de divisa</p>
          </div>

          <div className="space-y-8">
            {/* CLP */}
            <Card className="border-border">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  CLP - Pesos Chilenos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-light text-foreground">$55.6M</p>
                    <p className="text-sm text-red-600">Sin verificar</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">$9.6M</p>
                    <p className="text-sm text-emerald-600">Verificadas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">$51.1M</p>
                    <p className="text-sm text-blue-600">Gastos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">-$42.1M</p>
                    <p className="text-sm text-muted-foreground">Balance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* USD */}
            <Card className="border-border">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  USD - Dólares Americanos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-light text-foreground">$15,300</p>
                    <p className="text-sm text-red-600">Sin verificar</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">$8,500</p>
                    <p className="text-sm text-emerald-600">Verificadas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">$51,147</p>
                    <p className="text-sm text-blue-600">Gastos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">-$42,647</p>
                    <p className="text-sm text-muted-foreground">Balance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ARS */}
            <Card className="border-border">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  ARS - Pesos Argentinos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-light text-foreground">$0</p>
                    <p className="text-sm text-red-600">Sin verificar</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">$0</p>
                    <p className="text-sm text-emerald-600">Verificadas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">$67.5M</p>
                    <p className="text-sm text-blue-600">Gastos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-foreground">-$67.5M</p>
                    <p className="text-sm text-muted-foreground">Balance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Statistics;